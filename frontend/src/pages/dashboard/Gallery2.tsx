import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Gallery: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
        <p className="text-gray-600">View and manage your gallery items here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Gallery; 