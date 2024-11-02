import axios from 'axios';

const api = axios.create({
  baseURL: 'https://early-leave-management-system.vercel.app/api',
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
