'use client';

import { Box, Stack, Typography, Divider } from '@mui/material';
import RightPanel from '../components/dashboard/RightPanel';
import CourseCard from '../components/CourseCard';

export default function HomePage() {
  const courses = [
    {
      code: 'CISC474',
      title: 'Web Applications',
      color: '#2563eb',
      nextDue: 'Project Draft — Sep 15',
    },
    {
      code: 'CISC361',
      title: 'Operating Systems',
      color: '#16a34a',
      nextDue: 'Processes Lab — Sep 18',
    },
    {
      code: 'CISC220',
      title: 'Data Structures',
      color: '#f59e0b',
      nextDue: 'Sorting Assignment — Sep 20',
    },
  ];

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        {/* LEFT: Course cards */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
              },
              gap: 2,
            }}
          >
            {courses.map((c) => (
              <CourseCard
                key={c.code}
                code={c.code}
                title={c.title}
                color={c.color}
                nextDue={c.nextDue}
              />
            ))}
          </Box>
        </Box>

        {/* Divider between left and right */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />

        {/* RIGHT: Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', md: 320 },
            position: { md: 'sticky' },
            top: { md: 24 },
            alignSelf: 'flex-start',
            pl: { md: 2 },
          }}
        >
          <RightPanel />
        </Box>
      </Box>
    </Stack>
  );
}
