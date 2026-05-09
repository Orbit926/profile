variable "project" { type = string }
variable "env"     { type = string }

variable "tags" {
  type    = map(string)
  default = {}
}

variable "force_destroy" {
  type        = bool
  description = "Permite vaciar y destruir el bucket en terraform destroy."
  default     = false
}

variable "index_document" {
  type        = string
  default     = "index.html"
  description = "Documento raíz del sitio estático"
}

variable "zone_id" {
  type        = string
  description = "ID de la zona DNS"
}

variable "domain_name" {
  type        = string
  description = "Nombre del dominio"
}