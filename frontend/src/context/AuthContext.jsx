import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('tahra_access_token') || null;
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tahra_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Verify stored token on initial load
  useEffect(() => {
    async function verifyToken() {
      const savedToken = localStorage.getItem('tahra_access_token');
      if (savedToken) {
        try {
          const profile = await getCurrentUser(savedToken);
          setUser(profile);
          localStorage.setItem('tahra_auth_user', JSON.stringify(profile));
        } catch (err) {
          console.warn('Token expired or invalid, logging out:', err.message);
          logout();
        }
      }
      setIsLoadingAuth(false);
    }
    verifyToken();
  }, []);

  /**
   * Real Backend Login
   * @param {{ email: string, password: string }} credentials
   */
  const login = async (credentials) => {
    const authData = await loginUser(credentials);
    const accessToken = authData.access_token;
    const userProfile = authData.user;

    setToken(accessToken);
    setUser(userProfile);

    localStorage.setItem('tahra_access_token', accessToken);
    localStorage.setItem('tahra_auth_user', JSON.stringify(userProfile));

    return userProfile;
  };

  /**
   * Real Backend Registration
   * @param {{ email: string, password: string, name: string, company: string, whatsapp?: string }} userData
   */
  const register = async (userData) => {
    const authData = await registerUser(userData);
    const accessToken = authData.access_token;
    const userProfile = authData.user;

    setToken(accessToken);
    setUser(userProfile);

    localStorage.setItem('tahra_access_token', accessToken);
    localStorage.setItem('tahra_auth_user', JSON.stringify(userProfile));

    return userProfile;
  };

  /**
   * User Logout
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('tahra_access_token');
    localStorage.removeItem('tahra_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!user && !!token,
        isLoadingAuth,
        login,
        register,
        logout,
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
