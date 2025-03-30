import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Clock, MapPin, Search, ChevronDown } from 'lucide-react';
import BookingModal from './modals/BookingModal';

const professionals = [
  {
    name: "Sophie Martin",
    role: "Femme de Ménage",
    rating: 4.8,
    reviews: 156,
    experience: "5 ans",
    location: "Paris",
    availability: "Disponible maintenant",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Ménage", "Repassage", "Organisation"]
  },
  {
    name: "Marie Dubois",
    role: "Garde d'Enfants",
    rating: 4.9,
    reviews: 203,
    experience: "7 ans",
    location: "Lyon",
    availability: "Disponible demain",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Activités éducatives", "Premiers secours", "Cuisine"]
  },
  {
    name: "Claire Bernard",
    role: "Aide à Domicile",
    rating: 4.7,
    reviews: 178,
    experience: "4 ans",
    location: "Marseille",
    availability: "Disponible cette semaine",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Aide aux seniors", "Courses", "Compagnie"]
  },
  {
    name: "Sophie Martin",
    role: "Femme de Ménage",
    rating: 4.8,
    reviews: 156,
    experience: "5 ans",
    location: "Paris",
    availability: "Disponible maintenant",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Ménage", "Repassage", "Organisation"]
  },
  {
    name: "Marie Dubois",
    role: "Garde d'Enfants",
    rating: 4.9,
    reviews: 203,
    experience: "7 ans",
    location: "Lyon",
    availability: "Disponible demain",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Activités éducatives", "Premiers secours", "Cuisine"]
  },
  {
    name: "Claire Bernard",
    role: "Aide à Domicile",
    rating: 4.7,
    reviews: 178,
    experience: "4 ans",
    location: "Marseille",
    availability: "Disponible cette semaine",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Aide aux seniors", "Courses", "Compagnie"]
  },
  {
    name: "Sophie Martin",
    role: "Femme de Ménage",
    rating: 4.8,
    reviews: 156,
    experience: "5 ans",
    location: "Paris",
    availability: "Disponible maintenant",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Ménage", "Repassage", "Organisation"]
  },
  {
    name: "Marie Dubois",
    role: "Garde d'Enfants",
    rating: 4.9,
    reviews: 203,
    experience: "7 ans",
    location: "Lyon",
    availability: "Disponible demain",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Activités éducatives", "Premiers secours", "Cuisine"]
  },
  {
    name: "Claire Bernard",
    role: "Aide à Domicile",
    rating: 4.7,
    reviews: 178,
    experience: "4 ans",
    location: "Marseille",
    availability: "Disponible cette semaine",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Aide aux seniors", "Courses", "Compagnie"]
  },
  {
    name: "Sophie Martin",
    role: "Femme de Ménage",
    rating: 4.8,
    reviews: 156,
    experience: "5 ans",
    location: "Paris",
    availability: "Disponible maintenant",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Ménage", "Repassage", "Organisation"]
  },
  {
    name: "Marie Dubois",
    role: "Garde d'Enfants",
    rating: 4.9,
    reviews: 203,
    experience: "7 ans",
    location: "Lyon",
    availability: "Disponible demain",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Activités éducatives", "Premiers secours", "Cuisine"]
  },
  {
    name: "Claire Bernard",
    role: "Aide à Domicile",
    rating: 4.7,
    reviews: 178,
    experience: "4 ans",
    location: "Marseille",
    availability: "Disponible cette semaine",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specialties: ["Aide aux seniors", "Courses", "Compagnie"]
  }
];

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

const Workers = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<typeof professionals[0] | null>(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleBooking = (worker: typeof professionals[0]) => {
    setSelectedWorker(worker);
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
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

          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-montserrat font-bold text-gray-800 mb-6"
            >
              Nos Professionnelles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Des expertes qualifiées et passionnées pour prendre soin de votre maison et de vos proches
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionals.map((professional, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-64 object-cover rounded-t-2xl"
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
                      <p className="text-rose-500 font-medium">{professional.role}</p>
                    </div>
                    <div className="flex items-center bg-rose-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{professional.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{professional.experience} d'expérience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{professional.location}</span>
                    </div>
                  </div>

                  {/* <div className="flex flex-wrap gap-2 mb-6">
                    {professional.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div> */}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">
                      {professional.availability}
                    </span>
                    <button
                      onClick={() => handleBooking(professional)}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        worker={selectedWorker || undefined}
      />
    </>
  );
};

export default Workers;