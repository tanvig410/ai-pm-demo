import { useState } from 'react';
import { X, MoreHorizontal, ChevronDown, TrendingUp, Users, Calendar, DollarSign, ExternalLink, Link } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
  onFindSimilar?: (productId: string) => void;
}

export function ProductDetailModal({ 
  isOpen, 
  onClose, 
  productData,
  onFindSimilar 
}: ProductDetailModalProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!isOpen || !productData) return null;

  // Enhanced color options data
  const getColorOptions = (imageData: any) => {
    const colorPalettes = {
      'silk': ['#1a1a1a', '#8B4513', '#DAA520', '#2F4F4F', '#800080'],
      'cotton': ['#FFFFFF', '#000000', '#FF0000', '#0000FF', '#008000', '#FFA500'],
      'denim': ['#1e3a8a', '#3730a3', '#1e40af', '#374151', '#111827'],
      'wool': ['#8B4513', '#2F4F4F', '#800000', '#000000', '#708090'],
      'leather': ['#000000', '#8B4513', '#A0522D', '#800000', '#2F4F4F'],
      'premium': ['#FFD700', '#C0C0C0', '#1a1a1a', '#800080', '#8B0000'],
      'casual': ['#FFFFFF', '#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080'],
      'formal': ['#000000', '#2F4F4F', '#800000', '#000080', '#8B4513'],
    };

    const material = imageData.details?.find((d: any) => d.label === 'Material')?.value?.toLowerCase() || 'casual';
    const materialKey = Object.keys(colorPalettes).find(key => material.includes(key)) || 'casual';
    
    return colorPalettes[materialKey as keyof typeof colorPalettes] || colorPalettes.casual;
  };

  // Get category from section
  const getCategory = (section: string) => {
    const categoryMap = {
      'high': 'Premium Apparel',
      'moderate': 'Contemporary',
      'low': 'Essentials',
      'celebrity': 'Designer Collection',
      'instagram': 'Streetwear',
      'pinterest': 'Lifestyle',
      'seasonal': 'Seasonal Collection',
      'reports': 'Industry Trends',
      'premium': 'Luxury',
      'denim': 'Denim',
      'cotton': 'Cotton Basics'
    };
    return categoryMap[section as keyof typeof categoryMap] || 'Fashion';
  };

  // Calculate insights
  const getInsights = (productData: any) => {
    const cost = productData.details?.find((d: any) => d.label === 'Estimated Cost')?.value || '$0';
    const mrp = productData.details?.find((d: any) => d.label === 'Estimated MRP')?.value || '$0';
    const buildTime = productData.details?.find((d: any) => d.label === 'Build Time')?.value || '0 weeks';
    
    const costNum = parseInt(cost.replace(/[^0-9]/g, '')) || 0;
    const mrpNum = parseInt(mrp.replace(/[^0-9]/g, '')) || 0;
    const timeNum = parseInt(buildTime.replace(/[^0-9]/g, '')) || 0;
    
    const demandLevel = costNum > 500 ? 'High' : costNum > 100 ? 'Medium' : 'Low';
    const stockLevel = Math.random() > 0.5 ? 'Low Stock' : 'In Stock';
    const discount = mrpNum > costNum ? Math.round(((mrpNum - costNum) / mrpNum) * 100) : 0;
    
    return {
      demand: demandLevel,
      stockLevel,
      discount,
      timeNum,
      searchVolume: costNum > 500 ? 23 : costNum > 100 ? 15 : 8
    };
  };

  // Get material tags
  const getMaterialTags = (productData: any) => {
    const material = productData.details?.find((d: any) => d.label === 'Material')?.value || '';
    const materials = material.split(/[,&+]/).map((m: string) => m.trim()).filter(Boolean);
    
    // Add some additional material properties
    const additionalTags = [];
    if (material.toLowerCase().includes('organic')) additionalTags.push('Organic');
    if (material.toLowerCase().includes('cotton')) additionalTags.push('Breathable');
    if (material.toLowerCase().includes('silk')) additionalTags.push('Luxury');
    if (material.toLowerCase().includes('wool')) additionalTags.push('Warm');
    if (material.toLowerCase().includes('stretch') || material.toLowerCase().includes('elastane')) additionalTags.push('Stretch');
    
    return [...materials.slice(0, 2), ...additionalTags].slice(0, 4);
  };

  const colors = getColorOptions(productData);
  const category = getCategory(productData.section);
  const insights = getInsights(productData);
  const materialTags = getMaterialTags(productData);
  const cost = productData.details?.find((d: any) => d.label === 'Estimated Cost')?.value || '$0';
  const mrp = productData.details?.find((d: any) => d.label === 'Estimated MRP')?.value || '$0';

  return (
    <div className="fixed inset-0 bg-[#0E0E11] z-50 flex flex-col">
      {/* Navigation Header */}
      <div className="relative flex-shrink-0 h-16 flex items-center justify-between px-6 border-b border-[#2A2B30]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg bg-[#1C1D20] hover:bg-[#2A2B30] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-[#F5F6F7]" />
        </button>

        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-[14px] font-medium text-[#F5F6F7]">Product Details</span>
        </div>

        {/* More Actions Button */}
        <button className="w-10 h-10 rounded-lg bg-[#1C1D20] hover:bg-[#2A2B30] flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#F5F6F7]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Product Image */}
        <div className="flex-1 p-6 bg-[#0E0E11] flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl max-h-full flex items-center justify-center">
            <ImageWithFallback
              src={productData.src}
              alt={productData.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Find Similar Button */}
            <button
              onClick={() => onFindSimilar?.(productData.id || productData.section)}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#2A2B30] hover:bg-[#3A3B40] text-[#F5F6F7] rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span>Find Similar</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Product Details */}
        <div className="w-96 bg-[#1C1D20] border-l border-[#2A2B30] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="text-[12px] text-[#9CA3AF] uppercase tracking-wide">{category}</div>
                <div className="text-[10px] text-[#6B7280] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  JUL 24, 2025
                </div>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-[18px] font-medium text-[#F5F6F7] leading-tight">
                  {productData.alt}
                </h1>
              </div>

              {/* Brand */}
              <div className="flex items-center gap-3 p-4 bg-[#2A2B30] rounded-lg">
                <div className="w-8 h-8 bg-[#F5F6F7] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-[#0E0E11]">
                    {productData.alt.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[#F5F6F7] truncate">
                    {productData.alt.split(' ')[0]} <span className="text-[#9CA3AF]">@officialstore</span>
                  </div>
                  <div className="text-[10px] text-[#9CA3AF]">Brand Source</div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-[16px] font-medium text-[#F5F6F7]">{cost}</span>
                  {insights.discount > 0 && (
                    <span className="text-[12px] text-[#9CA3AF] line-through">{mrp}</span>
                  )}
                </div>
                {insights.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-full">
                      {insights.discount}% discount
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  insights.stockLevel === 'Low Stock' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                }`} />
                <span className="text-[12px] font-medium text-[#F5F6F7]">{insights.stockLevel}</span>
                {insights.stockLevel === 'Low Stock' && (
                  <span className="text-[10px] text-[#9CA3AF]">
                    15% stockout rate
                  </span>
                )}
              </div>

              {/* Materials */}
              <div className="space-y-3">
                <div className="text-[12px] font-medium text-[#F5F6F7]">Materials</div>
                <div className="flex flex-wrap gap-2">
                  {materialTags.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#2A2B30] text-[#F5F6F7] rounded-full text-[10px] font-medium"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <div className="text-[12px] font-medium text-[#F5F6F7]">Colors</div>
                <div className="flex flex-wrap gap-2">
                  {colors.slice(0, 6).map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColorIndex === index 
                          ? 'border-[#F5F6F7] scale-110' 
                          : 'border-[#2A2B30] hover:border-[#3A3B40]'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Color option ${index + 1}`}
                    />
                  ))}
                  {colors.length > 6 && (
                    <div className="w-8 h-8 rounded-full border-2 border-[#2A2B30] bg-[#2A2B30] flex items-center justify-center">
                      <span className="text-[8px] text-[#9CA3AF]">+{colors.length - 6}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Insight */}
              <div className="space-y-3 p-4 bg-[#2A2B30] rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#F5F6F7]" />
                  <span className="text-[12px] font-medium text-[#F5F6F7]">Key Insight</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                  High demand with {insights.searchVolume}% increase in search volume this month
                  <sup className="ml-1">
                    <a href="https://trends.google.com" target="_blank" rel="noopener noreferrer" 
                       className="text-[8px] text-[#F5F6F7] hover:text-[#FFFFFF] transition-colors bg-[#4285F4] px-1.5 py-0.5 rounded mx-0.5 font-medium">GT</a>
                    <a href="https://www.mckinsey.com/industries/retail/our-insights" target="_blank" rel="noopener noreferrer" 
                       className="text-[8px] text-[#F5F6F7] hover:text-[#FFFFFF] transition-colors bg-[#1B365C] px-1.5 py-0.5 rounded mx-0.5 font-medium">McK</a>
                  </sup>
                </p>
              </div>

              {/* Market Data */}
              <div className="space-y-4 p-4 bg-[#2A2B30] rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#F5F6F7]" />
                  <span className="text-[12px] font-medium text-[#F5F6F7]">Market Data</span>
                </div>
                <div className="text-[11px] text-[#9CA3AF] leading-relaxed">
                  Popular among 18-35 age demographic
                  <sup className="ml-1">
                    <a href="https://www.statista.com/markets/412/fashion/" target="_blank" rel="noopener noreferrer" 
                       className="text-[8px] text-[#F5F6F7] hover:text-[#FFFFFF] transition-colors bg-[#0F4C75] px-1.5 py-0.5 rounded mx-0.5 font-medium">S</a>
                  </sup>
                  {' '}with 42% female, 58% male preference split
                  <sup className="ml-1">
                    <a href="https://www.euromonitor.com/industries/fashion" target="_blank" rel="noopener noreferrer" 
                       className="text-[8px] text-[#F5F6F7] hover:text-[#FFFFFF] transition-colors bg-[#2E5A6B] px-1.5 py-0.5 rounded mx-0.5 font-medium">E</a>
                  </sup>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-[#2A2B30] rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#F5F6F7]" />
                  <span className="text-[12px] font-medium text-[#F5F6F7]">Trend Analysis</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                  Seasonal trend indicates peak demand in spring/summer
                  <sup className="ml-1">
                    <a href="https://www.wgsn.com" target="_blank" rel="noopener noreferrer" 
                       className="text-[8px] text-[#F5F6F7] hover:text-[#FFFFFF] transition-colors bg-[#E91E63] px-1.5 py-0.5 rounded mx-0.5 font-medium">W</a>
                  </sup>
                  . {insights.demand === 'High' ? ' Strong market position with premium pricing potential.' : ' Opportunity for volume-based growth strategy.'}
                </p>
              </div>

              {/* Sources Reference */}
              <div className="pt-4 border-t border-[#2A2B30]">
                <div className="text-[10px] text-[#6B7280] space-y-3">
                  <div className="font-medium text-[#F5F6F7]">Sources</div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="text-[8px] text-[#F5F6F7] bg-[#4285F4] px-1.5 py-0.5 rounded font-medium flex-shrink-0">GT</div>
                      <div className="text-[10px] text-[#9CA3AF]">Google Trends - Fashion Search Data</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[8px] text-[#F5F6F7] bg-[#1B365C] px-1.5 py-0.5 rounded font-medium flex-shrink-0">McK</div>
                      <div className="text-[10px] text-[#9CA3AF]">McKinsey Fashion Insights</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[8px] text-[#F5F6F7] bg-[#E91E63] px-1.5 py-0.5 rounded font-medium flex-shrink-0">W</div>
                      <div className="text-[10px] text-[#9CA3AF]">WGSN Trend Reports</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[8px] text-[#F5F6F7] bg-[#0F4C75] px-1.5 py-0.5 rounded font-medium flex-shrink-0">S</div>
                      <div className="text-[10px] text-[#9CA3AF]">Statista Market Research</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[8px] text-[#F5F6F7] bg-[#2E5A6B] px-1.5 py-0.5 rounded font-medium flex-shrink-0">E</div>
                      <div className="text-[10px] text-[#9CA3AF]">Euromonitor International</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4 border-t border-[#2A2B30] pt-6">
                <div className="text-[12px] font-medium text-[#F5F6F7]">Technical Details</div>
                <div className="space-y-3">
                  {productData.details?.slice(0, 6).map((detail: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-[11px] text-[#9CA3AF]">{detail.label}</span>
                      <span className="text-[11px] text-[#F5F6F7] font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}