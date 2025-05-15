import React, { useState, useEffect } from 'react';
import { Users, Award, Target, Heart, Star, MapPin, ArrowRight, Check, Shield } from 'lucide-react';

// Data
const stats = [
  { number: '1000+', label: 'Clients satisfaits', icon: <Users className="w-6 h-6" /> },
  { number: '50+', label: 'Professionnels', icon: <Award className="w-6 h-6" /> },
  { number: '15+', label: 'Villes couvertes', icon: <MapPin className="w-6 h-6" /> },
  { number: '4.8/5', label: 'Note moyenne', icon: <Star className="w-6 h-6" /> },
];

const values = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Confiance',
    description: 'Nous construisons des relations durables basées sur la transparence et la fiabilité.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    description: 'Nous sélectionnons rigoureusement nos professionnels pour garantir un service de qualité exceptionnelle.',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Respect',
    description: 'Nous traitons chaque client et professionnel avec dignité, équité et considération.',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Engagement',
    description: 'Nous nous engageons à assurer votre satisfaction totale et à répondre à vos besoins spécifiques.',
  },
];

const team = [
  {
    name: 'Maimouna Mbaye',
    role: 'Fondatrice & CEO',
    image: 'https://img.freepik.com/free-photo/businesswoman-executive-professional-success-concept_53876-137644.jpg?w=2000',
    bio: 'Visionnaire et entrepreneure passionnée, Maimouna a fondé notre entreprise avec la conviction que trouver le bon professionnel devrait être simple et sans stress.',
    expertise: 'Marketing digital et développement commercial',
  },
  {
    name: 'Aminata Sarr',
    role: 'Directrice des Opérations',
    image: 'https://img.freepik.com/free-photo/young-woman-holding-tablet-work_23-2149116576.jpg?w=2000',
    bio: 'Experte en optimisation des processus, Aminata s\'assure que chaque interaction client se déroule parfaitement, de la recherche à la prestation finale.',
    expertise: 'Gestion de projets et amélioration continue',
  },
  {
    name: 'Henriette Diallo',
    role: 'Directrice des Ressources Humaines',
    image: 'https://img.freepik.com/free-photo/close-up-young-beautiful-woman-her-desk_273609-37257.jpg?w=2000',
    bio: 'Avec son œil aiguisé pour le talent et la qualité, Henriette recrute et forme les meilleurs professionnels pour garantir des services d\'excellence.',
    expertise: 'Recrutement et développement des talents',
  },
];

const testimonials = [
  {
    name: "Sophie M.",
    role: "Cliente fidèle",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    content: "Formidable service qui m'a fait gagner un temps précieux ! J'ai trouvé un plombier qualifié en moins de 24h pour une urgence à la maison.",
    rating: 5,
  },
  {
    name: "Marc D.",
    role: "Nouveau client",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    content: "Très bonne expérience globale. J'ai pu trouver rapidement un coach sportif qui correspondait exactement à mes besoins.",
    rating: 4,
  },
  {
    name: "Famille Benoit",
    role: "Clients réguliers",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    content: "Nous cherchions désespérément une nounou de confiance pour nos jumeaux. Notre nounou actuelle est un véritable trésor. Merci infiniment !",
    rating: 5,
  },
];

const partners = [
  { name: 'Ecobank', logo: 'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw' },
  { name: 'Orange', logo: 'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw' },
  { name: 'Sonatel', logo: 'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw' },
  { name: 'Expresso', logo: 'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw' },
  { name: 'Free', logo: 'https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw' },
];

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  
  // Effet pour changer automatiquement le témoignage actif
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="font-sans antialiased text-gray-900 overflow-hidden">
      {/* Hero Section - Design élégant et classe */}
      <section className="relative min-h-screen flex items-center">
        {/* Arrière-plan avec overlay dégradé */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="images/african-american-woman.jpg" 
            alt="Millenium Placement" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Effet de design sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-accent/20 mix-blend-overlay z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255, 255, 255, 0.2),transparent)] z-20"></div>
        
        {/* Contenu */}
        <div className="relative container mx-auto px-6 z-30">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 border border-white/20 rounded-full text-white/90 backdrop-blur-md mb-8">
              <span className="text-sm tracking-wide font-light">DEPUIS 2020 • EXCELLENCE & CONFIANCE</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight tracking-tight">
              <span className="block font-extralight">Vous cherchez,</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">nous trouvons.</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-10 max-w-3xl font-light">
              Millenium Placement met en relation les particuliers et les entreprises avec les meilleurs professionnels qualifiés pour répondre à tous vos besoins.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a href="/services" className="px-10 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                Découvrir nos services
              </a>
              
              <a 
                href="#mission-section" 
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 font-medium rounded-full transition-all duration-300"
              >
                Notre mission
              </a>
            </div>
            
            <div className="flex justify-center mt-16">
              <a 
                href="#stats-section"
                className="animate-bounce rounded-full p-2 bg-white/10 backdrop-blur-lg border border-white/20"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Design élégant */}
      <section id="stats-section" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              NOS CHIFFRES CLÉS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">L'impact mesurable de notre service</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre engagement envers l'excellence se traduit en résultats concrets qui transforment le quotidien de nos clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-8 text-center transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6 mx-auto">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-bold mb-3 text-gray-900 font-serif">
                  {stat.number}
                </h3>
                <p className="text-lg font-medium text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Section - Design élégant */}
      <section id="mission-section" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                NOTRE MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Simplifier l'accès aux services professionnels</h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chez Millenium Placement, nous croyons que trouver le bon professionnel ne devrait jamais être un parcours du combattant. Notre mission est de créer un pont de confiance entre les clients et les professionnels qualifiés.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous nous engageons à offrir une expérience sans stress, en garantissant des services de qualité exceptionnelle qui répondent précisément à vos besoins et attentes.
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">Professionnels rigoureusement sélectionnés</p>
              </div>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">Service client réactif et attentionné</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-medium">Satisfaction garantie</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Notre mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Élément décoratif */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full z-0"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section - Design élégant */}
      <section id="values-section" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              NOS PRINCIPES FONDAMENTAUX
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Nos valeurs</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions et façonnent notre engagement envers vous.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-xl p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden"
              >
                {/* Élément décoratif */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:bg-primary/10 transition-all duration-500"></div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary/20 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section - Design élégant */}
      <section id="team-section" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              NOTRE ÉQUIPE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Les visages derrière notre succès</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe passionnée et dévouée, déterminée à révolutionner votre expérience de recherche de professionnels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl group ${index === activeTeamMember ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveTeamMember(index)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-white/80">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{member.expertise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Design élégant */}
      <section id="testimonials-section" className="py-24 bg-white relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mb-48"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              TÉMOIGNAGES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ce que nos clients disent</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des expériences authentiques qui témoignent de notre engagement envers la satisfaction client.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 ${index === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-8'}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xl text-gray-600 italic mb-8 leading-relaxed">"{testimonial.content}"</p>
                      
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-10 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-primary w-10' : 'bg-gray-300'}`}
                  aria-label={`Voir témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section - Design élégant */}
      <section id="partners-section" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              NOS PARTENAIRES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ils nous font confiance</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des collaborations stratégiques qui renforcent notre capacité à vous offrir des services d'excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center transition-all duration-300 hover:shadow-xl"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-16 max-w-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Design élégant */}
      <section id="cta-section" className="py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à trouver votre professionnel idéal ?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Rejoignez les milliers de clients satisfaits qui ont trouvé le professionnel parfait pour répondre à leurs besoins.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/services" className="px-10 py-4 rounded-full bg-white text-primary font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-100">
                Découvrir nos services
              </a>
              
              <a 
                href="/contact" 
                className="px-10 py-4 rounded-full bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
