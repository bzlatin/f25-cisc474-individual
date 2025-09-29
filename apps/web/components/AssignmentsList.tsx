'use client';

import useSWR from 'swr';
import Link from 'next/link';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingIcon from '@mui/icons-material/Pending';

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

const fetcher = async (): Promise<Assignment[]> => {
  const res = await fetch(`${BASE}/assignments`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GET /assignments failed: ${res.status}`);
  return res.json();
};

function StatusIcon({ dueAt }: { dueAt?: string | null }) {
  if (!dueAt) {
    return (
      <Tooltip title="No due date">
        <CheckCircleIcon color="disabled" />
      </Tooltip>
    );
  }
  const due = new Date(dueAt).getTime();
  const now = Date.now();
  if (now <= due) {
    return (
      <Tooltip title="Open for submissions">
        <HourglassEmptyIcon color="success" />
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Past due">
      <PendingIcon color="warning" />
    </Tooltip>
  );
}

function formatDate(d?: string | null) {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AssignmentsList() {
  const { data: assignments } = useSWR<Assignment[]>('/assignments', fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    fallbackData: [],
  });

  if (!assignments?.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No assignments yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {assignments.map((a) => (
        <Card key={a.id} variant="outlined">
          <CardContent>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={1.5}
            >
              <Stack spacing={0.5}>
                <Typography variant="h6">{a.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Due {formatDate(a.dueAt)} • {a.points} pts
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <StatusIcon dueAt={a.dueAt} />
                <Button
                  component={Link}
                  href={`/assignments/${a.id}`}
                  variant="outlined"
                >
                  Open
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
