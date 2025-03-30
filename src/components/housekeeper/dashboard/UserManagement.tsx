import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserMinus, Edit2, Eye } from 'lucide-react';
import CreateUserModal from './modals/CreateUserModal';
import ViewUserModal from './modals/ViewUserModal';
import EditUserModal from './modals/EditUserModal';
import { RegistrationData } from '../RegistrationForm';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'housekeeper' | 'client';
  status: 'active' | 'pending' | 'blocked';
  data: RegistrationData;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Marie Dupont',
      email: 'marie.dupont@email.com',
      role: 'housekeeper',
      status: 'active',
      data: {
        personalInfo: {
          firstName: 'Marie',
          lastName: 'Dupont',
          email: 'marie.dupont@email.com',
          phone: '+33 6 12 34 56 78',
          address: '123 Rue de Paris, 75001 Paris',
        },
        experience: {
          yearsExperience: '5',
          specialties: ['Ménage général', 'Repassage', 'Cuisine'],
          availability: ['Lundi matin', 'Mardi matin', 'Jeudi après-midi'],
          hourlyRate: '25',
        },
        documents: {
          photo: null,
          cv: null,
          certifications: [],
        },
      },
    },
    {
      id: '2',
      name: 'Jean Martin',
      email: 'jean.martin@email.com',
      role: 'client',
      status: 'pending',
      data: {
        personalInfo: {
          firstName: 'Jean',
          lastName: 'Martin',
          email: 'jean.martin@email.com',
          phone: '+33 6 98 76 54 32',
          address: '456 Avenue des Champs-Élysées, 75008 Paris',
        },
        experience: {
          yearsExperience: '3',
          specialties: ['Garde d\'enfants', 'Aide aux personnes âgées'],
          availability: ['Mercredi matin', 'Vendredi après-midi'],
          hourlyRate: '22',
        },
        documents: {
          photo: null,
          cv: null,
          certifications: [],
        },
      },
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = (userData: RegistrationData) => {
    const newUser = {
      id: (users.length + 1).toString(),
      name: `${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`,
      email: userData.personalInfo.email,
      role: 'housekeeper',
      status: 'pending',
      data: userData,
    };
    setUsers([...users, newUser]);
    setIsCreateModalOpen(false);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedData: RegistrationData) => {
    if (!selectedUser) return;

    const updatedUser = {
      ...selectedUser,
      name: `${updatedData.personalInfo.firstName} ${updatedData.personalInfo.lastName}`,
      email: updatedData.personalInfo.email,
      data: updatedData,
    };

    setUsers(users.map(user => 
      user.id === selectedUser.id ? updatedUser : user
    ));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Gestion des utilisateurs
            </h2>
          </div>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-montserrat text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-montserrat text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-montserrat text-gray-700">Rôle</th>
                <th className="text-left py-3 px-4 font-montserrat text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-montserrat text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 px-4">{user.name}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className="capitalize">{user.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : user.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </button>
                      <button 
                        className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Éditer
                      </button>
                      <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors">
                        <UserMinus className="w-4 h-4 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />

      {selectedUser && (
        <>
          <ViewUserModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            userData={selectedUser.data}
          />
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateUser}
            initialData={selectedUser.data}
          />
        </>
      )}
    </>
  );
};

export default UserManagement;