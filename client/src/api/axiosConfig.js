import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campuspulse.onrender.com/api', // Render backend
  withCredentials: true,
});

export default api;
