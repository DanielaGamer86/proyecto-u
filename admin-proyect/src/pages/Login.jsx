import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-dark border-secondary">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 text-white">{t('login')}</h2>
                <form>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control bg-dark text-white border-secondary focus-ring focus-ring-light" 
                      placeholder={t('email')}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="password" 
                      className="form-control bg-dark text-white border-secondary focus-ring focus-ring-light" 
                      placeholder={t('password')}
                    />
                  </div>
                  <button type="submit" className="btn btn-light w-100 mb-3">
                    {t('enter')}
                  </button>
                  <button onClick={() => navigate('/')} className="btn btn-outline-light w-100">
                    {t('back')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}