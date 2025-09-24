export const CANVAS_PROMPTS = [
  {
    id: '1',
    title: 'Generate Designs',
    description: 'Create fashion designs with AI-powered visual concepts',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop&crop=center'
  },
  {
    id: '2', 
    title: 'Generate 2D sketch',
    description: 'Convert ideas into detailed fashion sketches and technical drawings',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center'
  },
  {
    id: '3',
    title: 'Generate Techpack',
    description: 'Create comprehensive technical specifications and production documents',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop&crop=center'
  },
  {
    id: '4',
    title: 'Blank Canvas',
    description: 'Start with a blank canvas to create presentations, mood boards, and layouts',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&crop=center'
  }
];

export const SIDEBAR_TOOLS = [
  { icon: 'Plus', label: 'Add', isActive: false },
  { icon: 'ImageIcon', label: 'Image', isActive: false },
  { icon: 'Layers', label: 'Layers', isActive: true },
  { icon: 'Type', label: 'Text', isActive: false },
  { icon: 'Brush', label: 'Brush', isActive: false },
  { icon: 'Move3D', label: 'Transform', isActive: false },
  { icon: 'Zap', label: 'Effects', isActive: false }
];

export const TECHPACK_SECTIONS = [
  { id: 'overview', title: 'Product Overview', content: '', isGenerating: false, isGenerated: false },
  { id: 'line-sheets', title: '2D Line Sheets', content: '', isGenerating: false, isGenerated: false },
  { id: 'bom', title: 'Bill of Materials (BOM)', content: '', isGenerating: false, isGenerated: false },
  { id: 'materials', title: 'Materials & Construction', content: '', isGenerating: false, isGenerated: false },
  { id: 'measurements', title: 'Size Charts & Fit', content: '', isGenerating: false, isGenerated: false },
  { id: 'construction', title: 'Construction Details', content: '', isGenerating: false, isGenerated: false },
  { id: 'hardware', title: 'Hardware & Trims', content: '', isGenerating: false, isGenerated: false },
  { id: 'colors', title: 'Color Specifications', content: '', isGenerating: false, isGenerated: false },
  { id: 'quality', title: 'Quality Standards', content: '', isGenerating: false, isGenerated: false },
  { id: 'care', title: 'Care Instructions', content: '', isGenerating: false, isGenerated: false },
  { id: 'packaging', title: 'Packaging Specifications', content: '', isGenerating: false, isGenerated: false },
  { id: 'costing', title: 'Cost Analysis & Pricing', content: '', isGenerating: false, isGenerated: false }
];