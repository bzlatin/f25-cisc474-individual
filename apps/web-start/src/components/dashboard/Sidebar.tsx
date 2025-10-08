import { Link, useRouterState } from '@tanstack/react-router';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TableChartIcon from '@mui/icons-material/TableChart';
import UploadIcon from '@mui/icons-material/Upload';
import type { ReactNode } from 'react';

const main = [
  { to: '/', label: 'Dashboard', icon: <HomeIcon /> },
  { to: '/courses', label: 'Courses', icon: <SchoolIcon /> },
  { to: '/assignments', label: 'Assignments', icon: <AssignmentIcon /> },
];

const work = [
  { to: '/submissions', label: 'Submissions', icon: <UploadIcon /> },
  { to: '/gradebook', label: 'Gradebook', icon: <TableChartIcon /> },
];

export default function Sidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const renderSection = (
    items: Array<{ to: string; label: string; icon: ReactNode }>,
    title?: string,
  ) => (
    <List
      dense
      subheader={
        title ? (
          <ListSubheader sx={{ lineHeight: 2.5, fontWeight: 700 }}>
            {title}
          </ListSubheader>
        ) : undefined
      }
    >
      {items.map((it) => {
        const selected =
          it.to === '/'
            ? pathname === '/'
            : pathname === it.to || pathname.startsWith(`${it.to}/`);
        return (
          <ListItemButton
            key={it.to}
            component={Link}
            to={it.to}
            preload="intent"
            selected={selected}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {renderSection(main, 'Main')}
      <Divider sx={{ my: 1 }} />
      {renderSection(work, 'Work')}
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
