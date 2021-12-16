import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.67.103.220:7775',
});

export default api;
