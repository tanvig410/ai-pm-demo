// Canvas Workflow Images - Combined Export
// This file combines all Canvas workflow steps for easy importing

export * from './canvasGenerateImages';
export * from './canvasLineSheetImages';
export * from './canvasTechpackImages';

// Re-export types for convenience
export type {
  CanvasGeneratedImage,
  CanvasLineSheetImage,
  CanvasTechpackImage
} from './canvasGenerateImages';

// Combined workflow data for easy access
import { canvasGeneratedImagesData } from './canvasGenerateImages';
import { canvasLineSheetImagesData } from './canvasLineSheetImages';
import { canvasTechpackImagesData } from './canvasTechpackImages';

export const canvasWorkflowData = {
  generateImages: canvasGeneratedImagesData,
  lineSheets: canvasLineSheetImagesData,
  techpacks: canvasTechpackImagesData
};

// Helper function to get complete workflow for a generated image
export const getCompleteWorkflow = (originalImageId: string) => {
  const originalImage = canvasGeneratedImagesData.find(img => img.id === originalImageId);
  const lineSheets = canvasLineSheetImagesData.filter(img => img.originalImageId === originalImageId);
  const techpacks = canvasTechpackImagesData.filter(img => img.originalImageId === originalImageId);
  
  return {
    originalImage,
    lineSheets,
    techpacks,
    totalSteps: 1 + lineSheets.length + techpacks.length
  };
};

// Helper function to get workflow progress
export const getWorkflowProgress = (originalImageId: string): {
  currentStep: 'generate' | 'linesheet' | 'techpack' | 'complete';
  progress: number;
  nextStep?: string;
} => {
  const workflow = getCompleteWorkflow(originalImageId);
  
  if (!workflow.originalImage) {
    return { currentStep: 'generate', progress: 0 };
  }
  
  if (workflow.lineSheets.length === 0) {
    return { 
      currentStep: 'generate', 
      progress: 25,
      nextStep: 'Generate 2D Line Sheet'
    };
  }
  
  if (workflow.techpacks.length === 0) {
    return { 
      currentStep: 'linesheet', 
      progress: 50,
      nextStep: 'Generate Techpack'
    };
  }
  
  const completedTechpacks = workflow.techpacks.filter(tp => tp.status === 'approved').length;
  const totalTechpacks = workflow.techpacks.length;
  
  if (completedTechpacks === totalTechpacks) {
    return { currentStep: 'complete', progress: 100 };
  }
  
  return { 
    currentStep: 'techpack', 
    progress: 75 + (completedTechpacks / totalTechpacks) * 25,
    nextStep: 'Complete Techpack Review'
  };
};