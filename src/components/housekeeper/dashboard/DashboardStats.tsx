import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Star, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BarChart2,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../../config/api.config';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RPieChart, Pie, Cell } from 'recharts';

interface DashboardStats {
  totalUsers: number;
  activeHousekeepers: number;
  pendingRequests: number;
  completedServices: number;
  totalRevenue: number;
  averageRating: number;
  revenueGrowth: number;
  newUsersGrowth: number;
  topServices: Array<{name: string, value: number}>;
  monthlyRevenue: Array<{month: string, revenue: number}>;
  serviceDistribution: Array<{name: string, value: number}>;
  userActivity: Array<{day: string, active: number}>;
}

// Données fictives pré-remplies
const mockMonthlyRevenue = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Fév', revenue: 42000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Avr', revenue: 45000 },
  { month: 'Mai', revenue: 50000 },
  { month: 'Juin', revenue: 58000 },
  { month: 'Juil', revenue: 62000 },
  { month: 'Août', revenue: 55000 },
  { month: 'Sep', revenue: 63000 },
  { month: 'Oct', revenue: 67000 },
  { month: 'Nov', revenue: 72000 },
  { month: 'Déc', revenue: 78000 }
];

const mockServiceDistribution = [
  { name: 'Ménage', value: 120 },
  { name: 'Garde d\'enfant', value: 75 },
  { name: 'Cuisine', value: 45 },
  { name: 'Repassage', value: 80 },
  { name: 'Jardinage', value: 30 }
];

const mockUserActivity = [
  { day: 'Lun', active: 45 },
  { day: 'Mar', active: 52 },
  { day: 'Mer', active: 49 },
  { day: 'Jeu', active: 60 },
  { day: 'Ven', active: 65 },
  { day: 'Sam', active: 40 },
  { day: 'Dim', active: 30 }
];

const defaultStats: DashboardStats = {
  totalUsers: 2547,
  activeHousekeepers: 187,
  pendingRequests: 43,
  completedServices: 1856,
  totalRevenue: 384250,
  averageRating: 4.7,
  revenueGrowth: 12.8,
  newUsersGrowth: 8.4,
  topServices: [
    { name: 'Ménage', value: 120 },
    { name: 'Repassage', value: 80 },
    { name: 'Garde d\'enfant', value: 75 }
  ],
  monthlyRevenue: mockMonthlyRevenue,
  serviceDistribution: mockServiceDistribution,
  userActivity: mockUserActivity
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchDashboardData(timeframe);
  }, [timeframe]);

  const fetchDashboardData = async (period: 'week' | 'month' | 'year') => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/stats?period=${period}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setStats(response.data.data);
      } else {
        toast.error('Erreur lors de la récupération des statistiques');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      toast.error('Impossible de récupérer les statistiques du tableau de bord');
      
      // En cas d'erreur ou pour les tests, on peut utiliser des données fictives
      generateMockData(period);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de génération de données fictives pour démonstration ou développement
  const generateMockData = (period: 'week' | 'month' | 'year') => {
    // Génération des données pour le revenu mensuel
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const monthlyData = monthNames.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 10000
    }));

    // Génération des données pour la distribution des services
    const serviceTypes = ['Ménage', 'Garde d\'enfant', 'Cuisine', 'Repassage', 'Jardinage'];
    const serviceData = serviceTypes.map(name => ({
      name,
      value: Math.floor(Math.random() * 100) + 20
    }));

    // Génération des données pour l'activité utilisateur
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const activityData = days.map(day => ({
      day,
      active: Math.floor(Math.random() * 100) + 10
    }));

    // Définition des statistiques fictives
    const mockStats: DashboardStats = {
      totalUsers: 2547,
      activeHousekeepers: 187,
      pendingRequests: 43,
      completedServices: 1856,
      totalRevenue: 384250,
      averageRating: 4.7,
      revenueGrowth: 12.8,
      newUsersGrowth: 8.4,
      topServices: serviceData.slice(0, 3),
      monthlyRevenue: period === 'year' ? monthlyData : monthlyData.slice(0, period === 'month' ? 4 : 2),
      serviceDistribution: serviceData,
      userActivity: activityData
    };

    setStats(mockStats);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(value);
  };

  const StatCard = ({ icon: Icon, title, value, growth, color }: { 
    icon: React.ElementType;
    title: string;
    value: string | number;
    growth?: number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-5 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-[10px] font-medium text-gray-500">{title}</span>
        </div>
        {growth !== undefined && (
          <div className={`flex items-center ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="text-sm font-medium ml-1">{Math.abs(growth)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </motion.div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-montserrat font-bold text-gray-800 mb-4 md:mb-0">
          Tableau de bord
        </h1>
        <div className="flex space-x-2 bg-white shadow-sm rounded-lg overflow-hidden">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'week' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'month' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Mois
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'year' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Année
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Utilisateurs totaux"
              value={stats.totalUsers}
              growth={stats.newUsersGrowth}
              color="bg-blue-500"
            />
            <StatCard
              icon={CheckCircle}
              title="Services complétés"
              value={stats.completedServices}
              color="bg-green-500"
            />
            <StatCard
              icon={DollarSign}
              title="Revenu total"
              value={formatCurrency(stats.totalRevenue)}
              growth={stats.revenueGrowth}
              color="bg-purple-500"
            />
            <StatCard
              icon={Star}
              title="Note moyenne"
              value={stats.averageRating.toFixed(1)}
              color="bg-yellow-500"
            />
          </div>

          {/* Graphique de revenu */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-montserrat font-semibold text-gray-800 mb-6">
                Revenu {timeframe === 'week' ? 'hebdomadaire' : timeframe === 'month' ? 'mensuel' : 'annuel'}
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.monthlyRevenue}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenu" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution des services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-montserrat font-semibold text-gray-800 mb-6">
                Distribution des services
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RPieChart>
                    <Pie
                      data={stats.serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} services`} />
                  </RPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activité utilisateur et demandes en attente */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-montserrat font-semibold text-gray-800 mb-6">
                Activité des utilisateurs
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.userActivity}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name="Utilisateurs actifs" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Indicateurs supplémentaires */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-montserrat font-semibold text-gray-800 mb-6">
                Statuts actuels
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Femmes de ménage actives</span>
                    <span className="text-sm font-semibold text-gray-800">{stats.activeHousekeepers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (stats.activeHousekeepers / stats.totalUsers) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Demandes en attente</span>
                    <span className="text-sm font-semibold text-gray-800">{stats.pendingRequests}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (stats.pendingRequests / (stats.pendingRequests + stats.completedServices)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Services les plus demandés</h3>
                  <div className="space-y-4">
                    {stats.topServices.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm text-gray-700 flex-grow">{service.name}</span>
                        <span className="text-sm font-medium text-gray-900">{service.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;