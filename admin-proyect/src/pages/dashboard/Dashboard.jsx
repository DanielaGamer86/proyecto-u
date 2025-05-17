import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse,
    faBinoculars,
    faCubes,
    faBarsProgress,
    faChartSimple,
    faRing,
    faDragon,
    faGear,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import BlancoIcon from '../../assets/blancoicon.svg';
import { Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [sidebarsVisible, setSidebarsVisible] = useState(false);

    // Es una buena práctica usar useEffect para manejar eventos de teclado
    // y limpiar el efecto al desmontar el componente.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                setSidebarsVisible(current => !current);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const mainMenuItems = [
        { icon: <FontAwesomeIcon icon={faHouse} size="lg" />, text: 'Inicio', active: true },
        { icon: <FontAwesomeIcon icon={faBinoculars} size="lg" />, text: 'Explorar' },
        { icon: <FontAwesomeIcon icon={faCubes} size="lg" />, text: 'Productos' },
        { icon: <FontAwesomeIcon icon={faBarsProgress} size="lg" />, text: 'Progreso' },
        { icon: <FontAwesomeIcon icon={faChartSimple} size="lg" />, text: 'Estadísticas' },
        { icon: <FontAwesomeIcon icon={faRing} size="lg" />, text: 'Eventos' },
    ];

    const bottomMenuItems = [
        { type: 'divider' },
        { icon: <FontAwesomeIcon icon={faDragon} size="lg" />, text: 'Perfil' },
        { icon: <FontAwesomeIcon icon={faGear} size="lg" />, text: 'Configuración' },
    ];

    const renderTooltip = (text) => (
        <Tooltip>{text}</Tooltip>
    );

    const renderMenuItem = (item, index) => {
        if (item.type === 'divider') {
            return (
                <div 
                    key={`divider-${index}`} 
                    className="border-top border-secondary my-2 mx-3"
                />
            );
        }

        return (
            <OverlayTrigger
                key={index}
                placement="right"
                overlay={renderTooltip(item.text)}
            >
                <motion.div
                    whileHover={{ backgroundColor: '#2c3034' }}
                    className={`d-flex align-items-center justify-content-center p-3 text-light ${item.active ? 'bg-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                >
                    {item.icon}
                </motion.div>
            </OverlayTrigger>
        );
    };

    return (
        <div className="min-vh-100 d-flex position-relative bg-dark">
            {/* Barra Izquierda */}
            <motion.div 
                className="bg-dark border-secondary position-fixed"
                initial={{ width: 80, left: 16 }}
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    left: 16,
                    opacity: sidebarsVisible ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ 
                    overflowX: 'hidden', 
                    minWidth: sidebarsVisible ? 80 : 0,
                    borderRadius: '16px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                    top: '16px',
                    height: 'calc(90vh + 32px)', // Ajustar altura de acuerdo a la barra superior
                    zIndex: 1000,
                    backgroundColor: '#1a1d20',
                    pointerEvents: sidebarsVisible ? 'auto' : 'none',
                    visibility: sidebarsVisible ? 'visible' : 'hidden'
                }}
            >
                <div className="p-2 border-bottom border-secondary">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                        <img src={BlancoIcon} alt="Logo" width="30" height="30" />
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between" style={{ height: 'calc(100% - 60px)' }}>
                    <div className="py-2">
                        {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
                    </div>
                    <div className="py-2">
                        {bottomMenuItems.map((item, index) => renderMenuItem(item, index))}
                    </div>
                </div>
            </motion.div>

            {/* Contenido padding y width de las barras */}
            <div className="flex-grow-1" style={{ 
                marginLeft: sidebarsVisible ? '112px' : '32px',
                marginRight: '32px',
                transition: 'margin-left 0.3s'
            }}>
                {/* Header */}
                <nav className="navbar navbar-dark bg-dark border-bottom border-secondary px-4">
                    <div className="d-flex align-items-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSidebarsVisible(!sidebarsVisible)}
                            className="btn btn-outline-light me-3"
                        >
                            {sidebarsVisible ? <FaTimes /> : <FaBars />}
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
                        {/* inicio de las cards */}
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

                        {/* Contenido de las areas */}
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

            {/* Barra derecha 1 */}
            <motion.div
                className="bg-dark border-secondary position-fixed"
                initial={{ width: 0, right: 16 }}
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    right: 16,
                    opacity: sidebarsVisible ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ 
                    overflowX: 'hidden',
                    borderRadius: '16px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                    top: '16px',
                    height: '60vh',
                    zIndex: 1000,
                    backgroundColor: '#1a1d20'
                }}
            >
                <div className="py-2">
                    {/* Barra derecha 1 Contenido */}
                    <div className="p-2 text-light text-center">
                        <OverlayTrigger
                            placement="left"
                            overlay={renderTooltip('Configuración')}
                        >
                            <div><FontAwesomeIcon icon={faGear} size="lg" /></div>
                        </OverlayTrigger>
                    </div>
                </div>
            </motion.div>

            {/* Barra derecha 2 */}
            <motion.div
                className="bg-dark border-secondary position-fixed"
                initial={{ width: 0, right: 16 }}
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    right: 16,
                    opacity: sidebarsVisible ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ 
                    overflowX: 'hidden',
                    borderRadius: '16px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                    top: 'calc(60vh + 32px)',
                    height: '30vh',
                    zIndex: 1000,
                    backgroundColor: '#1a1d20'
                }}
            >
                <div className="py-2">
                    {/* Barra derecha 2 Contenido */}
                    <div className="p-2 text-light text-center">
                        <OverlayTrigger
                            placement="left"
                            overlay={renderTooltip('Perfil')}
                        >
                            <div><FontAwesomeIcon icon={faUser} size="lg" /></div>
                        </OverlayTrigger>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Dashboard;
