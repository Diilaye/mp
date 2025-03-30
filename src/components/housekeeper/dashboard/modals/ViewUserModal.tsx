import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Phone, Mail, MapPin, Briefcase, Calendar, Clock, DollarSign, FileText, Image, Award } from 'lucide-react';
import { RegistrationData } from '../../RegistrationForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userData: RegistrationData;
};

const ViewUserModal = ({ isOpen, onClose, userData }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <User className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Détails de l'utilisateur
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Informations personnelles */}
          <section>
            <h3 className="text-lg font-montserrat font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Nom complet</p>
                  <p className="text-gray-800">{`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-800">{userData.personalInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Téléphone</p>
                  <p className="text-gray-800">{userData.personalInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Adresse</p>
                  <p className="text-gray-800">{userData.personalInfo.address}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Expérience */}
          <section>
            <h3 className="text-lg font-montserrat font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-primary" />
              Expérience professionnelle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Années d'expérience</p>
                  <p className="text-gray-800">{userData.experience.yearsExperience} ans</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Tarif horaire</p>
                  <p className="text-gray-800">{userData.experience.hourlyRate}€/heure</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Spécialités</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userData.experience.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Disponibilités</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userData.experience.availability.map((time, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section>
            <h3 className="text-lg font-montserrat font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Documents
            </h3>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Image className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Photo de profil</p>
                  <p className="text-gray-800">{userData.documents.photo?.name || 'Non fournie'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">CV</p>
                  <p className="text-gray-800">{userData.documents.cv?.name || 'Non fourni'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Certifications</p>
                  {userData.documents.certifications.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {userData.documents.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-800">{cert.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-800">Aucune certification fournie</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewUserModal;