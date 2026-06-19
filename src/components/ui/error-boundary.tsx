import { ErrorOutlined, Home, Refresh } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import { routes } from '../../config/routes';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route crashed', error, info.componentStack);
  }

  reset = () => this.setState({ hasError: false });

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <Paper elevation={0} sx={{ maxWidth: 560, mx: 'auto', p: { xs: 3, md: 4 }, border: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <ErrorOutlined color="error" sx={{ fontSize: 44 }} />
          <Stack spacing={0.75}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>Something went wrong</Typography>
            <Typography color="text.secondary">The page could not be rendered. Try again or go back to the dashboard.</Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button startIcon={<Refresh />} variant="outlined" onClick={this.reset}>Try again</Button>
            <Button startIcon={<Home />} variant="contained" href={routes.dashboard}>Dashboard</Button>
          </Stack>
        </Stack>
      </Paper>
    );
  }
}
