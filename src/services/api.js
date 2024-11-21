import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://swgds-jucam-backend.onrender.com', // URL base del servicio
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
    login(credentials) {
      return apiClient.post('/auth/login', credentials);
    },
    forgotPassword(email) {
      return apiClient.post('/auth/forgot-password', { email });
    },
    resetPassword(token) {
      return apiClient.post(`/auth/reset-password?token=${token}`);
    },
    obtenerUsuarios() {
      return apiClient.get('/usuarios');
    },
    crearUsuario(usuario) {
      return apiClient.post('/usuarios', usuario);
    },
    obtenerUsuarioPorId(usuarioId) {
      return apiClient.get(`/usuarios/${usuarioId}`);
    },
    eliminarUsuario(usuarioId) {
      return apiClient.delete(`/usuarios/${usuarioId}`);
    },
    resetPasswordUsuario(usuarioId) {
      return apiClient.post(`/usuarios/${usuarioId}/reset-password`);
    },
};