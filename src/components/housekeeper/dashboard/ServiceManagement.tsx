import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, Plus, Trash, ToggleLeft as Toggle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { desc } from 'framer-motion/client';
import { API_BASE_URL } from '../../../config/api.config';

interface Service {
  id: string;
  nom: string;
  price: number;
  isAvailable: boolean;
}

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [tempRate, setTempRate] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    nom: '',
    price: '',
    description: '',
  });

  // Chargement initial des services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/service`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setServices(response.data.data);
      } else {
        toast.error('Erreur lors de la récupération des services');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      toast.error('Impossible de récupérer les services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTempRate(service.price.toString());
  };

  const handleSave = async () => {
    if (editingService && tempRate) {
      const token = localStorage.getItem('token');
      const updatedService = {
        ...editingService,
        rate: parseFloat(tempRate),
      };

      try {
        const response = await axios.put(
          `${API_BASE_URL}/service/${editingService.id}`,
          updatedService,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        );

        if (response.data.success) {
          setServices(services.map(s => 
            s.id === editingService.id ? updatedService : s
          ));
          toast.success('Service mis à jour avec succès');
        } else {
          toast.error('Erreur lors de la mise à jour du service');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du service:', error);
        toast.error('Impossible de mettre à jour le service');
      } finally {
        setEditingService(null);
      }
    }
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  const toggleServiceAvailability = async (serviceId: string) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('Service ID:', serviceId);
    const service = services.find(s => s.id === serviceId);
    
    if (!service) return;
    
    console.log('Service:', service);

    const updatedAvailability = !service.isAvailable;
    
    try {
      const response = await axios.put(
        `${API_BASE_URL}/service/${serviceId}`,
        { ...service, isAvailable: updatedAvailability },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setServices(services.map(s => 
          s.id === serviceId ? { ...s, isAvailable: updatedAvailability } : s
        ));
        toast.success(`Service ${updatedAvailability ? 'activé' : 'désactivé'} avec succès`);
      } else {
        toast.error('Erreur lors de la modification du statut');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      toast.error('Impossible de modifier le statut du service');
    }
  };

  const handleAddService = async () => {
    if (!newService.nom || !newService.price || !newService.description) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/service`,
        {
          nom: newService.nom,
          price: parseFloat(newService.price),
          description: newService.description,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // Récupérer tous les services pour s'assurer d'avoir l'ID correct du nouveau service
        fetchServices();
        setNewService({ nom: '', price: ''  , description: '' });
        setShowAddForm(false);
        toast.success('Service ajouté avec succès');
      } else {
        toast.error('Erreur lors de l\'ajout du service');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service:', error);
      toast.error('Impossible d\'ajouter le service');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/service/${serviceId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setServices(services.filter(s => s.id !== serviceId));
        toast.success('Service supprimé avec succès');
      } else {
        toast.error('Erreur lors de la suppression du service');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du service:', error);
      toast.error('Impossible de supprimer le service');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Gestion des services
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un service
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-montserrat font-semibold">Ajouter un nouveau service</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du service</label>
                    <input
                      type="text"
                      value={newService.nom}
                      onChange={(e) => setNewService({...newService, nom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Ex: Ménage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarif (CFA/Mois)</label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      min="0"
                      step="0.5"
                      placeholder="Ex: 20.00"
                    />
                  </div>
                  
                </div>
                <div className='mb-4'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="description"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     
                      placeholder=""
                    />
                  </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddService}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-montserrat text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-montserrat text-gray-700">Tarif (CFA/Mois)</th>
                  <th className="text-left py-3 px-4 font-montserrat text-gray-700">Disponibilité</th>
                  <th className="text-left py-3 px-4 font-montserrat text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <motion.tr
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-4 px-4">{service.nom}</td>
                      <td className="py-4 px-4">
                        {editingService?.id === service.id ? (
                          <input
                            type="number"
                            value={tempRate}
                            onChange={(e) => setTempRate(e.target.value)}
                            className="w-24 px-2 py-1 border rounded"
                            min="0"
                            step="0.5"
                          />
                        ) : (
                          `${service.price}CFA`
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleServiceAvailability(service.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            service.isAvailable
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {service.isAvailable ? 'Disponible' : 'Indisponible'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        {editingService?.id === service.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="text-green-600 hover:text-green-800"
                              title="Enregistrer"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-600 hover:text-red-800"
                              title="Annuler"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Modifier"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Supprimer"
                            >
                              <Trash className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      Aucun service disponible. Cliquez sur "Ajouter un service" pour commencer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceManagement;