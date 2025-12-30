import Navbar from "./NavbarComponente/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  // Estado para almacenar las tareas
  const [tareas, setTareas] = useState([]);

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Función para cargar tareas desde el backend
  const cargarTareas = async () => {
    const usuarioString = localStorage.getItem("usuario");

    // Verificar si el usuario está en sesión
    if (!usuarioString) {
      console.error("No se encontró usuario en sesión");
      return;
    }

    // Extraer el ID del usuario
    const usuarioObj = JSON.parse(usuarioString);
    const miId = usuarioObj.idUsuario;

    console.log("Cargando tareas para el usuario ID:", miId);

    try {
      // Llamada al backend para obtener las tareas del usuario
      const respuesta = await axios.get(
        `http://localhost:8080/api/tareas/usuario/${miId}`
      );

      // Filtro de entrada: Solo guardamos las activas
      const tareasActivas = respuesta.data.filter(t => t.estado === true);
      setTareas(tareasActivas);

    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  // Función para cambiar el estado de una tarea
  const cambiarEstadoTarea = async (idTarea, estadoActual) => {
    const nuevoEstado = !estadoActual; 

    try {
      // 1. Actualizar en BD
      await axios.patch(
        `http://localhost:8080/api/tareas/${idTarea}/estado?estado=${nuevoEstado}`
      );

      // 2. Actualizar VISUALMENTE
      setTareas(prevTareas => prevTareas.map(tarea => 
        tarea.idTarea === idTarea ? { ...tarea, estado: nuevoEstado } : tarea
      ));

      // 3. TIMER DE DESAPARICIÓN
      if (nuevoEstado === false) {
          console.log(`La tarea ${idTarea} desaparecerá en breve...`);
          setTimeout(() => {
              setTareas(prevTareas => prevTareas.filter(t => t.idTarea !== idTarea));
          }, 60000); // 1 minuto
      }

    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("No se pudo actualizar la tarea");

      cargarTareas(); // Revertir si falla
    }
  };

  return (
    <div className="container mt-5">
      <Navbar />
      
      <div className="row mt-4">
        <h2 className="mb-3">Mis Tareas</h2>
        
        {tareas.length === 0 ? (
          <div className="alert alert-info">No tienes tareas activas asignadas.</div>
        ) : (
          tareas.map((tarea) => (
            <div className="col-md-4 mb-3" key={tarea.idTarea || tarea.id}>
              {/* Tarjeta de tarea */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{tarea.titulo}</h5>
                  <p className="card-text">{tarea.descripcion}</p>
                  {/* Estado de la tarea */}
                  <span className={`badge ${tarea.estado ? "bg-success" : "bg-secondary"}`}>
                    {tarea.estado ? "Activa" : "Terminada"}
                  </span>

                  {/* Switch para cambiar estado */}
                  <div className="mt-3 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`switch-${tarea.idTarea}`} 
                        checked={!tarea.estado} 
                        onChange={() => cambiarEstadoTarea(tarea.idTarea, tarea.estado)}
                      />
                      <label className="form-check-label" htmlFor={`switch-${tarea.idTarea}`}>
                        {tarea.estado ? "Marcar como terminada" : "Tarea finalizada"}
                      </label>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
