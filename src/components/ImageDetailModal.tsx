import { useEffect, useMemo, useRef } from 'react';
import { X, MoreHorizontal, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    id: string;     // product_uid (or native_product_id)
    url: string;
    alt: string;
  };
  onFindSimilar: (imageId: string) => void;
}

/* ---------- helpers ---------- */

function getRowById(id?: string): any | null {
  if (!id) return null;
  const map = (window as any).__DISCOVER_MAP__;
  if (map && typeof map.get === 'function') {
    return map.get(id) || null;
  }
  return null;
}

function fmtPrice(amount?: number | string | null, currency?: string | null) {
  const a = Number(amount);
  if (!isFinite(a)) return '—';
  const code = (currency || '').toUpperCase();
  try {
    // Try Intl first for nicer formatting
    return new Intl.NumberFormat(undefined, {
      style: code ? 'currency' : 'decimal',
      currency: code || undefined,
      maximumFractionDigits: 2,
    }).format(a);
  } catch {
    return code ? `${code} ${a}` : `${a}`;
  }
}

function parseColors(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (typeof v === 'string') return v.split(/[|,]/).map(s => s.trim()).filter(Boolean);
  return [];
}

function buildGallery(row: any, mainUrl: string): string[] {
  const out: string[] = [];
  const push = (u?: any) => {
    if (typeof u === 'string' && /^https?:\/\//.test(u)) out.push(u);
  };

  push(row?.image_url);
  if (row?.primary_image_url && row?.primary_image_url !== row?.image_url) {
    push(row.primary_image_url);
  }
  // Common scraping fields people use
  const candidates =
    row?.image_urls ||
    row?.additional_image_urls ||
    row?.gallery ||
    row?.images ||
    null;

  if (Array.isArray(candidates)) {
    candidates.forEach(push);
  } else if (typeof candidates === 'string') {
    candidates.split(/[|,\s]+/).forEach(push);
  }

  // Always include the card image as fallback
  push(mainUrl);

  // Dedupe and limit to 4 for a tidy grid
  return Array.from(new Set(out)).slice(0, 4);
}

/* ---------- UI ---------- */

export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleSimilarClick = () => {
    onFindSimilar(image.id);
    onClose();
  };

  const row = useMemo(() => getRowById(image?.id), [image?.id, isOpen]);
  const gallery = useMemo(() => buildGallery(row, image.url), [row, image.url]);

  // Normalized fields from your scrape tables
  const vendor = row?.vendor || '—';
  const name = row?.name || row?.title || '—';
  const price = fmtPrice(row?.price_amount ?? row?.price, row?.price_currency ?? row?.currency);
  const region = row?.region || row?.country || '—';
  const productUrl = row?.product_url || row?.url || null;
  const colors = parseColors(row?.color_options);
  const score = typeof row?.score === 'number' ? row.score : null;
  const reasoning = row?.reasoning || null;
  const midjourney = row?.midjourney_prompt || null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />

      {/* Modal Content */}
      <div ref={modalRef} className="relative w-full h-full flex">
        {/* Left: Large Image */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: 'calc(100vh - 120px)' }}
            />

            {/* Similar Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleSimilarClick}
                className="flex items-center gap-2 px-4 py-2 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] rounded-lg text-[#F5F6F7] transition-colors"
              >
                <span className="text-[14px] font-medium">Similar</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="w-[380px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1C1D20]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-[#1C1D20] text-[#F5F6F7] px-3 py-1 rounded-lg text-[14px] font-medium pr-8 border border-[#2A2B2E]">
                  <option>Product</option>
                  <option>Fashion</option>
                  <option>Photography</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
              </div>
              <button className="text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="px-6 py-5 border-b border-[#1C1D20]">
            <h3 className="text-[#F5F6F7] text-[16px] font-medium mb-3">Product Info</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
              <div className="text-[#9CA3AF]">Vendor</div>
              <div className="text-[#F5F6F7] truncate">{vendor}</div>

              <div className="text-[#9CA3AF]">Name</div>
              <div className="text-[#F5F6F7]">{name}</div>

              <div className="text-[#9CA3AF]">Price</div>
              <div className="text-[#F5F6F7]">{price}</div>

              <div className="text-[#9CA3AF]">Region</div>
              <div className="text-[#F5F6F7]">{region}</div>

              <div className="text-[#9CA3AF]">Colors</div>
              <div className="text-[#F5F6F7]">
                {colors.length ? colors.join(', ') : '—'}
              </div>

              <div className="text-[#9CA3AF]">Score</div>
              <div className="text-[#F5F6F7]">{score ?? '—'}</div>
            </div>

            {productUrl && (
              <a
                className="inline-block mt-3 text-[13px] text-[#9CA3AF] hover:text-[#F5F6F7] underline"
                href={productUrl}
                target="_blank"
                rel="noreferrer"
              >
                View product page ↗
              </a>
            )}
          </div>

          {/* Reasoning (if present) */}
          {(reasoning || midjourney) && (
            <div className="px-6 py-5 border-b border-[#1C1D20] space-y-3">
              {reasoning && (
                <div>
                  <div className="text-[#9CA3AF] text-[12px] mb-1">Why it ranked</div>
                  <p className="text-[#F5F6F7] text-[13px] leading-relaxed">{reasoning}</p>
                </div>
              )}
              {midjourney && (
                <div>
                  <div className="text-[#9CA3AF] text-[12px] mb-1">Prompt</div>
                  <p className="text-[#F5F6F7] text-[13px] leading-relaxed break-words">
                    {midjourney}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          <div className="px-6 py-5">
            <h3 className="text-[#F5F6F7] text-[16px] font-medium mb-3">Images</h3>
            <div className="grid grid-cols-2 gap-2">
              {gallery.map((src, i) => (
                <div key={i} className="aspect-[1/1] bg-[#1C1D20] rounded overflow-hidden">
                  <img
                    src={src}
                    alt={`Product image ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/600x600?text=No+Image';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
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
