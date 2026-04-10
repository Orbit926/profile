variable "project" {
  type        = string
  description = "Nombre del proyecto (p.ej. devaltra)"
}

variable "env" {
  type        = string
  description = "Ambiente (dev, prod, etc.) - se usa como stage name"
}

# Integra tu Lambda invoker
# Pásale los outputs del módulo de tu Lambda invoker:
#   - lambda_function_name = module.contact_form_lambda.function_name
#   - lambda_invoke_arn    = module.contact_form_lambda.invoke_arn
variable "lambda_function_name" {
  type        = string
  description = "Nombre de la Lambda invoker (function_name, NO ARN)"
}

variable "lambda_invoke_arn" {
  type        = string
  description = "Invoke ARN de la Lambda invoker (para integración HTTP API)"
}

# CORS
variable "cors_allow_origins" {
  type        = list(string)
  description = "Lista de origins permitidos para CORS"
  default     = ["*"]
}

variable "cors_allow_headers" {
  type        = list(string)
  description = "Headers permitidos en CORS"
  default     = ["Content-Type", "Authorization"]
}

variable "cors_expose_headers" {
  type        = list(string)
  description = "Headers expuestos en CORS (si necesitas leerlos desde el cliente)"
  default     = []
}

variable "cors_max_age" {
  type        = number
  description = "Segundos que el preflight puede cachearse en el navegador"
  default     = 600
}

variable "cors_allow_credentials" {
  type        = bool
  description = "Permitir cookies/credenciales en CORS"
  default     = false
}

variable "tags" {
  type        = map(string)
  description = "Tags opcionales"
  default     = {}
}
