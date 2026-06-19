import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import type { PropsWithChildren } from 'react';
import { AuthProvider } from '../features/auth/context/auth-context';
import { queryClient } from '../lib/query-client';
import { AppThemeProvider } from '../theme/theme-context';
import 'react-toastify/dist/ReactToastify.css';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppThemeProvider>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer position="top-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover />
      </AppThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
