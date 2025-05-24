import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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
    faCircleUser,
    faUserGroup,
    faUser,
    faEllipsisVertical,
    faCartShopping,
    faBell,
    faRightToBracket,
    faMemory
} from '@fortawesome/free-solid-svg-icons';
import BlancoIcon from '../../assets/blancoicon.svg';
import { Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [sidebarsVisible, setSidebarsVisible] = useState(false);
    const [activeUsers] = useState(1); // simular usuarios activos
    const [isBarsFocused, setIsBarsFocused] = useState(true);
    const sidebarRef = useRef(null);

    
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsBarsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const mainMenuItems = [
        { 
            icon: <FontAwesomeIcon icon={faHouse} size="lg" />, 
            text: 'Inicio', 
            path: '/dashboard'
        },
        { 
            icon: <FontAwesomeIcon icon={faBinoculars} size="lg" />, 
            text: 'Vistas', 
            path: '/views'
        },
        { 
            icon: <FontAwesomeIcon icon={faCubes} size="lg" />, 
            text: 'Areas', 
            path: '/areas'
        },
        { 
            icon: <FontAwesomeIcon icon={faBarsProgress} size="lg" />, 
            text: 'Cards', 
            path: '/cards'
        },
        { 
            icon: <FontAwesomeIcon icon={faChartSimple} size="lg" />, 
            text: 'Analisis', 
            path: '/analysis'
        },
        { 
            icon: <FontAwesomeIcon icon={faRing} size="lg" />, 
            text: 'Roles', 
            path: '/roles'
        },
    ];

    const bottomMenuItems = [
        { type: 'divider' },
        { icon: <FontAwesomeIcon icon={faDragon} size="lg" />, text: 'Plugins' }, // icono de dragon
        { icon: <FontAwesomeIcon icon={faGear} size="lg" />, text: 'Configuración' }, // icono de engranaje
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

        const isActive = location.pathname === item.path;

        return (
            <OverlayTrigger
                key={index}
                placement="right"
                overlay={renderTooltip(item.text)}
            >
                <motion.div
                    whileHover={{ backgroundColor: '#2c3034', scale: 1.05 }}
                    animate={{
                        backgroundColor: isActive ? '#2c3034' : 'transparent',
                        x: isActive ? 5 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className={`d-flex align-items-center justify-content-center p-3 text-light`}
                    style={{ 
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                    onClick={() => navigate(item.path)}
                >
                    {isActive && (
                        <motion.div
                            layoutId="activeIndicator"
                            className="position-absolute"
                            style={{
                                left: 0,
                                width: '4px',
                                height: '70%',
                                backgroundColor: '#6c757d',
                                borderRadius: '0 4px 4px 0'
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                    {item.icon}
                </motion.div>
            </OverlayTrigger>
        );
    };

    // Modificar los estilos de las barras flotantes
    const sidebarStyle = {
        opacity: sidebarsVisible ? (isBarsFocused ? 1 : 0.5) : 0,
        transition: 'all 0.3s ease'
    };

    return (
        <div className="min-vh-100 d-flex position-relative bg-dark">
            {/* Barra Izquierda */}
            <motion.div 
                ref={sidebarRef}
                className="bg-dark border-secondary position-fixed"
                initial={{ width: 80, left: 16 }}
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    left: 16,
                    opacity: sidebarsVisible ? (isBarsFocused ? 1 : 0.5) : 0
                }}
                onHoverStart={() => setIsBarsFocused(true)}
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
                {/* Header - para el logout */}
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
                </nav>

                {/* Contenido dinámico */}
                <Outlet />
            </div>

            {/* Barra derecha 1 */}
            <motion.div
                className="bg-dark border-secondary position-fixed"
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    right: 16,
                    opacity: sidebarsVisible ? (isBarsFocused ? 1 : 0.5) : 0
                }}
                onHoverStart={() => setIsBarsFocused(true)}
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
                <div className="py-2 d-flex flex-column h-100">
                    <OverlayTrigger
                        placement="left"
                        overlay={renderTooltip('Tu perfil')}
                    >
                        <div className="p-4 text-light text-center">
                            <FontAwesomeIcon 
                                icon={faCircleUser} 
                                size="2x"
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </OverlayTrigger>

                    <div className="border-top border-secondary my-3 mx-3"></div>

                    <OverlayTrigger
                        placement="left"
                        overlay={renderTooltip(activeUsers > 1 ? 'Usuarios conectados' : 'Sin usuarios conectados')}
                    >
                        <div className="p-2 text-light text-center position-relative">
                            <FontAwesomeIcon 
                                icon={activeUsers > 1 ? faUserGroup : faUser}
                                size="lg"
                                style={{ cursor: 'pointer' }}
                            />
                            {activeUsers > 1 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.6rem' }}>
                                    {activeUsers}
                                </span>
                            )}
                        </div>
                    </OverlayTrigger>
                </div>
            </motion.div>

            {/* Barra derecha 2 - updated content */}
            <motion.div
                className="bg-dark border-secondary position-fixed"
                animate={{ 
                    width: sidebarsVisible ? 80 : 0,
                    right: 16,
                    opacity: sidebarsVisible ? (isBarsFocused ? 1 : 0.5) : 0
                }}
                onHoverStart={() => setIsBarsFocused(true)}
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
                <div className="py-2 d-flex flex-column justify-content-between h-100">
                    <OverlayTrigger placement="left" overlay={renderTooltip('Carrito')}>
                        <div className="p-2 text-light text-center">
                            <FontAwesomeIcon 
                                icon={faCartShopping} 
                                size="lg" 
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </OverlayTrigger>

                    <OverlayTrigger placement="left" overlay={renderTooltip('Memoria')}>
                        <div className="p-2 text-light text-center">
                            <FontAwesomeIcon 
                                icon={faMemory} 
                                size="lg" 
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </OverlayTrigger>

                    <OverlayTrigger placement="left" overlay={renderTooltip('Notificaciones')}>
                        <div className="p-2 text-light text-center">
                            <FontAwesomeIcon 
                                icon={faBell} 
                                size="lg" 
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </OverlayTrigger>

                    <OverlayTrigger placement="left" overlay={renderTooltip('Cerrar sesión')}>
                        <div className="p-2 text-light text-center mb-2" onClick={handleLogout}>
                            <FontAwesomeIcon 
                                icon={faRightToBracket} 
                                size="lg" 
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </OverlayTrigger>
                </div>
            </motion.div>
        </div>
    );
}

export default Dashboard;
