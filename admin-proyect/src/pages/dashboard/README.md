# Documentación del Componente Dashboard
---

## 1. Importaciones y Hooks
```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// ...varios íconos de FontAwesome...
import BlancoIcon from '../../assets/blancoicon.svg';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
```
- `useState, useEffect`: Estados y efectos del componente
- `useNavigate`: Navegación entre rutas
- `motion`: Animaciones de Framer Motion
- `FontAwesomeIcon`: Sistema de iconos
- `Tooltip, OverlayTrigger`: Componentes de Bootstrap

## 2. Estados y Configuración
```jsx
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user') || '{}');
const [sidebarsVisible, setSidebarsVisible] = useState(false);
const [activeUsers] = useState(1);
```
- `navigate`: Control de navegación
- `user`: Datos del usuario actual
- `sidebarsVisible`: Control de barras laterales
- `activeUsers`: Simulación de usuarios activos

## 3. Componentes Principales

### 3.1 Estructura de Navegación
```jsx
const mainMenuItems = [
    { icon: <FontAwesomeIcon icon={faHouse} size="lg" />, text: 'Inicio', active: true },
    { icon: <FontAwesomeIcon icon={faBinoculars} size="lg" />, text: 'Explorar' },
    // ...más items
];

const bottomMenuItems = [
    { type: 'divider' },
    { icon: <FontAwesomeIcon icon={faDragon} size="lg" />, text: 'Perfil' },
    { icon: <FontAwesomeIcon icon={faGear} size="lg" />, text: 'Configuración' }
];
```

### 3.2 Barras Laterales
```jsx
// Barra Izquierda - Menú Principal
<motion.div 
    className="bg-dark border-secondary position-fixed"
    initial={{ width: 80, left: 16 }}
    animate={{ 
        width: sidebarsVisible ? 80 : 0,
        left: 16,
        opacity: sidebarsVisible ? 1 : 0
    }}
/>

// Barras Derechas - Perfil y Acciones
<motion.div
    className="bg-dark border-secondary position-fixed"
    initial={{ width: 0, right: 16 }}
    animate={{ 
        width: sidebarsVisible ? 80 : 0,
        right: 16
    }}
/>
```

### 3.3 Contenido Principal
```jsx
<div className="flex-grow-1">
    {/* Header */}
    <nav className="navbar navbar-dark bg-dark">
        {/* Botón de toggle y título */}
    </nav>

    {/* Dashboard Content */}
    <div className="row g-4">
        {/* Cards de estadísticas */}
        {/* Área de contenido principal */}
    </div>
</div>
```

## 4. Funciones Principales

### 4.1 Control de Barras Laterales
```jsx
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
```

### 4.2 Gestión de Sesión
```jsx
const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
};
```

## 5. Características de UI/UX

### Animaciones
- Transiciones suaves en barras laterales
- Efectos hover en elementos interactivos
- Animaciones de escala en botones

### Sistema de Navegación
- Menú lateral colapsable
- Tooltips informativos
- Atajos de teclado (Tab)

### Responsividad
- Layout adaptativo
- Sistema de grid de Bootstrap
- Manejo dinámico de espaciado

### Sistema de Notificaciones
- Indicadores de usuarios activos
- Badges de notificación
- Feedback visual en interacciones

### Estilos
- Tema oscuro consistente
- Bordes y sombras estilizadas
- Iconografía moderna y clara
