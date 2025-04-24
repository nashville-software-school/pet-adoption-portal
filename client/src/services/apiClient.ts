import axios from 'axios';

// Function to get cookies (only runs on client side)
export function getCookie(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue;
}

// Create a custom axios instance for API calls
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Always include credentials
});

// Set up interceptor to add CSRF token to every request
api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = getCookie('csrftoken');
    if (token) {
      config.headers['X-CSRFToken'] = token;
    }
  }
  return config;
});

export default api;