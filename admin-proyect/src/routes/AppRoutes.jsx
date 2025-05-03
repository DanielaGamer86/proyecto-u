import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import Home from '../pages/dashboard/Dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}
