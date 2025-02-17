import React from 'react';
import DashboardLayout from './layout/DashboardLayout';

const Settings: React.FC = () => {
  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
        <p className="text-gray-600">Configure your account settings here.</p>
      </div>
  );
};

export default Settings; 