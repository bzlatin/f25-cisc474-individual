import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import type { PropsWithChildren } from 'react';

let getTokenSilentlyRef: (() => Promise<string | undefined>) | null = null;

function TokenBridge() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Store a function that returns a token when available
  getTokenSilentlyRef = async () => {
    if (!isAuthenticated) return undefined;
    try {
      return await getAccessTokenSilently();
    } catch {
      return undefined;
    }
  };
  return null;
}

export async function getAccessToken(): Promise<string | undefined> {
  if (typeof window === 'undefined') return undefined;
  if (getTokenSilentlyRef) return getTokenSilentlyRef();
  return undefined;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as
    | string
    | undefined;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined;
  const scopeInput = import.meta.env.VITE_AUTH0_SCOPE as
    | string
    | undefined;
  const scope =
    scopeInput && scopeInput.trim().length > 0
      ? scopeInput
      : 'openid profile email';
  const redirectUri = (import.meta.env.VITE_AUTH0_CALLBACK_URL as
    | string
    | undefined) ?? `${window.location.origin}/home`;

  if (!domain || !clientId) {
    if (import.meta.env.DEV) {
      console.warn(
        'Auth0 disabled: missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID',
      );
    }
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUri,
        scope,
      }}
    >
      <TokenBridge />
      {children}
    </Auth0Provider>
  );
}
