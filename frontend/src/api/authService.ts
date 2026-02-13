import api from "./axios";
import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  User,
} from "../types";

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>(
      "/api/v1/auth/login",
      credentials,
    );
    return response.data;
  },

  // Register
  async register(data: RegisterRequest): Promise<User> {
    const response = await api.post<User>("/api/v1/auth/register", data);
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/api/v1/auth/me");
    return response.data;
  },
};
