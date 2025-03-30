import React from 'react';
import Reviews from './Reviews';
import ServiceManagement from './ServiceManagement';
import Notifications from './Notifications';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-montserrat font-bold text-gray-800 mb-8">
          Tableau de bord
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ServiceManagement />
            <Notifications />
          </div>
          <div>
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;