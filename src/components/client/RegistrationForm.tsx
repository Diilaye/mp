import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, User } from 'lucide-react';

export type ClientRegistrationData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  preferences: {
    serviceTypes: string[];
    frequency: string;
    preferredDays: string[];
    preferredTime: string;
  };
  additionalInfo: {
    specialRequests: string;
    pets: boolean;
    homeAccess: string;
    parkingAvailable: boolean;
  };
};

const initialData: ClientRegistrationData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  },
  preferences: {
    serviceTypes: [],
    frequency: '',
    preferredDays: [],
    preferredTime: '',
  },
  additionalInfo: {
    specialRequests: '',
    pets: false,
    homeAccess: '',
    parkingAvailable: false,
  },
};

const steps = ['Informations personnelles', 'Préférences', 'Informations complémentaires', 'Confirmation'];

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClientRegistrationData>(initialData);
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

  const updateFormData = (section: keyof ClientRegistrationData, data: Partial<ClientRegistrationData[keyof ClientRegistrationData]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6 mt-14">
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

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Types de services souhaités
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Ménage', 'Repassage', 'Garde d\'enfants', 'Aide aux seniors', 'Courses'].map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.preferences.serviceTypes.includes(service)}
                onChange={(e) => {
                  const newServices = e.target.checked
                    ? [...formData.preferences.serviceTypes, service]
                    : formData.preferences.serviceTypes.filter(s => s !== service);
                  updateFormData('preferences', { serviceTypes: newServices });
                }}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fréquence souhaitée
        </label>
        <select
          value={formData.preferences.frequency}
          onChange={(e) => updateFormData('preferences', { frequency: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Sélectionnez une fréquence</option>
          <option value="once">Une fois</option>
          <option value="weekly">Hebdomadaire</option>
          <option value="biweekly">Bi-mensuel</option>
          <option value="monthly">Mensuel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jours préférés
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.preferences.preferredDays.includes(day)}
                onChange={(e) => {
                  const newDays = e.target.checked
                    ? [...formData.preferences.preferredDays, day]
                    : formData.preferences.preferredDays.filter(d => d !== day);
                  updateFormData('preferences', { preferredDays: newDays });
                }}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horaire préféré
        </label>
        <select
          value={formData.preferences.preferredTime}
          onChange={(e) => updateFormData('preferences', { preferredTime: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Sélectionnez un horaire</option>
          <option value="morning">Matin (8h-12h)</option>
          <option value="afternoon">Après-midi (12h-17h)</option>
          <option value="evening">Soir (17h-20h)</option>
        </select>
      </div>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demandes particulières
        </label>
        <textarea
          value={formData.additionalInfo.specialRequests}
          onChange={(e) => updateFormData('additionalInfo', { specialRequests: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          rows={4}
          placeholder="Ex: allergies, produits spécifiques à utiliser..."
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.additionalInfo.pets}
            onChange={(e) => updateFormData('additionalInfo', { pets: e.target.checked })}
            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
          />
          <span className="text-sm text-gray-700">Présence d'animaux domestiques</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accès au domicile
        </label>
        <select
          value={formData.additionalInfo.homeAccess}
          onChange={(e) => updateFormData('additionalInfo', { homeAccess: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Sélectionnez une option</option>
          <option value="present">Je serai présent(e)</option>
          <option value="key">Remise des clés</option>
          <option value="code">Code d'accès</option>
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.additionalInfo.parkingAvailable}
            onChange={(e) => updateFormData('additionalInfo', { parkingAvailable: e.target.checked })}
            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
          />
          <span className="text-sm text-gray-700">Parking disponible</span>
        </label>
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
        Nous vous contacterons rapidement pour confirmer vos demandes.
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
            <h4 className="font-medium text-gray-700">Services souhaités</h4>
            <p className="text-gray-600">
              {formData.preferences.serviceTypes.join(', ')}
              <br />
              Fréquence : {formData.preferences.frequency}
              <br />
              Jours préférés : {formData.preferences.preferredDays.join(', ')}
              <br />
              Horaire : {formData.preferences.preferredTime}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Informations complémentaires</h4>
            <ul className="text-gray-600">
              <li>Animaux : {formData.additionalInfo.pets ? 'Oui' : 'Non'}</li>
              <li>Accès : {formData.additionalInfo.homeAccess}</li>
              <li>Parking : {formData.additionalInfo.parkingAvailable ? 'Disponible' : 'Non disponible'}</li>
              {formData.additionalInfo.specialRequests && (
                <li>Demandes particulières : {formData.additionalInfo.specialRequests}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-offwhite py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                        ${
                          index < currentStep
                            ? 'bg-rose-600 border-rose-600 text-white'
                            : index === currentStep
                            ? 'border-rose-600 text-rose-600'
                            : 'border-gray-300 text-gray-300'
                        }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        index <= currentStep ? 'text-rose-600' : 'text-gray-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-rose-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && renderPersonalInfo()}
              {currentStep === 1 && renderPreferences()}
              {currentStep === 2 && renderAdditionalInfo()}
              {currentStep === 3 && renderConfirmation()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-rose-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Précédent
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={currentStep === steps.length - 2 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="btn-primary ml-auto flex items-center"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;