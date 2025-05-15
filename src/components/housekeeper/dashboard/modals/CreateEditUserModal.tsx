import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EmployeeData } from '../UserManagement';

// Définition des types
interface UserFormData {
  fullName: string;
  age: string;
  phone: string;
  address: string;
  position: string;
  salary: string;
  availability: string;
  photo: string;
  experience: string;
  languages: string;
  skills: string;
  notes: string;
}

interface ProcessedUserData {
  fullName: string;
  age: number;
  phone: string;
  address: string;
  position: string;
  salary: number;
  availability: string;
  photo: string;
  experience: string;
  languages: string[];
  skills: string[];
  notes: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProcessedUserData) => void;
  initialData?: EmployeeData;
  modalTitle: string;
}

// Modal pour créer/modifier un utilisateur avec étapes
const CreateEditUserModal = ({ isOpen, onClose, onSubmit, initialData, modalTitle }: UserModalProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    age: '',
    phone: '',
    address: '',
    position: '',
    salary: '',
    availability: 'Descend tous les jours',
    photo: '',
    experience: '',
    languages: '',
    skills: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        age: initialData.age ? initialData.age.toString() : '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        position: initialData.position || '',
        salary: initialData.salary ? initialData.salary.toString() : '',
        availability: initialData.availability || 'Descend tous les jours',
        photo: initialData.photo || '',
        experience: initialData.experience || '',
        languages: initialData.languages ? initialData.languages.join(', ') : '',
        skills: initialData.skills ? initialData.skills.join(', ') : '',
        notes: initialData.notes || ''
      });
    }
    // Réinitialiser l'étape à 1 lorsque le modal s'ouvre
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullName || !formData.age || !formData.phone || !formData.position || !formData.salary) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Traitement des listes
    const processedData: ProcessedUserData = {
      ...formData,
      age: parseInt(formData.age),
      salary: parseInt(formData.salary),
      languages: formData.languages.split(',').map(item => item.trim()).filter(item => item !== ''),
      skills: formData.skills.split(',').map(item => item.trim()).filter(item => item !== '')
    };

    onSubmit(processedData);
    onClose();
  };

  const nextStep = () => {
    // Validation des champs requis pour chaque étape
    if (currentStep === 1) {
      if (!formData.fullName || !formData.age || !formData.phone || !formData.address) {
        toast.error('Veuillez remplir tous les champs obligatoires de cette étape');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.position || !formData.salary) {
        toast.error('Veuillez remplir tous les champs obligatoires de cette étape');
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepIndicator = (): JSX.Element => {
    return (
      <div className="flex justify-center mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 === currentStep 
                  ? 'bg-primary text-white' 
                  : index + 1 < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1 < currentStep ? '✓' : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`h-1 w-10 ${
                  index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Marieme Ndiaye"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Âge <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 38"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 77 144 17 17"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Hlm Grand Yoff"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poste <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionnez un poste</option>
                <option value="aide-menagere">Aide ménagère</option>
                <option value="aide-cuisine">Aide cuisine</option>
                <option value="aide-menagere-cuisine">Aide-ménagère et cuisine</option>
                <option value="lingere">Lingère</option>
                <option value="nounou">Nounou</option>
                <option value="chef-cuisinier">Chef cuisinier</option>
                <option value="chauffeur">Chauffeur</option>
                <option value="gardien">Gardien</option>
                <option value="agent-de-nettoiement">Agent de nettoiement</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rémunération (FCFA) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 70000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilité
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="descend-tous-les-jours">Descend tous les jours</option>
                <option value="descend-tous-les-15-jours">Descend tous les 15 jours</option>
                <option value="loge-sur-place">Logé sur place</option>
                <option value="week-end-uniquement">Week-end uniquement</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de la photo
              </label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="URL de la photo"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expérience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 5 ans d'expérience en tant que nounou"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Langues parlées (séparées par des virgules)
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Wolof, Français, Pulaar"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compétences (séparées par des virgules)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Cuisine, Repassage, Ménage"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes additionnelles
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Informations supplémentaires sur l'employé"
              />
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-lg mb-3">Résumé des informations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="flex">
                  <span className="font-medium mr-2">Nom:</span> 
                  <span>{formData.fullName}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Âge:</span> 
                  <span>{formData.age} ans</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Téléphone:</span> 
                  <span>{formData.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Adresse:</span> 
                  <span>{formData.address}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Poste:</span> 
                  <span>{formData.position}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Salaire:</span> 
                  <span>{formData.salary} FCFA</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Disponibilité:</span> 
                  <span>{formData.availability}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Expérience:</span> 
                  <span>{formData.experience}</span>
                </div>
                <div className="md:col-span-2 flex">
                  <span className="font-medium mr-2">Langues:</span> 
                  <span>{formData.languages}</span>
                </div>
                <div className="md:col-span-2 flex">
                  <span className="font-medium mr-2">Compétences:</span> 
                  <span>{formData.skills}</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-montserrat font-bold text-gray-800">
            {modalTitle} - Étape {currentStep}/{totalSteps}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {renderStepIndicator()}

        <form onSubmit={currentStep === totalSteps ? handleSubmit : e => e.preventDefault()}>
          {renderStepContent()}
          
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={currentStep > 1 ? prevStep : onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              {currentStep > 1 ? 'Précédent' : 'Annuler'}
            </button>
            
            <div>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {initialData ? 'Mettre à jour' : 'Créer'}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEditUserModal;