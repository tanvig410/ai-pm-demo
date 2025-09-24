import { TechpackData, TechpackLineSheetImage } from '../index';

// Recommendation-specific techpack line sheet images
const recommendationTechpackLineSheetImages: Record<string, TechpackLineSheetImage[]> = {
  // High Price Range Items
  'rec-luxury-silk-blazer': [
    {
      id: 'rec-blazer-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg',
      alt: 'Luxury silk blazer technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-blazer-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      alt: 'Luxury silk blazer technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-blazer-construction-1',
      title: 'Construction Details',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Luxury silk blazer construction details',
      category: 'construction',
      addedAt: '2025-01-30'
    }
  ],
  'rec-designer-leather-handbag': [
    {
      id: 'rec-handbag-front-1',
      title: 'Front Technical Drawing',
      url: 'https://cdn-images.farfetch-contents.com/19/04/05/24/19040524_43535332_2048.jpg',
      alt: 'Designer leather handbag technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-handbag-side-1',
      title: 'Side Profile View',
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
      alt: 'Designer leather handbag side profile',
      category: 'side',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-handbag-details-1',
      title: 'Hardware Details',
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      alt: 'Designer leather handbag hardware details',
      category: 'details',
      addedAt: '2025-01-30'
    }
  ],
  'rec-cashmere-wool-coat': [
    {
      id: 'rec-coat-front-1',
      title: 'Back Technical Drawing',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/4c17177a-7a02-490b-8bd7-dea18f4c87bc.png',
      alt: 'Cashmere wool coat technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    
    {
      id: 'rec-coat-pattern-1',
      title: 'Front Technical Drawing',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0a3f7954-2647-444a-bee0-946e0231b938.png',
      alt: 'Cashmere wool coat pattern layout',
      category: 'pattern',
      addedAt: '2025-01-30'
    }
  ],
  'rec-premium-merino-dress': [
    {
      id: 'rec-dress-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.net-a-porter.com/variants/images/46376663162871643/ou/w2000_q60.jpg',
      alt: 'Premium merino wool dress technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-dress-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      alt: 'Premium merino wool dress technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-dress-seaming-1',
      title: 'Seaming Details',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Premium merino wool dress seaming details',
      category: 'seaming',
      addedAt: '2025-01-30'
    }
  ],
  'rec-luxury-evening-gown': [
    {
      id: 'rec-gown-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.mytheresa.com/media/1094/1238/100/f6/P00990991_b1.jpg',
      alt: 'Luxury evening gown technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-gown-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1566479179817-c0e8d93ce9fd?w=400&h=500&fit=crop',
      alt: 'Luxury evening gown technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-gown-embellishment-1',
      title: 'Embellishment Details',
      url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop',
      alt: 'Luxury evening gown embellishment details',
      category: 'embellishment',
      addedAt: '2025-01-30'
    }
  ],

  // Moderate Price Range Items
  'rec-cotton-button-shirt': [
    {
      id: 'rec-shirt-front-1',
      title: 'Front Technical Drawing',
      url: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1253257_alternate10?$rl_4x5_pdp$',
      alt: 'Cotton button-up shirt technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-shirt-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      alt: 'Cotton button-up shirt technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-shirt-collar-1',
      title: 'Collar Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Cotton button-up shirt collar construction',
      category: 'collar',
      addedAt: '2025-01-30'
    }
  ],
  'rec-stretch-denim-jacket': [
    {
      id: 'rec-jacket-front-1',
      title: 'Front Technical Drawing',
      url: 'https://40e507dd0272b7bb46d376a326e6cb3c.cdn.bubble.io/cdn-cgi/image/w=384,h=,f=auto,dpr=2,fit=contain/f1753895081210x681869461873544200/the-new-black.jpg',
      alt: 'Stretch denim jacket technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-jacket-back-1',
      title: 'Back Technical Drawing',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7c57c960-2a0f-414d-8e86-a5d71fbf3470.png',
      alt: 'Stretch denim jacket technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-jacket-pocket-1',
      title: 'Side Technical Drawing',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/64695bdb-5db1-41e9-8291-9d389e3c1e61.png',
      alt: 'Stretch denim jacket pocket details',
      category: 'pockets',
      addedAt: '2025-01-30'
    }
  ],
  'rec-knit-sweater': [
    {
      id: 'rec-sweater-front-1',
      title: 'Front Technical Drawing',
      url: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211971870011_alternate10?$rl_4x5_pdp$',
      alt: 'Knit sweater technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-sweater-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1515664069074-0c5c6b8a79b4?w=400&h=500&fit=crop',
      alt: 'Knit sweater technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-sweater-knit-1',
      title: 'Knit Pattern Detail',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Knit sweater pattern detail',
      category: 'knit-pattern',
      addedAt: '2025-01-30'
    }
  ],
  'rec-chino-pants': [
    {
      id: 'rec-chino-front-1',
      title: 'Front Technical Drawing',
      url: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_alternate10?$rl_4x5_pdp$',
      alt: 'Chino pants technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-chino-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
      alt: 'Chino pants technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-chino-waistband-1',
      title: 'Waistband Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Chino pants waistband construction',
      category: 'waistband',
      addedAt: '2025-01-30'
    }
  ],
  'rec-midi-skirt': [
    {
      id: 'rec-skirt-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.mytheresa.com/media/1094/1238/100/b3/P00962328_b1.jpg',
      alt: 'Midi skirt technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-skirt-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      alt: 'Midi skirt technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-skirt-hem-1',
      title: 'Hem Detail',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Midi skirt hem detail',
      category: 'hem',
      addedAt: '2025-01-30'
    }
  ],

  // Low Price Range Items
  'rec-basic-cotton-tshirt': [
    {
      id: 'rec-tshirt-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg',
      alt: 'Basic cotton t-shirt technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-tshirt-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      alt: 'Basic cotton t-shirt technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-tshirt-neck-1',
      title: 'Neckline Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Basic cotton t-shirt neckline construction',
      category: 'neckline',
      addedAt: '2025-01-30'
    }
  ],
  'rec-cotton-shorts': [
    {
      id: 'rec-shorts-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.creaturesofhabit.in/cdn/shop/files/Ginger_2XL_10241014_1_1800x1800.jpg?v=1703276645',
      alt: 'Cotton shorts technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-shorts-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
      alt: 'Cotton shorts technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-shorts-inseam-1',
      title: 'Inseam Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Cotton shorts inseam construction',
      category: 'inseam',
      addedAt: '2025-01-30'
    }
  ],
  'rec-tank-top': [
    {
      id: 'rec-tank-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.creaturesofhabit.in/cdn/shop/files/CastleGrey_XS_10006534_1_e5652431-6aba-42e3-ab41-c02805d1d2c9_1800x1800.jpg?v=1704784933',
      alt: 'Tank top technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-tank-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      alt: 'Tank top technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-tank-strap-1',
      title: 'Strap Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Tank top strap construction',
      category: 'strap',
      addedAt: '2025-01-30'
    }
  ],
  'rec-basic-hoodie': [
    {
      id: 'rec-hoodie-front-1',
      title: 'Front Technical Drawing',
      url: 'https://www.victoriassecret.in/on/demandware.static/-/Sites-vs_master_catalog/default/dw3983e6b2/large/112293225O5G_OM_F.jpg',
      alt: 'Basic hoodie technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-hoodie-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1515664069074-0c5c6b8a79b4?w=400&h=500&fit=crop',
      alt: 'Basic hoodie technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-hoodie-hood-1',
      title: 'Hood Construction',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Basic hoodie hood construction',
      category: 'hood',
      addedAt: '2025-01-30'
    }
  ],

  // Celebrity and Trending Items
  'rec-celebrity-red-carpet': [
    {
      id: 'rec-celeb-front-1',
      title: 'Front Technical Drawing',
      url: 'https://i.insider.com/65c117ac43bb77284ba3958f?width=800&format=jpeg&auto=webp',
      alt: 'Celebrity red carpet look technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-celeb-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1566479179817-c0e8d93ce9fd?w=400&h=500&fit=crop',
      alt: 'Celebrity red carpet look technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-celeb-detail-1',
      title: 'Couture Details',
      url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop',
      alt: 'Celebrity red carpet look couture details',
      category: 'couture',
      addedAt: '2025-01-30'
    }
  ],
  'rec-award-show-ensemble': [
    {
      id: 'rec-award-front-1',
      title: 'Front Technical Drawing',
      url: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1908159795-659b348d9f09b.jpg?crop=1xw:1xh;center,top&resize=980:*',
      alt: 'Award show ensemble technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-award-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1566479179817-c0e8d93ce9fd?w=400&h=500&fit=crop',
      alt: 'Award show ensemble technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-award-sequin-1',
      title: 'Sequin Application',
      url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop',
      alt: 'Award show ensemble sequin application',
      category: 'sequin',
      addedAt: '2025-01-30'
    }
  ],

  // Additional trending items
  'rec-instagram-streetwear': [
    {
      id: 'rec-street-front-1',
      title: 'Front Technical Drawing',
      url: 'https://cdn-img.prettylittlething.com/a/4/6/d/a46d33ce1e5cbccdbf570b0d55e4aeeaaaba9193_cnh6056_1.jpg',
      alt: 'Instagram streetwear technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-street-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      alt: 'Instagram streetwear technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-street-detail-1',
      title: 'Street Style Details',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Instagram streetwear style details',
      category: 'details',
      addedAt: '2025-01-30'
    }
  ],

  // Material stock items
  'rec-cotton-blend-dress': [
    {
      id: 'rec-cotton-dress-front-1',
      title: 'Front Technical Drawing',
      url: 'https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536',
      alt: 'Cotton blend dress technical front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-cotton-dress-back-1',
      title: 'Back Technical Drawing',
      url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      alt: 'Cotton blend dress technical back view',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'rec-cotton-dress-seaming-1',
      title: 'Seaming Details',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      alt: 'Cotton blend dress seaming details',
      category: 'seaming',
      addedAt: '2025-01-30'
    }
  ]
};

// Recommendation techpack data
export const recommendationTechpacks: TechpackData[] = [
  // High Price Range Items
  {
    id: 'rec-luxury-silk-blazer',
    name: 'Luxury Silk Blazer Techpack',
    description: 'Premium silk blazer with detailed construction specifications',
    image: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$850',
    buildTime: '12 weeks',
    materials: ['100% Mulberry Silk', 'Silk Lining', 'Designer Hardware'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-luxury-silk-blazer'],
    details: [
      { label: 'Material', value: '100% Mulberry Silk' },
      { label: 'Estimated Cost', value: '$850' },
      { label: 'Build Time', value: '12 weeks' },
      { label: 'Estimated MRP', value: '$1280' },
      { label: 'Sizes', value: 'XS-XL' },
      { label: 'Season', value: 'All Season' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-designer-leather-handbag',
    name: 'Designer Leather Handbag Techpack',
    description: 'Luxury leather handbag with premium hardware',
    image: 'https://cdn-images.farfetch-contents.com/19/04/05/24/19040524_43535332_2048.jpg',
    images: ['https://cdn-images.farfetch-contents.com/19/04/05/24/19040524_43535332_2048.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$920',
    buildTime: '14 weeks',
    materials: ['Italian Genuine Leather', 'Gold-plated Hardware'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-designer-leather-handbag'],
    details: [
      { label: 'Material', value: 'Italian Genuine Leather' },
      { label: 'Estimated Cost', value: '$920' },
      { label: 'Build Time', value: '14 weeks' },
      { label: 'Estimated MRP', value: '$1380' },
      { label: 'Hardware', value: 'Gold-plated' },
      { label: 'Dimensions', value: '30x20x12 cm' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-cashmere-wool-coat',
    name: 'Cashmere Wool Coat Techpack',
    description: 'Premium cashmere wool coat with luxury finishing',
    image: 'https://www.mytheresa.com/media/1094/1238/100/4f/P01019839_d1.jpg',
    images: ['https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/4c17177a-7a02-490b-8bd7-dea18f4c87bc.png','https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0a3f7954-2647-444a-bee0-946e0231b938.png'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$1200',
    buildTime: '16 weeks',
    materials: ['Pure Cashmere Wool', 'Silk Lining', 'Horn Buttons'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-cashmere-wool-coat'],
    details: [
      { label: 'Material', value: 'Pure Cashmere Wool' },
      { label: 'Estimated Cost', value: '$1200' },
      { label: 'Build Time', value: '16 weeks' },
      { label: 'Estimated MRP', value: '$1800' },
      { label: 'Weight', value: '850g' },
      { label: 'Origin', value: 'Scotland' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-premium-merino-dress',
    name: 'Premium Merino Wool Dress Techpack',
    description: 'High-quality merino wool dress with stretch comfort',
    image: 'https://www.net-a-porter.com/variants/images/46376663162871643/ou/w2000_q60.jpg',
    images: ['https://www.net-a-porter.com/variants/images/46376663162871643/ou/w2000_q60.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$680',
    buildTime: '10 weeks',
    materials: ['Merino Wool Blend', 'Elastane', 'Modal Lining'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-premium-merino-dress'],
    details: [
      { label: 'Material', value: 'Merino Wool Blend' },
      { label: 'Estimated Cost', value: '$680' },
      { label: 'Build Time', value: '10 weeks' },
      { label: 'Estimated MRP', value: '$1020' },
      { label: 'Stretch', value: '4-way stretch' },
      { label: 'Care', value: 'Dry clean only' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-luxury-evening-gown',
    name: 'Luxury Evening Gown Techpack',
    description: 'Elegant evening gown with hand-beaded embellishments',
    image: 'https://www.mytheresa.com/media/1094/1238/100/f6/P00990991_b1.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/f6/P00990991_b1.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$1500',
    buildTime: '20 weeks',
    materials: ['Silk Chiffon', 'Silk Satin', 'Hand-beaded Embellishments'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-luxury-evening-gown'],
    details: [
      { label: 'Material', value: 'Silk Chiffon & Satin' },
      { label: 'Estimated Cost', value: '$1500' },
      { label: 'Build Time', value: '20 weeks' },
      { label: 'Estimated MRP', value: '$2250' },
      { label: 'Embellishments', value: 'Hand-beaded' },
      { label: 'Lining', value: 'Silk crepe' }
    ],
    breadcrumbContext: 'recommendation'
  },

  // Moderate Price Range Items
  {
    id: 'rec-cotton-button-shirt',
    name: 'Cotton Button-Up Shirt Techpack',
    description: 'Classic cotton button-up shirt with modern fit',
    image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1253257_alternate10?$rl_4x5_pdp$',
    images: ['https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1253257_alternate10?$rl_4x5_pdp$'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$45',
    buildTime: '4 weeks',
    materials: ['Organic Cotton Poplin', 'Cotton Thread', 'Mother of Pearl Buttons'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-cotton-button-shirt'],
    details: [
      { label: 'Material', value: 'Organic Cotton Poplin' },
      { label: 'Estimated Cost', value: '$45' },
      { label: 'Build Time', value: '4 weeks' },
      { label: 'Estimated MRP', value: '$68' },
      { label: 'Fit', value: 'Relaxed fit' },
      { label: 'GSM', value: '120 GSM' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-stretch-denim-jacket',
    name: 'Stretch Denim Jacket Techpack',
    description: 'Modern denim jacket with stretch comfort',
    image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$',
    images: ['https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$65',
    buildTime: '6 weeks',
    materials: ['98% Cotton Denim', '2% Elastane', 'Metal Rivets'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-stretch-denim-jacket'],
    details: [
      { label: 'Material', value: '98% Cotton, 2% Elastane' },
      { label: 'Estimated Cost', value: '$65' },
      { label: 'Build Time', value: '6 weeks' },
      { label: 'Estimated MRP', value: '$98' },
      { label: 'Wash', value: 'Stone washed' },
      { label: 'Weight', value: '12 oz' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-knit-sweater',
    name: 'Knit Sweater Techpack',
    description: 'Cozy wool blend sweater with cable knit pattern',
    image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211971870011_alternate10?$rl_4x5_pdp$',
    images: ['https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211971870011_alternate10?$rl_4x5_pdp$'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$55',
    buildTime: '5 weeks',
    materials: ['Wool Blend Yarn', 'Cashmere Accent', 'Ribbed Trim'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-knit-sweater'],
    details: [
      { label: 'Material', value: 'Wool Blend Knit' },
      { label: 'Estimated Cost', value: '$55' },
      { label: 'Build Time', value: '5 weeks' },
      { label: 'Estimated MRP', value: '$83' },
      { label: 'Knit Type', value: 'Cable knit' },
      { label: 'Gauge', value: '7 GG' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-chino-pants',
    name: 'Chino Pants Techpack',
    description: 'Classic chino pants with straight leg fit',
    image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_alternate10?$rl_4x5_pdp$',
    images: ['https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_alternate10?$rl_4x5_pdp$'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$40',
    buildTime: '3 weeks',
    materials: ['Cotton Twill', 'Polyester Thread', 'Metal Hardware'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-chino-pants'],
    details: [
      { label: 'Material', value: 'Cotton Twill' },
      { label: 'Estimated Cost', value: '$40' },
      { label: 'Build Time', value: '3 weeks' },
      { label: 'Estimated MRP', value: '$60' },
      { label: 'Fit', value: 'Straight leg' },
      { label: 'Rise', value: 'Mid-rise' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-midi-skirt',
    name: 'Midi Skirt Techpack',
    description: 'Versatile midi skirt with side zip closure',
    image: 'https://www.mytheresa.com/media/1094/1238/100/b3/P00962328_b1.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/b3/P00962328_b1.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$38',
    buildTime: '4 weeks',
    materials: ['Poly-Cotton Blend', 'Invisible Zipper', 'Polyester Lining'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-midi-skirt'],
    details: [
      { label: 'Material', value: 'Poly-Cotton Blend' },
      { label: 'Estimated Cost', value: '$38' },
      { label: 'Build Time', value: '4 weeks' },
      { label: 'Estimated MRP', value: '$57' },
      { label: 'Length', value: 'Midi' },
      { label: 'Closure', value: 'Side zip' }
    ],
    breadcrumbContext: 'recommendation'
  },

  // Low Price Range Items
  {
    id: 'rec-basic-cotton-tshirt',
    name: 'Basic Cotton T-Shirt Techpack',
    description: 'Essential cotton t-shirt for everyday wear',
    image: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$12',
    buildTime: '2 weeks',
    materials: ['100% Cotton Jersey', 'Cotton Thread', 'Basic Labels'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-basic-cotton-tshirt'],
    details: [
      { label: 'Material', value: '100% Cotton Jersey' },
      { label: 'Estimated Cost', value: '$12' },
      { label: 'Build Time', value: '2 weeks' },
      { label: 'Estimated MRP', value: '$18' },
      { label: 'GSM', value: '160 GSM' },
      { label: 'Fit', value: 'Regular fit' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-cotton-shorts',
    name: 'Cotton Shorts Techpack',
    description: 'Comfortable cotton shorts with 5-pocket styling',
    image: 'https://www.creaturesofhabit.in/cdn/shop/files/Ginger_2XL_10241014_1_1800x1800.jpg?v=1703276645',
    images: ['https://www.creaturesofhabit.in/cdn/shop/files/Ginger_2XL_10241014_1_1800x1800.jpg?v=1703276645'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$15',
    buildTime: '2 weeks',
    materials: ['Cotton Twill', 'Polyester Thread', 'Metal Rivets'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-cotton-shorts'],
    details: [
      { label: 'Material', value: 'Cotton Twill' },
      { label: 'Estimated Cost', value: '$15' },
      { label: 'Build Time', value: '2 weeks' },
      { label: 'Estimated MRP', value: '$23' },
      { label: 'Inseam', value: '5 inches' },
      { label: 'Pockets', value: '5 pockets' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-tank-top',
    name: 'Tank Top Techpack',
    description: 'Basic tank top with scoop neckline',
    image: 'https://www.creaturesofhabit.in/cdn/shop/files/CastleGrey_XS_10006534_1_e5652431-6aba-42e3-ab41-c02805d1d2c9_1800x1800.jpg?v=1704784933',
    images: ['https://www.creaturesofhabit.in/cdn/shop/files/CastleGrey_XS_10006534_1_e5652431-6aba-42e3-ab41-c02805d1d2c9_1800x1800.jpg?v=1704784933'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$10',
    buildTime: '1 week',
    materials: ['Cotton Blend Jersey', 'Stretch Rib Binding', 'Cotton Thread'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-tank-top'],
    details: [
      { label: 'Material', value: 'Cotton Blend' },
      { label: 'Estimated Cost', value: '$10' },
      { label: 'Build Time', value: '1 week' },
      { label: 'Estimated MRP', value: '$15' },
      { label: 'Neckline', value: 'Scoop neck' },
      { label: 'Hem', value: 'Curved hem' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-basic-hoodie',
    name: 'Basic Hoodie Techpack',
    description: 'Comfortable hoodie with drawstring hood',
    image: 'https://www.victoriassecret.in/on/demandware.static/-/Sites-vs_master_catalog/default/dw3983e6b2/large/112293225O5G_OM_F.jpg',
    images: ['https://www.victoriassecret.in/on/demandware.static/-/Sites-vs_master_catalog/default/dw3983e6b2/large/112293225O5G_OM_F.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$25',
    buildTime: '3 weeks',
    materials: ['Cotton Fleece', 'Polyester Cord', 'Metal Grommets'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-basic-hoodie'],
    details: [
      { label: 'Material', value: 'Cotton Fleece' },
      { label: 'Estimated Cost', value: '$25' },
      { label: 'Build Time', value: '3 weeks' },
      { label: 'Estimated MRP', value: '$38' },
      { label: 'Weight', value: '280 GSM' },
      { label: 'Hood', value: 'Drawstring hood' }
    ],
    breadcrumbContext: 'recommendation'
  },

  // Celebrity and Trending Items
  {
    id: 'rec-celebrity-red-carpet',
    name: 'Celebrity Red Carpet Look Techpack',
    description: 'Couture-inspired red carpet ensemble',
    image: 'https://i.insider.com/65c117ac43bb77284ba3958f?width=800&format=jpeg&auto=webp',
    images: ['https://i.insider.com/65c117ac43bb77284ba3958f?width=800&format=jpeg&auto=webp'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$450',
    buildTime: '8 weeks',
    materials: ['Silk Georgette', 'Couture Boning', 'French Seams'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-celebrity-red-carpet'],
    details: [
      { label: 'Material', value: 'Silk Georgette' },
      { label: 'Source', value: 'Celebrity Style' },
      { label: 'Estimated Cost', value: '$450' },
      { label: 'Build Time', value: '8 weeks' },
      { label: 'Estimated MRP', value: '$675' },
      { label: 'Designer', value: 'Couture inspired' }
    ],
    breadcrumbContext: 'recommendation'
  },
  {
    id: 'rec-award-show-ensemble',
    name: 'Award Show Ensemble Techpack',
    description: 'Glamorous sequined evening wear',
    image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1908159795-659b348d9f09b.jpg?crop=1xw:1xh;center,top&resize=980:*',
    images: ['https://hips.hearstapps.com/hmg-prod/images/gettyimages-1908159795-659b348d9f09b.jpg?crop=1xw:1xh;center,top&resize=980:*'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$680',
    buildTime: '10 weeks',
    materials: ['Sequined Tulle', 'Silk Lining', 'Hand-sewn Sequins'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-award-show-ensemble'],
    details: [
      { label: 'Material', value: 'Sequined Tulle' },
      { label: 'Source', value: 'Celebrity Style' },
      { label: 'Estimated Cost', value: '$680' },
      { label: 'Build Time', value: '10 weeks' },
      { label: 'Estimated MRP', value: '$1020' },
      { label: 'Embellishments', value: 'Hand-sewn sequins' }
    ],
    breadcrumbContext: 'recommendation'
  },

  // Additional trending and material items
  {
    id: 'rec-instagram-streetwear',
    name: 'Instagram Streetwear Techpack',
    description: 'Trendy streetwear inspired by social media',
    image: 'https://cdn-img.prettylittlething.com/a/4/6/d/a46d33ce1e5cbccdbf570b0d55e4aeeaaaba9193_cnh6056_1.jpg',
    images: ['https://cdn-img.prettylittlething.com/a/4/6/d/a46d33ce1e5cbccdbf570b0d55e4aeeaaaba9193_cnh6056_1.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$200',
    buildTime: '5 weeks',
    materials: ['Cotton Streetwear', 'Polyester Blend', 'Screen Print'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-instagram-streetwear'],
    details: [
      { label: 'Material', value: 'Cotton Streetwear' },
      { label: 'Source', value: 'Instagram Trend' },
      { label: 'Estimated Cost', value: '$200' },
      { label: 'Build Time', value: '5 weeks' },
      { label: 'Estimated MRP', value: '$300' },
      { label: 'Style', value: 'Oversized fit' }
    ],
    breadcrumbContext: 'recommendation'
  },

  // Material stock items
  {
    id: 'rec-cotton-blend-dress',
    name: 'Cotton Blend Dress Techpack',
    description: 'Sustainable cotton blend dress with modern silhouette',
    image: 'https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536',
    images: ['https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$250',
    buildTime: '5 weeks',
    materials: ['Organic Cotton Blend', 'Polyester Lining', 'Recycled Thread'],
    lineSheetImages: recommendationTechpackLineSheetImages['rec-cotton-blend-dress'],
    details: [
      { label: 'Material', value: 'Organic Cotton Blend' },
      { label: 'Estimated Cost', value: '$250' },
      { label: 'Build Time', value: '5 weeks' },
      { label: 'Estimated MRP', value: '$375' },
      { label: 'Cost Reduction', value: '5%' },
      { label: 'Stock Level', value: 'High' }
    ],
    breadcrumbContext: 'recommendation'
  }
];

// Helper function to get recommendation techpack by ID
export const getRecommendationTechpack = (techpackId: string): TechpackData | undefined => {
  return recommendationTechpacks.find(tp => tp.id === techpackId);
};

// Helper function to get recommendation techpack by original image data
export const getRecommendationTechpackByImage = (imageAlt: string): TechpackData | undefined => {
  const altToIdMap: Record<string, string> = {
    'Luxury silk blazer': 'rec-luxury-silk-blazer',
    'Designer leather handbag': 'rec-designer-leather-handbag',
    'Cashmere wool coat': 'rec-cashmere-wool-coat',
    'Premium merino wool dress': 'rec-premium-merino-dress',
    'Luxury evening gown': 'rec-luxury-evening-gown',
    'Cotton button-up shirt': 'rec-cotton-button-shirt',
    'Stretch denim jacket': 'rec-stretch-denim-jacket',
    'Knit sweater': 'rec-knit-sweater',
    'Chino pants': 'rec-chino-pants',
    'Midi skirt': 'rec-midi-skirt',
    'Basic cotton t-shirt': 'rec-basic-cotton-tshirt',
    'Cotton shorts': 'rec-cotton-shorts',
    'Tank top': 'rec-tank-top',
    'Basic hoodie': 'rec-basic-hoodie',
    'Celebrity red carpet look': 'rec-celebrity-red-carpet',
    'Award show ensemble': 'rec-award-show-ensemble',
    'Instagram streetwear': 'rec-instagram-streetwear',
    'Cotton blend Dress': 'rec-cotton-blend-dress'
  };
  
  const techpackId = altToIdMap[imageAlt];
  return techpackId ? getRecommendationTechpack(techpackId) : undefined;
};

// Helper function to get recommendation techpack line sheet images
export const getRecommendationTechpackLineSheetImages = (techpackId: string): TechpackLineSheetImage[] => {
  return recommendationTechpackLineSheetImages[techpackId] || [];
};

// Helper function to add new line sheet image to recommendation techpack
export const addRecommendationTechpackLineSheetImage = (techpackId: string, image: Omit<TechpackLineSheetImage, 'id' | 'addedAt'>): void => {
  if (!recommendationTechpackLineSheetImages[techpackId]) {
    recommendationTechpackLineSheetImages[techpackId] = [];
  }
  
  const newImage: TechpackLineSheetImage = {
    ...image,
    id: `rec-${techpackId}-${Date.now()}`,
    addedAt: new Date().toLocaleDateString()
  };
  
  // Replace first placeholder or add to end
  const placeholderIndex = recommendationTechpackLineSheetImages[techpackId].findIndex(img => img.placeholder);
  if (placeholderIndex !== -1) {
    recommendationTechpackLineSheetImages[techpackId][placeholderIndex] = newImage;
  } else {
    recommendationTechpackLineSheetImages[techpackId].push(newImage);
  }
};