import { useState, useEffect } from 'react';
import { X, Search, ChevronDown, Plus, Loader2 } from 'lucide-react';

interface MarketFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'stream' | 'insights';
  onFindSimilar?: (productId: string) => void;
  onSearch: (mode: 'stream' | 'insights', filters: FilterState) => void;
  existingFilters?: FilterState;
}

interface FilterState {
  // Market Stream filters
  gender: string;
  category: string;
  subcategory: string;
  style: string;
  weblinks: string[];
  productType: string;
  
  // Market Insights filters
  region: string;
  timeRange: string;
  insightType: string;
  marketSegment: string;
  dataSource: string;
}

export function MarketFilterOverlay({ isOpen, onClose, mode, onFindSimilar, onSearch, existingFilters }: MarketFilterOverlayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    // Market Stream filters
    gender: '',
    category: '',
    subcategory: '',
    style: '',
    weblinks: [''],
    productType: 'All Products',
    
    // Market Insights filters
    region: '',
    timeRange: '',
    insightType: '',
    marketSegment: '',
    dataSource: ''
  });

  // Update filters when existingFilters change
  useEffect(() => {
    if (existingFilters) {
      setFilters(existingFilters);
    }
  }, [existingFilters]);

  // Filter options
  const genderOptions = ['Ladies', 'Men\'s', 'Girls', 'Boys', 'Baby', 'Unisex'];
  const categoryOptions = ['Casual Wear', 'Outerwear', 'Formal Wear', 'Swimwear', 'Activewear', 'Loungewear'];
  const subcategoryOptions = ['T-Shirts', 'Jeans', 'Hoodies', 'Sneakers', 'Dresses', 'Jackets', 'Accessories'];
  const styleOptions = ['Strappy', 'Tank', 'Blouse', 'Fitted', 'Oversized', 'Cropped', 'High-waisted'];
  const productTypeOptions = ['All Products', 'Footwear', 'Outerwear', 'Activewear', 'Casual', 'Accessories', 'Formal'];
  
  const regionOptions = ['Global', 'North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const timeRangeOptions = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year'];
  const insightTypeOptions = ['Pricing Analysis', 'Market Trends', 'Consumer Behavior', 'Competitive Analysis'];
  const marketSegmentOptions = ['Women\'s Fashion', 'Men\'s Fashion', 'Activewear', 'Luxury', 'Fast Fashion'];
  const dataSourceOptions = ['All Sources', 'E-commerce', 'Social Media', 'Fashion Weeks', 'Industry Reports'];

  // Close modal on escape key
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

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleWeblinkChange = (index: number, value: string) => {
    const newWeblinks = [...filters.weblinks];
    newWeblinks[index] = value;
    setFilters(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const addWeblink = () => {
    setFilters(prev => ({ ...prev, weblinks: [...prev.weblinks, ''] }));
  };

  const removeWeblink = (index: number) => {
    const newWeblinks = filters.weblinks.filter((_, i) => i !== index);
    setFilters(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Pass the filters back to parent and close overlay
      onSearch(mode, filters);
      onClose();
    }, 1500);
  };

  const clearFilters = () => {
    setFilters({
      gender: '',
      category: '',
      subcategory: '',
      style: '',
      weblinks: [''],
      productType: 'All Products',
      region: '',
      timeRange: '',
      insightType: '',
      marketSegment: '',
      dataSource: ''
    });
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]/95 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container - positioned below category buttons */}
      <div className="absolute inset-0" style={{ paddingTop: '140px' }}>
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="bg-[#1C1D20] rounded-lg border border-[#2A2B30] overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2A2B30]">
              <div>
                <h2 className="text-[20px] font-medium text-[#F5F6F7]">
                  {mode === 'stream' ? 'Market Stream Filters' : 'Market Insights Filters'}
                </h2>
                <p className="text-[14px] text-[#9CA3AF] mt-1">
                  {mode === 'stream' 
                    ? 'Filter real-time product data from across the web'
                    : 'Analyze market trends and consumer insights'
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Filter Form */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {mode === 'stream' ? (
                    <>
                      {/* Market Stream Filters */}
                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Gender</label>
                        <div className="relative">
                          <select
                            value={filters.gender}
                            onChange={(e) => handleFilterChange('gender', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Gender</option>
                            {genderOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Category</label>
                        <div className="relative">
                          <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Category</option>
                            {categoryOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Subcategory</label>
                        <div className="relative">
                          <select
                            value={filters.subcategory}
                            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Subcategory</option>
                            {subcategoryOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Style</label>
                        <div className="relative">
                          <select
                            value={filters.style}
                            onChange={(e) => handleFilterChange('style', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Style</option>
                            {styleOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Product Type</label>
                        <div className="relative">
                          <select
                            value={filters.productType}
                            onChange={(e) => handleFilterChange('productType', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            {productTypeOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      {/* Website Links */}
                      <div className="lg:col-span-3">
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Website Links (Optional)</label>
                        <div className="space-y-3">
                          {filters.weblinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="url"
                                value={link}
                                onChange={(e) => handleWeblinkChange(index, e.target.value)}
                                placeholder="https://example.com"
                                className="flex-1 bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 text-[14px] text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#F5F6F7]"
                              />
                              {filters.weblinks.length > 1 && (
                                <button
                                  onClick={() => removeWeblink(index)}
                                  className="p-2 text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={addWeblink}
                            className="flex items-center gap-2 px-3 py-2 text-[14px] font-medium text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add Website Link
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Market Insights Filters */}
                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Region</label>
                        <div className="relative">
                          <select
                            value={filters.region}
                            onChange={(e) => handleFilterChange('region', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Region</option>
                            {regionOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Time Range</label>
                        <div className="relative">
                          <select
                            value={filters.timeRange}
                            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Time Range</option>
                            {timeRangeOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Insight Type</label>
                        <div className="relative">
                          <select
                            value={filters.insightType}
                            onChange={(e) => handleFilterChange('insightType', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Insight Type</option>
                            {insightTypeOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Market Segment</label>
                        <div className="relative">
                          <select
                            value={filters.marketSegment}
                            onChange={(e) => handleFilterChange('marketSegment', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Market Segment</option>
                            {marketSegmentOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">Data Source</label>
                        <div className="relative">
                          <select
                            value={filters.dataSource}
                            onChange={(e) => handleFilterChange('dataSource', e.target.value)}
                            className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none"
                          >
                            <option value="">Select Data Source</option>
                            {dataSourceOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2A2B30]">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-[14px] font-medium text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSearch}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2 text-[14px] font-medium text-[#0E0E11] bg-[#F5F6F7] hover:bg-[#E5E6E7] rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Searching...
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}