// src/components/discover.data.ts

// --- Types that match your Discover needs ---
export type DiscoverRow = {
  product_uid: string;
  vendor: string | null;
  region?: string | null;
  name?: string | null;
  price_amount?: number | null;
  price_currency?: string | null;
  image_url: string | null;
  product_url: string | null;
  score?: number | null;        // from ranking join, if present
  updated_at?: string | null;   // optional if you return it
};

export type BrandCard = {
  id: string;
  title: string;    // display name (vendor)
  subtitle: string; // e.g. @zara
  url: string;      // image_url for the tile
  href?: string;    // click-through to product_url
};

// --- Fetch from n8n webhook (env-driven) ---
export async function fetchDiscover(): Promise<DiscoverRow[]> {
  const url = import.meta.env.VITE_DISCOVER_WEBHOOK;
  if (!url) throw new Error('VITE_DISCOVER_WEBHOOK is not set');

  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`Webhook error: ${res.status} ${res.statusText}`);

  const payload = await res.json();
  // n8n might send either an array or { data: [...] }
  const rows: DiscoverRow[] = Array.isArray(payload) ? payload : (payload.data ?? []);
  // Basic sanity clean-up: filter out items without image
  return rows.filter(r => !!r.image_url);
}

// --- Build your brand tiles from the raw rows ---
export function buildBrandCards(
  rows: DiscoverRow[],
  opts?: { limit?: number; vendors?: string[]; minScore?: number }
): BrandCard[] {
  const limit = opts?.limit ?? 5;
  const vendors = (opts?.vendors ?? []).map(v => v.toLowerCase());
  const minScore = opts?.minScore ?? 0;

  // optional filters
  const filtered = rows.filter(r => {
    const vendorOk = vendors.length ? vendors.includes((r.vendor ?? '').toLowerCase()) : true;
    const scoreOk = (r.score ?? 0) >= minScore;
    return vendorOk && scoreOk && !!r.vendor && !!r.image_url;
  });

  // group by vendor, pick top scored
  const byVendor = new Map<string, DiscoverRow[]>();
  filtered.forEach(r => {
    const key = r.vendor as string;
    if (!byVendor.has(key)) byVendor.set(key, []);
    byVendor.get(key)!.push(r);
  });

  const cards: BrandCard[] = [];
  for (const [vendor, items] of byVendor.entries()) {
    const top = items.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
    if (top && top.image_url) {
      cards.push({
        id: `brand-${vendor.toLowerCase().replace(/\W+/g, '-')}`,
        title: vendor,
        subtitle: `@${vendor.toLowerCase()}`,
        url: top.image_url,
        href: top.product_url ?? '#',
      });
    }
  }
  return cards.slice(0, limit);
}
