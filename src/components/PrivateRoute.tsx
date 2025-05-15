import { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isTokenValid, logoutUser } from '../utils/auth';

// Cette fonction va vérifier si l'utilisateur est connecté et si son token est valide
const PrivateRoute = ({ element: Element, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem('user'); // Vérifie si l'utilisateur est connecté
  const tokenValid = isTokenValid(); // Vérifie si le token est valide et non expiré
  
  useEffect(() => {
    // Si l'utilisateur est connecté mais que son token n'est plus valide, le déconnecter
    if (isAuthenticated && !tokenValid) {
      logoutUser('Votre session a expiré. Veuillez vous reconnecter.');
    }
  }, [isAuthenticated, tokenValid]);
  
  if (!isAuthenticated || !tokenValid) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Route {...rest} element={Element} />;
};

export default PrivateRoute;
