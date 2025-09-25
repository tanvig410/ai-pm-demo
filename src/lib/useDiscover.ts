// src/lib/useDiscover.ts
import { useEffect, useMemo, useState } from 'react';
import { fetchDiscover, type DiscoverItem } from './api';

export function useDiscover(params?: Record<string, string | number | boolean | undefined>) {
  const [data, setData] = useState<DiscoverItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // stable key so effects only rerun when params logically change
  const key = useMemo(() => JSON.stringify(params ?? {}), [params]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    fetchDiscover(params)
      .then((d) => { if (alive) setData(d); })
      .catch((e) => { if (alive) setError(e as Error); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [key]);

  return { data, loading, error };
}
