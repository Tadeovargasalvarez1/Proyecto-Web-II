// Cliente Axios único. En la fase 2 se añade un interceptor que adjunta el JWT.
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getHealth = () => api.get('/health').then((res) => res.data);
