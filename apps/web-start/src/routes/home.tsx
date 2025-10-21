import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import CoursesList from '../components/CoursesList';
import RightPanel from '../components/dashboard/RightPanel';

export const Route = createFileRoute('/home')({
  component: HomePage,
});

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login', replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!isAuthenticated) {
    return null; // Redirect handled above
  }

  return <DashboardView />;
}

function DashboardView() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
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
            <CoursesList />
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
        />

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

function DashboardSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={240} height={40} />
      <Box sx={{ display: 'flex', gap: 3 }}>
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
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={120}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Box sx={{ width: { xs: '100%', md: 320 }, pl: { md: 2 } }}>
          <Skeleton variant="rounded" height={240} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
    </Stack>
  );
}
