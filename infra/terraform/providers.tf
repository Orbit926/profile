provider "aws" {
  region  = var.aws_region
  profile = "orbit"

  ignore_tags {
    keys = ["awsApplication"]
    # Si algún día AWS crea otros tags especiales, puedes usar:
    # key_prefixes = ["aws"]
  }
}
