#############################
# Descubrir cuenta y región #
#############################
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

############################
# HTTP API (API Gateway v2)
############################
resource "aws_apigatewayv2_api" "this" {
  name          = "${var.project}-${var.env}-contact-api"
  protocol_type = "HTTP"

  # CORS nativo en HTTP API (no invoca tu Lambda en OPTIONS)
  cors_configuration {
    allow_origins     = var.cors_allow_origins
    allow_methods     = ["POST", "OPTIONS"]
    allow_headers     = var.cors_allow_headers
    expose_headers    = var.cors_expose_headers
    max_age           = var.cors_max_age
    allow_credentials = var.cors_allow_credentials
  }

  tags = var.tags
}

##############################################
# Integración Lambda Proxy (payload v2.0)
##############################################
resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn   # invoke_arn de tu Lambda invoker
  payload_format_version = "2.0"
  timeout_milliseconds   = 10000
}

##############################################
# Route POST /contact  -> integración Lambda #
##############################################
resource "aws_apigatewayv2_route" "contact_post" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

##########################
# Stage (auto deploy)    #
##########################
resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = var.env
  auto_deploy = true

  route_settings {
    route_key = "POST /contact"
    throttling_burst_limit = 10
    throttling_rate_limit  = 1
  }

  tags = var.tags
}

##############################################################
# Permiso para que API Gateway invoque tu Lambda invoker
##############################################################
resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvokeContact"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name   # nombre (no el ARN) de tu Lambda invoker
  principal     = "apigateway.amazonaws.com"

  # Limita a este API, cualquier stage, método POST y path /contact
  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_apigatewayv2_api.this.id}/*/POST/contact"
}
