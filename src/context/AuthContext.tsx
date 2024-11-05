"use client";
import axiosInstance from '@/api/axiosInstance';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth.user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        senha: password,
      });

      const data = response.data;
      console.log(data);
      

      localStorage.setItem('auth.token', data.accessToken);
      localStorage.setItem('auth.user', JSON.stringify(data));

      setUser(data);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login falhou');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.user');
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
