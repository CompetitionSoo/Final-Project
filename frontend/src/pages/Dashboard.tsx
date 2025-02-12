import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Protect this route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome to your Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              This is your personal dashboard where you can manage your account and access various features.
            </p>
            
            {/* Add your dashboard content here */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Profile</h3>
                <p className="text-gray-600">View and edit your profile information</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
                <p className="text-gray-600">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 