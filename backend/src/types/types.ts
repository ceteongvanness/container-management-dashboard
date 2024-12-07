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
    labels?: Record<string, string>;
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
  
  export interface ContainerMetrics {
    containerId: string;
    name: string;
    namespace: string;
    status: 'running' | 'stopped' | 'failed';
    cpu: {
      usage: number;
      limit: number;
      percentage: number;
    };
    memory: {
      usage: number;
      limit: number;
      percentage: number;
    };
    network: {
      rxBytes: number;
      txBytes: number;
    };
    restarts: number;
    startTime: Date;
  }