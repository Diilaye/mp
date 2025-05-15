import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Calendar, Clock, Search, 
  ChevronRight, Star, Users, DollarSign, ArrowRight, Check, 
  ChevronDown
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { EmployeeData } from './housekeeper/dashboard/UserManagement';
import { API_ENDPOINTS, getApiUrl } from '../config/api.config';
import { formatSlugToPhrase } from '../utils/slug-to-text';
import BookingModalEMployee from './modals/BookingModalEmployee';

// Composant du personnel disponible
const Personnel = () => {

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<EmployeeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const handleBooking = (professional: EmployeeData) => {
      setSelectedProfessional(professional);
      setIsBookingModalOpen(true);
    };
     // Simple card component based on the reference design
      const SimpleWorkerCard = ({ professional }: { professional: EmployeeData }) => {
        // Format professional.availability to show as "Descend tous les jours" if 7 days a week
        const availabilityText = professional.availability.length >= 7 
          ? "Descend tous les jours" 
          : `Disponible ${professional.availability.length} jours/semaine`;

          console.log("nom:", professional.fullName);
          console.log("status:", professional.status);
        
        // Get main service type (first specialty)
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
                <span className="text-sm">{ formatSlugToPhrase(professional.availability) }</span>
              </div>
    
              {/* Service type */}
              <div className="mb-4">
                <span className="text-black px-4 py-1 bg-primary/20 rounded-full text-sm">
                  {formatSlugToPhrase(mainService)}
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
                {professional.status === 'available' ?  (
                <button 
                  onClick={() => handleBooking(professional)}
                  className="bg-primary text-white px-4 py-2 rounded-md transition-colors text-sm"
                >
                  Réserver
                </button>
                ) : (
                  <button 
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded-md transition-colors text-sm"
                >
                   Indisponible
                </button>
                )}
              </div>
            </div>
          </div>
        );
      };

  useEffect(() => {
    const fetchEmployers = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          getApiUrl(API_ENDPOINTS.EMPLOYERS.LIST),
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        
        console.log("Réponse API:", response);
        
        if (response.status === 200 && response.data) {
          // Transformer les données reçues dans le format attendu par le composant
          const transformedData: EmployeeData[] = response.data.data.map((employer: any) => ({
            id: employer.id || employer._id || String(Math.random()),
            fullName: employer.fullName,
            age: employer.age,
            phone: employer.phone,
            address: employer.address,
            position: employer.position,
            salary: employer.salary,
            availability: employer.availability || 'Descend tous les jours',
            status: employer.status || 'available',
            photo: employer.photo,
            experience: employer.experience,
            languages: employer.languages || [],
            skills: employer.skills || [],
            notes: employer.notes
          }));
          
          setEmployees(transformedData);
          toast.success("Employés chargés avec succès");
        } else {
          toast.error("Erreur lors du chargement des employés");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés:", error);
        toast.error("Impossible de charger les employés");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployers();
  }, []);

     
    

    const services = [
        "Aide ménage",
        "Aide ménage et cuisine",
        "Aide cuisine",
        "Chauffeur",
        "Nounou",
        "Jardinier",
        "Gardinier",
        "Assistant(e) vendeur(se)",
        "Lingère",
        "Agent(e) de nétoiement",
        "Chef cuisinier",
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
    
  
    return (
      <section id="personnel" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Personnel disponible</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Découvrez notre personnel qualifié prêt à répondre à vos besoins domestiques dès aujourd'hui.</p>
          </div>

           {/* Search Section */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <div className="bg-primary rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Service Dropdown */}
                <div className="relative">
                  <label className="block text-lg font-medium text-white mb-2">
                    Sélectionnez un service ?
                  </label>
                  <button
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-left flex items-center justify-between"
                  >
                    <span className={selectedService ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedService || 'Sélectionnez un service'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {isServiceDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                      {services.map((service) => (
                        <button
                          key={service}
                          onClick={() => {
                            setSelectedService(service);
                            setIsServiceDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-rose-50 text-gray-700 hover:text-rose-600"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="relative">
                  <label className="block text-lg font-medium text-white mb-2">
                    Sélectionnez votre localisation ?
                  </label>
                  <button
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-left flex items-center justify-between"
                  >
                    <span className={selectedLocation ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedLocation || 'Sélectionnez une ville'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {isLocationDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                      {locations.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-rose-50 text-gray-700 hover:text-rose-600"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      // Handle search
                      console.log('Searching:', { selectedService, selectedLocation });
                    //   navigate('/search', {
                    //     state: { service: selectedService, location: selectedLocation },
                    //   });
                    }}
                    className="w-full bg-black hover:bg-black text-white rounded-lg px-6 py-3 font-semibold flex items-center justify-center transition-colors"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
  
          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {employees.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <div className="h-64 bg-gray-100">
                    {person.photo ? (
                      <img 
                        src={person.photo} 
                        alt={person.fullName} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-4 left-4">
                    <div className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                      Disponibilité du jour !
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{person.fullName}</h3>
                    <span className="text-gray-500">{person.age} ans</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">{person.address}</span>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span className="font-medium">{person.salary.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span className="text-gray-600">{person.availability}</span>
                    </div>
                  </div>
                  
                  <div className="pb-4 mb-4 border-b border-gray-100">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {person.position}
                    </span>
                  </div>
                  
                  <a
                    href={`/personnel/${person.id}`}
                    className="flex items-center justify-center w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Voir le profil complet
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div> */}

           {/* Results - Using the new simple card component */}
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {employees.filter((professional) => professional.status === 'available').slice(0, 4).map((professional) => (
                    <SimpleWorkerCard key={professional.id} professional={professional} />
                  ))}
                </div>

                {employees.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Aucun professionnel ne correspond à vos critères</p>
                  </div>
                )}
              </div>

                {/* Booking modal */}
      <BookingModalEMployee
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        worker = { selectedProfessional ? {
          name: selectedProfessional.fullName,
          role: selectedProfessional.position,
          image: selectedProfessional.photo
        } : undefined}
      />
  
          <div className="text-center mt-12">
            <a 
              href="/search" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Voir tout notre personnel
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      
      </section>
    );
  };

  

  export default Personnel;