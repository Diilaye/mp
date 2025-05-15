import  { useState, useEffect } from 'react';
import { Star, StarHalf, Edit2, Trash, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../../config/api.config';

interface Review {
  id: string;
  nom: string;
  rating: number;
  comment: string;
  CratedAt: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState<Omit<Review, 'id' | 'date'>>({
    nom: '',
    rating: 5,
    comment: '',
    CratedAt:''
  });

  // Chargement initial des avis
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/reviews-admin`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        
        setReviews(response.data.data);
      } else {
        toast.error('Erreur lors de la récupération des avis');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      toast.error('Impossible de récupérer les avis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!newReview.nom || !newReview.comment) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const token = localStorage.getItem('token');
    
    try {
      setIsLoading(true);
      
      const response = await axios.post(
        `${API_BASE_URL}/reviews-admin`,
        {
          ...newReview
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        fetchReviews();
        setNewReview({
          nom: '',
          rating: 5,
          comment: '',
          CratedAt: ''
        });
        setShowAddForm(false);
        toast.success('Avis ajouté avec succès');
      } else {
        toast.error('Erreur lors de l\'ajout de l\'avis');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
      toast.error('Impossible d\'ajouter l\'avis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    
    const token = localStorage.getItem('token');
    
    try {
      setIsLoading(true);
      
      const response = await axios.put(
        `${API_BASE_URL}/reviews-admin/${editingReview.id}`,
        editingReview,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setReviews(reviews.map(review => 
          review.id === editingReview.id ? editingReview : review
        ));
        setEditingReview(null);
        toast.success('Avis mis à jour avec succès');
      } else {
        toast.error('Erreur lors de la mise à jour de l\'avis');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avis:', error);
      toast.error('Impossible de mettre à jour l\'avis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
      setIsLoading(true);
      
      const response = await axios.delete(
        `${API_BASE_URL}/reviews-admin/${reviewId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setReviews(reviews.filter(review => review.id !== reviewId));
        toast.success('Avis supprimé avec succès');
      } else {
        toast.error('Erreur lors de la suppression de l\'avis');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'avis:', error);
      toast.error('Impossible de supprimer l\'avis');
    } finally {
      setIsLoading(false);
    }
  };

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

  const renderStarRating = (currentRating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    let i = 0;
    for (const review of reviews) {
      console.log("review.ranking");
      console.log(review.rating);
      i += review.rating;
    }
    return i / reviews.length;
  };

  const averageRating = calculateAverageRating();

  console.log("reviews.length");
  console.log(reviews.length);
  console.log(reviews);
  console.log(averageRating);
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Avis admin
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un avis
        </button>
      </div>

      {isLoading && reviews.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-montserrat font-semibold">Ajouter un nouvel avis</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
                    <input
                      type="text"
                      value={newReview.nom}
                      onChange={(e) => setNewReview({...newReview, nom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Ex: Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                    {renderStarRating(newReview.rating, (rating) => setNewReview({...newReview, rating}))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={4}
                      placeholder="Écrivez votre commentaire ici..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddReview}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {reviews.length > 0 ? (
            <>
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
                    {editingReview?.id === review.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
                          <input
                            type="text"
                            value={editingReview.nom}
                            onChange={(e) => setEditingReview({...editingReview, nom: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                          {renderStarRating(editingReview.rating, (rating) => 
                            setEditingReview({...editingReview,  rating})
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                          <textarea
                            value={editingReview.comment}
                            onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows={4}
                          ></textarea>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingReview(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleUpdateReview}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-montserrat font-semibold text-gray-800">
                            {review.nom}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {/* <span className="text-sm text-gray-500">
                              {new Date(review.CratedAt).toLocaleDateString()}
                            </span> */}
                            <div className="flex space-x-1">
                              <button
                                onClick={() => setEditingReview(review)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Modifier"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Supprimer"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Aucun avis disponible pour le moment.</p>
              <p className="text-gray-500 mt-2">
                Cliquez sur "Ajouter un avis" pour créer le premier avis.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;