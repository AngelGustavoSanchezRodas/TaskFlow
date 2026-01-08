import React from 'react';
import styles from '../../styles/TeamDashboard.module.css';

function TareasList({ tareas, onCambiarEstado, onEliminar, soyLider, miId }) {
  
    // Función para obtener la clase de borde según el estado y prioridad
  const getClaseBorde = (tarea) => {
    if (!tarea.estado) return styles.borderFinalizada; 
    if (tarea.prioridad) return styles.borderUrgente;  
    return styles.borderNormal;                        
  };

  return (
    <div className="card shadow-sm h-100 border-0">
        <div className="card-header bg-white fw-bold d-flex justify-content-between py-3">
            <span className="text-dark"><i className="bi bi-kanban me-2 text-primary"></i> Tablero de Tareas</span>
            <span className="badge bg-primary rounded-pill">{tareas.length}</span>
        </div>
        
        <div className="card-body bg-light p-3" style={{maxHeight: '600px', overflowY: 'auto'}}>
            
            {tareas.length === 0 ? (
                <div className="text-center text-muted py-5">
                    <i className="bi bi-clipboard2-data display-1 opacity-25"></i>
                    <p className="mt-3 fw-bold">¡Todo limpio!</p>
                    <small>No hay tareas pendientes en este equipo.</small>
                </div>
            ) : (
                tareas.map((tarea) => {
                    const esMiTarea = Number(tarea.idUsuarioAsignado) === Number(miId);
                    
                    return (
                        
                        <div 
                            className={`card mb-3 shadow-sm ${styles.taskCard} ${getClaseBorde(tarea)}`} 
                            key={tarea.idTarea}
                        >
                            <div className="card-body p-3">
                                
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        {/* Badge de Urgente */}
                                        {tarea.prioridad && tarea.estado && (
                                            <span className="badge bg-danger mb-2 me-1">🔥 URGENTE</span>
                                        )}
                                        
                                        <h6 className={`card-title fw-bold mb-1 ${!tarea.estado ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                                            {tarea.titulo}
                                        </h6>
                                    </div>

                                    {/* Botón Eliminar (Solo Líder) */}
                                    {soyLider && (
                                        <button 
                                            className="btn btn-light text-danger btn-sm rounded-circle d-flex align-items-center justify-content-center border" 
                                            onClick={() => onEliminar(tarea.idTarea)}
                                            title="Eliminar tarea"
                                            style={{ width: '30px', height: '30px' }}
                                        >
                                            <i className="bi bi-trash-fill small"></i>
                                        </button>
                                    )}
                                </div>
                                
                                <p className="card-text text-secondary mb-3 mt-1" style={{fontSize: '0.9rem'}}>
                                    {tarea.descripcion}
                                </p>
                                
                                {/* Footer de la tarjeta */}
                                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style={{width:'25px', height:'25px', fontSize:'0.7rem'}}>
                                            {tarea.nombreResponsable ? tarea.nombreResponsable.charAt(0) : '?'}
                                        </div>
                                        <small className="text-muted fw-bold" style={{fontSize: '0.8rem'}}>
                                            {tarea.nombreResponsable}
                                        </small>
                                    </div>

                                    {/* Switch (Solo Responsable) */}
                                    {esMiTarea && (
                                        <div className="form-check form-switch m-0">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                role="switch"
                                                checked={!tarea.estado} 
                                                onChange={() => onCambiarEstado(tarea.idTarea, tarea.estado)}
                                                style={{cursor: 'pointer', width: '2.5em', height: '1.25em'}}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    );
                })
            )}

        </div>
    </div>
  );
}

export default TareasList;