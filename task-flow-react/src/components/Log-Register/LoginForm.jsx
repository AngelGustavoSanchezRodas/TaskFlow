import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Auth.module.css';

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // Mapear los nombres de los campos al DTO esperado por Java
        const response = await axios.post('http://localhost:8080/api/usuarios/login', { 
            correo: correo, 
            contrasenia: password // 👈 CRÍTICO: Debe coincidir con el DTO de Java
        });
        
        // Guardamos la respuesta del DTO UsuarioSalidaDTO
        localStorage.setItem('usuario', JSON.stringify(response.data));
        navigate('/home');
    } catch (error) {
        alert("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <div className={styles.authContainer}>
        <div className={`card ${styles.authCard}`}>
            <h2 className={styles.authTitle}>Bienvenido</h2>
            
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className={`form-control ${styles.inputField}`} 
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Contraseña</label>
                    <input 
                        type="password" 
                        className={`form-control ${styles.inputField}`} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`}>
                    Ingresar
                </button>
            </form>

            <div className="text-center mt-4">
                <small className="text-muted">¿No tienes cuenta? <a href="/register" className="text-primary text-decoration-none fw-bold">Regístrate</a></small>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;