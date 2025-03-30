import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, User } from 'lucide-react';
import PersonalInfo from '../../steps/PersonalInfo';
import Experience from '../../steps/Experience';
import Documents from '../../steps/Documents';
import Confirmation from '../../steps/Confirmation';
import { RegistrationData } from '../../RegistrationForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: any) => void;
};

const steps = ['Informations personnelles', 'Expérience', 'Documents', 'Confirmation'];

const CreateUserModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onSubmit(formData);
    handleNext();
  };

  const updateFormData = (section: keyof RegistrationData, data: Partial<RegistrationData[keyof RegistrationData]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <User className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Nouvel utilisateur
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

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
                          ? 'bg-primary border-primary text-white'
                          : index === currentStep
                          ? 'border-primary text-primary'
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
                      index <= currentStep ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-300'
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
            {currentStep === 0 && (
              <PersonalInfo
                data={formData.personalInfo}
                onChange={(data) => updateFormData('personalInfo', data)}
              />
            )}
            {currentStep === 1 && (
              <Experience
                data={formData.experience}
                onChange={(data) => updateFormData('experience', data)}
              />
            )}
            {currentStep === 2 && (
              <Documents
                data={formData.documents}
                onChange={(data) => updateFormData('documents', data)}
              />
            )}
            {currentStep === 3 && <Confirmation data={formData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-primary transition-colors"
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
  );
};

export default CreateUserModal;