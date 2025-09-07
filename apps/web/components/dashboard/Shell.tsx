'use client';

import { useState, ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  CssBaseline,
  useMediaQuery,
  Theme,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// tweak these to taste
const DRAWER_WIDTH = 260;

export default function DashboardShell({
  sidebar,
  topbarRight,
  children,
}: {
  sidebar: ReactNode; // sidebar content (nav)
  topbarRight?: ReactNode; // right side actions (theme toggle, avatar, etc.)
  children: ReactNode; // page content
}) {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);

  const drawer = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {sidebar}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        color="default"
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          ml: { md: `${DRAWER_WIDTH}px` },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!isMdUp && (
            <IconButton
              edge="start"
              onClick={() => setOpen(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            StudyStack
          </Typography>
          <Box sx={{ flex: 1 }} />
          {topbarRight}
        </Toolbar>
      </AppBar>

      {/* Left Drawer (temporary on mobile, permanent on desktop) */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMdUp ? 'permanent' : 'temporary'}
          open={isMdUp ? true : open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: (t) => `1px solid ${t.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          mt: { xs: 7, sm: 8 }, // offset for AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
