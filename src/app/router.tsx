import { lazy, Suspense, type ReactNode } from 'react';
import { Box, Paper, Skeleton, Stack } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/app-shell';
import { ErrorBoundary } from '../components/ui/error-boundary';
import { NotFoundPage } from '../components/ui/not-found-page';
import { routes } from '../config/routes';
import { useAuth } from '../features/auth/context/use-auth';

const DashboardPage = lazy(() => import('../features/tasks/pages/dashboard-page').then((module) => ({ default: module.DashboardPage })));
const LoginPage = lazy(() => import('../features/auth/pages/login-page').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('../features/auth/pages/register-page').then((module) => ({ default: module.RegisterPage })));
const TaskDetailPage = lazy(() => import('../features/tasks/pages/task-detail-page').then((module) => ({ default: module.TaskDetailPage })));
const TaskEditorPage = lazy(() => import('../features/tasks/pages/task-editor-page').then((module) => ({ default: module.TaskEditorPage })));

const ProtectedContentSkeleton = () => (
    <Stack spacing={3}>
      <Box>
        <Skeleton width={220} height={42} />
        <Skeleton width={160} height={24} />
      </Box>
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, border: 1, borderColor: 'divider' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Skeleton variant="rounded" height={56} sx={{ flex: 2 }} />
          <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
        </Stack>
      </Paper>
      <Stack spacing={1.5}>
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} variant="rounded" height={72} />
        ))}
      </Stack>
    </Stack>
);

const ProtectedRouteSkeleton = () => (
  <AppShell>
    <ProtectedContentSkeleton />
  </AppShell>
);

const GuestRouteSkeleton = () => (
  <Stack sx={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2 }}>
    <Paper sx={{ width: '100%', maxWidth: 460, p: { xs: 3, sm: 4 } }}>
      <Stack spacing={2.5}>
        <Box>
          <Skeleton width={230} height={42} />
          <Skeleton width={180} height={24} />
        </Box>
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={44} />
      </Stack>
    </Paper>
  </Stack>
);

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.isLoading) return <ProtectedRouteSkeleton />;
  if (!auth.isAuthenticated) return <Navigate to={routes.login} replace />;

  return (
    <AppShell>
      <ErrorBoundary>
        <Suspense fallback={<ProtectedContentSkeleton />}>{children}</Suspense>
      </ErrorBoundary>
    </AppShell>
  );
};


const AdminRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.isLoading) return <ProtectedRouteSkeleton />;
  if (!auth.isAuthenticated) return <Navigate to={routes.login} replace />;
  if (auth.user?.role !== 'admin') return <Navigate to={routes.dashboard} replace />;

  return (
    <AppShell>
      <ErrorBoundary>
        <Suspense fallback={<ProtectedContentSkeleton />}>{children}</Suspense>
      </ErrorBoundary>
    </AppShell>
  );
};

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  if (auth.isLoading) return <GuestRouteSkeleton />;
  if (auth.isAuthenticated) return <Navigate to={routes.dashboard} replace />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<GuestRouteSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
};


const NotFoundRoute = () => {
  const auth = useAuth();
  if (auth.isLoading) return <GuestRouteSkeleton />;

  const page = (
    <ErrorBoundary>
      <NotFoundPage />
    </ErrorBoundary>
  );

  return auth.isAuthenticated ? <AppShell>{page}</AppShell> : page;
};

export const AppRouter = () => (
  <Routes>
    <Route path={routes.login} element={<GuestRoute><LoginPage /></GuestRoute>} />
    <Route path={routes.register} element={<GuestRoute><RegisterPage /></GuestRoute>} />
    <Route path={routes.dashboard} element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
    <Route path={routes.newTask} element={<AdminRoute><TaskEditorPage mode="create" /></AdminRoute>} />
    <Route path="/tasks/:id" element={<PrivateRoute><TaskDetailPage /></PrivateRoute>} />
    <Route path="/tasks/:id/edit" element={<AdminRoute><TaskEditorPage mode="edit" /></AdminRoute>} />
    <Route path="*" element={<NotFoundRoute />} />
  </Routes>
);
