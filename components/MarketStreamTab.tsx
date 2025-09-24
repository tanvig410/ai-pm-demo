import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, ChevronDown, Eye, X, Plus, ExternalLink, Palette, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarketProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  mrp: number;
  discountedPrice: number | null;
  stockoutPercentage: number;
  productType: string;
  source: string;
  sourceUrl: string;
  materials: string[];
  colors: { name: string; hex: string }[];
  insights: string[];
  discount?: number;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: MarketProduct | null;
  onFindSimilar: (productId: string) => void;
}

function ProductDetailModal({ isOpen, onClose, product, onFindSimilar }: ProductDetailModalProps) {
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
    if (product) {
      onFindSimilar(product.id);
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  const discount = product.discountedPrice 
    ? Math.round(((product.mrp - product.discountedPrice) / product.mrp) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full h-full flex"
      >
        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
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

        {/* Right Side - Details Panel */}
        <div className="w-[360px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1C1D20]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-[#1C1D20] text-[#F5F6F7] px-3 py-1 rounded-lg text-[14px] font-medium pr-8 border border-[#2A2B2E]">
                  <option>{product.productType}</option>
                  <option>Fashion</option>
                  <option>Accessories</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
              </div>
              <button className="text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="px-6 py-4 border-b border-[#1C1D20]">
            <p className="text-[#9CA3AF] text-[12px] font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}</p>
          </div>

          {/* Product Info */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-[#F5F6F7] text-[16px] font-medium mb-4">{product.name}</h3>
              
              <div className="space-y-4">
                {/* Brand & Source */}
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px]">
                    🏷️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">{product.brand}</span>
                      <a
                        href={product.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9CA3AF] text-[12px] hover:text-[#F5F6F7] transition-colors"
                      >
                        @{product.source.toLowerCase().replace(/\s+/g, '')}
                      </a>
                    </div>
                    <p className="text-[#9CA3AF] text-[12px]">Brand Source</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px]">
                    💰
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">
                        ${product.discountedPrice || product.mrp}
                      </span>
                      {product.discountedPrice && (
                        <span className="text-[#9CA3AF] text-[12px] line-through">
                          ${product.mrp}
                        </span>
                      )}
                    </div>
                    <p className="text-[#9CA3AF] text-[12px]">
                      {discount > 0 ? `${discount}% discount` : 'Regular price'}
                    </p>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px]">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">
                        {product.stockoutPercentage < 10 ? 'In Stock' : 
                         product.stockoutPercentage < 25 ? 'Low Stock' : 'Critical'}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        product.stockoutPercentage < 10 ? 'bg-green-500' :
                        product.stockoutPercentage < 25 ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <p className="text-[#9CA3AF] text-[12px]">{product.stockoutPercentage}% stockout rate</p>
                  </div>
                </div>

                {/* Materials */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px] mt-0">
                    🧵
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">Materials</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.materials.slice(0, 3).map((material, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#1C1D20] text-[#9CA3AF] text-[10px] rounded border border-[#2A2B2E]"
                        >
                          {material}
                        </span>
                      ))}
                      {product.materials.length > 3 && (
                        <span className="px-2 py-1 bg-[#1C1D20] text-[#9CA3AF] text-[10px] rounded border border-[#2A2B2E]">
                          +{product.materials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px] mt-0">
                    🎨
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">Colors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-[#3A3B40] hover:border-[#F5F6F7] transition-colors cursor-pointer"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[#9CA3AF] text-[12px] ml-1">
                          +{product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px] mt-0">
                    💡
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">Key Insight</span>
                    </div>
                    <p className="text-[#9CA3AF] text-[12px] leading-relaxed">
                      {product.insights[0] || 'No insights available'}
                    </p>
                  </div>
                </div>

                {/* Additional Insights */}
                {product.insights.slice(1, 3).map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px] mt-0">
                      📊
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#F5F6F7] text-[14px] font-medium">Market Data</span>
                      </div>
                      <p className="text-[#9CA3AF] text-[12px] leading-relaxed">{insight}</p>
                    </div>
                  </div>
                ))}

                {/* Product ID */}
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px]">
                    🔗
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F6F7] text-[14px] font-medium">ID</span>
                      <span className="text-[#9CA3AF] text-[12px] font-mono">{product.id}</span>
                    </div>
                    <p className="text-[#9CA3AF] text-[12px]">Product identifier</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[#9CA3AF] text-[10px] font-medium">
                      Copy
                    </div>
                  </button>
                </div>
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

interface MarketStreamProps {
  productTypeFilter: string;
  onFilterChange: (filter: string) => void;
  onProductClick: (product: MarketProduct) => void;
}

function MarketStream({ productTypeFilter, onFilterChange, onProductClick }: MarketStreamProps) {
  const [showMore, setShowMore] = useState(false);

  // Extended mock market stream data with additional fields
  const marketProducts: MarketProduct[] = [
    {
      id: 'product-1',
      name: 'Double-Faced Satin Slip Dress',
      brand: 'Ralph Lauren',
      image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211A89037001_alternate10?$rl_4x5_pdp$',
      mrp: 600.99,
      discountedPrice: 400.99,
      stockoutPercentage: 15,
      productType: 'Dress',
      source: 'Ralph Lauren',
      sourceUrl: 'https://www.ralphlauren.global/in/en/',
      materials: ['Satin', 'Silk Laces'],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#1F2937' },
        { name: 'Gray', hex: '#6B7280' }
      ],
      insights: [
        'High demand with 23% increase in search volume this month',
        'Popular among 18-35 age demographic',
        'Seasonal trend indicates peak demand in spring/summer',
        'Strong customer satisfaction rating of 4.7/5'
      ]
    },
    {
      id: 'product-2',
      name: 'Off-Shoulder Jumpsuit',
      brand: 'Ralph Lauren',
      image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200971129001_alternate10?$rl_4x5_pdp$',
      mrp: 300.99,
      discountedPrice: null,
      stockoutPercentage: 8,
      productType: 'Outerwear',
      source: 'RL Heritage Collection',
      sourceUrl: 'https://www.ralphlauren.global/in/en/',
      materials: ['100% Cotton', 'Metal Buttons', 'Poly Thread'],
      colors: [
        { name: 'Classic Blue', hex: '#4F46E5' },
        { name: 'Faded Black', hex: '#374151' },
        { name: 'Light Wash', hex: '#93C5FD' }
      ],
      insights: [
        'Timeless piece with consistent year-round demand',
        'Premium denim quality drives higher price point acceptance',
        'Strong brand loyalty with 89% repeat customer rate',
        'Vintage aesthetic appeals to Gen Z and Millennial consumers'
      ]
    },
    {
      id: 'product-3',
      name: 'Double Faced Wool Coat',
      brand: 'Ralph Lauren',
      image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211966530003_alternate1?$rl_4x5_zoom$',
      mrp: 700.99,
      discountedPrice: 600.99,
      stockoutPercentage: 3,
      productType: 'Winterwear',
      source: 'RL Wollen Coat',
      sourceUrl: 'https://www.ralhphlauren.global/in/en',
      materials: ['Moisture-Wicking Polyester', 'Recycled Materials', 'Anti-Odor Treatment'],
      colors: [
        { name: 'Navy', hex: '#1E3A8A' },
        { name: 'Black', hex: '#000000' },
        { name: 'Red', hex: '#DC2626' },
        { name: 'Green', hex: '#059669' }
      ],
      insights: [
        'Performance features justify premium pricing',
        'Eco-friendly materials appeal to conscious consumers',
        'Strong correlation with fitness trend growth',
        'High inventory turnover rate indicates strong demand'
      ]
    },
    {
      id: 'product-4',
      name: 'Leather Loafers',
      brand: 'Charles & Keith',
      image: 'https://www.charleskeith.in/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-in-products/default/dwd68ad553/images/hi-res/2023-L6-SL1-71790018-41-1.jpg?sw=756&sh=1008',
      mrp: 120.99,
      discountedPrice: 82.99,
      stockoutPercentage: 22,
      productType: 'Casual',
      source: 'Champion Lifestyle',
      sourceUrl: 'https://charleskeith.in',
      materials: ['Calf Leather'],
      colors: [
        { name: 'Heather Gray', hex: '#9CA3AF' },
        { name: 'Navy', hex: '#1F2937' },
        { name: 'Burgundy', hex: '#7C2D12' }
      ],
      insights: [
        'Streetwear influence drives popularity among young adults',
        'Comfort-focused design aligns with work-from-home trends',
        'Brand heritage adds authenticity value',
        'Higher stockout rate indicates underestimated demand'
      ]
    },
    {
      id: 'product-5',
      name: 'Designer Handbag',
      brand: 'Steve Madden',
      image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410518053002/IU2pxTpG2hp-000000410518053002_1.jpg',
      mrp: 299.99,
      discountedPrice: 249.99,
      stockoutPercentage: 35,
      productType: 'Accessories',
      source: 'Michael Kors Collection',
      sourceUrl: 'https://stevemadden.in',
      materials: ['Saffiano Leather', 'Gold-Tone Hardware', 'Fabric Lining'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Brown', hex: '#8B4513' },
        { name: 'Blush', hex: '#FFC0CB' },
        { name: 'Navy', hex: '#000080' }
      ],
      insights: [
        'Luxury positioning with accessible price point strategy',
        'Strong seasonal peaks during holiday shopping periods',
        'High stock-out rate suggests supply chain optimization needed',
        'Cross-generational appeal spans multiple demographics'
      ]
    }
  ];

  const productTypes = ['All Products', 'Footwear', 'Outerwear', 'Activewear', 'Casual', 'Accessories', 'Formal'];
  
  const filteredProducts = productTypeFilter === 'All Products' 
    ? marketProducts 
    : marketProducts.filter(product => product.productType === productTypeFilter);

  const visibleProducts = showMore ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <div className="mb-16">
      {/* Header with Filter */}
      <div className="flex items-center justify-between mb-6 px-6">
        <div>
          <h2 className="text-[20px] font-medium text-[#F5F6F7]">Market Stream</h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">Real-time product data from across the web</p>
        </div>
        
        {/* Product Type Filter */}
        <div className="relative">
          <select
            value={productTypeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-[#1C1D20] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
          >
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6">
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden hover:bg-[#2A2B2E] transition-all duration-200"
              style={{ height: '320px' }}
              onClick={() => onProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop';
                }}
              />
              
              {/* Stockout Badge */}
              {product.stockoutPercentage > 20 && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-medium">
                    {product.stockoutPercentage}% Stock Out
                  </span>
                </div>
              )}

              {/* Discount Badge */}
              {product.discountedPrice && (
                <div className="absolute top-3 right-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-medium">
                    {Math.round(((product.mrp - product.discountedPrice) / product.mrp) * 100)}% OFF
                  </span>
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-[14px] font-medium text-white mb-1">{product.name}</h3>
                  <p className="text-[12px] text-[#9CA3AF]">{product.brand}</p>
                  
                  {/* Pricing */}
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      {product.discountedPrice ? (
                        <>
                          <span className="text-[14px] font-medium text-white">
                            ${product.discountedPrice}
                          </span>
                          <span className="text-[12px] text-[#9CA3AF] line-through">
                            ${product.mrp}
                          </span>
                        </>
                      ) : (
                        <span className="text-[14px] font-medium text-white">
                          ${product.mrp}
                        </span>
                      )}
                    </div>
                    
                    {/* Stockout Percentage */}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-[#9CA3AF]">
                        Stockout: {product.stockoutPercentage}%
                      </span>
                      <span className="text-[10px] text-[#9CA3AF]">
                        {product.productType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t group-hover:from-black/15 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none">
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                  <button className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200 flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filteredProducts.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-[#1C1D20] hover:bg-[#2A2B30] text-[#F5F6F7] px-6 py-3 rounded-lg font-medium transition-colors border border-[#2A2B30] hover:border-[#F5F6F7]"
            >
              {showMore ? 'Show Less' : `View More (${filteredProducts.length - 8} more products)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface MarketStreamTabProps {
  onFindSimilar?: (productId: string) => void;
  hideForm?: boolean;
  appliedFilters?: any;
}

export function MarketStreamTab({ onFindSimilar, hideForm = false, appliedFilters }: MarketStreamTabProps) {
  const [formData, setFormData] = useState({
    gender: '',
    category: '',
    subcategory: '',
    style: '',
    weblinks: ['']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(hideForm); // If hideForm is true, skip to showing results
  const [productTypeFilter, setProductTypeFilter] = useState('All Products');
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const genderOptions = ['Ladies', 'Men\'s', 'Girls', 'Boys', 'Baby', 'Unisex'];
  const categoryOptions = ['Casual Wear', 'Outerwear', 'Formal Wear', 'Swimwear', 'Activewear', 'Loungewear'];
  const subcategoryOptions = ['T-Shirts', 'Jeans', 'Hoodies', 'Sneakers', 'Dresses', 'Jackets', 'Accessories'];
  const styleOptions = ['Strappy', 'Tank', 'Blouse', 'Fitted', 'Oversized', 'Cropped', 'High-waisted'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWeblinkChange = (index: number, value: string) => {
    const newWeblinks = [...formData.weblinks];
    newWeblinks[index] = value;
    setFormData(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const addWeblink = () => {
    setFormData(prev => ({ ...prev, weblinks: [...prev.weblinks, ''] }));
  };

  const removeWeblink = (index: number) => {
    const newWeblinks = formData.weblinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setHasAnalyzed(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleProductClick = (product: MarketProduct) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFindSimilarLocal = (productId: string) => {
    // Call the parent's onFindSimilar function if provided
    if (onFindSimilar) {
      onFindSimilar(productId);
    }
  };

  return (
    <div className="pb-20">
      {/* Input Form - Hidden when hideForm is true */}
      {!hideForm && (
        <div className="mb-16 px-6">
        <div className="bg-[#1C1D20] rounded-lg p-6 border border-[#2A2B30]">
          <h2 className="text-[18px] font-medium text-[#F5F6F7] mb-6">Search Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Gender/Department */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Gender/Department</label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Subcategory */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Subcategory</label>
              <div className="relative">
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Subcategory</option>
                  {subcategoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Style</label>
              <div className="relative">
                <select
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Style</option>
                  {styleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Weblinks */}
          <div className="mb-6">
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Reference Weblinks</label>
            <div className="space-y-3">
              {formData.weblinks.map((link, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleWeblinkChange(index, e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 text-[14px] text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#F5F6F7]"
                  />
                  {formData.weblinks.length > 1 && (
                    <button
                      onClick={() => removeWeblink(index)}
                      className="p-2 text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addWeblink}
              className="mt-3 flex items-center gap-2 text-[#F5F6F7] hover:text-[#9CA3AF] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[14px]">Add another weblink</span>
            </button>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-[#F5F6F7] text-[#0E0E11] px-6 py-3 rounded-lg font-medium hover:bg-[#E5E6E7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching Market...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search Market
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Market Stream Section - Always show when hideForm is true, or when hasAnalyzed is true */}
      {(hideForm || hasAnalyzed) && (
        <MarketStream 
          productTypeFilter={productTypeFilter}
          onFilterChange={setProductTypeFilter}
          onProductClick={handleProductClick}
        />
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onFindSimilar={handleFindSimilarLocal}
      />
    </div>
  );
}