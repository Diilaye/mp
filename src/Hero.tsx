import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BookingModal from './modals/BookingModal';

const backgroundImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80'
];

const features = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Service Premium",
    description: "Des prestations haut de gamme"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Garantie",
    description: "Satisfaction assurée"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Support",
    description: "À votre écoute"
  }
];

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            speed={1500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            className="h-full w-full"
          >
            {backgroundImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3000ms] ease-out hover:scale-105"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-rose-600 bg-opacity-20 text-rose-100 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                Services à Domicile Premium
              </span>
              
              <h1 className="text-5xl lg:text-7xl font-montserrat font-bold text-white mb-6 leading-tight">
                Votre Maison,{' '}
                <span className="text-rose-400">Notre Passion</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Découvrez nos services personnalisés pour votre maison et votre famille. 
                Des professionnelles qualifiées à votre service.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-semibold flex items-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Réserver maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all">
                  En savoir plus
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className="w-12 h-12 mb-4 bg-rose-600 bg-opacity-20 rounded-full flex items-center justify-center text-rose-100">
                      {feature.icon}
                    </div>
                    <h3 className="font-montserrat font-semibold text-white text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default Hero;