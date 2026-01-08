import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditarTareaModal({ show, onClose, onSuccess, tarea }) {
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Cada vez que cambia la tarea seleccionada, rellenamos los campos
    useEffect(() => {
        if (tarea) {
            setNombre(tarea.titulo || ''); 
            setDescripcion(tarea.descripcion || '');
        }
    }, [tarea]);

    if (!show) return null;

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //  Llamamos al endpoint que acabamos de crear en Java
            await axios.put(`http://localhost:8080/api/tareas/editar/${tarea.idTarea}`, {
                nombre,
                descripcion
            });
            
            onSuccess(); // Recargamos la lista
            onClose();   // Cerramos el modal
        } catch (error) {
            console.error("Error al editar tarea", error);
            alert("No se pudo editar la tarea");
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header bg-warning text-white">
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-pencil-square me-2"></i>Editar Tarea
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">Título</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">Descripción</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-warning text-white fw-bold">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarTareaModal;