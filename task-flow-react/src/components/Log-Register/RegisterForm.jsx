import { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onSuccess }) {
  const [registroData, setRegistroData] = useState({
    nombre: '',
    apellido: '',
    userName: '',
    correo: '',
    contrasenia: ''
  });

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/usuarios/registrar', registroData);
      
      alert("¡Registro exitoso! Ahora por favor inicia sesión.");
      
      // Limpiamos formulario
      setRegistroData({ nombre: '', apellido: '', userName: '', correo: '', contrasenia: '' });
      
      // Avisamos al padre para que cambie a Login
      onSuccess(); 

    } catch (error) {
      console.error("Error registro:", error);
      alert("Error al registrarse. Verifica los datos.");
    }
  };

  return (
    <form onSubmit={handleRegistro} className="animate__animated animate__fadeIn">
      <h4 className="text-center mb-4 text-primary">Crea tu cuenta</h4>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" className="form-control"
            value={registroData.nombre}
            onChange={(e) => setRegistroData({...registroData, nombre: e.target.value})}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Apellido</label>
          <input 
            type="text" className="form-control"
            value={registroData.apellido}
            onChange={(e) => setRegistroData({...registroData, apellido: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Usuario (UserName)</label>
        <input 
          type="text" className="form-control" placeholder="Ej: usuario123"
          value={registroData.userName}
          onChange={(e) => setRegistroData({...registroData, userName: e.target.value})}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input 
          type="email" className="form-control"
          value={registroData.correo}
          onChange={(e) => setRegistroData({...registroData, correo: e.target.value})}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Contraseña</label>
        <input 
          type="password" className="form-control"
          value={registroData.contrasenia}
          onChange={(e) => setRegistroData({...registroData, contrasenia: e.target.value})}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-success btn-lg">Registrarse</button>
      </div>
    </form>
  );
}

export default RegisterForm;