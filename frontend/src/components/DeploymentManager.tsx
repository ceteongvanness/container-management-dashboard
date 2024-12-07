// frontend/src/components/DeploymentManager.tsx
import React, { useState } from 'react';
import { useDeployments } from '../hooks/useDeployments';

const DeploymentManager = () => {
  const { deployments, createDeployment, deleteDeployment } = useDeployments();
  const [newDeployment, setNewDeployment] = useState({
    name: '',
    image: '',
    replicas: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDeployment(newDeployment);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Deployments</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={newDeployment.name}
            onChange={e => setNewDeployment(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={newDeployment.image}
            onChange={e => setNewDeployment(prev => ({ ...prev, image: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Replicas</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={newDeployment.replicas}
            onChange={e => setNewDeployment(prev => ({ ...prev, replicas: parseInt(e.target.value) }))}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Deployment
        </button>
      </form>

      <div className="space-y-4">
        {deployments.map(deployment => (
          <div key={deployment.name} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-medium">{deployment.name}</h3>
              <p className="text-sm text-gray-500">{deployment.image}</p>
            </div>
            <button
              onClick={() => deleteDeployment(deployment.name)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentManager;