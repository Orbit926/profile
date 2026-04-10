############################
# S3 para sitio estático   #
# (privado, listo para CF) #
############################

locals {
  site_bucket_name = "${var.project}-${var.env}-site-bucket"
}

resource "aws_s3_bucket" "site" {
  bucket        = local.site_bucket_name
  force_destroy = var.force_destroy

  tags = merge(
    {
      Project     = var.project
      Environment = var.env
      ManagedBy   = "terraform"
      Purpose     = "static-site"
    },
    var.tags
  )
}

# Recomendado por AWS: BucketOwnerEnforced para evitar líos con ACLs
resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# Bloquear todo acceso público (CloudFront accederá vía OAC)
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# (Opcional pero recomendable) Cifrado por defecto del bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# (Opcional) Versionado si quieres
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id

  versioning_configuration {
    status = "Disabled" # Cambia a "Enabled" si lo quieres activo
  }
}

########################
# S3 bucket policy (OAC)
########################

data "aws_iam_policy_document" "allow_cf_oac" {
  statement {
    sid    = "AllowCloudFrontAccessViaOAC"
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.site.arn}/*",
    ]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site_cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.allow_cf_oac.json
}


############################
# Outputs útiles para CF   #
############################

output "site_bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Nombre del bucket S3 del sitio estático"
}

output "site_bucket_arn" {
  value       = aws_s3_bucket.site.arn
  description = "ARN del bucket S3 del sitio estático"
}

output "site_bucket_regional_domain_name" {
  value       = aws_s3_bucket.site.bucket_regional_domain_name
  description = "Domain name regional del bucket (para usar como origin en CloudFront)"
}

#############################
# CloudFront OAC (S3 origin)#
#############################

resource "aws_cloudfront_origin_access_control" "site_oac" {
  name                              = "${var.project}-${var.env}-site-oac"
  description                       = "OAC for S3 bucket ${aws_s3_bucket.site.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

########################
# Cache Policy básica  #
########################

resource "aws_cloudfront_cache_policy" "static_site" {
  name = "${var.project}-${var.env}-static-site-cache"

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true

    headers_config {
      header_behavior = "none"
    }

    cookies_config {
      cookie_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

###############################
# CloudFront Function redirect#
###############################

resource "aws_cloudfront_function" "redirect_to_www" {
  name    = "${var.project}-${var.env}-redirect-to-www"
  comment = "Redirige ${var.domain_name} -> www.${var.domain_name} con 301"
  runtime = "cloudfront-js-1.0"
  publish = true

  code = <<EOF
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;

  // Si viene al dominio sin www, redirigimos
  if (host === "${var.domain_name}") {
    var location = "https://www.${var.domain_name}" + request.uri;

    // NOTA: si quieres preservar querystring, aquí habría que reconstruirlo.
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        "location": { "value": location }
      }
    };
  }

  // Si ya viene a www, sigue normal
  return request;
}
EOF
}


###############################
# Response Headers (seguridad + cache único)
###############################

resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "${var.project}-${var.env}-security-headers"

  security_headers_config {
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }

    referrer_policy {
      referrer_policy = "no-referrer-when-downgrade"
      override        = true
    }

    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }

    xss_protection {
      protection = true
      mode_block = true
      override   = true
    }
  }

  custom_headers_config {
    items {
      header   = "Cache-Control"
      value    = "public, max-age=3600, must-revalidate"
      override = true
    }
  }
}

##############################
# CloudFront Distribution    #
##############################

resource "aws_cloudfront_distribution" "site_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "${var.project}-${var.env} static site CDN"

  aliases = [
    var.domain_name,
    "www.${var.domain_name}",
  ]

  default_root_object = var.index_document

  origin {
    origin_id                = "s3-site-origin"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site_oac.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-site-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]
    compress        = true

    cache_policy_id            = aws_cloudfront_cache_policy.static_site.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    function_association {
      function_arn = aws_cloudfront_function.redirect_to_www.arn
      event_type   = "viewer-request"
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.orbit.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = var.tags

  depends_on = [
    aws_s3_bucket_public_access_block.site,
    aws_s3_bucket_ownership_controls.site,
    aws_acm_certificate.orbit,
    aws_acm_certificate_validation.orbit,
  ]
}
