import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState([]);

  // Cargar equipos apenas aparece el Navbar
  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    const usuarioString = localStorage.getItem('usuario');
    
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      const miId = usuarioObj.idUsuario;

      try {
        // Llamamos al endpoint que acabas de probar en Postman
        const respuesta = await axios.get(`http://localhost:8080/api/equipo/mis-equipos/${miId}`);
        setEquipos(respuesta.data);
      } catch (error) {
        console.error("Error al cargar equipos", error);
      }
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        {/* Marca / Logo */}
        <span className="navbar-brand mb-0 h1 fw-bold">TaskFlow</span>

        {/* Botón para celular (Hamburguesa) */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <button className="btn nav-link text-white" onClick={() => navigate('/home')}>Inicio</button>
            </li>

            {/* 👇 AQUÍ ESTÁ EL MENÚ DESPLEGABLE 👇 */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                Mis Equipos
              </a>
              <ul className="dropdown-menu">
                
                {/* 1. Mapeamos el JSON que viste en Postman */}
                {equipos.length === 0 ? (
                  <li><span className="dropdown-item text-muted">No tienes equipos</span></li>
                ) : (
                  equipos.map((equipo) => (
                    <li key={equipo.idEquipo}>
                      <button className="dropdown-item d-flex justify-content-between align-items-center">
                        {equipo.nombreEquipo}
                        
                        {/* Etiqueta con tu Rol (FullStack / Lider) */}
                        <span className={`badge ms-2 ${equipo.miRol === 'Lider' ? 'bg-warning text-dark' : 'bg-info'}`}>
                          {equipo.miRol}
                        </span>
                      </button>
                    </li>
                  ))
                )}

                <li><hr className="dropdown-divider" /></li>

                {/* 2. Opciones de Gestión (Próximamente funcionales) */}
                <li>
                  <button className="dropdown-item text-primary fw-bold">
                    <i className="bi bi-plus-circle"></i> + Crear Equipo Nuevo
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-success">
                    <i className="bi bi-people"></i> Unirse a un Equipo
                  </button>
                </li>

              </ul>
            </li>
          </ul>

          {/* Botón Cerrar Sesión */}
          <div className="d-flex">
            <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;