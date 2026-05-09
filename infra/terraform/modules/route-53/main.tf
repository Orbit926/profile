# Registro TXT para verificación de Google Search Console
resource "aws_route53_record" "google_search_console_verification" {
  zone_id = var.zone_id

  # TXT en el root domain (orbit.com.mx)
  name = var.domain_name

  type = "TXT"
  ttl  = 300

  records = [
    "google-site-verification=-Rw0KkLzc0FC3SNkZ9Vpf_8oVlDLRkhv_EZiPPeA9xA",
    "zoho-verification=zb47187012.zmverify.zoho.com",
    "v=spf1 include:zohomail.com ~all",
  ]
}

resource "aws_route53_record" "mx_records" {
  zone_id = var.zone_id

  name = var.domain_name

  type = "MX"
  ttl  = 300

  records = [
    "10 mx.zoho.com",
    "20 mx2.zoho.com",
    "50 mx3.zoho.com",
  ]
}

resource "aws_route53_record" "zoho_spf" {
  zone_id = var.zone_id

  name = "zmail._domainkey"

  type = "TXT"
  ttl  = 300

  records = [
    "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCbJIJcDeAz+zbyqEDtBg2A4jlBVbUGtYOX1VNI5nCMLiU5Hc4gbjoZJBgnf4AosJO/KWzkYB2FP/9n/CWvCN1pEsz9ir91avj6mYDRDm9V3X3xtZcVBfAJKsbQufDnddhXWomDgPyDYfrPGU5GYQvMqANomDTdr6LLUqN2RiCdwIDAQAB",
  ]
}
