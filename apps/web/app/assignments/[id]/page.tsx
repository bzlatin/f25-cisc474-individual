'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  Stack,
  Typography,
  Paper,
  Divider,
  Button,
  Tooltip,
  Chip,
} from '@mui/material';

// Mock assignments (ids should match your /assignments list)
const all = [
  {
    id: 'a1',
    title: 'Sorting Algorithms',
    course: 'CISC220',
    due: '2025-09-14',
    status: 'Open' as const,
  },
  {
    id: 'a2',
    title: 'Web Forms & Routing',
    course: 'CISC474',
    due: '2025-09-18',
    status: 'Open' as const,
  },
  {
    id: 'a3',
    title: 'Processes & wait()',
    course: 'CISC361',
    due: '2025-09-20',
    status: 'Grading' as const,
  },
  {
    id: 'a4',
    title: 'Past Project',
    course: 'CISC220',
    due: '2025-09-01',
    status: 'Closed' as const,
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AssignmentDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const a = useMemo(() => all.find((x) => x.id === id), [id]);
  if (!a) return notFound();

  return (
    <Stack spacing={2}>
      {/* Breadcrumb */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Button component={Link} href="/assignments" variant="text">
          ← Back
        </Button>
        <Typography variant="body2" color="text.secondary">
          /
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {a.course}
        </Typography>
      </Stack>

      {/* Title + meta */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" component="h1">
          {a.title}
        </Typography>
        <Chip
          label={a.status}
          color={
            a.status === 'Open'
              ? 'success'
              : a.status === 'Grading'
                ? 'warning'
                : 'default'
          }
          variant="outlined"
          size="small"
        />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {a.course} • Due {formatDate(a.due)}
      </Typography>

      {/* Body */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography paragraph>
          Implement the required functionality and follow submission
          instructions. Be sure to handle edge cases and include comments where
          appropriate.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Resources
        </Typography>
        <ul>
          <li>
            <Link href="#">Starter code</Link>
          </li>
          <li>
            <Link href="#">Rubric</Link>
          </li>
          <li>
            <Link href="#">Dataset</Link>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Submission
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Submit via the Submissions page. You can resubmit until the deadline.
        </Typography>
        <Tooltip title="Go to submissions">
          <Button
            component={Link}
            href={`/submissions?assignment=${a.id}`}
            variant="contained"
          >
            Submit Work
          </Button>
        </Tooltip>
      </Paper>
    </Stack>
  );
}
