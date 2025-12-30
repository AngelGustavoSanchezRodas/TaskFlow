import { useState } from 'react'; 
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function IndexLog() {
  // Estado para controlar qué formulario se ve (false = Login, true = Registro)
  const [esRegistro, setEsRegistro] = useState(false);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-3">
            
            {/* CABECERA TIPO PESTAÑA */}
            <div className="card-header bg-white p-0 d-flex">
              <button 
                className={`btn flex-fill py-3 fw-bold ${!esRegistro ? 'btn-primary text-white' : 'btn-light text-muted'}`}
                style={{ borderRadius: "calc(0.375rem - 1px) 0 0 0" }} 
                onClick={() => setEsRegistro(false)}
              >
                INICIAR SESIÓN
              </button>
              <button 
                className={`btn flex-fill py-3 fw-bold ${esRegistro ? 'btn-primary text-white' : 'btn-light text-muted'}`}
                style={{ borderRadius: "0 calc(0.375rem - 1px) 0 0" }} 
                onClick={() => setEsRegistro(true)}
              >
                REGISTRARSE
              </button>
            </div>

            <div className="card-body p-4">
              {/* Renderizado Condicional */}
              {!esRegistro ? (
                <LoginForm />
              ) : (
                <RegisterForm onSuccess={() => setEsRegistro(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexLog;