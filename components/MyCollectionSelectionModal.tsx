import { useState } from 'react';
import { X, Plus, Search, Heart } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  visibility: 'public' | 'private';
}

interface MyCollectionSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: (collectionId: string, collectionName: string) => void;
  onCreateNewCollection: () => void;
  selectedImage?: { url: string; alt: string };
}

export function MyCollectionSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectCollection,
  onCreateNewCollection,
  selectedImage 
}: MyCollectionSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample collections - in real app, this would come from props or API
  const [collections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Summer Inspirations',
      description: 'Bright and vibrant pieces for summer collection development',
      imageCount: 3,
      visibility: 'private'
    },
    {
      id: '2',
      name: 'Minimalist Essentials',
      description: 'Clean lines and timeless pieces for capsule wardrobe',
      imageCount: 2,
      visibility: 'public'
    },
    {
      id: '3',
      name: 'Streetwear References',
      description: 'Urban and contemporary street fashion inspiration',
      imageCount: 1,
      visibility: 'private'
    }
  ]);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-[#1C1D20] rounded-lg border border-[#2A2B30] p-6 w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A2B30] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#9CA3AF]" />
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-[#F5F6F7]">Add to My Collection</h2>
              <p className="text-[12px] text-[#9CA3AF]">Choose a collection to add this image to</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="mb-6 p-3 bg-[#2A2B30] rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#F5F6F7] truncate">{selectedImage.alt}</p>
                <p className="text-[12px] text-[#9CA3AF]">Image to add</p>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full pl-10 pr-4 py-2 bg-[#0E0E11] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-lg focus:outline-none focus:border-[#F5F6F7] transition-colors"
          />
        </div>

        {/* Create New Collection Button */}
        <button
          onClick={() => {
            onCreateNewCollection();
            onClose();
          }}
          className="flex items-center gap-3 p-3 mb-4 bg-[#2A2B30] hover:bg-[#3A3B40] rounded-lg transition-colors border-2 border-dashed border-[#3A3B40] hover:border-[#4A4B50]"
        >
          <div className="w-8 h-8 bg-[#F5F6F7] text-[#0E0E11] rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[14px] font-medium text-[#F5F6F7]">Create New Collection</p>
            <p className="text-[12px] text-[#9CA3AF]">Start a fresh collection for this image</p>
          </div>
        </button>

        {/* Collections List */}
        <div className="flex-1 overflow-y-auto">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[14px] text-[#9CA3AF]">
                {searchQuery ? 'No collections found matching your search' : 'No collections yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => {
                    onSelectCollection(collection.id, collection.name);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-[#2A2B30] hover:bg-[#3A3B40] rounded-lg transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-[#3A3B40] rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#9CA3AF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#F5F6F7] truncate">{collection.name}</p>
                    <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
                      <span>{collection.imageCount} items</span>
                      <span>•</span>
                      <span className={`capitalize ${
                        collection.visibility === 'private' ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        {collection.visibility}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#2A2B30]">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-[14px] text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}