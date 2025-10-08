import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { makeTheme } from '../theme';
import Shell from './dashboard/Shell';
import Sidebar from './dashboard/Sidebar';
import TopbarRight from './dashboard/TopbarRight';
import type { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
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
    setMode((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('mode', next);
      }
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
