import { useState, useRef, useEffect } from 'react';
import { X, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/fef38696dd6645ba95da3eedee8434a964ca764e.png';

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  elementName: string;
  elementType: 'collection' | 'folder' | 'techpack';
  onSaveSelection: (selectedImageIds: string[]) => void;
}

// Mock current page images - in a real app, this would come from props or context
const currentPageImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
    height: 400
  },
  {
    id: '2', 
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
    height: 300
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=450&fit=crop',
    height: 450
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=350&fit=crop',
    height: 350
  },
  {
    id: '5',
    url: exampleImage,
    height: 400
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=380&fit=crop',
    height: 380
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=320&fit=crop',
    height: 320
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=450&fit=crop',
    height: 450
  }
];

export function ImageSelectionModal({ 
  isOpen, 
  onClose, 
  elementName, 
  elementType, 
  onSaveSelection 
}: ImageSelectionModalProps) {
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedImages(new Set());
      setSelectAll(false);
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

  const toggleImage = (imageId: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
    setSelectAll(newSelected.size === currentPageImages.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedImages(new Set());
      setSelectAll(false);
    } else {
      setSelectedImages(new Set(currentPageImages.map(img => img.id)));
      setSelectAll(true);
    }
  };

  const handleSave = () => {
    onSaveSelection(Array.from(selectedImages));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[900px] max-h-[80vh] mx-4 bg-[#0E0E11] border border-[#2A2B2E] rounded-lg shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B2E] flex-shrink-0">
          <div>
            <h2 className="text-[18px] font-semibold text-[#F5F6F7]">
              Add to {elementName}
            </h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">
              Select images from current page to add to your {elementType}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B2E] flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-2 text-[14px] text-[#F5F6F7] hover:text-white transition-colors"
            >
              <div className={`w-4 h-4 rounded border transition-colors ${
                selectAll 
                  ? 'bg-[#F5F6F7] border-[#F5F6F7]' 
                  : 'border-[#2A2B2E] hover:border-[#F5F6F7]'
              } flex items-center justify-center`}>
                {selectAll && <Check className="h-3 w-3 text-[#0E0E11]" />}
              </div>
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-[14px] text-[#9CA3AF]">
              {selectedImages.size} of {currentPageImages.length} selected
            </span>
          </div>
        </div>

        {/* Images Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {currentPageImages.map((image) => {
              const isSelected = selectedImages.has(image.id);
              return (
                <div
                  key={image.id}
                  className="relative group cursor-pointer"
                  onClick={() => toggleImage(image.id)}
                >
                  <div className={`relative overflow-hidden bg-[#1C1D20] transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-[#F5F6F7] ring-offset-2 ring-offset-[#0E0E11]' : ''
                  }`}>
                    <ImageWithFallback
                      src={image.url}
                      alt={`Image ${image.id}`}
                      className="w-full h-auto object-cover"
                      style={{ height: `${Math.min(image.height, 200)}px` }}
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#1C64F2]/20' 
                        : 'bg-black/0 group-hover:bg-black/20'
                    }`} />
                    
                    {/* Selection indicator */}
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-[#1C64F2] border-[#1C64F2]' 
                        : 'bg-white/90 border-white/90 opacity-0 group-hover:opacity-100'
                    }`}>
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                      {!isSelected && <Plus className="h-4 w-4 text-[#0E0E11]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2A2B2E] flex-shrink-0">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-4 h-[36px] text-[14px] bg-transparent border-[#2A2B2E] text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#F5F6F7]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedImages.size === 0}
            className="px-6 h-[36px] text-[14px] bg-[#FFFFFF] text-[#0E0E11] hover:bg-[#F5F6F7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add {selectedImages.size} Image{selectedImages.size !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  );
}