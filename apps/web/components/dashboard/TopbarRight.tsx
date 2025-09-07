// components/dashboard/TopbarRight.tsx
'use client';

import { IconButton, Tooltip, Avatar, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function TopbarRight({
  mode,
  onToggle,
}: {
  mode: 'light' | 'dark';
  onToggle: () => void;
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip
        title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <IconButton onClick={onToggle} size="small">
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
      <Avatar sx={{ width: 28, height: 28 }}>BZ</Avatar>
    </Stack>
  );
}
