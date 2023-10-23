provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source            = "git::https://github.com/oostvoort/terraform.git//aws/modules/vpc"
  projectname       = var.projectname
  environment       = var.environment
  aws_region        = var.aws_region
  cidr_block        = var.cidr_block
  subnet_cidrs      = var.subnet_cidrs
  ingress_ports     = var.ingress_ports
  use_existing_bucket = var.use_existing_bucket
}

module "ecs" {
  source = "git::https://github.com/oostvoort/terraform.git//aws//modules/ecs"
  aws_region        = var.aws_region
  projectname       = var.projectname
  environment       = var.environment
  vpc_subnets       = module.vpc.subnet_ids
  vpc_security_group= module.vpc.security_group_id
  registry          = var.registry
  imageversion      = var.imageversion
  port_mappings     = var.port_mappings
  cpu               = var.cpu
  memory            = var.memory
  desired_count     = var.desired_count


}

