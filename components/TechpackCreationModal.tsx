import { useState } from 'react';
import { X, Folder, ChevronDown } from 'lucide-react';

interface TechpackCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTechpack: (data: {
    name: string;
    project: string;
    folder?: string;
    description: string;
  }) => void;
  selectedImage?: any;
}

export function TechpackCreationModal({ 
  isOpen, 
  onClose, 
  onCreateTechpack,
  selectedImage 
}: TechpackCreationModalProps) {
  const [techpackName, setTechpackName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [description, setDescription] = useState('');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  // Mock projects and folders data
  const projects = [
    { id: '1', name: 'Summer Collection 2024' },
    { id: '2', name: 'Minimalist Capsule' },
    { id: '3', name: 'Streetwear Inspiration' },
    { id: '4', name: 'Sustainable Fashion' },
    { id: '5', name: 'Winter Layers' }
  ];

  const folders = {
    '1': [
      { id: 'f1', name: 'Tops' },
      { id: 'f2', name: 'Bottoms' },
      { id: 'f3', name: 'Dresses' }
    ],
    '2': [
      { id: 'f4', name: 'Essentials' },
      { id: 'f5', name: 'Outerwear' }
    ],
    '3': [
      { id: 'f6', name: 'Urban Wear' },
      { id: 'f7', name: 'Accessories' }
    ],
    '4': [
      { id: 'f8', name: 'Organic Cotton' },
      { id: 'f9', name: 'Recycled Materials' }
    ],
    '5': [
      { id: 'f10', name: 'Coats' },
      { id: 'f11', name: 'Sweaters' },
      { id: 'f12', name: 'Layering Pieces' }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (techpackName && selectedProject) {
      const projectName = projects.find(p => p.id === selectedProject)?.name || '';
      const folderName = selectedFolder ? folders[selectedProject as keyof typeof folders]?.find(f => f.id === selectedFolder)?.name : undefined;
      
      onCreateTechpack({
        name: techpackName,
        project: projectName,
        folder: folderName,
        description
      });
      
      // Reset form
      setTechpackName('');
      setSelectedProject('');
      setSelectedFolder('');
      setDescription('');
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedFolder(''); // Reset folder when project changes
    setIsProjectDropdownOpen(false);
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
    setIsFolderDropdownOpen(false);
  };

  const availableFolders = selectedProject ? folders[selectedProject as keyof typeof folders] || [] : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0E0E11] rounded-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1C1D20]">
          <div>
            <h2 className="text-[20px] font-medium text-[#F5F6F7]">Create Techpack</h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">Create a new techpack with this image</p>
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
                <p className="text-[14px] text-[#F5F6F7] font-medium">Reference Image</p>
                <p className="text-[12px] text-[#9CA3AF]">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Techpack Name */}
            <div>
              <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">
                Techpack Name
              </label>
              <input
                type="text"
                value={techpackName}
                onChange={(e) => setTechpackName(e.target.value)}
                placeholder="Enter techpack name"
                className="w-full px-3 py-2 bg-[#1C1D20] text-[#F5F6F7] text-[14px] rounded-lg border border-[#2A2B30] focus:border-[#F5F6F7] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Project Selection */}
            <div>
              <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">
                Project
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="w-full px-3 py-2 bg-[#1C1D20] text-[#F5F6F7] text-[14px] rounded-lg border border-[#2A2B30] focus:border-[#F5F6F7] focus:outline-none transition-colors flex items-center justify-between"
                >
                  <span className={selectedProject ? 'text-[#F5F6F7]' : 'text-[#9CA3AF]'}>
                    {selectedProject 
                      ? projects.find(p => p.id === selectedProject)?.name
                      : 'Select a project'
                    }
                  </span>
                  <ChevronDown className={`h-4 w-4 text-[#9CA3AF] transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProjectDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1D20] border border-[#2A2B30] rounded-lg shadow-lg z-50">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => handleProjectSelect(project.id)}
                        className="w-full px-3 py-2 text-[14px] text-[#F5F6F7] hover:bg-[#2A2B30] transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Folder Selection (Optional) */}
            {selectedProject && availableFolders.length > 0 && (
              <div>
                <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">
                  Folder (Optional)
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFolderDropdownOpen(!isFolderDropdownOpen)}
                    className="w-full px-3 py-2 bg-[#1C1D20] text-[#F5F6F7] text-[14px] rounded-lg border border-[#2A2B30] focus:border-[#F5F6F7] focus:outline-none transition-colors flex items-center justify-between"
                  >
                    <span className={selectedFolder ? 'text-[#F5F6F7]' : 'text-[#9CA3AF]'}>
                      {selectedFolder 
                        ? availableFolders.find(f => f.id === selectedFolder)?.name
                        : 'Select a folder (optional)'
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#9CA3AF] transition-transform ${isFolderDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isFolderDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1D20] border border-[#2A2B30] rounded-lg shadow-lg z-50">
                      <button
                        type="button"
                        onClick={() => handleFolderSelect('')}
                        className="w-full px-3 py-2 text-[14px] text-[#9CA3AF] hover:bg-[#2A2B30] transition-colors text-left rounded-t-lg"
                      >
                        No folder
                      </button>
                      {availableFolders.map((folder) => (
                        <button
                          key={folder.id}
                          type="button"
                          onClick={() => handleFolderSelect(folder.id)}
                          className="w-full px-3 py-2 text-[14px] text-[#F5F6F7] hover:bg-[#2A2B30] transition-colors text-left last:rounded-b-lg"
                        >
                          {folder.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-[14px] font-medium text-[#F5F6F7] mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for this techpack"
                rows={3}
                className="w-full px-3 py-2 bg-[#1C1D20] text-[#F5F6F7] text-[14px] rounded-lg border border-[#2A2B30] focus:border-[#F5F6F7] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#1C1D20]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!techpackName || !selectedProject}
              className={`px-4 py-2 text-[14px] rounded-lg transition-colors ${
                techpackName && selectedProject
                  ? 'bg-[#F5F6F7] text-[#0E0E11] hover:bg-[#E5E6E7]'
                  : 'bg-[#2A2B30] text-[#6B7280] cursor-not-allowed'
              }`}
            >
              Create Techpack
            </button>
          </div>
        </form>
      </div>

      {/* Overlay to close dropdowns */}
      {(isProjectDropdownOpen || isFolderDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProjectDropdownOpen(false);
            setIsFolderDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}