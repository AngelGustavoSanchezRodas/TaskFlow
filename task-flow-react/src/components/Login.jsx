import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const enviarDatos = async (e) => {
    e.preventDefault();
    try {

      const respuesta = await axios.post('http://localhost:8080/api/usuarios/login', {
        correo,
        contrasenia
      });

      console.log("¡Login Exitoso!", respuesta.data);
      alert("¡Bienvenido " + respuesta.data.nombre + "!");

      localStorage.setItem('usuario', JSON.stringify(respuesta.data));
      navigate("/home");

    } catch (error) {

      console.error("Error al iniciar sesión:", error);
      alert("Error: Usuario o contraseña incorrectos (o falla de conexión)");
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Iniciar Sesión</h3>
              <form onSubmit={enviarDatos}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)} 
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
