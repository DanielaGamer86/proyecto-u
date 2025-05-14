import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import BlancoIcon from '../../assets/blancoicon.svg';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { icon: <FaHome size={20} />, text: 'Inicio', active: true },
        { icon: <FaUser size={20} />, text: 'Perfil' },
        { icon: <FaCog size={20} />, text: 'Configuración' },
    ];

    return (
        <div className="min-vh-100 d-flex">
            {/* Sidebar */}
            <motion.div 
                className="bg-dark border-end border-secondary"
                initial={{ width: sidebarOpen ? 250 : 0 }}
                animate={{ width: sidebarOpen ? 250 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflowX: 'hidden' }}
            >
                <div className="p-3 border-bottom border-secondary">
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <img src={BlancoIcon} alt="Logo" width="40" height="40" />
                    </div>
                </div>
                <div className="py-3">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ backgroundColor: '#2c3034' }}
                            className={`d-flex align-items-center px-4 py-3 text-light ${item.active ? 'bg-primary' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.icon}
                            <span className="ms-3">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-grow-1 bg-dark">
                {/* Header */}
                <nav className="navbar navbar-dark bg-dark border-bottom border-secondary px-4">
                    <div className="d-flex align-items-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="btn btn-outline-light me-3"
                        >
                            {sidebarOpen ? <FaTimes /> : <FaBars />}
                        </motion.button>
                        <span className="navbar-brand">Dashboard</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="text-light me-4">
                            <div className="fw-bold">{user.nombre}</div>
                            <div className="small text-muted">{user.email}</div>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt className="me-2" />
                            Cerrar sesión
                        </motion.button>
                    </div>
                </nav>

                {/* Content */}
                <div className="p-4">
                    <div className="row g-4">
                        {/* Stats Cards */}
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

                        {/* Main Content Area */}
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
            </div>
        </div>
    );
}

export default Dashboard;
