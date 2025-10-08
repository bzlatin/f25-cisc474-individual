import { createTheme, ThemeOptions } from '@mui/material/styles';

export const makeTheme = (mode: 'light' | 'dark') => {
  const common: ThemeOptions = {
    palette: {
      mode,
      primary: { main: '#4f46e5' },
      secondary: { main: '#06b6d4' },
      success: { main: '#16a34a' },
      warning: { main: '#f59e0b' },
      error: { main: '#ef4444' },
      ...(mode === 'light'
        ? {
            background: { default: '#f7f7fb', paper: '#ffffff' },
            text: { primary: '#0f172a', secondary: '#475569' },
          }
        : {
            background: { default: '#0b1020', paper: '#0f172a' },
            text: { primary: '#e5e7eb', secondary: '#a7b0c0' },
          }),
    },
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
      h1: { fontWeight: 700, letterSpacing: -0.5 },
      h2: { fontWeight: 700, letterSpacing: -0.5 },
      h3: { fontWeight: 700, letterSpacing: -0.4 },
      h4: { fontWeight: 700, letterSpacing: -0.3 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'default' },
        styleOverrides: {
          root: {
            borderBottom:
              mode === 'light'
                ? '1px solid #eee'
                : '1px solid rgba(255,255,255,0.08)',
            backgroundImage: 'none',
          },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: 'lg' },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            colorScheme: mode,
            backgroundColor: mode === 'light' ? '#f7f7fb' : '#0b1020',
          },
        },
      },
    },
  };

  return createTheme(common);
};
