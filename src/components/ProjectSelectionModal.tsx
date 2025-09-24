import { useState } from 'react';
import { X, Folder, Plus } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  lastModified: string;
}

interface ProjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string, projectName: string) => void;
  selectedImage?: any;
}

export function ProjectSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectProject,
  selectedImage 
}: ProjectSelectionModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Mock projects data
  const projects: Project[] = [
    {
      id: '1',
      name: 'Summer Collection 2024',
      description: 'Bright and airy designs for summer season',
      imageCount: 24,
      lastModified: '2 days ago'
    },
    {
      id: '2',
      name: 'Minimalist Capsule',
      description: 'Essential pieces with clean lines',
      imageCount: 12,
      lastModified: '1 week ago'
    },
    {
      id: '3',
      name: 'Streetwear Inspiration',
      description: 'Urban and contemporary styles',
      imageCount: 18,
      lastModified: '3 days ago'
    },
    {
      id: '4',
      name: 'Sustainable Fashion',
      description: 'Eco-friendly materials and designs',
      imageCount: 15,
      lastModified: '5 days ago'
    },
    {
      id: '5',
      name: 'Winter Layers',
      description: 'Cozy and warm layering pieces',
      imageCount: 21,
      lastModified: '1 day ago'
    }
  ];

  const handleSelectProject = () => {
    if (selectedProjectId) {
      const project = projects.find(p => p.id === selectedProjectId);
      if (project) {
        onSelectProject(selectedProjectId, project.name);
      }
    }
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0E0E11] rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1C1D20]">
          <div>
            <h2 className="text-[20px] font-medium text-[#F5F6F7]">Add to Project</h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">Select a project to add this image to</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#1C1D20] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#F5F6F7]" />
          </button>
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="p-6 border-b border-[#1C1D20]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1C1D20] flex-shrink-0">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[14px] text-[#F5F6F7] font-medium">Selected Image</p>
                <p className="text-[12px] text-[#9CA3AF]">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedProjectId === project.id
                    ? 'border-[#F5F6F7] bg-[#1C1D20]'
                    : 'border-[#2A2B30] hover:border-[#3A3B40] hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-[#2A2B30] rounded-lg flex-shrink-0">
                    <Folder className="h-5 w-5 text-[#9CA3AF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-medium text-[#F5F6F7] truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-[12px] text-[#9CA3AF]">
                          {project.imageCount} images
                        </span>
                        {selectedProjectId === project.id && (
                          <div className="w-4 h-4 rounded-full bg-[#F5F6F7] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#0E0E11]" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF] mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="text-[11px] text-[#6B7280] mt-2">
                      Last modified {project.lastModified}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Project Option */}
            <div className="p-4 rounded-lg border border-dashed border-[#3A3B40] hover:border-[#F5F6F7] cursor-pointer transition-colors duration-200 group">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-[#2A2B30] rounded-lg group-hover:bg-[#3A3B40] transition-colors">
                  <Plus className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#F5F6F7]">Create New Project</h3>
                  <p className="text-[12px] text-[#9CA3AF]">Start a new project for this image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1C1D20]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectProject}
            disabled={!selectedProjectId}
            className={`px-4 py-2 text-[14px] rounded-lg transition-colors ${
              selectedProjectId
                ? 'bg-[#F5F6F7] text-[#0E0E11] hover:bg-[#E5E6E7]'
                : 'bg-[#2A2B30] text-[#6B7280] cursor-not-allowed'
            }`}
          >
            Add to Project
          </button>
        </div>
      </div>
    </div>
  );
}