// src/services/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';
import * as k8s from '@kubernetes/client-node';
import {
  DeploymentMetrics,
  MetricSummary,
  MetricsHistory,
} from '../types/types';

@Injectable()
export class MetricsService {
  constructor(private readonly kubernetesService: KubernetesService) {}

  async getMetrics(namespace = 'default'): Promise<DeploymentMetrics[]> {
    const deployments = await this.kubernetesService.listDeployments(namespace);
    return deployments.items.map((deployment: k8s.V1Deployment) => ({
      name: deployment.metadata?.name || 'unknown',
      replicas: {
        desired: deployment.spec?.replicas || 0,
        available: deployment.status?.availableReplicas || 0,
      },
      status: deployment.status?.conditions || [],
      age: new Date(deployment.metadata?.creationTimestamp || new Date()),
    }));
  }

  async getMetricsSummary(namespace = 'default'): Promise<MetricSummary> {
    const metrics = await this.getMetrics(namespace);
    return {
      totalDeployments: metrics.length,
      healthyDeployments: metrics.filter(
        (m) => m.replicas.available === m.replicas.desired,
      ).length,
    };
  }

  async getMetricsHistory(
    namespace = 'default',
    duration = '1h',
  ): Promise<MetricsHistory[]> {
    const endTime = new Date();
    const startTime = this.parseDurationToDate(duration);
    const intervals = this.generateTimeIntervals(startTime, endTime);

    const currentMetrics = await this.getMetrics(namespace);
    return intervals.map((timestamp: Date) => ({
      timestamp,
      metrics: currentMetrics,
    }));
  }

  private parseDurationToDate(duration: string): Date {
    const match = duration.match(/^(\d+)(h|d)$/);
    if (!match) {
      throw new Error('Invalid duration format. Use format: 1h, 2h, 1d, etc.');
    }

    const [, value, unit] = match;
    const hours = unit === 'h' ? parseInt(value) : parseInt(value) * 24;
    const now = new Date();
    return new Date(now.getTime() - hours * 60 * 60 * 1000);
  }

  private generateTimeIntervals(start: Date, end: Date): Date[] {
    const intervals: Date[] = [];
    let current = new Date(start);
    const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

    while (current <= end) {
      intervals.push(new Date(current));
      current = new Date(current.getTime() + interval);
    }

    return intervals;
  }
}
