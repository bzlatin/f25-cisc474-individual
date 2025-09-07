// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadIcon from '@mui/icons-material/Upload';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';

const main = [
  { href: '/', label: 'Dashboard', icon: <HomeIcon /> },
  { href: '/courses', label: 'Courses', icon: <SchoolIcon /> },
  { href: '/assignments', label: 'Assignments', icon: <AssignmentIcon /> },
];

const work = [
  { href: '/submissions', label: 'Submissions', icon: <UploadIcon /> },
  { href: '/gradebook', label: 'Gradebook', icon: <TableChartIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderSection = (
    items: { href: string; label: string; icon: React.ReactNode }[],
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
          it.href === '/'
            ? pathname === '/'
            : pathname === it.href || pathname.startsWith(it.href + '/');
        return (
          <ListItemButton
            key={it.href}
            component={Link}
            href={it.href}
            selected={selected}
            sx={{
              borderRadius: 1,
              mb: 0.5,
            }}
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
      {/* footer area if you want org/school badge, version, etc. */}
    </Box>
  );
}
