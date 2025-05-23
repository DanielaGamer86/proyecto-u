import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Views from '../pages/views/Views';
import Areas from '../pages/areas/Areas';
import Cards from '../pages/cards/Cards';
import Analysis from '../pages/analysis/Analysis';
import Roles from '../pages/roles/Roles';
import ProtectedRoute from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/views" element={<Views />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
