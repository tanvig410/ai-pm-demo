import { Heart, Sparkles, PenTool } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AddToCollectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToMyCollection?: () => void;
  onRecommend?: () => void;
  onOpenInCanvas?: () => void;
  anchorRect?: DOMRect;
}

export function AddToCollectionPopup({ 
  isOpen, 
  onClose, 
  onAddToMyCollection,
  onRecommend,
  onOpenInCanvas,
  anchorRect 
}: AddToCollectionPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRect) return null;

  const popupStyle = {
    position: 'fixed' as const,
    top: anchorRect.bottom + 12,
    left: anchorRect.left - 100, // Shifted more to the left
    zIndex: 1000,
  };

  return (
    <div
      ref={popupRef}
      style={popupStyle}
      className="flex flex-col gap-2 p-2 bg-[#1C1D20] backdrop-blur-sm border border-[#2A2B2E] rounded-lg shadow-xl min-w-[180px]"
    >
      {onAddToMyCollection && (
        <button
          onClick={() => {
            onAddToMyCollection();
            onClose();
          }}
          className="flex items-center gap-3 px-3 py-2.5 bg-transparent text-[#F5F6F7] rounded-lg hover:bg-[#2A2B2E] transition-all duration-200 text-left w-full"
        >
          <Heart className="h-4 w-4 text-[#9CA3AF]" />
          <span className="text-[14px] font-medium">Add To My Collection</span>
        </button>
      )}
      
      <button
        onClick={() => {
          if (onRecommend) {
            onRecommend();
          }
          onClose();
        }}
        className="flex items-center gap-3 px-3 py-2.5 bg-transparent text-[#F5F6F7] rounded-lg hover:bg-[#2A2B2E] transition-all duration-200 text-left w-full"
      >
        <Sparkles className="h-4 w-4 text-[#9CA3AF]" />
        <span className="text-[14px] font-medium">AI Techpack</span>
      </button>
      
      {onOpenInCanvas && (
        <button
          onClick={() => {
            onOpenInCanvas();
            onClose();
          }}
          className="flex items-center gap-3 px-3 py-2.5 bg-transparent text-[#F5F6F7] rounded-lg hover:bg-[#2A2B2E] transition-all duration-200 text-left w-full"
        >
          <PenTool className="h-4 w-4 text-[#9CA3AF]" />
          <span className="text-[14px] font-medium">Open in Canvas</span>
        </button>
      )}
    </div>
  );
}