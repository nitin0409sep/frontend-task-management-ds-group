import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import { routes } from '../../../config/routes';
import { LoginForm } from '../components/login-form';

export const LoginPage = () => (
  <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
    <Paper sx={{ width: '100%', maxWidth: 440, p: { xs: 3, sm: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Task Manager</Typography>
          <Typography color="text.secondary">Sign in to continue</Typography>
        </Box>
        <LoginForm />
        <Typography variant="body2">
          New here? <Link component={RouterLink} to={routes.register}>Create an account</Link>
        </Typography>
      </Stack>
    </Paper>
  </Box>
);
