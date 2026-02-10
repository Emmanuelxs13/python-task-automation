/**
 * Authentication Context
 * Manages user authentication state globally
 * (To be implemented in Sprint 4)
 */

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    // TODO: Implement in Sprint 1/4
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // TODO: Implement in Sprint 1
    console.log("Login:", email);
  };

  const logout = () => {
    // TODO: Implement in Sprint 1
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
