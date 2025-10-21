import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Stack, Typography } from '@mui/material';
import LoginButton from '../components/auth/LoginButton';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/home', replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <Stack spacing={2} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" component="h1">
        Welcome back
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Sign in to access your dashboard and manage your courses.
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Log in with Auth0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We use Auth0 to securely authenticate your account.
          </Typography>
          {isLoading ? (
            <Typography variant="body2" color="text.secondary">
              Checking session…
            </Typography>
          ) : (
            <LoginButton />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
