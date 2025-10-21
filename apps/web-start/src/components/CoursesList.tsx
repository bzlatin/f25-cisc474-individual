import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { fetchJSON } from '../lib/api';
import CourseCard from './CourseCard';

type Course = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
};

export default function CoursesList() {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const {
    data: courses = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchJSON<Array<Course>>('/courses'),
    staleTime: 60_000,
    enabled: isAuthenticated,
    retry: false,
  });

  if (authLoading) {
    return <CoursesSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ gridColumn: '1 / -1' }}>
        <Stack
          spacing={1}
          sx={{
            p: 2,
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Sign in to view courses
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use the login button to authenticate with Auth0 and load your courses.
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (isPending) {
    return <CoursesSkeleton />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return (
      <Typography color="error" sx={{ gridColumn: '1 / -1' }}>
        Failed to load courses: {message}
      </Typography>
    );
  }

  if (!courses.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ gridColumn: '1 / -1' }}>
        No courses yet.
      </Typography>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          code={course.code}
          title={course.title}
          color="#2563eb"
        />
      ))}
    </>
  );
}

function CoursesSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={120}
          sx={{ borderRadius: 1 }}
        />
      ))}
    </>
  );
}
