import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../services/apiClient';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await api.get('/auth/me/');
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

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const response = await api.post('/auth/login/', {
        username,
        password
      });
      setCurrentUser(response.data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);
      await api.post('/auth/register/', userData);
      return true;
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout/', {});
      setCurrentUser(null);
      return true;
    } catch (err: any) {
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