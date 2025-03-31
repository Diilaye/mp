import React from 'react';
import { motion } from 'framer-motion';
import { useHousekeeperStore } from '../../../store/housekeeperStore';
import UserManagement from './UserManagement';
import TransactionHistory from './TransactionHistory';
import Support from './Support';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-montserrat font-bold text-gray-800 mb-8">
          Tableau de bord administrateur
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <UserManagement />
            <TransactionHistory />
          </div>
          <div>
            <Support />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;