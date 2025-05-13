import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlancoIcon from '../../../assets/blancoicon.svg';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_-])[A-Za-z\d@_-]{7,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.password) {
        setError(t('allFieldsRequired'));
        return;
      }

      // Validate name length
      if (formData.nombre.trim().length < 5) {
        setError(t('nameMinLength'));
        return;
      }

      // Rest of your existing validations...
      if (formData.password !== formData.confirmPassword) {
        setError(t('passwordsDoNotMatch'));
        return;
      }

      if (!validatePassword(formData.password)) {
        setError(t('passwordRequirements'));
        return;
      }

      const response = await axios.post(`${API_URL}/api/register`, {
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim(),
        password_md5: md5(formData.password)
      });

      console.log('Server response:', response.data);

      // Check if we have a response with user data
      if (response.data && (response.data.id || response.data.user)) {
        setSuccess(true);
        setError('');
          navigate('/login', { replace: true });
      } else {
        throw new Error('Invalid registration response');
      }
    } catch (err) {
      console.error('Registration error details:', err);
      setError(
        err.response?.data?.error || 
        err.message || 
        t('registrationError')
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center justify-content-center position-relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className="btn btn-outline-light btn-sm position-absolute"
        style={{ top: '20px', right: '20px' }}
      >
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </motion.button>

      <motion.div 
        className="card bg-dark border-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: '380px' }}
      >
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-white">{t('register')}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{t('registrationSuccess')}</div>}
          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('name')}
                required
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('email')}
                required
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('phone')}
                required
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('password')}
                required
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('Confirm Password')}
                required
              />
            </div>
            <small className="text-muted mb-3 d-block">
              {t('passwordHint')}
            </small>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-light w-100"
              disabled={loading || success}
            >
              {loading ? t('registering') : t('register')}
            </motion.button>
          </form>

          <div className="d-flex align-items-center mt-3">
            <div className="mx-auto">
              <img src={BlancoIcon} alt="Logo" width="50" height="50" />
            </div>
            <div className="ms-auto">
              <div onClick={() => navigate('/auth/login')} className="text-white mb-2 cursor-pointer">
                {t('alreadyHaveAccount')}
              </div>
              <div className="text-white cursor-pointer">
                {t('terms')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}