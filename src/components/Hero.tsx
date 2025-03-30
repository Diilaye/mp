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
  '/images/banner/fem-menage.jpg',
  '/images/banner/Fem1.jpg',
  '/images/banner/Fem2.jpg',
  '/images/banner/Nou3.jpg'
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
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
          className="absolute inset-0 w-full h-full"
        >
          {backgroundImages.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3000ms] ease-out hover:scale-105"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary bg-opacity-80 text-white backdrop-blur-sm rounded-full text-custom-8 font-medium mb-2">
              Services à Domicile Premium
            </span>
            
            <h1 className="text-[20px] lg:text-[22px] font-montserrat font-bold text-white mb-6 leading-tight">
            Des professionnels de confiance ,{' '}
              <span className="text-primary-400">à votre service</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Simplifiez votre quotidien en trouvant le professionnel qu’il vous faut, rapidement et en toute confiance.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-8 py-4 bg-primary hover:bg-primary text-white rounded-full font-semibold flex items-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                >
                  <div className="w-12 h-12 mb-4 bg-primary bg-opacity-80 rounded-full flex items-center justify-center text-rose-100 mx-auto">
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

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default Hero;