import React from 'react';
import { Star, StarHalf, Phone, User, Calendar, MessageCircle, MoreHorizontal, Check, X, Edit, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  nomClient: string;
  telephoneClient: string;
  nomPersonnel: string;
  telephonePersonnel: string;
  rating: number;
  comment: string;
  isAvailable: boolean;
  CratedAt?: string; // J'ai gardé l'orthographe originale
  createdAt?: string; // Alternative si CratedAt n'existe pas
}

interface ReviewCardProps {
  review: Review;
  setEditingReview: (review: Review) => void;
  handleDeleteReview: (id: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  setEditingReview, 
  handleDeleteReview 
}) => {
  
  // Fonction pour générer les étoiles selon la note
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  // Formater le numéro de téléphone
  const formatPhone = (phone: string) => {
    if (phone.startsWith('221')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`;
    }
    return phone;
  };

  // Obtenir la date à partir de CratedAt ou createdAt
  const getDate = () => {
    const dateString = review.CratedAt || review.createdAt || '';
    if (!dateString) return '';
    
    return new Date(dateString).toLocaleDateString('fr-SN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-purple-900 rounded-xl shadow-lg overflow-hidden p-1">
      <div className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-lg p-5 hover:bg-opacity-50 transition-all duration-300">
        {/* En-tête avec info client et actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/30 p-2 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-montserrat font-semibold text-white text-lg">
                {review.nomClient}
              </h3>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="h-3.5 w-3.5 mr-1" />
                <span>{formatPhone(review.telephoneClient)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingReview(review)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                title="Modifier"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Modifier</span>
              </button>
              
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Supprimer</span>
              </button>
            </div>
            
            <div className={`px-3 py-1 rounded-full flex items-center text-sm ${
              review.isAvailable 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {review.isAvailable 
                ? <><Check className="h-3.5 w-3.5 mr-1" /> Actif</> 
                : <><X className="h-3.5 w-3.5 mr-1" /> Inactif</>
              }
            </div>
          </div>
        </div>
        
        {/* Information personnel */}
        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="bg-secondary/20 p-2 rounded-full">
              <User className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <div className="font-medium text-white">{review.nomPersonnel}</div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="h-3.5 w-3.5 mr-1" />
                <span>{formatPhone(review.telephonePersonnel)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Note et date */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {renderStars(review.rating)}
            <span className="ml-2 text-white font-medium">{review.rating}/5</span>
          </div>
          
          {getDate() && (
            <div className="flex items-center text-gray-300 text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{getDate()}</span>
            </div>
          )}
        </div>
        
        {/* Commentaire */}
        <div className="relative mt-4 p-4 bg-white/10 rounded-lg border-l-4 border-secondary">
          <MessageCircle className="absolute top-4 left-4 h-5 w-5 text-secondary/80" />
          <p className="text-white pl-8 whitespace-pre-line text-sm leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;