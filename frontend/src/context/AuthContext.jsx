/**
 * Global Authentication Context & Provider
 * Manages user state, JWT token, role, login, logout,
 * and tracks is_temporary_password state for forced password reset.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('hms_token') || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hms_user') || 'null');
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Synchronize state to LocalStorage
  const saveAuthSession = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    if (authToken) {
      localStorage.setItem('hms_token', authToken);
      localStorage.setItem('hms_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('hms_token');
      localStorage.removeItem('hms_user');
    }
  };

  /**
   * Unified Login API Call
   */
  const login = async (email, password, roleHint = '') => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        roleHint
      });

      const { token: receivedToken, user: receivedUser } = response.data.data;
      saveAuthSession(receivedToken, receivedUser);
      return receivedUser;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update Password (clears temporary flag)
   */
  const updatePassword = async (oldPassword, newPassword) => {
    const res = await api.post('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword
    });

    // Update local temporary password state
    if (user) {
      const updatedUser = { ...user, is_temporary_password: false };
      saveAuthSession(token, updatedUser);
    }

    return res.data;
  };

  /**
   * Sign Out
   */
  const logout = () => {
    saveAuthSession(null, null);
    window.location.href = '/login';
  };

  const value = {
    token,
    user,
    role: user?.role || null,
    isAuthenticated: Boolean(token && user),
    isTemporaryPassword: Boolean(user?.is_temporary_password),
    loading,
    login,
    logout,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
