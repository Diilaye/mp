import React ,  { useState, useEffect }  from 'react';
import Reviews from './Reviews';
import ServiceManagement from './ServiceManagement';
import Notifications from './Notifications';
import UserManagement from './UserManagement';
import TransactionHistory from './TransactionHistory';
import axios from 'axios';
import DemandesList from '../../demande-list';
import DashboardOverview from './DashboardStats';
import ReviewsClient from './ReviewsClient';
import Reservations from './Reservations';

const Dashboard =  () => {
 
  const [isAuth, setIsAuth] = useState(true);
  const [demandes, setDemandes] = useState([]);
   
  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');
    

  //   if (user==null) {
  //     window.location.href = '/';
      
  //   } else {
  //     setIsAuth(true);
  //   }

  //   // Ajout de la requête pour récupérer la liste des demandes
  //   const fetchDemandes = async () => {
  //     try {
  //       // Utilisation du token récupéré de localStorage
  //       const response = await axios.get(
  //         'http://127.0.0.1:3031/api/v1/demande-users',
  //         {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           },
  //           withCredentials: true
  //         }
  //       );
        
  //       if (response.status === 200) {
  //         // Supposons que vous avez un state pour stocker la liste des demandes
  //         setDemandes(response.data);
  //         console.log("Liste des demandes récupérée:", response.data);
  //       } else {
  //         console.error("Erreur lors de la récupération des demandes");
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des demandes:", error);
  //     }
  //   };
    
  //   // Appel de la fonction pour récupérer les demandes
  //   fetchDemandes();
  // }
  // , []);

  return   (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-4">
       
        <DashboardOverview />

        <div className="mt-8">
          <Reservations />
        </div>

        <DemandesList />
        
        <UserManagement />
      
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-4">
          <div className="space-y-8">
            <ServiceManagement />
            {/* <Notifications /> */}
            
          </div>
          
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <div className="space-y-8">
          <ReviewsClient />
          </div>
          <div className="space-y-8">
          <Reviews />
          </div>
          
        </div>
       
        <TransactionHistory />

       

      </div>
    </div>
  ) ;
};

export default Dashboard;