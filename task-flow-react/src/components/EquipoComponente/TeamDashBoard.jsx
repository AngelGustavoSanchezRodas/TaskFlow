import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Navbar from "../NavbarComponente/Navbar";
import MiembrosList from "./MiembrosList";
import TareasList from "./TareasList";
import CrearTareaModal from "./CrearTarea";
import styles from "../../styles/TeamDashboard.module.css";
import api from "../../api/axiosConfig";
import { salirDelEquipo } from "../../service/TeamService"; 
import Swal from 'sweetalert2';

function TeamDashboard() {
  const { idEquipo } = useParams();
  const navigate = useNavigate();
  
  // Obtener usuario del localStorage (Unificado a "user")
  const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("usuario"));

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
        api.get(`/equipo/${idEquipo}/miembros`),
        api.get(`/tareas/listaTareas/${idEquipo}`),
      ]);

      setMiembros(resMiembros.data);
      setTareas(resTareas.data);

      // Verificar si el usuario actual es líder
      if (user) {
        const idActual = Number(user.idUsuario);
        setMiId(idActual);

        const yo = resMiembros.data.find(
          (m) => Number(m.idUsuario) === idActual
        );

        if (yo && yo.rol === "LIDER") {
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

  // Función para salir del equipo
 const handleSalirEquipo = async () => {
    // Protección de sesión
    if (!user || !user.idUsuario) {
        Swal.fire({
            icon: 'error',
            title: 'Sesión no válida',
            text: 'Por favor, cierra sesión y vuelve a ingresar.',
        });
        return;
    }

    // 1. Mostrar la Alerta de Confirmación (Pregunta)
    const result = await Swal.fire({
        title: '¿Abandonar el equipo?',
        text: "Ya no tendrás acceso a las tareas y el chat.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', // Rojo para confirmar
        cancelButtonColor: '#3085d6', // Azul para cancelar
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    });

    // 2. Si el usuario confirma (hace clic en "Sí, salir")
    if (result.isConfirmed) {
      try {
        // Mostrar indicador de carga mientras el backend procesa
        Swal.fire({
            title: 'Saliendo...',
            text: 'Procesando tu solicitud',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Llamada a la API
        await salirDelEquipo(idEquipo, user.idUsuario);

        // 3. Alerta de Éxito
        await Swal.fire({
            title: '¡Listo!',
            text: 'Has salido del equipo correctamente.',
            icon: 'success',
            timer: 2000, // Se cierra sola en 2 segundos
            showConfirmButton: false
        });

        // Redirección
        navigate("/home");

      } catch (error) {
        console.error(error);
        // Alerta de Error
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al intentar salir del equipo.',
        });
      }
    }
  };

  const handleCambiarEstado = async (idTarea, estadoActual) => {
    try {
      const nuevoEstado = !estadoActual;
      await api.patch(`/tareas/${idTarea}/estado?estado=${nuevoEstado}`);

      setTareas((prevTareas) =>
        prevTareas.map((t) =>
          t.idTarea === idTarea ? { ...t, estado: nuevoEstado } : t
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado", error);
      alert("No se pudo actualizar la tarea.");
      cargarDatos();
    }
  };

  const handleEliminar = async (idTarea) => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas eliminar esta tarea permanentemente?"
      )
    ) {
      return;
    }
    try {
      await api.delete(`/tareas/eliminar/${idTarea}`);
      setTareas((prevTareas) =>
        prevTareas.filter((t) => t.idTarea !== idTarea)
      );
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
          <div className={`card shadow-lg ${styles.dashboardHeader}`}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-0 text-white">
                  <i className="bi bi-rocket-takeoff-fill me-2"></i> Panel de Equipo
                </h2>
                <small className={styles.dashboardSubtitle}>
                  ID de Equipo: {idEquipo}
                </small>
              </div>
              
              <div className="d-flex gap-2"> {/* Agrupé botones para mejor orden */}
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleSalirEquipo}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Salir
                  </button>

                  {soyLider && (
                    <button
                      className="btn btn-light text-primary fw-bold shadow"
                      onClick={() => setShowModalTarea(true)}
                    >
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
            recargarTareas={cargarDatos}
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