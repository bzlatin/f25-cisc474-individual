export const API_BASE = import.meta.env.VITE_BACKEND_URL ?? '';

export async function fetchJSON<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!API_BASE) {
    throw new Error(
      'Missing VITE_BACKEND_URL. Add it to apps/web-start/.env or the repo root so the frontend can reach the API.',
    );
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    ...init,
  });

  if (!res.ok) {
    const message = await safeReadError(res);
    throw new Error(`${res.status} ${res.statusText}: ${message}`);
  }

  return res.json() as Promise<T>;
}

async function safeReadError(res: Response) {
  try {
    const data = await res.json();
    if (data && typeof data === 'object' && 'message' in data) {
      return String((data as { message?: unknown }).message ?? '');
    }
    return JSON.stringify(data);
  } catch {
    try {
      return await res.text();
    } catch {
      return '';
    }
  }
}
