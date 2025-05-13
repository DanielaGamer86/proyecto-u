import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { handleLogin } from '../../../controllers/login/controller_login';
import BlancoIcon from '../../../assets/blancoicon.svg';

export default function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await handleLogin(email, password);
    if (result.success) {
      navigate('/dashboard');  // Cambiado de /home a /dashboard
    } else {
      setError(result.error);
    }
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
          <h2 className="text-center mb-4 text-white">{t('login')}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="mb-4" onSubmit={onSubmit}>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('email')}
                required
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('password')}
                required
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-light w-100"
            >
              {t('enter')}
            </motion.button>
          </form>
          
          <div className="d-flex align-items-center mt-3">
            <div className="mx-auto">
              <img src={BlancoIcon} alt="Logo" width="50" height="50" />
            </div>
            <div className="ms-auto">
              <div onClick={() => navigate('/register')} className="text-white mb-2 cursor-pointer">
                {t('dontHaveAccount')}
              </div>
              <div className="text-white cursor-pointer">
                {t('forgotPassword')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}