import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Crucial for sending and receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here if needed, e.g., for global error handling
/*
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, e.g., if (error.response.status === 401) logoutUser();
    return Promise.reject(error);
  }
);
*/

export default API;
