import { useState, useRef, useEffect } from 'react';
import { X, Search, MapPin, Users, Palette, DollarSign, Zap, Clock, Package2, Lightbulb, TrendingUp, Tag, ChevronDown } from 'lucide-react';

interface CustomRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCustomFilter: (filterData: any) => void;
}

export function CustomRecommendationModal({
  isOpen,
  onClose,
  onCreateCustomFilter,
}: CustomRecommendationModalProps) {
  const [filterName, setFilterName] = useState('');
  const [costRange, setCostRange] = useState([0, 2000]);
  const [demand, setDemand] = useState('medium');
  const [region, setRegion] = useState('global');
  const [materials, setMaterials] = useState<string[]>([]);
  const [gender, setGender] = useState('unisex');
  const [searchPrompt, setSearchPrompt] = useState('');
  const [brandGuidelines, setBrandGuidelines] = useState(true);
  const [optimizations, setOptimizations] = useState({
    price: 70,
    materialCost: 50,
    materialAvailability: 60,
    leadTime: 40,
  });

  // Hard constraints search functionality - moved to be with other hooks
  const [constraintInput, setConstraintInput] = useState('');
  const [constraints, setConstraints] = useState<Array<{id: string, type: string, value: string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<{type: string, value: string}>>([]);
  const constraintInputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside - moved to be with other hooks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (constraintInputRef.current && !constraintInputRef.current.closest('.relative')?.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const regions = [
    { id: 'global', label: 'Global' },
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia-pacific', label: 'Asia-Pacific' },
    { id: 'latin-america', label: 'Latin America' },
    { id: 'middle-east', label: 'Middle East' },
    { id: 'africa', label: 'Africa' },
  ];

  const materialOptions = [
    'Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim', 'Leather',
    'Cashmere', 'Modal', 'Bamboo', 'Hemp', 'Tencel', 'Viscose', 'Nylon'
  ];

  const demandLevels = [
    { id: 'low', label: 'Low Demand', color: 'bg-blue-500' },
    { id: 'medium', label: 'Medium Demand', color: 'bg-yellow-500' },
    { id: 'high', label: 'High Demand', color: 'bg-red-500' },
  ];

  const genderOptions = [
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'kids', label: 'Kids' },
  ];

  // Constraint suggestions database
  const constraintSuggestions = [
    // Item Codes
    { type: 'Item Code', value: 'SKU-001' },
    { type: 'Item Code', value: 'BLZ-2024-001' },
    { type: 'Item Code', value: 'DRS-SUM-2024' },
    { type: 'Item Code', value: 'TNK-BSC-001' },
    { type: 'Item Code', value: 'JKT-DNM-002' },
    
    // Colors
    { type: 'Color', value: 'Navy Blue' },
    { type: 'Color', value: 'Forest Green' },
    { type: 'Color', value: 'Burgundy' },
    { type: 'Color', value: 'Cream White' },
    { type: 'Color', value: 'Charcoal Gray' },
    { type: 'Color', value: 'Rust Orange' },
    { type: 'Color', value: 'Dusty Pink' },
    { type: 'Color', value: 'Midnight Black' },
    
    // Fabrics
    { type: 'Fabric', value: 'Organic Cotton' },
    { type: 'Fabric', value: 'Merino Wool' },
    { type: 'Fabric', value: 'Italian Silk' },
    { type: 'Fabric', value: 'Stretch Denim' },
    { type: 'Fabric', value: 'Cashmere Blend' },
    { type: 'Fabric', value: 'Linen Canvas' },
    { type: 'Fabric', value: 'French Terry' },
    { type: 'Fabric', value: 'Ponte Knit' },
    
    // Patterns
    { type: 'Pattern', value: 'Floral Print' },
    { type: 'Pattern', value: 'Geometric' },
    { type: 'Pattern', value: 'Stripes' },
    { type: 'Pattern', value: 'Polka Dots' },
    { type: 'Pattern', value: 'Abstract' },
    { type: 'Pattern', value: 'Paisley' },
    { type: 'Pattern', value: 'Checkered' },
    { type: 'Pattern', value: 'Solid Color' },
    
    // Silhouettes
    { type: 'Silhouette', value: 'A-Line' },
    { type: 'Silhouette', value: 'Fit & Flare' },
    { type: 'Silhouette', value: 'Straight Cut' },
    { type: 'Silhouette', value: 'Oversized' },
    { type: 'Silhouette', value: 'Slim Fit' },
    { type: 'Silhouette', value: 'Relaxed' },
    { type: 'Silhouette', value: 'Tailored' },
    { type: 'Silhouette', value: 'Cropped' },
  ];

  const handleMaterialToggle = (material: string) => {
    setMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleOptimizationChange = (key: string, value: number) => {
    setOptimizations(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Constraint handling functions
  const handleConstraintInputChange = (value: string) => {
    setConstraintInput(value);
    
    if (value.length > 0) {
      const filtered = constraintSuggestions.filter(suggestion =>
        suggestion.value.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddConstraint = (suggestion: {type: string, value: string}) => {
    console.log('Adding constraint:', suggestion); // Debug log
    
    const newConstraint = {
      id: `${suggestion.type.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: suggestion.type,
      value: suggestion.value
    };
    
    // Check if constraint already exists
    const exists = constraints.some(c => c.type === suggestion.type && c.value === suggestion.value);
    console.log('Constraint exists:', exists); // Debug log
    console.log('Current constraints:', constraints); // Debug log
    
    if (!exists) {
      setConstraints(prev => {
        const updated = [...prev, newConstraint];
        console.log('Updated constraints:', updated); // Debug log
        return updated;
      });
    } else {
      console.log('Constraint already exists, not adding duplicate');
    }
    
    setConstraintInput('');
    setShowSuggestions(false);
    
    // Use setTimeout to ensure the input focus happens after state updates
    setTimeout(() => {
      if (constraintInputRef.current) {
        constraintInputRef.current.focus();
      }
    }, 0);
  };

  const handleRemoveConstraint = (id: string) => {
    setConstraints(prev => prev.filter(c => c.id !== id));
  };

  const handleConstraintKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && constraintInput.trim()) {
      e.preventDefault();
      // Handle comma-separated values
      const values = constraintInput.split(',').map(v => v.trim()).filter(v => v.length > 0);
      
      const newConstraints = values.map(value => ({
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'Custom',
        value: value
      })).filter(newConstraint => {
        // Check if constraint doesn't already exist
        return !constraints.some(c => c.type === newConstraint.type && c.value === newConstraint.value);
      });
      
      if (newConstraints.length > 0) {
        setConstraints(prev => [...prev, ...newConstraints]);
      }
      
      setConstraintInput('');
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Backspace' && constraintInput === '' && constraints.length > 0) {
      // Remove last constraint when backspace is pressed on empty input
      setConstraints(prev => prev.slice(0, -1));
    }
  };



  const handleCreateFilter = () => {
    const filterData = {
      name: filterName || 'Custom Filter',
      costRange,
      demand,
      region,
      materials,
      gender,
      searchPrompt,
      brandGuidelines,
      optimizations,
      constraints,
      createdAt: new Date().toISOString(),
    };

    onCreateCustomFilter(filterData);
    onClose();
  };

  const handleReset = () => {
    setFilterName('');
    setCostRange([0, 2000]);
    setDemand('medium');
    setRegion('global');
    setMaterials([]);
    setGender('unisex');
    setSearchPrompt('');
    setBrandGuidelines(true);
    setOptimizations({
      price: 70,
      materialCost: 50,
      materialAvailability: 60,
      leadTime: 40,
    });
    setConstraints([]);
    setConstraintInput('');
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1C1D20] rounded-lg border border-[#2A2B30] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B30]">
          <div>
            <h2 className="text-[18px] font-medium text-[#F5F6F7]">Custom Recommendation Filter</h2>
            <p className="text-[12px] text-[#9CA3AF] mt-1">
              Define detailed filters to create personalized recommendations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-[12px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#2A2B30] hover:bg-[#3A3B40] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[#F5F6F7]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Top Section - Filter Name, Brand Guidelines and Custom Prompt */}
          <div className="space-y-6 mb-8 pb-6 border-b border-[#2A2B30]">
            {/* Filter Name */}
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#F5F6F7]">
                Filter Name
              </label>
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Enter custom filter name..."
                className="w-full px-3 py-2 bg-[#2A2B30] border border-[#3A3B40] rounded-lg text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4A4B50] text-[14px]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Brand Guidelines Toggle */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#F5F6F7]" />
                  <label className="text-[12px] font-medium text-[#F5F6F7]">
                    Brand Guidelines
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2B30] rounded-lg">
                  <div>
                    <div className="text-[12px] text-[#F5F6F7]">Follow Brand Guidelines</div>
                    <div className="text-[10px] text-[#9CA3AF]">
                      Recommendations will align with your brand identity
                    </div>
                  </div>
                  <button
                    onClick={() => setBrandGuidelines(!brandGuidelines)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      brandGuidelines ? 'bg-[#F5F6F7]' : 'bg-[#3A3B40]'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-[#0E0E11] transition-transform ${
                        brandGuidelines ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#F5F6F7]" />
                  <label className="text-[12px] font-medium text-[#F5F6F7]">
                    Custom Prompt
                  </label>
                </div>
                <textarea
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="Describe what you're looking for in recommendations..."
                  rows={2}
                  className="w-full px-3 py-2 bg-[#2A2B30] border border-[#3A3B40] rounded-lg text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4A4B50] text-[14px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Hard Constraints Section */}
          <div className="mb-8 pb-6 border-b border-[#2A2B30]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#F5F6F7]" />
                <label className="text-[12px] font-medium text-[#F5F6F7]">
                  Hard Constraints
                </label>
                <span className="text-[10px] text-[#9CA3AF]">
                  Add specific requirements (Item codes, Colors, Fabrics, Patterns, Silhouettes)
                </span>
                {constraints.length > 0 && (
                  <span className="text-[10px] text-[#6366F1] bg-[#1C1D20] px-2 py-0.5 rounded-full">
                    {constraints.length} active
                  </span>
                )}
              </div>
              
              {/* Constraint Input with Inline Chips */}
              <div className="relative">
                {/* Input Container with Chips */}
                <div className="min-h-[40px] px-3 py-2 bg-[#2A2B30] border border-[#3A3B40] rounded-lg focus-within:border-[#4A4B50] transition-colors">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Constraint Chips */}
                    {constraints.map((constraint) => (
                      <div
                        key={constraint.id}
                        className="flex items-center gap-1 px-2 py-1 bg-[#4A5568] text-[#F5F6F7] rounded-full text-[11px] font-medium shrink-0"
                      >
                        <span className="text-[9px] text-[#CBD5E0] font-normal">
                          {constraint.type}:
                        </span>
                        <span>{constraint.value}</span>
                        <button
                          onClick={() => handleRemoveConstraint(constraint.id)}
                          className="ml-0.5 hover:bg-[#5A6578] rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Input Field */}
                    <input
                      ref={constraintInputRef}
                      type="text"
                      value={constraintInput}
                      onChange={(e) => handleConstraintInputChange(e.target.value)}
                      onKeyDown={handleConstraintKeyDown}
                      placeholder={constraints.length === 0 ? "Type to search or enter comma-separated values (e.g. Navy Blue, Cotton, A-Line)..." : "Add more constraints..."}
                      className="flex-1 min-w-[200px] bg-transparent text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none text-[14px]"
                    />
                  </div>
                </div>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#2A2B30] border border-[#3A3B40] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                      <button
                        key={`${suggestion.type}-${suggestion.value}-${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Dropdown click handler triggered:', suggestion);
                          handleAddConstraint(suggestion);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-[#3A3B40] flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-[12px] text-[#F5F6F7]">{suggestion.value}</div>
                          <div className="text-[10px] text-[#9CA3AF]">{suggestion.type}</div>
                        </div>
                        <ChevronDown className="w-3 h-3 text-[#9CA3AF] transform rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Soft Constraints Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-[#F5F6F7]" />
              <label className="text-[14px] font-medium text-[#F5F6F7]">
                Soft Constraints
              </label>
              <span className="text-[10px] text-[#9CA3AF]">
                Flexible preferences that guide recommendations
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">

                {/* Cost Range */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Cost Range
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#9CA3AF]">
                      <span>${costRange[0]}</span>
                      <span>${costRange[1]}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={costRange[1]}
                        onChange={(e) => setCostRange([costRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-[#2A2B30] rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3A3B40 0%, #F5F6F7 ${(costRange[1] / 2000) * 100}%, #2A2B30 ${(costRange[1] / 2000) * 100}%, #2A2B30 100%)`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Demand Level */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Demand Level
                    </label>
                  </div>
                  <div className="flex gap-2">
                    {demandLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setDemand(level.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                          demand === level.id
                            ? 'bg-[#F5F6F7] text-[#0E0E11]'
                            : 'bg-[#2A2B30] text-[#9CA3AF] hover:bg-[#3A3B40] hover:text-[#F5F6F7]'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${level.color}`} />
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Region
                    </label>
                  </div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2B30] border border-[#3A3B40] rounded-lg text-[#F5F6F7] focus:outline-none focus:border-[#4A4B50] text-[14px]"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#2A2B30]">
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Gender
                    </label>
                  </div>
                  <div className="flex gap-2">
                    {genderOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setGender(option.id)}
                        className={`px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                          gender === option.id
                            ? 'bg-[#F5F6F7] text-[#0E0E11]'
                            : 'bg-[#2A2B30] text-[#9CA3AF] hover:bg-[#3A3B40] hover:text-[#F5F6F7]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Materials */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Materials
                    </label>
                    <span className="text-[10px] text-[#9CA3AF]">
                      ({materials.length} selected)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {materialOptions.map((material) => (
                      <button
                        key={material}
                        onClick={() => handleMaterialToggle(material)}
                        className={`px-2 py-1.5 rounded text-[11px] font-medium transition-colors ${
                          materials.includes(material)
                            ? 'bg-[#F5F6F7] text-[#0E0E11]'
                            : 'bg-[#2A2B30] text-[#9CA3AF] hover:bg-[#3A3B40] hover:text-[#F5F6F7]'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optimization Factors */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#F5F6F7]" />
                    <label className="text-[12px] font-medium text-[#F5F6F7]">
                      Optimization Factors
                    </label>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(optimizations).map(([key, value]) => {
                      const labels = {
                        price: 'Optimize Price',
                        materialCost: 'Material Cost',
                        materialAvailability: 'Material Availability',
                        leadTime: 'Lead Time',
                      };
                      
                      const icons = {
                        price: DollarSign,
                        materialCost: Package2,
                        materialAvailability: Package2,
                        leadTime: Clock,
                      };
                      
                      const Icon = icons[key as keyof typeof icons];
                      
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="w-3 h-3 text-[#9CA3AF]" />
                              <span className="text-[11px] text-[#F5F6F7]">
                                {labels[key as keyof typeof labels]}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#9CA3AF]">{value}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleOptimizationChange(key, parseInt(e.target.value))}
                            className="w-full h-1.5 bg-[#2A2B30] rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #F5F6F7 0%, #F5F6F7 ${value}%, #2A2B30 ${value}%, #2A2B30 100%)`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#2A2B30]">
          <div className="text-[12px] text-[#9CA3AF]">
            Custom filters help create more targeted recommendations
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateFilter}
              className="px-6 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg text-[14px] font-medium hover:bg-[#E5E6E7] transition-colors"
            >
              Create Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}