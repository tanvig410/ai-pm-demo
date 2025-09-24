import { useState } from 'react';
import { Heart, Plus, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface MasonryFeedProps {
  onFindSimilar: (imageId: string) => void;
  onImageClick: (image: { id: string; url: string; alt: string }) => void;
}

export function MasonryFeed({ onFindSimilar, onImageClick }: MasonryFeedProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const images = [
    {
      id: '1',
      url: 'https://static.zara.net/assets/public/930c/a1c1/e6ad47cd8a12/9e47341eb4e1/08344832800-a4/08344832800-a4.jpg?ts=1753194162957&w=1242',
      alt: 'Fashion design sketch',
      category: 'Design',
    },
    {
      id: '2',
      url: 'https://static.zara.net/assets/public/6510/1ec1/d2834f03a990/2e09145e29f7/00264212712-p/00264212712-p.jpg?ts=1752752910985&w=1440',
      alt: 'Elegant evening dress',
      category: 'Evening Wear',
    },
    {
      id: '3',
      url: 'https://static.zara.net/assets/public/1e09/0240/804147acafa4/4c575b9bc76b/08114823712-p/08114823712-p.jpg?ts=1753184955361&w=1242',
      alt: 'Street style inspiration',
      category: 'Street Style',
    },
    {
      id: '4',
      url: 'https://static.zara.net/assets/public/b15c/4766/b8134bb1a229/957f895aff07/07977823712-a2/07977823712-a2.jpg?ts=1753184949385&w=1242',
      alt: 'Minimalist fashion',
      category: 'Minimalist',
    },
    {
      id: '5',
      url: 'https://static.zara.net/assets/public/0cd0/0c4b/bb124919ac33/78785204d533/03897162052-p/03897162052-p.jpg?ts=1753369607595&w=1440',
      alt: 'Casual outfit ideas',
      category: 'Casual',
    },
    {
      id: '6',
      url: 'https://static.zara.net/assets/public/55d3/55e1/7d014e259816/fcba2fc4170a/16212610500-p/16212610500-p.jpg?ts=1753090990240&w=1440',
      alt: 'Luxury accessories',
      category: 'Accessories',
    },
    {
      id: '7',
      url: 'https://static.zara.net/assets/public/537d/febf/10ef45b983ed/578638d00ed5/08366846400-a2/08366846400-a2.jpg?ts=1753469285953&w=1254',
      alt: 'Sustainable fashion',
      category: 'Sustainable',
    },
    {
      id: '8',
      url: 'https://static.zara.net/assets/public/bbb4/cb79/b5ee4e2aae8e/4f0dce1acbb4/16358610202-p/16358610202-p.jpg?ts=1753438573944&w=1254',
      alt: 'Color palette inspiration',
      category: 'Color Theory',
    },
    {
      id: '9',
      url: 'https://static.zara.net/assets/public/2064/f126/306c4b108f30/521c8364fbab/08039116800-p/08039116800-p.jpg?ts=1753376585918&w=1440',
      alt: 'Textile patterns',
      category: 'Textiles',
    },
    {
      id: '10',
      url: 'https://static.zara.net/assets/public/e024/bc54/280848d6811c/76b0e7b9e23c/01165262405-p/01165262405-p.jpg?ts=1753269195669&w=1440',
      alt: 'Fashion week trends',
      category: 'Runway',
    }
  ];

  return (
    <div 
      className="w-full"
      style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px' }}
      data-commentable
      data-comment-type="masonry-feed"
      data-comment-id="main-feed"
      data-comment-label="Main image feed"
    >
      {/* Pinterest-style Masonry Grid */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          1100: 3,
          1400: 4
        }}
      >
        <Masonry gutter="24px">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              style={{ minWidth: '300px' }}
              data-commentable
              data-comment-type="feed-image"
              data-comment-id={`image-${image.id}`}
              data-comment-label={`${image.alt} - ${image.category}`}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => onImageClick({
                id: image.id,
                url: image.url,
                alt: image.alt
              })}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                {hoveredImage === image.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFindSimilar(image.id);
                        }}
                        className="px-4 py-2 bg-white/90 text-black text-[12px] font-medium hover:bg-white transition-colors"
                        style={{ borderRadius: '20px' }}
                      >
                        Find Similar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle add to collection
                        }}
                        className="w-10 h-10 bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors"
                        style={{ borderRadius: '50%' }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white text-[10px] font-medium" style={{ borderRadius: '8px' }}>
                  {image.category}
                </div>
                
                {/* Action buttons in top-right */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors" style={{ borderRadius: '50%' }}>
                    <Heart className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-8 h-8 bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors"
                    style={{ borderRadius: '50%' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick({
                        id: image.id,
                        url: image.url,
                        alt: image.alt
                      });
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}