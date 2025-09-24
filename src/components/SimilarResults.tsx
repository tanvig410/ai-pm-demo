import { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AddToCollectionPopup } from './AddToCollectionPopup';
import exampleImage1 from 'figma:asset/a82bafbc6419b3903c7d9f77f815e112e862aa20.png';

interface SimilarResultsProps {
  onBack: () => void;
  originalImageId: string;
  onRecommend?: (imageData: any) => void;
  onAddToMyCollection?: (imageData: any) => void;
  onOpenInCanvas?: (imageData: any) => void;
}

export function SimilarResults({ onBack, originalImageId, onRecommend, onAddToMyCollection, onOpenInCanvas }: SimilarResultsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState<string | null>(null);
  const [popupAnchorRect, setPopupAnchorRect] = useState<DOMRect | null>(null);
  const buttonRefs = useState(() => new Map<string, HTMLButtonElement>())[0];

  // Trigger the animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate similar images (using artistic sculptures as shown in the reference)
  const similarImages = [
    {
      id: 'similar-1',
      url: 'https://assets.ajio.com/medias/sys_master/root/20240118/BKwI/65a87c8116fd2c6e6aaed574/-473Wx593H-466990259-multi-MODEL.jpg',
      height: 380,
    },
    {
      id: 'similar-2', 
      url: 'https://static.zara.net/assets/public/7f93/d1d1/5e024ff7b705/6b5451438227/08390024330-e1/08390024330-e1.jpg?ts=1752763119543&w=1125',
      height: 450,
    },
    {
      id: 'similar-3',
      url: 'https://m.media-amazon.com/images/I/71eClszKN8L._AC_SY879_.jpg',
      height: 320,
    },
    {
      id: 'similar-4',
      url: 'https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536',
      height: 420,
    },
    {
      id: 'similar-5',
      url: 'https://img.tatacliq.com/images/i23//658Wx734H/MP000000026075623_658Wx734H_202504112019431.jpeg',
      height: 360,
    },
    {
      id: 'similar-6',
      url: 'https://img.tatacliq.com/images/i14/437Wx649H/MP000000018376034_437Wx649H_202311142150393.jpeg',
      height: 440,
    },
    {
      id: 'similar-7',
      url: 'https://whysobluelove.com/cdn/shop/files/Creamruffleddress1_1800x1800.jpg?v=1747504745',
      height: 350,
    },
    {
      id: 'similar-8',
      url: 'https://cdn.shopify.com/s/files/1/1869/0651/products/1_ModelFront_4bf8a500-f4a6-4b64-95bc-3a9de457998b.jpg?v=1657743707',
      height: 400,
    },
    {
      id: 'similar-9',
      url: 'https://www.mytheresa.com/media/1094/1238/100/49/P00994157_b1.jpg',
      height: 380,
    },
    {
      id: 'similar-10',
      url: 'https://www.aniclothing.in/cdn/shop/files/Ani24-11-2417592.jpg?v=1733466599&width=1800',
      height: 450,
    },
    {
      id: 'similar-11',
      url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR97scN0GmXIXG7XKJ3_fs7Oxm-D4zBlTca5ZhK_0pnRLbv6bVfSCIN0IeGiuy-HNy_RMFu5cUY-rpmjpO2Xssrd5Nf_9RxgVl3TD5C6lg',
      height: 320,
    },
    {
      id: 'similar-12',
      url: 'https://m.media-amazon.com/images/I/71QTpKJ+ahL._UY1100_.jpg',
      height: 480,
    },
  ];

  return (
    <div className="relative">
      {/* Back Icon - Simple floating button */}
      <button
        onClick={onBack}
        className="fixed top-[80px] left-6 z-50 w-10 h-10 bg-[#1C1D20] hover:bg-[#2A2B2E] rounded-lg transition-all duration-200 flex items-center justify-center"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.5s ease-out 1.5s forwards'
        }}
      >
        <ArrowLeft className="h-5 w-5 text-[#F5F6F7]" />
      </button>

      {/* Results Grid with bottom-to-top animation */}
      <div 
        className={`px-6 py-8 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform translate-y-full opacity-0'
        }`}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="24px">
            {similarImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer transition-all duration-700 ease-out w-full ${
                  isVisible 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-20 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredCard(image.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={`Similar item ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
                
                {/* Hover overlay */}
                {hoveredCard === image.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-3 right-3 flex gap-2 items-center">
                      <button 
                        className="px-3 py-2 bg-[#1C1D20]/90 backdrop-blur-sm rounded-full hover:bg-[#2A2B2E] transition-all duration-200 shadow-lg border border-[#2A2B2E]/50"
                        title="Find similar"
                        onClick={() => {
                          console.log('Find similar clicked for similar image', image.id);
                        }}
                      >
                        <span className="text-[12px] font-medium text-[#F5F6F7]">Find Similar</span>
                      </button>
                      <button 
                        ref={(el) => {
                          if (el) buttonRefs.set(image.id, el);
                        }}
                        className="w-8 h-8 bg-[#1C1D20]/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#2A2B2E] transition-all duration-200 shadow-lg border border-[#2A2B2E]/50"
                        title="Add to collection"
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = buttonRefs.get(image.id)?.getBoundingClientRect();
                          setPopupAnchorRect(rect || null);
                          setPopupOpen(image.id);
                        }}
                      >
                        <Plus className="h-4 w-4 text-[#F5F6F7]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Results Counter - Center Bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="px-4 py-2 bg-[#1C1D20]/90 backdrop-blur-sm rounded-full border border-[#2A2B2E]"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out 2s forwards'
          }}
        >
          <span className="text-[12px] text-[#9CA3AF]">
            {similarImages.length} results
          </span>
        </div>
      </div>

      {/* Add to Collection Popup */}
      {popupOpen && popupAnchorRect && (
        <AddToCollectionPopup
          isOpen={true}
          anchorRect={popupAnchorRect}
          onClose={() => setPopupOpen(null)}
          onAddToMyCollection={() => {
            const imageData = similarImages.find(img => img.id === popupOpen);
            if (imageData && onAddToMyCollection) {
              onAddToMyCollection({
                id: imageData.id,
                url: imageData.url,
                title: `Similar item ${similarImages.indexOf(imageData) + 1}`,
                alt: `Similar item ${similarImages.indexOf(imageData) + 1}`,
              });
            }
            setPopupOpen(null);
          }}
          onRecommend={() => {
            const imageData = similarImages.find(img => img.id === popupOpen);
            if (imageData && onRecommend) {
              onRecommend({
                id: imageData.id,
                url: imageData.url,
                title: `Similar item ${similarImages.indexOf(imageData) + 1}`,
                alt: `Similar item ${similarImages.indexOf(imageData) + 1}`,
              });
            }
            setPopupOpen(null);
          }}
          onOpenInCanvas={() => {
            const imageData = similarImages.find(img => img.id === popupOpen);
            if (imageData && onOpenInCanvas) {
              onOpenInCanvas({
                id: imageData.id,
                url: imageData.url,
                title: `Similar item ${similarImages.indexOf(imageData) + 1}`,
                alt: `Similar item ${similarImages.indexOf(imageData) + 1}`,
              });
            }
            setPopupOpen(null);
          }}
        />
      )}
    </div>
  );
}