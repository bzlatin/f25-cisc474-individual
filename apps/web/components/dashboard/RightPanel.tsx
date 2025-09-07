// components/dashboard/RightPanel.tsx
'use client';

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

type TodoItem = { title: string; meta: string };
type AnnItem = { title: string; meta: string };
type FeedbackItem = { title: string; meta: string };

export default function RightPanel({
  todos = [
    { title: 'Learning NextJS', meta: 'Sep 11 • CISC474' },
    { title: 'PLimited Direct Execution', meta: 'Sep 12 • CISC361' },
    { title: 'Resume Revisions 1', meta: 'Sep 14 • CISC498' },
  ],
  announcements = [
    { title: 'No Class 09/05', meta: 'CISC498' },
    { title: 'End of the Second Week…', meta: 'CISC361' },
    { title: '[ASSIGNMENT] Deadline…', meta: 'CISC361' },
  ],
  feedback = [
    { title: 'Create a Website', meta: 'CISC474 • “Great job!”' },
    { title: 'P:Processes', meta: 'CISC361 • 5/5' },
    { title: 'Book Reading: Ch. 1 & 2', meta: 'CISC361 • 5/5' },
  ],
}: {
  todos?: TodoItem[];
  announcements?: AnnItem[];
  feedback?: FeedbackItem[];
}) {
  const theme = useTheme();

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
    // Make sure long text wraps instead of being cut off:
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
      {/* To Do */}
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
        </List>
      </Paper>

      {/* Announcements */}
      <Paper variant="outlined" sx={cardSx}>
        <Typography variant="subtitle1" sx={titleSx}>
          Announcements
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List dense disablePadding>
          {announcements.map((a, i) => (
            <ListItem key={i} disableGutters sx={listItemSx}>
              <ListItemText
                primary={a.title}
                secondary={a.meta}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Recent Feedback */}
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
        </List>
      </Paper>
    </Stack>
  );
}
