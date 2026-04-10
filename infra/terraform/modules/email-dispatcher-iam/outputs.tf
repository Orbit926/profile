output "email_dispatcher_role_name" {
  value = aws_iam_role.email_dispatcher.name
}

output "email_dispatcher_role_arn" {
  value = aws_iam_role.email_dispatcher.arn
}
