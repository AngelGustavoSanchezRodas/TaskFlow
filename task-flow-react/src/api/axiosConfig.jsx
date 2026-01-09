import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
    // La URL base se toma de las variables de entorno
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;