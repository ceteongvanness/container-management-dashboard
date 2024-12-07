// frontend/src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { api } from '../utils/api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.access_token);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return { isAuthenticated, user, login, logout };
}