import { create } from 'zustand';

export type Review = {
  id: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Service = {
  id: string;
  name: string;
  rate: number;
  isAvailable: boolean;
};

export type Notification = {
  id: string;
  type: 'request' | 'review' | 'message';
  message: string;
  isRead: boolean;
  date: string;
};

type HousekeeperStore = {
  reviews: Review[];
  services: Service[];
  notifications: Notification[];
  addReview: (review: Review) => void;
  updateService: (service: Service) => void;
  toggleServiceAvailability: (serviceId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
};

export const useHousekeeperStore = create<HousekeeperStore>((set) => ({
  reviews: [
    {
      id: '1',
      clientId: 'client1',
      clientName: 'Marie Dupont',
      rating: 5,
      comment: 'Excellent service, très professionnelle !',
      date: '2024-03-10',
    },
    {
      id: '2',
      clientId: 'client2',
      clientName: 'Jean Martin',
      rating: 4,
      comment: 'Très satisfait du service.',
      date: '2024-03-08',
    },
  ],
  services: [
    {
      id: '1',
      name: 'Ménage général',
      rate: 25,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Repassage',
      rate: 20,
      isAvailable: true,
    },
  ],
  notifications: [
    {
      id: '1',
      type: 'request',
      message: 'Nouvelle demande de service de Marie Dupont',
      isRead: false,
      date: '2024-03-10T10:00:00',
    },
    {
      id: '2',
      type: 'review',
      message: 'Jean Martin a laissé un avis',
      isRead: false,
      date: '2024-03-08T15:30:00',
    },
  ],
  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, review],
    })),
  updateService: (updatedService) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      ),
    })),
  toggleServiceAvailability: (serviceId) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === serviceId
          ? { ...service, isAvailable: !service.isAvailable }
          : service
      ),
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      ),
    })),
}));