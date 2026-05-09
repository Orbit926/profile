locals {
  # Si mandas un prefix explícito, úsalo; de lo contrario usa project-env-lambda-invoker
  role_name = var.role_name_prefix != "" ? var.role_name_prefix : "${var.project}-${var.env}-lambda-invoker"
}

#################################
# IAM Role para Lambda Caller   #
#################################

resource "aws_iam_role" "lambda_invoke" {
  name = "contact-form-${local.role_name}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = var.tags
}

#############################################
# Política: Logs básicos para la Lambda     #
#############################################

resource "aws_iam_role_policy" "basic_logs" {
  name = "${local.role_name}-logs-policy"
  role = aws_iam_role.lambda_invoke.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      Resource = "*"
    }]
  })
}

########################################################
# Política para permitir invocar otras Lambda(s)       #
########################################################

resource "aws_iam_role_policy" "lambda_invoke_policy" {
  name = "${local.role_name}-invoke-policy"
  role = aws_iam_role.lambda_invoke.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "lambda:InvokeFunction"
        ]
        Resource = "*"
      }
    ]
  })
}
