import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tahra_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const defaultUser = {
      name: userData?.name || 'Ahmad Rasyid',
      email: userData?.email || 'owner@sambaltahra.id',
      company: userData?.company || 'UMKM Nusantara',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${userData?.email || 'tahra'}`,
    };
    setUser(defaultUser);
    localStorage.setItem('tahra_auth_user', JSON.stringify(defaultUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tahra_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
