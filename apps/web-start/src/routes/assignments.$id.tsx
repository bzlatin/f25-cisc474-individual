import { Suspense } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Stack,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Skeleton,
  Box,
} from '@mui/material';
import { API_BASE } from '../lib/api';
import { useSuspenseQuery } from '@tanstack/react-query';

type Assignment = {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  points: number;
  dueAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const Route = createFileRoute('/assignments/$id')({
  component: () => (
    <Suspense fallback={<AssignmentSkeleton />}>
      <AssignmentDetail />
    </Suspense>
  ),
});

function AssignmentDetail() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery({
    queryKey: ['assignments', id],
    queryFn: () => fetchAssignment(id),
    staleTime: 60_000,
  });

  if (!data) {
    return (
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          Assignment not found
        </Typography>
        <Button component={Link} to="/assignments" variant="contained">
          Back to assignments
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button component={Link} to="/assignments" variant="text">
          ← Back to assignments
        </Button>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" component="h1">
          {data.title}
        </Typography>
        <Chip
          label={new Date(data.dueAt ?? 0) > new Date() ? 'Open' : 'Closed'}
          color={new Date(data.dueAt ?? 0) > new Date() ? 'success' : 'default'}
          variant="outlined"
          size="small"
        />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Due {formatDate(data.dueAt)} • {data.points} pts
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography paragraph>
          {data.description || 'No description provided.'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Created {formatDate(data.createdAt)} • Updated {formatDate(data.updatedAt)}
        </Typography>
      </Paper>
    </Stack>
  );
}

function AssignmentSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={220} height={36} />
      <Skeleton variant="text" width={160} />
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Skeleton variant="text" height={28} width={140} />
        <Skeleton variant="rounded" height={120} sx={{ mt: 1 }} />
      </Paper>
    </Stack>
  );
}

async function fetchAssignment(id: string): Promise<Assignment | null> {
  const res = await fetch(`${API_BASE}/assignments/${id}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`GET /assignments/${id} failed: ${res.status}`);
  }

  return res.json() as Promise<Assignment>;
}

function formatDate(d?: string | null) {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
