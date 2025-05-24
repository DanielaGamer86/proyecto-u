import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="dashboard" element={
          <div className="p-4">
            <div className="row g-4">
              {/* Cards estadísticas */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-md-3">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="card bg-dark text-light border-secondary"
                  >
                    <div className="card-body">
                      <h5 className="card-title">Estadística {item}</h5>
                      <h2 className="mb-0">0</h2>
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {/* Contenido principal */}
              <div className="col-12">
                <div className="card bg-dark text-light border-secondary">
                  <div className="card-body">
                    <h4 className="card-title mb-4">Contenido Principal</h4>
                    <p>Bienvenido al panel de administración.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="views" element={<Views />} />
        <Route path="areas" element={<Areas />} />
        <Route path="cards" element={<Cards />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="roles" element={<Roles />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
