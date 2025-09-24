// Canvas Generate Images Step Data
// Replace the URLs below with your own custom AI-generated concept images

export interface CanvasGeneratedImage {
  id: string;
  title: string;
  description: string;
  url: string;
  prompt?: string;
  style: 'realistic' | 'sketch' | 'watercolor' | 'digital' | 'vintage';
  category: 'clothing' | 'accessories' | 'footwear' | 'bags';
  generatedAt: string;
}

export const canvasGeneratedImagesData: CanvasGeneratedImage[] = [
  {
    id: 'generated-1',
    title: 'Modern Minimalist Blazer',
    description: 'Clean lines with structured shoulders',
    url: 'https://ik.imagekit.io/y8bvmmwmzw/b5b2a070-2a39-4889-93c9-7a92f44817a3%20(1).png', // REPLACE THIS URL
    prompt: 'Modern minimalist blazer with clean lines and structured shoulders',
    style: 'realistic',
    category: 'clothing',
    generatedAt: 'Just now'
  },
  {
    id: 'generated-2',
    title: 'Structured Leather Jacket',
    description: 'Distressed details with oversized fit',
    url: 'https://ik.imagekit.io/y8bvmmwmzw/2c360e55-f613-47f5-a701-64231f6889a5%20(1).png', // REPLACE THIS URL
    prompt: 'Vintage oversized denim jacket with distressed details',
    style: 'vintage',
    category: 'clothing',
    generatedAt: 'Just now'
  },
  {
    id: 'generated-3',
    title: 'Black Structured Leather Jacket',
    description: 'Flowing silhouette with elegant draping',
    url: 'https://5.imimg.com/data5/SELLER/Default/2021/7/XZ/ZQ/IY/1914541/mandala-designer-leather-journal-500x500.JPG', // REPLACE THIS URL
    prompt: 'Elegant silk evening dress with flowing silhouette',
    style: 'realistic',
    category: 'clothing',
    generatedAt: '2 min ago'
  },
  {
    id: 'generated-5',
    title: 'Black Jacket',
    description: 'Luxury leather with gold hardware',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReISJ96hUoB6MXp6sIjzonl6v8Y9v2gcPzuA&s', // REPLACE THIS URL
    prompt: 'Luxury leather handbag with gold hardware details',
    style: 'realistic',
    category: 'bags',
    generatedAt: '5 min ago'
  }

  // ADD MORE GENERATED IMAGES HERE
  // {
  //   id: 'generated-7',
  //   title: 'Your Custom Generated Item',
  //   description: 'Your custom description',
  //   url: 'YOUR_CUSTOM_GENERATED_IMAGE_URL_HERE',
  //   prompt: 'Your AI prompt that generated this image',
  //   style: 'realistic',
  //   category: 'clothing',
  //   generatedAt: 'Now'
  // },
];

// Helper function to create new generated images
export const createGeneratedImage = (
  title: string,
  description: string,
  url: string,
  prompt: string,
  style: CanvasGeneratedImage['style'] = 'realistic',
  category: CanvasGeneratedImage['category'] = 'clothing',
  customId?: string
): CanvasGeneratedImage => {
  return {
    id: customId || `generated-${Date.now()}`,
    title,
    description,
    url,
    prompt,
    style,
    category,
    generatedAt: new Date().toLocaleString()
  };
};

// Helper function to filter images by style
export const getImagesByStyle = (style: CanvasGeneratedImage['style']): CanvasGeneratedImage[] => {
  return canvasGeneratedImagesData.filter(img => img.style === style);
};

// Helper function to filter images by category
export const getImagesByCategory = (category: CanvasGeneratedImage['category']): CanvasGeneratedImage[] => {
  return canvasGeneratedImagesData.filter(img => img.category === category);
};