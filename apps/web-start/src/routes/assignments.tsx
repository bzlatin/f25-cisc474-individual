import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Skeleton, Stack, Typography } from '@mui/material';
import AssignmentsList from '../components/AssignmentsList';

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

function ListFallback() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} variant="rounded" height={96} />
      ))}
    </Stack>
  );
}

function AssignmentsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Assignments
      </Typography>
      <Suspense fallback={<ListFallback />}>
        <AssignmentsList />
      </Suspense>
    </Stack>
  );
}
