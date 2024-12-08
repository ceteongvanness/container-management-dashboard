// src/components/MetricsChart.tsx
import React from 'react';
import type { ContainerMetrics } from '../types/types';

interface Props {
  metrics: ContainerMetrics[];
}

export const MetricsChart: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Metrics Chart</h2>
      <div>
        {metrics.length > 0 ? (
          <p>Total Containers: {metrics.length}</p>
        ) : (
          <p>No metrics available</p>
        )}
      </div>
    </div>
  );
};