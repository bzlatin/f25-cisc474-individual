import { Suspense } from 'react';
import { Typography, Stack, Skeleton } from '@mui/material';
import AssignmentsList from '../../components/AssignmentsList';

export const dynamic = 'force-dynamic';

function ListFallback() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} variant="rounded" height={96} />
      ))}
    </Stack>
  );
}

export default function AssignmentsPage() {
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
