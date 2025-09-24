import { useState } from 'react';
import { Search, Filter, TrendingUp, DollarSign, Package, Plus } from 'lucide-react';
import { RecommendationFilters } from './RecommendationFilters';

interface RecommendationProps {
  onFilterChange: (category: string, filters: any) => void;
  onAddToProject: (imageData: any) => void;
  onOpenTechpack: (imageData: any) => void;
  onViewDetails: (imageData: any) => void;
  customImageData?: any;
  onAddImage?: (category: string, subcategory: string, imageData: any) => void;
  onRemoveImage?: (category: string, subcategory: string, imageIndex: number) => void;
  onOpenCustomModal?: () => void;
}

export function Recommendation({
  onFilterChange,
  onAddToProject,
  onOpenTechpack,
  onViewDetails,
  customImageData,
  onAddImage,
  onRemoveImage,
  onOpenCustomModal,
}: RecommendationProps) {
  const [activeTab, setActiveTab] = useState('Pricing');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    {
      id: 'pricing',
      label: 'Pricing',
      icon: DollarSign,
    },
    {
      id: 'trending',
      label: 'Trending',
      icon: TrendingUp,
    },
    {
      id: 'materialStock',
      label: 'Material Stock',
      icon: Package,
    },
    {
      id: 'custom',
      label: '+Custom',
      icon: Plus,
      isCustom: true,
    },
  ];

  const handleTabClick = (tab: any) => {
    if (tab.id === 'custom') {
      onOpenCustomModal?.();
    } else {
      setActiveTab(tab.label);
    }
  };

  const getActiveCategory = () => {
    const activeTabData = tabs.find(tab => tab.label === activeTab);
    return activeTabData?.id || 'pricing';
  };

  return (
    <div className="min-h-screen bg-[#0E0E11]">
      {/* Header with Tabs and Search on same line */}
      <div className="mb-8 px-6 pt-6">
        {/* Tabs and Search - Combined on same line */}
        <div className="flex items-center justify-between border-b border-[#2A2B30] pb-4">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 text-[14px] font-medium rounded-lg whitespace-nowrap transition-colors duration-200 relative flex items-center gap-2 ${
                    activeTab === tab.label && !tab.isCustom
                      ? 'text-[#F5F6F7]'
                      : tab.isCustom
                      ? 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1C1D20] border border-dashed border-[#3A3B40] hover:border-[#4A4B50]'
                      : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1C1D20]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.isCustom ? 'Custom' : tab.label}
                  {activeTab === tab.label && !tab.isCustom && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#F5F6F7]"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 bg-[#1C1D20] border border-[#2A2B30] rounded-lg text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3A3B40]"
            />
          </div>
        </div>
      </div>

      {/* Content - Full width, no padding constraints */}
      <div className="px-6">
        <RecommendationFilters
          onFilterChange={onFilterChange}
          onAddToProject={onAddToProject}
          onOpenTechpack={onOpenTechpack}
          onViewDetails={onViewDetails}
          customImageData={customImageData}
          onAddImage={onAddImage}
          onRemoveImage={onRemoveImage}
          activeCategory={getActiveCategory()}
        />
      </div>
    </div>
  );
}