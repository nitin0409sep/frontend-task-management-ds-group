import { apiClient } from '../../../lib/api-client';
import type { AuthResponse, AuthUser } from '../../../types/auth';

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  name: string;
};

export const authApi = {
  async login(input: LoginInput) {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', input);
    return data;
  },

  async register(input: RegisterInput) {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', input);
    return data;
  },

  async me() {
    const { data } = await apiClient.get<{ user: AuthUser }>('/auth/me');
    return data.user;
  },
};
