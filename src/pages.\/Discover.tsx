// src/pages/Discover.tsx
import { useDiscover } from '../lib/useDiscover';

export default function DiscoverPage() {
  // Example filters you may add to your n8n webhook: vendor, region, limit, sort, search
  const { data, loading, error } = useDiscover({ limit: 60, sort: 'score_desc' });

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.map((p) => (
        <a key={p.product_uid} href={p.product_url ?? '#'} className="block border rounded p-3">
          <img src={p.image_url ?? ''} alt={p.name ?? ''} className="w-full h-56 object-cover rounded" />
          <div className="mt-2 font-medium">{p.name}</div>
          <div className="text-sm opacity-70">
            {p.price_currency ?? ''} {p.price_amount ?? ''}
          </div>
        </a>
      ))}
    </div>
  );
}
