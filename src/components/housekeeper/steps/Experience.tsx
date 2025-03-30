import React from 'react';
import { Briefcase } from 'lucide-react';

type ExperienceData = {
  yearsExperience: string;
  specialties: string[];
  availability: string[];
  hourlyRate: string;
};

type Props = {
  data: ExperienceData;
  onChange: (data: Partial<ExperienceData>) => void;
};

const specialtiesList = [
  'Ménage général',
  'Repassage',
  'Cuisine',
  'Garde d\'enfants',
  'Aide aux personnes âgées',
  'Entretien du linge',
];

const availabilityList = [
  'Lundi matin',
  'Lundi après-midi',
  'Mardi matin',
  'Mardi après-midi',
  'Mercredi matin',
  'Mercredi après-midi',
  'Jeudi matin',
  'Jeudi après-midi',
  'Vendredi matin',
  'Vendredi après-midi',
];

const Experience: React.FC<Props> = ({ data, onChange }) => {
  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = data.specialties.includes(specialty)
      ? data.specialties.filter((s) => s !== specialty)
      : [...data.specialties, specialty];
    onChange({ specialties: newSpecialties });
  };

  const handleAvailabilityChange = (time: string) => {
    const newAvailability = data.availability.includes(time)
      ? data.availability.filter((t) => t !== time)
      : [...data.availability, time];
    onChange({ availability: newAvailability });
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Briefcase className="w-8 h-8 text-primary mr-3" />
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Expérience professionnelle
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Années d'expérience
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={data.yearsExperience}
            onChange={(e) => onChange({ yearsExperience: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Spécialités
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialtiesList.map((specialty) => (
              <label
                key={specialty}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Disponibilités
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availabilityList.map((time) => (
              <label
                key={time}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.availability.includes(time)}
                  onChange={() => handleAvailabilityChange(time)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
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
            value={data.hourlyRate}
            onChange={(e) => onChange({ hourlyRate: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;