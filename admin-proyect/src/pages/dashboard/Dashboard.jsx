import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-vh-100 bg-dark">
            <nav className="navbar navbar-dark bg-dark border-bottom border-secondary px-4">
                <span className="navbar-brand">Dashboard</span>
                <div className="d-flex align-items-center">
                    <span className="text-light me-3">{user.nombre}</span>
                    <button 
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>
            <div className="text-white p-4">
                <h1>Bienvenido, {user.nombre}</h1>
                {/* Aquí irá el contenido del dashboard */}
            </div>
        </div>
    );
}

export default Dashboard;
