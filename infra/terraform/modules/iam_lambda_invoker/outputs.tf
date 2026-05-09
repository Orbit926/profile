output "lambda_invoker_role_name" {
  value = aws_iam_role.lambda_invoke.name
}

output "lambda_invoker_role_arn" {
  value = aws_iam_role.lambda_invoke.arn
}
