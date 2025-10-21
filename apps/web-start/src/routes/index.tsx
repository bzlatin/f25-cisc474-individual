import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const Route = createFileRoute('/')({
  component: RootRedirect,
});

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    navigate({ to: isAuthenticated ? '/home' : '/login', replace: true });
  }, [isLoading, isAuthenticated, navigate]);

  return null;
}
