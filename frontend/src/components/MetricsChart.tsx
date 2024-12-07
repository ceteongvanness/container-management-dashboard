// frontend/src/components/MetricsChart.tsx
import React from 'react';
import { ContainerMetrics } from '../types/types';

interface Props {
  metrics: ContainerMetrics[];
}

export const MetricsChart: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Metrics Chart</h2>
      {/* Chart implementation */}
    </div>
  );
};