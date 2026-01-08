import React, { useState } from 'react';
import EditarTareaModal from './EditarTareaModal';

function TareasList({ tareas, onCambiarEstado, onEliminar, soyLider, miId, recargarTareas }) {
  
  const [showEditar, setShowEditar] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);

  // LOGICA 1: FILTRADO "LIMPIO"
  // Primero: Filtramos solo las tareas PENDIENTES (estado === true). 
  // Las completadas desaparecen de la vista.
  const tareasActivas = tareas.filter(t => t.estado === true);

  // Segundo: Aplicamos la regla de "Quién ve qué" sobre las tareas activas.
  const tareasVisibles = soyLider 
      ? tareasActivas // El líder ve TODAS las pendientes
      : tareasActivas.filter(t => t.idUsuarioAsignado === miId); // El usuario solo ve LAS SUYAS pendientes

  const abrirEdicion = (tarea) => {
      setTareaAEditar(tarea);
      setShowEditar(true);
  };

  // Mensajes personalizados según el caso
  if (!tareasVisibles || tareasVisibles.length === 0) {
      return (
          <div className="alert alert-success shadow-sm border-0 text-center">
              <i className="bi bi-check-circle-fill me-2 display-6 d-block mb-2 text-success"></i>
              <span className="fw-bold">¡Todo limpio!</span>
              <p className="mb-0 small text-muted">
                  {soyLider 
                    ? "No hay tareas pendientes en el equipo." 
                    : "No tienes tareas pendientes. ¡Excelente trabajo!"}
              </p>
          </div>
      );
  }

  return (
    <>
      <div className="list-group shadow-sm">
          {tareasVisibles.map((tarea) => {
              
              const esMiTarea = tarea.idUsuarioAsignado === miId;

              //  LOGICA 2: PERMISOS REFINADOS
              
              // PERMISO CHECKBOX: Solo el dueño de la tarea puede marcarla.
              // (El líder NO puede completar tareas de otros, solo las que se asigne a sí mismo)
              const permisoParaCompletar = esMiTarea; 

              // PERMISO ADMIN: Solo el líder puede editar texto o borrar la tarea.
              const esAdmin = soyLider; 

              return (
                <div key={tarea.idTarea} className="list-group-item list-group-item-action p-3 border-start-0 border-end-0 border-top-0 border-bottom">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        
                        {/* SECCIÓN IZQUIERDA: Checkbox y Datos */}
                        <div className="d-flex align-items-center">
                            <input 
                                type="checkbox" 
                                className="form-check-input me-3 p-2 rounded-circle"
                                // Como solo mostramos pendientes, el check siempre estará vacío visualmente
                                checked={false} 
                                
                                // Bloqueamos si no es MI tarea
                                disabled={!permisoParaCompletar}
                                
                                onChange={() => onCambiarEstado(tarea.idTarea, tarea.estado)}
                                style={{ 
                                    cursor: permisoParaCompletar ? 'pointer' : 'not-allowed',
                                    opacity: permisoParaCompletar ? 1 : 0.3 
                                }}
                                title={permisoParaCompletar ? "Marcar como finalizada" : "Solo el responsable puede finalizarla"}
                            />
                            <div>
                                <h6 className="mb-1 fw-bold text-dark">
                                    {tarea.nombre}
                                </h6>
                                <small className="text-muted d-block">{tarea.descripcion}</small>
                                
                                {/* Badge informativo */}
                                {tarea.nombreUsuarioAsignado && (
                                    <div className="mt-2">
                                        <span className={`badge border ${esMiTarea ? 'bg-primary text-white' : 'bg-light text-secondary'}`}>
                                            <i className="bi bi-person-fill me-1"></i>
                                            {esMiTarea ? "Mi responsabilidad" : `Asignada a: ${tarea.nombreUsuarioAsignado}`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SECCIÓN DERECHA: Botones de Gestión (Solo Líder) */}
                        <div className="d-flex gap-2">
                          {esAdmin && (
                              <>
                                  <button 
                                      className="btn btn-outline-secondary btn-sm border-0"
                                      onClick={() => abrirEdicion(tarea)}
                                      title="Editar Tarea"
                                  >
                                      <i className="bi bi-pencil"></i>
                                  </button>

                                  <button 
                                      className="btn btn-outline-danger btn-sm border-0"
                                      onClick={() => onEliminar(tarea.idTarea)}
                                      title="Eliminar Tarea"
                                  >
                                      <i className="bi bi-trash"></i>
                                  </button>
                              </>
                          )}
                        </div>
                    </div>
                </div>
              );
          })}
      </div>

      <EditarTareaModal 
          show={showEditar}
          onClose={() => setShowEditar(false)}
          tarea={tareaAEditar}
          onSuccess={recargarTareas} 
      />
    </>
  );
}

export default TareasList;