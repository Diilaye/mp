import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, User, Archive } from 'lucide-react';

// Type pour représenter la structure des données de revue
export interface Review {
  id: string;
  rating: number;
  comment: string;
  isAvailable: boolean;
  // Champs obligatoires ou optionnels selon le contexte
  nom?: string;
  CratedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  nomClient?: string;
  telephoneClient?: string;
  nomPersonnel?: string;
  telephonePersonnel?: string;
  serviceManagement?: string;
}

// Props pour le composant ReviewCarousel
interface ReviewCarouselProps {
  // Données
  reviews: Review[];
  isLoading?: boolean;
  
  // Personnalisation
  title?: string;
  showTitle?: boolean;
  bgColor?: string;
  
  // Callbacks
  onLike?: (reviewId: string) => void;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  onArchive?: (reviewId: string) => void;
}

/**
 * Composant ReviewCarousel - Affiche un carrousel d'avis client avec pagination
 */
const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews,
  isLoading = false,
  title = "Avis de nos clients",
  showTitle = true,
  bgColor = "bg-white", // Par défaut fond blanc
  onLike,
  onEdit,
  onDelete,
  onArchive
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // Navigation automatique
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoPlaying && reviews.length > 1 && !isLoading) {
      interval = setInterval(() => {
        goToNextReview();
      }, 7000); // Change toutes les 7 secondes
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentIndex, reviews.length, isLoading]);
  
  // Arrêter la lecture automatique lors de l'interaction
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  // Navigation
  const goToNextReview = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevReview = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToReviewIndex = (index: number) => {
    if (index >= 0 && index < reviews.length) {
      setCurrentIndex(index);
    }
  };
  
  // Gestion du swipe sur mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    pauseAutoPlay();
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    
    // Si le mouvement est assez significatif (plus de 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToPrevReview(); // Swipe vers la droite -> avis précédent
      } else {
        goToNextReview(); // Swipe vers la gauche -> avis suivant
      }
    }
    
    resumeAutoPlay();
  };
  
  // Le review actuel
  const currentReview = reviews[currentIndex];

  // État de chargement
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60 bg-white rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Pas d'avis disponibles
  if (!reviews.length) {
    return (
      <div className="text-center p-12 bg-white rounded-xl shadow-lg">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600">Aucun avis disponible pour le moment.</p>
        <p className="text-gray-500 text-sm mt-2">Soyez le premier à laisser votre avis !</p>
      </div>
    );
  }

  return (
    <div className="review-carousel">
      
      <div 
        className={`relative ${bgColor} rounded-xl shadow-lg overflow-hidden min-h-[280px]`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <AnimatePresence mode="wait">
          {currentReview && (
            <ReviewCard 
              key={currentReview.id} 
              review={currentReview} 
              onLike={onLike}
              onEdit={onEdit ? () => onEdit(currentReview) : undefined}
              onDelete={onDelete ? () => onDelete(currentReview.id) : undefined}
              onArchive={onArchive ? () => onArchive(currentReview.id) : undefined}
            />
          )}
        </AnimatePresence>
        
        {/* Overlay de navigation pour les écrans tactiles */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
          <div className="w-1/3 h-full" />
          <div className="w-1/3 h-full" />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="mt-6 flex items-center justify-between">
        <button 
          onClick={() => {
            goToPrevReview();
            pauseAutoPlay();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Avis précédent"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToReviewIndex(index);
                pauseAutoPlay();
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-primary scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à l'avis ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={() => {
            goToNextReview();
            pauseAutoPlay();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Avis suivant"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

/**
 * Composant ReviewCard - Affiche un seul avis
 */
interface ReviewCardProps {
  review: Review;
  onLike?: (reviewId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  onLike,
  onEdit,
  onDelete,
  onArchive
}) => {
  const [isHelpful, setIsHelpful] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (e) {
      return "Date inconnue";
    }
  };
  
  // Formatter un numéro de téléphone
  const formatPhone = (phone?: string) => {
    if (!phone) return "";
    if (phone.startsWith('221')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`;
    }
    return phone;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="p-6 h-full"
    >
      <div className="flex items-start space-x-4 h-full">
        <div className="flex-1 flex flex-col h-full">
          {/* En-tête avec info client */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-montserrat font-semibold text-gray-900">
                {review.nomClient || review.nom}
              </h3>
              {review.telephoneClient && (
                <div className="text-sm text-gray-500">
                  {formatPhone(review.telephoneClient)}
                </div>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex">{renderStars(review.rating)}</div>
                {review.isAvailable && (
                  <span className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full">
                    Vérifié
                  </span>
                )}
              </div>
            </div>
            
          </div>

          {/* Info personnel si disponible */}
          {review.nomPersonnel && (
            <div className="mt-3 bg-gray-50 p-2 rounded-lg">
              <span className="text-sm font-medium text-gray-800">Personnel: </span>
              <span className="text-sm text-gray-600">{review.nomPersonnel}</span>
              {review.telephonePersonnel && (
                <span className="text-sm text-gray-500 ml-2">
                  ({formatPhone(review.telephonePersonnel)})
                </span>
              )}
            </div>
          )}

          {/* Service */}
          {(review.serviceManagement || review.nom) && (
            <div className="mt-3">
              <span className="text-sm font-medium text-white bg-primary px-3 py-1 rounded-full">
                {review.serviceManagement || review.nom}
              </span>
            </div>
          )}

          {/* Commentaire */}
          <p className="mt-4 text-gray-600 flex-grow">{review.comment}</p>

          {/* Actions */}
          <div className="flex space-x-2 mt-3">
            {/* {onEdit && (
              <button
                onClick={onEdit}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Modifier"
              >
                <span className="sr-only">Modifier</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )} */}
            
            {/* {onDelete && (
              <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Supprimer"
              >
                <span className="sr-only">Supprimer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )} */}
            
            {onArchive && review.isAvailable !== false && (
              <button
                onClick={onArchive}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Archiver"
              >
                <span className="sr-only">Archiver</span>
                <Archive className="h-5 w-5" />
              </button>
            )}
            
            {onLike && (
              <button
                onClick={() => onLike(review.id)}
                className="text-pink-400 hover:text-pink-300 transition-colors"
                aria-label="J'aime"
              >
                <span className="sr-only">J'aime</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
            
            {review.isAvailable === false && (
              <div className="ml-auto px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs flex items-center">
                <Archive className="h-3 w-3 mr-1" /> Archivé
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCarousel;