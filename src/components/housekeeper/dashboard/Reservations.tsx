import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaEye, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import ReservationDetailsModal from '../../modals/ReservationDetailsModal';
import toast from 'react-hot-toast';

interface Reservation {
  id: string;
  userId?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  employerId?: {
    firstName: string;
    lastName: string;
    speciality: string;
    image?: string;
    phone?: string;
    email?: string;
    address?: string;
    description?: string;
  };
  // Informations supplémentaires sur l'employé (si employerId n'est pas disponible)
  employerInfo?: {
    name: string;
    role: string;
    image: string;
  };
  serviceId?: {
    name: string;
    description: string;
    price?: number;
  };
  // Informations du prospect (utilisateur non connecté)
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  startDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  amount: number;
  notes?: string;
  address: string;
  createdAt: string;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Vous devez être connecté pour accéder à cette page');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${API_BASE_URL}/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Liste des réservations récupérée:", response.data.data);
        
        setReservations(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des réservations:', err);
        setError('Erreur lors de la récupération des réservations');
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  const handleStatusChange = async (reservationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour effectuer cette action');
        return;
      }
      
      await axios.patch(
        `${API_BASE_URL}/reservations/${reservationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Mettre à jour l'état local après la mise à jour réussie
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.id === reservationId 
            ? { ...reservation, status: newStatus as any } 
            : reservation
        )
      );
      
      // Afficher un message de succès
      const statusText = {
        'CONFIRMED': 'confirmée',
        'CANCELLED': 'annulée',
        'COMPLETED': 'terminée'
      }[newStatus] || 'mise à jour';
      
      toast.success(`Réservation ${statusText} avec succès`);
      
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast.error('Erreur lors de la mise à jour du statut');
      setError('Erreur lors de la mise à jour du statut');
    }
  };
  
  // Fonction pour ouvrir le modal de détails
  const openDetailsModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsModalOpen(true);
  };
  
  // Fonction pour fermer le modal de détails
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedReservation(null);
  };

  const filteredReservations = selectedStatus === 'all' 
    ? reservations 
    : reservations.filter(reservation => reservation.status === selectedStatus);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'CONFIRMED':
        return 'Confirmée';
      case 'COMPLETED':
        return 'Terminée';
      case 'CANCELLED':
        return 'Annulée';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Réservations</h2>
      
      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par statut
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">Tous les statuts</option>
          <option value="PENDING">En attente</option>
          <option value="CONFIRMED">Confirmées</option>
          <option value="COMPLETED">Terminées</option>
          <option value="CANCELLED">Annulées</option>
        </select>
      </div>
      
      {filteredReservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune réservation trouvée</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employé
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.userId 
                        ? `${reservation.userId.firstName} ${reservation.userId.lastName}` 
                        : reservation.clientName || 'Client non identifié'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.userId?.email || reservation.clientEmail || ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.userId?.phone || reservation.clientPhone || ''}
                    </div>
                    {!reservation.userId && reservation.clientName && (
                      <div className="text-xs mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded inline-block">
                        Prospect
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.employerId 
                        ? `${reservation.employerId.firstName} ${reservation.employerId.lastName}`
                        : reservation.employerInfo 
                          ? reservation.employerInfo.name
                          : 'Non assigné'}
                    </div>
                    {reservation.employerId && (
                      <div className="text-sm text-gray-500">
                        {reservation.employerId.speciality}
                      </div>
                    )}
                    {reservation.employerInfo && !reservation.employerId && (
                      <div className="text-sm text-gray-500">
                        {reservation.employerInfo.role}
                      </div>
                    )}
                    {reservation.serviceId && (
                      <div className="text-xs mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded inline-block">
                        {reservation.serviceId.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(reservation.startDate), 'PPP', { locale: fr })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(reservation.startDate), 'p', { locale: fr })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(reservation.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {reservation.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Confirmer"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
                            className="text-red-600 hover:text-red-900"
                            title="Annuler"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      {reservation.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleStatusChange(reservation.id, 'COMPLETED')}
                          className="text-green-600 hover:text-green-900"
                          title="Marquer comme terminée"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => openDetailsModal(reservation)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Voir les détails"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal de détails de réservation */}
      {selectedReservation && (
        <ReservationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          reservation={selectedReservation}
        />
      )}
    </div>
  );
};

export default Reservations;
