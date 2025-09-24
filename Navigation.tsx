import { useState, useRef } from 'react';
import { Search, Plus, Bell, User, MessageSquare } from 'lucide-react';
import { CreateDropdown } from './CreateDropdown';


interface NavigationProps {
  currentView?: 'home' | 'discover' | 'recommendation' | 'projects' | 'canvas';
  onDiscoverClick: () => void;
  onRecommendationClick: () => void;
  onProjectsClick: () => void;
  onCanvasClick: () => void;
  onCreateClick: (type: 'collection' | 'folder' | 'techpack') => void;
  onLogoClick: () => void;
  isCommentModeActive?: boolean;
  onToggleCommentMode?: () => void;
}

export function Navigation({ 
  currentView = 'home',
  onDiscoverClick, 
  onRecommendationClick, 
  onProjectsClick, 
  onCanvasClick,
  onCreateClick,
  onLogoClick,
  isCommentModeActive = false,
  onToggleCommentMode
}: NavigationProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const createButtonRef = useRef<HTMLButtonElement>(null);


  const tabs = [
    { id: 'discover', label: 'Discover', onClick: onDiscoverClick },
    { id: 'recommendation', label: 'Recommendation', onClick: onRecommendationClick },
    { id: 'projects', label: 'Projects', onClick: onProjectsClick },
    { id: 'canvas', label: 'Canvas', onClick: onCanvasClick },
  ];

  const handleCreateClick = (type: 'collection' | 'folder' | 'techpack') => {
    onCreateClick(type);
    setIsCreateOpen(false);
  };



  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0E0E11] border-b border-[#1C1D20]">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center h-[60px]">
          {/* Left side - Logo and Navigation Tabs */}
          <div className="flex items-center gap-8">
            <button 
              onClick={onLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-[18px]">⚙</span>
              <span className="text-[16px] font-medium text-[#F5F6F7]">AI Design Studio</span>
            </button>

            {/* Navigation Tabs - moved to left */}
            <div className="flex items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`px-6 py-2 text-[14px] font-medium transition-colors relative ${
                    currentView === tab.id
                      ? 'text-[#F5F6F7]'
                      : 'text-[#9CA3AF] hover:text-[#F5F6F7]'
                  }`}
                >
                  {tab.label}
                  {currentView === tab.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#F5F6F7]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Center - Search and Create */}
          <div className="flex-1 flex items-center justify-center gap-3">
            {/* Search - centered and longer */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Try 'minimalist denim tops'"
                className="w-96 h-9 pl-10 pr-4 bg-[#1C1D20] border border-[#2A2B30] rounded-lg text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3A3B40] transition-colors"
              />
            </div>

            {/* Create Button - next to search */}
            <div className="relative">
              <button
                ref={createButtonRef}
                onClick={() => setIsCreateOpen(!isCreateOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[14px] font-medium">Create</span>
              </button>

              <CreateDropdown
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onCreateClick={handleCreateClick}
                anchorRect={createButtonRef.current?.getBoundingClientRect() || null}
              />
            </div>
          </div>

          {/* Right side - Comment, Notification, and User */}
          <div className="flex items-center gap-3">
            {/* Comment Toggle Button */}
            {onToggleCommentMode && (
              <button 
                onClick={onToggleCommentMode}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  isCommentModeActive 
                    ? 'bg-[#FF6B6B] text-white' 
                    : 'hover:bg-[#1C1D20] text-[#9CA3AF]'
                }`}
                title={isCommentModeActive ? 'Exit comment mode' : 'Add comments'}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            )}

            {/* Notification Bell */}
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#1C1D20] transition-colors">
              <Bell className="w-4 h-4 text-[#9CA3AF]" />
            </button>

            {/* User Avatar */}
            <button className="w-8 h-8 rounded-full bg-[#2A2B30] border border-[#3A3B40] flex items-center justify-center hover:bg-[#3A3B40] transition-colors">
              <User className="w-4 h-4 text-[#9CA3AF]" />
            </button>
          </div>
        </div>
      </div>


    </nav>
  );
}