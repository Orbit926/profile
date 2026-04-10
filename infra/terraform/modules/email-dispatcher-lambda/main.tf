locals {
  base_name     = "${var.project}-${var.env}-email-dispatcher"
  fn_name_final = var.function_name != "" ? var.function_name : "${local.base_name}-fn"
}

# Empaquetar el código desde ./src
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/src"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "this" {
  function_name = local.fn_name_final
  role          = var.role_arn
  handler       = "index.lambda_handler"
  runtime       = "python3.12"
  filename      = data.archive_file.lambda_zip.output_path
  architectures = ["x86_64"]
  memory_size   = var.memory_mb
  timeout       = var.timeout_seconds
  publish       = true

  environment {
    variables = {
      SES_REGION     = var.ses_region
      FROM_EMAIL     = var.from_email
      VENDOR_EMAIL   = var.vendor_email
      ALLOWED_ORIGIN = var.allowed_origin
    }
  }

  tags = var.tags
}

# (Opcional pero recomendado) Log group con retención
resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${aws_lambda_function.this.function_name}"
  retention_in_days = 30
  tags              = var.tags
}
