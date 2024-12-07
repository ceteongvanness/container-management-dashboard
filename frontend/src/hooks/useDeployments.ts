// frontend/src/hooks/useDeployments.ts
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Deployment } from '../types/types';

export function useDeployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeployments = async () => {
    try {
      const { data } = await api.get<Deployment[]>('/deployments');
      setDeployments(data);
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDeployment = async (deploymentConfig: Omit<Deployment, 'status'>) => {
    try {
      await api.post('/deployments', deploymentConfig);
      await fetchDeployments();
    } catch (error) {
      console.error('Failed to create deployment:', error);
      throw error;
    }
  };

  const deleteDeployment = async (name: string) => {
    try {
      await api.delete(`/deployments/${name}`);
      await fetchDeployments();
    } catch (error) {
      console.error('Failed to delete deployment:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, []);

  return { deployments, loading, createDeployment, deleteDeployment };
}