import React from 'react';
import { MapPin, Clock } from 'lucide-react';

type Professional = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  hourlyRate: number;
  specialties: string[];
  availability: string[];
  verified: boolean;
  type: 'housekeeper' | 'driver' | 'guard';
  badges?: string[];
  vehicleTypes?: string[];
  securityCertifications?: string[];
  languages?: string[];
};

interface SimpleWorkerCardProps {
  professional: Professional;
  onBooking: (professional: Professional) => void;
}

const SimpleWorkerCard: React.FC<SimpleWorkerCardProps> = ({ professional, onBooking }) => {
  // Format professional.availability to show as "Descend tous les jours" if 7 days a week
  const availabilityText = professional.availability.length >= 7 
    ? "Descend tous les jours" 
    : `Disponible ${professional.availability.length} jours/semaine`;
  
  // Get main service type (first specialty)
  const mainService = professional.specialties[0];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Image section with availability badge */}
      <div className="relative">
        <img
          src={professional.image}
          alt={professional.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/40 text-black px-3 py-1 rounded-full text-sm font-medium">
            Disponibilité du jour !
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Name and age */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
          <span className="text-gray-500 text-sm">{professional.experience.split(' ')[0]} ans</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-sm">{professional.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-center text-gray-600 mb-2">
          <span className="text-sm">{professional.hourlyRate.toLocaleString()} FCFA</span>
        </div>

        {/* Availability */}
        <div className="flex items-center text-gray-600 mb-3">
          <Clock className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-sm">{availabilityText}</span>
        </div>

        {/* Service type */}
        <div className="mb-4">
          <span className="text-black px-4 py-1 bg-primary/20 rounded-full text-sm">
            {mainService}
          </span>
        </div>

        {/* View profile and booking buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onBooking(professional)}
            className="w-full bg-orange-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-orange-700 transition-colors text-sm"
          >
            Voir le profil complet
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={() => onBooking(professional)}
            className="bg-primary text-white px-4 py-2 rounded-md transition-colors text-sm"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkerCard;