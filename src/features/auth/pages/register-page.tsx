import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import { routes } from '../../../config/routes';
import { RegisterForm } from '../components/register-form';

export const RegisterPage = () => (
  <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
    <Paper sx={{ width: '100%', maxWidth: 460, p: { xs: 3, sm: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Create account</Typography>
          <Typography color="text.secondary">Start managing your work</Typography>
        </Box>
        <RegisterForm />
        <Typography variant="body2">
          Already registered? <Link component={RouterLink} to={routes.login}>Sign in</Link>
        </Typography>
      </Stack>
    </Paper>
  </Box>
);
