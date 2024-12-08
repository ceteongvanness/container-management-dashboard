// backend/src/types/metrics.types.ts
export interface MetricSummary {
  totalDeployments: number;
  healthyDeployments: number;
}

export interface MetricsHistory {
  timestamp: Date;
  metrics: DeploymentMetrics[];
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
