variable "project" {
  type        = string
  description = "Nombre del proyecto (p.ej. devaltra)"
}

variable "env" {
  type        = string
  description = "Ambiente (dev, prod, etc.)"
}

variable "role_arn" {
  type        = string
  description = "ARN del IAM Role que usará la Lambda"
}

variable "email_dispatcher_function_name" {
  type        = string
  description = "Nombre de la Lambda que envía emails"
}

variable "function_name" {
  type        = string
  description = "Nombre explícito de la Lambda (opcional)"
  default     = ""
}

variable "source_dir" {
  type        = string
  description = "Directorio con el código fuente (debe contener index.py)"
  default     = "src"
}

variable "handler" {
  type        = string
  description = "Handler de la Lambda (archivo.función). Para index.py usa 'index.handler' o 'index.lambda_handler'"
  default     = "index.handler"
}

variable "runtime" {
  type        = string
  description = "Runtime de la Lambda"
  default     = "python3.12"
}

variable "architectures" {
  type        = list(string)
  description = "Arquitectura: [\"x86_64\"] o [\"arm64\"]"
  default     = ["x86_64"]
}

variable "memory_mb" {
  type        = number
  description = "Memoria en MB"
  default     = 256
}

variable "timeout_seconds" {
  type        = number
  description = "Timeout en segundos"
  default     = 10
}

variable "recaptcha_secret_key" {
  type        = string
  description = "Clave secreta de reCAPTCHA"
}

variable "layers" {
  type        = list(string)
  description = "ARNs de capas (opcional)"
  default     = []
}

variable "reserved_concurrent_executions" {
  type        = number
  description = "Límite de concurrencia (opcional). Usa -1 para ilimitado"
  default     = -1
}

variable "tags" {
  type        = map(string)
  description = "Tags opcionales"
  default     = {}
}

variable "recaptcha_expected_action" {
  type        = string
  description = "Acción esperada en reCAPTCHA"
  default     = "contact_form_submit"
}

variable "recaptcha_expected_hostname" {
  type        = string
  description = "Hostname esperado en reCAPTCHA"
  default     = "www.orbit.com.mx"
}

variable "recaptcha_min_score" {
  type        = number
  description = "Score mínimo esperado en reCAPTCHA"
  default     = 0.5
}

variable "smtp_pass" {
  type = string
}

variable "zoho_from_email" {
  type = string
}
