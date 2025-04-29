import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-dark border-secondary">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Registrarse</h2>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Nombre" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control bg-dark text-light border-secondary" placeholder="Email" />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control bg-dark text-light border-secondary" placeholder="Contraseña" />
                  </div>
                  <button type="submit" className="btn btn-light w-100 mb-3">Registrarse</button>
                  <button onClick={() => navigate('/')} className="btn btn-outline-light w-100">Volver</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}