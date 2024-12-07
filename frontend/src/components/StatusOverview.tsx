// frontend/src/components/StatusOverview.tsx
import React from 'react';
import { ContainerMetrics } from '../types/types';

interface Props {
  metrics: ContainerMetrics[];
}

export const StatusOverview: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
      {/* Status implementation */}
    </div>
  );
};