import React, { useState, useEffect } from "react";
import { editarPerfil } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navigate = useNavigate();

  // Cargar datos actuales del localStorage al entrar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    await editarPerfil(user.idUsuario, formData);

    try {
      const dataActualizada = await editarPerfil(user.idUsuario, formData);

      // Actualizar el localStorage con los nuevos datos
      // para que el Navbar y otras partes de la app se enteren del cambio.
      const userActualizado = { ...user, ...dataActualizada };
      localStorage.setItem("user", JSON.stringify(userActualizado));

      setMensaje({ tipo: "success", texto: "¡Perfil actualizado!" });

      // Opcional: Redirigir tras 1.5 segundos
      setTimeout(() => navigate("/home"), 1500);

      Swal.fire({
        position: "top-end", // Notificación en la esquina
        icon: "success",
        title: "Perfil actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron actualizar los datos (el correo podría estar ocupado).",
      });
      setMensaje({
        tipo: "danger",
        texto: "Error al actualizar. El correo podría estar en uso.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Editar Mis Datos</h3>

        {mensaje.texto && (
          <div className={`alert alert-${mensaje.tipo}`} role="alert">
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/home")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
