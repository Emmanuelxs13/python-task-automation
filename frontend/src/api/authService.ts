import api from "./axios.ts";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export const authService = {
  // Login
  async login(credentials: LoginCredentials) {
    const response = await api.post("/api/v1/auth/login", credentials);
    return response.data;
  },

  // Register
  async register(data: RegisterData) {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
