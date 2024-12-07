// backend/src/controllers/deployment.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { KubernetesService } from '../services/kubernetes.service';
import { DeploymentConfig } from '../types/types';

@Controller('deployments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeploymentController {
  constructor(private readonly kubernetesService: KubernetesService) {}

  @Get()
  async getAllDeployments(@Query('namespace') namespace: string = 'default') {
    return await this.kubernetesService.listDeployments(namespace);
  }

  @Post()
  @Roles('admin')
  async createDeployment(@Body() config: DeploymentConfig) {
    return await this.kubernetesService.createDeployment(config);
  }

  @Put(':name')
  @Roles('admin')
  async updateDeployment(
    @Param('name') name: string,
    @Body() config: DeploymentConfig
  ) {
    return await this.kubernetesService.updateDeployment(name, config);
  }

  @Delete(':name')
  @Roles('admin')
  async deleteDeployment(
    @Param('name') name: string,
    @Query('namespace') namespace: string = 'default'
  ) {
    return await this.kubernetesService.deleteDeployment(name, namespace);
  }
}