variable "projectname" {
  description = "Name of the project"
  type        = string
  default     = "dojorps"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region to deploy resources in."
  default     = "us-east-1"
}

variable "cidr_block" {
  description = "IP range for the VPC cidr block"
  default     = "10.0.0.0/16"
}

variable "subnet_cidrs" {
  description = "CIDRs for subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "ingress_ports" {
  description = "List of ports to allow in the security group"
  type        = list(number)
  default     = [3000, 8080, 5050]
}

variable "use_existing_bucket" {
  description = "Use existing S3 bucket"
  type        = bool
  default     = false
}

variable "registry" {
  description = "The name of the registry"
  type        = string
  default     = "oostvoort"
}


variable "imageversion" {
  description = "The version of docker image"
  type        = string
  default     = "latest"
}

variable "port_mappings" {
  description = "List of port mappings"
  type        = list(object({ containerPort = number, hostPort = number }))
  default     = [
    { containerPort = 3000, hostPort = 3000 },
    { containerPort = 8080, hostPort = 8080 },
    { containerPort = 5050, hostPort = 5050 }
  ]
}

variable "cpu" {
  description = "The amount of cpu assigned to fargate container"
  type        = number
  default     = "256"
}

variable "memory" {
  description = "The amount of memory assigned to fargate container"
  type        = number
  default     = "512"
}
                    

variable "desired_count" {
  description = "The total number of container once deployed"
  type        = number  
  default = 1
}