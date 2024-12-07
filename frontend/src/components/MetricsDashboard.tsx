// frontend/src/components/MetricsDashboard.tsx
import React from 'react';
import { MetricsChart } from './MetricsChart';
import { StatusOverview } from './StatusOverview';
import useWebSocket from '../hooks/useWebSocket';
import { ContainerMetrics } from '../types/types';

const MetricsDashboard = () => {
  const { data: metrics } = useWebSocket<ContainerMetrics[]>('ws://localhost:3000/metrics');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Container Dashboard</h1>
      <StatusOverview metrics={metrics} />
      <div className="mt-6">
        <MetricsChart metrics={metrics} />
      </div>
    </div>
  );
};