import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import Navbar from './NavbarComponente/Navbar'; 
import styles from '../styles/Home.module.css'; 

function Home() {
    // Estado para equipos y carga
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  // Hook de navegación
  const navigate = useNavigate();
  // Obtener usuario del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Cargar equipos al montar el componente
  useEffect(() => {
    if (usuario) {
        cargarEquipos();
    } else {
        navigate('/'); 
    }
  }, []);

  // Función para cargar los equipos del usuario
  const cargarEquipos = async () => {
    try {
       const response = await api.get(`/equipo/mis-equipos/${usuario.idUsuario}`);
        setEquipos(response.data);
    } catch (error) {
        console.error("Error cargando equipos", error);
    } finally {
        setCargando(false);
    }
  };

  // Navegar al dashboard del equipo
  const irAlDashboard = (idEquipo) => {
    navigate(`/equipo/${idEquipo}`);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar />

        <div className="container mt-5">
            <div className={`d-flex justify-content-between align-items-center ${styles.welcomeSection}`}>
                <div>
                    <h2 className={styles.sectionTitle}>Espacios de Trabajo</h2>
                    <p className="text-muted mb-0">Selecciona un proyecto para comenzar.</p>
                </div>
            </div>

            {cargando ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : equipos.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-3">
                        <i className="bi bi-box-seam display-1 text-muted opacity-25"></i>
                    </div>
                    <h4 className="fw-bold text-secondary">Aún no tienes equipos</h4>
                    <p className="text-muted">Crea uno nuevo desde el menú superior.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {equipos.map((equipo) => (
                        <div className="col-md-4 col-lg-3" key={equipo.idEquipo}>
                            <div className={`shadow-sm ${styles.teamCard}`} onClick={() => irAlDashboard(equipo.idEquipo)}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className={styles.teamIcon}>
                                       
                                        {/* Java manda 'nombreEquipo', no 'nombre' */}
                                        {equipo.nombreEquipo ? equipo.nombreEquipo.charAt(0).toUpperCase() : '#'}
                                    </div>
                                    
                                    {/* Mostramos el Rol que viene del Backend */}
                                    <span className={`badge bg-light text-primary border ${styles.roleBadge}`}>
                                        {equipo.miRol}
                                    </span>
                                </div>
                                
                                {/*  Usamos 'nombreEquipo' */}
                                <h5 className="fw-bold text-dark mb-2">{equipo.nombreEquipo}</h5>
                                
                                {/*  Usamos 'categoria' porque tu entidad no tiene descripción */}
                                <p className="text-muted small mb-0 text-truncate">
                                    <i className="bi bi-tag-fill me-1"></i>
                                    {equipo.categoria || "General"}
                                </p>
                                
                                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Entrar al panel</small>
                                    <i className="bi bi-arrow-right text-primary"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Home;