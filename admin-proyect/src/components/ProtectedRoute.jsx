import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setSupabaseToken } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  useEffect(() => {
    // Establecer el token de Supabase si existe
    if (token) {
      setSupabaseToken(token);
    }
  }, [token]);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
