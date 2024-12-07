# Container Management Dashboard

A modern container management dashboard built with TypeScript, React, and NestJS, offering real-time monitoring and management of Kubernetes deployments.

## API Documentation

### Authentication API
```typescript
POST /auth/login
{
  "username": string,
  "password": string
}

GET /auth/profile
Authorization: Bearer {token}
```

### Deployments API
```typescript
GET /deployments
Authorization: Bearer {token}

POST /deployments
Authorization: Bearer {token}
{
  "name": string,
  "image": string,
  "replicas": number,
  "resources": {
    "limits": { "cpu": string, "memory": string },
    "requests": { "cpu": string, "memory": string }
  }
}

PUT /deployments/:name
DELETE /deployments/:name
GET /deployments/:name/logs
POST /deployments/:name/scale
```

### Metrics API
```typescript
GET /metrics
GET /metrics/summary
GET /metrics/history?duration=1h
```

## Project Structure
```
container-management-dashboard/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── types/
│   ├── test/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── k8s/
│   ├── development/
│   └── production/
└── docker/
```

## Prerequisites

- Node.js >= 18
- Docker
- Kubernetes cluster
- PostgreSQL
- Redis

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/container-management-dashboard.git
cd container-management-dashboard
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the development server
npm run start:dev
```

Required environment variables:
```env
# Backend .env
PORT=3000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the development server
npm run dev
```

Required environment variables:
```env
# Frontend .env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Docker Setup
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### 5. Kubernetes Deployment
```bash
# Create namespace
kubectl create namespace container-dashboard

# Apply configurations
kubectl apply -f k8s/development/
```

## Development

### Backend Development
```bash
cd backend

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Run linter
npm run lint
```

### Frontend Development
```bash
cd frontend

# Run tests
npm run test

# Run linter
npm run lint
```

## API Routes

### Auth Routes
- `POST /auth/login` - User authentication
- `GET /auth/profile` - Get user profile

### Deployment Routes
- `GET /deployments` - List all deployments
- `POST /deployments` - Create new deployment
- `PUT /deployments/:name` - Update deployment
- `DELETE /deployments/:name` - Delete deployment
- `GET /deployments/:name/logs` - Get deployment logs
- `POST /deployments/:name/scale` - Scale deployment

### Metrics Routes
- `GET /metrics` - Get current metrics
- `GET /metrics/summary` - Get metrics summary
- `GET /metrics/history` - Get historical metrics

## Technologies Used

### Backend
- NestJS
- TypeScript
- Kubernetes Client
- JWT Authentication
- WebSocket
- PostgreSQL
- Redis

### Frontend
- React/Next.js
- TypeScript
- TailwindCSS
- Recharts
- WebSocket Client

### Infrastructure
- Docker
- Kubernetes
- GitHub Actions

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Secure password handling
- Session management

### Deployment Management
- Create/Update/Delete deployments
- Scale deployments
- View deployment logs
- Resource management

### Metrics & Monitoring
- Real-time metrics via WebSocket
- Historical metrics tracking
- Resource usage visualization
- Status monitoring

### CI/CD
- Automated testing
- Docker image building
- Kubernetes deployment
- Environment management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Running Tests

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e
npm run test:cov

# Frontend tests
cd frontend
npm run test
```

## Environment Variables

### Backend Variables
```env
PORT=3000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
REDIS_HOST=localhost
REDIS_PORT=6379
KUBERNETES_CONFIG=path/to/config
```

### Frontend Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Kubernetes Client Library
- NestJS Framework
- React/Next.js
- TailwindCSS

## Support

For support, please open an issue in the GitHub repository.
