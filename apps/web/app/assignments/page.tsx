'use client';

import Link from 'next/link';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingIcon from '@mui/icons-material/Pending';

type Assignment = {
  id: string;
  title: string;
  course: string;
  due: string;
  status: 'Open' | 'Closed' | 'Grading';
};

const assignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Sorting Algorithms',
    course: 'CISC220',
    due: '2025-09-14',
    status: 'Open',
  },
  {
    id: 'a2',
    title: 'Web Forms & Routing',
    course: 'CISC474',
    due: '2025-09-18',
    status: 'Open',
  },
  {
    id: 'a3',
    title: 'Processes & wait()',
    course: 'CISC361',
    due: '2025-09-20',
    status: 'Grading',
  },
  {
    id: 'a4',
    title: 'Past Project',
    course: 'CISC220',
    due: '2025-09-01',
    status: 'Closed',
  },
];

function StatusIcon({ status }: { status: Assignment['status'] }) {
  if (status === 'Open') {
    return (
      <Tooltip title="Open for submissions">
        <HourglassEmptyIcon color="success" />
      </Tooltip>
    );
  }
  if (status === 'Grading') {
    return (
      <Tooltip title="Currently being graded">
        <PendingIcon color="warning" />
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Closed">
      <CheckCircleIcon color="disabled" />
    </Tooltip>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AssignmentsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Assignments
      </Typography>
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
                    {a.course} • Due {formatDate(a.due)}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <StatusIcon status={a.status} />
                  <Button
                    component={Link}
                    href={`/assignments/${a.id}`}
                    variant="outlined"
                  >
                    Open
                  </Button>
                  <Button
                    component={Link}
                    href={`/submissions?assignment=${a.id}`}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
