import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../NavbarComponente/Navbar'; 
import MiembrosList from './MiembrosList';
import TareasList from './TareasList';
import CrearTareaModal from './CrearTarea'; 
import styles from '../../styles/TeamDashboard.module.css';

function TeamDashboard() {
  const { idEquipo } = useParams();
  
  const [miembros, setMiembros] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModalTarea, setShowModalTarea] = useState(false);
  const [soyLider, setSoyLider] = useState(false);
  const [miId, setMiId] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [idEquipo]);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [resMiembros, resTareas] = await Promise.all([
        axios.get(`http://localhost:8080/api/equipo/${idEquipo}/miembros`),
        axios.get(`http://localhost:8080/api/tareas/listaTareas/${idEquipo}`)
      ]);

      setMiembros(resMiembros.data);
      setTareas(resTareas.data);
      
      const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
      
      if (usuarioLogueado) {
          const idActual = Number(usuarioLogueado.idUsuario);
          setMiId(idActual);

          // VERIFICAR ROL
          const yo = resMiembros.data.find(m => Number(m.idUsuario) === idActual);
          
          if (yo && yo.rol === 'LIDER') {
              setSoyLider(true);
          } else {
              setSoyLider(false);
          }
      }

    } catch (error) {
      console.error("Error al cargar datos del equipo", error);
    } finally {
      setCargando(false);
    }
  };

  const handleCambiarEstado = async (idTarea, estadoActual) => {
    try {
        const nuevoEstado = !estadoActual;
        await axios.patch(`http://localhost:8080/api/tareas/${idTarea}/estado?estado=${nuevoEstado}`);
        
        setTareas(prevTareas => prevTareas.map(t => 
            t.idTarea === idTarea ? { ...t, estado: nuevoEstado } : t
        ));

    } catch (error) {
        console.error("Error al cambiar estado", error);
        alert("No se pudo actualizar la tarea.");
        cargarDatos(); 
    }
  };

  const handleEliminar = async (idTarea) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta tarea permanentemente?")) {
        return;
    }
    try {
        await axios.delete(`http://localhost:8080/api/tareas/eliminar/${idTarea}`);
        setTareas(prevTareas => prevTareas.filter(t => t.idTarea !== idTarea));
    } catch (error) {
        console.error("Error al eliminar tarea", error);
        alert("No se pudo eliminar la tarea.");
    }
  };

  return (
    <div className="container mt-5">
        <Navbar />
        
        <div className="row mt-5">
            <div className="col-12 mb-4">
                {/* 👇 CABECERA ESTILIZADA CON CSS MODULES (SIN BARRA DE PROGRESO) */}
                <div className={`card shadow-lg ${styles.dashboardHeader}`}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="fw-bold mb-0 text-white">
                                <i className="bi bi-rocket-takeoff-fill me-2"></i> Panel de Equipo
                            </h2>
                            <small className={styles.dashboardSubtitle}>ID de Equipo: {idEquipo}</small>
                        </div>
                        <div>
                            {soyLider && (
                                <button className="btn btn-light text-primary fw-bold shadow" onClick={() => setShowModalTarea(true)}>
                                    <i className="bi bi-plus-lg"></i> Asignar Tarea
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-7 mb-4">
                <MiembrosList miembros={miembros} cargando={cargando} />
            </div>

            <div className="col-md-5 mb-4">
                <TareasList 
                    tareas={tareas} 
                    onCambiarEstado={handleCambiarEstado} 
                    onEliminar={handleEliminar}
                    soyLider={soyLider} 
                    miId={miId}          
                />
            </div>
        </div>

        <CrearTareaModal 
            show={showModalTarea}
            onClose={() => setShowModalTarea(false)}
            onSuccess={cargarDatos}
            idEquipo={idEquipo}
            miembros={miembros}
        />
    </div>
  );
}

export default TeamDashboard;