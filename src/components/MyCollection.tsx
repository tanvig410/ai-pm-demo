import { useState } from 'react';
import { Plus, Search, Image, MoreHorizontal, Eye, Edit, Trash } from 'lucide-react';
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

interface MyCollectionProps {
  onCollectionClick?: (collection: Collection) => void;
  onCreateCollection?: () => void;
}

export function MyCollection({ onCollectionClick, onCreateCollection }: MyCollectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Sample collections data
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Summer Inspirations',
      description: 'Bright and vibrant pieces for summer collection development',
      images: [
        {
          id: 'img-1',
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=320&fit=crop&crop=center',
          alt: 'Summer fashion piece 1',
          addedAt: '2 days ago'
        },
        {
          id: 'img-2',
          url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=320&fit=crop&crop=center',
          alt: 'Summer fashion piece 2',
          addedAt: '3 days ago'
        },
        {
          id: 'img-3',
          url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=320&fit=crop&crop=center',
          alt: 'Summer fashion piece 3',
          addedAt: '1 week ago'
        }
      ],
      createdAt: '2 weeks ago',
      lastModified: '2 days ago',
      visibility: 'private'
    },
    {
      id: '2',
      name: 'Minimalist Essentials',
      description: 'Clean lines and timeless pieces for capsule wardrobe',
      images: [
        {
          id: 'img-4',
          url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=320&fit=crop&crop=center',
          alt: 'Minimalist piece 1',
          addedAt: '1 day ago'
        },
        {
          id: 'img-5',
          url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=320&fit=crop&crop=center',
          alt: 'Minimalist piece 2',
          addedAt: '4 days ago'
        }
      ],
      createdAt: '1 month ago',
      lastModified: '1 day ago',
      visibility: 'public'
    },
    {
      id: '3',
      name: 'Streetwear References',
      description: 'Urban and contemporary street fashion inspiration',
      images: [
        {
          id: 'img-6',
          url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=320&fit=crop&crop=center',
          alt: 'Streetwear piece 1',
          addedAt: '5 days ago'
        }
      ],
      createdAt: '3 weeks ago',
      lastModified: '5 days ago',
      visibility: 'private'
    }
  ]);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActionMenuToggle = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === collectionId ? null : collectionId);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(null);
  };

  const handleDeleteCollection = (collectionId: string) => {
    setCollections(prev => prev.filter(c => c.id !== collectionId));
    setShowActionMenu(null);
  };

  const renderActionMenu = (collection: Collection) => {
    if (showActionMenu !== collection.id) return null;

    return (
      <div className="absolute bottom-3 right-3 bg-[#1C1D20] rounded-lg shadow-lg border border-[#2A2B30] p-2 z-40 min-w-[140px]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCollectionClick?.(collection);
            setShowActionMenu(null);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left"
        >
          <Eye className="w-3 h-3" />
          View Collection
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          <Edit className="w-3 h-3" />
          Edit Collection
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors text-left">
          Share
        </button>
        <div className="border-t border-[#2A2B30] my-1" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCollection(collection.id);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-400 hover:bg-[#2A2B30] rounded-lg transition-colors text-left"
        >
          <Trash className="w-3 h-3" />
          Delete
        </button>
      </div>
    );
  };

  const renderCollectionCard = (collection: Collection) => (
    <div key={collection.id} className="group cursor-pointer" onClick={() => onCollectionClick?.(collection)}>
      {/* Collection Preview - Using first image as cover */}
      <div
        className="relative group cursor-pointer bg-[#1C1D20] overflow-hidden hover:bg-[#2A2B2E] transition-all duration-200 mb-4"
        style={{ height: '320px' }}
      >
        {collection.images.length > 0 ? (
          <ImageWithFallback
            src={collection.images[0].url}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#2A2B30]">
            <div className="text-center">
              <Image className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-[12px] text-[#9CA3AF]">Empty Collection</p>
            </div>
          </div>
        )}

        {/* Collection Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-[14px] font-medium text-white mb-1">{collection.name}</h3>
            <p className="text-[12px] text-[#9CA3AF] line-clamp-2">{collection.description}</p>
          </div>
        </div>

        {/* Image count badge */}
        <div className="absolute top-4 left-4 px-2 py-1 bg-[#1C1D20]/80 backdrop-blur-sm rounded text-[10px] text-white">
          {collection.images.length} {collection.images.length === 1 ? 'item' : 'items'}
        </div>

        {/* Privacy badge */}
        <div className={`absolute top-4 right-12 px-2 py-1 rounded text-[10px] text-white capitalize ${
          collection.visibility === 'private' ? 'bg-orange-600' : 'bg-green-600'
        }`}>
          {collection.visibility}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t group-hover:from-black/15 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCollectionClick?.(collection);
              }}
              className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm transition-colors duration-200"
            >
              View Collection
            </button>
            <button 
              onClick={(e) => handleActionMenuToggle(e, collection.id)}
              className="w-8 h-8 bg-[#1C1D20]/80 hover:bg-[#2A2B2E] rounded-lg backdrop-blur-sm flex items-center justify-center transition-colors duration-200"
            >
              <MoreHorizontal className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Action Menu */}
        {renderActionMenu(collection)}
      </div>

      {/* Collection Details - Below image */}
      <div>
        <div className="flex items-center justify-between text-[12px] text-[#9CA3AF] mb-1">
          <span>Created {collection.createdAt}</span>
          <span>Modified {collection.lastModified}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
      {/* Header */}
      <div className="border-b border-[#1C1D20] px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-medium text-[#F5F6F7] mb-2">My Collection</h1>
            <p className="text-[14px] text-[#9CA3AF]">Organize your fashion inspiration and reference materials</p>
          </div>
          <button 
            onClick={onCreateCollection}
            className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Collection
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full pl-10 pr-4 py-2 bg-[#1C1D20] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-lg focus:outline-none focus:border-[#F5F6F7] transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {filteredCollections.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="w-12 h-12 bg-[#2A2B30] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">
              {searchQuery ? 'No collections found' : 'No collections yet'}
            </h3>
            <p className="text-[14px] text-[#9CA3AF] mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first collection to organize your fashion inspiration'}
            </p>
            {!searchQuery && (
              <button 
                onClick={onCreateCollection}
                className="flex items-center gap-2 px-4 py-2 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors mx-auto"
              >
                <Plus className="w-4 h-4" />
                Create Collection
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            {searchQuery && (
              <div className="mb-8 px-6">
                <p className="text-[14px] text-[#9CA3AF]">
                  {filteredCollections.length} collection{filteredCollections.length !== 1 ? 's' : ''} found for "{searchQuery}"
                </p>
              </div>
            )}

            {/* Collections Grid */}
            <div className="px-6">
              <div 
                className="grid gap-6"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                {filteredCollections.map(renderCollectionCard)}
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