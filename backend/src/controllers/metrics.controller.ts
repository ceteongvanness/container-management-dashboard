// backend/src/controllers/metrics.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth';
import { MetricsService } from '../services';
import { DeploymentMetrics, MetricSummary, MetricsHistory } from '../types/types';

@Controller('metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Query('namespace') namespace: string = 'default'): Promise<DeploymentMetrics[]> {
    return await this.metricsService.getMetrics(namespace);
  }

  @Get('summary')
  async getMetricsSummary(@Query('namespace') namespace: string = 'default'): Promise<MetricSummary> {
    return await this.metricsService.getMetricsSummary(namespace);
  }

  @Get('history')
  async getMetricsHistory(
    @Query('namespace') namespace: string = 'default',
    @Query('duration') duration: string = '1h'
  ): Promise<MetricsHistory[]> {
    return await this.metricsService.getMetricsHistory(namespace, duration);
  }
}