import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useHousekeeperStore } from '../../../store/housekeeperStore';
import { motion } from 'framer-motion';

const Reviews = () => {
  const reviews = useHousekeeperStore((state) => state.reviews);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 text-yellow-400 fill-current"
        />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
        />
      );
    }

    return stars;
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-montserrat font-bold text-gray-800 mb-6">
        Avis clients
      </h2>

      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            {renderStars(averageRating)}
          </div>
          <span className="text-lg font-semibold text-gray-700">
            {averageRating.toFixed(1)}/5
          </span>
        </div>
        <p className="text-gray-600">
          Basé sur {reviews.length} avis
        </p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-montserrat font-semibold text-gray-800">
                {review.clientName}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;