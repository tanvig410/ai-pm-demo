import { useEffect, useRef } from 'react';
import { X, MoreHorizontal, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    id: string;
    url: string;
    alt: string;
  };
  onFindSimilar: (imageId: string) => void;
}

const mockConnections = [
  { id: '1', name: 'archive', username: '@elizabeth', avatar: '🎨', followers: '2.5K elements' },
  { id: '2', name: 'art', username: '@cynthia01', avatar: '🎭', followers: '137 elements' },
  { id: '3', name: 'happy', username: '@caylin', avatar: '😊', followers: '2.2K elements' },
  { id: '4', name: 'Aesthetics', username: '@emilygablin', avatar: '✨', followers: '40 elements' },
  { id: '5', name: 'DESIGN_101', username: '@thepoetic', avatar: '🎨', followers: '187 elements' },
  { id: '6', name: 'new design', username: '@alices', avatar: '🎪', followers: '220 elements' },
  { id: '7', name: 'dimakting', username: '@redimka', avatar: '🎯', followers: '414 elements' },
  { id: '8', name: 'Still Life', username: '@kendall', avatar: '🌸', followers: '70 elements' },
];

export function ImageDetailModal({ isOpen, onClose, image, onFindSimilar }: ImageDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleSimilarClick = () => {
    onFindSimilar(image.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E0E11]" onClick={onClose} />
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full h-full flex"
      >
        {/* Left Side - Image */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: 'calc(100vh - 120px)' }}
            />
            
            {/* Similar Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleSimilarClick}
                className="flex items-center gap-2 px-4 py-2 bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] rounded-lg text-[#F5F6F7] transition-colors"
              >
                <span className="text-[14px] font-medium">Similar</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Details Panel */}
        <div className="w-[360px] bg-[#0E0E11] border-l border-[#1C1D20] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1C1D20]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-[#1C1D20] text-[#F5F6F7] px-3 py-1 rounded-lg text-[14px] font-medium pr-8 border border-[#2A2B2E]">
                  <option>Graphic design</option>
                  <option>Fashion</option>
                  <option>Photography</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
              </div>
              <button className="text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="px-6 py-4 border-b border-[#1C1D20]">
            <p className="text-[#9CA3AF] text-[12px] font-medium">OCT 16, 2023</p>
          </div>

          {/* Connections */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-[#F5F6F7] text-[16px] font-medium mb-4">16 Connections</h3>
              
              <div className="space-y-3">
                {mockConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[16px]">
                      {connection.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#F5F6F7] text-[14px] font-medium">{connection.name}</span>
                        <span className="text-[#9CA3AF] text-[12px]">{connection.username}</span>
                      </div>
                      <p className="text-[#9CA3AF] text-[12px]">{connection.followers}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-6 h-6 rounded-full bg-[#2A2B2E] flex items-center justify-center text-[#9CA3AF] text-[10px] font-medium">
                        Up
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 w-8 h-8 rounded-full bg-[#1C1D20] hover:bg-[#2A2B2E] border border-[#2A2B2E] flex items-center justify-center text-[#F5F6F7] transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}