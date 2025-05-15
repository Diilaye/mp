// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Phone, Mail, MapPin, Calendar, Clock, ChevronLeft, 
//   User, Star, DollarSign, Languages, Award, Book,
//   CheckCircle, XCircle, AlertCircle, Calendar as CalendarIcon,
//   Clock as ClockIcon
// } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const EmployerDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   // États
//   const [employer, setEmployer] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // États pour la réservation
//   const [showReservation, setShowReservation] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [duration, setDuration] = useState('1');
//   const [message, setMessage] = useState('');
//   const [isReserving, setIsReserving] = useState(false);
  
//   // Récupérer les détails de l'employé
//   useEffect(() => {
//     const fetchEmployerDetails = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `http://127.0.0.1:3031/api/v1/employers/${id}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             },
//             withCredentials: true
//           }
//         );
        
//         if (response.status === 200) {
//           const employerData = response.data.data || response.data;
//           setEmployer(employerData);
//           console.log('Données de l\'employé:', employerData);
//         } else {
//           throw new Error('Erreur lors de la récupération des détails de l\'employé');
//         }
//       } catch (err) {
//         console.error('Erreur:', err);
//         setError('Impossible de charger les détails de l\'employé. Veuillez réessayer.');
//         toast.error('Erreur lors du chargement des détails');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchEmployerDetails();
//   }, [id]);
  
//   // Gérer la soumission de la réservation
//   const handleReservation = async (e) => {
//     e.preventDefault();
    
//     if (!startDate) {
//       toast.error('Veuillez sélectionner une date de début');
//       return;
//     }
    
//     setIsReserving(true);
    
//     try {
//       const token = localStorage.getItem('token');
      
//       // Créer l'objet de réservation
//       const reservationData = {
//         employerId: id,
//         startDate: startDate.toISOString(),
//         duration: parseInt(duration, 10),
//         message: message
//       };
      
//       // Effectuer la requête API pour réserver
//       const response = await axios.post(
//         'http://127.0.0.1:3031/api/v1/reservations',
//         reservationData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           withCredentials: true
//         }
//       );
      
//       if (response.status === 201 || response.status === 200) {
//         toast.success('Réservation effectuée avec succès !');
        
//         // Mettre à jour le statut de l'employé si nécessaire
//         try {
//           await axios.patch(
//             `http://127.0.0.1:3031/api/v1/employers/${id}/status`,
//             { status: 'hired' },
//             {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               },
//               withCredentials: true
//             }
//           );
          
//           // Mettre à jour les données locales
//           setEmployer(prev => ({
//             ...prev,
//             status: 'hired'
//           }));
//         } catch (statusError) {
//           console.error('Erreur lors de la mise à jour du statut:', statusError);
//         }
        
//         // Masquer le formulaire de réservation
//         setShowReservation(false);
//       } else {
//         throw new Error('Erreur lors de la réservation');
//       }
//     } catch (err) {
//       console.error('Erreur lors de la réservation:', err);
//       toast.error('Erreur lors de la réservation. Veuillez réessayer.');
//     } finally {
//       setIsReserving(false);
//     }
//   };
  
//   // Vérifier si l'employé est disponible pour la réservation
//   const isAvailable = employer?.status === 'available';
  
//   // Composant de chargement
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
//       </div>
//     );
//   }
  
//   // Composant d'erreur
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold mb-4">Erreur</h2>
//         <p className="text-gray-600 mb-8">{error}</p>
//         <button 
//           onClick={() => navigate(-1)} 
//           className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
//         >
//           Retour
//         </button>
//       </div>
//     );
//   }
  
//   // Si aucun employé n'est trouvé
//   if (!employer) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold mb-4">Employé non trouvé</h2>
//         <p className="text-gray-600 mb-8">Les détails de cet employé ne sont pas disponibles.</p>
//         <button 
//           onClick={() => navigate(-1)} 
//           className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
//         >
//           Retour
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         {/* Bouton retour */}
//         <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center text-gray-600 hover:text-primary mb-8"
//         >
//           <ChevronLeft className="w-5 h-5 mr-1" />
//           Retour à la liste
//         </button>
        
//         {/* Section principale */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* En-tête avec photo et informations essentielles */}
//           <div className="relative">
//             <div className="h-64 bg-gray-200">
//               {employer.photo ? (
//                 <img 
//                   src={employer.photo} 
//                   alt={employer.fullName} 
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     const target = e.target;
//                     target.onerror = null;
//                     target.src = 'https://via.placeholder.com/800x300?text=Photo+non+disponible';
//                   }}
//                 />
//               ) : (
//                 <div className="h-full flex items-center justify-center bg-gray-100">
//                   <User className="w-24 h-24 text-gray-300" />
//                 </div>
//               )}
//             </div>
            
//             {/* Status badge */}
//             <div className="absolute top-4 right-4">
//               <div className={`px-4 py-2 rounded-full text-sm font-medium ${
//                 employer.status === 'available' 
//                   ? 'bg-green-500 text-white' 
//                   : employer.status === 'hired'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-red-500 text-white'
//               }`}>
//                 {employer.status === 'available' ? 'Disponible' : 
//                  employer.status === 'hired' ? 'Embauché' : 'Indisponible'}
//               </div>
//             </div>
            
//             {/* Photo de profil */}
//             <div className="absolute -bottom-16 left-8">
//               <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
//                 {employer.photo ? (
//                   <img 
//                     src={employer.photo} 
//                     alt={employer.fullName} 
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       const target = e.target;
//                       target.onerror = null;
//                       target.src = 'https://via.placeholder.com/300x300?text=Photo+non+disponible';
//                     }}
//                   />
//                 ) : (
//                   <div className="h-full w-full flex items-center justify-center bg-gray-100">
//                     <User className="w-16 h-16 text-gray-300" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Contenu principal */}
//           <div className="pt-20 pb-8 px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Colonne de gauche - Informations personnelles */}
//               <div className="lg:col-span-2">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">{employer.fullName}</h1>
//                 <div className="flex items-center text-gray-600 mb-6">
//                   <span className="mr-4">{employer.age} ans</span>
//                   <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
//                     {employer.position}
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   {/* Coordonnées */}
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-800">Coordonnées</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-start">
//                         <Phone className="w-5 h-5 text-primary mr-3 mt-0.5" />
//                         <div>
//                           <p className="text-sm text-gray-500">Téléphone</p>
//                           <p className="font-medium">{employer.phone}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
//                         <div>
//                           <p className="text-sm text-gray-500">Adresse</p>
//                           <p className="font-medium">{employer.address}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Disponibilité et salaire */}
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="text-lg font-semibold mb-4 text-gray-800">Disponibilité & Rémunération</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-start">
//                         <Clock className="w-5 h-5 text-primary mr-3 mt-0.5" />
//                         <div>
//                           <p className="text-sm text-gray-500">Disponibilité</p>
//                           <p className="font-medium">{employer.availability}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <DollarSign className="w-5 h-5 text-primary mr-3 mt-0.5" />
//                         <div>
//                           <p className="text-sm text-gray-500">Salaire mensuel</p>
//                           <p className="font-medium">{employer.salary?.toLocaleString() || 0} FCFA</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Expérience et compétences */}
//                 <div className="mb-8">
//                   <h3 className="text-xl font-semibold mb-4 text-gray-800">Expérience & Compétences</h3>
                  
//                   {employer.experience && (
//                     <div className="mb-6">
//                       <h4 className="font-medium text-gray-700 mb-2 flex items-center">
//                         <Award className="w-5 h-5 text-primary mr-2" />
//                         Expérience
//                       </h4>
//                       <p className="text-gray-600">{employer.experience}</p>
//                     </div>
//                   )}
                  
//                   {employer.languages && employer.languages.length > 0 && (
//                     <div className="mb-6">
//                       <h4 className="font-medium text-gray-700 mb-2 flex items-center">
//                         <Languages className="w-5 h-5 text-primary mr-2" />
//                         Langues parlées
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {employer.languages.map((language, index) => (
//                           <span 
//                             key={index} 
//                             className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
//                           >
//                             {language}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {employer.skills && employer.skills.length > 0 && (
//                     <div>
//                       <h4 className="font-medium text-gray-700 mb-2 flex items-center">
//                         <Star className="w-5 h-5 text-primary mr-2" />
//                         Compétences
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {employer.skills.map((skill, index) => (
//                           <span 
//                             key={index} 
//                             className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Notes additionnelles */}
//                 {employer.notes && (
//                   <div className="mb-8">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Notes additionnelles</h3>
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <div className="flex items-start">
//                         <Book className="w-5 h-5 text-primary mr-3 mt-0.5" />
//                         <p className="text-gray-600">{employer.notes}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Colonne de droite - Réservation */}
//               <div>
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden sticky top-8">
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold mb-6 text-center">
//                       {isAvailable ? 'Réserver cet employé' : 'Statut de l\'employé'}
//                     </h3>
                    
//                     {isAvailable ? (
//                       <>
//                         {!showReservation ? (
//                           <div className="text-center">
//                             <p className="text-gray-600 mb-6">
//                               Cet employé est actuellement disponible. Vous pouvez le réserver dès maintenant.
//                             </p>
//                             <button 
//                               onClick={() => setShowReservation(true)}
//                               className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
//                             >
//                               Réserver maintenant
//                             </button>
//                           </div>
//                         ) : (
//                           <form onSubmit={handleReservation}>
//                             <div className="mb-4">
//                               <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Date de début
//                               </label>
//                               <div className="relative">
//                                 <DatePicker
//                                   selected={startDate}
//                                   onChange={(date) => setStartDate(date)}
//                                   minDate={new Date()}
//                                   dateFormat="dd/MM/yyyy"
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                                 />
//                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                                   <CalendarIcon className="w-5 h-5 text-gray-400" />
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="mb-4">
//                               <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Durée (mois)
//                               </label>
//                               <select
//                                 value={duration}
//                                 onChange={(e) => setDuration(e.target.value)}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                               >
//                                 <option value="1">1 mois</option>
//                                 <option value="3">3 mois</option>
//                                 <option value="6">6 mois</option>
//                                 <option value="12">12 mois</option>
//                               </select>
//                             </div>
                            
//                             <div className="mb-6">
//                               <label className="block text-gray-700 text-sm font-medium mb-2">
//                                 Message (optionnel)
//                               </label>
//                               <textarea
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                                 rows="4"
//                                 placeholder="Précisez vos besoins ou toute information importante..."
//                               ></textarea>
//                             </div>
                            
//                             <div className="flex justify-between">
//                               <button 
//                                 type="button"
//                                 onClick={() => setShowReservation(false)}
//                                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                               >
//                                 Annuler
//                               </button>
//                               <button 
//                                 type="submit"
//                                 className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
//                                 disabled={isReserving}
//                               >
//                                 {isReserving ? (
//                                   <>
//                                     <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
//                                     Traitement...
//                                   </>
//                                 ) : (
//                                   'Confirmer la réservation'
//                                 )}
//                               </button>
//                             </div>
//                           </form>
//                         )}
//                       </>
//                     ) : (
//                       <div className="text-center">
//                         <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
//                           employer.status === 'hired' ? 'bg-blue-100' : 'bg-red-100'
//                         }`}>
//                           {employer.status === 'hired' ? (
//                             <CheckCircle className="w-8 h-8 text-blue-500" />
//                           ) : (
//                             <XCircle className="w-8 h-8 text-red-500" />
//                           )}
//                         </div>
//                         <p className="text-gray-600 mb-6">
//                           {employer.status === 'hired' 
//                             ? 'Cet employé est actuellement embauché et n\'est pas disponible pour le moment.'
//                             : 'Cet employé n\'est pas disponible actuellement.'}
//                         </p>
//                         <button 
//                           onClick={() => navigate(-1)}
//                           className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                         >
//                           Retour à la liste
//                         </button>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Prix estimé */}
//                   <div className="p-6 bg-gray-50 border-t border-gray-200">
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-600">Salaire mensuel</span>
//                       <span className="font-medium">{employer.salary?.toLocaleString() || 0} FCFA</span>
//                     </div>
//                     {showReservation && (
//                       <>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-gray-600">Durée</span>
//                           <span className="font-medium">{duration} mois</span>
//                         </div>
//                         <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
//                           <span className="font-semibold">Total estimé</span>
//                           <span className="font-semibold text-primary">
//                             {((employer.salary || 0) * parseInt(duration, 10)).toLocaleString()} FCFA
//                           </span>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerDetails;