# Documentación del Componente Register
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
- `motion`: Animaciones del componente
- `useAuth`: Contexto de autenticación

## 2. Estados y Configuración
```jsx
const navigate = useNavigate();
const { t } = useTranslation();
const { signup } = useAuth();
const [formData, setFormData] = useState({
  email: '',
  password: '',
  confirmPassword: ''
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```
- `navigate`: Para redirección
- `t`: Función de traducción
- `signup`: Función de registro
- `formData`: Estado del formulario
- `error`: Manejo de errores
- `loading`: Estado de carga

## 3. Componentes Principales

### 3.1 Contenedor Principal
```jsx
<div className="min-vh-100 d-flex align-items-center bg-dark text-light">
  <div className="container">
    <div className="row justify-content-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-md-6 col-lg-5"
      >
```
- Contenedor responsive
- Animación de entrada
- Tema oscuro consistente

### 3.2 Formulario de Registro
```jsx
<form onSubmit={handleSubmit} className="card-body p-4">
  {/* Campos del formulario */}
  <div className="mb-3">
    <label className="form-label">{t('email')}</label>
    <input 
      type="email" 
      name="email"
      className="form-control bg-dark text-light border-secondary" 
      value={formData.email}
      onChange={handleChange}
      required 
    />
  </div>

  <div className="mb-3">
    <label className="form-label">{t('password')}</label>
    <input 
      type="password" 
      name="password"
      className="form-control bg-dark text-light border-secondary" 
      value={formData.password}
      onChange={handleChange}
      required 
    />
  </div>

  <div className="mb-4">
    <label className="form-label">{t('confirmPassword')}</label>
    <input 
      type="password" 
      name="confirmPassword"
      className="form-control bg-dark text-light border-secondary" 
      value={formData.confirmPassword}
      onChange={handleChange}
      required 
    />
  </div>
```

## 4. Funciones Principales

### 4.1 Manejo del Formulario
```jsx
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  // Limpia el error cuando el usuario comienza a escribir
  if (error) setError('');
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validación de contraseñas
  if (formData.password !== formData.confirmPassword) {
    return setError(t('passwordsDontMatch'));
  }
  
  setError('');
  setLoading(true);
  
  try {
    await signup(formData.email, formData.password);
    navigate('/dashboard');
  } catch (error) {
    setError(t('registerError'));
  } finally {
    setLoading(false);
  }
};
```

## 5. Características de UI/UX

### Validaciones
- Email válido requerido
- Contraseña mínima requerida
- Coincidencia de contraseñas
- Mensajes de error traducibles

### Animaciones
- Entrada suave del formulario
- Feedback visual en errores
- Estados de carga

### Responsividad
- Diseño mobile-first
- Breakpoints de Bootstrap
- Padding adaptativo

### Internacionalización
- Textos traducibles
- Mensajes de error en múltiples idiomas
- Placeholders traducidos

### Accesibilidad
- Labels para inputs
- Mensajes de error ARIA
- Estados de focus visibles

### Estilos
- Tema oscuro consistente
- Inputs personalizados
- Feedback visual en hover/focus
