variable "project" {
  type        = string
  description = "Nombre del proyecto"
}

variable "env" {
  type        = string
  description = "Ambiente (dev, prod, staging, etc.)"
}

variable "role_name_prefix" {
  type        = string
  description = "Prefijo explícito para el nombre del rol (opcional)"
  default     = ""
}

variable "tags" {
  type        = map(string)
  description = "Tags opcionales"
  default     = {}
}
