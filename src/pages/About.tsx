import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Target, Heart, Star, MapPin } from 'lucide-react';

const stats = [
  {
    number: '1000+',
    label: 'Clients satisfaits',
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: '50+',
    label: 'Professionnels',
    icon: <Award className="w-6 h-6" />,
  },
  {
    number: '15+',
    label: 'Villes couvertes',
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    number: '4.8/5',
    label: 'Note moyenne',
    icon: <Star className="w-6 h-6" />,
  },
];

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Passion',
    description: 'Nous mettons tout notre cœur dans chaque service pour garantir votre satisfaction.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque détail de nos prestations.',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Engagement',
    description: 'Nous nous engageons à fournir un service fiable et de qualité.',
  },
];

const team = [
  {
    name: 'Sarah Martin',
    role: 'Fondatrice & CEO',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Marie Dubois',
    role: 'Directrice des Opérations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Julie Bernard',
    role: 'Responsable RH',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
            }}
          />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Notre Histoire
            </h1>
            <p className="text-xl text-gray-200">
              Depuis 2020, nous transformons la façon dont les services à domicile sont délivrés, 
              en mettant l'accent sur la qualité, la confiance et la satisfaction client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-montserrat font-bold text-gray-900 mb-6"
            >
              Notre Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Nous nous engageons à fournir des services à domicile de haute qualité, 
              en connectant les meilleurs professionnels avec les clients qui recherchent 
              l'excellence et la fiabilité.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-montserrat font-bold text-gray-900 mb-6"
            >
              Notre Équipe
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Des professionnels passionnés qui travaillent chaque jour pour vous offrir 
              le meilleur service possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6 group">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute inset-0 bg-rose-600 bg-opacity-0 group-hover:bg-opacity-20 rounded-2xl transition-all duration-300" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-rose-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;