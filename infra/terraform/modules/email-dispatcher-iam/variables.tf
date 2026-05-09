variable "project" {
  type = string
}

variable "env" {
  type = string
}

variable "role_name_prefix" {
  type    = string
  default = ""
}

variable "from_addresses" {
  type    = list(string)
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
