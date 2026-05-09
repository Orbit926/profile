variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project" {
  type = string
}

variable "env" {
  type = string
}

variable "from_addresses" {
  type    = list(string)
  default = []
}

variable "role_name_prefix" {
  type    = string
  default = "orbit"
}

variable "tags" {
  type    = map(string)
  default = {
    Project = "orbit"
    ManagedBy = "terraform"
    Environment = "prod"
    AppName = "LandingPage"
  }
}

# Dirección "From" verificada en SES (misma región que uses para SES)
variable "from_email" {
  type        = string
  description = "Dirección remitente verificada en SES (FromEmailAddress)."
  default = "no-reply@orbit.com.mx"
}

variable "zoho_from_email" {
  type        = string
  description = "Dirección remitente verificada en SES (FromEmailAddress)."
  default = "contacto@orbit.com.mx"
}

# Correo del vendedor que recibirá la notificación
variable "vendor_email" {
  type        = string
  description = "Destino del vendedor para VendorNotifyTemplate."
  default = "ventas@orbit.com.mx"
}

# Origen permitido para CORS en la Lambda (tu dominio de Vercel en prod)
variable "allowed_origin" {
  type        = string
  default     = "*"
  description = "Header Access-Control-Allow-Origin."
}

variable "recaptcha_secret_key" {
  type        = string
  description = "Clave secreta de reCAPTCHA"
}

variable "zoho_smtp_pass" {
  type        = string
  description = "Clave de SMTP de Zoho"
}

variable "cors_allow_origins" {
  type        = list(string)
  description = "Lista de origins permitidos para CORS"
  default     = ["https://www.orbit.com.mx", "https://orbit.com.mx",]
}

variable "domain_name" {
  type        = string
  description = "Dominio de la aplicación"
  default = "orbit.com.mx"
}

variable "zone_id" {
  type        = string
  description = "ID de la zona DNS"
  default = "Z0647556LU6E5QAL6A5"
}

variable "alternate_domains" {
  type        = list(string)
  description = "Lista de dominios alternativos"
  default     = ["www.orbit.com.mx"]
}