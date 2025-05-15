import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, PhoneCall, Waves } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: string;
  amount: number;
  onPaymentSuccess: () => void;
}

type PaymentMethod = 'card' | 'mobile_money' | 'bank_transfer';

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  reservationId, 
  amount,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile_money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'mobile_money' && !phoneNumber) {
      toast.error('Veuillez entrer un numéro de téléphone valide');
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVC)) {
      toast.error('Veuillez remplir tous les champs de la carte');
      return;
    }
    
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');
      
      // Préparer les données de paiement
      const paymentData = {
        reservationId,
        amount,
        paymentMethod,
        // Ajouter le client pour satisfaire le validateur
        client: 'client-' + reservationId,
        // Ajouter le type de paiement
        type: 'payment',
        // Pas de champ status - il sera géré par le backend
        ...(paymentMethod === 'mobile_money' && { phoneNumber }),
        ...(paymentMethod === 'card' && { 
          cardDetails: {
            number: cardNumber,
            expiry: cardExpiry,
            cvc: cardCVC
          }
        })
      };
      
      // Récupérer le token d'authentification s'il existe
      const token = localStorage.getItem('token');
      const headers: any = {};
      
      // Ajouter le token aux headers s'il existe
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Envoyer la demande de paiement
      const response = await axios.post(
        `${API_BASE_URL}/payments/process`,
        paymentData,
        { headers }
      );
      
      if (response.data.success) {
        // Vérifier si un lien de paiement est retourné
        const paymentLink = response.data.data?.paymentLink;
        
        if (paymentLink) {
          // Afficher un message de redirection
          toast.success('Redirection vers la page de paiement...');
          
          // Rediriger vers le lien de paiement après un court délai
          setTimeout(() => {
            window.location.href = paymentLink;
          }, 1000);
        } else {
          // Comportement par défaut si aucun lien n'est retourné
          setPaymentStatus('success');
          toast.success('Paiement effectué avec succès!');
          
          // Attendre 2 secondes avant de fermer le modal
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
            setPaymentStatus('idle');
          }, 2000);
        }
      } else {
        setPaymentStatus('error');
        toast.error(response.data.message || 'Erreur lors du paiement');
      }
    } catch (error: any) {
      console.error('Erreur lors du paiement:', error);
      setPaymentStatus('error');
      toast.error(error.response?.data?.message || 'Erreur lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Paiement de votre réservation
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isProcessing}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {paymentStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Paiement réussi!</h3>
              <p className="text-gray-600">
                Votre réservation a été confirmée. Vous recevrez un email de confirmation.
              </p>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Échec du paiement</h3>
              <p className="text-gray-600 mb-4">
                Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.
              </p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Montant à payer</h3>
                <div className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount)}
                </div>
              </div>

              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Méthode de paiement</h3>
                <div className="grid grid-cols-3 gap-3"> */}
                  {/* <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`py-3 px-4 rounded-lg border ${
                      paymentMethod === 'mobile_money'
                        ? 'border-primary/20 bg-primary/20'
                        : 'border-primary/20'
                    } flex flex-col items-center justify-center`}
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                    <Waves className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Wave</span>
                  </button> */}
                  {/* <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-4 rounded-lg border ${
                      paymentMethod === 'card'
                        ? 'border-primary/20 bg-primary/20'
                        : 'border-primary/20'
                    } flex flex-col items-center justify-center`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Orange Money</span>
                  </button> */}
                  
                {/* </div>
              </div> */}

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 77 123 45 67"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Vous recevrez une notification pour confirmer le paiement.
                  </p>
                </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </span>
                  ) : (
                    'Payer maintenant'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
