// src/components/TechpackButton.tsx
import { useState } from 'react';
import { fetchTechpack } from '../lib/api';

export function TechpackButton({ productUid }: { productUid: string }) {
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    try {
      setBusy(true); setErr(null);
      const result = await fetchTechpack(productUid);
      setOut(result);
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <button disabled={busy} onClick={run} className="btn">
        {busy ? 'Generating…' : 'Generate AI Techpack'}
      </button>
      {err && <div className="text-red-600 mt-2">{err}</div>}
      {out && <pre className="mt-3 bg-gray-50 p-3 rounded text-xs overflow-auto">
        {JSON.stringify(out, null, 2)}
      </pre>}
    </div>
  );
}
