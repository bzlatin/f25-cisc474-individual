import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Paper, Stack, Typography, Button, Chip, Divider } from '@mui/material';
import { fetchJSON } from '../lib/api';

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

export default function AssignmentsList() {
  const { data: assignments = [] } = useSuspenseQuery({
    queryKey: ['assignments'],
    queryFn: () => fetchJSON<Assignment[]>('/assignments'),
    staleTime: 60_000,
  });

  if (!assignments.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No assignments available yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {assignments.map((assignment) => {
        const dueDate = assignment.dueAt
          ? new Date(assignment.dueAt).toLocaleString()
          : null;
        const isOpen = assignment.dueAt
          ? new Date(assignment.dueAt) > new Date()
          : true;

        return (
          <Paper
            key={assignment.id}
            variant="outlined"
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6">{assignment.title}</Typography>
              <Chip
                size="small"
                label={isOpen ? 'Open' : 'Closed'}
                color={isOpen ? 'success' : 'default'}
                variant="outlined"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Due {dueDate ?? 'N/A'} • {assignment.points} pts
            </Typography>
            {assignment.description && (
              <>
                <Divider flexItem />
                <Typography variant="body2">
                  {truncate(assignment.description, 240)}
                </Typography>
              </>
            )}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Link
                to="/assignments/$id"
                params={{ id: assignment.id }}
                preload="intent"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained" size="small" component="span">
                  View details
                </Button>
              </Link>
              <Link
                to="/submissions"
                search={{ assignment: assignment.id }}
                preload="intent"
                style={{ textDecoration: 'none' }}
              >
                <Button size="small" component="span">
                  Submit work
                </Button>
              </Link>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1)}…`;
}
