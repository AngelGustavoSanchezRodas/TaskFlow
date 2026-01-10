import api from '../api/axiosConfig'; // Asegúrate que la ruta sea correcta

// ... tus otras funciones (crearEquipo, obtenerEquipos...) ...

export const salirDelEquipo = async (idEquipo, idUsuario) => {
    try {
        const response = await api.delete(`/equipos/${idEquipo}/salir/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error("Error al salir del equipo:", error);
        throw error;
    }
};