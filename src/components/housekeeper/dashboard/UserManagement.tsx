import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserPlus, UserMinus, Edit2, Eye, Check, X, Filter, 
  Calendar, MapPin, DollarSign, Phone, Share2, Clock 
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../../config/api.config';
import CreateEditUserModal from './modals/CreateEditUserModal';

// Modal pour voir les détails d'un utilisateur
const ViewUserModal = ({ isOpen, onClose, userData }: {
  isOpen: boolean;
  onClose: () => void;
  userData: EmployeeData | null;
}) => {
  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-montserrat font-bold text-gray-800">
            Détails de {userData.fullName}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            {userData.photo ? (
              <img 
                src={userData.photo} 
                alt={userData.fullName} 
                className="w-48 h-48 object-cover rounded-full border-4 border-primary"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-primary">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
            )}
            <h4 className="text-lg font-semibold mt-4">{userData.fullName}</h4>
            <p className="text-gray-600">{userData.age} ans</p>
            <div className="flex items-center mt-2">
              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-gray-600">{userData.address}</span>
            </div>
            
            <div className="mt-4 flex flex-col space-y-2 w-full">
              <div className="flex items-center py-2 px-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-primary mr-2" />
                <span>{userData.phone}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                  <span>Rémunération</span>
                </div>
                <span className="font-semibold">{userData.salary.toLocaleString()} FCFA</span>
              </div>
              
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Disponibilité</span>
                </div>
                <span className="font-semibold">{userData.availability}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
              Informations professionnelles
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Poste</p>
                <p className="font-medium text-gray-800">{userData.position}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Expérience</p>
                <p className="font-medium text-gray-800">{userData.experience || "Information non disponible"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Langues parlées</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userData.languages?.map((language, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Compétences</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userData.skills?.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Notes additionnelles</p>
                <p className="text-gray-700">{userData.notes || "Aucune note disponible"}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Fermer
              </button>
              <button 
                onClick={() => {
                  // Fonction pour partager le profil
                  navigator.clipboard.writeText(
                    `${userData.fullName}, ${userData.age} ans - ${userData.position} - ${userData.address} - ${userData.salary.toLocaleString()} FCFA - Disponible tous les jours - Contact: ${userData.phone}`
                  );
                  toast.success("Informations copiées dans le presse-papier !");
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager le profil
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Interface pour les employés
export interface EmployeeData {
  id: string;
  fullName: string;
  age: number;
  phone: string;
  address: string;
  position: string;
  salary: number;
  availability: string;
  status: 'available' | 'hired' | 'unavailable';
  photo?: string;
  experience?: string;
  languages?: string[];
  skills?: string[];
  notes?: string;
}

const UserManagement = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEmployers = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          `${API_BASE_URL}/employers`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        
        console.log("Réponse API:", response);
        
        if (response.status === 200 && response.data) {
          // Transformer les données reçues dans le format attendu par le composant
          const transformedData: EmployeeData[] = response.data.data.map((employer: any) => ({
            id: employer.id || employer._id || String(Math.random()),
            fullName: employer.fullName,
            age: employer.age,
            phone: employer.phone,
            address: employer.address,
            position: employer.position,
            salary: employer.salary,
            availability: employer.availability || 'Descend tous les jours',
            status: employer.status || 'available',
            photo: employer.photo,
            experience: employer.experience,
            languages: employer.languages || [],
            skills: employer.skills || [],
            notes: employer.notes
          }));
          
          setEmployees(transformedData);
          toast.success("Employés chargés avec succès");
        } else {
          toast.error("Erreur lors du chargement des employés");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés:", error);
        toast.error("Impossible de charger les employés");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployers();
  }, []);

  

  // Fonction pour créer un employé
  const handleCreateEmployee = async (employeeData: any) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_BASE_URL}/employers`,
        employeeData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      if (response.status === 201 || response.status === 200) {
        // Récupérer l'employé créé depuis la réponse
        const newEmployee = response.data;
        
        // S'assurer que newEmployee a le format correct pour notre interface
        const formattedEmployee: EmployeeData = {
          id: newEmployee.id || newEmployee._id || String(Math.random()),
          fullName: newEmployee.fullName,
          age: newEmployee.age,
          phone: newEmployee.phone,
          address: newEmployee.address,
          position: newEmployee.position,
          salary: newEmployee.salary,
          availability: newEmployee.availability || 'Descend tous les jours',
          status: 'available',
          photo: newEmployee.photo,
          experience: newEmployee.experience,
          languages: newEmployee.languages || [],
          skills: newEmployee.skills || [],
          notes: newEmployee.notes
        };
        
        //setEmployees(prev => [formattedEmployee, ...prev]);
        toast.success('Employé ajouté avec succès !');
        window.location.reload();
      } else {
        toast.error('Échec de l\'ajout de l\'employé');
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'employé:", error);
      toast.error('Erreur lors de la création de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour un employé
  const handleUpdateEmployee = async (employeeData: any) => {
    if (!selectedEmployee) return;
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${API_BASE_URL}/employers/${selectedEmployee.id}`,
        employeeData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      if (response.status === 200) {
        const updatedEmployee = {
          ...selectedEmployee,
          ...employeeData
        };
        
        setEmployees(prev => prev.map(emp => 
          emp.id === selectedEmployee.id ? updatedEmployee : emp
        ));
        
        toast.success('Employé mis à jour avec succès !');
      } else {
        toast.error('Échec de la mise à jour de l\'employé');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé:", error);
      toast.error('Erreur lors de la mise à jour de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer un employé
  const handleDeleteEmployee = async (employeeId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) return;
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.delete(
        `${API_BASE_URL}/employers/${employeeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      
      if (response.status === 200 || response.status === 204) {
        setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
        toast.success('Employé supprimé avec succès !');
      } else {
        toast.error('Échec de la suppression de l\'employé');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé:", error);
      toast.error('Erreur lors de la suppression de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour changer le statut d'un employé
  const handleStatusChange = async (employeeId: string, newStatus: 'available' | 'hired' | 'unavailable') => {
    try {
      const token = localStorage.getItem('token');
      
      // Trouver l'employé actuel
      const currentEmployee = employees.find(emp => emp.id === employeeId);
      if (!currentEmployee) return;
      
      // Préparer les données à mettre à jour
      const updatedData = {
        ...currentEmployee,
        status: newStatus
      };
      
      const response = await axios.put(
        `${API_BASE_URL}/employers/${employeeId}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      if (response.status === 200) {
        // Mettre à jour localement
        setEmployees(employees.map(emp => 
          emp.id === employeeId ? { ...emp, status: newStatus } : emp
        ));
        
        toast.success(`Statut mis à jour avec succès !`);
      } else {
        toast.error('Échec de la mise à jour du statut');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  // Fonction pour visualiser un employé
  const handleViewEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  // Fonction pour éditer un employé
  const handleEditEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  // Filtrer les employés
  const filteredEmployees = filter === 'all' 
    ? employees 
    : employees.filter(emp => emp.status === filter || emp.position === filter);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-montserrat font-bold text-gray-800">
                Personnel de maison
              </h2>
              <p className="text-gray-500 text-sm">Gérez vos employés de maison</p>
            </div>
          </div>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isLoading}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Ajouter un employé
          </button>
        </div>

        {/* Résumé statistique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-sm text-gray-600 mb-1">Employés disponibles</div>
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(emp => emp.status === 'available').length}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Employés embauchés</div>
            <div className="text-2xl font-bold text-blue-600">
              {employees.filter(emp => emp.status === 'hired').length}
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Salaire moyen</div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                employees.reduce((sum, emp) => sum + emp.salary, 0) / 
                (employees.length || 1)
              ).toLocaleString()} FCFA
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
              filter === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('available')}
          >
            Disponibles
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'hired' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('hired')}
          >
            Embauchés
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'Nounou' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('Nounou')}
          >
            Nounous
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'Chauffeur' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('Chauffeur')}
          >
            Chauffeurs
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full mr-2 whitespace-nowrap ${
              filter === 'Aide Ménage' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('Aide Ménage')}
          >
            Aides Ménage
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {employee.photo ? (
                        <img 
                          src={employee.photo} 
                          alt={employee.fullName} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-gray-300" />
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'available' 
                          ? 'bg-green-500 text-white' 
                          : employee.status === 'hired'
                          ? 'bg-blue-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {employee.status === 'available' ? 'Disponible' : 
                         employee.status === 'hired' ? 'Embauché' : 'Indisponible'}
                      </div>
                    </div>
                    <div className="absolute -bottom-4 left-4">
                      <div className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                        Disponibilité du jour !
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-6">
                    <h3 className="text-lg font-semibold">{employee.fullName}</h3>
                    <p className="text-gray-500 text-sm">{employee.age} ans</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">{employee.address}</span>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm font-medium">{employee.salary.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">{employee.availability}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {employee.position}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleViewEmployee(employee)}
                          className="p-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="p-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                          title="Supprimer"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {employee.status === 'available' && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusChange(employee.id, 'hired')}
                          className="w-full py-2 bg-primary text-white text-sm rounded flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Embaucher
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${employee.fullName}, ${employee.age} ans - ${employee.position} - ${employee.address} - ${employee.salary.toLocaleString()} FCFA - ${employee.availability} - Contact: ${employee.phone}`
                            );
                            toast.success("Profil copié dans le presse-papier !");
                          }}
                          className="w-full py-2 bg-gray-100 text-gray-700 text-sm rounded flex items-center justify-center"
                        >
                          <Share2 className="w-3.5 h-3.5 mr-1" />
                          Partager
                        </button>
                      </div>
                    )}
                    
                    {employee.status === 'hired' && (
                      <button
                        onClick={() => handleStatusChange(employee.id, 'available')}
                        className="mt-3 w-full py-2 bg-blue-100 text-blue-700 text-sm rounded flex items-center justify-center"
                      >
                        <Users className="w-3.5 h-3.5 mr-1" />
                        Marquer comme disponible
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucun employé trouvé pour ce filtre.
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateEditUserModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateEmployee}
            modalTitle="Ajouter un employé"
          />
        )}
        
        {isEditModalOpen && selectedEmployee && (
          <CreateEditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateEmployee}
            initialData={selectedEmployee}
            modalTitle={`Modifier les informations de ${selectedEmployee.fullName}`}
          />
        )}
        
        {isViewModalOpen && selectedEmployee && (
          <ViewUserModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            userData={selectedEmployee}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UserManagement;