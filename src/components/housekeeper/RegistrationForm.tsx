import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Upload, User, Shield, Star, Clock, Award, FileText, Camera } from 'lucide-react';

export type RegistrationData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  experience: {
    yearsExperience: string;
    specialties: string[];
    availability: string[];
    hourlyRate: string;
  };
  documents: {
    photo: File | null;
    cv: File | null;
    certifications: File[];
  };
};

const initialData: RegistrationData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  },
  experience: {
    yearsExperience: '',
    specialties: [],
    availability: [],
    hourlyRate: '',
  },
  documents: {
    photo: null,
    cv: null,
    certifications: [],
  },
};

const steps = ['Informations personnelles', 'Expérience', 'Documents', 'Confirmation'];

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    handleNext();
  };

  const updateFormData = (section: keyof RegistrationData, data: Partial<RegistrationData[keyof RegistrationData]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => updateFormData('personalInfo', { firstName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => updateFormData('personalInfo', { lastName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => updateFormData('personalInfo', { email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => updateFormData('personalInfo', { phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adresse
        </label>
        <input
          type="text"
          value={formData.personalInfo.address}
          onChange={(e) => updateFormData('personalInfo', { address: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Années d'expérience
        </label>
        <input
          type="number"
          min="0"
          max="50"
          value={formData.experience.yearsExperience}
          onChange={(e) => updateFormData('experience', { yearsExperience: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Spécialités
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Ménage', 'Repassage', 'Garde d\'enfants', 'Aide aux seniors', 'Courses'].map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.experience.specialties.includes(specialty)}
                onChange={(e) => {
                  const newSpecialties = e.target.checked
                    ? [...formData.experience.specialties, specialty]
                    : formData.experience.specialties.filter(s => s !== specialty);
                  updateFormData('experience', { specialties: newSpecialties });
                }}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disponibilités
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Lundi matin', 'Lundi après-midi', 'Mardi matin', 'Mardi après-midi', 'Mercredi matin', 'Mercredi après-midi'].map((time) => (
            <label key={time} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.experience.availability.includes(time)}
                onChange={(e) => {
                  const newAvailability = e.target.checked
                    ? [...formData.experience.availability, time]
                    : formData.experience.availability.filter(t => t !== time);
                  updateFormData('experience', { availability: newAvailability });
                }}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tarif horaire (€)
        </label>
        <input
          type="number"
          min="0"
          step="0.5"
          value={formData.experience.hourlyRate}
          onChange={(e) => updateFormData('experience', { hourlyRate: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo de profil
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500">
                <span>Télécharger une photo</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateFormData('documents', { photo: file });
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CV
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500">
                <span>Télécharger votre CV</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateFormData('documents', { cv: file });
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC jusqu'à 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Award className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500">
                <span>Ajouter des certifications</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    updateFormData('documents', { certifications: files });
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, Images jusqu'à 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-montserrat font-bold text-gray-800 mb-4">
        Inscription réussie !
      </h2>
      
      <p className="text-gray-600 mb-8">
        Merci {formData.personalInfo.firstName} d'avoir complété votre inscription. 
        Nous allons examiner votre dossier et vous contacter rapidement.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left">
        <h3 className="font-montserrat font-semibold text-lg mb-4">Récapitulatif</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700">Informations personnelles</h4>
            <p className="text-gray-600">
              {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              <br />
              {formData.personalInfo.email}
              <br />
              {formData.personalInfo.phone}
              <br />
              {formData.personalInfo.address}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Expérience</h4>
            <p className="text-gray-600">
              {formData.experience.yearsExperience} ans d'expérience
              <br />
              Tarif : {formData.experience.hourlyRate}€/heure
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Spécialités</h4>
            <p className="text-gray-600">
              {formData.experience.specialties.join(', ')}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Documents fournis</h4>
            <ul className="text-gray-600">
              <li>Photo de profil : {formData.documents.photo?.name || 'Non fournie'}</li>
              <li>CV : {formData.documents.cv?.name || 'Non fourni'}</li>
              <li>
                Certifications : {formData.documents.certifications.length > 0
                  ? formData.documents.certifications.map(cert => cert.name).join(', ')
                  : 'Aucune'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-montserrat font-bold text-gray-900 mb-4">
            Rejoignez notre équipe de professionnels
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Créez votre profil et commencez à proposer vos services à nos clients
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-8">
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
                        ${
                          index < currentStep
                            ? 'bg-white border-white text-rose-600'
                            : index === currentStep
                            ? 'border-white text-white'
                            : 'border-white/50 text-white/50'
                        }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span className="text-lg">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`mt-3 text-sm font-medium ${
                        index <= currentStep ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute h-0.5 top-6 left-0 right-0 -mx-4 ${
                        index < currentStep ? 'bg-white' : 'bg-white/30'
                      }`}
                      style={{
                        width: `${100 / (steps.length - 1)}%`,
                        left: `${(index * 100) / (steps.length - 1)}%`,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                {/* Step Icons */}
                {currentStep < steps.length - 1 && (
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                      {currentStep === 0 && <User className="w-8 h-8 text-rose-600" />}
                      {currentStep === 1 && <Star className="w-8 h-8 text-rose-600" />}
                      {currentStep === 2 && <FileText className="w-8 h-8 text-rose-600" />}
                    </div>
                  </div>
                )}

                {/* Form Steps */}
                {currentStep === 0 && renderPersonalInfo()}
                {currentStep === 1 && renderExperience()}
                {currentStep === 2 && renderDocuments()}
                {currentStep === 3 && renderConfirmation()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < steps.length - 1 && (
              <div className="mt-12 flex justify-between items-center">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center px-6 py-3 text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Précédent
                  </button>
                )}
                <button
                  onClick={currentStep === steps.length - 2 ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  className="ml-auto bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-colors flex items-center"
                >
                  {currentStep === steps.length - 2 ? (
                    isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      'Envoyer'
                    )
                  ) : (
                    <>
                      Suivant
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité garantie</h3>
            <p className="text-gray-600">Vos informations sont protégées et sécurisées</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexibilité</h3>
            <p className="text-gray-600">Gérez vos disponibilités selon vos besoins</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reconnaissance</h3>
            <p className="text-gray-600">Valorisez votre expérience et vos compétences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;