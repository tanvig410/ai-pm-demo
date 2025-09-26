import { useEffect, useMemo, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';
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

// --- helpers ---------------------------------------------------------------
function normalizeList(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === 'string') {
    // supports comma/pipe separated lists
    return v
      .split(/[,\|\n]/)
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

// --------------------------------------------------------------------------
export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Pull the raw row we cached on the Discover page (if present)
  const row = useMemo(() => {
    const map: Map<string, any> | undefined = (window as any).__DISCOVER_MAP__;
    return map?.get(image?.id) ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image?.id, isOpen]);

  // Build the image list (max 4). Always include the main image first.
  const imgs = useMemo(() => {
    const primary =
      row?.image_url ||
      row?.primary_image_url ||
      image?.url;

    const more =
      normalizeList(row?.image_urls)
        .concat(normalizeList(row?.images))
        .concat(normalizeList(row?.additional_images));

    const all = unique([primary, ...more].filter(Boolean));
    return all.slice(0, 4);
  }, [row, image?.url]);

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

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />

      {/* Modal Content */}
      <div ref={modalRef} className="relative w-full h-full flex">
        {/* LEFT: Portrait image grid (no blanks, no labels) */}
        <div className="flex-1 flex items-center justify-start p-8">
          <div className={`w-full ${imgs.length === 1 ? 'max-w-[560px]' : 'max-w-[1100px]'} mx-0`}>
            <div className={`grid gap-4 ${imgs.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {imgs.map((src, i) => (
                <div key={i} className="relative w-full aspect-[3/4] border border-[#2A2B2E] overflow-hidden">
                  <ImageWithFallback
                    src={src}
                    alt={`${image?.alt || 'Image'} ${i + 1}`}
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

        {/* RIGHT: Details panel (kept exactly as your UI) */}
        <div className="w-[360px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {/* 1. Product Name */}
              <div>
                <h2 className="text-[20px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                  Poplin Midi-Dress
                </h2>
              </div>

              {/* 2. Brand Name and Date */}
              <div className="space-y-2">
                <h3 className="text-[16px] text-[#F5F6F7]" style={{ fontWeight: 500, lineHeight: 1.4 }}>
                  COS
                </h3>
                <p className="text-[12px] text-[#9CA3AF] uppercase tracking-wide" style={{ fontWeight: 500 }}>
                  OCT 16, 2023
                </p>
              </div>

              {/* 3. @brandname, Region and Article Code */}
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#9CA3AF]">
                <span>@cos</span>
                <span>•</span>
                <span>Europe</span>
                <span>•</span>
                <span>Article ABC123</span>
              </div>

              {/* 4. Price */}
              <div>
                <span className="text-[18px] text-[#F5F6F7]" style={{ fontWeight: 600, lineHeight: 1.4 }}>
                  $299
                </span>
              </div>

              {/* 5. Material, Size Range, Color Options */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Material</span>
                  <span className="text-[14px] text-[#F5F6F7]">Cotton Blend</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#9CA3AF]">Size Range</span>
                  <span className="text-[14px] text-[#F5F6F7]">XS - XL</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#9CA3AF]">Color Options</span>
                    <span className="text-[14px] text-[#F5F6F7]">5 Available</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#000000] border border-[#2A2B2E]" title="Black" />
                    <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#2A2B2E]" title="White" />
                    <div className="w-6 h-6 rounded-full bg-[#8B4513] border border-[#2A2B2E]" title="Brown" />
                    <div className="w-6 h-6 rounded-full bg-[#000080] border border-[#2A2B2E]" title="Navy" />
                    <div className="w-6 h-6 rounded-full bg-[#2F4F4F] border border-[#2A2B2E]" title="Dark Slate Gray" />
                  </div>
                </div>
              </div>

              {/* 6. Open Product Link (as icon) */}
              <div>
                <button className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors group">
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open Product</span>
                </button>
              </div>

              {/* 7. CTAs */}
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
