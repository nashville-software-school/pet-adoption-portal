import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/me/', {
          withCredentials: true
        });
        setCurrentUser(response.data);
      } catch (error) {
        // User is not logged in, that's okay
        console.log('User not logged in', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password
      }, {
        withCredentials: true
      });
      setCurrentUser(response.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      await axios.post('http://localhost:8000/api/auth/register/', userData);
      return true;
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout/', {}, {
        withCredentials: true
      });
      setCurrentUser(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Logout failed');
      return false;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;