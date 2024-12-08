// backend/src/types/types.ts
export interface User {
  id: string;
  username: string;
  password: string;
  roles: string[];
}

export interface DeploymentConfig {
  name: string;
  namespace?: string;
  image: string;
  replicas: number;
  ports?: Array<{
    containerPort: number;
    protocol?: string;
  }>;
  env?: Array<{
    name: string;
    value: string;
  }>;
  resources?: {
    limits: {
      cpu: string;
      memory: string;
    };
    requests: {
      cpu: string;
      memory: string;
    };
  };
}

export interface DeploymentMetrics {
  name: string;
  replicas: {
    desired: number;
    available: number;
  };
  status: any[];
  age: Date;
}

export interface MetricSummary {
  totalDeployments: number;
  healthyDeployments: number;
}

export interface MetricsHistory {
  timestamp: Date;
  metrics: DeploymentMetrics[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}
