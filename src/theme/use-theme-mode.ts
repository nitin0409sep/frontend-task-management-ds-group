import { useContext } from 'react';
import { ThemeContext } from './theme-context-value';

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used inside AppThemeProvider');
  return context;
};
