'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from './types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, company?: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialMode?: 'login' | 'register', defaultRole?: UserRole) => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_USERS: Record<UserRole, User> = {
  admin: {
    id: 'user-admin-1',
    name: 'Axel Torbante (Admin)',
    email: 'admin@axtorbante.com',
    role: 'admin',
    avatar: '/axel_portrait.jpg',
    company: 'Axel Torbante Consulting',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  user: {
    id: 'user-client-1',
    name: 'Sofía Navarro',
    email: 'sofia.navarro@empresa.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    company: 'Innovaciones Digitales S.L.',
    createdAt: new Date('2026-02-10').toISOString(),
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('axel_torbante_auth_user');
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const saveUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('axel_torbante_auth_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('axel_torbante_auth_user');
    }
  };

  const login = async (email: string, role?: UserRole) => {
    // Check if matches admin email or preset
    let targetRole: UserRole = role || (email.toLowerCase().includes('admin') || email.toLowerCase().includes('axtorbante.com') ? 'admin' : 'user');
    
    let loggedUser: User;
    if (targetRole === 'admin') {
      loggedUser = {
        ...PRESET_USERS.admin,
        email: email || PRESET_USERS.admin.email,
      };
    } else {
      loggedUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: 'user',
        company: 'Empresa Cliente',
        createdAt: new Date().toISOString(),
      };
    }

    saveUser(loggedUser);
    setIsAuthModalOpen(false);
  };

  const register = async (name: string, email: string, company?: string) => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'user',
      company: company?.trim() || 'Cliente',
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    saveUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      saveUser(PRESET_USERS.admin);
    } else {
      saveUser(PRESET_USERS.user);
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        switchRole,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
