import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fetchJSON } from '../lib/api';
import type { User } from '@repo/database';

export const Route = createFileRoute('/Users')({
  component: UsersPage,
});

function UsersPage() {
  const { data: users = [] } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => fetchJSON<Array<User>>('/users'),
    staleTime: 60_000,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Users
      </Typography>
      {users.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No users found.
        </Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}
