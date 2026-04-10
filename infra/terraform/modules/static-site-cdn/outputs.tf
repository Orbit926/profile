output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.site_cdn.domain_name
  description = "Dominio de CloudFront para el sitio estático"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.site_cdn.id
  description = "ID de la distribución de CloudFront"
}
