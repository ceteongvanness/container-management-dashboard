// frontend/src/types/types.ts
export interface ContainerMetrics {
    name: string;
    status: 'running' | 'stopped' | 'failed';
    cpu: {
      usage: number;
      limit: number;
    };
    memory: {
      usage: number;
      limit: number;
    };
    restarts: number;
  }
  
  export interface Deployment {
    name: string;
    namespace?: string;
    image: string;
    replicas: number;
    status?: string;
  }
  
  export interface MetricsData {
    metrics: ContainerMetrics[];
    timestamp: string;
  }