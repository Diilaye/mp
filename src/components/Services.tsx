import React from 'react';
import {  Shield, Sparkles, Car, Home, ChefHat, Baby, ArrowRight } from 'lucide-react';





interface Category {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: "Personnel de maison",
    description: "Agents qualifiés pour l'entretien ménager, la cuisine, le repassage et diverses autres tâches domestiques.",
    icon: <Home className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Cuisiniers à domicile",
    description: "Chefs spécialisés dans la préparation de repas personnalisés selon les préférences et exigences alimentaires des clients.",
    icon: <ChefHat className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Garde d'enfants",
    description: "Nounous expérimentées assurant le bien-être et l'épanouissement des enfants dans un cadre sécurisé et propice à leur développement.",
    icon: <Baby className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Chauffeurs privés",
    description: "Professionnels garantissant des déplacements sécurisés et confortables, qu'ils soient personnels ou professionnels.",
    icon: <Car className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Gardiens",
    description: "Agents de sécurité qualifiés pour la surveillance et la protection des biens privés ou commerciaux.",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 6,
    title: "Personnel de nettoyage",
    description: "Équipes spécialisées dans l'entretien des bureaux, commerces et autres espaces professionnels.",
    icon: <Sparkles className="w-6 h-6" />
  }
];

const categories: Category[] = [
  {
    id: 1,
    title: "Employés de maison",
    description: "Agents qualifiés pour l'entretien ménager et diverses tâches domestiques",
    icon: <Home className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"
  },
  {
    id: 2,
    title: "Cuisiniers à domicile",
    description: "Chefs spécialisés dans la préparation de repas personnalisés",
    icon: <ChefHat className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500"
  },
  {
    id: 3,
    title: "Garde d'enfants",
    description: "Nounous expérimentées pour l'épanouissement de vos enfants",
    icon: <Baby className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=500"
  },
  {
    id: 4,
    title: "Chauffeurs privés",
    description: "Professionnels pour des déplacements sécurisés et confortables",
    icon: <Car className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500"
  },
  {
    id: 5,
    title: "Gardiens",
    description: "Agents de sécurité qualifiés pour votre protection",
    icon: <Shield className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=500"
  },
  {
    id: 6,
    title: "Personnel de nettoyage",
    description: "Équipes spécialisées dans l'entretien professionnel",
    icon: <Sparkles className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"
  }
];

const Services = () => {
  return (
    <section id="services">
     {/* Section des services détaillés */}
      <div className="mb-16 ml-32 mr-32 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Services Détaillés</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Une gamme complète de services professionnels pour répondre à tous vos besoins.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-primary/5 p-4 rounded-xl group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Services;