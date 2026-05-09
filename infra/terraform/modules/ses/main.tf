# main.tf — módulo SES (solo plantilla del cliente, hardcodeada)

# Requiere que ya tengas configurado el provider "aws" en el root.
# No usa variables ni outputs. Crea únicamente la plantilla ContactAckTemplate.

resource "aws_ses_template" "contact_ack" {
  name    = "ContactAckTemplate"  # Debe coincidir con el nombre que usa tu Lambda
  subject = "Hemos recibido tu mensaje"
  html    = file("${path.module}/templates/contact_ack.html")
  text    = file("${path.module}/templates/contact_ack.txt")
}

resource "aws_ses_template" "vendor_notify" {
  name    = "VendorNotifyTemplate"
  subject = "Alguien ha mandado el formulario de contacto"
  html    = file("${path.module}/templates/vendor_notify.html")
  text    = file("${path.module}/templates/vendor_notify.txt")
}

# resource "aws_sesv2_email_identity" "test_email_identity" {
#   email_identity = var.from_email
# }

# resource "aws_sesv2_email_identity" "vendor_email_identity" {
#   email_identity = var.vendor_email
# }

#######################################
# 1) Identidad de dominio + verificación
#######################################
resource "aws_ses_domain_identity" "domain" {
  domain = var.domain
}

# TXT de verificación SES
resource "aws_route53_record" "ses_verify" {
  zone_id = var.zone_id
  name    = "_amazonses.${var.domain}"
  type    = "TXT"
  ttl     = 300
  records = [aws_ses_domain_identity.domain.verification_token]
}

# DKIM (Easy DKIM)
resource "aws_ses_domain_dkim" "dkim" {
  domain = aws_ses_domain_identity.domain.domain
}

resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = var.zone_id
  name    = "${aws_ses_domain_dkim.dkim.dkim_tokens[count.index]}._domainkey.${var.domain}"
  type    = "CNAME"
  ttl     = 300
  records = ["${aws_ses_domain_dkim.dkim.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

#######################################
# 2) MAIL FROM + SPF
#######################################
resource "aws_ses_domain_mail_from" "mailfrom" {
  domain           = aws_ses_domain_identity.domain.domain
  mail_from_domain = "${var.mail_from_subdomain}.${var.domain}"
}

# MX para MAIL FROM
resource "aws_route53_record" "mail_from_mx" {
  zone_id = var.zone_id
  name    = aws_ses_domain_mail_from.mailfrom.mail_from_domain
  type    = "MX"
  ttl     = 300
  records = ["10 feedback-smtp.us-east-2.amazonses.com"]
}

# SPF en MAIL FROM
resource "aws_route53_record" "mail_from_spf" {
  zone_id = var.zone_id
  name    = aws_ses_domain_mail_from.mailfrom.mail_from_domain
  type    = "TXT"
  ttl     = 300
  records = ["v=spf1 include:amazonses.com -all"]
}

#######################################
# 3) DMARC (en el dominio raíz)
#######################################
resource "aws_route53_record" "dmarc" {
  zone_id = var.zone_id
  name    = "_dmarc"
  type    = "TXT"
  ttl     = 300
  records = [
    #"v=DMARC1; p=${var.dmarc_policy}; rua=mailto:dmarc@${var.domain}; ruf=mailto:dmarc@${var.domain}; fo=1",
    "v=DMARC1; p=${var.dmarc_policy}; rua=mailto:admin@${var.domain}; ruf=mailto:admin@${var.domain}; fo=1"
    ]
}

#######################################
# 4) Configuration Set + SNS destinos
#######################################

# Helper local para nombres válidos en SNS
locals {
  sns_name_prefix = replace(var.domain, ".", "-") # "devaltra-com"
}

resource "aws_sns_topic" "bounces" {
  name = "${local.sns_name_prefix}-ses-bounces"
}

resource "aws_sns_topic" "complaints" {
  name = "${local.sns_name_prefix}-ses-complaints"
}

resource "aws_sns_topic" "deliveries" {
  name = "${local.sns_name_prefix}-ses-deliveries"
}

resource "aws_sesv2_configuration_set" "prod" {
  configuration_set_name = var.configuration_set_name
  sending_options {
    sending_enabled = true
  }
  reputation_options {
    reputation_metrics_enabled = true
  }
  delivery_options {
    tls_policy = "REQUIRE"
  }
}

resource "aws_sesv2_configuration_set_event_destination" "bounces" {
  configuration_set_name = aws_sesv2_configuration_set.prod.configuration_set_name
  event_destination_name = "bounces"

  event_destination {
    enabled               = true
    matching_event_types  = ["BOUNCE"]

    sns_destination {
      topic_arn = aws_sns_topic.bounces.arn
    }
  }
}

resource "aws_sesv2_configuration_set_event_destination" "complaints" {
  configuration_set_name = aws_sesv2_configuration_set.prod.configuration_set_name
  event_destination_name = "complaints"

  event_destination {
    enabled               = true
    matching_event_types  = ["COMPLAINT"]

    sns_destination {
      topic_arn = aws_sns_topic.complaints.arn
    }
  }
}

resource "aws_sesv2_configuration_set_event_destination" "deliveries" {
  configuration_set_name = aws_sesv2_configuration_set.prod.configuration_set_name
  event_destination_name = "deliveries"

  event_destination {
    enabled               = true
    matching_event_types  = ["DELIVERY"]

    sns_destination {
      topic_arn = aws_sns_topic.deliveries.arn
    }
  }
}


# Permitir que SES publique en los topics SNS
data "aws_caller_identity" "current" {}

# Policy para bounces
data "aws_iam_policy_document" "sns_bounces_policy" {
  statement {
    sid = "AllowSESPublishBounces"
    principals {
      type        = "Service"
      identifiers = ["ses.amazonaws.com"]
    }
    actions   = ["SNS:Publish"]
    resources = [aws_sns_topic.bounces.arn]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    # SESv2 usa el ARN del configuration set como SourceArn
    condition {
      test     = "ArnEquals"
      variable = "AWS:SourceArn"
      values   = [aws_sesv2_configuration_set.prod.arn]
    }
  }
}

resource "aws_sns_topic_policy" "bounces" {
  arn    = aws_sns_topic.bounces.arn
  policy = data.aws_iam_policy_document.sns_bounces_policy.json
}

# Policy para complaints
data "aws_iam_policy_document" "sns_complaints_policy" {
  statement {
    sid = "AllowSESPublishComplaints"
    principals {
      type        = "Service"
      identifiers = ["ses.amazonaws.com"]
    }
    actions   = ["SNS:Publish"]
    resources = [aws_sns_topic.complaints.arn]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnEquals"
      variable = "AWS:SourceArn"
      values   = [aws_sesv2_configuration_set.prod.arn]
    }
  }
}

resource "aws_sns_topic_policy" "complaints" {
  arn    = aws_sns_topic.complaints.arn
  policy = data.aws_iam_policy_document.sns_complaints_policy.json
}

# Policy para deliveries
data "aws_iam_policy_document" "sns_deliveries_policy" {
  statement {
    sid = "AllowSESPublishDeliveries"
    principals {
      type        = "Service"
      identifiers = ["ses.amazonaws.com"]
    }
    actions   = ["SNS:Publish"]
    resources = [aws_sns_topic.deliveries.arn]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnEquals"
      variable = "AWS:SourceArn"
      values   = [aws_sesv2_configuration_set.prod.arn]
    }
  }
}

resource "aws_sns_topic_policy" "deliveries" {
  arn    = aws_sns_topic.deliveries.arn
  policy = data.aws_iam_policy_document.sns_deliveries_policy.json
}
