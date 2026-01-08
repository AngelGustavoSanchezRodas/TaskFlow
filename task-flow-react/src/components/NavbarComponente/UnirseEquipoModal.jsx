import React, { useState } from 'react';
import axios from 'axios';

function UnirseEquipoModal({ show, onClose, onSuccess }) {
  // Estado local para el ID
  const [idEquipoUnirse, setIdEquipoUnirse] = useState("");

  // Función para manejar la unión al equipo
  const handleUnirse = async () => {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) return;
    const usuarioObj = JSON.parse(usuarioString);

    try {
      // Llamada a la API para unirse al equipo
      await axios.post(
        `http://localhost:8080/api/equipo/unirseAlEquipo?idEquipo=${idEquipoUnirse}&idUsuario=${usuarioObj.idUsuario}`
      );
      
      alert("¡Te has unido al equipo exitosamente!");
      setIdEquipoUnirse(""); // Limpiar input
      
      // Avisamos al padre y cerramos
      onSuccess();
      onClose();

    } catch (error) {
      console.error("Error al unirse al equipo", error);
      alert("No se pudo unir al equipo. Verifica el ID.");
    }
  };

  // No renderizamos nada si show es false
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* Boton para unirse a un equipo */}
            <h5 className="modal-title">Unirse a un Equipo</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
            {/* Boton para unirse a un equipo */}
          </div>
          <div className="modal-body">
            <p>Ingresa el ID del equipo al que deseas unirte.</p>
            <div className="mb-3">
              <label className="form-label">ID del Equipo</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ej: 10"
                value={idEquipoUnirse}
                onChange={(e) => setIdEquipoUnirse(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-success" onClick={handleUnirse}>Unirse</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnirseEquipoModal;