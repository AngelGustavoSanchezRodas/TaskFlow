import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ correo: '', contrasenia: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:8080/api/usuarios/login', loginData);
      
      console.log("Login Exitoso:", respuesta.data);
      localStorage.setItem('usuario', JSON.stringify(respuesta.data));
      navigate("/home"); 

    } catch (error) {
      console.error("Error login:", error);
      alert("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
      <h4 className="text-center mb-4 text-primary">Bienvenido de nuevo</h4>
      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input 
          type="email" className="form-control" placeholder="nombre@correo.com"
          value={loginData.correo}
          onChange={(e) => setLoginData({...loginData, correo: e.target.value})}
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Contraseña</label>
        <input 
          type="password" className="form-control" placeholder="******"
          value={loginData.contrasenia}
          onChange={(e) => setLoginData({...loginData, contrasenia: e.target.value})}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg">Ingresar</button>
      </div>
    </form>
  );
}

export default LoginForm;