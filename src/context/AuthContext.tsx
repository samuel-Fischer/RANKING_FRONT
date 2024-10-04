"use client";
import axiosInstance from '@/api/axiosInstance';
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        senha: password,
      });

      const data = response.data;
      localStorage.setItem('auth.token', data.token.accessToken);
      localStorage.setItem('auth.user', JSON.stringify(data.usuario));

      setUser(data.usuario);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login falhou');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
