import { useState, useRef, useEffect } from 'react';
import { Plus, Folder, FolderOpen, Package } from 'lucide-react';

interface CreateDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRect: DOMRect | null;
  onCreateClick: (type: 'collection' | 'folder' | 'techpack') => void;
}

export function CreateDropdown({ isOpen, onClose, anchorRect, onCreateClick }: CreateDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleNewCollection = () => {
    onCreateClick('collection');
    onClose();
  };

  const handleNewFolder = () => {
    onCreateClick('folder');
    onClose();
  };

  const handleNewTechpack = () => {
    onCreateClick('techpack');
    onClose();
  };

  // Calculate positioning with better viewport awareness
  const calculatePosition = () => {
    if (!anchorRect) return {};
    
    const dropdownWidth = 160;
    const dropdownHeight = 150; // Approximate height
    const margin = 8;
    
    // Calculate if dropdown would overflow the right side
    const wouldOverflowRight = anchorRect.right > window.innerWidth - dropdownWidth;
    
    // Calculate if dropdown would overflow the bottom
    const wouldOverflowBottom = anchorRect.bottom + margin + dropdownHeight > window.innerHeight;
    
    let top = anchorRect.bottom + margin;
    let left = anchorRect.left;
    
    // Adjust horizontal position
    if (wouldOverflowRight) {
      left = anchorRect.right - dropdownWidth;
    }
    
    // Adjust vertical position 
    if (wouldOverflowBottom) {
      top = anchorRect.top - dropdownHeight - margin;
    }
    
    // Ensure dropdown doesn't go off the left edge
    if (left < margin) {
      left = margin;
    }
    
    // Ensure dropdown doesn't go off the top edge
    if (top < margin) {
      top = anchorRect.bottom + margin;
    }
    
    return {
      position: 'fixed' as const,
      top,
      left,
      zIndex: 50,
    };
  };

  const dropdownStyle = calculatePosition();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 40 }}
      />
      
      {/* Dropdown */}
      <div
        ref={dropdownRef}
        style={dropdownStyle}
        className={`min-w-[160px] bg-[#1C1D20] border border-[#2A2B2E] rounded-lg shadow-xl py-1 transform transition-all duration-200 ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
      <button
        onClick={handleNewCollection}
        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors duration-200 text-left"
      >
        <FolderOpen className="h-4 w-4 text-[#9CA3AF]" />
        <span>New Collection</span>
      </button>
      
      <button
        onClick={handleNewFolder}
        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors duration-200 text-left"
      >
        <Folder className="h-4 w-4 text-[#9CA3AF]" />
        <span>New Folder</span>
      </button>
      
      <button
        onClick={handleNewTechpack}
        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#F5F6F7] hover:bg-[#2A2B2E] transition-colors duration-200 text-left"
      >
        <Package className="h-4 w-4 text-[#9CA3AF]" />
        <span>New Techpack</span>
      </button>
      </div>
    </>
  );
}