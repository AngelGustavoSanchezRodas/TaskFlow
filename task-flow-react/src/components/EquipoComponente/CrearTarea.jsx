import React, { useState } from 'react';
import axios from 'axios';
import TareaFormBody from './TareaFormBody'; 

function CrearTarea({ show, onClose, onSuccess, idEquipo, miembros }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

  // Estado inicial
  const initialState = {
    titulo: "",
    descripcion: "",
    fechaFin: "",
    prioridad: false,
    idUsuarioAsignado: ""
  };

  const [tarea, setTarea] = useState(initialState);

  const handleCrear = async () => {
    // 1. Validaciones
    if (!tarea.titulo || !tarea.idUsuarioAsignado || !tarea.fechaFin) {
      alert("Por favor completa título, fecha y asigna un responsable.");
      return;
    }

    try {
      // 2. Preparar Payload
      const payload = {
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad,
        categoria: "General",
        fechaFin: new Date(tarea.fechaFin).toISOString(),
        idEquipo: idEquipo,
        idUsuarioCreador: usuarioLogueado.idUsuario,
        idUsuarioAsignado: parseInt(tarea.idUsuarioAsignado)
      };

      // 3. Llamada API
      await axios.post('http://localhost:8080/api/tareas/crearTarea', payload);
      
      alert("¡Tarea asignada exitosamente!");
      setTarea(initialState); // Resetear form
      onSuccess(); 
      onClose();

    } catch (error) {
      console.error("Error al crear tarea", error);
      alert("Error al asignar la tarea.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Asignar Nueva Tarea</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {/* 👇 Aquí inyectamos el formulario visual */}
            <TareaFormBody 
                tarea={tarea} 
                setTarea={setTarea} 
                miembros={miembros} 
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleCrear}>Asignar Tarea</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearTarea;