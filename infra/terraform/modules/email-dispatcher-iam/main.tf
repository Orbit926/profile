locals {
  role_name       = var.role_name_prefix != "" ? var.role_name_prefix : "${var.project}-${var.env}-email-dispatcher"
  ses_condition   = length(var.from_addresses) > 0 ? {
    Condition = {
      StringLike = {
        "ses:FromAddress" = var.from_addresses
      }
    }
  } : {}
}

resource "aws_iam_role" "email_dispatcher" {
  name = "${local.role_name}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })

  tags = var.tags
}

resource "aws_iam_role_policy" "email_dispatcher_policy" {
  name = "${local.role_name}-policy"
  role = aws_iam_role.email_dispatcher.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      },
      merge(
        {
          Effect = "Allow"
          Action = [
            "ses:SendEmail",
            "ses:SendRawEmail",
            "ses:SendTemplatedEmail",
            "ses:SendBulkTemplatedEmail"
          ]
          Resource = "*"
        },
        local.ses_condition
      )
    ]
  })
}
