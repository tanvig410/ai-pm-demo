// Canvas 2D Line Sheet Step Data
// Replace the URLs below with your own custom line sheet and technical sketch images

export interface CanvasLineSheetImage {
  id: string;
  title: string;
  description: string;
  url: string;
  originalImageId?: string; // Reference to the original generated image
  viewType: 'front' | 'back' | 'side' | 'detail' | 'flat' | '3D';
  sketchStyle: 'technical' | 'artistic' | 'flat-sketch' | 'croquis';
  annotations: string[];
  measurements?: {
    chest?: string;
    length?: string;
    sleeve?: string;
    waist?: string;
  };
  generatedAt: string;
}

export const canvasLineSheetImagesData: CanvasLineSheetImage[] = [
  {
    id: 'linesheet-1',
    title: 'Blazer Front View - Technical',
    description: 'Technical front view with construction details',
    url: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0b2f7708-df34-45df-89d6-cfa03eb6c5d1.png', // REPLACE THIS URL
    originalImageId: 'generated-1',
    viewType: 'front',
    sketchStyle: 'technical',
    annotations: ['Lapel construction', 'Button placement', 'Pocket details'],
    measurements: {
      chest: '42"',
      length: '28"',
      sleeve: '24"'
    },
    generatedAt: 'Just now'
  },
  {
    id: 'linesheet-2',
    title: 'Blazer Front & Back View - Technical',
    description: 'Technical back view showing seam lines',
    url: 'https://ik.imagekit.io/y8bvmmwmzw/image%20(4)%20(1).png', // REPLACE THIS URL
    originalImageId: 'generated-1',
    viewType: 'back',
    sketchStyle: 'technical',
    annotations: ['Center back seam', 'Vent placement', 'Shoulder construction'],
    generatedAt: 'Just now'
  },
  {
    id: 'linesheet-3',
    title: 'Denim Jacket Flat Sketch',
    description: 'Flat technical drawing with proportions',
    url: 'https://ik.imagekit.io/y8bvmmwmzw/generated_image.png', // REPLACE THIS URL
    originalImageId: 'generated-2',
    viewType: 'front',
    sketchStyle: 'flat-sketch',
    annotations: ['Distressing areas', 'Hardware placement', 'Wash instructions'],
    measurements: {
      chest: '44"',
      length: '26"',
      sleeve: '25"'
    },
    generatedAt: '2 min ago'
  },
  {
    id: 'linesheet-4',
    title: 'Evening Dress Silhouette',
    description: 'Artistic silhouette showing draping',
    url: 'https://ik.imagekit.io/y8bvmmwmzw/generated_image_1.png', // REPLACE THIS URL
    originalImageId: 'generated-3',
    viewType: 'front',
    sketchStyle: 'artistic',
    annotations: ['Drape flow', 'Hem line', 'Neckline detail'],
    measurements: {
      bust: '36"',
      waist: '28"',
      length: '60"'
    },
    generatedAt: '3 min ago'
  }

  // 🟢 TO ADD YOUR IMAGES: Simply copy this template and add above this comment
  // {
  //   id: 'linesheet-5', // Unique ID
  //   title: 'Your Image Title',
  //   description: 'Your image description',
  //   url: 'YOUR_IMAGE_URL_HERE', // ← PUT YOUR IMAGE URL HERE
  //   originalImageId: 'generated-4', // Reference ID (optional)
  //   viewType: 'front', // Options: 'front', 'back', 'side', 'detail', 'flat', '3D'
  //   sketchStyle: 'technical', // Options: 'technical', 'artistic', 'flat-sketch', 'croquis'
  //   annotations: ['Detail 1', 'Detail 2'], // Optional annotations
  //   measurements: { // Optional measurements
  //     chest: '40"',
  //     length: '26"'
  //   },
  //   generatedAt: 'Now'
  // },

  // EXAMPLE: To add a new image, uncomment and modify this:
  // {
  //   id: 'linesheet-5',
  //   title: 'Cotton Shirt Technical Drawing',
  //   description: 'Technical flat with construction details',
  //   url: 'https://your-image-hosting-service.com/your-image.jpg',
  //   originalImageId: 'generated-4',
  //   viewType: 'front',
  //   sketchStyle: 'technical',
  //   annotations: ['Button placket', 'Collar construction', 'Hem details'],
  //   measurements: {
  //     chest: '40"',
  //     length: '26"',
  //     sleeve: '24"'
  //   },
  //   generatedAt: 'Now'
  // }
];

// Helper function to create new line sheet images
export const createLineSheetImage = (
  title: string,
  description: string,
  url: string,
  originalImageId: string,
  viewType: CanvasLineSheetImage['viewType'] = 'front',
  sketchStyle: CanvasLineSheetImage['sketchStyle'] = 'technical',
  annotations: string[] = [],
  measurements?: CanvasLineSheetImage['measurements'],
  customId?: string
): CanvasLineSheetImage => {
  return {
    id: customId || `linesheet-${Date.now()}`,
    title,
    description,
    url,
    originalImageId,
    viewType,
    sketchStyle,
    annotations,
    measurements,
    generatedAt: new Date().toLocaleString()
  };
};

// Helper function to get line sheets by original image
export const getLineSheetsByOriginalImage = (originalImageId: string): CanvasLineSheetImage[] => {
  return canvasLineSheetImagesData.filter(img => img.originalImageId === originalImageId);
};

// Helper function to get line sheets by view type
export const getLineSheetsByViewType = (viewType: CanvasLineSheetImage['viewType']): CanvasLineSheetImage[] => {
  return canvasLineSheetImagesData.filter(img => img.viewType === viewType);
};

// Helper function to get line sheets by sketch style
export const getLineSheetsBySketchStyle = (sketchStyle: CanvasLineSheetImage['sketchStyle']): CanvasLineSheetImage[] => {
  return canvasLineSheetImagesData.filter(img => img.sketchStyle === sketchStyle);
};