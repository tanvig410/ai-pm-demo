// Canvas Techpack Generation Step Data
// Replace the URLs below with your own custom techpack specification images

export interface CanvasTechpackImage {
  id: string;
  title: string;
  description: string;
  url: string;
  originalImageId?: string; // Reference to the original generated image
  lineSheetId?: string; // Reference to the line sheet
  techpackType: 'overview' | 'construction' | 'materials' | 'measurements' | 'colorways' | 'bom' | 'packaging';
  specifications: {
    estimatedCost?: string;
    buildTime?: string;
    materials?: string[];
    sizes?: string[];
    colors?: string[];
    complexity?: 'low' | 'medium' | 'high';
  };
  sections: string[];
  status: 'draft' | 'in-progress' | 'review' | 'approved';
  generatedAt: string;
}

export const canvasTechpackImagesData: CanvasTechpackImage[] = [
  {
    id: 'techpack-1',
    title: 'Minimalist Blazer Techpack',
    description: 'Complete technical package for modern blazer',
    url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-1',
    lineSheetId: 'linesheet-1',
    techpackType: 'overview',
    specifications: {
      estimatedCost: '$85.00',
      buildTime: '8 weeks',
      materials: ['100% Wool Crepe', 'Cotton Lining', 'Horn Buttons'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Navy', 'Black', 'Charcoal'],
      complexity: 'high'
    },
    sections: ['Overview', 'Construction', 'Materials', 'Measurements', 'Colorways'],
    status: 'draft',
    generatedAt: 'Just now'
  },
  {
    id: 'techpack-2',
    title: 'Vintage Denim Jacket Specs',
    description: 'Technical specifications for denim jacket',
    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-2',
    lineSheetId: 'linesheet-3',
    techpackType: 'construction',
    specifications: {
      estimatedCost: '$45.00',
      buildTime: '4 weeks',
      materials: ['14oz Denim', 'Cotton Thread', 'Metal Hardware'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Indigo', 'Black', 'Light Wash'],
      complexity: 'medium'
    },
    sections: ['Construction Details', 'Distressing Guide', 'Hardware Specs'],
    status: 'in-progress',
    generatedAt: '2 min ago'
  },
  {
    id: 'techpack-3',
    title: 'Evening Dress Techpack',
    description: 'Luxury evening dress technical package',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-3',
    lineSheetId: 'linesheet-4',
    techpackType: 'materials',
    specifications: {
      estimatedCost: '$120.00',
      buildTime: '12 weeks',
      materials: ['Silk Charmeuse', 'Silk Lining', 'Invisible Zipper'],
      sizes: ['0', '2', '4', '6', '8', '10', '12'],
      colors: ['Midnight Blue', 'Emerald', 'Burgundy'],
      complexity: 'high'
    },
    sections: ['Fabric Specifications', 'Draping Instructions', 'Finishing Details'],
    status: 'review',
    generatedAt: '3 min ago'
  },
  {
    id: 'techpack-4',
    title: 'Cotton T-Shirt Production Guide',
    description: 'Simple t-shirt manufacturing guide',
    url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-4',
    lineSheetId: 'linesheet-5',
    techpackType: 'measurements',
    specifications: {
      estimatedCost: '$12.00',
      buildTime: '2 weeks',
      materials: ['100% Cotton Jersey', 'Cotton Thread'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Grey', 'Navy'],
      complexity: 'low'
    },
    sections: ['Size Chart', 'Grading Rules', 'Quality Standards'],
    status: 'approved',
    generatedAt: '5 min ago'
  },
  {
    id: 'techpack-5',
    title: 'Designer Handbag Specs',
    description: 'Luxury handbag technical documentation',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-5',
    lineSheetId: 'linesheet-6',
    techpackType: 'bom',
    specifications: {
      estimatedCost: '$95.00',
      buildTime: '6 weeks',
      materials: ['Italian Leather', 'Gold Hardware', 'Cotton Lining'],
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Cognac'],
      complexity: 'high'
    },
    sections: ['Bill of Materials', 'Hardware Specifications', 'Assembly Instructions'],
    status: 'in-progress',
    generatedAt: '8 min ago'
  },
  {
    id: 'techpack-6',
    title: 'Wool Sweater Colorways',
    description: 'Color and pattern specifications',
    url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&h=1400&auto=format&fit=crop', // REPLACE THIS URL
    originalImageId: 'generated-6',
    techpackType: 'colorways',
    specifications: {
      estimatedCost: '$55.00',
      buildTime: '5 weeks',
      materials: ['Merino Wool', 'Alpaca Blend'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Camel', 'Forest Green', 'Burgundy'],
      complexity: 'medium'
    },
    sections: ['Color Palette', 'Knit Pattern', 'Yarn Specifications'],
    status: 'draft',
    generatedAt: '10 min ago'
  },
  // ADD MORE TECHPACK IMAGES HERE
  // {
  //   id: 'techpack-7',
  //   title: 'Your Custom Techpack',
  //   description: 'Your custom technical package',
  //   url: 'YOUR_CUSTOM_TECHPACK_IMAGE_URL_HERE',
  //   originalImageId: 'generated-X',
  //   lineSheetId: 'linesheet-X',
  //   techpackType: 'overview',
  //   specifications: {
  //     estimatedCost: 'Your cost',
  //     buildTime: 'Your timeline',
  //     materials: ['Your materials'],
  //     sizes: ['Your sizes'],
  //     colors: ['Your colors'],
  //     complexity: 'medium'
  //   },
  //   sections: ['Your sections'],
  //   status: 'draft',
  //   generatedAt: 'Now'
  // },
];

// Helper function to create new techpack images
export const createTechpackImage = (
  title: string,
  description: string,
  url: string,
  techpackType: CanvasTechpackImage['techpackType'] = 'overview',
  specifications: CanvasTechpackImage['specifications'] = {},
  sections: string[] = [],
  originalImageId?: string,
  lineSheetId?: string,
  customId?: string
): CanvasTechpackImage => {
  return {
    id: customId || `techpack-${Date.now()}`,
    title,
    description,
    url,
    originalImageId,
    lineSheetId,
    techpackType,
    specifications,
    sections,
    status: 'draft',
    generatedAt: new Date().toLocaleString()
  };
};

// Helper function to get techpacks by original image
export const getTechpacksByOriginalImage = (originalImageId: string): CanvasTechpackImage[] => {
  return canvasTechpackImagesData.filter(img => img.originalImageId === originalImageId);
};

// Helper function to get techpacks by type
export const getTechpacksByType = (techpackType: CanvasTechpackImage['techpackType']): CanvasTechpackImage[] => {
  return canvasTechpackImagesData.filter(img => img.techpackType === techpackType);
};

// Helper function to get techpacks by status
export const getTechpacksByStatus = (status: CanvasTechpackImage['status']): CanvasTechpackImage[] => {
  return canvasTechpackImagesData.filter(img => img.status === status);
};

// Helper function to get techpacks by complexity
export const getTechpacksByComplexity = (complexity: 'low' | 'medium' | 'high'): CanvasTechpackImage[] => {
  return canvasTechpackImagesData.filter(img => img.specifications.complexity === complexity);
};

// Helper function to estimate total production cost
export const getTotalEstimatedCost = (techpackIds: string[]): number => {
  return canvasTechpackImagesData
    .filter(img => techpackIds.includes(img.id))
    .reduce((total, img) => {
      const cost = parseFloat(img.specifications.estimatedCost?.replace('$', '') || '0');
      return total + cost;
    }, 0);
};