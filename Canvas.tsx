import { useRef, useCallback, useState } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Layers, 
  Type, 
  Brush, 
  Move3D, 
  Zap,
  HelpCircle,
  Filter,
  Paperclip,
  Upload,
  Square,
  Circle,
  Triangle,
  Pen,
  Eraser,
  Save,
  Download,
  ArrowLeft,
  Copy,
  Trash2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid,
  Eye,
  EyeOff,
  Heart,
  ChevronRight,
  FileText,
  Bookmark,
  FolderPlus,
  PenTool,
  Layers3,
  RefreshCw,
  MessageSquare,
  Check,
  MousePointer,
  Edit,
  MoreHorizontal,
  Share
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TechpackDetail } from './TechpackDetail';
import { FilterOverlay } from './FilterOverlay';
import { BlankCanvas } from './BlankCanvas';
import aiIcon from 'figma:asset/5aba8dce92364aaa1bae9eead7b907c26ca2a64d.png';

import { CanvasProps, CanvasElement, CanvasGeneratedImage, CanvasLineSheetImage } from './canvas/CanvasTypes';
import { CANVAS_PROMPTS, SIDEBAR_TOOLS, TECHPACK_SECTIONS } from './canvas/CanvasConstants';
import { getSectionContent, createFinalTechpackData } from './canvas/CanvasHelpers';
import { useCanvasState } from './canvas/useCanvasState';

// Create the LineSheetFilterOverlay component first  
import { useState } from 'react';
import { X, Sliders, Image as ImageIcon, FileText, Eye, CheckSquare } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface LineSheetFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

function LineSheetFilterOverlay({ isOpen, onClose, onApplyFilters }: LineSheetFilterOverlayProps) {
  const [activeTab, setActiveTab] = useState<'views' | 'details' | 'annotations' | 'output'>('views');
  
  // Filter states for 2D Line Sheet generation
  const [frontView, setFrontView] = useState(true);
  const [backView, setBackView] = useState(true);
  const [sideView, setSideView] = useState(false);
  const [threeFourthView, setThreeFourthView] = useState(false);
  
  const [constructionDetails, setConstructionDetails] = useState(true);
  const [seams, setSeams] = useState(true);
  const [measurements, setMeasurements] = useState(true);
  const [grainLine, setGrainLine] = useState(true);
  
  const [annotations, setAnnotations] = useState(true);
  const [fabricCallouts, setFabricCallouts] = useState(true);
  const [constructionNotes, setConstructionNotes] = useState(false);
  const [patternPieces, setPatternPieces] = useState(false);
  
  const [lineWeight, setLineWeight] = useState([2]);
  const [detailLevel, setDetailLevel] = useState([75]);
  const [scale, setScale] = useState([100]);

  const handleApplyFilters = () => {
    const filters = {
      views: {
        front: frontView,
        back: backView,
        side: sideView,
        threeFourth: threeFourthView
      },
      details: {
        construction: constructionDetails,
        seams,
        measurements,
        grainLine
      },
      annotations: {
        enabled: annotations,
        fabricCallouts,
        constructionNotes,
        patternPieces
      },
      output: {
        lineWeight: lineWeight[0],
        detailLevel: detailLevel[0],
        scale: scale[0]
      }
    };
    
    onApplyFilters(filters);
    onClose();
  };

  const tabs = [
    { id: 'views' as const, label: 'Views', icon: Eye },
    { id: 'details' as const, label: 'Details', icon: FileText },
    { id: 'annotations' as const, label: 'Annotations', icon: CheckSquare },
    { id: 'output' as const, label: 'Output', icon: ImageIcon }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/5 pointer-events-auto"
        onClick={onClose}
      />
      
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="w-[420px] bg-[#0E0E11]/98 backdrop-blur-md rounded-lg border border-[#2A2B30]/80 overflow-hidden shadow-2xl">
          <div className="border-b border-[#2A2B30]/50">
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#C1C4C8]" />
                <h3 className="text-xs font-medium text-[#C1C4C8]">2D Line Sheet Filters</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#2A2B30]/50 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </button>
            </div>
            
            <div className="flex px-4 pb-3 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded text-xs transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#3A3B40] text-[#E5E6E7] font-medium border border-[#4A4B50]/50'
                        : 'text-[#9CA3AF] hover:text-[#C1C4C8] hover:bg-[#2A2B30]/50'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 max-h-72 overflow-y-auto scrollbar-hide">
            {activeTab === 'views' && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Required Views</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Front View</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Main frontal perspective</p>
                      </div>
                      <Switch
                        checked={frontView}
                        onCheckedChange={setFrontView}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Back View</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Rear perspective details</p>
                      </div>
                      <Switch
                        checked={backView}
                        onCheckedChange={setBackView}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Additional Views</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Side View</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Profile silhouette</p>
                      </div>
                      <Switch
                        checked={sideView}
                        onCheckedChange={setSideView}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">3/4 View</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Angled perspective</p>
                      </div>
                      <Switch
                        checked={threeFourthView}
                        onCheckedChange={setThreeFourthView}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Construction Details</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Construction Lines</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Show garment construction</p>
                      </div>
                      <Switch
                        checked={constructionDetails}
                        onCheckedChange={setConstructionDetails}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Seam Lines</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Indicate seam placement</p>
                      </div>
                      <Switch
                        checked={seams}
                        onCheckedChange={setSeams}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#C1C4C8] font-medium mb-3 block">Technical Elements</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Measurements</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Key dimension indicators</p>
                      </div>
                      <Switch
                        checked={measurements}
                        onCheckedChange={setMeasurements}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                      <div>
                        <span className="text-sm text-[#C1C4C8] font-medium">Grain Line</span>
                        <p className="text-xs text-[#9CA3AF] opacity-80">Fabric direction arrows</p>
                      </div>
                      <Switch
                        checked={grainLine}
                        onCheckedChange={setGrainLine}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'annotations' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Text Annotations</label>
                    <Switch
                      checked={annotations}
                      onCheckedChange={setAnnotations}
                    />
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed opacity-80 mb-4">
                    Include descriptive text and callouts
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                    <div>
                      <span className="text-sm text-[#C1C4C8] font-medium">Fabric Callouts</span>
                      <p className="text-xs text-[#9CA3AF] opacity-80">Material specifications</p>
                    </div>
                    <Switch
                      checked={fabricCallouts}
                      onCheckedChange={setFabricCallouts}
                      disabled={!annotations}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1E1F23] rounded border border-[#2A2B30]/40">
                    <div>
                      <span className="text-sm text-[#C1C4C8] font-medium">Construction Notes</span>
                      <p className="text-xs text-[#9CA3AF] opacity-80">Assembly instructions</p>
                    </div>
                    <Switch
                      checked={constructionNotes}
                      onCheckedChange={setConstructionNotes}
                      disabled={!annotations}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'output' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Line Weight</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {lineWeight[0]}px
                    </div>
                  </div>
                  <Slider
                    value={lineWeight}
                    onValueChange={setLineWeight}
                    max={5}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Thickness of drawn lines</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#C1C4C8] font-medium">Detail Level</label>
                    <div className="text-xs text-[#C1C4C8] font-mono bg-[#1E1F23] px-2 py-1 rounded border border-[#2A2B30]/40 text-center min-w-[40px]">
                      {detailLevel[0]}%
                    </div>
                  </div>
                  <Slider
                    value={detailLevel}
                    onValueChange={setDetailLevel}
                    max={100}
                    min={25}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1 opacity-80">Amount of technical detail shown</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 border-t border-[#2A2B30]/40 bg-[#0E0E11]/50">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#C1C4C8] border border-[#2A2B30]/60 hover:border-[#3A3B40]/60 rounded transition-all duration-200 bg-transparent hover:bg-[#1E1F23]"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 text-sm text-[#0E0E11] bg-[#C1C4C8] hover:bg-[#D1D4D8] rounded transition-all duration-200 font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Canvas({ 
  preSelectedImage, 
  onAddToMyCollection, 
  onAddToProject, 
  onCreateTechpack, 
  onNavigateToTechpack,
  canvasGeneratedImages = [],
  canvasLineSheetImages = [],
  canvasTechpackImages = [],
  onGenerateImages,
  onGenerateLineSheet,
  onGenerateTechpack,
  onGetWorkflowProgress
}: CanvasProps) {
  const {
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
    showGrid,
    zoom,
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
    setShowGrid,
    setZoom,
    showToastNotification,
    updateBreadcrumb,
    resetCanvasState
  } = useCanvasState();

  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterModalType, setFilterModalType] = useState<'generate-designs' | '2d-linesheet'>('generate-designs');
  const [selectedActionType, setSelectedActionType] = useState<'generate-designs' | '2d-linesheet' | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter modal handlers
  const handleOpenFilterModal = (type?: 'generate-designs' | '2d-linesheet') => {
    // If no type is specified, use the selected action type or default to generate-designs
    const modalType = type || selectedActionType || 'generate-designs';
    setFilterModalType(modalType);
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters: any) => {
    console.log(`Applied ${filterModalType} filters:`, filters);
    
    // Handle different filter types
    if (filterModalType === '2d-linesheet') {
      // Apply line sheet filters and generate
      if (preSelectedImage) {
        handleGenerateLineSheetFromPreSelected();
      } else {
        // If no pre-selected image, find the last selected image from results
        const lastSelectedImage = canvasGeneratedImages[0];
        if (lastSelectedImage) {
          handleCreateLineSheet(lastSelectedImage);
        }
      }
    } else {
      // Apply design generation filters
      handleGenerate();
    }
    
    setIsFilterModalOpen(false);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === 0) {
      // Reset to selection state when clicking "Canvas" in breadcrumb
      setCanvasState('selection');
      setBreadcrumbHistory(['Canvas']);
      setCurrentPrompt('');
      setSelectedPrompt(null);
      setSelectedImageForNextStep('');
      setSelectedActionType(null);
      
      // Reset workflow steps to initial state
      setWorkflowSteps([
        { id: 'prompt', title: 'Create Prompt', status: 'current' },
        { id: 'generate', title: 'Generate Images', status: 'upcoming' },
        { id: 'select', title: 'Select & Save', status: 'upcoming' },
        { id: 'linesheet', title: '2D Line Sheet', status: 'upcoming' },
        { id: 'techpack', title: 'Techpack', status: 'upcoming' }
      ]);
    } else {
      const targetStep = breadcrumbHistory[index];
      setBreadcrumbHistory(prev => prev.slice(0, index + 1));
      
      switch (targetStep) {
        case 'Generate Images':
          if (canvasGeneratedImages.length > 0) {
            setCanvasState('results');
          }
          break;
        case '2D Line Sheet':
          if (canvasLineSheetImages.length > 0) {
            setCanvasState('linesheet-results');
          }
          break;
        default:
          break;
      }
    }
  };

  const updateWorkflowStep = (stepId: string, status: 'completed' | 'current' | 'upcoming', data?: any) => {
    setWorkflowSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return { ...step, status, data };
      }
      const stepIds = ['prompt', 'generate', 'select', 'linesheet', 'techpack'];
      const currentIndex = stepIds.indexOf(stepId);
      const stepIndex = stepIds.indexOf(step.id);
      
      if (stepIndex < currentIndex) {
        return { ...step, status: 'completed' as const };
      } else if (stepIndex > currentIndex) {
        return { ...step, status: 'upcoming' as const };
      }
      return step;
    }));
  };

  const navigateToStep = (stepId: string) => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step || step.status === 'upcoming') return;

    setCurrentPrompt('');

    switch (stepId) {
      case 'prompt':
        setCanvasState('selection');
        updateWorkflowStep('prompt', 'current');
        break;
      case 'generate':
        if (selectedPrompt || canvasGeneratedImages.length > 0) {
          setCanvasState('loading');
          updateWorkflowStep('generate', 'current');
          setTimeout(() => {
            setCanvasState('results');
            updateWorkflowStep('generate', 'completed');
            updateWorkflowStep('select', 'current');
          }, 3000);
        }
        break;
      case 'select':
        if (canvasGeneratedImages.length > 0) {
          setCanvasState('results');
          updateWorkflowStep('select', 'current');
        }
        break;
      case 'linesheet':
        if (selectedImageForNextStep) {
          setCanvasState('linesheet-results');
          updateWorkflowStep('linesheet', 'current');
        }
        break;
    }
  };

  const handlePromptSelect = (prompt: any) => {
    if (prompt.id === '4') {
      setCanvasState('blank-canvas');
      return;
    }
    setSelectedPrompt(prompt);
    // Reset action type when selecting a new prompt
    setSelectedActionType(null);
  };

  const handleBackFromBlankCanvas = () => {
    setCanvasState('selection');
  };

  const handleGenerate = () => {
    if (!currentPrompt.trim() && !selectedPrompt && !preSelectedImage) return;
    
    // Set action type to generate-designs if not already set
    if (!selectedActionType) {
      setSelectedActionType('generate-designs');
    }
    
    setCanvasState('loading');
    updateWorkflowStep('prompt', 'completed');
    updateWorkflowStep('generate', 'current');
    updateBreadcrumb('Generate Images');
    
    if (onGenerateImages) {
      onGenerateImages(currentPrompt || selectedPrompt?.title || '');
    }
    
    setTimeout(() => {
      setCanvasState('results');
      updateWorkflowStep('generate', 'completed');
      updateWorkflowStep('select', 'current');
      setCurrentPrompt('');
    }, 3000);
  };

  // Handle pre-selected image for direct line sheet generation
  const handleGenerateLineSheetFromPreSelected = () => {
    if (!preSelectedImage) return;
    
    setSelectedImageForNextStep(preSelectedImage.url);
    setCanvasState('2d-linesheet');
    
    // Update workflow steps to reflect that we're skipping initial steps
    updateWorkflowStep('prompt', 'completed');
    updateWorkflowStep('generate', 'completed');
    updateWorkflowStep('select', 'completed');
    updateWorkflowStep('linesheet', 'current');
    
    updateBreadcrumb('Generate Images');
    updateBreadcrumb('2D Line Sheet');
    
    if (onGenerateLineSheet) {
      onGenerateLineSheet(preSelectedImage.id || 'pre-selected');
    }
    
    setTimeout(() => {
      setCanvasState('linesheet-results');
      updateWorkflowStep('linesheet', 'completed');
      updateWorkflowStep('techpack', 'current');
    }, 3000);
  };

  // Handle line sheet generation button click
  const handleLineSheetGeneration = () => {
    // Check if we have a pre-selected image (from Discover)
    if (preSelectedImage) {
      handleGenerateLineSheetFromPreSelected();
      return;
    }
    
    // Check if we have generated images to use
    if (canvasGeneratedImages.length > 0) {
      const firstImage = canvasGeneratedImages[0];
      handleCreateLineSheet(firstImage);
      return;
    }
    
    // If no images available, first generate some
    if (selectedPrompt || currentPrompt.trim()) {
      // Set action type to track that we want line sheets after generation
      setSelectedActionType('2d-linesheet');
      
      // Start generation process
      setCanvasState('loading');
      updateWorkflowStep('prompt', 'completed');
      updateWorkflowStep('generate', 'current');
      updateBreadcrumb('Generate Images');
      
      if (onGenerateImages) {
        onGenerateImages(currentPrompt || selectedPrompt?.title || '');
      }
      
      setTimeout(() => {
        setCanvasState('results');
        updateWorkflowStep('generate', 'completed');
        updateWorkflowStep('select', 'current');
        setCurrentPrompt('');
        
        // Auto-proceed to line sheet generation with first image
        if (canvasGeneratedImages.length > 0) {
          setTimeout(() => {
            handleCreateLineSheet(canvasGeneratedImages[0]);
          }, 500);
        }
      }, 3000);
    } else {
      // Show a toast notification that a prompt is needed
      showToastNotification('Please enter a prompt or select a suggestion first');
    }
  };

  const handleSaveToCollection = (imageData: CanvasGeneratedImage, index: number) => {
    if (onAddToMyCollection) {
      const collectionData = {
        id: imageData.id,
        title: imageData.title,
        subtitle: 'Saved from Canvas',
        url: imageData.url,
        alt: imageData.description,
        addedAt: new Date().toLocaleDateString()
      };
      onAddToMyCollection(collectionData);
      showToastNotification('Image saved to My Collection');
    }
  };

  const handleCreateLineSheet = (imageData: CanvasGeneratedImage) => {
    setSelectedImageForNextStep(imageData.url);
    setCanvasState('2d-linesheet');
    updateWorkflowStep('select', 'completed');
    updateWorkflowStep('linesheet', 'current');
    updateBreadcrumb('2D Line Sheet');
    setCurrentPrompt('');
    
    if (onGenerateLineSheet) {
      onGenerateLineSheet(imageData.id);
    }
    
    setTimeout(() => {
      setCanvasState('linesheet-results');
      updateWorkflowStep('linesheet', 'completed');
      updateWorkflowStep('techpack', 'current');
      setCurrentPrompt('');
    }, 3000);
  };

  const handleLinesheetAction = (action: string, imageData?: CanvasLineSheetImage) => {
    switch (action) {
      case 'save-collection':
        if (onAddToMyCollection && imageData) {
          const collectionData = {
            id: imageData.id,
            title: imageData.title,
            subtitle: 'Saved from Canvas',
            url: imageData.url,
            alt: imageData.description,
            addedAt: new Date().toLocaleDateString()
          };
          onAddToMyCollection(collectionData);
          showToastNotification('Line sheet saved to My Collection');
        }
        break;
      case 'create-techpack':
        if (imageData) {
          setSelectedImageForNextStep(imageData.url);
          startTechpackGeneration(imageData);
        }
        break;
      case 'add-to-project':
        if (onAddToProject && imageData) {
          const projectData = {
            src: imageData.url,
            alt: imageData.description,
            title: imageData.title
          };
          onAddToProject(projectData);
        }
        break;
    }
  };

  const startTechpackGeneration = (imageData: CanvasLineSheetImage) => {
    setCanvasState('techpack-generation');
    updateBreadcrumb('Techpack Generation');
    setIsGeneratingTechpack(true);
    setGeneratedSectionCount(0);
    
    if (onGenerateTechpack) {
      onGenerateTechpack(imageData.id);
    }
    
    const sections = [...TECHPACK_SECTIONS];
    setTechpackSections(sections);
    
    generateSectionsSequentially(sections, 0);
  };

  const generateSectionsSequentially = (sections: any[], index: number) => {
    if (index >= sections.length) {
      setIsGeneratingTechpack(false);
      
      const finalTechpackData = createFinalTechpackData(
        selectedImageForNextStep,
        canvasLineSheetImages,
        sections
      );
      
      setTechpackData(finalTechpackData);
      setCanvasState('techpack-view');
      updateBreadcrumb('Techpack');
      return;
    }
    
    setTechpackSections(prev => prev.map((section, i) => 
      i === index ? { ...section, isGenerating: true } : section
    ));
    
    setTimeout(() => {
      const sectionContent = getSectionContent(sections[index].id);
      
      setTechpackSections(prev => prev.map((section, i) => 
        i === index ? { 
          ...section, 
          isGenerating: false, 
          isGenerated: true, 
          content: sectionContent 
        } : section
      ));
      
      setGeneratedSectionCount(index + 1);
      
      setTimeout(() => generateSectionsSequentially(sections, index + 1), 300);
    }, 1000 + Math.random() * 500);
  };

  const handleRegenerateLinesheet = () => {
    setCanvasState('2d-linesheet');
    setTimeout(() => {
      setCanvasState('linesheet-results');
    }, 3000);
  };

  // Blank Canvas Functions
  const addNewSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      name: `Slide ${slides.length + 1}`,
      elements: [],
      background: '#0E0E11'
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (activeSlideIndex >= newSlides.length) {
      setActiveSlideIndex(newSlides.length - 1);
    }
  };

  const addImageToCanvas = useCallback((imageUrl: string, x: number = 100, y: number = 100) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: 'image',
      x,
      y,
      width: 200,
      height: 150,
      src: imageUrl,
      visible: true
    };
    
    const updatedSlides = slides.map((slide, index) => {
      if (index === activeSlideIndex) {
        return { ...slide, elements: [...slide.elements, newElement] };
      }
      return slide;
    });
    
    setSlides(updatedSlides);
  }, [slides, activeSlideIndex]);

  const addTextToCanvas = useCallback((text: string = 'New Text', x: number = 100, y: number = 100) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      x,
      y,
      width: 200,
      height: 40,
      content: text,
      color: '#F5F6F7',
      fontSize: 16,
      visible: true
    };
    
    const updatedSlides = slides.map((slide, index) => {
      if (index === activeSlideIndex) {
        return { ...slide, elements: [...slide.elements, newElement] };
      }
      return slide;
    });
    
    setSlides(updatedSlides);
  }, [slides, activeSlideIndex]);

  const addShapeToCanvas = useCallback((shapeType: 'rectangle' | 'circle' | 'triangle', x: number = 100, y: number = 100) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: 'shape',
      x,
      y,
      width: 100,
      height: 100,
      shapeType,
      color: '#F5F6F7',
      strokeWidth: 2,
      visible: true
    };
    
    const updatedSlides = slides.map((slide, index) => {
      if (index === activeSlideIndex) {
        return { ...slide, elements: [...slide.elements, newElement] };
      }
      return slide;
    });
    
    setSlides(updatedSlides);
  }, [slides, activeSlideIndex]);

  const deleteElement = (elementId: string) => {
    const updatedSlides = slides.map((slide, index) => {
      if (index === activeSlideIndex) {
        return { ...slide, elements: slide.elements.filter(el => el.id !== elementId) };
      }
      return slide;
    });
    
    setSlides(updatedSlides);
    setSelectedElement(null);
  };

  const duplicateElement = (elementId: string) => {
    const element = slides[activeSlideIndex].elements.find(el => el.id === elementId);
    if (!element) return;
    
    const newElement: CanvasElement = {
      ...element,
      id: `element-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20
    };
    
    const updatedSlides = slides.map((slide, index) => {
      if (index === activeSlideIndex) {
        return { ...slide, elements: [...slide.elements, newElement] };
      }
      return slide;
    });
    
    setSlides(updatedSlides);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        addImageToCanvas(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCanvas = () => {
    const canvasData = {
      slides,
      activeSlideIndex,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('canvas-data', JSON.stringify(canvasData));
    console.log('Canvas saved:', canvasData);
  };

  // Early return for blank canvas state
  if (canvasState === 'blank-canvas') {
    return <BlankCanvas onBack={handleBackFromBlankCanvas} />;
  }

  if (canvasState === 'techpack-view' && techpackData) {
    return (
      <TechpackDetail 
        techpack={techpackData}
        projectName="Canvas Generated"
        onBack={() => {
          setCanvasState('linesheet-results');
          setBreadcrumbHistory(prev => prev.slice(0, -1));
        }}
        breadcrumbContext="canvas"
      />
    );
  }

  const sidebarTools = SIDEBAR_TOOLS.map(tool => ({
    ...tool,
    icon: {
      'Plus': Plus,
      'ImageIcon': ImageIcon,
      'Layers': Layers,
      'Type': Type,
      'Brush': Brush,
      'Move3D': Move3D,
      'Zap': Zap
    }[tool.icon] || Plus
  }));

  // Platform Consistent Breadcrumb - Fixed positioning
  const Breadcrumb = () => (
    <div className="fixed top-[60px] left-0 right-0 bg-[#0E0E11] border-b border-[#1C1D20] px-6 py-4 z-40">
      <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
        {breadcrumbHistory.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <button
              onClick={() => navigateToBreadcrumb(index)}
              className={`transition-colors ${
                index === breadcrumbHistory.length - 1
                  ? 'text-[#F5F6F7] font-medium'
                  : 'text-[#9CA3AF] hover:text-[#F5F6F7] cursor-pointer'
              }`}
            >
              {step}
            </button>
            {index < breadcrumbHistory.length - 1 && (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Toast Notification
  const Toast = () => (
    showToast && (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-[#10B981] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span className="text-[14px] font-medium">{toastMessage}</span>
        </div>
      </div>
    )
  );

  // Techpack Generation State
  if (canvasState === 'techpack-generation') {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative">
        <Breadcrumb />
        
        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen pt-32 pb-20">
          <div className="max-w-4xl w-full mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-[#1C1D20] flex items-center justify-center mx-auto mb-4">
                <img src={aiIcon} alt="AI" className="w-8 h-8" />
              </div>
              <h1 className="text-[24px] font-medium text-[#F5F6F7] mb-2">Generating Comprehensive Techpack</h1>
              <p className="text-[14px] text-[#9CA3AF]">
                Creating industry-standard technical specifications with BOM, construction details, and quality standards...
              </p>
              <div className="mt-4 text-[12px] text-[#9CA3AF]">
                {generatedSectionCount} of {techpackSections.length} sections generated
              </div>
            </div>

            {/* Sections Grid - 3 columns for better layout with more sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techpackSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    section.isGenerated
                      ? 'bg-[#1C1D20] border-[#10B981] opacity-100'
                      : section.isGenerating
                      ? 'bg-[#1C1D20] border-[#2A2B30] opacity-100 animate-pulse'
                      : 'bg-[#161618] border-[#2A2B30] opacity-50'
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      section.isGenerated
                        ? 'bg-[#10B981] text-white'
                        : section.isGenerating
                        ? 'bg-[#2A2B30] text-[#9CA3AF]'
                        : 'bg-[#2A2B30] text-[#6B7280]'
                    }`}>
                      {section.isGenerated ? (
                        <Check className="w-4 h-4" />
                      ) : section.isGenerating ? (
                        <div className="w-3 h-3 border-2 border-[#9CA3AF] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </div>
                    <h3 className="text-[16px] font-medium text-[#F5F6F7]">{section.title}</h3>
                  </div>
                  
                  {section.isGenerated && (
                    <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                      {section.content.substring(0, 100)}...
                    </p>
                  )}
                  
                  {section.isGenerating && (
                    <div className="space-y-2">
                      <div className="h-3 bg-[#2A2B30] rounded animate-pulse" />
                      <div className="h-3 bg-[#2A2B30] rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-[#2A2B30] rounded animate-pulse w-1/2" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-12">
              <div className="w-full bg-[#1C1D20] rounded-full h-2">
                <div 
                  className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(generatedSectionCount / techpackSections.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Toast />
      </div>
    );
  }

  // 2D Line Sheet Loading State
  if (canvasState === '2d-linesheet') {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative overflow-hidden">
        <Breadcrumb />
        
        {/* Left Sidebar */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 mt-16">
          <div className="flex flex-col gap-4">
            {sidebarTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    tool.isActive 
                      ? 'bg-[#3E3F44] text-white' 
                      : 'bg-transparent text-[#9CA3AF] hover:bg-[#1C1D20] hover:text-white'
                  }`}
                  title={tool.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center min-h-screen pt-44 pb-48">
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="relative bg-[#1C1D20] overflow-hidden"
                style={{
                  width: '300px',
                  height: '400px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A2B30] to-[#1C1D20] animate-pulse" />
                <div className="absolute inset-0 bg-[#0E0E11] opacity-50 blur-sm" />
                <div className="absolute bottom-4 left-4 text-[#9CA3AF] text-sm">
                  Sketching...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - 2D Line Sheet Loading */}
        <div className="absolute top-44 right-6 z-10 w-64">
          <div className="bg-[#1C1D20] rounded-xl border border-[#2A2B30] p-4">
            <div className="text-center mb-4">
              <div className="text-white text-sm mb-1">Creating Line Sheet</div>
              <div className="text-[#9CA3AF] text-xs">
                Converting design into technical drawings...
              </div>
            </div>

            {/* Selected Design */}
            <div className="mb-4 p-2 bg-[#2A2B30] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border-2 border-[#10B981]">
                  <ImageWithFallback
                    src={selectedImageForNextStep || ''}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#F5F6F7] font-medium">Selected Design</div>
                  <div className="text-[10px] text-[#9CA3AF]">Processing...</div>
                </div>
              </div>
            </div>

            {/* Loading Line Sheets */}
            <div className="mb-4">
              <div className="text-[12px] text-[#9CA3AF] mb-2">Generating</div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((index) => (
                  <div key={index} className="aspect-square rounded overflow-hidden bg-[#2A2B30] animate-pulse">
                    <div className="w-full h-full bg-gradient-to-br from-[#3A3B40] to-[#2A2B30]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
        
        <Toast />
      </div>
    );
  }

  // Line Sheet Results State - Modified to show single image
  if (canvasState === 'linesheet-results') {
    // Get the first line sheet image to display
    const primaryLineSheet = canvasLineSheetImages[0];
    
    if (!primaryLineSheet) {
      return <div>No line sheet available</div>;
    }

    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative overflow-hidden">
        <Breadcrumb />
        
        {/* Left Sidebar */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-4">
            {sidebarTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    tool.isActive 
                      ? 'bg-[#3E3F44] text-white' 
                      : 'bg-transparent text-[#9CA3AF] hover:bg-[#1C1D20] hover:text-white'
                  }`}
                  title={tool.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Single Line Sheet Result - Centered */}
        <div className="flex items-center justify-center min-h-screen pt-44 pb-48">
          <div className="flex justify-center">
            <div
              className="relative bg-[#1C1D20] overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
              style={{
                width: '400px',
                height: '500px'
              }}
            >
              <ImageWithFallback
                src={primaryLineSheet.url}
                alt={primaryLineSheet.description}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinesheetAction('save-collection', primaryLineSheet);
                    }}
                    className="p-2 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white transition-colors"
                    title="Save to Collection"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinesheetAction('create-techpack', primaryLineSheet);
                    }}
                    className="p-2 bg-[#2A2B30]/80 hover:bg-[#3A3B40] rounded-lg text-[#F5F6F7] transition-colors"
                    title="Generate Techpack"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinesheetAction('add-to-project', primaryLineSheet);
                    }}
                    className="p-2 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white transition-colors"
                    title="Add to Project"
                  >
                    <FolderPlus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Bottom Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleLinesheetAction('save-collection', primaryLineSheet)}
                    className="flex-1 px-3 py-2 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Bookmark className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={() => handleLinesheetAction('create-techpack', primaryLineSheet)}
                    className="flex-1 px-3 py-2 bg-[#2A2B30]/80 hover:bg-[#3A3B40] rounded-lg text-[#F5F6F7] text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3 h-3" />
                    Create Techpack
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium group-hover:opacity-0 transition-opacity">
                {primaryLineSheet.title}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Thumbnail Grid */}
        <div className="absolute top-44 right-6 z-10 w-64">
          <div className="bg-[#1C1D20] rounded-xl border border-[#2A2B30] p-4">
            <div className="text-center mb-4">
              <div className="text-white text-sm mb-1">2D Line Sheet</div>
              <div className="text-[#9CA3AF] text-xs">
                Technical drawing generated
              </div>
            </div>

            {/* Thumbnail Grid - Previous Generated Images */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                {canvasGeneratedImages.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="aspect-square rounded overflow-hidden bg-[#2A2B30]">
                    <ImageWithFallback
                      src={image.url}
                      alt={image.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Current Step */}
            <div className="mb-4 p-2 bg-[#2A2B30] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={selectedImageForNextStep || ''}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#F5F6F7] font-medium">Source Design</div>
                  <div className="text-[10px] text-[#9CA3AF]">Line sheet created</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={handleRegenerateLinesheet}
                className="w-full px-3 py-2 bg-[#2A2B30] text-[#F5F6F7] rounded-lg text-sm hover:bg-[#3A3B40] transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
              <button className="w-full px-3 py-2 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] hover:text-[#F5F6F7] transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Prompt Box */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[#1C1D20] rounded-2xl border border-[#2A2B30] p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={selectedImageForNextStep || ''}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                placeholder="Refine your line sheet or ask for modifications..."
                className="flex-1 bg-transparent text-[#F5F6F7] placeholder-[#9CA3AF] outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleRegenerateLinesheet()}
              />
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Filter options">
                  <Filter className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Import/Attach">
                  <Paperclip className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button 
                  onClick={handleRegenerateLinesheet}
                  className="px-6 py-2 bg-[#2A2B30] text-[#F5F6F7] rounded-lg font-medium hover:bg-[#3A3B40] transition-colors text-sm"
                >
                  Refine
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
        
        <Toast />
      </div>
    );
  }

  // Blank Canvas UI (complete implementation)
  if (canvasState === 'blank-canvas') {
    const currentSlide = slides[activeSlideIndex];
    
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] flex">
        {/* Left Toolbar */}
        <div className="w-16 bg-[#1C1D20] border-r border-[#2A2B30] flex flex-col items-center py-4 gap-2">
          <button
            onClick={() => {
              resetCanvasState();
              setSelectedActionType(null);
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white transition-colors"
            title="Back to Selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-px bg-[#2A2B30] my-2" />
          
          {/* Tools */}
          <button
            onClick={() => setActiveTool('select')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'select' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Select"
          >
            <Move3D className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTool('text')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'text' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Text"
          >
            <Type className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTool('image')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'image' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTool('rectangle')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'rectangle' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Rectangle"
          >
            <Square className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTool('circle')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'circle' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Circle"
          >
            <Circle className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTool('pen')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTool === 'pen' ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Pen"
          >
            <Pen className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-px bg-[#2A2B30] my-2" />
          
          {/* Utilities */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              showGrid ? 'bg-[#3E3F44] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white'
            }`}
            title="Toggle Grid"
          >
            <Grid className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setZoom(Math.min(zoom + 0.25, 3))}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setZoom(Math.max(zoom - 0.25, 0.25))}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-px bg-[#2A2B30] my-2" />
          
          <button
            onClick={saveCanvas}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white transition-colors"
            title="Save"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="h-16 bg-[#1C1D20] border-b border-[#2A2B30] flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-[18px] font-medium">Blank Canvas</h1>
              <div className="text-[14px] text-[#9CA3AF]">
                Zoom: {Math.round(zoom * 100)}%
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {activeTool === 'image' && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg text-[14px] hover:bg-[#3A3B40] transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
              )}
              
              {activeTool === 'text' && (
                <button
                  onClick={() => addTextToCanvas()}
                  className="px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg text-[14px] hover:bg-[#3A3B40] transition-colors"
                >
                  Add Text
                </button>
              )}
              
              {(activeTool === 'rectangle' || activeTool === 'circle') && (
                <button
                  onClick={() => addShapeToCanvas(activeTool)}
                  className="px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg text-[14px] hover:bg-[#3A3B40] transition-colors"
                >
                  Add {activeTool === 'rectangle' ? 'Rectangle' : 'Circle'}
                </button>
              )}
              
              {selectedElement && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => duplicateElement(selectedElement)}
                    className="p-2 text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-white rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteElement(selectedElement)}
                    className="p-2 text-[#9CA3AF] hover:bg-[#2A2B30] hover:text-red-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={canvasRef}
              className="absolute inset-0 bg-[#0E0E11] overflow-auto"
              style={{ 
                backgroundImage: showGrid ? 
                  'radial-gradient(circle at 1px 1px, #2A2B30 1px, transparent 0)' : 'none',
                backgroundSize: showGrid ? '20px 20px' : 'auto'
              }}
            >
              <div 
                className="relative mx-auto my-8 bg-white"
                style={{ 
                  width: 800 * zoom, 
                  height: 600 * zoom,
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left'
                }}
                onClick={(e) => {
                  if (activeTool === 'text') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / zoom;
                    const y = (e.clientY - rect.top) / zoom;
                    addTextToCanvas('New Text', x, y);
                  } else if (activeTool === 'rectangle' || activeTool === 'circle') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / zoom;
                    const y = (e.clientY - rect.top) / zoom;
                    addShapeToCanvas(activeTool, x, y);
                  }
                }}
              >
                {/* Render Canvas Elements */}
                {currentSlide.elements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute cursor-pointer ${
                      selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      display: element.visible ? 'block' : 'none'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElement(element.id);
                    }}
                  >
                    {element.type === 'image' && element.src && (
                      <img
                        src={element.src}
                        alt="Canvas element"
                        className="w-full h-full object-cover rounded"
                        draggable={false}
                      />
                    )}
                    
                    {element.type === 'text' && (
                      <div
                        className="w-full h-full flex items-center justify-center text-black bg-transparent border border-dashed border-gray-300"
                        style={{
                          color: element.color,
                          fontSize: element.fontSize
                        }}
                      >
                        {element.content}
                      </div>
                    )}
                    
                    {element.type === 'shape' && (
                      <div className="w-full h-full">
                        {element.shapeType === 'rectangle' && (
                          <div
                            className="w-full h-full border-2"
                            style={{
                              borderColor: element.color,
                              borderWidth: element.strokeWidth
                            }}
                          />
                        )}
                        {element.shapeType === 'circle' && (
                          <div
                            className="w-full h-full rounded-full border-2"
                            style={{
                              borderColor: element.color,
                              borderWidth: element.strokeWidth
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Slides */}
        <div className="w-64 bg-[#1C1D20] border-l border-[#2A2B30] flex flex-col">
          <div className="p-4 border-b border-[#2A2B30]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-medium">Slides</h3>
              <button
                onClick={addNewSlide}
                className="w-8 h-8 rounded-lg bg-[#2A2B30] hover:bg-[#3A3B40] flex items-center justify-center transition-colors"
                title="Add Slide"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  index === activeSlideIndex
                    ? 'bg-[#2A2B30] border-[#3A3B40]'
                    : 'bg-[#1C1D20] border-[#2A2B30] hover:bg-[#2A2B30]'
                }`}
                onClick={() => setActiveSlideIndex(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-medium">{slide.name}</span>
                  {slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSlide(index);
                      }}
                      className="text-[#9CA3AF] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                {/* Slide Preview */}
                <div className="w-full h-16 bg-white rounded border border-[#2A2B30] relative overflow-hidden">
                  <div className="text-[8px] text-gray-400 p-1">
                    {slide.elements.length} elements
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <Toast />
      </div>
    );
  }

  // Selection State - Show initial prompt cards with floating prompt box
  if (canvasState === 'selection') {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative overflow-hidden">
        {/* Left Sidebar */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-4">
            {sidebarTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    tool.isActive 
                      ? 'bg-[#3E3F44] text-white' 
                      : 'bg-transparent text-[#9CA3AF] hover:bg-[#1C1D20] hover:text-white'
                  }`}
                  title={tool.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex items-start justify-center min-h-screen pt-24 pb-48">
          <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
            {/* Prompt Suggestions */}
            {CANVAS_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handlePromptSelect(prompt)}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-colors text-left group ${
                  selectedPrompt?.id === prompt.id 
                    ? 'bg-[#1C1D20] border border-[#2A2B30]' 
                    : 'hover:bg-[#1C1D20]'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={prompt.imageUrl}
                    alt={prompt.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{prompt.title}</div>
                  <div className="text-[#9CA3AF] text-sm leading-relaxed">{prompt.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Complete Prompt Box */}
        {selectedPrompt?.id !== '4' && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#1C1D20] rounded-2xl border border-[#2A2B30] p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={selectedPrompt?.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop&crop=center"}
                      alt="AI PLM"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {selectedPrompt ? selectedPrompt.title : "Create a"}
                    </div>
                    <div className="text-[#9CA3AF] text-sm">
                      {selectedPrompt ? selectedPrompt.description : "fashion design concept"}
                    </div>
                  </div>
                </div>
                
                {/* Pre-selected Image from My Collection */}
                {preSelectedImage && (
                  <div className="mb-4 p-3 bg-[#2A2B30] rounded-xl border border-[#3A3B40]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded overflow-hidden">
                        <ImageWithFallback
                          src={preSelectedImage.url}
                          alt={preSelectedImage.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] text-[#F5F6F7] font-medium">Reference Image</p>
                        <p className="text-[12px] text-[#9CA3AF]">{preSelectedImage.title || preSelectedImage.alt}</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF] mb-3">Choose what you want to do with this image:</p>
                    
                    {/* Quick Action Buttons for Pre-selected Image */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedActionType('2d-linesheet');
                          handleOpenFilterModal('2d-linesheet');
                        }}
                        className="flex-1 px-3 py-2 bg-[#3A3B40] text-[#F5F6F7] rounded-lg text-sm font-medium hover:bg-[#4A4B50] transition-colors flex items-center justify-center gap-2"
                      >
                        <PenTool className="w-3 h-3" />
                        2D Line Sheet
                      </button>
                      <button
                        onClick={() => {
                          setSelectedActionType('generate-designs');
                          handleGenerate();
                        }}
                        className="flex-1 px-3 py-2 bg-[#2A2B30] text-[#F5F6F7] rounded-lg text-sm hover:bg-[#3A3B40] transition-colors flex items-center justify-center gap-2"
                      >
                        <Zap className="w-3 h-3" />
                        Generate Similar
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="text"
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    placeholder={preSelectedImage ? "Describe modifications or leave blank to use reference..." : "Describe what you want to create..."}
                    className="w-full bg-[#0E0E11] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A2B30] transition-colors pr-44"
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button 
                      onClick={handleOpenFilterModal}
                      className="p-1.5 hover:bg-[#2A2B30] rounded-lg transition-colors" 
                      title="Filter options"
                    >
                      <Filter className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                    <button className="p-1.5 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Import/Attach">
                      <Paperclip className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                    <button 
                      onClick={handleGenerate}
                      disabled={!currentPrompt.trim() && !selectedPrompt && !preSelectedImage}
                      className="ml-2 px-5 py-2 bg-[#2A2B30] text-[#F5F6F7] rounded-lg font-medium hover:bg-[#3A3B40] transition-colors text-sm disabled:bg-[#1C1D20] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
        
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #F5F6F7 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #F5F6F7 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <Toast />

        {/* Filter Modal */}
        <FilterOverlay
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    );
  }

  // Loading State
  if (canvasState === 'loading') {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative overflow-hidden">
        <Breadcrumb />
        
        {/* Left Sidebar */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-4">
            {sidebarTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    tool.isActive 
                      ? 'bg-[#3E3F44] text-white' 
                      : 'bg-transparent text-[#9CA3AF] hover:bg-[#1C1D20] hover:text-white'
                  }`}
                  title={tool.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar - Loading State */}
        <div className="absolute top-44 right-6 z-10 w-64">
          <div className="bg-[#1C1D20] rounded-xl border border-[#2A2B30] p-4">
            <div className="text-center mb-4">
              <div className="text-white text-sm mb-1">Current Prompt</div>
              <div className="text-[#9CA3AF] text-xs">
                {currentPrompt || 'Generating based on your prompt...'}
              </div>
            </div>

            {/* Current Prompt Info */}
            <div className="mb-4 p-2 bg-[#2A2B30] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={selectedPrompt?.imageUrl || preSelectedImage?.url || ''}
                    alt="Selected Prompt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#F5F6F7] font-medium">{selectedPrompt?.title || 'Generate Designs'}</div>
                  <div className="text-[10px] text-[#9CA3AF]">Generating...</div>
                </div>
              </div>
            </div>

            {/* Loading Thumbnails */}
            <div className="mb-4">
              <div className="text-[12px] text-[#9CA3AF] mb-2">Progress</div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square rounded overflow-hidden bg-[#2A2B30] animate-pulse">
                    <div className="w-full h-full bg-gradient-to-br from-[#3A3B40] to-[#2A2B30]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading Grid */}
        <div className="flex items-center justify-center min-h-screen pt-44 pb-48">
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="relative bg-[#1C1D20] overflow-hidden"
                style={{
                  width: '300px',
                  height: '300px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A2B30] to-[#1C1D20] animate-pulse" />
                <div className="absolute inset-0 bg-[#0E0E11] opacity-50 blur-sm" />
                <div className="absolute bottom-4 left-4 text-[#9CA3AF] text-sm">
                  Dreaming...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Prompt Box */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[#1C1D20] rounded-2xl border border-[#2A2B30] p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={selectedPrompt?.imageUrl || preSelectedImage?.url || ''}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#9CA3AF] text-sm">What do you want to see...</div>
              <div className="flex items-center gap-2 ml-8">
                <button 
                  onClick={handleOpenFilterModal}
                  className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" 
                  title="Filter options"
                >
                  <Filter className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Import/Attach">
                  <Paperclip className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="px-6 py-2 bg-[#2A2B30] text-[#9CA3AF] rounded-lg font-medium cursor-not-allowed text-sm">
                  Generating...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
        
        <Toast />

        {/* Filter Modal */}
        <FilterOverlay
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    );
  }

  // Results State
  if (canvasState === 'results') {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative overflow-hidden">
        <Breadcrumb />
        
        {/* Left Sidebar */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-4">
            {sidebarTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    tool.isActive 
                      ? 'bg-[#3E3F44] text-white' 
                      : 'bg-transparent text-[#9CA3AF] hover:bg-[#1C1D20] hover:text-white'
                  }`}
                  title={tool.label}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar - Selected Element */}
        <div className="absolute top-44 right-6 z-10 w-64">
          <div className="bg-[#1C1D20] rounded-xl border border-[#2A2B30] p-4">
            <div className="text-center mb-4">
              <div className="text-white text-sm mb-1">Last Prompt</div>
              <div className="text-[#9CA3AF] text-xs">
                {currentPrompt || 'Generated images from prompt'}
              </div>
            </div>

            {/* Current Prompt Info */}
            <div className="mb-4 p-2 bg-[#2A2B30] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={selectedPrompt?.imageUrl || preSelectedImage?.url || ''}
                    alt="Selected Prompt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#F5F6F7] font-medium">{selectedPrompt?.title || 'Generate Designs'}</div>
                  <div className="text-[10px] text-[#9CA3AF]">AI generation</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] hover:text-[#F5F6F7] transition-colors flex items-center justify-center gap-2">
                <Plus className="w-3 h-3" />
                Show More
              </button>
              <button className="w-full px-3 py-2 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] hover:text-[#F5F6F7] transition-colors flex items-center justify-center gap-2">
                <Zap className="w-3 h-3" />
                Brainstorm
              </button>
              <button className="w-full px-3 py-2 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] hover:text-[#F5F6F7] transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex items-center justify-center min-h-screen pt-44 pb-48">
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            {canvasGeneratedImages.map((image, index) => (
              <div
                key={image.id}
                className="relative bg-[#1C1D20] overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
                style={{
                  width: '300px',
                  height: '300px'
                }}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSaveToCollection(image, index)}
                      className="p-2 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white transition-colors"
                      title="Save to My Collection"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenFilterModal('2d-linesheet')}
                      className="p-2 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white transition-colors"
                      title="Create 2D Line Sheet"
                    >
                      <PenTool className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Bottom Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSaveToCollection(image, index)}
                      className="flex-1 px-3 py-1.5 bg-[#1C1D20]/80 hover:bg-[#2A2B30] rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Bookmark className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      onClick={() => handleLineSheetGeneration()}
                      className="flex-1 px-3 py-1.5 bg-[#2A2B30]/80 hover:bg-[#3A3B40] rounded-lg text-[#F5F6F7] text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <PenTool className="w-3 h-3" />
                      Line Sheet
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 text-white text-sm font-medium group-hover:opacity-0 transition-opacity">
                  {image.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Prompt Box */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[#1C1D20] rounded-2xl border border-[#2A2B30] p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={selectedPrompt?.imageUrl || preSelectedImage?.url || ''}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                placeholder="What do you want to see..."
                className="flex-1 bg-transparent text-[#F5F6F7] placeholder-[#9CA3AF] outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Filter options">
                  <Filter className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Import/Attach">
                  <Paperclip className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={!currentPrompt.trim() && !selectedPrompt}
                  className="px-6 py-2 bg-[#2A2B30] text-[#F5F6F7] rounded-lg font-medium hover:bg-[#3A3B40] transition-colors text-sm disabled:bg-[#1C1D20] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
        
        <Toast />

        {/* Filter Modal */}
        <FilterOverlay
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    );
  }

  return (
    <>
      {/* Filter Modals */}
      {filterModalType === 'generate-designs' ? (
        <FilterOverlay 
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
        />
      ) : (
        <LineSheetFilterOverlay 
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </>
  );
}