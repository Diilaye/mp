import React from 'react';
import { Check } from 'lucide-react';
import { RegistrationData } from '../RegistrationForm';

type Props = {
  data: RegistrationData;
};

const Confirmation: React.FC<Props> = ({ data }) => {
  return (
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
        Merci {data.personalInfo.firstName} d'avoir complété votre inscription. Nous allons examiner votre dossier et vous contacter rapidement.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left">
        <h3 className="font-montserrat font-semibold text-lg mb-4">Récapitulatif</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700">Informations personnelles</h4>
            <p className="text-gray-600">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
              <br />
              {data.personalInfo.email}
              <br />
              {data.personalInfo.phone}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Expérience</h4>
            <p className="text-gray-600">
              {data.experience.yearsExperience} ans d'expérience
              <br />
              Tarif : {data.experience.hourlyRate}€/heure
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Spécialités</h4>
            <p className="text-gray-600">
              {data.experience.specialties.join(', ')}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700">Documents fournis</h4>
            <ul className="text-gray-600">
              <li>Photo de profil : {data.documents.photo?.name || 'Non fournie'}</li>
              <li>CV : {data.documents.cv?.name || 'Non fourni'}</li>
              <li>
                Certifications : {data.documents.certifications.length > 0
                  ? data.documents.certifications.map(cert => cert.name).join(', ')
                  : 'Aucune'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;