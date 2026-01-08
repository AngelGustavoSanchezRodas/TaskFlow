import React from 'react';

// Componente para el cuerpo del formulario de tarea
function TareaFormBody({ tarea, setTarea, miembros }) {
  
  // Función auxiliar para actualizar el estado más limpio
  const handleChange = (campo, valor) => {
    setTarea({ ...tarea, [campo]: valor });
  };

  return (
    <>
      {/* Título */}
      <div className="mb-3">
        <label className="form-label fw-bold">Título de la Tarea</label>
        <input 
          type="text" className="form-control" 
          value={tarea.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
        />
      </div>

      {/* Descripción */}
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea 
          className="form-control" rows="2"
          value={tarea.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        ></textarea>
      </div>

      <div className="row">
        {/* Fecha Límite */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Fecha Límite</label>
          <input 
            type="date" className="form-control"
            value={tarea.fechaFin}
            onChange={(e) => handleChange("fechaFin", e.target.value)}
          />
        </div>

        {/* Prioridad */}
        <div className="col-md-6 mb-3 d-flex align-items-end">
          <div className="form-check form-switch mb-2">
            <input 
              className="form-check-input" type="checkbox" id="prioridadSwitch"
              checked={tarea.prioridad}
              onChange={(e) => handleChange("prioridad", e.target.checked)}
            />
            <label className="form-check-label text-danger fw-bold" htmlFor="prioridadSwitch">
              ¡Es Urgente!
            </label>
          </div>
        </div>
      </div>

      {/* Selector de Miembros */}
      <div className="mb-3">
        <label className="form-label fw-bold text-primary">¿A quién se la asignas?</label>
        <select 
          className="form-select"
          value={tarea.idUsuarioAsignado}
          onChange={(e) => handleChange("idUsuarioAsignado", e.target.value)}
        >
          <option value="">Selecciona un miembro...</option>
          {miembros.map(m => (
            <option key={m.idUsuario} value={m.idUsuario}>
              {m.nombre} {m.apellido} ({m.rol})
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default TareaFormBody;