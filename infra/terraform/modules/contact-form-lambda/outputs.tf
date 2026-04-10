output "function_name" {
  description = "Nombre de la Lambda"
  value       = aws_lambda_function.this.function_name
}

output "function_arn" {
  description = "ARN de la Lambda (versión $LATEST o publicada)"
  value       = aws_lambda_function.this.arn
}

output "invoke_arn" {
  description = "Invoke ARN (útil para integrarlo con API Gateway REST)"
  value       = aws_lambda_function.this.invoke_arn
}

output "qualified_arn" {
  description = "ARN calificado (incluye la versión publicada)"
  value       = aws_lambda_function.this.qualified_arn
}

output "log_group_name" {
  description = "Nombre del Log Group de CloudWatch"
  value       = aws_cloudwatch_log_group.this.name
}

output "version" {
  description = "Versión publicada de la función"
  value       = aws_lambda_function.this.version
}
