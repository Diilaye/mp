import React, { useState, useEffect } from 'react';
import { apiGet } from '../utils/api.utils';
import { API_ENDPOINTS } from '../config/api.config';
import { motion } from 'framer-motion';
import { 
  Search as SearchIcon, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Euro, 
  Heart, 
  ChevronDown, 
  X, 
  Car, 
  Shield, 
  Award, 
  Search, 
  Sparkles, 
  Users, 
  DollarSign, 
  Briefcase 
} from 'lucide-react';
import { EmployeeData } from '../components/housekeeper/dashboard/UserManagement';
import { formatSlugToPhrase } from '../utils/slug-to-text';
import BookingModalEmployee from '../components/modals/BookingModalEmployee';

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

// Services and locations arrays
const services = [
  "Tous",
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
  "Toutes",
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


/**
 * Tableau de données fictives d'employés
 */
// Using centralized API endpoints from config


const SearchPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<EmployeeData | null>(null);
  const [selectedProfession, setSelectedProfession] = useState("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedRate, setSelectedRate] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees from API using the centralized API utilities
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        
        // Define the expected API response type
        interface ApiResponse {
          success: boolean;
          data: EmployeeData[];
          message?: string;
        }
        
        const data = await apiGet<ApiResponse>(API_ENDPOINTS.EMPLOYERS.LIST);
        
        if (data.success && Array.isArray(data.data)) {
          setEmployees(data.data);
        } else {
          throw new Error('Format de données invalide');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des employés:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleBooking = (professional: EmployeeData) => {
    setSelectedProfessional(professional);
    setIsBookingModalOpen(true);
  };

  // Filter professionals based on selected criteria
  const filteredProfessionals = employees.filter((professional) => professional.status === 'available').filter(worker => {
    const matchesSearch = worker.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfession = selectedProfession === "Tous" || worker.position === selectedProfession;
    
    // Extract city from address for filtering
    const workerCity = worker.address.split(',').pop()?.trim() || '';
    const matchesCity = selectedCity === "Toutes" || 
                       workerCity.toLowerCase().includes(selectedCity.toLowerCase()) ||
                       worker.address.toLowerCase().includes(selectedCity.toLowerCase());
    
    const matchesRate = selectedRate === "Tous" || 
      (selectedRate === "30.000-40.000 XOF" && worker.salary >= 30000 && worker.salary <= 40000) ||
      (selectedRate === "41.000-50.000 XOF" && worker.salary >= 41000 && worker.salary <= 50000) ||
      (selectedRate === "51.000 XOF" && worker.salary > 50000);

    return matchesSearch && matchesProfession && matchesCity && matchesRate;
  });

  // Simple card component based on the reference design
  const SimpleWorkerCard = ({ professional }: { professional: EmployeeData }) => {
    // Format professional.availability text
    const availabilityText = professional.availability.includes('Tous les jours') 
      ? "Descend tous les jours" 
      : professional.availability;
    
    // Get main service type
    const mainService = professional.position;
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Image section with availability badge */}
        <div className="relative">
          <img
            src={professional.photo}
            alt={professional.fullName}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary/40   text-black px-3 py-1 rounded-full text-sm font-medium">
              Disponibilité du jour !
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4">
          {/* Name and age */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-900">{professional.fullName}</h3>
            <span className="text-gray-500 text-sm">{professional.experience!.split(' ')[0]} ans</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm">{professional.address}</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-600 mb-2">
            {/* <DollarSign className="w-4 h-4 text-orange-500 mr-2" /> */}
            <span className="text-sm">{professional.salary.toLocaleString()} FCFA</span>
          </div>

          {/* Availability */}
          <div className="flex items-center text-gray-600 mb-3">
            <Clock className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm">{formatSlugToPhrase(professional.availability)}</span>
          </div>

          {/* Service type */}
          <div className="mb-4">
            <span className="text-black px-4 py-1 bg-primary/20 rounded-full text-sm">
              {formatSlugToPhrase(professional.position)}
            </span>
          </div>

          {/* View profile and booking buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleBooking(professional)}
              className="w-full bg-orange-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-orange-700 transition-colors text-sm"
            >
              Voir le profil complet
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button 
              onClick={() => handleBooking(professional)}
              className="bg-primary text-white px-4 py-2 rounded-md transition-colors text-sm"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 container mx-auto px-4 mb-48">
      {/* Page header */}
      <div className="flex items-center justify-between mb-12 mt-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight flex items-center gap-3">
            Recherche de Talents
            <Sparkles className="text-orange-600 animate-pulse" size={32} />
          </h1>
          <p className="text-gray-600 flex items-center text-lg">
            <Users className="mr-2 text-orange-600" size={24} />
            <span className="font-medium">
              {isLoading ? 'Chargement...' : `${filteredProfessionals.length} professionnels disponibles`}
            </span> 
          </p>
        </div>
      </div>

      {/* Search and filters section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
        {/* Search and filter header */}
        <div className="mb-6 flex items-center">
          <Search className="w-6 h-6 text-orange-600 mr-3" />
          <h2 className="text-xl font-semibold">Filtrer vos résultats</h2>
        </div>
        
        {/* Grid layout for search and filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="lg:col-span-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un talent par nom..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Profession filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
              >
                {services.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* City filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {locations.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Rate filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarif</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedRate}
                onChange={(e) => setSelectedRate(e.target.value)}
              >
                {rateRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Apply filter button */}
          <div className="flex items-end">
            <button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={() => {/* Additional filter logic could be added here */}}
            >
              <Filter className="w-4 h-4" />
              Appliquer les filtres
            </button>
          </div>
        </div>
        
        {/* Active filters display */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedProfession !== "Tous" && (
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
              {selectedProfession}
              <button 
                className="ml-2 hover:text-orange-900"
                onClick={() => setSelectedProfession("Tous")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {selectedCity !== "Toutes" && (
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
              {selectedCity}
              <button 
                className="ml-2 hover:text-orange-900"
                onClick={() => setSelectedCity("Toutes")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {selectedRate !== "Tous" && (
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
              {selectedRate}
              <button 
                className="ml-2 hover:text-orange-900"
                onClick={() => setSelectedRate("Tous")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {(selectedProfession !== "Tous" || selectedCity !== "Toutes" || selectedRate !== "Tous") && (
            <button 
              className="text-gray-600 text-sm underline hover:text-orange-600"
              onClick={() => {
                setSelectedProfession("Tous");
                setSelectedCity("Toutes");
                setSelectedRate("Tous");
              }}
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>
      </div>

      {/* Results - Using the new simple card component */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">Erreur: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProfessionals.map((professional) => (
                <SimpleWorkerCard key={professional.id} professional={professional} />
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun professionnel ne correspond à vos critères</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking modal */}
      <BookingModalEmployee
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        worker={selectedProfessional ? {
          name: selectedProfessional.fullName,
          role: selectedProfessional.position,
          image: selectedProfessional.photo
        } : undefined}
      />
    </div>
  );
};

export default SearchPage;