variable "project" {
  type = string
}

variable "env" {
  type = string
}

# IAM role ARN del módulo email-dispatcher-iam
variable "role_arn" {
  type = string
}

# Config de la función
variable "function_name" {
  type    = string
  default = "" # si viene vacío, se construye con project/env
}

variable "memory_mb" {
  type    = number
  default = 256
}

variable "timeout_seconds" {
  type    = number
  default = 10
}

# Variables de entorno de la función
variable "ses_region" {
  type    = string
  default = "us-east-1"
}

variable "from_email" {
  type = string
}

variable "vendor_email" {
  type    = string
  default = "gaboland1405@gmail.com"
}

variable "allowed_origin" {
  type    = string
  default = "*"
}

variable "tags" {
  type    = map(string)
  default = {}
}
