import { Link } from '@tanstack/react-router';
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/api';
import type { AssignmentOut } from '@repo/api';

const tooltipProps = {
  arrow: true,
  enterDelay: 200,
  leaveDelay: 100,
  enterTouchDelay: 0,
};

type AssignmentsListHandlers = {
  onEdit?: (id: string) => void;
  activeEditId?: string | null;
  onDelete?: (id: string) => void;
  activeDeleteId?: string | null;
};

export type AssignmentsListViewProps = AssignmentsListHandlers & {
  assignments: Array<AssignmentOut>;
};

export function AssignmentsListView({
  assignments,
  onEdit,
  activeEditId,
  onDelete,
  activeDeleteId,
}: AssignmentsListViewProps) {
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
              <Stack direction="row" spacing={0.5}>
                {onEdit && (
                  <Tooltip
                    {...tooltipProps}
                    placement="top"
                    title="Edit assignment"
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEdit(assignment.id)}
                      aria-label="Edit assignment"
                      aria-pressed={activeEditId === assignment.id}
                      color={
                        activeEditId === assignment.id ? 'primary' : 'default'
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip
                    {...tooltipProps}
                    placement="top"
                    title="Delete assignment"
                  >
                    <IconButton
                      size="small"
                      onClick={() => onDelete(assignment.id)}
                      aria-label="Delete assignment"
                      aria-pressed={activeDeleteId === assignment.id}
                      color={
                        activeDeleteId === assignment.id ? 'warning' : 'default'
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Course: {assignment.courseId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due {dueDate ?? 'N/A'} • {assignment.points} pts
            </Typography>
            {assignment.latePolicy && (
              <Typography variant="body2" color="text.secondary">
                Late policy: {assignment.latePolicy}
              </Typography>
            )}
            {assignment.description && (
              <>
                <Divider flexItem />
                <Typography variant="body2">
                  {truncate(assignment.description, 240)}
                </Typography>
              </>
            )}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Tooltip
                {...tooltipProps}
                placement="top"
                title="View the full assignment details."
              >
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/assignments/$id"
                  params={{ id: assignment.id }}
                  preload="intent"
                >
                  View details
                </Button>
              </Tooltip>
              <Tooltip
                {...tooltipProps}
                placement="top"
                title="Jump to submissions for this assignment."
              >
                <Button
                  size="small"
                  component={Link}
                  to="/submissions"
                  search={{ assignment: assignment.id }}
                  preload="intent"
                  aria-label="Submit work"
                >
                  Submit work
                </Button>
              </Tooltip>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}

export default function AssignmentsList(props: AssignmentsListHandlers) {
  const { data: assignments = [] } = useSuspenseQuery({
    queryKey: ['assignments'],
    queryFn: () => fetchJSON<Array<AssignmentOut>>('/assignments'),
    staleTime: 60_000,
  });
  return <AssignmentsListView assignments={assignments} {...props} />;
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1)}…`;
}
