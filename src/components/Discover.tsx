// src/components/Discover.tsx
import { useEffect, useState } from 'react';
import { Plus, Filter, Edit2, X } from 'lucide-react';
import { AddToCollectionPopup } from './AddToCollectionPopup';
import { MarketFilterOverlay } from './MarketFilterOverlay';
import { MarketStreamTab } from './MarketStreamTab';
import { MarketInsightsTab } from './MarketInsightsTab';

// ---------- Config (via Vite / Netlify envs) ----------


// ---------- Helpers (safe, no runtime crashes) ----------
type BrandCard = { id: string; title: string; subtitle: string; url: string; href?: string };

function titleCase(s: string) {
  return (s || '').toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase());
}

function padWithFallback<T extends { id: string }>(primary: T[], fallback: T[], count: number) {
  const used = new Set(primary.map((p) => p.id));
  const extra = fallback.filter((f) => !used.has(f.id));
  return [...primary, ...extra].slice(0, count);
}

/** Build “brand cards” from raw rows while preserving your original card look */
function buildBrandCardsStable(rows: any[], limit = 5): BrandCard[] {
  const seen = new Set<string>();
  const cards: BrandCard[] = [];

  for (const r of rows || []) {
    const vendor = (r.vendor ?? '').trim();
    const url = r.image_url ?? r.primary_image_url;
    if (!vendor || !url) continue;

    const vendorKey = vendor.toLowerCase();
    if (seen.has(vendorKey)) continue;
    seen.add(vendorKey);

    cards.push({
      id:
        String(r.product_uid) ||
        `${vendorKey}-${r.native_product_id || (crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2))}`,
      title: titleCase(vendor),
      subtitle: `@${vendorKey}`,
      url,
      href: r.product_url || '#',
    });

    if (cards.length >= limit) break;
  }

  return cards;
}

/** Fetch rows from n8n webhook. Accepts array or { data: [...] } */
async function fetchDiscoverRows(): Promise<any[]> {
  const url = import.meta.env.VITE_DISCOVER_WEBHOOK;
  if (!url) {
    console.warn('VITE_DISCOVER_WEBHOOK not set; using fallback data.');
    return [];
  }

  // Simple GET, no custom headers → no preflight
  const res = await fetch(url, { method: 'GET', mode: 'cors' });
  if (!res.ok) throw new Error(`Webhook error: ${res.status} ${res.statusText}`);

  // Your n8n Respond node is returning an array
  return await res.json();
}


// ---------- Static fallbacks (your original images) ----------
const STATIC_BRANDS: BrandCard[] = [
  {
    id: 'brand-1',
    title: 'Zara',
    subtitle: '@zara',
    url: 'https://static.zara.net/assets/public/74d8/7667/80d5487a82ba/54ab16af7b49/05029172330-p/05029172330-p.jpg?ts=1753515381675&w=1254',
  },
  {
    id: 'brand-2',
    title: 'Forever New',
    subtitle: '@ForeverNew',
    url: 'https://www.forevernew.co.in//pub/media/catalog/product/o/l/oldimlall_onbody_29521504_f.jpg?width=1046&height=1118&store=default&image-type=image',
  },
  {
    id: 'brand-3',
    title: 'Zara Collection',
    subtitle: '@zara',
    url: 'https://static.zara.net/assets/public/6203/dce9/d388499f97fb/e29f128674bf/08460501700-p/08460501700-p.jpg?ts=1753438567193&w=1254',
  },
  {
    id: 'brand-4',
    title: 'Uniqlo Basics',
    subtitle: '@uniqlo',
    url: 'https://static.zara.net/assets/public/45f6/3c46/9c5a498c9763/4fa6a6e7d499/04047476800-p/04047476800-p.jpg?ts=1732265080529&w=1440',
  },
  {
    id: 'brand-5',
    title: 'H&M Trends',
    subtitle: '@hm',
    url: 'https://image.hm.com/assets/hm/3a/d8/3ad8fc6726aac2101afb6767b6d06a07787256a7.jpg?imwidth=1536',
  },
];

// ---------- Component ----------
interface DiscoverProps {
  onFindSimilar: (imageId: string) => void;
  onImageClick: (image: { id: string; url: string; alt: string }) => void;
  onCreateClick: (type: 'collection' | 'folder' | 'techpack') => void;
  onAddToMyCollection?: (imageData: any) => void;
  onOpenInCanvas?: (imageData: any) => void;
  onRecommend?: (imageData: any) => void;
  myCollectionImages?: any[];
}

export function Discover({
  onFindSimilar,
  onImageClick,
  onCreateClick,
  onAddToMyCollection,
  onOpenInCanvas,
  onRecommend,
  myCollectionImages = [],
}: DiscoverProps) {
  const [activeFilter, setActiveFilter] = useState('Featured');
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [popupAnchorRect, setPopupAnchorRect] = useState<DOMRect | null>(null);
  const [isMarketFilterOpen, setIsMarketFilterOpen] = useState(false);
  const [marketFilterMode, setMarketFilterMode] = useState<'stream' | 'insights'>('stream');
  const [marketSearchResults, setMarketSearchResults] = useState<{
    mode: 'stream' | 'insights';
    filters: any;
  } | null>(null);
  const [productTypeFilter, setProductTypeFilter] = useState('All Products');
  const buttonRefs = useState(() => new Map<string, HTMLButtonElement>())[0];

  // Category filters
  const categoryFilters = [
    'Featured',
    'Denim',
    'Womenswear',
    'Menswear',
    'WGSN',
    'Heuretics',
    'London FW 2025',
    'My Collection',
    'Market Stream',
    'Market Insights',
  ];

  // ---- Dynamic Brands with safe fallback ----
  const [brandsData, setBrandsData] = useState<BrandCard[]>(STATIC_BRANDS);

  
// ---- Replace the entire second useEffect with this one ----
useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const rows = await fetchDiscoverRows();

      // Adjust these knobs as you like
      const MAX_TILES = 12;     // how many cards you want to render
      const MIN_SCORE = 0;      // e.g. 60 if you only want higher-score picks
      const REQUIRE_FIELDS = ['image_url', 'product_url']; // must exist

      // Pick top N by score across ALL vendors (no de-dupe)
      const filtered = rows
        .filter((r: any) =>
          REQUIRE_FIELDS.every((f) => r?.[f]) &&
          (r.score ?? 0) >= MIN_SCORE
        )
        .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, MAX_TILES);

      const cards = filtered.map((r: any, i: number) => ({
        id: r.product_uid || r.native_product_id || `row-${i}`,
        title: titleCase(r.vendor || 'Unknown'),
        subtitle: `@${(r.vendor || '').toLowerCase()}`,
        url: r.image_url || r.primary_image_url,
        href: r.product_url || '#',
      }));

      if (!cancelled && cards.length) {
        setBrandsData(cards);
      }
    } catch (e) {
      console.error('Discover webhook failed:', e);
      // keep fallback on error
    }
  })();

  return () => { cancelled = true; };
}, []);


  // ---------- Other static sections (unchanged) ----------
  const worldReportsData = [
    {
      id: 'report-1',
      title: 'SS26 Trends',
      subtitle: 'Global Fashion Week',
      url: 'https://www.tributetomagazine.com/wp-content/uploads/2024/04/fashion-week-schedule-2025.jpg',
    },
    {
      id: 'report-2',
      title: 'Fall 25 Fashion',
      subtitle: 'Fall Report 2025',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0001.jpg?w=555&h=740&crop=1',
    },
    {
      id: 'report-3',
      title: 'London FW 2025',
      subtitle: 'Fashion Week Coverage',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0003.jpg?w=200',
    },
    {
      id: 'report-4',
      title: 'Fabric Forecast',
      subtitle: 'Fabric Trends',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-bsb-em-0002.jpg?w=225',
    },
  ];

  const internalData = [
    {
      id: 'internal-1',
      title: 'Pattern Library',
      subtitle: 'Internal Collection',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazprYmMuGVx6pC8ajwwjkFj1ACs6Kww8_Bg&s',
    },
    {
      id: 'internal-2',
      title: 'Technical Specs',
      subtitle: 'Design Guidelines',
      url: 'https://img.freepik.com/premium-vector/peaked-jacket-flat-drawing-fashion-flat-sketches_467783-86.jpg',
    },
    {
      id: 'internal-3',
      title: 'Material Samples',
      subtitle: 'Fabric Database',
      url: 'https://t3.ftcdn.net/jpg/04/54/65/64/360_F_454656487_RC4ZFetGCJUyrudzA3LiEJIk6DulS2OG.jpg',
    },
    {
      id: 'internal-4',
      title: 'Brand Guidelines',
      subtitle: 'Style Manual',
      url: 'https://img.freepik.com/premium-vector/brand-identity-guideline-template-create-visual-identity-cafe-coffee-shop-restaurant_10707-3284.jpg?semt=ais_hybrid&w=740&q=80',
    },
  ];

  // ---------- UI handlers (unchanged) ----------
  const handleImageCardClick = (item: any) => {
    onImageClick({
      id: item.id,
      url: item.url,
      alt: item.title,
    });
  };

  const handleAddToMyCollection = (item: any) => {
    if (onAddToMyCollection) {
      let sourceSection = 'Saved from Discover';
      if (brandsData.find((brand) => brand.id === item.id)) {
        sourceSection = 'Saved from Brands';
      } else if (worldReportsData.find((report) => report.id === item.id)) {
        sourceSection = 'Saved from World Reports';
      } else if (internalData.find((internal) => internal.id === item.id)) {
        sourceSection = 'Saved from Internal Database';
      }

      onAddToMyCollection({
        id: item.id,
        url: item.url,
        alt: item.title,
        title: item.title,
        subtitle: sourceSection,
        addedAt: new Date().toISOString(),
      });
    }
  };

  const handleOpenInCanvas = (item: any) => {
    if (onOpenInCanvas) {
      onOpenInCanvas({
        id: item.id,
        url: item.url,
        alt: item.title,
      });
    }
  };

  const handleRecommend = (item: any) => {
    if (onRecommend) {
      onRecommend({
        id: item.id,
        url: item.url,
        alt: item.title,
        title: item.title,
        subtitle: item.subtitle,
      });
    }
  };

  const renderSection = (title: string, data: any[]) => (
    <div className="mb-16">
      <h2 className="text-[20px] font-medium text-[#F5F6F7] mb-6 px-6">{title}</h2>
      <div className="px-6">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden hover:bg-[#2A2B2E] transition-all duration-200"
              style={{ height: '320px' }}
              onClick={() => handleImageCardClick(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS1DBh0wipHU9O-TIYKBUDEpj6mpwO16W6mXC2Qfk-cpnUMdUYfJNCrty2TtLidx_tPP3rwqUuYwsAnoKeOgBsFGjh8Yr6CGdKzx5NMUmCeBIuIvFNvHzvov_zXcel8fPLTtmaQOIYYXNg&usqp=CAc';
                }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-[14px] font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-[12px] text-[#9CA3AF]">{item.subtitle}</p>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t group-hover:from-black/15 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none">
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                  {activeFilter === 'My Collection' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenInCanvas(item);
                      }}
                      className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200"
                    >
                      Open in Canvas
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFindSimilar(item.id);
                      }}
                      className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200"
                    >
                      Find Similar
                    </button>
                  )}
                  <button
                    ref={(el) => {
                      if (el) buttonRefs.set(item.id, el);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = buttonRefs.get(item.id)?.getBoundingClientRect();
                      setPopupAnchorRect(rect || null);
                      setActivePopup(activePopup === item.id ? null : item.id);
                    }}
                    className="w-8 h-8 bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMyCollectionSection = () => {
    if (myCollectionImages.length === 0) {
      return (
        <div className="mb-16">
          <h2 className="text-[20px] font-medium text-[#F5F6F7] mb-6 px-6">My Collection</h2>
          <div className="px-6">
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-[#2A2B30] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-[#9CA3AF]" />
              </div>
              <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">No saved items yet</h3>
              <p className="text-[14px] text-[#9CA3AF]">Start building your collection by adding images from other categories</p>
            </div>
          </div>
        </div>
      );
    }

    return renderSection('My Collection', myCollectionImages);
  };

  const handleMarketFilterClick = (mode: 'stream' | 'insights') => {
    setMarketFilterMode(mode);
    setIsMarketFilterOpen(true);
  };

  const handleMarketSearch = (mode: 'stream' | 'insights', filters: any) => {
    setMarketSearchResults({ mode, filters });
    setProductTypeFilter(filters.productType || 'All Products');
    setActiveFilter(mode === 'stream' ? 'Market Stream' : 'Market Insights');
  };

  const handleClearMarketSearch = () => {
    setMarketSearchResults(null);
    setActiveFilter('Featured');
  };

  const handleEditMarketFilters = () => {
    if (marketSearchResults) setMarketFilterMode(marketSearchResults.mode);
    setIsMarketFilterOpen(true);
  };

  const getActiveFiltersCount = (filters: any, mode: 'stream' | 'insights') => {
    if (mode === 'stream') {
      return (
        [filters.gender, filters.category, filters.subcategory, filters.style].filter(Boolean).length +
        filters.weblinks.filter(Boolean).length +
        (filters.productType !== 'All Products' ? 1 : 0)
      );
    } else {
      return [filters.region, filters.timeRange, filters.insightType, filters.marketSegment, filters.dataSource].filter(Boolean).length;
    }
  };

  const getActiveFiltersText = (filters: any, mode: 'stream' | 'insights') => {
    const activeFilters: string[] = [];
    if (mode === 'stream') {
      if (filters.gender) activeFilters.push(`Gender: ${filters.gender}`);
      if (filters.category) activeFilters.push(`Category: ${filters.category}`);
      if (filters.subcategory) activeFilters.push(`Type: ${filters.subcategory}`);
      if (filters.style) activeFilters.push(`Style: ${filters.style}`);
      if (filters.productType !== 'All Products') activeFilters.push(`Product: ${filters.productType}`);
      const activeWeblinks = (filters.weblinks || []).filter(Boolean);
      if (activeWeblinks.length > 0) activeFilters.push(`Sources: ${activeWeblinks.length} website(s)`);
    } else {
      if (filters.region) activeFilters.push(`Region: ${filters.region}`);
      if (filters.timeRange) activeFilters.push(`Time: ${filters.timeRange}`);
      if (filters.insightType) activeFilters.push(`Type: ${filters.insightType}`);
      if (filters.marketSegment) activeFilters.push(`Segment: ${filters.marketSegment}`);
      if (filters.dataSource) activeFilters.push(`Source: ${filters.dataSource}`);
    }
    return activeFilters.join(' • ');
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen pt-6">
      {/* Category Filters */}
      <div className="mb-8 px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                if (filter === 'Market Stream') {
                  if (marketSearchResults?.mode === 'stream') setActiveFilter('Market Stream');
                  else handleMarketFilterClick('stream');
                } else if (filter === 'Market Insights') {
                  if (marketSearchResults?.mode === 'insights') setActiveFilter('Market Insights');
                  else handleMarketFilterClick('insights');
                } else {
                  if (marketSearchResults) setMarketSearchResults(null);
                  setActiveFilter(filter);
                }
              }}
              className={`px-4 py-2 text-[14px] font-medium rounded-lg whitespace-nowrap transition-colors duration-200 relative ${
                activeFilter === filter ? 'text-[#F5F6F7]' : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1C1D20]'
              }`}
            >
              {filter}
              {activeFilter === filter && <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#F5F6F7]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Market Search Results */}
      {marketSearchResults && (
        <div className="pb-20">
          {/* Active Filters Summary */}
          <div className="mb-6 px-6">
            <div className="bg-[#1C1D20] rounded-lg p-4 border border-[#2A2B30]">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#F5F6F7]" />
                      <span className="text-[14px] font-medium text-[#F5F6F7]">
                        Applied Filters ({getActiveFiltersCount(marketSearchResults.filters, marketSearchResults.mode)})
                      </span>
                    </div>
                    <button
                      onClick={handleEditMarketFilters}
                      className="flex items-center gap-1 px-2 py-1 text-[12px] text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                  <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                    {getActiveFiltersText(marketSearchResults.filters, marketSearchResults.mode) || 'No specific filters applied'}
                  </p>
                </div>
                <button
                  onClick={handleClearMarketSearch}
                  className="ml-4 flex items-center gap-1 px-3 py-2 text-[12px] font-medium text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Market Results Content */}
          {marketSearchResults.mode === 'stream' ? (
            <MarketStreamTab onFindSimilar={onFindSimilar} hideForm={true} appliedFilters={marketSearchResults.filters} />
          ) : (
            <MarketInsightsTab hideForm={true} appliedFilters={marketSearchResults.filters} />
          )}
        </div>
      )}

      {/* Main Content Sections */}
      {!marketSearchResults && (
        <div className="pb-20">
          {activeFilter === 'My Collection' ? (
            renderMyCollectionSection()
          ) : (
            <>
              {renderSection('Brands', brandsData)}
              {renderSection('World Reports', worldReportsData)}
              {renderSection('Internal Database', internalData)}
            </>
          )}
        </div>
      )}

      {/* Add to Collection Popup */}
      {activePopup && popupAnchorRect && (
        <AddToCollectionPopup
          isOpen={true}
          onClose={() => {
            setActivePopup(null);
            setPopupAnchorRect(null);
          }}
          onAddToMyCollection={() => {
            const currentItem = [...brandsData, ...worldReportsData, ...internalData].find((item) => item.id === activePopup);
            if (currentItem) {
              handleAddToMyCollection(currentItem);
            }
            setActivePopup(null);
            setPopupAnchorRect(null);
          }}
          onRecommend={() => {
            const currentItem = [...brandsData, ...worldReportsData, ...internalData].find((item) => item.id === activePopup);
            if (currentItem) {
              handleRecommend(currentItem);
            }
            setActivePopup(null);
            setPopupAnchorRect(null);
          }}
          anchorRect={popupAnchorRect}
        />
      )}

      {/* Market Filter Overlay */}
      <MarketFilterOverlay
        isOpen={isMarketFilterOpen}
        onClose={() => setIsMarketFilterOpen(false)}
        mode={marketFilterMode}
        onFindSimilar={onFindSimilar}
        onSearch={handleMarketSearch}
        existingFilters={marketSearchResults?.filters}
      />
    </div>
  );
}
