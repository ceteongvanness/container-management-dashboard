// src/components/StatusOverview.tsx
import React from 'react';
import type { ContainerMetrics } from '../types/types';

interface Props {
  metrics: ContainerMetrics[];
}

export const StatusOverview: React.FC<Props> = ({ metrics }) => {
  const runningContainers = metrics.filter(m => m.status === 'running').length;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
      <div>
        <p>Running Containers: {runningContainers}</p>
        <p>Total Containers: {metrics.length}</p>
      </div>
    </div>
  );
};