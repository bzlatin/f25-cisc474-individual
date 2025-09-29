'use client';

import { useParams, notFound } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
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

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const fetcher = async (id: string): Promise<Assignment | null> => {
  const res = await fetch(`${BASE}/assignments/${id}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /assignments/${id} failed: ${res.status}`);
  return res.json();
};

function formatDate(d?: string | null) {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: a, isLoading } = useSWR(id ? `/assignments/${id}` : null, () =>
    fetcher(id),
  );

  if (isLoading) {
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

  if (!a) return notFound();

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button component={Link} href="/assignments" variant="text">
          ← Back to assignments
        </Button>
      </Box>

      {/* Title + meta */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" component="h1">
          {a.title}
        </Typography>
        <Chip
          label={new Date(a.dueAt || 0) > new Date() ? 'Open' : 'Closed'}
          color={new Date(a.dueAt || 0) > new Date() ? 'success' : 'default'}
          variant="outlined"
          size="small"
        />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Due {formatDate(a.dueAt)} • {a.points} pts
      </Typography>

      {/* Body */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography paragraph>
          {a.description || 'No description provided.'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Created {formatDate(a.createdAt)} • Updated {formatDate(a.updatedAt)}
        </Typography>
      </Paper>
    </Stack>
  );
}
