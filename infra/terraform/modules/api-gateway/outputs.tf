output "api_id" {
  description = "ID del API Gateway HTTP"
  value       = aws_apigatewayv2_api.this.id
}

output "stage_name" {
  description = "Nombre del stage"
  value       = aws_apigatewayv2_stage.this.name
}

output "base_url" {
  description = "Base URL del API"
  value       = "https://${aws_apigatewayv2_api.this.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_apigatewayv2_stage.this.name}"
}

output "contact_post_url" {
  description = "Endpoint completo para POST /contact"
  value       = "https://${aws_apigatewayv2_api.this.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_apigatewayv2_stage.this.name}/contact"
}
