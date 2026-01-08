import React from 'react';

function MiembrosList({ miembros, cargando }) {
  return (
    <div className="card shadow-sm h-100">
        <div className="card-header bg-white fw-bold">
            <i className="bi bi-people me-2"></i> Miembros del Equipo
        </div>
        <div className="card-body p-0">
            {cargando ? (
                <div className="p-4 text-center">Cargando compañeros...</div>
            ) : (
                <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {miembros.map((miembro) => (
                            <tr key={miembro.idUsuario}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3" style={{width: '35px', height: '35px'}}>
                                            {miembro.nombre ? miembro.nombre.charAt(0).toUpperCase() : "?"}
                                        </div>
                                        <div>
                                            <div className="fw-bold">{miembro.nombre} {miembro.apellido}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${miembro.rol === 'LIDER' ? 'bg-warning text-dark' : 'bg-info'}`}>
                                        {miembro.rol}
                                    </span>
                                </td>
                                <td className="text-muted small">{miembro.correo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  );
}

export default MiembrosList;