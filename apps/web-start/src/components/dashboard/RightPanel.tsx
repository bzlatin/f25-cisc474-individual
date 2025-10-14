import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { fetchJSON } from '../../lib/api';
import type { AssignmentOut } from '@repo/api';
import type { SxProps, Theme } from '@mui/material';

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

export default function RightPanel() {
  const theme = useTheme();

  const { data: assignments = [] } = useSuspenseQuery({
    queryKey: ['assignments'],
    queryFn: () => fetchJSON<Array<AssignmentOut>>('/assignments'),
    staleTime: 60_000,
  });

  const { data: scores = [] } = useSuspenseQuery({
    queryKey: ['scores'],
    queryFn: () => fetchJSON<Array<Score>>('/scores'),
    staleTime: 60_000,
  });

  const { data: feedback = [] } = useSuspenseQuery({
    queryKey: ['feedback'],
    queryFn: () => fetchJSON<Array<Feedback>>('/feedback'),
    staleTime: 60_000,
  });

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

  const feedbackEntries = [...feedback]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)
    .map((f) => ({
      title: f.body.length > 300 ? `${f.body.slice(0, 300)}…` : f.body,
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
      <PanelCard
        title="To Do"
        items={todos}
        cardSx={cardSx}
        listItemSx={listItemSx}
      />
      <PanelCard
        title="Recent Grades"
        items={grades}
        cardSx={cardSx}
        listItemSx={listItemSx}
        emptyLabel="No grades yet."
      />
      <PanelCard
        title="Recent Feedback"
        items={feedbackEntries}
        cardSx={cardSx}
        listItemSx={listItemSx}
        emptyLabel="No feedback yet."
      />
    </Stack>
  );
}

function PanelCard({
  title,
  items,
  emptyLabel = 'Nothing to show.',
  cardSx,
  listItemSx,
}: {
  title: string;
  items: Array<{ title: string; meta?: string }>;
  emptyLabel?: string;
  cardSx: SxProps<Theme>;
  listItemSx: SxProps<Theme>;
}) {
  return (
    <Paper variant="outlined" sx={cardSx}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 800, letterSpacing: 0.2 }}
      >
        {title}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <List dense disablePadding>
        {items.map((item, i) => (
          <ListItem key={i} disableGutters sx={listItemSx}>
            <ListItemText
              primary={item.title}
              secondary={item.meta}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
        {items.length === 0 && (
          <ListItem disableGutters sx={listItemSx}>
            <ListItemText
              primary={emptyLabel}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}
