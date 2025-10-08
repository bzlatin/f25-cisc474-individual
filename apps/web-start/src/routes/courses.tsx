import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Stack, Typography, Skeleton } from '@mui/material';
import CoursesList from '../components/CoursesList';

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

function ListFallback() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <Stack key={i} spacing={1}>
          <Skeleton variant="text" width={160} height={28} />
          <Skeleton variant="rounded" height={80} />
        </Stack>
      ))}
    </Stack>
  );
}

function CoursesPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Courses
      </Typography>
      <Typography variant="body1">
        Your enrolled courses will appear here.
      </Typography>

      <Suspense fallback={<ListFallback />}>
        <CoursesList />
      </Suspense>
    </Stack>
  );
}
