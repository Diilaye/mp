import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Plus, Share2, Filter, Check, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../utils/axios';

// Composant modal pour créer une transaction
const CreateTransactionModal = ({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'payment',
    client: '',
    phone: '',
    email: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.client) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-4">
          Nouvelle transaction
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de transaction
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="payment">Paiement</option>
                <option value="refund">Remboursement</option>
                <option value="payment_link">Lien de paiement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant (FCFA) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Ex: 25000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Nom du client"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: +225 07 XX XX XX XX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemple.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description de la transaction"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {formData.type === 'payment_link' ? 'Générer le lien' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Composant modal pour le lien de paiement
const PaymentLinkModal = ({ isOpen, onClose, linkData }: {
  isOpen: boolean;
  onClose: () => void;
  linkData: {
    link: string;
    amount: string;
    client: string;
    expiresAt: string;
  } | null;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (linkData?.link) {
      navigator.clipboard.writeText(linkData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Lien copié avec succès !');
    }
  };

  const shareLink = () => {
    if (navigator.share && linkData?.link) {
      navigator.share({
        title: `Lien de paiement - ${linkData.client}`,
        text: `Voici votre lien de paiement de ${linkData.amount} FCFA`,
        url: linkData.link
      })
      .then(() => toast.success('Lien partagé avec succès !'))
      .catch(error => console.error('Erreur lors du partage:', error));
    } else {
      copyToClipboard();
    }
  };

  if (!isOpen || !linkData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-4">
          Lien de paiement généré
        </h3>
        
        <div className="my-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Client:</span>
            <span className="font-medium">{linkData.client}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Montant:</span>
            <span className="font-semibold text-green-600">{linkData.amount} FCFA</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Expire le:</span>
            <span className="text-sm text-gray-700">{new Date(linkData.expiresAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={linkData.link}
            className="w-full p-3 pr-28 bg-gray-50 border border-gray-300 rounded-md text-sm font-mono break-all"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-1 top-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded flex items-center text-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copié' : 'Copier'}
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={shareLink}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center justify-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager le lien
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund' | 'payment_link';
  status: 'completed' | 'pending' | 'failed' | 'expired';
  client: string;
  paymentLink?: string;
  phone?: string;
  email?: string;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentLinkModalOpen, setIsPaymentLinkModalOpen] = useState(false);
  const [currentPaymentLink, setCurrentPaymentLink] = useState<{
    link: string;
    amount: string;
    client: string;
    expiresAt: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Chargement initial des transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get('/payments');

      if (response.data.success) {
        setTransactions(response.data.data);
      } else {
        toast.error('Erreur lors de la récupération des transactions');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      toast.error('Impossible de récupérer les transactions');
      // Fallback to empty array if API fails
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTransaction = async (transactionData: any) => {
    setIsLoading(true);
    console.log(".transactionData",transactionData);
    try {
      const response = await axiosInstance.post('/payments', { ...transactionData });
      
      if (response.data.success) {
        const newTransaction = response.data.data;
        
        if (transactionData.type === 'payment_link' && newTransaction.paymentLink) {
          // Afficher le modal avec le lien de paiement
          setCurrentPaymentLink({
            link: newTransaction.paymentLink,
            amount: `${newTransaction.amount}`,
            client: newTransaction.client,
            expiresAt: newTransaction.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });
          
          setIsPaymentLinkModalOpen(true);
        } else {
          toast.success(`Transaction ${transactionData.type === 'payment' ? 'de paiement' : 'de remboursement'} créée avec succès`);
        }
        
        // Refresh transactions list
        fetchTransactions();
      } else {
        toast.error('Erreur lors de la création de la transaction');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la transaction:', error);
      toast.error('Impossible de créer la transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareLink = async (transaction: Transaction) => {
    if (!transaction.paymentLink) return;
    
    try {
      // Optionally fetch the latest payment link info from the server
      const response = await axiosInstance.get(`/payments/${transaction.id}/payment-link`);
      
      if (response.data.success && response.data.data) {
        const linkData = response.data.data;
        setCurrentPaymentLink({
          link: linkData.link || transaction.paymentLink,
          amount: `${transaction.amount}`,
          client: transaction.client,
          expiresAt: linkData.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      } else {
        // Fallback to transaction data if API fails
        setCurrentPaymentLink({
          link: transaction.paymentLink,
          amount: `${transaction.amount}`,
          client: transaction.client,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    } catch (error) {
      // Fallback to transaction data if API fails
      setCurrentPaymentLink({
        link: transaction.paymentLink,
        amount: `${transaction.amount}`,
        client: transaction.client,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    setIsPaymentLinkModalOpen(true);
  };

  const filteredTransactions = filter === 'all' 
    ? transactions
    : transactions.filter(t => t.type === filter || t.status === filter);

  // Calculer le total des transactions
  const totalAmount = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, curr) => {
      if (curr.type === 'payment') {
        return acc + curr.amount;
      } else if (curr.type === 'refund') {
        return acc - curr.amount;
      }
      return acc;
    }, 0);

  // Calculer le nombre de transactions par statut
  const statsCounts = {
    completed: transactions.filter(t => t.status === 'completed').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    failed: transactions.filter(t => t.status === 'failed' || t.status === 'expired').length
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
              {/* <DollarSign className="w-8 h-8 text-primary" /> */}
            </div>
            <div>
              <h2 className="text-2xl font-montserrat font-bold text-gray-800">
                Transactions
              </h2>
              <p className="text-gray-500 text-sm">Gérez vos paiements en FCFA</p>
            </div>
          </div>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
            Nouvelle transaction
          </button>
        </div>

        {/* Résumé des transactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-sm text-gray-600 mb-1">Total encaissé</div>
            <div className="text-2xl font-bold text-green-600">{totalAmount.toLocaleString()} FCFA</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Transactions</div>
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm block">Complétées</span>
                <span className="text-xl font-semibold text-blue-600">{statsCounts.completed}</span>
              </div>
              <div>
                <span className="text-sm block">En attente</span>
                <span className="text-xl font-semibold text-yellow-600">{statsCounts.pending}</span>
              </div>
              <div>
                <span className="text-sm block">Échouées</span>
                <span className="text-xl font-semibold text-red-600">{statsCounts.failed}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Moyens de paiement</div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-medium">Orange Money</div>
              <div className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-medium">Wave</div>
              <div className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-medium">Paiement Bancaire</div>

            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex items-center mb-4 overflow-x-auto pb-2">
          <div className="flex items-center mr-2">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">Filtrer:</span>
          </div>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'payment' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('payment')}
          >
            Paiements
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'payment_link' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('payment_link')}
          >
            Liens de paiement
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'refund' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('refund')}
          >
            Remboursements
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('pending')}
          >
            En attente
          </button>
        </div>

        {/* Liste des transactions */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start p-4 rounded-lg ${
                  transaction.status === 'completed'
                    ? 'bg-green-50'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-50'
                    : 'bg-red-50'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {transaction.type === 'payment' || transaction.type === 'payment_link' ? (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-green-500" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <ArrowDownLeft className="w-6 h-6 text-red-500" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800 font-medium">{transaction.client}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">{new Date(transaction.date).toLocaleDateString()}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status === 'completed' ? 'Complété' : 
                          transaction.status === 'pending' ? 'En attente' : 
                          transaction.status === 'expired' ? 'Expiré' : 'Échoué'}
                        </span>
                      </div>
                      {transaction.phone && (
                        <p className="text-xs text-gray-500 mt-1">
                          Tél: {transaction.phone}
                        </p>
                      )}
                      {transaction.email && (
                        <p className="text-xs text-gray-500 mt-1">
                          Email: {transaction.email}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'refund' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'refund' ? '-' : '+'}
                        {transaction.amount.toLocaleString()} FCFA
                      </p>
                      <span className="text-sm capitalize text-gray-500">
                        {transaction.type === 'payment' ? 'Paiement' : 
                        transaction.type === 'payment_link' ? 'Lien de paiement' : 'Remboursement'}
                      </span>
                      
                      {transaction.type === 'payment_link' && (
                        <button 
                          onClick={() => handleShareLink(transaction)}
                          className="mt-2 flex items-center text-xs text-primary hover:text-primary-dark ml-auto"
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Partager
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucune transaction trouvée pour ce filtre.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <CreateTransactionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateTransaction}
          />
        )}
        
        {isPaymentLinkModalOpen && currentPaymentLink && (
          <PaymentLinkModal
            isOpen={isPaymentLinkModalOpen}
            onClose={() => setIsPaymentLinkModalOpen(false)}
            linkData={currentPaymentLink}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TransactionHistory;