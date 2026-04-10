variable "project" {
  type = string
}

variable "from_email" {
  type = string
}

variable "vendor_email" {
  type = string
}

variable "domain" {
  type        = string
  description = "Dominio raíz (ej. devaltra.com)"
}

variable "zone_id" {
  type        = string
  description = "Hosted Zone ID de Route53 para el dominio raíz"
}

variable "mail_from_subdomain" {
  type        = string
  default     = "mail"
  description = "Subdominio para MAIL FROM (p. ej. mail.devaltra.com)"
}

variable "configuration_set_name" {
  type        = string
  default     = "prod-default"
  description = "Nombre del Configuration Set de SESv2"
}

variable "dmarc_policy" {
  type        = string
  default     = "none" # cambia a quarantine/reject cuando tengas buena reputación
  description = "Política DMARC: none | quarantine | reject"
}
