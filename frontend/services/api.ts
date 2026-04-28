function getApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    return "/_backend/api/v1";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/_backend/api/v1`;
  }

  return "http://localhost:8000/api/v1";
}

export async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Using fallback data for ${path}`);
    }

    return fallback;
  }
}
