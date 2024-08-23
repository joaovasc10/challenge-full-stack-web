import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // URL base da sua API
});

// Adiciona o token JWT a cada requisição se ele estiver no localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
