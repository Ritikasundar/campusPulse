import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campuspulse.onrender.com', // Render backend URL
});

export default api;
