import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-vh-100 bg-dark text-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container pb-3">
          <a className="navbar-brand fs-3">Mi App</a>
          <div className="ms-auto">
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-outline-light me-3 px-4 py-2 fs-5"
            >
              Iniciar sesión
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-light text-dark px-4 py-2 fs-5"
            >
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      {/* Línea separadora */}
      <div className="container">
        <div className="border-bottom border-secondary"></div>
      </div>

      <section className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">Bienvenido a Alphima</h1>
            <p className="lead text-secondary">Gestiona todo desde un solo lugar</p>
          </div>
        </div>
      </section>

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

      <section className="container py-5">
        <div className="row g-4">
          {['Básico', 'Pro', 'Empresarial'].map((plan) => (
            <div key={plan} className="col-md-4">
              <div className="card bg-dark border-secondary h-100">
                <div className="card-body">
                  <h3 className="card-title fs-4 mb-3">{plan}</h3>
                  <p className="card-text text-secondary mb-4">
                    Descripción del plan {plan}
                  </p>
                  <button 
                    className="btn btn-outline-light w-100"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dialog animado */}
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
              style={{ 
                width: '90%', 
                maxWidth: '600px',
                zIndex: 1001,
                maxHeight: '90vh',
                overflow: 'auto'
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <h2 className="fs-2 mb-0">{selectedPlan}</h2>
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setSelectedPlan(null)}
                >
                  ✕
                </button>
              </div>
              <div className="text-secondary mb-4">
                <h4 className="text-light mb-3">Características incluidas:</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ Característica 1</li>
                  <li className="mb-2">✓ Característica 2</li>
                  <li className="mb-2">✓ Característica 3</li>
                </ul>
              </div>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-light flex-grow-1 py-2"
                  onClick={() => navigate('/register')}
                >
                  Elegir plan
                </button>
                <button 
                  className="btn btn-outline-light"
                  onClick={() => setSelectedPlan(null)}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="border-top border-secondary py-4">
        <div className="container text-center">
          <small className="text-secondary">
            © {new Date().getFullYear()} ALPHIMA
          </small>
        </div>
      </footer>
    </div>
  )
}