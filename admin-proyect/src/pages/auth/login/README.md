# Documentación del Componente Login
---

## 1. Importaciones y Hooks
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
```
- `useState`: Manejo del estado del formulario
- `useNavigate`: Navegación entre rutas
- `useTranslation`: Internacionalización
- `motion`: Animaciones de Framer Motion
- `useAuth`: Contexto de autenticación

## 2. Estados y Configuración
```jsx
const navigate = useNavigate();
const { t } = useTranslation();
const { login } = useAuth();
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```
- `navigate`: Redirección entre páginas
- `t`: Función de traducción
- `login`: Función de autenticación
- `formData`: Estado del formulario
- `error`: Manejo de errores
- `loading`: Estado de carga

## 3. Componentes Principales

### 3.1 Contenedor Principal
```jsx
<div className="min-vh-100 d-flex align-items-center bg-dark text-light">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-dark border-secondary"
        >
```

### 3.2 Formulario de Login
```jsx
// Encabezado del formulario
<div className="text-center mb-4">
  <h2 className="fw-bold">{t('login')}</h2>  // Título principal traducible
  <p className="text-secondary">{t('loginSubtitle')}</p>  // Subtítulo con texto de ayuda
</div>

// Campo de Email
<div className="mb-3">
  <label className="form-label">{t('email')}</label>  // Etiqueta traducible
  <input 
    type="email"  // Tipo email para validación HTML5
    className="form-control bg-dark text-light border-secondary"  // Estilos modo oscuro
    name="email"  // Identificador para handleChange
    value={formData.email}  // Valor controlado por estado
    onChange={handleChange}  // Manejador de cambios
    required  // Validación requerida
  />
</div>

// Campo de Contraseña
<div className="mb-4">
  <label className="form-label">{t('password')}</label>  // Etiqueta traducible
  <input 
    type="password"  // Campo tipo password para ocultar caracteres
    className="form-control bg-dark text-light border-secondary"  // Estilos modo oscuro
    name="password"  // Identificador para handleChange
    value={formData.password}  // Valor controlado por estado
    onChange={handleChange}  // Manejador de cambios
    required  // Validación requerida
  />
</div>
```

### 3.3 Botones y Enlaces
```jsx
<div className="d-grid gap-2">
  // Botón de inicio de sesión
  <button 
    type="submit"  // Tipo submit para enviar formulario
    className="btn btn-light py-2"  // Estilo principal
    disabled={loading}  // Deshabilita durante la carga
  >
    {loading ? t('loading') : t('login')}  // Texto dinámico según estado
  </button>
  
  // Botón de registro
  <button 
    type="button"  // Tipo button para evitar submit
    className="btn btn-outline-light py-2"  // Estilo secundario
    onClick={() => navigate('/register')}  // Navegación a registro
  >
    {t('createAccount')}  // Texto traducible
  </button>
</div>
```

## 4. Funciones Principales

### 4.1 Manejo del Formulario
```jsx
// Actualización de campos del formulario
const handleChange = (e) => {
  setFormData({
    ...formData,  // Mantiene valores existentes
    [e.target.name]: e.target.value  // Actualiza campo específico
  });
};

// Proceso de inicio de sesión
const handleSubmit = async (e) => {
  e.preventDefault();  // Previene recarga de página
  setError('');  // Limpia errores previos
  setLoading(true);  // Activa indicador de carga
  
  try {
    await login(formData.email, formData.password);  // Intenta autenticación
    navigate('/dashboard');  // Redirecciona al dashboard
  } catch (error) {
    setError(t('loginError'));  // Muestra error traducido
  } finally {
    setLoading(false);  // Desactiva indicador de carga
  }
};
```

## 5. Características de UI/UX

### Animaciones
- Animación de entrada del formulario
- Efectos de hover en botones
- Indicador de carga

### Validación
- Validación de campos requeridos
- Manejo de errores de autenticación
- Feedback visual al usuario

### Responsividad
- Diseño adaptable a móviles
- Grid system de Bootstrap
- Espaciado responsive

### Internacionalización
- Textos traducibles
- Mensajes de error en múltiples idiomas
- Adaptación cultural

### Estilos
- Tema oscuro consistente
- Inputs personalizados
- Estados de hover y focus
