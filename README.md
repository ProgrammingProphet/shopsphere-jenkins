# 🛍️ ShopSphere - Scalable E-Commerce Microservices Platform

## 🚀 Overview

ShopSphere is a modern e-commerce platform built with Spring Boot microservices architecture, designed to demonstrate enterprise-level DevOps practices.

## 🏗️ Architecture

- **User Service** - Authentication & user management
- **Product Service** - Product catalog & inventory
- **Order Service** - Order processing & payments

## 🛠️ Tech Stack

- **Backend**: Spring Boot, PostgreSQL, JPA
- **DevOps**: Docker, Kubernetes, AWS (EKS, ECR, RDS)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Infrastructure as Code**: Terraform

## 📋 Prerequisites

- Java 17
- Docker & Docker Compose
- kubectl
- AWS CLI
- Terraform

## 🏁 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/shopsphere.git
cd shopsphere

# Build all services
make build

# Start services
make up

# Run tests
make test

# View logs
make logs
```

### Docker Compose

```bash
docker-compose up -d
```

### Kubernetes Deployment

```bash
# Deploy to Kubernetes
make deploy

# Check status
kubectl get pods -n shopsphere
```

## 📊 Monitoring

- Prometheus: <http://localhost:9090>
- Grafana: <http://localhost:3000> (admin/admin)

## 🧪 API Testing

```bash
./scripts/test-api.sh
```

## 🏗️ AWS Deployment

```bash
# Initialize Terraform
cd terraform
terraform init

# Plan deployment
terraform plan

# Apply infrastructure
terraform apply

# Configure kubectl
aws eks update-kubeconfig --name shopsphere-cluster

# Deploy applications
kubectl apply -f kubernetes/base/
```

## 📈 CI/CD Pipeline

The project uses GitHub Actions for:

- ✅ Code build & test
- 🐳 Docker image creation
- ☁️ Push to AWS ECR
- 🚀 Deploy to EKS

## 🔒 Environment Variables

Create `.env` file:

```env
DB_USERNAME=admin
DB_PASSWORD=password
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

## 🧹 Cleanup

```bash
# Stop local services
make down

# Clean Docker resources
docker system prune -a

# Destroy AWS resources
cd terraform
terraform destroy
```

## 📝 License

MIT License

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot Team
- AWS Community
- Kubernetes Community

Update
Update 2
