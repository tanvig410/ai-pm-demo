// src/components/ImageDetailModal.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: { id: string; url: string; alt: string };
  onFindSimilar: (imageId: string) => void;
}

type Row = {
  product_uid?: string;
  native_product_id?: string | number;
  product_url?: string;
  vendor?: string;
  title?: string;
  name?: string;
  price?: string | number;
  currency?: string;
  material?: string;
  materials?: string;
  size_range?: string;
  sizes?: string;
  color_options?: string | string[];
  colors?: string | string[];
  region?: string;
  article_code?: string;
  created_at?: string;
  date?: string;

  image_url?: string;
  primary_image_url?: string;
  image_urls?: string[];                // array if available
  additional_image_urls?: string;       // comma-separated string
};

const WEBHOOK = import.meta.env.VITE_DISCOVER_WEBHOOK;

/** Normalize any way your row might store multiple images into a deduped array. */
function extractImages(row: Row | null, fallbackUrl: string): string[] {
  if (!row) return [fallbackUrl];

  const pool: string[] = [];

  const push = (v?: string | null) => {
    if (!v) return;
    const s = String(v).trim();
    if (s) pool.push(s);
  };

  // Typical fields we’ve seen
  push(row.image_url);
  push(row.primary_image_url);

  if (Array.isArray(row.image_urls)) {
    row.image_urls.forEach((u) => push(u));
  }

  if (row.additional_image_urls) {
    row.additional_image_urls
      .split(/[,\n]/g)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach(push);
  }

  // Filter obvious non-urls or tiny mistakes
  const cleaned = pool
    .filter((u) => /^https?:\/\//i.test(u))
    // de-dup while preserving order
    .filter((u, i, a) => a.indexOf(u) === i);

  return cleaned.length ? cleaned.slice(0, 4) : [fallbackUrl];
}

/** Try to find the row that matches the clicked card. */
function findRow(rows: Row[], target: { id: string; url: string }): Row | null {
  const idLower = (target.id || '').toString().toLowerCase();

  // by product id fields
  const direct =
    rows.find(
      (r) =>
        (r.product_uid && String(r.product_uid).toLowerCase() === idLower) ||
        (r.native_product_id && String(r.native_product_id).toLowerCase() === idLower)
    ) ||
    // by exact primary image match (fallback)
    rows.find((r) => r.image_url === target.url || r.primary_image_url === target.url);

  return direct || null;
}

/** Parse colors from various possible fields into a short array (max 5). */
function parseColors(row: Row | null): string[] {
  if (!row) return [];
  let raw: string[] = [];

  if (Array.isArray(row.color_options)) raw = row.color_options as string[];
  else if (typeof row.color_options === 'string') raw = row.color_options.split(/[,\n]/g);

  if (Array.isArray(row.colors)) raw = raw.concat(row.colors as string[]);
  else if (typeof row.colors === 'string') raw = raw.concat(row.colors.split(/[,\n]/g));

  return raw
    .map((c) => String(c).trim())
    .filter(Boolean)
    .filter((c, i, a) => a.indexOf(c) === i)
    .slice(0, 5);
}

/** Gentle label helpers */
const nice = {
  title: (r: Row | null, fallback: string) =>
    (r?.title || r?.name || fallback || '').toString(),
  brand: (r: Row | null) => (r?.vendor || '').toString(),
  date: (r: Row | null) =>
    (r?.created_at || r?.date || '').toString(),
  price: (r: Row | null) => {
    if (!r) return '';
    const price = r.price != null ? String(r.price) : '';
    const cur = r.currency ? String(r.currency) : '';
    return [cur, price].filter(Boolean).join(' ');
  },
  material: (r: Row | null) => (r?.material || r?.materials || '').toString(),
  sizes: (r: Row | null) => (r?.size_range || r?.sizes || '').toString(),
  region: (r: Row | null) => (r?.region || '').toString(),
  article: (r: Row | null) => (r?.article_code || '').toString(),
};

export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [row, setRow] = useState<Row | null>(null);
  const [images, setImages] = useState<string[]>([image.url]);

  // Escape key & scroll lock (unchanged)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Hydrate from global map (if Discover already fetched), otherwise fetch webhook directly
  useEffect(() => {
    if (!isOpen) return;

    const globalMap: Map<string, Row> | undefined = (window as any).__DISCOVER_MAP__;
    const tryGlobal = () => {
      if (!globalMap || !globalMap.size) return false;
      // try id lookup; fallback to any row whose image matches
      const possibleIds = [image.id, String(image.id).toLowerCase()];
      let found: Row | undefined;
      for (const [k, v] of globalMap.entries()) {
        if (possibleIds.includes(k) || v.image_url === image.url || v.primary_image_url === image.url) {
          found = v;
          break;
        }
      }
      if (found) {
        setRow(found);
        setImages(extractImages(found, image.url));
        return true;
      }
      return false;
    };

    const tryFetch = async () => {
      if (!WEBHOOK) return;
      try {
        const res = await fetch(`${WEBHOOK}?t=${Date.now()}`, { method: 'GET', mode: 'cors' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        const rows: Row[] = Array.isArray(payload) ? payload : payload?.data || [];
        const match = findRow(rows, image);
        if (match) {
          setRow(match);
          setImages(extractImages(match, image.url));
        } else {
          // keep at least the clicked image
          setRow(null);
          setImages([image.url]);
        }
      } catch (e) {
        console.warn('[ImageDetailModal] webhook fetch failed, using fallback only:', e);
        setRow(null);
        setImages([image.url]);
      }
    };

    if (!tryGlobal()) void tryFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, image.id, image.url]);

  const colors = useMemo(() => parseColors(row), [row]);

  const handleSimilarClick = () => {
    onFindSimilar(image.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />

      {/* Modal */}
      <div ref={modalRef} className="relative w-full h-full flex">

    {/* LEFT: fixed-height, centered media stage */}
<div className="flex-1 overflow-y-auto p-8">
  <div className="w-full flex items-center justify-center">
    {/* 👉 this is the ONLY knob: change h-[68vh]/max-h to control stage size */}
    <div id="media-stage" className="w-full max-w-[980px] h-[60vh] max-h-[840px]">
      {(() => {
        const n = Math.min(images.length, 4);
        const cols = n === 1 ? 1 : 2;
        const rows = n <= 2 ? 1 : 2;

        if (n === 1) {
          // One image, centered, no cropping
          return (
            <div className="h-full flex items-center justify-center bg-transparent">
              <div className="h-full bg-[#1C1D20] border border-[#2A2B2E] overflow-hidden flex items-center justify-center">
                <ImageWithFallback
                  src={images[0]}
                  alt={row?.title || row?.name || image.alt || 'product'}
                  className="h-full w-auto object-contain block"
                />
              </div>
            </div>
          );
        }

        if (n === 2) {
          // Two images side-by-side, same fixed stage height
          return (
            <div className="h-full grid gap-4"
                 style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {images.slice(0, 2).map((src, i) => (
                <div key={`${src}-${i}`}
                     className="h-full bg-[#1C1D20] border border-[#2A2B2E] overflow-hidden flex items-center justify-center">
                  <ImageWithFallback
                    src={src}
                    alt={(row?.title || row?.name || image.alt || 'image') + ` ${i + 1}`}
                    className="h-full w-auto object-cover block"
                  />
                </div>
              ))}
            </div>
          );
        }

        // 3 or 4 images → fixed 2×2 grid; with 3 items the last row has a single cell (no placeholder)
        return (
          <div className="h-full grid gap-4"
               style={{
                 gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                 gridTemplateRows:    'repeat(2, 1fr)',
                 placeItems:          'center'
               }}>
            {images.slice(0, 4).map((src, i) => (
              <div key={`${src}-${i}`}
                   className="h-full w-full bg-[#1C1D20] border border-[#2A2B2E] overflow-hidden flex items-center justify-center">
                <ImageWithFallback
                  src={src}
                  alt={(row?.title || row?.name || image.alt || 'image') + ` ${i + 1}`}
                  className="h-full w-auto object-cover block"
                />
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  </div>

  {/* Similar button */}
  <div className="mt-6 flex justify-center">
    <button
      onClick={() => { onFindSimilar(image.id); onClose(); }}
      className="flex items-center gap-2 px-4 py-2 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] text-[#F5F6F7] transition-colors"
    >
      <span className="text-[14px] font-medium">Similar</span>
      <ChevronDown className="h-4 w-4" />
    </button>
  </div>
</div>




        {/* Right: Details panel (dynamic data, same visual style) */}
        <div className="w-[360px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {/* 1. Product Name */}
              <div>
                <h2 className="text-[20px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {nice.title(row, image.alt || 'Product')}
                </h2>
              </div>

              {/* 2. Brand + Date */}
              <div className="space-y-2">
                <h3 className="text-[16px] text-[#F5F6F7]" style={{ fontWeight: 500, lineHeight: 1.4 }}>
                  {nice.brand(row) || '—'}
                </h3>
                <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wide" style={{ fontWeight: 500 }}>
                  {nice.date(row) || ''}
                </p>
              </div>

              {/* 3. @brand • region • article */}
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#9CA3AF]">
                {nice.brand(row) ? <span>@{nice.brand(row).toLowerCase()}</span> : null}
                {nice.region(row) && <><span>•</span><span>{nice.region(row)}</span></>}
                {nice.article(row) && <><span>•</span><span>Article {nice.article(row)}</span></>}
              </div>

              {/* 4. Price */}
              {nice.price(row) ? (
                <div>
                  <span className="text-[18px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.4 }}>
                    {nice.price(row)}
                  </span>
                </div>
              ) : null}

              {/* 5. Material / Sizes / Colors */}
              <div className="space-y-4">
                {/* Material */}
                {nice.material(row) ? (
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#9CA3AF]">Material</span>
                    <span className="text-[14px] text-[#F5F6F7]">{nice.material(row)}</span>
                  </div>
                ) : null}

                {/* Size Range */}
                {nice.sizes(row) ? (
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#9CA3AF]">Size Range</span>
                    <span className="text-[14px] text-[#F5F6F7]">{nice.sizes(row)}</span>
                  </div>
                ) : null}

                {/* Colors */}
                {colors.length ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-[#9CA3AF]">Color Options</span>
                      <span className="text-[14px] text-[#F5F6F7]">{colors.length} Available</span>
                    </div>
                    <div className="flex gap-2">
                      {colors.map((c, i) => (
                        <div
                          key={`${c}-${i}`}
                          className="w-5 h-5 rounded-full border border-[#2A2B2E]"
                          title={c}
                          style={{
                            // best-effort: if it looks like a hex/css color, use it; else default gray
                            background:
                              /^#([0-9a-f]{3}){1,2}$/i.test(c) || /^[a-zA-Z]+$/.test(c) ? (c as string) : '#1f2937',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 6. Open Product */}
              {row?.product_url ? (
                <div>
                  <a
                    href={row.product_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open Product</span>
                  </a>
                </div>
              ) : null}

              {/* 7. CTAs (unchanged visuals) */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  className="w-full px-4 py-3 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] hover:border-[#3A3B3E] text-[#F5F6F7] transition-colors text-[14px] text-center"
                  style={{ fontWeight: 500 }}
                >
                  Generate AI Techpack
                </button>
                <button
                  className="w-full px-4 py-3 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] hover:border-[#3A3B3E] text-[#F5F6F7] transition-colors text-[14px] text-center"
                  style={{ fontWeight: 500 }}
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 w-8 h-8 rounded-full bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] flex items-center justify-center text-[#F5F6F7] transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
