import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Calendar, Clock, Search, 
  ChevronRight, Star, Users, DollarSign, ArrowRight, Check 
} from 'lucide-react';

// Composant d'en-tête
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/assets/logo.png" 
              alt="Millenium Placement" 
              className="h-12"
            />
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-800 hover:text-primary font-medium">Accueil</a>
            <a href="#services" className="text-gray-800 hover:text-primary font-medium">Services</a>
            <a href="#personnel" className="text-gray-800 hover:text-primary font-medium">Personnel</a>
            <a href="#tarifs" className="text-gray-800 hover:text-primary font-medium">Tarifs</a>
            <a href="#temoignages" className="text-gray-800 hover:text-primary font-medium">Témoignages</a>
            <a href="#contact" className="text-gray-800 hover:text-primary font-medium">Contact</a>
          </nav>

          {/* Bouton de connexion */}
          <div className="hidden md:flex">
            <a 
              href="/connexion" 
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Connexion
            </a>
          </div>

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden flex flex-col space-y-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className="flex flex-col py-2 space-y-3 bg-white rounded-lg shadow-lg px-4">
            <a href="#" className="text-gray-800 py-2 border-b border-gray-100">Accueil</a>
            <a href="#services" className="text-gray-800 py-2 border-b border-gray-100">Services</a>
            <a href="#personnel" className="text-gray-800 py-2 border-b border-gray-100">Personnel</a>
            <a href="#tarifs" className="text-gray-800 py-2 border-b border-gray-100">Tarifs</a>
            <a href="#temoignages" className="text-gray-800 py-2 border-b border-gray-100">Témoignages</a>
            <a href="#contact" className="text-gray-800 py-2">Contact</a>
            <a 
              href="/connexion" 
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-center"
            >
              Connexion
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

// Composant du héros
const Hero = () => {
  return (
    <section className="pt-32 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Trouvez le <span className="text-primary">personnel de maison</span> idéal pour votre foyer
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-lg mb-8"
            >
              Millenium Placement vous propose une sélection rigoureuse d'aides ménagères, nounous et chauffeurs pour faciliter votre quotidien.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <a 
                href="#personnel" 
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-center"
              >
                Voir notre personnel
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary-light transition-colors text-center"
              >
                Nous contacter
              </a>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="w-5/6 h-80 bg-primary rounded-tl-3xl rounded-br-3xl mx-auto"></div>
              <img 
                src="/assets/hero-image.jpg" 
                alt="Personnel de maison" 
                className="absolute top-10 -left-4 w-full h-72 object-cover rounded-tr-3xl rounded-bl-3xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Personnel disponible</p>
                    <p className="text-primary font-bold">Dès aujourd'hui</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant des caractéristiques
const Features = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Personnel qualifié",
      description: "Nos employés sont soigneusement sélectionnés pour leur expérience et leur sérieux."
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Disponibilité rapide",
      description: "Trouvez rapidement le personnel dont vous avez besoin, même en urgence."
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Service de qualité",
      description: "Un suivi régulier pour garantir votre satisfaction et la qualité du service."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Tarifs transparents",
      description: "Des prix clairs et compétitifs, sans frais cachés ni mauvaises surprises."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pourquoi choisir Millenium Placement ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Nous mettons un point d'honneur à vous proposer le meilleur service pour répondre à vos besoins domestiques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant des services
const Services = () => {
  const services = [
    {
      title: "Aide Ménagère",
      icon: "/assets/cleaning-icon.svg",
      description: "Entretien du domicile, lessive, repassage et courses pour un intérieur impeccable.",
      price: "70 000 FCFA",
      features: ["Nettoyage", "Lessive", "Repassage", "Courses"]
    },
    {
      title: "Nounou / Garde d'enfants",
      icon: "/assets/nanny-icon.svg",
      description: "Prise en charge complète des enfants avec activités éducatives et soins attentifs.",
      price: "70 000 FCFA",
      features: ["Garde d'enfants", "Activités éducatives", "Préparation des repas", "Aide aux devoirs"]
    },
    {
      title: "Chauffeur",
      icon: "/assets/driver-icon.svg",
      description: "Transport sécurisé pour vos déplacements quotidiens et professionnels.",
      price: "160 000 FCFA",
      features: ["Transport", "Entretien du véhicule", "Courses", "Discrétion professionnelle"]
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Nous proposons une gamme complète de services pour répondre à tous vos besoins domestiques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-primary bg-opacity-10 p-8 flex justify-center">
                <img src={service.icon} alt={service.title} className="h-20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <span className="text-gray-500 text-sm"> / mois</span>
                </div>
                <ul className="mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block w-full py-2 text-center bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Réserver maintenant
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant du personnel disponible
const Personnel = () => {
  // Exemples de personnel basés sur vos images
  const personnelList = [
    {
      id: '1',
      fullName: 'Aliou Ngom',
      age: 45,
      address: 'Niancourab',
      position: 'Chauffeur',
      salary: 160000,
      availability: 'Descend tous les jours',
      photo: '/assets/aliou.jpg',
      languages: ['Wolof', 'Français'],
      skills: ['Conduite', 'Mécanique de base', 'Entretien véhicule']
    },
    {
      id: '2',
      fullName: 'Marieme Ndiaye',
      age: 38,
      address: 'Hlm Grand Yoff',
      position: 'Aide Ménage / nounou',
      salary: 70000,
      availability: 'Descend tous les jours',
      photo: '/assets/marieme.jpg',
      languages: ['Wolof', 'Français'],
      skills: ['Cuisine', 'Ménage', 'Garde d\'enfants']
    },
    {
      id: '3',
      fullName: 'Bilguiss Ba',
      age: 23,
      address: 'Geule tapée',
      position: 'Nounou',
      salary: 70000,
      availability: 'Descend tous les jours',
      photo: '/assets/bilguiss.jpg',
      languages: ['Wolof', 'Français', 'Anglais (notions)'],
      skills: ['Garde d\'enfants', 'Activités ludiques', 'Aide aux devoirs']
    }
  ];

  return (
    <section id="personnel" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Personnel disponible</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Découvrez notre personnel qualifié prêt à répondre à vos besoins domestiques dès aujourd'hui.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personnelList.map((person, index) => (
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
        </div>

        <div className="text-center mt-12">
          <a 
            href="/personnel" 
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

// Composant pour les témoignages
const Testimonials = () => {
  const testimonials = [
    {
      name: "Fatou Diop",
      role: "Cliente depuis 2 ans",
      content: "J'ai trouvé une excellente nounou pour mes enfants grâce à Millenium Placement. Très professionnelle et attentionnée. Je recommande vivement leurs services !",
      avatar: "/assets/testimonial1.jpg"
    },
    {
      name: "Mamadou Sall",
      role: "Client depuis 1 an",
      content: "Leur chauffeur est ponctuel et très courtois. Le service client est réactif et à l'écoute de nos besoins. Une agence sérieuse et de confiance.",
      avatar: "/assets/testimonial2.jpg"
    },
    {
      name: "Aïssatou Diallo",
      role: "Cliente depuis 6 mois",
      content: "Mon aide ménagère fait un travail remarquable. Elle est minutieuse et très organisée. Millenium a su comprendre exactement mes attentes.",
      avatar: "/assets/testimonial3.jpg"
    }
  ];

  return (
    <section id="temoignages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">La satisfaction de nos clients est notre priorité. Découvrez leurs témoignages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="inline-block w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant de contact
const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contactez-nous</h2>
            <p className="text-gray-600 mb-8">
              Vous avez des questions ou besoin d'un service particulier ? N'hésitez pas à nous contacter. Notre équipe se fera un plaisir de vous répondre dans les plus brefs délais.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Téléphone</h4>
                  <p className="text-gray-600">+221 77 144 17 17</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">contact@millenium-placement.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Adresse</h4>
                  <p className="text-gray-600">MERMOZ PYROTECHNIQUE, VILLA N°7153<br/>DAKAR, SÉNÉGAL</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Envoyez-nous un message</h3>
              
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Nom complet
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Votre email"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                    Téléphone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="service">
                    Service souhaité
                  </label>
                  <select 
                    id="service"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="aide_menagere">Aide Ménagère</option>
                    <option value="nounou">Nounou / Garde d'enfants</option>
                    <option value="chauffeur">Chauffeur</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Votre message"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant pour l'appel à l'action (CTA)
const CallToAction = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-white mb-4">Besoin d'un personnel qualifié rapidement ?</h2>
            <p className="text-white text-opacity-90 text-lg">
              Nous avons la solution adaptée à vos besoins. Contactez-nous dès aujourd'hui !
            </p>
          </div>
          <div>
            <a 
              href="tel:+221771441717" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              77 144 17 17
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant pour le pied de page
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/assets/logo-white.png" 
              alt="Millenium Placement" 
              className="h-12 mb-4"
            />
            <p className="text-gray-400 mb-4">
              Millenium Placement, votre agence de confiance pour le personnel de maison et les services à domicile au Sénégal.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Accueil</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary">Services</a></li>
              <li><a href="#personnel" className="text-gray-400 hover:text-primary">Personnel</a></li>
              <li><a href="#temoignages" className="text-gray-400 hover:text-primary">Témoignages</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Aide Ménagère</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Nounou / Garde d'enfants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Chauffeur</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Cuisinière</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Garde de sécurité</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-400">+221 77 144 17 17</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-400">contact@millenium-placement.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-400">MERMOZ PYROTECHNIQUE, VILLA N°7153<br/>DAKAR, SÉNÉGAL</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Millenium Placement. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary text-sm">Politique de confidentialité</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Bouton de retour en haut
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

// Page d'accueil principale
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Personnel />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;