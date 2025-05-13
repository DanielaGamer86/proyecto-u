import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
