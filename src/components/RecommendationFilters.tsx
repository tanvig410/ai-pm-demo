import React from 'react';
import { Heart, FolderPlus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecommendationFiltersProps {
  onFilterChange: (category: string, filters: any) => void;
  onAddToProject: (imageData: any) => void;
  onOpenTechpack: (imageData: any) => void;
  onViewDetails: (imageData: any) => void;
  customImageData?: any;
  onAddImage?: (category: string, subcategory: string, imageData: any) => void;
  onRemoveImage?: (category: string, subcategory: string, imageIndex: number) => void;
  activeCategory?: string; // New prop to control which category to show
}

export function RecommendationFilters({
  onFilterChange,
  onAddToProject,
  onOpenTechpack,
  onViewDetails,
  customImageData,
  onAddImage,
  onRemoveImage,
  activeCategory = 'pricing', // Default to pricing
}: RecommendationFiltersProps) {

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

  const getMaterialInfo = (imageData: any) => {
    const materialDetail = imageData.details?.find((d: any) => d.label === 'Material' || d.label === 'Major Material Used');
    if (materialDetail) return materialDetail.value;
    
    const materialMap = {
      'high': 'Premium Silk',
      'moderate': 'Cotton Blend',
      'low': 'Basic Cotton',
      'premium': 'Luxury Materials',
      'denim': 'Stretch Denim',
      'cotton': 'Organic Cotton',
      'celebrity': 'Designer Fabrics',
      'instagram': 'Trendy Materials',
    };
    
    return materialMap[imageData.section as keyof typeof materialMap] || 'Mixed Materials';
  };

  const getAdditionalStats = (imageData: any) => {
    const cost = imageData.details?.find((d: any) => d.label === 'Estimated Cost')?.value || '$0';
    const buildTime = imageData.details?.find((d: any) => d.label === 'Build Time')?.value || '0 weeks';
    const mrp = imageData.details?.find((d: any) => d.label === 'Estimated MRP')?.value || '$0';
    
    const costNum = parseInt(cost.replace(/[^0-9]/g, '')) || 0;
    const timeNum = parseInt(buildTime.replace(/[^0-9]/g, '')) || 0;
    const mrpNum = parseInt(mrp.replace(/[^0-9]/g, '')) || 0;
    
    const margin = mrpNum > 0 ? Math.round(((mrpNum - costNum) / mrpNum) * 100) : 0;
    const demandLevel = costNum > 500 ? 'High' : costNum > 100 ? 'Medium' : 'Low';
    const complexity = timeNum > 12 ? 'Complex' : timeNum > 6 ? 'Moderate' : 'Simple';
    
    return {
      margin: `${margin}%`,
      demand: demandLevel,
      complexity: complexity,
      timeValue: `${timeNum}w`,
    };
  };

  // Get section headers based on active category
  const getSectionHeaders = () => {
    const headers = {
      pricing: [
        { id: 'high', title: 'High End ($500+)', subtitle: 'Premium luxury products' },
        { id: 'moderate', title: 'Mid Range ($50-500)', subtitle: 'Quality balanced products' },
        { id: 'low', title: 'Budget Friendly (<$50)', subtitle: 'Affordable essential products' },
      ],
      trending: [
        { id: 'celebrity', title: 'Celebrity Inspired', subtitle: 'Red carpet and award show styles' },
        { id: 'instagram', title: 'Instagram Trending', subtitle: 'Popular social media styles' },
        { id: 'pinterest', title: 'Pinterest Favorites', subtitle: 'Most pinned aesthetic styles' },
        { id: 'seasonal', title: 'Seasonal Collections', subtitle: 'Current season highlights' },
        { id: 'reports', title: 'Industry Reports', subtitle: 'Data-driven trend insights' },
      ],
      materialStock: [
        { id: 'inStock', title: 'In Stock Materials', subtitle: 'Ready to order inventory' },
        { id: 'lowStock', title: 'Limited Availability', subtitle: 'Order soon before stock runs out' },
        { id: 'cotton', title: 'Cotton Collections', subtitle: 'Natural fiber focused designs' },
        { id: 'premium', title: 'Premium Materials', subtitle: 'Luxury fabric selections' },
        { id: 'denim', title: 'Denim Essentials', subtitle: 'Classic and contemporary denim' },
      ],
    };
    return headers[activeCategory as keyof typeof headers] || [];
  };

  return (
    <div>

      {/* Section Headers with Images */}
      {getSectionHeaders().map((section) => {
        const sectionImages = customImageData?.[activeCategory]?.[section.id] || [];
        
        if (sectionImages.length === 0) return null;
        
        return (
          <div key={section.id} className="mb-8">
            {/* Section Header */}
            <div className="mb-4">
              <h2 className="text-[18px] font-medium text-[#F5F6F7] mb-1">
                {section.title}
              </h2>
              <p className="text-[14px] text-[#9CA3AF]">
                {section.subtitle}
              </p>
              <div className="text-[12px] text-[#6B7280] mt-2">
                {sectionImages.length} recommendations
              </div>
            </div>

            {/* Enhanced Image Grid for this section with better spacing */}
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))' }}>
              {sectionImages.map((image: any, index: number) => {
                const colors = getColorOptions(image);
                const material = getMaterialInfo(image);
                const stats = getAdditionalStats(image);
                const avgCost = image.details?.find((d: any) => d.label === 'Estimated Cost')?.value || '$0';
                
                return (
                  <div
                    key={`${section.id}-${index}`}
                    className="bg-[#2A2B30] overflow-hidden border border-[#3A3B40] hover:border-[#4A4B50] transition-all duration-300 group w-full flex flex-col"
                    style={{ height: '520px', maxWidth: '320px' }}
                  >
              {/* Image */}
              <div className="relative overflow-hidden w-full" style={{ height: '280px' }}>
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                {image.badge && (
                  <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[8px] font-medium text-white ${image.badgeColor}`}>
                    {image.badge}
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    title="Add to favorites"
                  >
                    <Heart className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToProject(image);
                    }}
                    className="w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    title="Add to project"
                  >
                    <FolderPlus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Enhanced Information Section */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                {/* Content Area */}
                <div className="space-y-2.5">
                  {/* Title */}
                  <h3 className="text-[14px] font-medium text-[#F5F6F7] line-clamp-1">
                    {image.alt}
                  </h3>
                  
                  {/* Material */}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#9CA3AF]">Material:</span>
                    <span className="text-[12px] text-[#F5F6F7] font-medium">{material}</span>
                  </div>
                  
                  {/* Color Options */}
                  <div className="space-y-1.5">
                    <span className="text-[12px] text-[#9CA3AF]">Colors:</span>
                    <div className="flex gap-1.5">
                      {colors.slice(0, 5).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full border border-[#3A3B40] cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={`Color option ${colorIndex + 1}`}
                        />
                      ))}
                      {colors.length > 5 && (
                        <div className="w-4 h-4 rounded-full border border-[#3A3B40] bg-[#3A3B40] flex items-center justify-center">
                          <span className="text-[8px] text-[#9CA3AF]">+{colors.length - 5}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Average Cost */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#9CA3AF]">Cost:</span>
                    <span className="text-[13px] font-medium text-[#F5F6F7]">{avgCost}</span>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-4 gap-1.5 text-center border-t border-[#3A3B40] pt-2.5">
                    <div>
                      <div className="text-[10px] text-[#9CA3AF]">Margin</div>
                      <div className="text-[11px] font-medium text-[#F5F6F7]">{stats.margin}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF]">Demand</div>
                      <div className={`text-[11px] font-medium ${
                        stats.demand === 'High' ? 'text-[#10B981]' : 
                        stats.demand === 'Medium' ? 'text-[#F59E0B]' : 
                        'text-[#EF4444]'
                      }`}>
                        {stats.demand}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF]">Time</div>
                      <div className="text-[11px] font-medium text-[#F5F6F7]">{stats.timeValue}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF]">Level</div>
                      <div className="text-[11px] font-medium text-[#9CA3AF]">{stats.complexity}</div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Action Buttons - positioned at bottom */}
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={() => onViewDetails(image)}
                    className="flex-1 px-3 py-2 bg-[#3A3B40] text-[#F5F6F7] text-[11px] font-medium hover:bg-[#4A4B50] transition-colors rounded-md"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onOpenTechpack(image)}
                    className="flex-1 px-3 py-2 bg-[#4A4B50] text-[#F5F6F7] text-[11px] font-medium hover:bg-[#5A5B60] transition-colors rounded-md"
                  >
                    Techpack
                  </button>
                </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );})}

      {/* Empty State */}
      {getSectionHeaders().every(section => (customImageData?.[activeCategory]?.[section.id]?.length || 0) === 0) && (
        <div className="text-center py-12">
          <div className="text-[#9CA3AF] text-[16px] mb-2">No recommendations found</div>
          <div className="text-[#6B7280] text-[14px]">Try switching to a different category</div>
        </div>
      )}
    </div>
  );
}