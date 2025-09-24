// Export all techpack data for easy imports
export * from './projects/projectTechpacks';
export * from './recommendations/recommendationTechpacks';
export * from './discover/discoverTechpacks';

// Common interfaces used across all techpack types
export interface TechpackLineSheetImage {
  id: string;
  title: string;
  url: string;
  alt: string;
  category?: string;
  addedAt: string;
  placeholder?: boolean;
}

export interface TechpackData {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  status: 'Draft' | 'In Progress' | 'Completed' | 'Review' | 'Approved';
  version: string;
  lastModified: string;
  estimatedCost?: string;
  buildTime?: string;
  materials?: string[];
  lineSheetImages: TechpackLineSheetImage[];
  details?: Array<{ label: string; value: string }>;
  breadcrumbContext?: string;
  sourceImage?: any;
  isOverlay?: boolean;
  sections?: {
    overview?: {
      title: string;
      content: string;
    };
    materials?: {
      title: string;
      content: string;
    };
    measurements?: {
      title: string;
      content: string;
    };
    production?: {
      title: string;
      content: string;
    };
  };
}

// Helper function to get techpack data by context
export const getTechpackByContext = (context: 'project' | 'recommendation' | 'discover', techpackId: string): TechpackData | undefined => {
  // This will be implemented in each specific file
  return undefined;
};