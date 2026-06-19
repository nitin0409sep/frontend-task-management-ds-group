import { DarkMode, LightMode, Logout } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useAuth } from '../../features/auth/context/use-auth';
import { useThemeMode } from '../../theme/use-theme-mode';

export const AppShell = ({ children }: PropsWithChildren) => {
  const auth = useAuth();
  const theme = useThemeMode();
  const navigate = useNavigate();
  const initials = auth.user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Toolbar sx={{ minHeight: 68, px: { xs: 2, md: 4 }, gap: 2 }}>
          <Box
            onClick={() => navigate(routes.dashboard)}
            sx={{ flex: 1, cursor: 'pointer', width: 'fit-content' }}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') navigate(routes.dashboard);
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>Task Manager</Typography>
            <Typography variant="body2" color="text.secondary">Work queue</Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', display: { xs: 'none', sm: 'flex' } }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}>{initials}</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>{auth.user?.name}</Typography>
              </Box>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
            <IconButton onClick={theme.toggleMode} aria-label="toggle theme">
              {theme.mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <Button startIcon={<Logout />} onClick={auth.logout} color="inherit" sx={{ fontWeight: 700 }}>Logout</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ width: '100%', maxWidth: 1160, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 3, md: 4 } }}>
        {children}
      </Box>
    </Box>
  );
};
