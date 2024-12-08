// src/pages/index.tsx
import React from 'react';
import MetricsDashboard from '../components/MetricsDashboard';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Container Management Dashboard</h1>
      <MetricsDashboard />
    </div>
  );
};

export default HomePage;