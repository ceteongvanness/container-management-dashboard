// frontend/src/utils/auth.ts
import { api } from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    roles: string[];
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};