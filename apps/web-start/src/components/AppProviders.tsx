import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { makeTheme } from '../theme';
import Shell from './dashboard/Shell';
import Sidebar from './dashboard/Sidebar';
import TopbarRight from './dashboard/TopbarRight';
import type { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  // System preference (avoid SSR mismatch)
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });

  // User override (null = follow system). Lazy init reads once from localStorage.
  const [overrideMode, setOverrideMode] = useState<'light' | 'dark' | null>(
    () => {
      if (typeof window === 'undefined') return null;
      const saved = localStorage.getItem('mode');
      return saved === 'light' || saved === 'dark' ? saved : null;
    },
  );

  // Effective mode
  const mode: 'light' | 'dark' =
    overrideMode ?? (prefersDark ? 'dark' : 'light');

  // Sync override to localStorage (effect updates external system only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (overrideMode) {
      localStorage.setItem('mode', overrideMode);
    } else {
      localStorage.removeItem('mode');
    }
  }, [overrideMode]);

  const theme = useMemo(() => makeTheme(mode), [mode]);

  const toggleMode = () => {
    // If no override yet, start from current effective mode
    const current = overrideMode ?? (prefersDark ? 'dark' : 'light');
    const next = current === 'light' ? 'dark' : 'light';
    setOverrideMode(next);
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
