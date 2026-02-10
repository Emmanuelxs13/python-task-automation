/**
 * Custom Hook - useAuth
 * Manages authentication logic
 * (To be fully implemented in Sprint 4)
 */

import { useState } from "react";
import apiClient from "../services/api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual login in Sprint 1
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual register in Sprint 1
      const response = await apiClient.post("/auth/register", {
        email,
        password,
        full_name: fullName,
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}
