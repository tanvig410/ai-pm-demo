// src/lib/api.ts
export type DiscoverItem = {
  product_uid: string;
  name: string | null;
  image_url: string | null;
  product_url: string | null;
  price_amount: number | null;
  price_currency: string | null;
  vendor?: string | null;
  region?: string | null;
  score?: number | null;            // from product_ranking (if your flow joins it)
  reasoning?: string | null;        // optional
  midjourney_prompt?: string | null;// optional
};

const DISCOVER_WEBHOOK = import.meta.env.VITE_DISCOVER_WEBHOOK as string | undefined;
const DISCOVER_API_KEY  = import.meta.env.VITE_DISCOVER_API_KEY as string | undefined;

function assertEnv(name: string, value?: string) {
  if (!value) throw new Error(`${name} is missing. Set it in Netlify Environment variables.`);
}

export async function fetchDiscover(params?: Record<string, string | number | boolean | undefined>) {
  assertEnv('VITE_DISCOVER_WEBHOOK', DISCOVER_WEBHOOK);

  const url = new URL(DISCOVER_WEBHOOK!);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') url.searchParams.append(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...(DISCOVER_API_KEY ? { 'x-api-key': DISCOVER_API_KEY } : {}),
      'accept': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Discover HTTP ${res.status}: ${text}`);
  }
  return (await res.json()) as DiscoverItem[];
}

/** Add more endpoints as you create n8n webhooks */
export async function fetchRecommendations(productUid: string) {
  const url = import.meta.env.VITE_RECO_WEBHOOK as string | undefined;
  assertEnv('VITE_RECO_WEBHOOK', url);
  const u = new URL(url!);
  u.searchParams.set('product_uid', productUid);
  const res = await fetch(u.toString(), {
    headers: { ...(DISCOVER_API_KEY ? { 'x-api-key': DISCOVER_API_KEY } : {}) },
  });
  if (!res.ok) throw new Error(`Recommendations HTTP ${res.status}`);
  return res.json();
}

export async function fetchTechpack(productUid: string) {
  const url = import.meta.env.VITE_TECHPACK_WEBHOOK as string | undefined;
  assertEnv('VITE_TECHPACK_WEBHOOK', url);
  const u = new URL(url!);
  u.searchParams.set('product_uid', productUid);
  const res = await fetch(u.toString(), {
    headers: { ...(DISCOVER_API_KEY ? { 'x-api-key': DISCOVER_API_KEY } : {}) },
  });
  if (!res.ok) throw new Error(`Techpack HTTP ${res.status}`);
  return res.json();
}
