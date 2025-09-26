import { useEffect, useMemo, useRef } from 'react';
import { X, MoreHorizontal, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    id: string;
    url: string;
    alt: string;
  };
  onFindSimilar: (imageId: string) => void;
}

const mockConnections = [
  { id: '1', name: 'archive', username: '@elizabeth', avatar: '🎨', followers: '2.5K elements' },
  { id: '2', name: 'art', username: '@cynthia01', avatar: '🎭', followers: '137 elements' },
  { id: '3', name: 'happy', username: '@caylin', avatar: '😊', followers: '2.2K elements' },
  { id: '4', name: 'Aesthetics', username: '@emilygablin', avatar: '✨', followers: '40 elements' },
  { id: '5', name: 'DESIGN_101', username: '@thepoetic', avatar: '🎨', followers: '187 elements' },
  { id: '6', name: 'new design', username: '@alices', avatar: '🎪', followers: '220 elements' },
  { id: '7', name: 'dimakting', username: '@redimka', avatar: '🎯', followers: '414 elements' },
  { id: '8', name: 'Still Life', username: '@kendall', avatar: '🌸', followers: '70 elements' },
];

/** ---- helpers (pure, UI-neutral) -------------------------------------- */

function parseMaybeJSON<T = any>(v: unknown): T | null {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  if (!s) return null;
  try {
    if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
      return JSON.parse(s) as T;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function splitCSV(s: unknown): string[] {
  if (typeof s !== 'string') return [];
  return s
    .split(/[,|;\n\r]+/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function collectStrings(x: unknown): string[] {
  if (!x) return [];
  if (Array.isArray(x)) return x.map(String).filter(Boolean);
  const asJSON = parseMaybeJSON<string[] | { url?: string }[]>(x);
  if (Array.isArray(asJSON)) {
    if (typeof asJSON[0] === 'string') return (asJSON as string[]).map(String).filter(Boolean);
    return (asJSON as any[]).map((o) => String(o?.url || '')).filter(Boolean);
  }
  return splitCSV(String(x));
}

function collectGallery(row: any, fallbackUrl?: string): string[] {
  const bag = new Set<string>();

  const add = (u?: string) => {
    if (!u) return;
    const url = String(u).trim();
    if (!url) return;
    // prefer http(s) only
    if (!/^https?:\/\//i.test(url)) return;
    bag.add(url);
  };

  // common fields we may see
  add(row?.image_url);
  add(row?.primary_image_url);
  add(row?.product_image);
  add(row?.image1);
  add(row?.image2);
  add(row?.image3);

  for (const key of ['images', 'image_urls', 'additional_images', 'gallery', 'alt_images']) {
    collectStrings(row?.[key]).forEach(add);
  }

  // sometimes image_url itself is CSV of multiple
  splitCSV(row?.image_url).forEach(add);

  // ensure fallback is present first
  if (fallbackUrl && !bag.size) add(fallbackUrl);
  if (fallbackUrl && !Array.from(bag)[0]?.includes(fallbackUrl)) add(fallbackUrl);

  return Array.from(bag);
}

function toTitleCase(s?: string) {
  return (s || '').toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatDate(d?: string): string {
  if (!d) return 'OCT 16, 2023';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return 'OCT 16, 2023';
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
  const parts = new Intl.DateTimeFormat('en-US', opts).format(dt).toUpperCase();
  // e.g. "OCT 16, 2023"
  return parts;
}

const NAMED_COLORS: Record<string, string> = {
  black: '#000000',
  white: '#FFFFFF',
  brown: '#8B4513',
  navy: '#000080',
  'dark slate gray': '#2F4F4F',
  grey: '#808080',
  gray: '#808080',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#008000',
  beige: '#F5F5DC',
  cream: '#FFFDD0',
};

function colorToCss(c: string): string {
  const key = c.toLowerCase().trim();
  if (NAMED_COLORS[key]) return NAMED_COLORS[key];
  // fallback: try CSS as-is; else black
  return key.match(/^#|rgb|hsl|^var\(/) ? key : '#000000';
}

/** ---------------------------------------------------------------------- */

export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Look up the full row for the clicked card.
  const row = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const map: Map<string, any> | undefined = (window as any).__DISCOVER_MAP__;
    return map?.get(image.id) ?? null;
  }, [image.id]);

  // Build gallery: [original, v1, v2, v3, ...]
  const gallery = useMemo(() => collectGallery(row, image.url), [row, image.url]);

  // Data for right panel with safe fallbacks
  const productName = row?.name || 'Poplin Midi-Dress';
  const vendor = row?.vendor || 'COS';
  const vendorHandle = vendor ? `@${String(vendor).toLowerCase()}` : '@cos';
  const region = row?.region || 'Europe';
  const articleCode = row?.article_code || row?.native_product_id ? `Article ${row?.article_code ?? row?.native_product_id}` : 'Article ABC123';
  const priceCurrency = row?.price_currency || row?.currency || '$';
  const priceAmount = (row?.price_amount ?? row?.price) != null ? String(row?.price_amount ?? row?.price) : '299';
  const productUrl = row?.product_url || row?.url || undefined;
  const dateDisplay = formatDate(row?.created_at || row?.updated_at);

  const colorsRaw: string[] = useMemo(() => {
    // color_options can be text[] (Supabase), CSV, JSON, or single string
    if (Array.isArray(row?.color_options)) return (row?.color_options as any[]).map(String);
    if (typeof row?.color_options === 'string') {
      // try postgres array literal: {Black,White}
      const s = row.color_options.trim();
      if (s.startsWith('{') && s.endsWith('}')) {
        return s
          .slice(1, -1)
          .split(',')
          .map((x: string) => x.replace(/^"|"$/g, '').trim())
          .filter(Boolean);
      }
      return splitCSV(s);
    }
    return [];
  }, [row]);

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

  if (!isOpen) return null;

  // map gallery into the four tiles without altering layout:
  const img0 = gallery[0] || image.url;
  const img1 = gallery[1];
  const img2 = gallery[2];
  const img3 = gallery[3];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full h-full flex"
      >
        {/* Left Side - Image Grid */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-lg">
            {/* 2x2 Portrait Image Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[500px]">
              {/* Main Image */}
              <div className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors aspect-[3/4] h-[240px]">
                <ImageWithFallback
                  src={img0}
                  alt={productName || image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-2 left-2 bg-[#F5F6F7] text-[#0E0E11] px-2 py-1 text-[12px] font-medium">
                  Original
                </div>
              </div>
              
              {/* Variant 1 */}
              <div className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors aspect-[3/4] h-[240px]">
                {img1 ? (
                  <ImageWithFallback
                    src={img1}
                    alt={`${productName} variant 1`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-[#2A2B2E] to-[#1C1D20] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-[#3A3B3E] border border-[#4A4B4E] flex items-center justify-center text-[24px]">
                        👗
                      </div>
                      <div className="text-[12px] text-[#9CA3AF]">Fashion Design</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-2 left-2 bg-[#1C1D20] text-[#F5F6F7] px-2 py-1 text-[12px] font-medium">
                  Variant 1
                </div>
              </div>
              
              {/* Variant 2 */}
              <div className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors aspect-[3/4] h-[240px]">
                {img2 ? (
                  <ImageWithFallback
                    src={img2}
                    alt={`${productName} variant 2`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2A2B2E] via-[#1C1D20] to-[#2A2B2E] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-[#3A3B3E] border border-[#4A4B4E] flex items-center justify-center text-[24px]">
                        🎨
                      </div>
                      <div className="text-[12px] text-[#9CA3AF]">Pattern Design</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-2 left-2 bg-[#1C1D20] text-[#F5F6F7] px-2 py-1 text-[12px] font-medium">
                  Variant 2
                </div>
              </div>
              
              {/* Variant 3 */}
              <div className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors aspect-[3/4] h-[240px]">
                {img3 ? (
                  <ImageWithFallback
                    src={img3}
                    alt={`${productName} variant 3`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tl from-[#2A2B2E] to-[#1C1D20] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-[#3A3B3E] border border-[#4A4B4E] flex items-center justify-center text-[24px]">
                        🧵
                      </div>
                      <div className="text-[12px] text-[#9CA3AF]">Material Spec</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-2 left-2 bg-[#1C1D20] text-[#F5F6F7] px-2 py-1 text-[12px] font-medium">
                  Variant 3
                </div>
              </div>
            </div>
            
            {/* Similar Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSimilarClick}
                className="flex items-center gap-2 px-4 py-2 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] text-[#F5F6F7] transition-colors"
              >
                <span className="text-[14px] font-medium">Similar</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Details Panel */}
        <div className="w-[360px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              
              {/* 1. Product Name */}
              <div>
                <h2 className="text-[20px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {productName}
                </h2>
              </div>

              {/* 2. Brand Name and Date */}
              <div className="space-y-2">
                <h3 className="text-[16px] text-[#F5F6F7]" style={{ fontWeight: 500, lineHeight: 1.4 }}>
                  {toTitleCase(vendor)}
                </h3>
                <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wide" style={{ fontWeight: 500 }}>
                  {dateDisplay}
                </p>
              </div>

              {/* 3. @brandname, Region and Article Code */}
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#9CA3AF]">
                {vendorHandle && <span>{vendorHandle}</span>}
                {region && (
                  <>
                    <span>•</span><span>{region}</span>
                  </>
                )}
                {articleCode && (
                  <>
                    <span>•</span><span>{articleCode}</span>
                  </>
                )}
              </div>

              {/* 4. Price */}
              <div>
                <span className="text-[18px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.4 }}>
                  {priceCurrency}{priceAmount}
                </span>
              </div>

              {/* 5. Material, Size Range, Color Options */}
              <div className="space-y-4">
                {/* Material */}
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Material</span>
                  <span className="text-[14px] text-[#F5F6F7]">
                    {row?.materials || row?.composition || 'Cotton Blend'}
                  </span>
                </div>
                
                {/* Size Range (no schema yet -> leave fallback) */}
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Size Range</span>
                  <span className="text-[14px] text-[#F5F6F7]">XS - XL</span>
                </div>
                
                {/* Color Options with Swatches */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#9CA3AF]">Color Options</span>
                    <span className="text-[14px] text-[#F5F6F7]">
                      {colorsRaw.length ? `${colorsRaw.length} Available` : '5 Available'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {(colorsRaw.length ? colorsRaw.slice(0, 5) : ['Black', 'White', 'Brown', 'Navy', 'Dark Slate Gray']).map((c, i) => (
                      <div
                        key={`${c}-${i}`}
                        className="w-6 h-6 rounded-full border border-[#2A2B2E]"
                        title={String(c)}
                        style={{ background: colorToCss(String(c)) }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Open Product Link (as icon) */}
              <div>
                <button
                  onClick={() => { if (productUrl) window.open(productUrl, '_blank'); }}
                  className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open Product</span>
                </button>
              </div>

              {/* 7. CTA Buttons - AI Techpack and Add to Collection */}
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
