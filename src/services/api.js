import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.67.103.220:7775',
});

api.interceptors.request.use(async (config) => {
  // Declaramos um token manualmente para teste.
  const token = window.localStorage.getItem('token');

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
