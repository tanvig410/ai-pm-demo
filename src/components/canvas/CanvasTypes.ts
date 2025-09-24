export interface PromptSuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isSelected?: boolean;
}

export interface CanvasElement {
  id: string;
  type: 'image' | 'text' | 'shape' | 'drawing';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  color?: string;
  fontSize?: number;
  shapeType?: 'rectangle' | 'circle' | 'triangle';
  strokeWidth?: number;
  visible?: boolean;
}

export interface Slide {
  id: string;
  name: string;
  elements: CanvasElement[];
  background: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  data?: any;
}

export interface TechpackSection {
  id: string;
  title: string;
  content: string;
  isGenerating?: boolean;
  isGenerated?: boolean;
}

export type CanvasState = 'selection' | 'loading' | 'results' | 'blank-canvas' | '2d-linesheet' | 'linesheet-results' | 'techpack-generation' | 'techpack-view';
export type ToolType = 'select' | 'text' | 'image' | 'rectangle' | 'circle' | 'triangle' | 'pen' | 'eraser';

// Import Canvas workflow image types
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

export interface CanvasLineSheetImage {
  id: string;
  title: string;
  description: string;
  url: string;
  originalImageId?: string;
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

export interface CanvasTechpackImage {
  id: string;
  title: string;
  description: string;
  url: string;
  originalImageId?: string;
  lineSheetId?: string;
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

export interface CanvasProps {
  preSelectedImage?: {
    id: string;
    url: string;
    alt: string;
  };
  onAddToMyCollection?: (imageData: any) => void;
  onAddToProject?: (imageData: any) => void;
  onCreateTechpack?: (imageData: any) => void;
  onNavigateToTechpack?: (techpackData: any) => void;
  // Canvas workflow data and handlers
  canvasGeneratedImages?: CanvasGeneratedImage[];
  canvasLineSheetImages?: CanvasLineSheetImage[];
  canvasTechpackImages?: CanvasTechpackImage[];
  onGenerateImages?: (prompt: string) => void;
  onGenerateLineSheet?: (originalImageId: string) => void;
  onGenerateTechpack?: (lineSheetId: string) => void;
  onGetWorkflowProgress?: (originalImageId: string) => any;
}