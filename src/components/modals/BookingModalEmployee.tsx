import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, Briefcase, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';
import toast from 'react-hot-toast';
import PaymentModal from './PaymentModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  worker?: {
    id?: string;
    name: string;
    role: string;
    image: string;
  };
};

const services = [
  {
    id: 'menage',
    name: 'Ménage',
    description: 'Nettoyage complet de votre intérieur',
  },
  {
    id: 'repassage',
    name: 'Repassage',
    description: 'Service de repassage professionnel',
  },
  {
    id: 'garde-enfants',
    name: 'Garde d\'enfants',
    description: 'Garde d\'enfants à domicile',
  },
  {
    id: 'aide-seniors',
    name: 'Aide aux seniors',
    description: 'Accompagnement et aide aux personnes âgées',
  }
];

const BookingModalEmployee: React.FC<Props> = ({ isOpen, onClose, worker }) => {
  // Étape actuelle du formulaire - réduit à 2 étapes
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // États pour gérer le paiement
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState('');
  const [reservationAmount, setReservationAmount] = useState(0);

  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    duration: '2',
    address: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Validation des champs par étape
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Service et horaire
        return !!formData.date;
      case 2: // Adresse et informations personnelles combinées
        return !!formData.address && !!formData.name && !!formData.phone && !!formData.email;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        // Déterminer le prix en fonction du service (valeur par défaut si aucun service n'est sélectionné)
        const servicePrice = 5000; // Prix par défaut en XOF
        
        // Vérifier si l'employé est défini
        if (!worker) {
          toast.error('Aucun employé sélectionné pour cette réservation');
          return;
        }
        
        // Préparer les données de réservation
        const reservationData: any = {
          // Ajouter des métadonnées sur l'employé pour référence
          employerInfo: {
            name: worker.name,
            role: worker.role,
            image: worker.image
          },
          
          // N'ajouter employerId que s'il existe
          ...(worker.id && { employerId: worker.id }),
          startDate: new Date(formData.date),
          status: 'PENDING',
          amount: servicePrice,
          notes: formData.message,
          address: formData.address,
          // Informations client
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        };
        
        console.log('Données de réservation avec employé:', reservationData);
        
        // Récupérer le token d'authentification s'il existe
        const token = localStorage.getItem('token');
        const headers: any = {};
        
        // Ajouter le token aux headers s'il existe
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Envoyer la demande de réservation
        const response = await axios.post(
          `${API_BASE_URL}/reservations`,
          reservationData,
          { headers }
        );
        
        if (response.data.success) {
          toast.success('Réservation créée avec succès!');
          
          // Stocker les informations de la réservation pour le paiement
          const createdReservation = response.data.data;
          setReservationId(createdReservation.id);
          setReservationAmount(createdReservation.amount);
          
          // Ouvrir le modal de paiement
          setIsPaymentModalOpen(true);
          
          // Ne pas fermer le modal principal tout de suite
          // Le paiement sera géré dans le modal de paiement
        } else {
          toast.error(response.data.message || 'Erreur lors de la réservation');
        }
      } catch (error: any) {
        console.error('Erreur lors de la réservation:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
      }
    }
  };

  // Fermer le modal et réinitialiser le formulaire
  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  // Gérer le succès du paiement
  const handlePaymentSuccess = () => {
    // Réinitialiser le formulaire
    setFormData({
      service: '',
      date: '',
      time: '',
      duration: '2',
      address: '',
      name: '',
      phone: '',
      email: '',
      message: '',
    });
    setCurrentStep(1);
    
    // Fermer le modal de paiement et le modal principal
    setIsPaymentModalOpen(false);
    onClose();
    
    // Afficher un message de succès
    toast.success('Réservation et paiement effectués avec succès!');
  };

  if (!isOpen) return null;

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
              Réserver un service
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Étapes du formulaire - modifié pour 2 étapes */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm
                      ${currentStep > index + 1 
                        ? 'bg-green-500 text-white' 
                        : currentStep === index + 1 
                          ? 'bg-primary/5 text-white' 
                          : 'bg-gray-200 text-gray-600'}`}
                  >
                    {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`h-1 w-24 mx-2 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="font-medium text-gray-700">Service</span>
              <span className="font-medium text-gray-700">Vos informations</span>
            </div>
          </div>

          {worker && (
            <div className="flex items-center space-x-4 mb-6 p-4 bg-rose-50 rounded-lg">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-montserrat font-semibold text-gray-800">
                  {worker.name}
                </h3>
                <p className="text-rose-600">{worker.role}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Étape 1: Choix du service et horaire */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Service Selection */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline-block mr-2" />
                      Service souhaité
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={`relative flex flex-col p-4 cursor-pointer rounded-lg border-2 transition-all ${
                            formData.service === service.id
                              ? 'border-rose-500 bg-rose-50'
                              : 'border-gray-200 hover:border-rose-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={formData.service === service.id}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="absolute opacity-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{service.name}</span>
                            <span className="text-sm text-gray-500">{service.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline-block mr-2" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        required
                      />
                    </div>
 
                  </div>
                </motion.div>
              )}

              {/* Étape 2: Adresse et Informations personnelles combinées */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline-block mr-2" />
                      Adresse complète
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      rows={3}
                      placeholder="Numéro, rue, code postal, ville, étage, digicode..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline-block mr-2" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Votre nom"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline-block mr-2" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Votre numéro de téléphone"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline-block mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Votre email"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline-block mr-2" />
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      rows={3}
                      placeholder="Instructions spéciales ou demandes particulières"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Boutons de navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                    validateStep(currentStep)
                      ? 'bg-primary text-white '
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirmer la réservation
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
      
      {/* Modal de paiement */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        reservationId={reservationId}
        amount={reservationAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default BookingModalEmployee;