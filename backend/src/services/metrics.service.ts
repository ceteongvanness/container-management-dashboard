// backend/src/services/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import * as k8s from '@kubernetes/client-node';
import { MetricSummary, MetricsHistory, DeploymentMetrics } from '../types/metrics.types';

@Injectable()
export class MetricsService {
  constructor(private readonly kubernetesService: KubernetesService) {}

  async getMetrics(namespace: string = 'default'): Promise<DeploymentMetrics[]> {
    const deployments = await this.kubernetesService.listDeployments(namespace);
    return deployments.items.map((deployment: k8s.V1Deployment) => ({
      name: deployment.metadata?.name || 'unknown',
      replicas: {
        desired: deployment.spec?.replicas || 0,
        available: deployment.status?.availableReplicas || 0
      },
      status: deployment.status?.conditions || [],
      age: new Date(deployment.metadata?.creationTimestamp || new Date())
    }));
  }

  async getMetricsSummary(namespace: string = 'default'): Promise<MetricSummary> {
    const metrics = await this.getMetrics(namespace);
    return {
      totalDeployments: metrics.length,
      healthyDeployments: metrics.filter(m => 
        m.replicas.available === m.replicas.desired
      ).length
    };
  }

  async getMetricsHistory(namespace: string = 'default', duration: string = '1h'): Promise<MetricsHistory[]> {
    // Calculate time range based on duration
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - this.parseDuration(duration));
    
    // For demonstration, we'll just return current metrics with different timestamps
    const currentMetrics = await this.getMetrics(namespace);
    
    // Create sample history data
    const intervals = this.generateTimeIntervals(startTime, endTime);
    return intervals.map(timestamp => ({
      timestamp,
      metrics: currentMetrics
    }));
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/^(\d+)(h|d)$/);
    if (!match) {
      throw new Error('Invalid duration format. Use format: 1h, 2h, 1d, etc.');
    }

    const [_, value, unit] = match;
    const hours = unit === 'h' ? parseInt(value) : parseInt(value) * 24;
    return hours * 60 * 60 * 1000; // Convert to milliseconds
  }

  private generateTimeIntervals(start: Date, end: Date): Date[] {
    const intervals: Date[] = [];
    let current = new Date(start);
    
    while (current <= end) {
      intervals.push(new Date(current));
      // Add 5-minute intervals
      current = new Date(current.getTime() + 5 * 60 * 1000);
    }
    
    return intervals;
  }
}