import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState([]);
  
  // Estados para el Modal de Crear Equipo
  const [showModal, setShowModal] = useState(false);
  const [nuevoEquipo, setNuevoEquipo] = useState({ nombre: "", categoria: "" });

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      try {
        const respuesta = await axios.get(`http://localhost:8080/api/equipo/mis-equipos/${usuarioObj.idUsuario}`);
        setEquipos(respuesta.data);
      } catch (error) {
        console.error("Error al cargar equipos", error);
      }
    }
  };

  const handleCrearEquipo = async () => {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) return;
    const usuarioObj = JSON.parse(usuarioString);

    try {
      await axios.post(
        `http://localhost:8080/api/equipo/crearEquipo?idUsuario=${usuarioObj.idUsuario}`,
        {
          nombre: nuevoEquipo.nombre,
          categoria: nuevoEquipo.categoria
        }
      );
      alert("¡Equipo creado! Ahora eres el Líder.");
      setShowModal(false); 
      setNuevoEquipo({ nombre: "", categoria: "" }); 
      cargarEquipos(); // Actualiza la lista del menú al instante
    } catch (error) {
      console.error("Error al crear equipo", error);
      alert("Error al crear el equipo.");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fw-bold">TaskFlow</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn nav-link text-white" onClick={() => navigate('/home')}>Inicio</button>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                  Mis Equipos
                </a>
                <ul className="dropdown-menu">
                  {equipos.length === 0 ? (
                    <li><span className="dropdown-item text-muted">No tienes equipos</span></li>
                  ) : (
                    equipos.map((equipo) => (
                      <li key={equipo.idEquipo}>
                        <button className="dropdown-item d-flex justify-content-between align-items-center">
                          {equipo.nombreEquipo}
                          <span className={`badge ms-2 ${equipo.miRol === 'LIDER' ? 'bg-warning text-dark' : 'bg-info'}`}>
                            {equipo.miRol}
                          </span>
                        </button>
                      </li>
                    ))
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    {/* BOTÓN QUE ABRE EL MODAL */}
                    <button className="dropdown-item text-primary fw-bold" onClick={() => setShowModal(true)}>
                      <i className="bi bi-plus-circle"></i> + Crear Equipo Nuevo
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-success" onClick={() => alert("Próximamente: Unirse")}>
                      <i className="bi bi-people"></i> Unirse a un Equipo
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-outline-danger btn-sm" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>

      {/* VENTANA MODAL MANUAL */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Nuevo Equipo</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del Equipo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nuevoEquipo.nombre}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select 
                    className="form-select"
                    value={nuevoEquipo.categoria}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, categoria: e.target.value})}
                  >
                    <option value="">Selecciona una opción...</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleCrearEquipo}>Crear Equipo</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
