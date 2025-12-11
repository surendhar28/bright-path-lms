import React, { createContext, useContext, useState, ReactNode } from 'react';
import { users, CREDENTIALS } from '@/data/dummyData';

type UserRole = 'learner' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  const login = (email: string, password: string): boolean => {
    if (email === CREDENTIALS.learner.email && password === CREDENTIALS.learner.password) {
      setUser(users.learner as User);
      setRole('learner');
      return true;
    }
    if (email === CREDENTIALS.admin.email && password === CREDENTIALS.admin.password) {
      setUser(users.admin as User);
      setRole('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
