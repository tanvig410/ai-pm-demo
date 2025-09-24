import { useState } from 'react';
import { X, Sliders, Palette, Settings, Layers, Zap } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export function FilterOverlay({ isOpen, onClose, onApplyFilters }: FilterOverlayProps) {
  const [activeTab, setActiveTab] = useState<'style' | 'quality' | 'materials' | 'optimize'>('style');
  
  // Filter states
  const [brandGuidelines, setBrandGuidelines] = useState(true);
  const [imageQuality, setImageQuality] = useState([85]);
  const [stylization, setStylization] = useState([100]);
  const [variety, setVariety] = useState([50]);
  const [sustainability, setSustainability] = useState([75]);
  
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['cotton']);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(['women']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['casual']);
  const [budgetRange, setBudgetRange] = useState([50, 500]);
  const [productionTime, setProductionTime] = useState([2, 12]);

  const materials = ['Cotton', 'Silk', 'Wool', 'Denim', 'Linen', 'Polyester'];
  const genders = ['Women', 'Men', 'Unisex'];
  const categories = ['Casual', 'Formal', 'Street', 'Athletic'];

  const handleMaterialToggle = (material: string) => {
    const lowerMaterial = material.toLowerCase();
    setSelectedMaterials(prev => 
      prev.includes(lowerMaterial) 
        ? prev.filter(m => m !== lowerMaterial)
        : [...prev, lowerMaterial]
    );
  };

  const handleGenderToggle = (gender: string) => {
    const lowerGender = gender.toLowerCase();
    setSelectedGenders(prev => 
      prev.includes(lowerGender) 
        ? prev.filter(g => g !== lowerGender)
        : [...prev, lowerGender]
    );
  };

  const handleCategoryToggle = (category: string) => {
    const lowerCategory = category.toLowerCase();
    setSelectedCategories(prev => 
      prev.includes(lowerCategory) 
        ? prev.filter(c => c !== lowerCategory)
        : [...prev, lowerCategory]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      brandGuidelines,
      imageQuality: imageQuality[0],
      stylization: stylization[0],
      variety: variety[0],
      sustainability: sustainability[0],
      materials: selectedMaterials,
      genders: selectedGenders,
      categories: selectedCategories,
      budgetRange,
      productionTime
    };
    
    onApplyFilters(filters);
    onClose();
  };

  const tabs = [
    { id: 'style' as const, label: 'Style', icon: Palette },
    { id: 'quality' as const, label: 'Quality', icon: Settings },
    { id: 'materials' as const, label: 'Materials', icon: Layers },
    { id: 'optimize' as const, label: 'Optimize', icon: Zap }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Very subtle backdrop */}
      <div 
        className="absolute inset-0 bg-black/5 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal positioned in bottom-center, now wider */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="w-[420px] bg-[#0E0E11]/98 backdrop-blur-md rounded-lg border border-[#2A2B30]/80 overflow-hidden shadow-2xl">
          {/* Header with Tabs */}
          <div className="border-b border-[#2A2B30]/50">
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#C1C4C8]" />
                <h3 className="text-xs font-medium text-[#C1C4C8]">AI Filters</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#2A2B30]/50 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </button>
            </div>
            
            {/* Compact Tabs */}
            <div className="flex px-4 pb-3 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded text-xs transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#3A3B40] text-[#E5E6E7] font-medium border border-[#4A4B50]/50'
                        : 'text-[#9CA3AF] hover:text-[#C1C4C8] hover:bg-[#2A2B30]/50'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Content */}
          <div className="p-4 max-h-72 overflow-y-auto scrollbar-hide">
            {/* Style Tab */}
            {activeTab === 'style' && (
              <div className="space-y-5">
                {/* Brand Guidelines */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-[#C1C4C8] font-medium">Brand Guidelines</label>
                    <Switch
                      checked={brandGuidelines}
                      onCheckedChange={setBrandGuidelines}
                    />
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed opacity-80">
                    Follow brand requirements and style guidelines
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Gender</label>
                  <div className="grid grid-cols-3 gap-2">
                    {genders.map((gender) => (
                      <button
                        key={gender}
                        onClick={() => handleGenderToggle(gender)}
                        className={`px-3 py-2 rounded text-xs transition-all duration-200 ${
                          selectedGenders.includes(gender.toLowerCase())
                            ? 'bg-[#3A3B40] text-[#E5E6E7] font-medium border border-[#4A4B50]/50'
                            : 'bg-[#1E1F23] text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-[#C1C4C8] border border-[#2A2B30]/40'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-3 py-2 rounded text-xs transition-all duration-200 ${
                          selectedCategories.includes(category.toLowerCase())
                            ? 'bg-[#3A3B40] text-[#E5E6E7] font-medium border border-[#4A4B50]/50'
                            : 'bg-[#1E1F23] text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-[#C1C4C8] border border-[#2A2B30]/40'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quality Tab */}
            {activeTab === 'quality' && (
              <div className="space-y-5">
                {/* Image Quality */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Quality</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {imageQuality[0]}%
                    </div>
                  </div>
                  <Slider
                    value={imageQuality}
                    onValueChange={setImageQuality}
                    max={100}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Higher values produce better image quality</p>
                </div>

                {/* Stylization */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Stylization</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {stylization[0]}%
                    </div>
                  </div>
                  <Slider
                    value={stylization}
                    onValueChange={setStylization}
                    max={200}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Controls artistic interpretation level</p>
                </div>

                {/* Variety */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Variety</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {variety[0]}%
                    </div>
                  </div>
                  <Slider
                    value={variety}
                    onValueChange={setVariety}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Diversity in generated results</p>
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div className="space-y-5">
                {/* Materials Grid */}
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Material Types</label>
                  <div className="grid grid-cols-3 gap-2">
                    {materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => handleMaterialToggle(material)}
                        className={`px-3 py-2 rounded text-xs transition-all duration-200 ${
                          selectedMaterials.includes(material.toLowerCase())
                            ? 'bg-[#3A3B40] text-[#E5E6E7] font-medium border border-[#4A4B50]/50'
                            : 'bg-[#1E1F23] text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-[#C1C4C8] border border-[#2A2B30]/40'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sustainability */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Sustainability</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {sustainability[0]}%
                    </div>
                  </div>
                  <Slider
                    value={sustainability}
                    onValueChange={setSustainability}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Eco-friendly material preferences</p>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Budget Range</label>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40">
                      ${budgetRange[0]}
                    </div>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40">
                      ${budgetRange[1]}
                    </div>
                  </div>
                  <Slider
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={1000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Cost range for materials and production</p>
                </div>
              </div>
            )}

            {/* Optimize Tab */}
            {activeTab === 'optimize' && (
              <div className="space-y-5">
                {/* Production Time */}
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Production Time</label>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40">
                      {productionTime[0]}w
                    </div>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40">
                      {productionTime[1]}w
                    </div>
                  </div>
                  <Slider
                    value={productionTime}
                    onValueChange={setProductionTime}
                    max={24}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Expected manufacturing timeline</p>
                </div>

                {/* Optimization Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                    <div>
                      <span className="text-sm text-[#C1C4C8] font-medium">Eco-Friendly</span>
                      <p className="text-xs text-[#9CA3AF] opacity-80">Prioritize sustainable practices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                    <div>
                      <span className="text-sm text-[#C1C4C8] font-medium">Cost Optimize</span>
                      <p className="text-xs text-[#9CA3AF] opacity-80">Minimize production costs</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                    <div>
                      <span className="text-sm text-[#C1C4C8] font-medium">Fast Production</span>
                      <p className="text-xs text-[#9CA3AF] opacity-80">Prioritize shorter lead times</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compact Footer */}
          <div className="flex items-center gap-3 p-4 border-t border-[#2A2B30]/40 bg-[#0E0E11]/50">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#C1C4C8] border border-[#2A2B30]/60 hover:border-[#3A3B40]/60 rounded transition-all duration-200 bg-transparent hover:bg-[#1E1F23]"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 text-sm text-[#0E0E11] bg-[#C1C4C8] hover:bg-[#D1D4D8] rounded transition-all duration-200 font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}