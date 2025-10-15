// components/dashboard/RightPanel.tsx
'use client';

import useSWR from 'swr';
import {
  alpha,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { AssignmentOut } from '@repo/api';

type Score = {
  id: string;
  submissionId: string;
  points: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
};

type Feedback = {
  id: string;
  submissionId: string;
  authorId: string;
  body: string;
  createdAt: string;
};

const BASE = process.env.VITE_BACKEND_URL!;

const fetchJSON = <T,>(path: string) =>
  fetch(`${BASE}${path}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  }).then((r) => {
    if (!r.ok) throw new Error(`${path} -> ${r.status}`);
    return r.json() as Promise<T>;
  });

export default function RightPanel() {
  const theme = useTheme();

  const { data: assignments = [] } = useSWR<AssignmentOut[]>(
    '/assignments',
    () => fetchJSON<AssignmentOut[]>('/assignments'),
    { suspense: true, fallbackData: [], revalidateOnFocus: false },
  );

  const { data: scores = [] } = useSWR<Score[]>(
    '/scores',
    () => fetchJSON<Score[]>('/scores'),
    { suspense: true, fallbackData: [], revalidateOnFocus: false },
  );

  const { data: feedbackRaw = [] } = useSWR<Feedback[]>(
    '/feedback',
    () => fetchJSON<Feedback[]>('/feedback'),
    { suspense: true, fallbackData: [], revalidateOnFocus: false },
  );

  // Map data to display items
  const todos = [...assignments]
    .sort(
      (a, b) =>
        new Date(a.dueAt ?? 0).getTime() - new Date(b.dueAt ?? 0).getTime(),
    )
    .slice(0, 5)
    .map((a) => ({
      title: a.title,
      meta: a.dueAt
        ? `${new Date(a.dueAt).toLocaleDateString()} • ${a.points} pts`
        : `${a.points} pts • No due date`,
    }));

  const grades = [...scores]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)
    .map((s) => ({
      title: `${s.points} pts${s.comment ? ` • ${s.comment}` : ''}`,
      meta: new Date(s.createdAt).toLocaleDateString(),
    }));

  const feedback = [...feedbackRaw]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)
    .map((f) => ({
      title: f.body.length > 300 ? f.body.slice(0, 300) + '…' : f.body,
      meta: new Date(f.createdAt).toLocaleDateString(),
    }));

  const cardSx = {
    p: 2,
    borderRadius: 2,
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.03)
        : alpha(theme.palette.primary.main, 0.12),
    borderColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.15)
        : alpha(theme.palette.primary.main, 0.25),
  };

  const titleSx = { fontWeight: 800, letterSpacing: 0.2 };
  const listItemSx = {
    alignItems: 'flex-start',
    px: 0.5,
    py: 0.5,
    '& .MuiListItemText-root': {
      m: 0,
      wordBreak: 'break-word',
      whiteSpace: 'normal',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
      color:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.text.primary, 0.9)
          : alpha(theme.palette.text.primary, 0.95),
    },
    '& .MuiListItemText-secondary': {
      color:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.text.secondary, 0.8)
          : alpha(theme.palette.text.secondary, 0.75),
    },
  } as const;

  return (
    <Stack spacing={2}>
      {/* To Do (from /assignments) */}
      <Paper variant="outlined" sx={cardSx}>
        <Typography variant="subtitle1" sx={titleSx}>
          To Do
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List dense disablePadding>
          {todos.map((t, i) => (
            <ListItem key={i} disableGutters sx={listItemSx}>
              <ListItemText
                primary={t.title}
                secondary={t.meta}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
          {todos.length === 0 && (
            <ListItem disableGutters sx={listItemSx}>
              <ListItemText
                primary="Nothing due yet."
                secondary=""
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Recent Grades (from /scores) */}
      <Paper variant="outlined" sx={cardSx}>
        <Typography variant="subtitle1" sx={titleSx}>
          Recent Grades
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List dense disablePadding>
          {grades.map((g, i) => (
            <ListItem key={i} disableGutters sx={listItemSx}>
              <ListItemText
                primary={g.title}
                secondary={g.meta}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
          {grades.length === 0 && (
            <ListItem disableGutters sx={listItemSx}>
              <ListItemText
                primary="No grades yet."
                secondary=""
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Recent Feedback (from /feedback) */}
      <Paper variant="outlined" sx={cardSx}>
        <Typography variant="subtitle1" sx={titleSx}>
          Recent Feedback
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List dense disablePadding>
          {feedback.map((f, i) => (
            <ListItem key={i} disableGutters sx={listItemSx}>
              <ListItemText
                primary={f.title}
                secondary={f.meta}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
          {feedback.length === 0 && (
            <ListItem disableGutters sx={listItemSx}>
              <ListItemText
                primary="No feedback yet."
                secondary=""
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Stack>
  );
}
