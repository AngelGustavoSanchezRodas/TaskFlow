import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        
        <div className="mb-4 text-muted">
            <i className="bi bi-robot display-1"></i>
        </div>

        <h2 className={styles.title}>¡Ups! Te has perdido en el espacio</h2>
        
        <p className={styles.description}>
            La página que buscas no existe, fue eliminada o nunca debió estar aquí. 
            No te preocupes, siempre puedes volver a la base.
        </p>

        <Link to="/home" className={`btn btn-primary ${styles.btnHome}`}>
            <i className="bi bi-house-door-fill me-2"></i> Volver al Inicio
        </Link>
    </div>
  );
}

export default NotFound;