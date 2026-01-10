import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";
import CrearEquipoModal from "./CrearEquipoModal";
import UnirseEquipoModal from "./UnirseEquipoModal";

function Navbar() {
  // Hook de navegación
  const navigate = useNavigate();

  // 🛡️ PROTECCIÓN: Busca "user" O "usuario" para evitar errores si cambió el nombre
  const usuario = JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("usuario"));

  // Estados para controlar los modales
  const [showCrear, setShowCrear] = useState(false);
  const [showUnirse, setShowUnirse] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usuario"); // Borramos ambas por si acaso
    navigate("/");
  };

  // Función para refrescar la página si crean/unen a un equipo
  const handleSuccess = () => {
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
                <div className="d-flex align-items-center gap-3">
                  {/* Enlace al Perfil */}
                  <Link
                    to="/perfil"
                    className="text-decoration-none text-light fw-bold"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    Hola, {usuario.nombre || "Usuario"}
                  </Link>

                  {/* Botón Cerrar Sesión */}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </div> 
              )} 
            </div>
          </div>
        </div>
      </nav>

      <CrearEquipoModal
        show={showCrear}
        onClose={() => setShowCrear(false)}
        onSuccess={handleSuccess}
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