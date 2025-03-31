import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Star, MapPin, Clock, Euro, Heart, ChevronDown, X, Car, Shield, Award, Search, Sparkles, Users, DollarSign, Briefcase } from 'lucide-react';
import BookingModal from '../components/modals/BookingModal';

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

const services = [
  "Ménage",
  "Garde d'enfants",
  "Aide à domicile",
  "Jardinage",
  "Chauffeur",
  "Deménagement",
  "Repassage",
  "Cuisine",
  "Courses"
];

const locations = [
  "Dakar",
  "Mermoz",
  "Ouakam",
  "Ngor",
  "Almadies",
  "Yoff",
  "Hann",
  "Guediawaye",
  "Pikine",
  "Rufisque",
  "Thiaroye",
  "Keur Massar",
  "Malika",
  "Diamniadio",
  "Thiès",
  "Diourbel",
  "Kaolack",
  "Ziguinchor",
  "Louga",
  "Saint-Louis",
  "Tambacounda",
  "Kolda",
  "Fatick",
  "Matam",
  "Kaffrine",
  "Kédougou",
  "Sédhiou",
  "Saly",
  "Mbour",
  
];
const rateRanges = ["Tous", "30.000-40.000 XOF", "41.000-50.000 XOF", "51.000 XOF"];

const professionals: Professional[] = [
  // Housekeepers
  {
    id: '1',
    name: 'Sophie Martin',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 156,
    location: 'Paris',
    experience: '5 ans',
    hourlyRate: 25,
    specialties: ['Ménage', 'Repassage', 'Organisation'],
    availability: ['Lundi', 'Mardi', 'Jeudi'],
    verified: true,
    type: 'housekeeper',
  },
  {
    id: '2',
    name: 'Marie Dubois',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 203,
    location: 'Lyon',
    experience: '7 ans',
    hourlyRate: 28,
    specialties: ['Garde d\'enfants', 'Cuisine', 'Aide aux devoirs'],
    availability: ['Mercredi', 'Vendredi'],
    verified: true,
    type: 'housekeeper',
  },
  // Drivers
  {
    id: '4',
    name: 'Thomas Laurent',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 312,
    location: 'Paris',
    experience: '8 ans',
    hourlyRate: 35,
    specialties: ['Transport VIP', 'Longue distance', 'Événements spéciaux'],
    availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    verified: true,
    type: 'driver',
    badges: ['Permis VTC', 'Formation luxe'],
    vehicleTypes: ['Berline', 'SUV de luxe'],
    languages: ['Français', 'Anglais', 'Espagnol'],
  },
  {
    id: '5',
    name: 'Lucas Moreau',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 189,
    location: 'Lyon',
    experience: '5 ans',
    hourlyRate: 30,
    specialties: ['Transport professionnel', 'Aéroport', 'Tourisme'],
    availability: ['Lundi', 'Mercredi', 'Vendredi', 'Samedi'],
    verified: true,
    type: 'driver',
    badges: ['Permis VTC'],
    vehicleTypes: ['Berline'],
    languages: ['Français', 'Anglais'],
  },
  // Guards
  {
    id: '6',
    name: 'Marc Dubois',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 245,
    location: 'Paris',
    experience: '12 ans',
    hourlyRate: 40,
    specialties: ['Surveillance résidentielle', 'Protection rapprochée', 'Événements'],
    availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    verified: true,
    type: 'guard',
    securityCertifications: ['CQP APS', 'SSIAP 1', 'SST'],
    badges: ['Ex-militaire', 'Formation self-défense'],
    languages: ['Français', 'Anglais'],
  },
  {
    id: '7',
    name: 'Alexandre Martin',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 178,
    location: 'Lyon',
    experience: '9 ans',
    hourlyRate: 35,
    specialties: ['Gardiennage', 'Surveillance vidéo', 'Contrôle d\'accès'],
    availability: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    verified: true,
    type: 'guard',
    securityCertifications: ['CQP APS', 'SSIAP 2'],
    badges: ['Ex-gendarme'],
    languages: ['Français'],
  },
];

// ... (keep all the existing specialties and locations arrays)

const SearchPage = () => {
  // ... (keep all the existing state and handlers)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Example filter: Show all professionals (you can customize this logic)
  const filteredProfessionals = professionals; 

  const handleBooking = (professional: Professional) => {
    setSelectedProfessional(professional);
    setIsBookingModalOpen(true);
  };

  const renderProfessionalCard = (professional: Professional) => {
    const renderSpecificInfo = () => {
      switch (professional.type) {
        case 'driver':
          return (
            <>
              {professional.vehicleTypes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Véhicules</h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.vehicleTypes.map((vehicle, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        <Car className="w-4 h-4 inline-block mr-1" />
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {professional.badges && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm"
                      >
                        <Award className="w-4 h-4 inline-block mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        case 'guard':
          return (
            <>
              {professional.securityCertifications && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.securityCertifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                      >
                        <Shield className="w-4 h-4 inline-block mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {professional.badges && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm"
                      >
                        <Award className="w-4 h-4 inline-block mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        default:
          return null;
      }
    };

    return (
      <motion.div
        key={professional.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={professional.image}
            alt={professional.name}
            className="w-full h-64 object-cover"
          />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-rose-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-montserrat font-semibold text-gray-800">
                {professional.name}
              </h3>
              <div className="flex items-center mt-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">
                  {professional.rating} ({professional.reviews} avis)
                </span>
              </div>
            </div>
            {professional.verified && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Vérifié
              </span>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{professional.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{professional.experience} d'expérience</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Euro className="w-5 h-5 mr-2" />
              <span>{professional.hourlyRate}€/heure</span>
            </div>
          </div>

          {renderSpecificInfo()}

          <div className="flex flex-wrap gap-2 mb-6">
            {professional.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>

          {professional.languages && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Langues</h4>
              <div className="flex flex-wrap gap-2">
                {professional.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-green-600 font-medium">
                Disponible {professional.availability.length} jours/semaine
              </span>
            </div>
            <button
              onClick={() => handleBooking(professional)}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const [selectedProfession, setSelectedProfession] = useState("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedRate, setSelectedRate] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkers = professionals.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfession = selectedProfession === "Tous" || worker.specialties.findIndex((e) => e === selectedProfession) == -1 ;
    const matchesCity = selectedCity === "Toutes" || worker.location === selectedCity;
    const matchesRate = selectedRate === "Tous" || 
      (selectedRate === "30.000-40.000 XOF" && worker.hourlyRate >= 300 && worker.hourlyRate <= 400) ||
      (selectedRate === "41.000-50.000 XOF" && worker.hourlyRate >= 401 && worker.hourlyRate <= 500) ||
      (selectedRate === "51.000 XOF" && worker.hourlyRate > 500);

    return matchesSearch && matchesProfession && matchesCity && matchesRate;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 container mx-auto px-4 mb-48">
      {/* Keep the existing search header and filters section */}
      <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight flex items-center gap-3">
              Recherche de Talents
              <Sparkles className="text-primary animate-pulse" size={32} />
            </h1>
            <p className="text-gray-600 flex items-center text-lg">
              <Users className="mr-2 text-primary" size={24} />
              <span className="font-medium">{`${professionals.length} professionnels disponibles `}</span> 
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(214,102,48,0.2)]">
          {/* Barre de recherche */}
          <div className="relative mb-10 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
              <Search className="text-primary transform transition-all duration-500 group-hover:rotate-12" size={32} />
            </div>
            <input
              type="text"
              placeholder="Rechercher un talent par nom..."
              className="w-full pl-24 pr-6 py-6 bg-gray-50/50 border-2 border-primary/20 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Filtre Profession */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 z-10">
                <Briefcase className="text-primary transform transition-all duration-500 group-hover:rotate-12" size={28} />
              </div>
              <select
                className="w-full pl-20 pr-12 py-5 bg-gray-50/50 border-2 border-primary/20 rounded-2xl appearance-none cursor-pointer transition-all duration-500 hover:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:border-primary group-hover:border-primary text-lg group-hover:shadow-lg"
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
              >
                {services.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                <div className="w-3 h-3 border-r-2 border-b-2 border-primary transform rotate-45 -translate-y-0.5 transition-all duration-500 group-hover:border-primary-dark"></div>
              </div>
            </div>

            {/* Filtre Ville */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 z-10">
                <MapPin className="text-primary transform transition-all duration-500 group-hover:rotate-12" size={28} />
              </div>
              <select
                className="w-full pl-20 pr-12 py-5 bg-gray-50/50 border-2 border-primary/20 rounded-2xl appearance-none cursor-pointer transition-all duration-500 hover:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:border-primary group-hover:border-primary text-lg group-hover:shadow-lg"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {locations.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                <div className="w-3 h-3 border-r-2 border-b-2 border-primary transform rotate-45 -translate-y-0.5 transition-all duration-500 group-hover:border-primary-dark"></div>
              </div>
            </div>

            {/* Filtre Tarif */}
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 z-10">
                <DollarSign className="text-primary transform transition-all duration-500 group-hover:rotate-12" size={28} />
              </div>
              <select
                className="w-full pl-20 pr-12 py-5 bg-gray-50/50 border-2 border-primary/20 rounded-2xl appearance-none cursor-pointer transition-all duration-500 hover:bg-primary/5 focus:ring-4 focus:ring-primary/20 focus:border-primary group-hover:border-primary text-lg group-hover:shadow-lg"
                value={selectedRate}
                onChange={(e) => setSelectedRate(e.target.value)}
              >
                {rateRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                <div className="w-3 h-3 border-r-2 border-b-2 border-primary transform rotate-45 -translate-y-0.5 transition-all duration-500 group-hover:border-primary-dark"></div>
              </div>
            </div>
          </div>
        </div>
      {/* ... */}

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfessionals.map((professional) => renderProfessionalCard(professional))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun professionnel ne correspond à vos critères</p>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        worker={selectedProfessional ? {
          name: selectedProfessional.name,
          role: selectedProfessional.specialties[0],
          image: selectedProfessional.image
        } : undefined}
      />
    </div>
  );
};

export default SearchPage;

