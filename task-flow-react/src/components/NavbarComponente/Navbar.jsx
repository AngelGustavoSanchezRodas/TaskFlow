import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";

// 👇 Importamos tus modales existentes
import CrearEquipoModal from "./CrearEquipoModal";
import UnirseEquipoModal from "./UnirseEquipoModal";

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estados para controlar los modales
  const [showCrear, setShowCrear] = useState(false);
  const [showUnirse, setShowUnirse] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  // Función para refrescar la página si crean/unen a un equipo (opcional)
  const handleSuccess = () => {
    // Si estamos en Home, recargamos para ver el nuevo equipo
    if (window.location.pathname === "/home") {
      window.location.reload();
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container">
          <Link className={`navbar-brand ${styles.brand}`} to="/home">
            <i className="bi bi-layers-fill me-2"></i>TaskFlow
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Busca esta parte dentro del <ul> y reemplázala */}
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="/home">
                  <i className="bi bi-grid-fill me-1"></i> Mis Equipos
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${styles.navLink}`}
                  onClick={() => setShowCrear(true)}
                >
                  <i className="bi bi-plus-square me-1"></i> Crear Equipo
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-link nav-link ${styles.navLink}`}
                  onClick={() => setShowUnirse(true)}
                >
                  <i className="bi bi-people-fill me-1"></i> Unirse a Equipo
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {usuario && (
                <span className="text-secondary me-3 small d-none d-md-block fw-bold">
                  Hola, {usuario.nombre}
                </span>
              )}
              <button
                className={`btn btn-sm rounded-pill px-3 ${styles.btnLogout}`}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 👇 RENDERIZAMOS LOS MODALES AQUÍ MISMO */}
      <CrearEquipoModal
        show={showCrear}
        onClose={() => setShowCrear(false)}
        onSuccess={handleSuccess} // Para actualizar si se crea uno
      />

      <UnirseEquipoModal
        show={showUnirse}
        onClose={() => setShowUnirse(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}

export default Navbar;
