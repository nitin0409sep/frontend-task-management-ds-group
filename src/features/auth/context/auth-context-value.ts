import { createContext } from 'react';
import type { AuthResponse, AuthUser } from '../../../types/auth';

export type AuthContextValue = {
  user?: AuthUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setSession: (response: AuthResponse) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
