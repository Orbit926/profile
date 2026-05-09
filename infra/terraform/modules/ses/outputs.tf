output "ses_domain_identity_arn" { value = aws_ses_domain_identity.domain.arn }
output "mail_from_domain"        { value = aws_ses_domain_mail_from.mailfrom.mail_from_domain }
output "configuration_set_name"  { value = aws_sesv2_configuration_set.prod.configuration_set_name }
output "sns_bounces_topic_arn"   { value = aws_sns_topic.bounces.arn }
output "sns_complaints_topic_arn"{ value = aws_sns_topic.complaints.arn }
output "sns_deliveries_topic_arn"{ value = aws_sns_topic.deliveries.arn }
