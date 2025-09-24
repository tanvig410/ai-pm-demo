import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Calendar, Users, Image } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

export function Projects({ onProjectClick }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Summer Collection 2024',
      description: 'Bright and airy designs for summer season with emphasis on sustainable materials',
      imageCount: 24,
      lastModified: '2 days ago',
      collaborators: 3,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1632537593914-c19c2716ffca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3VtbWVyJTIwY29sbGVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      category: 'active'
    },
    {
      id: '2',
      name: 'Minimalist Capsule',
      description: 'Essential pieces with clean lines and timeless appeal for modern wardrobe',
      imageCount: 12,
      lastModified: '1 week ago',
      collaborators: 2,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1603805752838-aa579d77da72?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMGxlYXRoZXIlMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D',
      category: 'active'
    },
    {
      id: '3',
      name: 'Streetwear Inspiration',
      description: 'Urban contemporary styles influenced by street culture and youth fashion',
      imageCount: 18,
      lastModified: '3 days ago',
      collaborators: 5,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1727632027545-3205d04dda8d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFN0cmVldHdlYXIlMjBjb2xsZWN0aW9ufGVufDB8fDB8fHww',
      category: 'active'
    },
    {
      id: '4',
      name: 'Sustainable Fashion',
      description: 'Eco-friendly materials and designs focused on reducing environmental impact',
      imageCount: 15,
      lastModified: '5 days ago',
      collaborators: 4,
      status: 'draft',
      coverImage: 'https://images.unsplash.com/photo-1631050165089-6311e0d6c5f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VzdGFpbmFibGUlMjBmYXNoaW9ufGVufDB8fDB8fHww',
      category: 'recent'
    },
    {
      id: '5',
      name: 'Winter Layers',
      description: 'Cozy and warm layering pieces designed for cold weather comfort',
      imageCount: 21,
      lastModified: '1 day ago',
      collaborators: 2,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFdpbnRlciUyMEZhc2hpb258ZW58MHx8MHx8fDA%3D',
      category: 'recent'
    },
    {
      id: '6',
      name: 'Evening Wear Collection',
      description: 'Elegant and sophisticated pieces for special occasions and formal events',
      imageCount: 8,
      lastModified: '2 weeks ago',
      collaborators: 1,
      status: 'archived',
      coverImage: 'https://images.unsplash.com/photo-1702907644567-74f8f37bb068?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2lsayUyMGRyZXNzZXMlMjBldmVuaW5nfGVufDB8fDB8fHww',
      category: 'archived'
    },
    {
      id: '7',
      name: 'Resort Wear 2024',
      description: 'Vacation-ready pieces with tropical prints and lightweight fabrics',
      imageCount: 16,
      lastModified: '4 days ago',
      collaborators: 3,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      category: 'recent'
    },
    {
      id: '8',
      name: 'Workwear Essentials',
      description: 'Professional attire with modern cuts and versatile styling options',
      imageCount: 20,
      lastModified: '6 days ago',
      collaborators: 2,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop&crop=center',
      category: 'recent'
    },
    {
      id: '9',
      name: 'Heritage Collection',
      description: 'Timeless designs inspired by vintage fashion with modern interpretations',
      imageCount: 11,
      lastModified: '3 weeks ago',
      collaborators: 1,
      status: 'archived',
      coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop&crop=center',
      category: 'archived'
    },
    {
      id: '10',
      name: 'Denim Revolution',
      description: 'Innovative denim treatments and sustainable manufacturing processes',
      imageCount: 18,
      lastModified: '5 days ago',
      collaborators: 3,
      status: 'active',
      coverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop&crop=center',
      category: 'recent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'draft':
        return 'text-yellow-400';
      case 'archived':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProjects = {
    active: filteredProjects.filter(p => p.category === 'active'),
    recent: filteredProjects.filter(p => p.category === 'recent'),
    archived: filteredProjects.filter(p => p.category === 'archived')
  };

  const handleActionMenuToggle = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === projectId ? null : projectId);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(null);
  };

  const renderActionMenu = (project: Project) => {
    if (showActionMenu !== project.id) return null;

    return (
      <div className="absolute bottom-3 right-3 bg-[#1C1D20] rounded-lg shadow-lg border border-[#2A2B30] p-2 z-40 min-w-[140px]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.(project);
            setShowActionMenu(null);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left"
        >
          Open Project
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          Share
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          Duplicate
        </button>
        <div className="border-t border-[#2A2B30] my-1" />
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-400 hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          Delete
        </button>
      </div>
    );
  };

  const renderProjectCard = (project: Project) => (
    <div key={project.id} className="group cursor-pointer" onClick={() => onProjectClick?.(project)}>
      {/* Project Image - Discover Style */}
      <div
        className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden hover:bg-[#2A2B2E] transition-all duration-200 mb-4"
        style={{ height: '320px' }}
      >
        <ImageWithFallback
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-2 py-1 rounded text-[10px] font-medium text-white capitalize ${
          project.status === 'active' ? 'bg-green-600' :
          project.status === 'draft' ? 'bg-yellow-600' : 'bg-gray-600'
        }`}>
          {project.status}
        </div>
        
        {/* Content Overlay - Always visible like Discover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-[14px] font-medium text-white mb-1">{project.name}</h3>
            <p className="text-[12px] text-[#9CA3AF] line-clamp-2">{project.description}</p>
          </div>
        </div>

        {/* Hover Actions - Discover style */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t group-hover:from-black/15 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onProjectClick?.(project);
              }}
              className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200"
            >
              Open Project
            </button>
            <button 
              onClick={(e) => handleActionMenuToggle(e, project.id)}
              className="w-8 h-8 bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-200"
            >
              <MoreHorizontal className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Action Menu */}
        {renderActionMenu(project)}
      </div>

      {/* Project Details - Below image */}
      <div>
        {/* Project Stats */}
        <div className="flex items-center justify-between text-[12px] text-[#9CA3AF] mb-2">
          <div className="flex items-center gap-1">
            <Image className="w-3 h-3" />
            <span>{project.imageCount} items</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{project.collaborators} collaborators</span>
          </div>
        </div>
        
        <div className="text-[12px] text-[#9CA3AF] flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Modified {project.lastModified}</span>
        </div>
      </div>
    </div>
  );

  const renderSection = (title: string, projects: Project[]) => {
    if (projects.length === 0) return null;

    return (
      <div className="mb-16">
        <h2 className="text-[20px] font-medium text-[#F5F6F7] mb-6 px-6">{title}</h2>
        <div className="px-6">
          <div 
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            {projects.map(renderProjectCard)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
      {/* Header */}
      <div className="border-b border-[#1C1D20] px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-medium text-[#F5F6F7] mb-2">Projects</h1>
            <p className="text-[14px] text-[#9CA3AF]">Manage your fashion design projects and collaborations</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1D20] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-lg focus:outline-none focus:border-[#F5F6F7] transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-[#2A2B30] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">No projects found</h3>
            <p className="text-[14px] text-[#9CA3AF] mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
            </p>
            {!searchQuery && (
              <button className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors mx-auto">
                <Plus className="w-4 h-4" />
                Create Project
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            {searchQuery && (
              <div className="mb-8">
                <p className="text-[14px] text-[#9CA3AF]">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found for "{searchQuery}"
                </p>
              </div>
            )}

            {/* Project Sections */}
            {!searchQuery ? (
              <>
                {renderSection('Active Projects', groupedProjects.active)}
                {renderSection('Recent Work', groupedProjects.recent)}
                {renderSection('Archived', groupedProjects.archived)}
              </>
            ) : (
              <div className="px-6">
                <div 
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  }}
                >
                  {filteredProjects.map(renderProjectCard)}
                </div>
              </div>
            )}
          </>
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