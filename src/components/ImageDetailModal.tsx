import { useEffect, useMemo, useRef } from 'react';
import { X, MoreHorizontal, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: { id: string; url: string; alt: string };
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

/* ---------------- helpers ---------------- */

function parseMaybeJSON<T = any>(v: unknown): T | null {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  try {
    if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
      return JSON.parse(s) as T;
    }
  } catch {}
  return null;
}

function splitCSV(s: unknown): string[] {
  if (typeof s !== 'string') return [];
  return s.split(/[,|;\n\r]+/g).map(x => x.trim()).filter(Boolean);
}

function collectStrings(x: unknown): string[] {
  if (!x) return [];
  if (Array.isArray(x)) return x.map(String).filter(Boolean);
  const js = parseMaybeJSON<any[]>(x);
  if (Array.isArray(js)) {
    if (typeof js[0] === 'string') return (js as string[]).map(String).filter(Boolean);
    return js.map(o => String((o as any)?.url || '')).filter(Boolean);
  }
  return splitCSV(String(x));
}

function collectGallery(row: any, fallbackUrl?: string): string[] {
  const bag = new Set<string>();
  const add = (u?: string) => {
    const url = String(u || '').trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) return;
    bag.add(url);
  };

  add(row?.image_url);
  add(row?.primary_image_url);
  add(row?.product_image);
  add(row?.image1);
  add(row?.image2);
  add(row?.image3);

  for (const k of ['images', 'image_urls', 'additional_images', 'gallery', 'alt_images']) {
    collectStrings(row?.[k]).forEach(add);
  }
  splitCSV(row?.image_url).forEach(add);

  if (fallbackUrl && !bag.size) add(fallbackUrl);
  return Array.from(bag);
}

function toTitleCase(s?: string) {
  return (s || '').toLowerCase().replace(/\b\w/g, m => m.toUpperCase());
}

function formatDate(d?: string): string {
  if (!d) return 'OCT 16, 2023';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return 'OCT 16, 2023';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .format(dt)
    .toUpperCase();
}

const NAMED_COLORS: Record<string, string> = {
  black: '#000000', white: '#FFFFFF', brown: '#8B4513', navy: '#000080', 'dark slate gray': '#2F4F4F',
  grey: '#808080', gray: '#808080', red: '#FF0000', blue: '#0000FF', green: '#008000', beige: '#F5F5DC', cream: '#FFFDD0',
};

function colorToCss(c: string): string {
  const key = c.toLowerCase().trim();
  return NAMED_COLORS[key] || (key.match(/^#|rgb|hsl|^var\(/) ? key : '#000000');
}

/* ---------------- component ---------------- */

export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const row = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const map: Map<string, any> | undefined = (window as any).__DISCOVER_MAP__;
    return map?.get(image.id) ?? null;
  }, [image.id]);

  const gallery = useMemo(() => collectGallery(row, image.url), [row, image.url]);
  const imgs = useMemo(() => (gallery.length ? gallery.slice(0, 4) : [image.url]), [gallery, image.url]);

  const productName = row?.name || 'Poplin Midi-Dress';
  const vendor = row?.vendor || 'COS';
  const vendorHandle = vendor ? `@${String(vendor).toLowerCase()}` : '@cos';
  const region = row?.region || 'Europe';
  const articleCode =
    row?.article_code || row?.native_product_id ? `Article ${row?.article_code ?? row?.native_product_id}` : 'Article ABC123';
  const priceCurrency = row?.price_currency || row?.currency || '$';
  const priceAmount = (row?.price_amount ?? row?.price) != null ? String(row?.price_amount ?? row?.price) : '299';
  const productUrl = row?.product_url || row?.url || undefined;
  const dateDisplay = formatDate(row?.created_at || row?.updated_at);

  const colorsRaw: string[] = useMemo(() => {
    if (Array.isArray(row?.color_options)) return (row?.color_options as any[]).map(String);
    if (typeof row?.color_options === 'string') {
      const s = row.color_options.trim();
      if (s.startsWith('{') && s.endsWith('}')) {
        return s.slice(1, -1).split(',').map((x: string) => x.replace(/^"|"$/g, '').trim()).filter(Boolean);
      }
      return splitCSV(s);
    }
    return [];
  }, [row]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleSimilarClick = () => {
    onFindSimilar(image.id);
    onClose();
  };

  if (!isOpen) return null;

  // grid class: never show blank boxes
  const gridClass =
    imgs.length >= 4 ? 'grid-cols-2 grid-rows-2' :
    imgs.length === 3 ? 'grid-cols-2' :
    imgs.length === 2 ? 'grid-cols-2' :
    'grid-cols-1';

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />
      
      {/* Modal Content */}
      {/* Left Side - Image Grid (portrait-only, no blanks) */}
<div className="flex-1 flex items-center justify-start p-8">
  <div className={`w-full ${imgs.length === 1 ? 'max-w-[560px]' : 'max-w-[1100px]'} mx-0`}>
    <div className={`grid gap-4 ${imgs.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {imgs.map((src, i) => (
        <div
          key={i}
          className="relative w-full aspect-[3/4] border border-[#2A2B2E] overflow-hidden"
        >
          {/* fill the portrait tile perfectly */}
          <ImageWithFallback
            src={src}
            alt={`${productName} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

    {/* Similar Button */}
    <div className="mt-6 flex">
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

              {/* 3. @brandname • Region • Article */}
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#9CA3AF]">
                {vendorHandle && <span>{vendorHandle}</span>}
                {region && (<><span>•</span><span>{region}</span></>)}
                {articleCode && (<><span>•</span><span>{articleCode}</span></>)}
              </div>

              {/* 4. Price */}
              <div>
                <span className="text-[18px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.4 }}>
                  {priceCurrency}{priceAmount}
                </span>
              </div>

              {/* 5. Material, Size, Colors */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Material</span>
                  <span className="text-[14px] text-[#F5F6F7]">{row?.materials || row?.composition || 'Cotton Blend'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Size Range</span>
                  <span className="text-[14px] text-[#F5F6F7]">XS - XL</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#9CA3AF]">Color Options</span>
                    <span className="text-[14px] text-[#F5F6F7]">
                      {colorsRaw.length ? `${colorsRaw.length} Available` : '5 Available'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {(colorsRaw.length ? colorsRaw.slice(0, 5) : ['Black', 'White', 'Brown', 'Navy', 'Dark Slate Gray']).map((c, i) => (
                      <div key={`${c}-${i}`} className="w-6 h-6 rounded-full border border-[#2A2B2E]" title={String(c)} style={{ background: colorToCss(String(c)) }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Open link */}
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

              {/* 7. CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <button className="w-full px-4 py-3 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] hover:border-[#3A3B3E] text-[#F5F6F7] transition-colors text-[14px] text-center" style={{ fontWeight: 500 }}>
                  Generate AI Techpack
                </button>
                <button className="w-full px-4 py-3 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] hover:border-[#3A3B3E] text-[#F5F6F7] transition-colors text-[14px] text-center" style={{ fontWeight: 500 }}>
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
