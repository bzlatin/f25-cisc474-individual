import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Stack, Typography, List, ListItem, ListItemText } from '@mui/material';
import { User } from '@repo/database';
import { fetchJSON } from '../lib/api';

export const Route = createFileRoute('/Users')({
  component: UsersPage,
});

function UsersPage() {
  const { data: users = [] } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => fetchJSON<User[]>('/users'),
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
