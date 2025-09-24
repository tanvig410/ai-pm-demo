import { useState, useRef, useEffect } from 'react';
import { X, Globe, Lock, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'collection' | 'folder' | 'techpack';
  onCreateSuccess: (data: {
    type: 'collection' | 'folder' | 'techpack';
    name: string;
    description?: string;
    visibility: 'public' | 'private';
  }) => void;
}

export function CreateModal({ isOpen, onClose, type, onCreateSuccess }: CreateModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setName('');
      setDescription('');
      setVisibility('public');
      setIsDropdownOpen(false);
      
      // Focus name input
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getTypeLabel = () => {
    switch (type) {
      case 'collection': return 'Collection';
      case 'folder': return 'Folder';
      case 'techpack': return 'Techpack';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'collection': return 'Ex. "Black & White"';
      case 'folder': return 'Ex. "Inspiration Images"';
      case 'techpack': return 'Ex. "Summer 2024 Collection"';
    }
  };

  const getDescriptionPlaceholder = () => {
    switch (type) {
      case 'collection': return 'A collection of elements';
      case 'folder': return 'Folder description (optional)';
      case 'techpack': return 'Technical specifications and requirements';
    }
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    
    onCreateSuccess({
      type,
      name: name.trim(),
      description: description.trim() || undefined,
      visibility
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleCreate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[480px] mx-4 bg-[#0E0E11] border border-[#2A2B2E] rounded-lg shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B2E]">
          <div>
            <h2 className="text-[18px] font-semibold text-[#F5F6F7]">
              New {getTypeLabel()}
            </h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">
              {type === 'collection' && 'A collection of elements'}
              {type === 'folder' && 'Organize your content'}
              {type === 'techpack' && 'Technical specifications and requirements'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#F5F6F7]">
              Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className="w-full h-[44px] px-3 bg-[#1C1D20] border border-[#2A2B2E] text-[#F5F6F7] placeholder:text-[#9CA3AF] rounded-lg focus:border-[#F5F6F7] focus:outline-none transition-colors text-[14px]"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#F5F6F7]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={getDescriptionPlaceholder()}
              rows={3}
              className="w-full p-3 bg-[#1C1D20] border border-[#2A2B2E] text-[#F5F6F7] placeholder:text-[#9CA3AF] rounded-lg focus:border-[#F5F6F7] focus:outline-none transition-colors resize-none text-[14px]"
            />
          </div>

          {/* Visibility Dropdown */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#F5F6F7]">
              Visibility
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[44px] px-3 bg-[#1C1D20] border border-[#2A2B2E] text-[#F5F6F7] rounded-lg focus:border-[#F5F6F7] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {visibility === 'public' ? (
                    <Globe className="h-4 w-4 text-[#9CA3AF]" />
                  ) : (
                    <Lock className="h-4 w-4 text-[#9CA3AF]" />
                  )}
                  <span className="text-[14px]">
                    {visibility === 'public' ? 'Public' : 'Private'}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-[#9CA3AF] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1D20] border border-[#2A2B2E] rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setVisibility('public');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-3 text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-[14px]">Public</span>
                  </button>
                  <button
                    onClick={() => {
                      setVisibility('private');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-3 text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors"
                  >
                    <Lock className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-[14px]">Private</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2A2B2E]">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-4 h-[36px] text-[14px] bg-transparent border-[#2A2B2E] text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#F5F6F7]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="px-6 h-[36px] text-[14px] bg-[#FFFFFF] text-[#0E0E11] hover:bg-[#F5F6F7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}