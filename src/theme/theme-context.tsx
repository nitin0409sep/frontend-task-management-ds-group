import { useMemo, useState, type PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { buildTheme } from './theme';
import { ThemeContext, type ThemeContextValue, type ThemeMode } from './theme-context-value';

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = useMemo(() => buildTheme(mode), [mode]);
  const value = useMemo<ThemeContextValue>(
    () => ({ mode, toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')) }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
