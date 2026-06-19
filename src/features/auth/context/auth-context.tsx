import { useEffect, useMemo, type PropsWithChildren } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { authToken } from '../../../lib/auth-token';
import { queryClient } from '../../../lib/query-client';
import { useMeQuery } from '../api/auth-queries';
import { AuthContext, type AuthContextValue } from './auth-context-value';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const meQuery = useMeQuery();

  useEffect(() => {
    if (!axios.isAxiosError(meQuery.error) || meQuery.error.response?.status !== 401) return;
    authToken.clear();
    queryClient.removeQueries({ queryKey: ['auth', 'me'] });
  }, [meQuery.error]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: meQuery.data,
      isLoading: meQuery.isLoading,
      isAuthenticated: Boolean(meQuery.data),
      setSession(response) {
        authToken.set(response.token);
        queryClient.setQueryData(['auth', 'me'], response.user);
      },
      logout() {
        authToken.clear();
        queryClient.clear();
        navigate(routes.login);
      },
    }),
    [meQuery.data, meQuery.isLoading, navigate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
