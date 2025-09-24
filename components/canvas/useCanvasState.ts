import { useState } from 'react';
import { CanvasState, ToolType, WorkflowStep, TechpackSection, Slide, PromptSuggestion } from './CanvasTypes';

export const useCanvasState = () => {
  const [canvasState, setCanvasState] = useState<CanvasState>('selection');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptSuggestion | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedImageForNextStep, setSelectedImageForNextStep] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Navigation breadcrumb state
  const [breadcrumbHistory, setBreadcrumbHistory] = useState<string[]>(['Canvas']);
  
  // Workflow management
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: 'prompt', title: 'Create Prompt', status: 'current' },
    { id: 'generate', title: 'Generate Images', status: 'upcoming' },
    { id: 'select', title: 'Select & Save', status: 'upcoming' },
    { id: 'linesheet', title: '2D Line Sheet', status: 'upcoming' },
    { id: 'techpack', title: 'Techpack', status: 'upcoming' }
  ]);
  
  // Techpack generation state
  const [techpackSections, setTechpackSections] = useState<TechpackSection[]>([]);
  const [techpackData, setTechpackData] = useState<any>(null);
  const [isGeneratingTechpack, setIsGeneratingTechpack] = useState(false);
  const [generatedSectionCount, setGeneratedSectionCount] = useState(0);
  
  // Blank Canvas State
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 'slide-1',
      name: 'Slide 1',
      elements: [],
      background: '#0E0E11'
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(1);

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateBreadcrumb = (newStep: string) => {
    setBreadcrumbHistory(prev => [...prev, newStep]);
  };

  const resetCanvasState = () => {
    setCanvasState('selection');
    setSelectedPrompt(null);
    setCurrentPrompt('');
    setSelectedImageForNextStep(null);
    setTechpackSections([]);
    setTechpackData(null);
    setBreadcrumbHistory(['Canvas']);
    // Reset workflow
    setWorkflowSteps([
      { id: 'prompt', title: 'Create Prompt', status: 'current' },
      { id: 'generate', title: 'Generate Images', status: 'upcoming' },
      { id: 'select', title: 'Select & Save', status: 'upcoming' },
      { id: 'linesheet', title: '2D Line Sheet', status: 'upcoming' },
      { id: 'techpack', title: 'Techpack', status: 'upcoming' }
    ]);
  };

  return {
    // State
    canvasState,
    selectedPrompt,
    currentPrompt,
    selectedImageForNextStep,
    showToast,
    toastMessage,
    breadcrumbHistory,
    workflowSteps,
    techpackSections,
    techpackData,
    isGeneratingTechpack,
    generatedSectionCount,
    activeTool,
    slides,
    activeSlideIndex,
    selectedElement,
    isDrawing,
    showGrid,
    zoom,
    
    // Setters
    setCanvasState,
    setSelectedPrompt,
    setCurrentPrompt,
    setSelectedImageForNextStep,
    setBreadcrumbHistory,
    setWorkflowSteps,
    setTechpackSections,
    setTechpackData,
    setIsGeneratingTechpack,
    setGeneratedSectionCount,
    setActiveTool,
    setSlides,
    setActiveSlideIndex,
    setSelectedElement,
    setIsDrawing,
    setShowGrid,
    setZoom,
    
    // Methods
    showToastNotification,
    updateBreadcrumb,
    resetCanvasState
  };
};