import api from '../api/axiosConfig';

// ... login y register ...

export const editarPerfil = async (idUsuario, datos) => {
    try {
        // datos debe ser { nombre, apellido, correo }
        const response = await api.put(`/usuarios/editar/${idUsuario}`, datos);
        return response.data;
    } catch (error) {
        console.error("Error al editar perfil:", error);
        throw error;
    }
};