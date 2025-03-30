import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageSquare, Star, UserPlus } from 'lucide-react';
import { useHousekeeperStore } from '../../../store/housekeeperStore';

const Notifications = () => {
  const { notifications, markNotificationAsRead } = useHousekeeperStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Notifications
        </h2>
        <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
          {notifications.filter((n) => !n.isRead).length} nouvelles
        </span>
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start p-4 rounded-lg ${
                notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 mb-1">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
              {!notification.isRead && (
                <button
                  onClick={() => markNotificationAsRead(notification.id)}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Marquer comme lu
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Notifications;