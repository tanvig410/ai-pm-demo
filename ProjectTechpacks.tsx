import { useState } from 'react';
import { ArrowLeft, Plus, Filter, MoreHorizontal, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  lastModified: string;
  collaborators: number;
  status: 'active' | 'archived' | 'draft';
  coverImage: string;
  category: 'active' | 'recent' | 'archived';
}

interface Techpack {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: 'in-progress' | 'completed' | 'review' | 'approved';
  lastModified: string;
  folder?: string;
  estimatedCost: string;
  buildTime: string;
  materials: string[];
}

interface ProjectTechpacksProps {
  project: Project;
  onBack: () => void;
  onTechpackClick?: (techpack: Techpack) => void;
  onAddToProject?: (techpack: Techpack) => void;
  onCreateTechpack?: (techpack: Techpack) => void;
}

export function ProjectTechpacks({ project, onBack, onTechpackClick, onAddToProject, onCreateTechpack }: ProjectTechpacksProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [hoveredTechpack, setHoveredTechpack] = useState<string | null>(null);

  const techpacks: Techpack[] = [
    {
      id: '1',
      name: 'Striped Cotton Tee',
      description: 'Classic striped cotton t-shirt with modern fit',
      images: [
        'https://www.andamen.com/cdn/shop/products/02_466dd888-96ab-48d2-889e-bf1e80d7d0f7.jpg?v=1743150529',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/9c61d464-e420-426f-b468-c68135d777f3.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/4c7e8071-6076-491b-b6e4-e3ad55b836ec.png'
      ],
      status: 'completed',
      lastModified: '2 days ago',
      folder: 'Basics',
      estimatedCost: '$24.50',
      buildTime: '2 weeks',
      materials: ['Cotton', 'Elastane']
    },
    {
      id: '2',
      name: 'Denim Jacket',
      description: 'Vintage-style denim jacket with distressed finish',
      images: [
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$',
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_lifestyle?$rl_4x5_zoom$'
      ],
      status: 'in-progress',
      lastModified: '1 day ago',
      folder: 'Basics',
      estimatedCost: '$89.00',
      buildTime: '4 weeks',
      materials: ['Denim', 'Metal Hardware']
    },
    {
      id: '3',
      name: 'Midi Wrap Dress',
      description: 'Flowing midi dress with wrap silhouette',
      images: [
        'https://static.zara.net/assets/public/74d8/7667/80d5487a82ba/54ab16af7b49/05029172330-p/05029172330-p.jpg?ts=1753515381675&w=1254',
        'https://static.zara.net/assets/public/2be5/5d45/f4df41dc9f9e/f1637572332e/05029172330-e1/05029172330-e1.jpg?ts=1753367784104&w=1125',
        'https://static.zara.net/assets/public/6b65/eb6b/1b5b4015ab6f/e05dc0338ae6/05029172330-e2/05029172330-e2.jpg?ts=1753367783666&w=1125'
      ],
      status: 'review',
      lastModified: '3 days ago',
      folder: 'Basics',
      estimatedCost: '$67.25',
      buildTime: '3 weeks',
      materials: ['Viscose', 'Polyester']
    },
    {
      id: '4',
      name: 'Chino Pants',
      description: 'Utility-style chino pants with multiple pockets',
      images: [
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_alternate10?$rl_4x5_pdp$',
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_lifestyle?$rl_4x5_zoom$'
      ],
      status: 'in-progress',
      lastModified: '5 days ago',
      folder: 'Basics',
      estimatedCost: '$45.75',
      buildTime: '2.5 weeks',
      materials: ['Cotton Canvas', 'Hardware']
    },
    {
      id: '5',
      name: 'Knit Cardigan',
      description: 'Soft knit cardigan with button closure',
      images: [
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211972104002_alternate10?$rl_4x5_pdp$',
        'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211972104002_lifestyle?$rl_4x5_zoom$'
      ],
      status: 'completed',
      lastModified: '1 week ago',
      folder: 'Knitwear',
      estimatedCost: '$56.30',
      buildTime: '3 weeks',
      materials: ['Wool Blend', 'Buttons']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-blue-400';
      case 'review':
        return 'text-yellow-400';
      case 'approved':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'review':
        return 'bg-yellow-600';
      case 'approved':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const filteredTechpacks = techpacks.filter(techpack => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return techpack.status === 'in-progress';
    if (activeTab === 'completed') return techpack.status === 'completed';
    return true;
  });

  const groupedTechpacks = filteredTechpacks.reduce((acc, techpack) => {
    const folder = techpack.folder || 'Uncategorized';
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(techpack);
    return acc;
  }, {} as { [key: string]: Techpack[] });

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleActionMenuToggle = (e: React.MouseEvent, techpackId: string) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === techpackId ? null : techpackId);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(null);
  };

  const renderActionMenu = (techpack: Techpack) => {
    if (showActionMenu !== techpack.id) return null;

    return (
      <div className="absolute top-2 right-2 bg-[#1C1D20] rounded-lg shadow-lg border border-[#2A2B30] p-1 z-40 min-w-[120px]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToProject?.(techpack);
            handleActionMenuClose();
          }}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded transition-colors text-left"
        >
          Add to Project
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCreateTechpack?.(techpack);
            handleActionMenuClose();
          }}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded transition-colors text-left"
        >
          Create Techpack
        </button>
      </div>
    );
  };

  const renderTechpackCard = (techpack: Techpack) => (
    <div
      key={techpack.id}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredTechpack(techpack.id)}
      onMouseLeave={() => setHoveredTechpack(null)}
      onClick={() => onTechpackClick?.(techpack)}
    >
      <div className="relative overflow-hidden">
        <img
          src={techpack.images[0]}
          alt={techpack.name}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://www.andamen.com/cdn/shop/products/02_466dd888-96ab-48d2-889e-bf1e80d7d0f7.jpg?v=1743150529`;
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <div className={`w-2 h-2 rounded-full ${getStatusBadgeColor(techpack.status)}`} />
        </div>

        {/* Hover Action Menu */}
        {hoveredTechpack === techpack.id && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => handleActionMenuToggle(e, techpack.id)}
              className="w-6 h-6 rounded-full bg-[#1C1D20]/80 backdrop-blur-sm text-white hover:bg-[#F5F6F7] hover:text-[#0E0E11] flex items-center justify-center transition-colors duration-200"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Action Menu */}
        {renderActionMenu(techpack)}
      </div>

      {/* Techpack Details */}
      <div className="mt-3">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-[12px] font-medium text-[#F5F6F7] line-clamp-1">
            {techpack.name}
          </h3>
          <span className={`text-[10px] capitalize ${getStatusColor(techpack.status)} ml-2`}>
            {techpack.status}
          </span>
        </div>
        
        <p className="text-[11px] text-[#9CA3AF] mb-2 line-clamp-1">
          {techpack.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[10px] text-[#9CA3AF]">
          <div>
            <span className="text-[#F5F6F7]">Cost:</span> {techpack.estimatedCost}
          </div>
          <div>
            <span className="text-[#F5F6F7]">Build:</span> {techpack.buildTime}
          </div>
          <div className="col-span-2">
            <span className="text-[#F5F6F7]">Materials:</span> {techpack.materials.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
      {/* Header */}
      <div className="border-b border-[#1C1D20] px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[#1C1D20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#9CA3AF]" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF] mb-1">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3" />
              <span>{project.name}</span>
            </div>
            <h1 className="text-[24px] font-medium text-[#F5F6F7]">Techpacks</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors">
            <Plus className="w-4 h-4" />
            New Techpack
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-10 mb-6">
          {[
            { id: 'all', label: 'All' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-[14px] font-medium transition-colors pb-2 ${
                activeTab === tab.id
                  ? 'text-[#F5F6F7] border-b-2 border-[#F5F6F7]'
                  : 'text-[#9CA3AF] hover:text-[#F5F6F7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C1D20] text-[#F5F6F7] rounded-lg hover:bg-[#2A2B30] transition-colors">
            <Filter className="w-3 h-3" />
            Filter
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {Object.entries(groupedTechpacks).map(([folder, techpacks]) => (
          <div key={folder} className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-medium text-[#F5F6F7]">{folder}</h2>
              <div className="flex items-center gap-4">
                <span className="text-[12px] text-[#9CA3AF]">
                  {techpacks.length} techpack{techpacks.length !== 1 ? 's' : ''}
                </span>
                {techpacks.length > 5 && (
                  <button
                    onClick={() => handleSectionToggle(folder)}
                    className="text-[12px] text-[#F5F6F7] hover:text-[#9CA3AF] transition-colors"
                  >
                    {expandedSections[folder] ? 'Show Less' : `+${techpacks.length - 5} more`}
                  </button>
                )}
              </div>
            </div>

            {/* Techpack Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {(expandedSections[folder] ? techpacks : techpacks.slice(0, 5)).map(renderTechpackCard)}
            </div>
          </div>
        ))}

        {filteredTechpacks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-[#2A2B30] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">No techpacks found</h3>
            <p className="text-[14px] text-[#9CA3AF] mb-6">
              Create your first techpack to get started
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors mx-auto">
              <Plus className="w-4 h-4" />
              New Techpack
            </button>
          </div>
        )}
      </div>

      {/* Overlay to close action menu when clicking outside */}
      {showActionMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={handleActionMenuClose}
        />
      )}
    </div>
  );
}