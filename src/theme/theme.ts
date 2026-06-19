import { createTheme } from '@mui/material/styles';

export const buildTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#2563eb' },
      secondary: { main: '#0f766e' },
      background: {
        default: mode === 'light' ? '#f6f7fb' : '#101418',
        paper: mode === 'light' ? '#ffffff' : '#171c22',
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: ({ theme }) => ({
            color: theme.palette.error.main,
          }),
        },
      },
    },
  });
