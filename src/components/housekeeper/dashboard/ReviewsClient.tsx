import  { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ReviewCarousel from '../../ReviewCarousel';
import { API_BASE_URL } from '../../../config/api.config';

// Importer l'interface Review depuis ReviewCarousel pour assurer la compatibilité
import { Review as ReviewCarouselType } from '../../ReviewCarousel';

interface Review {
  /**
   * Nom du personnel concerné
   */
  nomPersonnel: string;
  
  /**
   * Contenu du commentaire
   */
  comment: string;
  
  /**
   * Numéro de téléphone du personnel
   */
  telephonePersonnel: string;
  
  /**
   * Nom du client qui a laissé le commentaire
   */
  nomClient: string;
  
  /**
   * Numéro de téléphone du client
   */
  telephoneClient: string;
  
  /**
   * Service concerné par le commentaire
   */
  serviceManagement: string;
  
  /**
   * Note attribuée (de 1 à 5)
   */
  rating: number;
  
  /**
   * Indique si le commentaire est disponible/visible
   */
  isAvailable: boolean;
  
  /**
   * Date de création du commentaire
   */
  createdAt: string;
  
  /**
   * Date de dernière mise à jour du commentaire
   */
  updatedAt: string;
  
  /**
   * Identifiant unique du commentaire
   */
  id: string;
  
  /**
   * Champs optionnels pour compatibilité avec ReviewCarousel
   */
  nom?: string;
  CratedAt?: string;
}

const ReviewsClient = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);


  // Chargement initial des avis
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/reviews-client`,
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

  // const handleAddReview = async () => {
  //   if (!newReview. || !newReview.comment) {
  //     toast.error('Veuillez remplir tous les champs');
  //     return;
  //   }

  //   const token = localStorage.getItem('token');
    
  //   try {
  //     setIsLoading(true);
      
  //     const response = await axios.post(
  //       `${API_BASE_URL}/reviews-client`,
  //       {
  //         ...newReview
  //       },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         },
  //         withCredentials: true
  //       }
  //     );

  //     if (response.data.success) {
  //       fetchReviews();
  //       setNewReview({
  //         nom: '',
  //         rating: 5,
  //         comment: '',
  //         CratedAt: ''
  //       });
  //       setShowAddForm(false);
  //       toast.success('Avis ajouté avec succès');
  //     } else {
  //       toast.error('Erreur lors de l\'ajout de l\'avis');
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout de l\'avis:', error);
  //     toast.error('Impossible d\'ajouter l\'avis');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
      setIsLoading(true);
      
      const response = await axios.delete(
        `${API_BASE_URL}/reviews-client/${reviewId}`,
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

  const handleArchiveReview = async (reviewId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir archiver cet avis ?')) return;
    
    const token = localStorage.getItem('token');
    const reviewToArchive = reviews.find(review => review.id === reviewId);
    
    if (!reviewToArchive) {
      toast.error('Avis introuvable');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Créer une copie de l'avis avec isAvailable à false pour l'archiver
      const archivedReview = { ...reviewToArchive, isAvailable: false };
      
      const response = await axios.put(
        `${API_BASE_URL}/reviews-client/${reviewId}`,
        archivedReview,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // Mettre à jour l'état local des avis
        setReviews(reviews.map(review => 
          review.id === reviewId ? { ...review, isAvailable: false } : review
        ));
        toast.success('Avis archivé avec succès');
      } else {
        toast.error('Erreur lors de l\'archivage de l\'avis');
      }
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'avis:', error);
      toast.error('Impossible d\'archiver l\'avis');
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
    <div className="bg-black rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-white">
          Avis clients
        </h2>
       
      </div>

      {isLoading && reviews.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
        
          {reviews.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {averageRating.toFixed(1)}/5
                  </span>
                </div>
                <p className="text-white">
                  Basé sur {reviews.length} avis
                </p>
              </div>

              <div className="space-y-6">
              <ReviewCarousel
                          reviews={reviews as unknown as ReviewCarouselType[]}
                          onDelete={handleDeleteReview}
                          onEdit={(review) => setEditingReview(review as unknown as Review)}
                          onLike={undefined}
                          onArchive={handleArchiveReview}
                        />
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

export default ReviewsClient;