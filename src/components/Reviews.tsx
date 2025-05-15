import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, getApiUrl } from '../config/api.config';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import ReviewModal from './modals/ReviewModal';

type Review = {
  id: string;
  nom: string;
  rating: number;
  comment: string;
  CratedAt: string;
  isAvailable: boolean;
};

const ReviewCard = ({ review }: { review: Review }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-start space-x-4">
        {/* <img
          src={review.userImage}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        /> */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-montserrat font-semibold text-gray-900">
                {review.nom}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex">{renderStars(review.rating)}</div>
                {review.isAvailable && (
                  <span className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full">
                    Vérifié
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {/* <Calendar className="w-4 h-4 mr-1" />
              {new Date(review.CratedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} */}
            </div>
          </div>

          <div className="mt-3">
            <span className="text-sm font-medium text-white bg-primary px-3 py-1 rounded-full">
              {review.nom}
            </span>
          </div>

          <p className="mt-3 text-gray-600">{review.comment}</p>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                isHelpful
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {/* <span>Utile ({12})</span> */}
            </button>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);

  const handleReviewSubmit = (reviewData: any) => {
    const newReview: Review = {
      id: (reviews.length + 1).toString(),
      nom: 'Utilisateur',  // This would come from auth context in a real app
      rating: reviewData.rating,
      comment: reviewData.comment,
      CratedAt: new Date().toISOString(),
      isAvailable: true,
    };

    setReviews([newReview, ...reviews]);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.REVIEWS.LIST));
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des avis');
        }
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des avis:', error);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-montserrat font-bold text-gray-900 mb-4"
            >
              Avis de nos clients
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Découvrez ce que nos clients disent de nos services
            </motion.p>
          </div>

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center md:justify-start mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-6 h-6 ${
                        index < Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-gray-600">
                  Basé sur {reviews.length} avis
                </div>
              </div>

              <div className="flex-1 max-w-md">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter((r) => r.rating === rating).length;
                  const percentage = (count / reviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1 w-20">
                        <span className="text-sm text-gray-600">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-600">
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Add Review Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Laisser un avis
            </button>
          </motion.div>

          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;