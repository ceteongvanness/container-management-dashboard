// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { DeploymentController } from './controllers/deployment.controller';
import { MetricsController } from './controllers/metrics.controller';
import { KubernetesService, MetricsService } from './services';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    AuthController,
    DeploymentController,
    MetricsController,
  ],
  providers: [
    KubernetesService,
    MetricsService,
  ],
})
export class AppModule {}