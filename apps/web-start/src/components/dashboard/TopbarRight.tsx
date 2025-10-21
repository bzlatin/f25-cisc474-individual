import { useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth0 } from '@auth0/auth0-react';

export default function TopbarRight({
  mode,
  onToggle,
}: {
  mode: 'light' | 'dark';
  onToggle: () => void;
}) {
  const { isAuthenticated, user, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const avatarLabel = useMemo(() => {
    if (!isAuthenticated) return '?';
    const name = user?.name?.trim();
    if (name) {
      const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
      if (initials) return initials;
    }
    const email = user?.email?.trim();
    if (email && email.length > 0) {
      return email[0]!.toUpperCase();
    }
    return '?';
  }, [isAuthenticated, user?.email, user?.name]);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) return;
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    handleCloseMenu();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip
        title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <IconButton onClick={onToggle} size="small">
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
      <IconButton
        onClick={handleOpenMenu}
        size="small"
        sx={{ p: 0 }}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        aria-controls={anchorEl ? 'user-menu' : undefined}
        disabled={!isAuthenticated}
      >
        <Avatar sx={{ width: 28, height: 28 }}>{avatarLabel}</Avatar>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </Stack>
  );
}
