import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Protect this route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-gray-600 mb-4">
            This is your personal dashboard where you can manage your account and access various features.
          </p>
        </div>
            
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Profile</h3>
            <p className="text-gray-600">View and edit your profile information</p>
          </div>
              
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 