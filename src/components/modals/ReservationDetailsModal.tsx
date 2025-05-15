import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, DollarSign, FileText, User, Phone, Mail, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReservationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: {
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
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    startDate: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    amount: number;
    notes?: string;
    address: string;
    createdAt: string;
  };
}

const ReservationDetailsModal: React.FC<ReservationDetailsProps> = ({ isOpen, onClose, reservation }) => {
  if (!isOpen) return null;

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

  // Déterminer si le client est un utilisateur enregistré ou un prospect
  const isRegisteredUser = !!reservation.userId;
  
  // Informations du client (utilisateur enregistré ou prospect)
  const clientName = isRegisteredUser 
    ? `${reservation.userId?.firstName} ${reservation.userId?.lastName}`
    : reservation.clientName;
    
  const clientEmail = isRegisteredUser
    ? reservation.userId?.email
    : reservation.clientEmail;
    
  const clientPhone = isRegisteredUser
    ? reservation.userId?.phone
    : reservation.clientPhone;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Détails de la réservation
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Statut de la réservation */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Statut</h3>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                {getStatusText(reservation.status)}
              </span>
            </div>

            {/* Informations du client */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2" /> 
                Informations du client
              </h3>
              <div className="space-y-2">
                <p className="flex items-start">
                  <span className="font-medium w-24">Nom:</span>
                  <span>{clientName || 'Non spécifié'}</span>
                </p>
                <p className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-1" />
                  <span>{clientEmail || 'Non spécifié'}</span>
                </p>
                <p className="flex items-start">
                  <Phone className="w-4 h-4 mr-2 mt-1" />
                  <span>{clientPhone || 'Non spécifié'}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium w-24">Type:</span>
                  <span>{isRegisteredUser ? 'Utilisateur enregistré' : 'Prospect'}</span>
                </p>
              </div>
            </div>

            {/* Informations de l'employé */}
            {(reservation.employerId || reservation.employerInfo) && (
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" /> 
                  Employé assigné
                </h3>
                <div className="space-y-2">
                  {reservation.employerId ? (
                    <>
                      <p className="flex items-start">
                        <span className="font-medium w-24">Nom:</span>
                        <span>{reservation.employerId.firstName} {reservation.employerId.lastName}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-medium w-24">Spécialité:</span>
                        <span>{reservation.employerId.speciality}</span>
                      </p>
                      {reservation.employerId.phone && (
                        <p className="flex items-start">
                          <Phone className="w-4 h-4 mr-2 mt-1" />
                          <span>{reservation.employerId.phone}</span>
                        </p>
                      )}
                      {reservation.employerId.email && (
                        <p className="flex items-start">
                          <Mail className="w-4 h-4 mr-2 mt-1" />
                          <span>{reservation.employerId.email}</span>
                        </p>
                      )}
                    </>
                  ) : reservation.employerInfo && (
                    <>
                      <p className="flex items-start">
                        <span className="font-medium w-24">Nom:</span>
                        <span>{reservation.employerInfo.name}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-medium w-24">Rôle:</span>
                        <span>{reservation.employerInfo.role}</span>
                      </p>
                      {reservation.employerInfo.image && (
                        <div className="mt-2">
                          <img 
                            src={reservation.employerInfo.image} 
                            alt={reservation.employerInfo.name} 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Service */}
            {reservation.serviceId && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Service</h3>
                <p>{reservation.serviceId.name}</p>
                {reservation.serviceId.description && (
                  <p className="text-sm text-gray-600 mt-1">{reservation.serviceId.description}</p>
                )}
              </div>
            )}

            {/* Détails de la réservation */}
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-700">Date et heure</h4>
                  <p>{format(new Date(reservation.startDate), 'PPP à p', { locale: fr })}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-700">Adresse</h4>
                  <p className="whitespace-pre-line">{reservation.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <DollarSign className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-700">Montant</h4>
                  <p>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(reservation.amount)}</p>
                </div>
              </div>

              {reservation.notes && (
                <div className="flex items-start">
                  <FileText className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-700">Notes</h4>
                    <p className="whitespace-pre-line">{reservation.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informations de création */}
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Réservation créée le {format(new Date(reservation.createdAt), 'PPP à p', { locale: fr })}</p>
              <p>ID de réservation: {reservation.id}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReservationDetailsModal;
