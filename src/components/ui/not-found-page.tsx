import { ArrowBack, Home } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ minHeight: { xs: 'calc(100dvh - 156px)', md: 'calc(100dvh - 180px)' }, justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 780, mx: 'auto', p: { xs: 4.5, md: 7 }, border: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
          <Stack spacing={1}>
            <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1 }}>404</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Page not found</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>The page you are trying to open does not exist.</Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button size="large" startIcon={<ArrowBack />} variant="outlined" onClick={() => navigate(-1)}>Go back</Button>
            <Button size="large" startIcon={<Home />} variant="contained" onClick={() => navigate(routes.dashboard)}>Dashboard</Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
