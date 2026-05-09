locals {
  lambda_name = var.function_name != "" ? var.function_name : "${var.project}-${var.env}-contact-form-fn"
}

########################################
# Empaquetado del código (zip)
########################################
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/src"
  output_path = "${path.module}/lambda.zip"
}

########################################
# CloudWatch Log Group (explícito)
########################################
resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${local.lambda_name}"
  retention_in_days = 30
  tags              = var.tags
}

########################################
# AWS Lambda Function
########################################
resource "aws_lambda_function" "this" {
  function_name = local.lambda_name
  role          = var.role_arn
  handler       = var.handler
  runtime       = var.runtime
  architectures = var.architectures

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)

  memory_size = var.memory_mb
  timeout     = var.timeout_seconds

  layers = var.layers

  # Publica una nueva versión cada cambio (útil si luego creas alias)
  publish = true

  environment {
    variables = {
      RECAPTCHA_SECRET = var.recaptcha_secret_key
      EMAIL_DISPATCHER_FUNCTION_NAME = var.email_dispatcher_function_name
      RECAPTCHA_EXPECTED_ACTION = var.recaptcha_expected_action
      RECAPTCHA_EXPECTED_HOSTNAME = var.recaptcha_expected_hostname
      RECAPTCHA_MIN_SCORE = var.recaptcha_min_score
      ZOHO_SMTP_PASS = var.smtp_pass
      ZOHO_FROM_EMAIL = var.zoho_from_email
    }
  }

  tags = merge(
    {
      Project     = var.project
      Environment = var.env
      ManagedBy   = "terraform"
      Purpose     = "contact-form"
    },
    var.tags
  )

  # Si no usas VPC, deja esto comentado. Si usas VPC, agrega subnets y SGs.
  # vpc_config {
  #   subnet_ids         = var.subnet_ids
  #   security_group_ids = var.security_group_ids
  # }
}

# Concurrencia reservada (opcional)
resource "aws_lambda_function_event_invoke_config" "this" {
  function_name                = aws_lambda_function.this.function_name
  maximum_retry_attempts       = 2
  maximum_event_age_in_seconds = 60
}

# Límite de concurrencia si se solicita (solo aplica si no es -1)
resource "aws_lambda_provisioned_concurrency_config" "placeholder" {
  count                          = 0 # Dejar 0; provisioned concurrency requiere alias+version. Se deja como ejemplo.
  function_name                  = aws_lambda_function.this.function_name
  qualifier                      = aws_lambda_function.this.version
  provisioned_concurrent_executions = 1
}
