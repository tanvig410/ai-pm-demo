import { TechpackData, TechpackLineSheetImage } from '../index';

/**
 * HOW TO ADD/MODIFY IMAGE URLs:
 * 
 * 1. To add line sheet images for any existing techpack:
 *    - Find the techpack ID in discoverTechpackLineSheetImages below
 *    - Replace any placeholder entries (where url: '') with your actual URLs
 *    - Add new entries following the same format
 * 
 * 2. To create a new techpack:
 *    - Add a new entry in discoverTechpackLineSheetImages with your techpack ID
 *    - Add a corresponding entry in discoverTechpacks array below
 * 
 * 3. The techpack IDs must match the image IDs from your Discover screen:
 *    - brand-1, brand-2, brand-3, brand-4, brand-5 (from Brands section)
 *    - report-1, report-2, report-3, report-4 (from World Reports section)  
 *    - internal-1, internal-2, internal-3, internal-4 (from Internal Database section)
 */

// Discover-specific techpack line sheet images - MAPPED TO YOUR ACTUAL DISCOVER SCREEN DATA
const discoverTechpackLineSheetImages: Record<string, TechpackLineSheetImage[]> = {
  // BRANDS SECTION TECHPACKS
  'brand-1': [
    {
      id: 'brand-1-front-1',
      title: 'Front View - Poplin Midi-Dress',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/3ba2f657-f6f0-4fa8-bb9c-80b7b854ca4d.png',
      alt: 'Poplin Midi-Dress front view technical drawing',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'brand-1-back-1',
      title: 'Back View - Poplin Midi-Dress',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/9099304e-8b0b-42c0-91e2-144f8d79bc4d.png',
      alt: 'Poplin Midi-Dress back view technical drawing',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'brand-1-detail-1',
      title: 'Construction Details',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/c84065f8-37a1-4baa-9db9-e97620bbea04.png',
      alt: 'Poplin Midi-Dress construction details',
      category: 'detail',
      addedAt: '2025-01-30'
    },

  ],
  'brand-2': [
    {
      id: 'brand-2-front-1',
      title: 'Front View - Forever New Design',
      url: 'https://www.forevernew.co.in//pub/media/catalog/product/o/l/oldimlall_onbody_29521504_f.jpg?width=1046&height=1118&store=default&image-type=image',
      alt: 'Forever New design front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'brand-2-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'brand-2-placeholder-2',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'brand-3': [
    {
      id: 'brand-3-front-1',
      title: 'Front View - Zara Collection',
      url: 'https://static.zara.net/assets/public/6203/dce9/d388499f97fb/e29f128674bf/08460501700-p/08460501700-p.jpg?ts=1753438567193&w=1254',
      alt: 'Zara collection front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'brand-3-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'brand-4': [
    {
      id: 'brand-4-front-1',
      title: 'Front View - Uniqlo Basics',
      url: 'https://static.zara.net/assets/public/45f6/3c46/9c5a498c9763/4fa6a6e7d499/04047476800-p/04047476800-p.jpg?ts=1732265080529&w=1440',
      alt: 'Uniqlo basics front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'brand-4-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'brand-5': [
    {
      id: 'brand-5-front-1',
      title: 'Front View - H&M Trends',
      url: 'https://image.hm.com/assets/hm/3a/d8/3ad8fc6726aac2101afb6767b6d06a07787256a7.jpg?imwidth=1536',
      alt: 'H&M trends front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'brand-5-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],

  // WORLD REPORTS SECTION TECHPACKS
  'report-1': [
    {
      id: 'report-1-front-1',
      title: 'SS24 Trends Analysis',
      url: 'https://www.tributetomagazine.com/wp-content/uploads/2024/04/fashion-week-schedule-2025.jpg',
      alt: 'SS24 trends front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'report-1-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'report-2': [
    {
      id: 'report-2-front-1',
      title: 'Sustainable Fashion Design',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0001.jpg?w=555&h=740&crop=1',
      alt: 'Sustainable fashion front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'report-2-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'report-3': [
    {
      id: 'report-3-front-1',
      title: 'Street Style NYC Analysis',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0003.jpg?w=200',
      alt: 'Street style NYC front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'report-3-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'report-4': [
    {
      id: 'report-4-front-1',
      title: 'Color Forecast Design',
      url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-bsb-em-0002.jpg?w=225',
      alt: 'Color forecast front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'report-4-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],

  // INTERNAL DATABASE SECTION TECHPACKS
  'internal-1': [
    {
      id: 'internal-1-front-1',
      title: 'Pattern Library Design',
      url: 'https://images.unsplash.com/photo-1723283207288-2bcb590f136c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFBhdHRlcm4lMjBsaWJyYXJ5JTIwY2xvdGh8ZW58MHx8MHx8fDA%3D',
      alt: 'Pattern library design front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'internal-1-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'internal-2': [
    {
      id: 'internal-2-front-1',
      title: 'Technical Specs Design',
      url: 'https://plus.unsplash.com/premium_photo-1672680444092-b33f1e526394?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2F0aW4lMjBNYXRlcmlhbHxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Technical specs design front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'internal-2-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'internal-3': [
    {
      id: 'internal-3-front-1',
      title: 'Material Samples Design',
      url: 'https://plus.unsplash.com/premium_photo-1701157946903-57c2821d71b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGluZW58ZW58MHx8MHx8fDA%3D',
      alt: 'Material samples design front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'internal-3-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'internal-4': [
    {
      id: 'internal-4-front-1',
      title: 'Brand Guidelines Design',
      url: 'https://plus.unsplash.com/premium_photo-1680864245334-6ca32a07c3c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fEJyYW5kJTIwR3VpZGVsaW5lcyUyMGNsb3RoaW5nJTIwdHlwb2dyYXBoeSUyMHRoZW1lfGVufDB8fDB8fHww',
      alt: 'Brand guidelines design front view',
      category: 'front',
      addedAt: '2025-01-30'
    },
    // PLACEHOLDERS - ADD YOUR LINE SHEET URLs HERE
    {
      id: 'internal-4-placeholder-1',
      title: 'Add Line Sheet',
      url: '', // <-- ADD YOUR URL HERE
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ]
};

// Discover techpack data - MATCHES YOUR ACTUAL DISCOVER SCREEN DATA
export const discoverTechpacks: TechpackData[] = [
  // BRANDS SECTION TECHPACKS
  {
    id: 'brand-1',
    name: 'Poplin Midi-Dress',
    description: 'Technical specification for Poplin Midi-Dress',
    image: 'https://static.zara.net/assets/public/74d8/7667/80d5487a82ba/54ab16af7b49/05029172330-p/05029172330-p.jpg?ts=1753515381675&w=1254',
    images: ['https://static.zara.net/assets/public/74d8/7667/80d5487a82ba/54ab16af7b49/05029172330-p/05029172330-p.jpg?ts=1753515381675&w=1254'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$120',
    buildTime: '6 weeks',
    materials: ['Cotton Blend', 'Cotton Lining', 'Metal Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['brand-1'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'brand-2',
    name: 'Forever New Techpack',
    description: 'Technical specification for Forever New design',
    image: 'https://www.forevernew.co.in//pub/media/catalog/product/o/l/oldimlall_onbody_29521504_f.jpg?width=1046&height=1118&store=default&image-type=image',
    images: ['https://www.forevernew.co.in//pub/media/catalog/product/o/l/oldimlall_onbody_29521504_f.jpg?width=1046&height=1118&store=default&image-type=image'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$95',
    buildTime: '5 weeks',
    materials: ['Cotton Blend', 'Polyester Lining', 'Plastic Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['brand-2'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'brand-3',
    name: 'Zara Collection Techpack',
    description: 'Technical specification for Zara Collection design',
    image: 'https://static.zara.net/assets/public/6203/dce9/d388499f97fb/e29f128674bf/08460501700-p/08460501700-p.jpg?ts=1753438567193&w=1254',
    images: ['https://static.zara.net/assets/public/6203/dce9/d388499f97fb/e29f128674bf/08460501700-p/08460501700-p.jpg?ts=1753438567193&w=1254'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$110',
    buildTime: '5 weeks',
    materials: ['Cotton Canvas', 'Cotton Thread', 'Metal Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['brand-3'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'brand-4',
    name: 'Uniqlo Basics Techpack',
    description: 'Technical specification for Uniqlo Basics design',
    image: 'https://static.zara.net/assets/public/45f6/3c46/9c5a498c9763/4fa6a6e7d499/04047476800-p/04047476800-p.jpg?ts=1732265080529&w=1440',
    images: ['https://static.zara.net/assets/public/45f6/3c46/9c5a498c9763/4fa6a6e7d499/04047476800-p/04047476800-p.jpg?ts=1732265080529&w=1440'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$85',
    buildTime: '4 weeks',
    materials: ['Cotton Jersey', 'Cotton Thread'],
    lineSheetImages: discoverTechpackLineSheetImages['brand-4'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'brand-5',
    name: 'H&M Trends Techpack',
    description: 'Technical specification for H&M Trends design',
    image: 'https://image.hm.com/assets/hm/3a/d8/3ad8fc6726aac2101afb6767b6d06a07787256a7.jpg?imwidth=1536',
    images: ['https://image.hm.com/assets/hm/3a/d8/3ad8fc6726aac2101afb6767b6d06a07787256a7.jpg?imwidth=1536'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$75',
    buildTime: '4 weeks',
    materials: ['Cotton Blend', 'Polyester Thread'],
    lineSheetImages: discoverTechpackLineSheetImages['brand-5'],
    breadcrumbContext: 'discover'
  },

  // WORLD REPORTS SECTION TECHPACKS
  {
    id: 'report-1',
    name: 'SS24 Trends Techpack',
    description: 'Technical specification for SS24 Trends',
    image: 'https://www.tributetomagazine.com/wp-content/uploads/2024/04/fashion-week-schedule-2025.jpg',
    images: ['https://www.tributetomagazine.com/wp-content/uploads/2024/04/fashion-week-schedule-2025.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$150',
    buildTime: '7 weeks',
    materials: ['Premium Cotton', 'Silk Lining', 'Designer Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['report-1'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'report-2',
    name: 'Sustainable Fashion Techpack',
    description: 'Technical specification for Sustainable Fashion',
    image: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0001.jpg?w=555&h=740&crop=1',
    images: ['https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0001.jpg?w=555&h=740&crop=1'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$200',
    buildTime: '8 weeks',
    materials: ['Organic Cotton', 'Recycled Polyester', 'Eco Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['report-2'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'report-3',
    name: 'Street Style NYC Techpack',
    description: 'Technical specification for Street Style NYC',
    image: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0003.jpg?w=200',
    images: ['https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0003.jpg?w=200'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$130',
    buildTime: '6 weeks',
    materials: ['Cotton Twill', 'Cotton Lining', 'Street Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['report-3'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'report-4',
    name: 'Color Forecast Techpack',
    description: 'Technical specification for Color Forecast',
    image: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-bsb-em-0002.jpg?w=225',
    images: ['https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-bsb-em-0002.jpg?w=225'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$140',
    buildTime: '6 weeks',
    materials: ['Color-Sensitive Fabric', 'Specialty Thread', 'Color Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['report-4'],
    breadcrumbContext: 'discover'
  },

  // INTERNAL DATABASE SECTION TECHPACKS  
  {
    id: 'internal-1',
    name: 'Pattern Library Techpack',
    description: 'Technical specification for Pattern Library',
    image: 'https://images.unsplash.com/photo-1723283207288-2bcb590f136c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFBhdHRlcm4lMjBsaWJyYXJ5JTIwY2xvdGh8ZW58MHx8MHx8fDA%3D',
    images: ['https://images.unsplash.com/photo-1723283207288-2bcb590f136c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFBhdHRlcm4lMjBsaWJyYXJ5JTIwY2xvdGh8ZW58MHx8MHx8fDA%3D'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$90',
    buildTime: '4 weeks',
    materials: ['Pattern Cotton', 'Cotton Thread', 'Standard Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['internal-1'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'internal-2',
    name: 'Technical Specs Techpack',
    description: 'Technical specification for Technical Specs',
    image: 'https://plus.unsplash.com/premium_photo-1672680444092-b33f1e526394?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2F0aW4lMjBNYXRlcmlhbHxlbnwwfHwwfHx8MA%3D%3D',
    images: ['https://plus.unsplash.com/premium_photo-1672680444092-b33f1e526394?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2F0aW4lMjBNYXRlcmlhbHxlbnwwfHwwfHx8MA%3D%3D'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$120',
    buildTime: '5 weeks',
    materials: ['Satin Material', 'Silk Thread', 'Premium Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['internal-2'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'internal-3',
    name: 'Material Samples Techpack',
    description: 'Technical specification for Material Samples',
    image: 'https://plus.unsplash.com/premium_photo-1701157946903-57c2821d71b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGluZW58ZW58MHx8MHx8fDA%3D',
    images: ['https://plus.unsplash.com/premium_photo-1701157946903-57c2821d71b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGluZW58ZW58MHx8MHx8fDA%3D'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$100',
    buildTime: '4 weeks',
    materials: ['Linen Material', 'Linen Thread', 'Natural Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['internal-3'],
    breadcrumbContext: 'discover'
  },
  {
    id: 'internal-4',
    name: 'Brand Guidelines Techpack',
    description: 'Technical specification for Brand Guidelines',
    image: 'https://plus.unsplash.com/premium_photo-1680864245334-6ca32a07c3c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fEJyYW5kJTIwR3VpZGVsaW5lcyUyMGNsb3RoaW5nJTIwdHlwb2dyYXBoeSUyMHRoZW1lfGVufDB8fDB8fHww',
    images: ['https://plus.unsplash.com/premium_photo-1680864245334-6ca32a07c3c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fEJyYW5kJTIwR3VpZGVsaW5lcyUyMGNsb3RoaW5nJTIwdHlwb2dyYXBoeSUyMHRoZW1lfGVufDB8fDB8fHww'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$110',
    buildTime: '5 weeks',
    materials: ['Brand Cotton', 'Brand Thread', 'Brand Hardware'],
    lineSheetImages: discoverTechpackLineSheetImages['internal-4'],
    breadcrumbContext: 'discover'
  }
];

// Helper function to get discover techpack by ID
export const getDiscoverTechpack = (techpackId: string): TechpackData | undefined => {
  return discoverTechpacks.find(tp => tp.id === techpackId);
};

// Helper function to get discover techpack by image ID (matches your discover screen)
export const getDiscoverTechpackByImageId = (imageId: string): TechpackData | undefined => {
  return getDiscoverTechpack(imageId);
};

// Helper function to get discover techpack by image title/alt (for backward compatibility)
export const getDiscoverTechpackByImageTitle = (title: string): TechpackData | undefined => {
  // Try to match by title/alt text to techpack ID
  const titleLower = title.toLowerCase();
  
  // Brands section
  if (titleLower.includes('zara') && !titleLower.includes('collection')) {
    return getDiscoverTechpack('brand-1');
  } else if (titleLower.includes('forever new')) {
    return getDiscoverTechpack('brand-2');
  } else if (titleLower.includes('zara collection')) {
    return getDiscoverTechpack('brand-3');
  } else if (titleLower.includes('uniqlo')) {
    return getDiscoverTechpack('brand-4');
  } else if (titleLower.includes('h&m')) {
    return getDiscoverTechpack('brand-5');
  }
  
  // World Reports section
  else if (titleLower.includes('ss24') || titleLower.includes('trends')) {
    return getDiscoverTechpack('report-1');
  } else if (titleLower.includes('sustainable')) {
    return getDiscoverTechpack('report-2');
  } else if (titleLower.includes('street style')) {
    return getDiscoverTechpack('report-3');
  } else if (titleLower.includes('color forecast')) {
    return getDiscoverTechpack('report-4');
  }
  
  // Internal Database section
  else if (titleLower.includes('pattern library')) {
    return getDiscoverTechpack('internal-1');
  } else if (titleLower.includes('technical specs')) {
    return getDiscoverTechpack('internal-2');
  } else if (titleLower.includes('material samples')) {
    return getDiscoverTechpack('internal-3');
  } else if (titleLower.includes('brand guidelines')) {
    return getDiscoverTechpack('internal-4');
  }
  
  // Default fallback to first techpack if no match found
  return discoverTechpacks[0];
};

// Helper function to get discover techpack line sheet images
export const getDiscoverTechpackLineSheetImages = (techpackId: string): TechpackLineSheetImage[] => {
  return discoverTechpackLineSheetImages[techpackId] || [];
};

// Helper function to add new line sheet image to discover techpack
export const addDiscoverTechpackLineSheetImage = (techpackId: string, image: Omit<TechpackLineSheetImage, 'id' | 'addedAt'>): void => {
  if (!discoverTechpackLineSheetImages[techpackId]) {
    discoverTechpackLineSheetImages[techpackId] = [];
  }
  
  const newImage: TechpackLineSheetImage = {
    ...image,
    id: `discover-${techpackId}-${Date.now()}`,
    addedAt: new Date().toLocaleDateString()
  };
  
  // Replace first placeholder or add to end
  const placeholderIndex = discoverTechpackLineSheetImages[techpackId].findIndex(img => img.placeholder);
  if (placeholderIndex !== -1) {
    discoverTechpackLineSheetImages[techpackId][placeholderIndex] = newImage;
  } else {
    discoverTechpackLineSheetImages[techpackId].push(newImage);
  }
};