resource "aws_route53_record" "cdn_alias" {
    name = "www.${var.domain_name}"
    type = "A"
    zone_id = var.zone_id

    alias {
      name                   = aws_cloudfront_distribution.site_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.site_cdn.hosted_zone_id
      evaluate_target_health = false
    }
}

resource "aws_route53_record" "orbit_root" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "A"

    alias {
      name                   = aws_cloudfront_distribution.site_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.site_cdn.hosted_zone_id
      evaluate_target_health = false
    }
}

#certificados
resource "aws_acm_certificate" "orbit" {

  domain_name               = var.domain_name                 # "orbit.com.mx"
  subject_alternative_names = ["www.${var.domain_name}"]      # "www.orbit.com.mx"
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}


locals {
  orbit_domain_validation_options = {
    for dvo in aws_acm_certificate.orbit.domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }
}

resource "aws_route53_record" "orbit_validation" {
  for_each = local.orbit_domain_validation_options

  zone_id = var.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60

  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "orbit" {
  certificate_arn = aws_acm_certificate.orbit.arn

  validation_record_fqdns = [
    for record in aws_route53_record.orbit_validation :
    record.fqdn
  ]
}

output "orbit_certificate_arn" {
  value       = aws_acm_certificate.orbit.arn
  description = "ARN del certificado ACM para orbit.com.mx y www.orbit.com.mx"
}