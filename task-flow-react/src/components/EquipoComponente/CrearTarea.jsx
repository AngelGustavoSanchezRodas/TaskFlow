import React, { useState } from 'react';
import TareaFormBody from './TareaFormBody'; 
import api from '../../api/axiosConfig';

function CrearTarea({ show, onClose, onSuccess, idEquipo, miembros }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario')) || {};

  const initialState = {
    titulo: "",
    descripcion: "",
    prioridad: false,
    idUsuarioAsignado: "",
    fechaFin: "" // 1. Inicializamos la fecha vacía
  };

  const [tarea, setTarea] = useState(initialState);

  const handleCrear = async () => {
    // 2. VALIDACIÓN: Ahora sí obligamos a que haya fecha
    if (!tarea.titulo || !tarea.idUsuarioAsignado || !tarea.fechaFin) {
      alert("Por favor completa título, asigna un responsable y una fecha de entrega.");
      return;
    }

    try {
      const payload = {
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad,
        categoria: "General",
        idEquipo: idEquipo,
        idUsuarioCreador: usuarioLogueado.idUsuario,
        idUsuarioAsignado: parseInt(tarea.idUsuarioAsignado),
        
        // 3. ENVÍO: Mandamos la fecha que elegiste en el calendario
        fechaFin: tarea.fechaFin 
      };

      await api.post('/tareas/crear', payload);
    
      alert("¡Tarea asignada exitosamente!");
      setTarea(initialState);
      onSuccess(); 
      onClose();

    } catch (error) {
      console.error("Error al crear tarea:", error);
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
