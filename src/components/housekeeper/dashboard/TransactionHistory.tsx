import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import CreateTransactionModal from './modals/CreateTransactionModal';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  client: string;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-10',
      amount: 150,
      type: 'payment',
      status: 'completed',
      client: 'Marie Dupont'
    },
    {
      id: '2',
      date: '2024-03-08',
      amount: 75,
      type: 'refund',
      status: 'pending',
      client: 'Jean Martin'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTransaction = (transactionData: any) => {
    const newTransaction = {
      id: (transactions.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(transactionData.amount),
      ...transactionData
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Historique des transactions
            </h2>
          </div>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle
          </button>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                {transaction.type === 'payment' ? (
                  <ArrowUpRight className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowDownLeft className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 font-medium">{transaction.client}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'payment' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'payment' ? '+' : '-'}
                      {transaction.amount}€
                    </p>
                    <span className="text-sm capitalize text-gray-500">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CreateTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTransaction}
      />
    </>
  );
};

export default TransactionHistory;