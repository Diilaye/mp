import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, X, ToggleLeft as Toggle } from 'lucide-react';
import { useHousekeeperStore, Service } from '../../../store/housekeeperStore';

const ServiceManagement = () => {
  const { services, updateService, toggleServiceAvailability } = useHousekeeperStore();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [tempRate, setTempRate] = useState<string>('');

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTempRate(service.rate.toString());
  };

  const handleSave = () => {
    if (editingService && tempRate) {
      updateService({
        ...editingService,
        rate: parseFloat(tempRate),
      });
      setEditingService(null);
    }
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-montserrat font-bold text-gray-800 mb-6">
        Gestion des services
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-montserrat text-gray-700">Service</th>
              <th className="text-left py-3 px-4 font-montserrat text-gray-700">Tarif (€/h)</th>
              <th className="text-left py-3 px-4 font-montserrat text-gray-700">Disponibilité</th>
              <th className="text-left py-3 px-4 font-montserrat text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <motion.tr
                key={service.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-4 px-4">{service.name}</td>
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
                    `${service.rate}€`
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
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceManagement;