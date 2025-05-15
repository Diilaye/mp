import React, { useState } from 'react';
import { API_ENDPOINTS, getApiUrl } from '../../config/api.config';
import { motion } from 'framer-motion';
import { X, Star, AlertCircle, Phone, User, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: any) => void;
};

const ReviewModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ranking, setRanking] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    serviceManagement: '',
    comment: '',
    nomClient: '',
    telephoneClient: '',
    nomPersonnel: '',
    telephonePersonnel: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 4;

  const validateStep = () => {
    setError('');
    
    switch (currentStep) {
      case 1:
        if (!formData.nomClient.trim()) {
          setError('Veuillez entrer votre nom');
          return false;
        }
        if (!formData.telephoneClient.trim()) {
          setError('Veuillez entrer votre numéro de téléphone');
          return false;
        }
        return true;
      case 2:
        if (!formData.nomPersonnel.trim()) {
          setError('Veuillez entrer le nom du personnel');
          return false;
        }
        if (!formData.telephonePersonnel.trim()) {
          setError('Veuillez entrer le numéro du personnel');
          return false;
        }
        return true;
      case 3:
        if (ranking === 0) {
          setError('Veuillez attribuer une note');
          return false;
        }
        if (!formData.serviceManagement) {
          setError('Veuillez sélectionner un service');
          return false;
        }
        return true;
      case 4:
        if (!formData.comment.trim()) {
          setError('Veuillez ajouter un commentaire');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitToAPI = async (data: any) => {
    console.log('Données à soumettre:', data);
    setIsSubmitting(true);
    try {
      const response = await axios.post(getApiUrl(API_ENDPOINTS.REVIEWS.CLIENT), data);
      console.log('Avis soumis avec succès:', response.data);
      setSubmitSuccess(true);
      onSubmit(data);
      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const reviewData = {
        ...formData,
        ranking,
        date: new Date().toISOString(),
      };
      
      submitToAPI(reviewData);
    }
  };

  const resetForm = () => {
    setRanking(0);
    setHoverRating(0);
    setFormData({
      serviceManagement: '',
      comment: '',
      nomClient: '',
      telephoneClient: '',
      nomPersonnel: '',
      telephonePersonnel: '',
    });
    setError('');
    setCurrentStep(1);
    setSubmitSuccess(false);
  };

  if (!isOpen) return null;

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep > index + 1 
                ? 'bg-green-500 text-white' 
                : currentStep === index + 1 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`w-10 h-1 ${
                currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Vos informations</h3>
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline-block mr-2" />
                Nom complet
              </label>
              <input
                type="text"
                value={formData.nomClient}
                onChange={(e) => setFormData({ ...formData, nomClient: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Votre nom"
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
                value={formData.telephoneClient}
                onChange={(e) => setFormData({ ...formData, telephoneClient: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Votre numéro de téléphone"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Informations du personnel</h3>
            
            {/* Staff Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline-block mr-2" />
                Nom complet du personnel
              </label>
              <input
                type="text"
                value={formData.nomPersonnel}
                onChange={(e) => setFormData({ ...formData, nomPersonnel: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Nom du personnel"
              />
            </div>

            {/* Staff Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline-block mr-2" />
                Téléphone du personnel
              </label>
              <input
                type="tel"
                value={formData.telephonePersonnel}
                onChange={(e) => setFormData({ ...formData, telephonePersonnel: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Numéro de téléphone du personnel"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Évaluation du service</h3>
            
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note globale
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setRanking(value);
                      setError('');
                    }}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || ranking) >= value
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {ranking > 0 ? `${ranking} sur 5` : 'Sélectionnez une note'}
                </span>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service évalué
              </label>
              <select
                value={formData.serviceManagement}
                onChange={(e) => {
                  setFormData({ ...formData, serviceManagement: e.target.value });
                  setError('');
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Sélectionnez un service</option>
                <option value="Ménage">Ménage</option>
                <option value="Repassage">Repassage</option>
                <option value="Garde d'enfants">Garde d'enfants</option>
                <option value="Aide aux seniors">Aide aux seniors</option>
                <option value="Courses">Courses</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Votre commentaire</h3>
            
            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre avis
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => {
                  setFormData({ ...formData, comment: e.target.value });
                  setError('');
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                rows={6}
                placeholder="Partagez votre expérience avec ce service..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
        )}
        
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-primary text-white rounded-lg transition-colors flex items-center"
          disabled={isSubmitting}
        >
          {currentStep === totalSteps ? (
            isSubmitting ? 'Envoi en cours...' : 'Soumettre'
          ) : (
            <>
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Partagez votre expérience
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Merci pour votre avis!</h3>
              <p className="text-gray-600">Votre commentaire a été soumis avec succès.</p>
            </div>
          ) : (
            <>
              {renderStepIndicator()}
              
              <div className="mt-6">
                {renderStepContent()}
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 mt-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              {renderButtons()}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModal;