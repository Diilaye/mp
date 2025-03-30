import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, CheckCircle, XCircle, Plus } from 'lucide-react';
import CreateTicketModal from './modals/CreateTicketModal';

type SupportTicket = {
  id: string;
  user: string;
  subject: string;
  date: string;
  status: 'open' | 'closed';
  priority: 'high' | 'medium' | 'low';
};

const Support = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      user: 'Marie Dupont',
      subject: 'Problème de paiement',
      date: '2024-03-10',
      status: 'open',
      priority: 'high'
    },
    {
      id: '2',
      user: 'Jean Martin',
      subject: 'Question sur le service',
      date: '2024-03-08',
      status: 'closed',
      priority: 'medium'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTicket = (ticketData: any) => {
    const newTicket = {
      id: (tickets.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      ...ticketData
    };
    setTickets([newTicket, ...tickets]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <HelpCircle className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-montserrat font-bold text-gray-800">
              Support client
            </h2>
          </div>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau ticket
          </button>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-montserrat font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-sm text-gray-600">{ticket.user}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {ticket.status === 'open' ? (
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 inline mr-1" />
                    )}
                    {ticket.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : ticket.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </>
  );
};

export default Support;