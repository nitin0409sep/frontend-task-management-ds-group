import { useMutation, useQuery } from '@tanstack/react-query';
import { authToken } from '../../../lib/auth-token';
import { authApi, type LoginInput, type RegisterInput } from './auth-api';

export const authKeys = {
  me: ['auth', 'me'] as const,
};

export const useMeQuery = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    enabled: Boolean(authToken.get()),
  });

export const useLoginMutation = () => useMutation({ mutationFn: (input: LoginInput) => authApi.login(input) });

export const useRegisterMutation = () =>
  useMutation({ mutationFn: (input: RegisterInput) => authApi.register(input) });
