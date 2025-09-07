// app/providers.tsx
'use client';

import { ReactNode, useMemo, useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { makeTheme } from './theme';
import Shell from '../components/dashboard/Shell';
import Sidebar from '../components/dashboard/Sidebar';
import TopbarRight from '../components/dashboard/TopbarRight';

export default function AppProviders({ children }: { children: ReactNode }) {
  // Start with system preference, allow user override
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved =
      typeof window !== 'undefined'
        ? (localStorage.getItem('mode') as 'light' | 'dark' | null)
        : null;
    setMode(saved ?? (prefersDark ? 'dark' : 'light'));
  }, [prefersDark]);

  const theme = useMemo(() => makeTheme(mode), [mode]);
  const toggleMode = () => {
    setMode((m) => {
      const next = m === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') localStorage.setItem('mode', next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Shell
        sidebar={<Sidebar />}
        topbarRight={<TopbarRight mode={mode} onToggle={toggleMode} />}
      >
        {children}
      </Shell>
    </ThemeProvider>
  );
}
