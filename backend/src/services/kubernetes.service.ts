// backend/src/services/kubernetes.service.ts
import { Injectable } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';
import { DeploymentConfig } from '../types/types';

@Injectable()
export class KubernetesService {
  private readonly kc: k8s.KubeConfig;
  private readonly k8sApi: k8s.CoreV1Api;
  private readonly k8sAppsApi: k8s.AppsV1Api;

  constructor() {
    this.kc = new k8s.KubeConfig();
    this.kc.loadFromDefault();
    this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
    this.k8sAppsApi = this.kc.makeApiClient(k8s.AppsV1Api);
  }

  async listDeployments(namespace = 'default'): Promise<k8s.V1DeploymentList> {
    const response = await this.k8sAppsApi.listNamespacedDeployment(namespace);
    return response.body;
  }

  async createDeployment(config: DeploymentConfig): Promise<k8s.V1Deployment> {
    const deployment: k8s.V1Deployment = {
      metadata: {
        name: config.name,
        namespace: config.namespace || 'default',
      },
      spec: {
        replicas: config.replicas,
        selector: {
          matchLabels: {
            app: config.name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: config.name,
            },
          },
          spec: {
            containers: [
              {
                name: config.name,
                image: config.image,
                ports: config.ports || [],
                env: config.env || [],
                resources: config.resources || {},
              },
            ],
          },
        },
      },
    };

    const response = await this.k8sAppsApi.createNamespacedDeployment(
      config.namespace || 'default',
      deployment,
    );
    return response.body;
  }

  async updateDeployment(
    name: string,
    config: DeploymentConfig,
  ): Promise<k8s.V1Deployment> {
    const deployment: k8s.V1Deployment = {
      metadata: {
        name: config.name,
        namespace: config.namespace || 'default',
      },
      spec: {
        replicas: config.replicas,
        selector: {
          matchLabels: {
            app: config.name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: config.name,
            },
          },
          spec: {
            containers: [
              {
                name: config.name,
                image: config.image,
                ports: config.ports || [],
                env: config.env || [],
                resources: config.resources || {},
              },
            ],
          },
        },
      },
    };

    const response = await this.k8sAppsApi.replaceNamespacedDeployment(
      name,
      config.namespace || 'default',
      deployment,
    );
    return response.body;
  }

  async deleteDeployment(
    name: string,
    namespace = 'default',
  ): Promise<k8s.V1Status> {
    const response = await this.k8sAppsApi.deleteNamespacedDeployment(
      name,
      namespace,
    );
    return response.body;
  }
}
