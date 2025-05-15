# Documentación del Componente Landing
---

## 1. Importaciones y Hooks
```jsx
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoSvg from '../../assets/blancoicon.svg';
```
- `useNavigate`: Para la navegación entre rutas
- `motion, AnimatePresence`: Manejo de animaciones
- `useState`: Manejo del estado del componente
- `useTranslation`: Internacionalización
- `logoSvg`: Logo de la aplicación

## 2. Estados y Configuración
```jsx
const navigate = useNavigate();
const [selectedPlan, setSelectedPlan] = useState(null);
const { t, i18n } = useTranslation();
```
- `navigate`: Para redireccionar a otras páginas
- `selectedPlan`: Controla el plan seleccionado y el modal
- `t, i18n`: Funciones para traducción

## 3. Estructura de Datos (Plans)
```jsx
const plans = [
  { id: 'free', ... },
  { id: 'pro', ... },
  { id: 'business', ... },
  { id: 'enterprise', ... }
];
```
Define los planes disponibles con sus características:
- Free: Plan básico gratuito
- Pro: Plan intermedio
- Business: Plan empresarial
- Enterprise: Plan personalizado

## 4. Componentes Principales

### 4.1 Barra de Navegación

```jsx
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container pb-3">
          <a className="navbar-brand">
            <img src={logoSvg} alt="Alphima" height="40" />
          </a>
          <div className="d-flex align-items-center">
            <div className="dropdown me-3">
              <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-globe2 me-1"></i>
                {i18n.language === 'es' ? 'ES' : 'EN'}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>Español</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} className="btn btn-outline-light me-3 px-4 py-2 fs-5">
              {t('login')}
            </button>
            <button onClick={() => navigate('/register')} className="btn btn-light text-dark px-4 py-2 fs-5">
              {t('register')}
            </button>
          </div>
        </div>
      </nav>
```
- Logo de la aplicación

    ```jsx
          <a className="navbar-brand">
            <img src={logoSvg} alt="Alphima" height="40" />
          </a>
    ```
- Selector de idioma (ES/EN)
    ```jsx
          <div className="dropdown me-3">
              <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-globe2 me-1"></i>
                {i18n.language === 'es' ? 'ES' : 'EN'}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>Español</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
              </ul>
          </div>
    ```
- Botones de Login/Register
    ```jsx
          <button onClick={() => navigate('/login')} className="btn btn-outline-light me-3 px-4 py-2 fs-5">
              {t('login')}
          </button>
          <button onClick={() => navigate('/register')} className="btn btn-light text-dark px-4 py-2 fs-5">
              {t('register')}
          </button>
    ```

    

### 4.2 Sección Hero
```jsx
      <section className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">{t('welcome')}</h1>
            <p className="lead text-secondary">{t('subtitle')}</p>
          </div>
        </div>
      </section>
```
- Título principal
    ```jsx
      <h1 className="display-4 fw-bold mb-4">{t('welcome')}</h1>
    ```
- Subtítulo descriptivo
    ```jsx
      <p className="lead text-secondary">{t('subtitle')}</p>
    ```



### 4.3 Carrusel
```jsx
      <section className="container py-5">
        <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
            <div className="carousel-item">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
            <div className="carousel-item">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
```
- Presentación de imágenes
     ```jsx
           <div className="carousel-indicators">
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
          </div>
     ```
- Controles de navegación
     ```jsx
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
            <div className="carousel-item">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
            <div className="carousel-item">
              <div className="bg-black bg-opacity-25 rounded ratio ratio-16x9"></div>
            </div>
          </div>
     ```
- Indicadores de posición
     ```jsx
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
        </button>
    ```



### 4.4 Planes de Precios
```jsx
      <section className="container py-5">
        <div className="row g-4">
          {plans.map((plan) => (
            <div key={plan.id} className={`col-md-6 col-lg-3`}>
              <div className="card bg-dark border-secondary h-100">
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div className="text-center">
                    <h3 className="card-title fs-4 mb-3 text-white">{plan.name}</h3>
                    <div className="fs-2 fw-bold mb-3" style={{ color: '#d1d1d1' }}>
                      {plan.price === 'Custom' ? (
                        <span className="fs-4">{t('custom')}</span>
                      ) : (
                        <>
                          <small className="fs-6 text-secondary">$</small>
                          {plan.price}
                          {plan.price !== '0' && <small className="fs-6 text-secondary">{t('Month')}</small>}
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    className={`btn ${plan.id === 'pro' ? 'btn-light' : 'btn-outline-light'} w-100 mt-4`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.price === '0' ? 'Comenzar gratis' : t('select')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
```
- Cards con información de planes
   ```jsx
        <h3 className="card-title fs-4 mb-3 text-white">{plan.name}</h3>
   ```
- Precios y características
   ```jsx
                    <div className="fs-2 fw-bold mb-3" style={{ color: '#d1d1d1' }}>
                      {plan.price === 'Custom' ? (
                        <span className="fs-4">{t('custom')}</span>
                      ) : (
                        <>
                          <small className="fs-6 text-secondary">$</small>
                          {plan.price}
                          {plan.price !== '0' && <small className="fs-6 text-secondary">{t('Month')}</small>}
                        </>
                      )}
                    </div>
   ```
- Botones de acción
   ```jsx
            <button className={`btn ${plan.id === 'pro' ? 'btn-light' : 'btn-outline-light'} w-100 mt-4`} onClick={() => setSelectedPlan(plan)}>
                    {plan.price === '0' ? 'Comenzar gratis' : t('select')}
                  </button>
   ```



### 4.5 Modal de Detalles
```jsx
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
              style={{ background: 'rgba(0, 0, 0, 0.8)', zIndex: 1000 }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="position-fixed top-50 start-50 translate-middle bg-dark border border-secondary rounded-3 p-4 p-sm-5"
              style={{ width: '90%', maxWidth: '600px', zIndex: 1001, maxHeight: '90vh', overflow: 'auto' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="fs-2 mb-2 text-white">{selectedPlan.name}</h2>
                  <div className="fs-4" style={{ color: '#d1d1d1' }}>
                    {selectedPlan.price === 'Custom' ? (
                      t('custom')
                    ) : (
                      <>
                        <span className="fs-6 text-secondary">$</span>
                        {selectedPlan.price}
                        {selectedPlan.price !== '0' && <span className="fs-6 text-secondary">{t('Month')}</span>}
                      </>
                    )}
                  </div>
                </div>
                <button className="btn btn-outline-light btn-sm" onClick={() => setSelectedPlan(null)}>✕</button>
              </div>
              <div className="mb-4">
                <h4 className="text-white mb-3">{t('features')}</h4>
                <ul className="list-unstyled text-light">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="mb-2">✓ {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-light flex-grow-1 py-2" onClick={() => navigate('/register')}>
                  {t('chooseplan')}
                </button>
                <button className="btn btn-outline-light" onClick={() => setSelectedPlan(null)}>
                  {t('cancel')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
```
- Modal animado con Framer Motion
  ```jsx
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
              style={{ background: 'rgba(0, 0, 0, 0.8)', zIndex: 1000 }}
            />
  ```

- Detalles del plan seleccionado
  ```jsx
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="fs-2 mb-2 text-white">{selectedPlan.name}</h2>
                  <div className="fs-4" style={{ color: '#d1d1d1' }}>
                    {selectedPlan.price === 'Custom' ? (
                      t('custom')
                    ) : (
                      <>
                        <span className="fs-6 text-secondary">$</span>
                        {selectedPlan.price}
                        {selectedPlan.price !== '0' && <span className="fs-6 text-secondary">{t('Month')}</span>}
                      </>
                    )}
                  </div>
                </div>
                <button className="btn btn-outline-light btn-sm" onClick={() => setSelectedPlan(null)}>✕</button>
              </div>
  ```
- Botones de acción y cierre
  ```jsx
              <button className="btn btn-light flex-grow-1 py-2" onClick={() => navigate('/register')}>
                  {t('chooseplan')}
              </button>
                <button className="btn btn-outline-light" onClick={() => setSelectedPlan(null)}>
                  {t('cancel')}
                </button>
  ```



### 4.6 Footer
```jsx
      <footer className="border-top border-secondary py-4">
        <div className="container text-center">
          <small className="text-secondary">
            © {new Date().getFullYear()} ALPHIMA
          </small>
        </div>
      </footer>
```
- Información de copyright
- Año dinámico

## 5. Características de UI/UX

### Animaciones
- Transiciones suaves en el modal
- Efectos de entrada/salida
- Animaciones en hover

### Responsividad
- Diseño adaptable a diferentes pantallas
- Grid system de Bootstrap
- Clases utilitarias responsive

### Internacionalización
- Soporte para múltiples idiomas
- Cambio dinámico de idioma
- Textos traducibles

### Estilos
- Tema oscuro consistente
- Uso de Bootstrap
- Personalización de componentes


