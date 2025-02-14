import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Profile: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
        <p className="text-gray-600">Manage your profile information here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 