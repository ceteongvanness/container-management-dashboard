# Bloomberg PaaS-Style Container Management Dashboard

## Overview
A modern container management dashboard that demonstrates cloud-native development practices and container orchestration capabilities. This project showcases a scalable Platform-as-a-Service (PaaS) architecture similar to enterprise-grade container management systems.

## Features
- 🔄 Real-time container metrics monitoring
- 🚀 Kubernetes deployment management
- 📊 Resource usage tracking and visualization
- 👥 Multi-tenant support
- 🔐 Role-based access control
- 📈 Real-time metrics using WebSocket
- 📝 OpenAPI documentation
- 🔄 CI/CD pipeline integration

## Tech Stack
- **Backend:**
  - NestJS (TypeScript)
  - Kubernetes Client Library
  - WebSocket for real-time updates
  - Jest for testing
  
- **Frontend:**
  - React/Next.js
  - TypeScript
  - TailwindCSS
  - Recharts for metrics visualization
  
- **Infrastructure:**
  - Docker
  - Kubernetes
  - Redis for caching
  - PostgreSQL for persistent storage

## Project Structure
```
container-management-dashboard/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── decorators/
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── guards/
│   │   │   │   └── roles.guard.ts
│   │   │   └── auth.service.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── deployment.controller.ts
│   │   │   └── metrics.controller.ts
│   │   ├── services/
│   │   │   ├── kubernetes.service.ts
│   │   │   └── metrics.service.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── metrics/
│   │   │   └── metrics.gateway.ts
│   │   └── types/
│   │       └── types.ts
│   ├── test/
│   │   ├── auth.service.spec.ts
│   │   └── kubernetes.service.spec.ts
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MetricsDashboard.tsx
│   │   │   ├── DeploymentManager.tsx
│   │   │   ├── MetricsChart.tsx
│   │   │   └── StatusOverview.tsx
│   │   ├── pages/
│   │   │   ├── index.tsx
│   │   │   ├── login.tsx
│   │   │   └── deployments.tsx
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useDeployments.ts
│   │   └── utils/
│   │       ├── auth.ts
│   │       └── api.ts
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── k8s/
│   ├── development/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── secrets.yaml
│   │   └── ingress.yaml
│   └── production/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── secrets.yaml
│       └── ingress.yaml
│
├── docker/
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18
- Docker
- Kubernetes cluster (local or remote)
- kubectl configured with cluster access

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/ceteongvanness/container-management-dashboard.git
cd container-management-dashboard
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run start:dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

4. **Deploy to Kubernetes**
```bash
kubectl apply -f k8s/development/
```

### Running Tests
```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## API Documentation
API documentation is available at `http://localhost:3000/api-docs` when running the backend locally.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Architecture Overview

### Backend Services
- **AuthService**: Handles authentication and authorization
- **KubernetesService**: Manages container deployments and updates
- **MetricsService**: Collects and processes container metrics
- **WebSocketService**: Manages real-time updates

### Frontend Components
- **Dashboard**: Main monitoring interface
- **DeploymentManager**: Container deployment interface
- **MetricsViewer**: Resource usage visualization
- **UserManagement**: User and role management interface

## Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- Kubernetes RBAC integration
- API rate limiting
- Input validation and sanitization

## Monitoring and Logging
- Prometheus integration for metrics
- ELK stack for log aggregation
- Health check endpoints
- Error tracking and reporting

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
