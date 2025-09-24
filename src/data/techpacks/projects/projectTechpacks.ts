import { TechpackData, TechpackLineSheetImage } from '../index';

// Project-specific techpack line sheet images
const projectTechpackLineSheetImages: Record<string, TechpackLineSheetImage[]> = {
  'cotton-blend-dress': [
    {
      id: 'project-dress-front-1',
      title: 'Front View - Basic',
      url: 'https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536',
      alt: 'Cotton dress front view technical drawing',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-dress-back-1',
      title: 'Back View - Basic',
      url: 'https://image.hm.com/assets/hm/01/2a/012a4c8f5e2b9d4c6f8a7e5b3d9c8f7e6a4b2c1d.jpg?imwidth=1536',
      alt: 'Cotton dress back view technical drawing',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-dress-side-1',
      title: 'Side Profile',
      url: 'https://image.hm.com/assets/hm/03/4b/034b5c9f6e3b0d5c7f9a8e6b4d0c9f8e7a5b3c2d.jpg?imwidth=1536',
      alt: 'Cotton dress side view technical drawing',
      category: 'side',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-dress-detail-1',
      title: 'Construction Details',
      url: 'https://image.hm.com/assets/hm/05/6c/056c7d0f8e5b2d7c9fba0e8b6d2c0f9e8a7b5c4d.jpg?imwidth=1536',
      alt: 'Cotton dress construction detail drawing',
      category: 'detail',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-dress-measurements-1',
      title: 'Size Chart',
      url: 'https://image.hm.com/assets/hm/07/8d/078d9e1f0e7b4d9cbfda2e0b8d4c2f1e0a9b7c6d.jpg?imwidth=1536',
      alt: 'Cotton dress measurements chart',
      category: 'measurements',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-dress-pattern-1',
      title: 'Pattern Layout',
      url: 'https://image.hm.com/assets/hm/09/0e/090e1f2f2e9b6d0dcfea4e2b0d6c4f3e2a1b9c8d.jpg?imwidth=1536',
      alt: 'Cotton dress pattern pieces layout',
      category: 'pattern',
      addedAt: '2025-01-30'
    },
    // Placeholder slots for user additions
    {
      id: 'project-dress-placeholder-1',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-dress-placeholder-2',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-dress-placeholder-3',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'luxury-silk-blazer': [
    {
      id: 'project-blazer-front-1',
      title: 'Front View - Tailored',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg',
      alt: 'Silk blazer front view technical drawing',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-blazer-back-1',
      title: 'Back View - Tailored',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b2.jpg',
      alt: 'Silk blazer back view technical drawing',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-blazer-construction-1',
      title: 'Construction Details',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_d1.jpg',
      alt: 'Silk blazer construction details',
      category: 'detail',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-blazer-lining-1',
      title: 'Lining Structure',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_d2.jpg',
      alt: 'Silk blazer lining technical drawing',
      category: 'lining',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-blazer-measurements-1',
      title: 'Size Specifications',
      url: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_chart.jpg',
      alt: 'Silk blazer measurements chart',
      category: 'measurements',
      addedAt: '2025-01-30'
    },
    // Placeholder slots
    {
      id: 'project-blazer-placeholder-1',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-blazer-placeholder-2',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-blazer-placeholder-3',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-blazer-placeholder-4',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'basic-cotton-t-shirt': [
    {
      id: 'project-tshirt-front-1',
      title: 'Front View - Basic',
      url: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg',
      alt: 'Cotton t-shirt front view technical drawing',
      category: 'front',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-tshirt-back-1',
      title: 'Back View - Basic',
      url: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d1.jpg',
      alt: 'Cotton t-shirt back view technical drawing',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-tshirt-seams-1',
      title: 'Seam Construction',
      url: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_detail.jpg',
      alt: 'Cotton t-shirt seam details',
      category: 'detail',
      addedAt: '2025-01-30'
    },
    // Placeholder slots
    {
      id: 'project-tshirt-placeholder-1',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-tshirt-placeholder-2',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-tshirt-placeholder-3',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-tshirt-placeholder-4',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-tshirt-placeholder-5',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-tshirt-placeholder-6',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ],
  'denim-jacket': [
  
    {
      id: 'project-denim-back-1',
      title: 'Back View - Denim',
      url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7c57c960-2a0f-414d-8e86-a5d71fbf3470.png',
      alt: 'Denim jacket back view technical drawing',
      category: 'back',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-denim-hardware-1',
      title: 'Hardware Details',
      url: 'https://i0.wp.com/sewingjournal.theassemblylineshop.com/wp-content/uploads/2024/02/II._ASSEMBLE_THE_LINING_-2336318682-e1708945317520.png?resize=1280%2C1504&ssl=1',
      alt: 'Denim jacket hardware specifications',
      category: 'detail',
      addedAt: '2025-01-30'
    },
    {
      id: 'project-denim-wash-1',
      title: 'Wash Process',
      url: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_wash?$rl_4x5_pdp$',
      alt: 'Denim jacket wash process guide',
      category: 'process',
      addedAt: '2025-01-30'
    },
    // Placeholder slots
    {
      id: 'project-denim-placeholder-1',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-denim-placeholder-2',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-denim-placeholder-3',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-denim-placeholder-4',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    },
    {
      id: 'project-denim-placeholder-5',
      title: 'Add Line Sheet',
      url: '',
      alt: 'Add new line sheet image',
      category: 'placeholder',
      addedAt: '2025-01-30',
      placeholder: true
    }
  ]
};

// Project techpack data
export const projectTechpacks: TechpackData[] = [
  {
    id: 'cotton-blend-dress',
    name: 'Cotton Blend Dress',
    description: 'Summer casual dress with cotton blend fabric',
    image: 'https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536',
    images: ['https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536'],
    status: 'In Progress',
    version: '1.2',
    lastModified: '2025-01-30',
    estimatedCost: '$45',
    buildTime: '4 weeks',
    materials: ['Cotton Blend', 'Polyester Lining', 'Cotton Thread'],
    lineSheetImages: projectTechpackLineSheetImages['cotton-blend-dress'],
    breadcrumbContext: 'project'
  },
  {
    id: 'luxury-silk-blazer',
    name: 'Luxury Silk Blazer',
    description: 'Premium silk blazer for formal occasions',
    image: 'https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg'],
    status: 'Completed',
    version: '2.0',
    lastModified: '2025-01-28',
    estimatedCost: '$280',
    buildTime: '8 weeks',
    materials: ['100% Silk', 'Silk Lining', 'Luxury Buttons'],
    lineSheetImages: projectTechpackLineSheetImages['luxury-silk-blazer'],
    breadcrumbContext: 'project'
  },
  {
    id: 'basic-cotton-t-shirt',
    name: 'Basic Cotton T-Shirt',
    description: 'Essential cotton t-shirt for everyday wear',
    image: 'https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg',
    images: ['https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg'],
    status: 'Draft',
    version: '1.0',
    lastModified: '2025-01-30',
    estimatedCost: '$18',
    buildTime: '2 weeks',
    materials: ['100% Cotton Jersey', 'Cotton Thread'],
    lineSheetImages: projectTechpackLineSheetImages['basic-cotton-t-shirt'],
    breadcrumbContext: 'project'
  },
  {
    id: 'denim-jacket',
    name: 'Stretch Denim Jacket',
    description: 'Classic denim jacket with stretch fabric',
    image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$',
    images: ['https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$'],
    status: 'Review',
    version: '1.5',
    lastModified: '2025-01-29',
    estimatedCost: '$85',
    buildTime: '6 weeks',
    materials: ['Stretch Denim', 'Cotton Lining', 'Metal Hardware'],
    lineSheetImages: projectTechpackLineSheetImages['denim-jacket'],
    breadcrumbContext: 'project'
  }
];

// Helper function to get project techpack by ID
export const getProjectTechpack = (techpackId: string): TechpackData | undefined => {
  return projectTechpacks.find(tp => tp.id === techpackId);
};

// Helper function to get project techpack line sheet images
export const getProjectTechpackLineSheetImages = (techpackId: string): TechpackLineSheetImage[] => {
  return projectTechpackLineSheetImages[techpackId] || [];
};

// Helper function to add new line sheet image to project techpack
export const addProjectTechpackLineSheetImage = (techpackId: string, image: Omit<TechpackLineSheetImage, 'id' | 'addedAt'>): void => {
  if (!projectTechpackLineSheetImages[techpackId]) {
    projectTechpackLineSheetImages[techpackId] = [];
  }
  
  const newImage: TechpackLineSheetImage = {
    ...image,
    id: `project-${techpackId}-${Date.now()}`,
    addedAt: new Date().toLocaleDateString()
  };
  
  // Replace first placeholder or add to end
  const placeholderIndex = projectTechpackLineSheetImages[techpackId].findIndex(img => img.placeholder);
  if (placeholderIndex !== -1) {
    projectTechpackLineSheetImages[techpackId][placeholderIndex] = newImage;
  } else {
    projectTechpackLineSheetImages[techpackId].push(newImage);
  }
};