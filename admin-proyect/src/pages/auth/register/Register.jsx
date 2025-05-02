import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlancoIcon from '../../../assets/blancoicon.svg';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          <form className="mb-4">
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="text" 
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('name')}
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="email" 
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('email')}
              />
            </div>
            <div className="mb-3">
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="password" 
                className="form-control bg-dark text-white border-secondary" 
                placeholder={t('password')}
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-light w-100"
            >
              {t('register')}
            </motion.button>
          </form>

          <div className="d-flex align-items-center mt-3">
            <div className="mx-auto">
              <img src={BlancoIcon} alt="Logo" width="50" height="50" />
            </div>
            <div className="ms-auto">
              <div onClick={() => navigate('/login')} className="text-white mb-2 cursor-pointer">
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