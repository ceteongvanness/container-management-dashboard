// src/components/MetricsDashboard.tsx
import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const MetricsDashboard = () => {
  const { data: metrics } = useWebSocket<any>('ws://localhost:3000/metrics');

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Container Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placeholder for metrics */}
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-medium">Total Containers</h3>
            <p className="text-2xl font-bold">{metrics?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;