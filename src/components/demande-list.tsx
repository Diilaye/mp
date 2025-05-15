import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Clock, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/api.config';

interface Demande {
  id: string;
  phone: string;
  isTreat: boolean;
  CratedAt: string;
  updatedAt: string;

}

const DemandesList = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (user === null) {
      window.location.href = '/';
    } else {
      setIsAuth(true);
      
      // Récupération de la liste des demandes
      const fetchDemandes = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/demande-users`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              withCredentials: true
            }
          );
          
          if (response.data.success) {
            setDemandes(response.data.data);
            console.log("Liste des demandes récupérée:", response.data.data);
          } else {
            console.error("Erreur lors de la récupération des demandes:", response.data.message);
            toast.error("Erreur lors de la récupération des demandes");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des demandes:", error);
          toast.error("Impossible de récupérer les demandes");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchDemandes();
    }
  }, []);

  const handleTraiter = async (id: string) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(
        `${API_BASE_URL}/demande-users/${id}`,
        { isTreat: true },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        // Mettre à jour l'état localement
        setDemandes(demandes.map(demande => 
          demande.id === id ? { ...demande, isTreat: true } : demande
        ));
        toast.success('Demande traitée avec succès!');
      } else {
        toast.error('Erreur lors du traitement de la demande!');
      }
    } catch (error) {
      console.error("Erreur lors du traitement de la demande:", error);
      toast.error('Erreur lors du traitement de la demande!');
    }
  };

  const getStatusIcon = (isTreat: boolean) => {
    return isTreat 
      ? <CheckCircle className="w-5 h-5 text-green-500" /> 
      : <Clock className="w-5 h-5 text-yellow-500" />;
  };

  return demandes.filter((e) => e.isTreat == false ).length == 0  ? null : (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Demandes d'inscription
        </h2>
        <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
          {demandes.filter((d) => !d.isTreat).length} en attente
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : demandes.length > 0 ? (
        <AnimatePresence>
          <div className="space-y-4">
            {demandes
              // Ne montrer que les demandes non traitées
              .filter(demande => !demande.isTreat)
              .map((demande) => (
                <motion.div
                  key={demande.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start p-4 rounded-lg bg-blue-50"
                >
                  <div className="flex-shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800 mb-1">Numéro: <span className="font-semibold">{demande.phone}</span></p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <Clock className="w-5 h-5 text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-500">
                        En attente • 
                        {new Date(demande.CratedAt).toLocaleDateString()} à {new Date(demande.CratedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTraiter(demande.id)}
                    className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Traiter
                  </button>
                </motion.div>
              ))}
          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Aucune demande trouvée.</p>
        </div>
      )}
    </div>
  );
};

export default DemandesList;