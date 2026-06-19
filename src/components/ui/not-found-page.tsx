import { ArrowBack, Home } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={0} sx={{ maxWidth: 560, mx: 'auto', p: { xs: 3, md: 4 }, border: 1, borderColor: 'divider', textAlign: 'center' }}>
      <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
        <Stack spacing={0.75}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>404</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Page not found</Typography>
          <Typography color="text.secondary">The page you are trying to open does not exist.</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button startIcon={<ArrowBack />} variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
          <Button startIcon={<Home />} variant="contained" onClick={() => navigate(routes.dashboard)}>Dashboard</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
