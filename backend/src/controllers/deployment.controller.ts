// backend/src/controllers/deployment.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth';
import { KubernetesService } from '../services';
import { DeploymentConfig } from '../types/types';
import * as k8s from '@kubernetes/client-node';

@Controller('deployments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeploymentController {
  constructor(private readonly kubernetesService: KubernetesService) {}

  @Get()
  async getAllDeployments(
    @Query('namespace') namespace = 'default',
  ): Promise<k8s.V1DeploymentList> {
    return await this.kubernetesService.listDeployments(namespace);
  }

  @Post()
  @Roles('admin')
  async createDeployment(@Body() config: DeploymentConfig): Promise<k8s.V1Deployment> {
    return await this.kubernetesService.createDeployment(config);
  }

  @Put(':name')
  @Roles('admin')
  async updateDeployment(
    @Param('name') name: string,
    @Body() config: DeploymentConfig,
  ): Promise<k8s.V1Deployment> {
    return await this.kubernetesService.updateDeployment(name, config);
  }

  @Delete(':name')
  @Roles('admin')
  async deleteDeployment(
    @Param('name') name: string,
    @Query('namespace') namespace = 'default',
  ): Promise<k8s.V1Status> {
    return await this.kubernetesService.deleteDeployment(name, namespace);
  }
}
