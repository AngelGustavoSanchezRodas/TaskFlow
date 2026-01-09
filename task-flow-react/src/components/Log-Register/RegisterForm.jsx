import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Auth.module.css';

function RegisterForm() {
  const [userName, setUserName] = useState(''); // 👈 NUEVO CAMPO
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
        //  AHORA ENVIAMOS LOS NOMBRES EXACTOS QUE PIDE TU JAVA
        await axios.post('https://taskflow-production-f5db.up.railway.app/api/usuarios/registro', { 
            userName: userName,     // Java espera "userName"
            nombre: nombre,
            apellido: apellido, 
            correo: correo, 
            contrasenia: password   
        });
        
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate('/'); 
    } catch (error) {
        console.error("Error en registro", error);
        // Mostramos el mensaje exacto que manda el backend (ej: "El usuario ya existe")
        alert(error.response?.data || "Hubo un error al registrar.");
    }
  };

  return (
    <div className={styles.authContainer}>
        <div className={`card ${styles.authCard}`}>
            <h2 className={styles.authTitle}>Crear Cuenta</h2>
            
            <form onSubmit={handleRegistro}>
                
               
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Usuario (Nick)</label>
                    <input 
                        type="text" 
                        className={`form-control ${styles.inputField}`} 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="ej: juanperez99"
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label text-muted small fw-bold">Nombre</label>
                        <input 
                            type="text" 
                            className={`form-control ${styles.inputField}`} 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label text-muted small fw-bold">Apellido</label>
                        <input 
                            type="text" 
                            className={`form-control ${styles.inputField}`} 
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Correo</label>
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
                    Registrarse
                </button>
            </form>

            <div className="text-center mt-4">
                <small className="text-muted">¿Ya tienes cuenta? <a href="/" className="text-primary text-decoration-none fw-bold">Inicia Sesión</a></small>
            </div>
        </div>
    </div>
  );
}

export default RegisterForm;