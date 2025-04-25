export default function Landing() {
  return (
    <div className="min-vh-100 bg-dark text-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container pb-3">
          <a className="navbar-brand fs-3">Mi App</a>
          <div className="ms-auto">
            <button className="btn btn-outline-light me-3 px-4 py-2 fs-5">
              Iniciar sesión
            </button>
            <button className="btn btn-light text-dark px-4 py-2 fs-5">
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
            <h1 className="display-4 fw-bold mb-4">Bienvenido a tu nueva plataforma</h1>
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
                  <button className="btn btn-outline-light w-100">
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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