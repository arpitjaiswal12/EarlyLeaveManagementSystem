import axios from 'axios';

const api = axios.create({
  baseURL: 'https://early-leave-management-system.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



export default api;
