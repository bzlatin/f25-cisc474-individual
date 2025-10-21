import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Log Out
    </Button>
  );
}

