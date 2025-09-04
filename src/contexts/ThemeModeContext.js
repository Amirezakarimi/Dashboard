import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeModeContext = createContext({
  mode: 'system',
  setMode: (_m) => {},
  effectiveMode: 'light',
});

const baseTheme = {
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazir, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
};

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('themeMode') || 'system';
    } catch {
      return 'system';
    }
  });

  const prefersDark = typeof window !== 'undefined'
    ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;

  const effectiveMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;

  useEffect(() => {
    try { localStorage.setItem('themeMode', mode); } catch {}
    document.documentElement.setAttribute('data-theme', effectiveMode);
  }, [mode, effectiveMode]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // trigger re-render when system changes and mode === 'system'
      if (mode === 'system') {
        setMode('system');
      }
    };
    mql.addEventListener ? mql.addEventListener('change', handler) : mql.addListener(handler);
    return () => {
      mql.removeEventListener ? mql.removeEventListener('change', handler) : mql.removeListener(handler);
    };
  }, [mode]);

  const theme = useMemo(() => {
    const palette = effectiveMode === 'dark'
      ? {
          mode: 'dark',
          primary: { main: '#7c9fff' },
          secondary: { main: '#b39ddb' },
          background: { default: '#0b1220', paper: '#111827' },
          text: { primary: '#e5e7eb', secondary: '#9ca3af' },
        }
      : {
          mode: 'light',
          primary: { main: '#2563eb', light: '#3b82f6', dark: '#1d4ed8' },
          secondary: { main: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
          background: { default: '#f8fafc', paper: '#ffffff' },
          text: { primary: '#1e293b', secondary: '#64748b' },
        };

    return createTheme({
      ...baseTheme,
      palette,
    });
  }, [effectiveMode]);

  const value = useMemo(() => ({ mode, setMode, effectiveMode }), [mode, effectiveMode]);

  const handleSetMode = useCallback((next) => setMode(next), []);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode: handleSetMode, effectiveMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;


