import { useState } from 'react';
import { ArrowLeft, Plus, Search, MoreHorizontal, Eye, Trash, Palette } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionImage {
  id: string;
  url: string;
  alt: string;
  addedAt: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  images: CollectionImage[];
  createdAt: string;
  lastModified: string;
  visibility: 'public' | 'private';
}

interface CollectionDetailProps {
  collection: Collection;
  onBack: () => void;
  onOpenInCanvas: (image: CollectionImage) => void;
  onAddImages?: () => void;
}

export function CollectionDetail({ collection, onBack, onOpenInCanvas, onAddImages }: CollectionDetailProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const filteredImages = collection.images.filter(image =>
    image.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActionMenuToggle = (e: React.MouseEvent, imageId: string) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === imageId ? null : imageId);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(null);
  };

  const handleRemoveImage = (imageId: string) => {
    // In a real app, you'd update the collection data
    console.log('Remove image:', imageId);
    setShowActionMenu(null);
  };

  const renderActionMenu = (image: CollectionImage) => {
    if (showActionMenu !== image.id) return null;

    return (
      <div className="absolute bottom-3 right-3 bg-[#1C1D20] rounded-lg shadow-lg border border-[#2A2B30] p-2 z-40 min-w-[140px]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenInCanvas(image);
            setShowActionMenu(null);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left"
        >
          <Palette className="w-3 h-3" />
          Open in Canvas
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          <Eye className="w-3 h-3" />
          View Details
        </button>
        <div className="border-t border-[#2A2B30] my-1" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveImage(image.id);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-400 hover:bg-[#2A2B30] rounded-lg transition-colors text-left"
        >
          <Trash className="w-3 h-3" />
          Remove
        </button>
      </div>
    );
  };

  const renderImageCard = (image: CollectionImage) => (
    <div key={image.id} className="group cursor-pointer">
      {/* Image Container */}
      <div
        className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden hover:bg-[#2A2B2E] transition-all duration-200"
        style={{ height: '320px' }}
      >
        <ImageWithFallback
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-[14px] font-medium text-white mb-1">{image.alt}</h3>
            <p className="text-[12px] text-[#9CA3AF]">Added {image.addedAt}</p>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t group-hover:from-black/15 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenInCanvas(image);
              }}
              className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200"
            >
              Open in Canvas
            </button>
            <button 
              onClick={(e) => handleActionMenuToggle(e, image.id)}
              className="w-8 h-8 bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-200"
            >
              <MoreHorizontal className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Action Menu */}
        {renderActionMenu(image)}
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
            className="w-8 h-8 flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-[24px] font-medium text-[#F5F6F7] mb-1">{collection.name}</h1>
            <p className="text-[14px] text-[#9CA3AF]">{collection.description}</p>
          </div>
          <button 
            onClick={onAddImages}
            className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Images
          </button>
        </div>

        {/* Collection Info */}
        <div className="flex items-center gap-6 mb-6 text-[14px] text-[#9CA3AF]">
          <span>{collection.images.length} {collection.images.length === 1 ? 'item' : 'items'}</span>
          <span>Created {collection.createdAt}</span>
          <span>Modified {collection.lastModified}</span>
          <span className={`capitalize px-2 py-1 rounded text-[12px] text-white ${
            collection.visibility === 'private' ? 'bg-orange-600' : 'bg-green-600'
          }`}>
            {collection.visibility}
          </span>
        </div>

        {/* Search */}
        {collection.images.length > 0 && (
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="w-full pl-10 pr-4 py-2 bg-[#1C1D20] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-lg focus:outline-none focus:border-[#F5F6F7] transition-colors"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="py-8">
        {collection.images.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="w-12 h-12 bg-[#2A2B30] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">No images yet</h3>
            <p className="text-[14px] text-[#9CA3AF] mb-6">
              Start adding images to your collection from the Discover page or upload your own
            </p>
            <button 
              onClick={onAddImages}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Images
            </button>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12 px-6">
            <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">No images found</h3>
            <p className="text-[14px] text-[#9CA3AF]">
              Try adjusting your search terms to find what you're looking for
            </p>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            {searchQuery && (
              <div className="mb-8 px-6">
                <p className="text-[14px] text-[#9CA3AF]">
                  {filteredImages.length} of {collection.images.length} images match "{searchQuery}"
                </p>
              </div>
            )}

            {/* Images Grid */}
            <div className="px-6">
              <div 
                className="grid gap-6"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                {filteredImages.map(renderImageCard)}
              </div>
            </div>
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