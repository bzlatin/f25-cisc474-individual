// apps/web/app/page.tsx
import { Suspense } from 'react';
import { Box, Stack, Typography, Divider, Skeleton } from '@mui/material';
import RightPanel from '../components/dashboard/RightPanel';
import CoursesList from '../components/CoursesList';

// Skeletons that match your left grid space while loading
function CoursesFallback() {
  return (
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
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={120}
          sx={{ borderRadius: 1 }}
        />
      ))}
    </Box>
  );
}

export default function HomePage() {
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
            <Suspense fallback={<CoursesFallback />}>
              <CoursesList />
            </Suspense>
          </Box>
        </Box>

        {/* Divider between left and right */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
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
          <Suspense fallback={<div />}>
            <RightPanel />
          </Suspense>
        </Box>
      </Box>
    </Stack>
  );
}
