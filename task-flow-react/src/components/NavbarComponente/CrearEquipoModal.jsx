import React, { useState } from "react";
import api from '../../api/axiosConfig';

function CrearEquipoModal({ show, onClose, onSuccess }) {
  // Estado local del formulario
  const [nuevoEquipo, setNuevoEquipo] = useState({ nombre: "", categoria: "" });

  // Función para manejar la creación del equipo
  const handleCrear = async () => {
    const usuarioString = localStorage.getItem("usuario");
    if (!usuarioString) return;
    const usuarioObj = JSON.parse(usuarioString);

    try {
      // Llamada a la API para crear el equipo
      await api.post(`/equipo/crearEquipo?idUsuario=${usuarioObj.idUsuario}`, {
        nombre: nuevoEquipo.nombre,
        categoria: nuevoEquipo.categoria,
      });

      alert("¡Equipo creado! Ahora eres el Líder.");
      setNuevoEquipo({ nombre: "", categoria: "" }); // Limpiar formulario

      // Avisamos al padre (Navbar) que todo salió bien para que actualice la lista
      onSuccess();
      onClose(); // Cerramos el modal
    } catch (error) {
      console.error("Error al crear equipo", error);
      alert("Error al crear el equipo.");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Nuevo Equipo</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nombre del Equipo</label>
              <input
                type="text"
                className="form-control"
                value={nuevoEquipo.nombre}
                onChange={(e) =>
                  setNuevoEquipo({ ...nuevoEquipo, nombre: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={nuevoEquipo.categoria}
                onChange={(e) =>
                  setNuevoEquipo({ ...nuevoEquipo, categoria: e.target.value })
                }
              >
                <option value="">Selecciona una opción...</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Marketing">Marketing</option>
                <option value="Diseño">Diseño</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCrear}
            >
              Crear Equipo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearEquipoModal;
