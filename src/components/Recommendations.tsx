// src/components/Recommendations.tsx
import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../lib/api';

export function Recommendations({ productUid }: { productUid: string }) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let live = true;
    setLoading(true);
    fetchRecommendations(productUid)
      .then((d) => { if (live) setData(d); })
      .catch((e) => { if (live) setError(e as Error); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [productUid]);

  if (loading) return <div>Loading recommendations…</div>;
  if (error) return <div className="text-red-600">{error.message}</div>;
  if (!data?.length) return <div>No recommendations</div>;

  return (
    <ul className="space-y-3">
      {data.map((r: any) => (
        <li key={r.product_uid} className="border rounded p-3">
          <div className="font-medium">{r.name}</div>
          <div className="text-sm opacity-70">{r.reasoning}</div>
        </li>
      ))}
    </ul>
  );
}
