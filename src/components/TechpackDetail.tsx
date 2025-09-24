import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronRight, Download, Share, Edit, MoreHorizontal, Filter, MousePointer, Check, X, Minimize2, Maximize2, Plus, Paperclip } from 'lucide-react';
import aiIcon from 'figma:asset/5aba8dce92364aaa1bae9eead7b907c26ca2a64d.png';
import { canvasLineSheetImagesData, type CanvasLineSheetImage } from '../data/canvasLineSheetImages';
import { 
  getProjectTechpackLineSheetImages
} from '../data/techpacks/projects/projectTechpacks';
import { 
  getRecommendationTechpackByImage,
  getRecommendationTechpackLineSheetImages
} from '../data/techpacks/recommendations/recommendationTechpacks';
import { 
  getDiscoverTechpackByImageTitle,
  getDiscoverTechpackByImageId,
  getDiscoverTechpackLineSheetImages
} from '../data/techpacks/discover/discoverTechpacks';
import { type TechpackLineSheetImage } from '../data/techpacks/index';

interface Techpack {
  id: string;
  name: string;
  description: string;
  images?: string[];
  status?: 'in-progress' | 'completed' | 'review' | 'approved' | 'Draft' | 'In Progress' | 'Completed' | 'Review' | 'Approved';
  lastModified: string;
  folder?: string;
  estimatedCost?: string;
  buildTime?: string;
  materials?: string[];
  breadcrumbContext?: 'canvas' | 'project' | 'recommendation' | 'discover';
  sourceImage?: any;
  isOverlay?: boolean;
  details?: Array<{ label: string; value: string }>;
  sections?: any;
  image?: string;
  version?: string;
}

interface TechpackDetailProps {
  techpack: Techpack;
  projectName: string;
  onBack: () => void;
  breadcrumbContext?: 'canvas' | 'project' | 'recommendation' | 'discover';
  hideHeader?: boolean;
  isOverlay?: boolean;
}

interface TechpackSection {
  id: string;
  title: string;
  subtitle?: string;
  count?: number;
}

interface EditableSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'both';
  editable: boolean;
}

interface SelectedElement {
  sectionId: string;
  elementId: string;
  elementLabel: string;
  currentValue: string;
  elementType: 'text' | 'status' | 'cost' | 'time' | 'description';
}

export function TechpackDetail({ techpack, projectName, onBack, breadcrumbContext = 'project', hideHeader = false, isOverlay = false }: TechpackDetailProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isPointEditMode, setIsPointEditMode] = useState(false);
  const [selectedSectionFilters, setSelectedSectionFilters] = useState<string[]>(['all']);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPromptBarMinimized, setIsPromptBarMinimized] = useState(true);
  
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [editableSections, setEditableSections] = useState<EditableSection[]>([
    {
      id: 'overview',
      title: 'Product Overview',
      content: `Technical specifications for ${techpack.name}. This comprehensive techpack outlines all the essential details for production including materials, construction methods, and quality standards.`,
      type: 'both',
      editable: true
    },
    {
      id: 'materials',
      title: 'Materials & Construction',
      content: 'Detailed material specifications and construction methods. Main fabric: 100% Cotton Canvas, 12oz weight. Secondary materials include cotton twill lining and polyester core thread.',
      type: 'both',
      editable: true
    },
    {
      id: 'measurements',
      title: 'Size & Fit',
      content: 'Comprehensive size chart and fit specifications. Standard sizing from XS to XL with detailed measurements for chest, waist, hip, and length dimensions.',
      type: 'text',
      editable: true
    },
    {
      id: 'production',
      title: 'Production Notes',
      content: 'Manufacturing guidelines and production requirements. Quality control checkpoints, packaging specifications, and delivery timelines.',
      type: 'text',
      editable: true
    }
  ]);

  const sectionFilters = [
    { id: 'all', label: 'All Sections' },
    { id: 'overview', label: 'Overview' },
    { id: 'overview-product-name', label: 'Product Name' },
    { id: 'overview-status', label: 'Status' },
    { id: 'overview-cost', label: 'Estimated Cost' },
    { id: 'overview-build-time', label: 'Build Time' },
    { id: 'overview-description', label: 'Description' },
    { id: 'line-sheets', label: '2D Line Sheets' },
    { id: 'colorways', label: 'Colorways' },
    { id: 'materials', label: 'Materials & Fabrics' },
    { id: 'bom', label: 'Bill of Materials' },
    { id: 'measurements', label: 'Size & Fit' },
    { id: 'construction', label: 'Construction Details' },
    { id: 'packaging', label: 'Packaging & Labels' },
    { id: 'costing', label: 'Cost Analysis' },
    { id: 'timeline', label: 'Production Timeline' }
  ];

  // Get line sheet images from organized data structure
  const getLineSheetImages = () => {
    let techpackLineSheetImages: TechpackLineSheetImage[] = [];
    
    // Get line sheet images based on breadcrumb context
    try {
      if (breadcrumbContext === 'canvas') {
        // For Canvas context, use the generated image from the techpack as the first line sheet
        if (techpack.sourceImage) {
          // Create the first line sheet from the generated image
          const generatedLineSheet = {
            url: techpack.sourceImage.url || techpack.sourceImage.src || techpack.image,
            title: techpack.sourceImage.title || techpack.sourceImage.alt || 'Generated Design',
            description: 'AI Generated Line Sheet',
            viewType: 'generated',
            placeholder: false
          };
          
          // Add additional line sheets from canvas data if needed (limit to 2 more to make total 3)
          const additionalLineSheets = canvasLineSheetImagesData.slice(0, 2).map(lineSheet => ({
            url: lineSheet.url,
            title: lineSheet.title,
            description: lineSheet.description,
            viewType: lineSheet.viewType,
            annotations: lineSheet.annotations,
            measurements: lineSheet.measurements,
            placeholder: false
          }));
          
          return [generatedLineSheet, ...additionalLineSheets];
        }
        // Fallback to canvas line sheet data if no source image
        return canvasLineSheetImagesData.slice(0, 3).map(lineSheet => ({
          url: lineSheet.url,
          title: lineSheet.title,
          description: lineSheet.description,
          viewType: lineSheet.viewType,
          annotations: lineSheet.annotations,
          measurements: lineSheet.measurements,
          placeholder: false
        }));
      } else if (breadcrumbContext === 'project') {
        techpackLineSheetImages = getProjectTechpackLineSheetImages(techpack.id) || [];
      } else if (breadcrumbContext === 'recommendation') {
        // Try to get by techpack ID first, then by image alt text
        techpackLineSheetImages = getRecommendationTechpackLineSheetImages(techpack.id) || [];
        if (techpackLineSheetImages.length === 0 && techpack.sourceImage?.alt) {
          const recommendationTechpack = getRecommendationTechpackByImage(techpack.sourceImage.alt);
          if (recommendationTechpack && recommendationTechpack.lineSheetImages) {
            techpackLineSheetImages = recommendationTechpack.lineSheetImages;
          }
        }
      } else if (breadcrumbContext === 'discover') {
        techpackLineSheetImages = getDiscoverTechpackLineSheetImages(techpack.id) || [];
        if (techpackLineSheetImages.length === 0 && techpack.sourceImage?.id) {
          // Try to get by image ID first (most accurate)
          const discoverTechpack = getDiscoverTechpackByImageId(techpack.sourceImage.id);
          if (discoverTechpack && discoverTechpack.lineSheetImages) {
            techpackLineSheetImages = discoverTechpack.lineSheetImages;
          }
        }
        if (techpackLineSheetImages.length === 0 && techpack.sourceImage?.title) {
          // Fallback to title matching
          const discoverTechpack = getDiscoverTechpackByImageTitle(techpack.sourceImage.title);
          if (discoverTechpack && discoverTechpack.lineSheetImages) {
            techpackLineSheetImages = discoverTechpack.lineSheetImages;
          }
        }
      }
    } catch (error) {
      console.error('Error loading techpack line sheet images:', error);
      techpackLineSheetImages = [];
    }
    
    // If still no images found, try to get from techpack.images array
    if (techpackLineSheetImages.length === 0 && techpack.images && Array.isArray(techpack.images) && techpack.images.length > 0) {
      return techpack.images.map((url, index) => ({
        url,
        title: techpack.name || `View ${index + 1}`,
        description: 'Technical drawing',
        viewType: index === 0 ? 'front' : index === 1 ? 'back' : index === 2 ? 'side' : `view-${index + 1}`,
        placeholder: false
      }));
    }
    
    // If still no images, fallback to canvas line sheet data (limit to 3 images)
    if (techpackLineSheetImages.length === 0) {
      return canvasLineSheetImagesData.slice(0, 3).map(lineSheet => ({
        url: lineSheet.url,
        title: lineSheet.title,
        description: lineSheet.description,
        viewType: lineSheet.viewType,
        annotations: lineSheet.annotations,
        measurements: lineSheet.measurements,
        placeholder: false
      }));
    }
    
    // Convert techpack line sheet images to component format
    return techpackLineSheetImages.map(image => ({
      url: image.url || '',
      title: image.title || 'Untitled',
      description: image.alt || 'Technical drawing',
      viewType: image.category || 'view',
      placeholder: image.placeholder || false,
      id: image.id || 'unknown'
    }));
  };

  if (!techpack) {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] flex items-center justify-center">
        <p>Error: No techpack data available</p>
      </div>
    );
  }

  const lineSheetImages = getLineSheetImages().slice(0, 3); // Limit to first 3 images

  const sections: TechpackSection[] = [
    { id: 'overview', title: 'Overview', subtitle: 'General information' },
    { id: 'line-sheets', title: '2D Line Sheets', count: 3 },
    { id: 'colorways', title: 'Colorways', count: 5 },
    { id: 'materials', title: 'Materials & Fabrics', count: 8 },
    { id: 'bom', title: 'Bill of Materials', subtitle: 'Component breakdown' },
    { id: 'measurements', title: 'Size & Fit', subtitle: 'Grading specifications' },
    { id: 'construction', title: 'Construction Details', count: 12 },
    { id: 'packaging', title: 'Packaging & Labels', count: 4 },
    { id: 'costing', title: 'Cost Analysis', subtitle: 'Detailed breakdown' },
    { id: 'timeline', title: 'Production Timeline', subtitle: 'Milestone tracking' }
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      
      let activeId = 'overview';
      let maxVisibleHeight = 0;
      
      Object.entries(sectionRefs.current).forEach(([sectionId, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          
          const sectionTop = rect.top - containerRect.top;
          const sectionBottom = rect.bottom - containerRect.top;
          
          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(containerHeight, sectionBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibleHeight && (visibleHeight / rect.height) > 0.2) {
            maxVisibleHeight = visibleHeight;
            activeId = sectionId;
          }
        }
      });
      
      if (activeId !== activeSection) {
        setActiveSection(activeId);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const handleSectionClick = (sectionId: string) => {
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const offsetTop = sectionRef.offsetTop;
      container.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedSectionFilters(['all']);
    } else {
      setSelectedSectionFilters(prev => {
        const withoutAll = prev.filter(id => id !== 'all');
        
        if (withoutAll.includes(filterId)) {
          const updated = withoutAll.filter(id => id !== filterId);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...withoutAll, filterId];
        }
      });
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (filterId === 'all') return;
    
    setSelectedSectionFilters(prev => {
      const updated = prev.filter(id => id !== filterId);
      return updated.length === 0 ? ['all'] : updated;
    });
  };

  const handleElementSelect = (element: SelectedElement) => {
    if (!isPointEditMode) return;
    
    setSelectedElement(prev => prev?.elementId === element.elementId ? null : element);
    setSelectedSection(element.sectionId);
    
    const elementFilterId = `${element.sectionId}-${element.elementId}`;
    setSelectedSectionFilters([elementFilterId]);
  };

  const handleGenerate = () => {
    if (!currentPrompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      if (selectedElement) {
        if (selectedElement.sectionId === 'overview') {
          console.log(`Updating ${selectedElement.elementLabel}: ${currentPrompt}`);
        } else {
          const targetSections = [selectedElement.sectionId];
          setEditableSections(prev => prev.map(section => {
            if (targetSections.includes(section.id)) {
              return {
                ...section,
                content: `${section.content}\n\nAI Enhancement for ${selectedElement.elementLabel}: ${currentPrompt} - This specific element has been enhanced based on your targeted prompt.`
              };
            }
            return section;
          }));
        }
      } else {
        const targetSections = selectedSectionFilters.includes('all') 
          ? ['overview'] 
          : selectedSectionFilters.filter(id => editableSections.some(s => s.id === id));
        
        setEditableSections(prev => prev.map(section => {
          if (targetSections.includes(section.id)) {
            return {
              ...section,
              content: `${section.content}\n\nAI Enhancement: ${currentPrompt} - This content has been enhanced based on your prompt to provide more detailed and accurate specifications.`
            };
          }
          return section;
        }));
      }
      
      setCurrentPrompt('');
      setIsGenerating(false);
      
      const target = selectedElement ? selectedElement.elementLabel : selectedSectionFilters.join(', ');
      console.log(`Generated content for: ${target}`);
    }, 2000);
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(prev => prev === sectionId ? null : sectionId);
    setSelectedElement(null);
    if (sectionId !== selectedSection) {
      setSelectedSectionFilters([sectionId]);
    }
  };

  const handleSectionEdit = (sectionId: string) => {
    if (!isPointEditMode) return;
    
    const section = editableSections.find(s => s.id === sectionId);
    if (section && section.editable) {
      setEditingSection(sectionId);
      setTempContent(section.content);
    }
  };

  const handleSaveEdit = () => {
    if (editingSection) {
      setEditableSections(prev => prev.map(section => {
        if (section.id === editingSection) {
          return { ...section, content: tempContent };
        }
        return section;
      }));
      setEditingSection(null);
      setTempContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setTempContent('');
  };

  const createElementProps = (sectionId: string, elementId: string, elementLabel: string, currentValue: string, elementType: SelectedElement['elementType']) => {
    const elementKey = `${sectionId}-${elementId}`;
    const isSelected = selectedElement?.elementId === elementId && selectedElement?.sectionId === sectionId;
    const isHovered = hoveredElement === elementKey;
    
    return {
      className: `transition-all duration-200 ${
        isPointEditMode 
          ? `cursor-pointer rounded-md ${
              isSelected 
                ? 'bg-[#00C2FF]/20 ring-2 ring-[#00C2FF] ring-opacity-50' 
                : isHovered 
                  ? 'bg-[#2A2B30] ring-1 ring-[#00C2FF]/30' 
                  : 'hover:bg-[#1A1B1E]'
            }` 
          : ''
      } ${isPointEditMode ? 'px-2 py-1 -mx-2 -my-1' : ''}`,
      onClick: isPointEditMode ? (e: React.MouseEvent) => {
        e.stopPropagation();
        handleElementSelect({
          sectionId,
          elementId,
          elementLabel,
          currentValue,
          elementType
        });
      } : undefined,
      onMouseEnter: isPointEditMode ? () => setHoveredElement(elementKey) : undefined,
      onMouseLeave: isPointEditMode ? () => setHoveredElement(null) : undefined
    };
  };

  const colorways = (techpack as any)?.colorways || [
    { name: 'Classic Navy', hex: '#1B2951', pantone: 'PMS 533 C' },
    { name: 'Cream White', hex: '#F8F6F0', pantone: 'PMS 663 C' },
    { name: 'Forest Green', hex: '#2D4A3A', pantone: 'PMS 5535 C' },
    { name: 'Rust Orange', hex: '#B85C2E', pantone: 'PMS 7526 C' },
    { name: 'Charcoal Grey', hex: '#3C3C3C', pantone: 'PMS 447 C' }
  ];

  const materials = (techpack as any)?.materialsData || [
    {
      name: 'Main Fabric',
      type: 'Cotton Canvas',
      weight: '12oz',
      composition: '100% Cotton',
      supplier: 'Fabric Co.',
      color: 'Natural',
      cost: '$8.50/yard'
    },
    {
      name: 'Lining',
      type: 'Cotton Twill',
      weight: '5oz',
      composition: '100% Cotton',
      supplier: 'Textile Mills',
      color: 'Cream',
      cost: '$4.20/yard'
    },
    {
      name: 'Thread',
      type: 'Polyester Core',
      weight: '40/2',
      composition: 'Polyester/Cotton',
      supplier: 'Thread Corp',
      color: 'Matching',
      cost: '$2.10/cone'
    }
  ];

  const bomItems = (techpack as any)?.bomItems || [
    { item: 'Main Body Front', quantity: 1, material: 'Cotton Canvas', size: '24" x 18"' },
    { item: 'Main Body Back', quantity: 1, material: 'Cotton Canvas', size: '24" x 18"' },
    { item: 'Side Panels', quantity: 2, material: 'Cotton Canvas', size: '18" x 12"' },
    { item: 'Front Pocket', quantity: 2, material: 'Cotton Canvas', size: '8" x 6"' },
    { item: 'Lining Front', quantity: 1, material: 'Cotton Twill', size: '24" x 18"' },
    { item: 'Lining Back', quantity: 1, material: 'Cotton Twill', size: '24" x 18"' },
    { item: 'Zipper', quantity: 1, material: 'Metal YKK', size: '22"' },
    { item: 'Buttons', quantity: 4, material: 'Metal', size: '20mm' }
  ];

  const navHeight = isOverlay ? 0 : 60;
  const headerHeight = hideHeader ? 0 : (isOverlay ? 133 : 133);
  const totalTopOffset = navHeight + headerHeight;
  const availableHeight = isOverlay ? `calc(100vh - ${headerHeight}px)` : `calc(100vh - ${totalTopOffset}px)`;

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative">
      {!hideHeader && (
        <div className={`bg-[#0E0E11] border-b border-[#1C1D20] px-6 py-4 sticky ${isOverlay ? 'top-0' : 'top-[60px]'} z-40`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[12px]">Back</span>
              </button>
              
              <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
                <span>
                  {breadcrumbContext === 'canvas' ? 'Canvas' : 
                   breadcrumbContext === 'recommendation' ? 'Recommendation' : 
                   breadcrumbContext === 'discover' ? 'Discover' : projectName}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#F5F6F7]">{techpack.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-green-400 capitalize">{techpack.status || 'Draft'}</span>
                <span className="text-[12px] text-[#9CA3AF]">•</span>
                <span className="text-[12px] text-[#9CA3AF]">Updated {techpack.lastModified}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPointEditMode(!isPointEditMode)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    isPointEditMode 
                      ? 'bg-[#00C2FF] text-[#0E0E11]' 
                      : 'bg-[#1C1D20] text-[#F5F6F7] hover:bg-[#2A2B30]'
                  }`}
                >
                  <MousePointer className="w-3 h-3" />
                  <span className="text-[12px] font-medium">Point & Edit</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F6F7] text-[#0E0E11] rounded-lg hover:bg-[#E5E6E7] transition-colors">
                  <Download className="w-3 h-3" />
                  <span className="text-[12px] font-medium">Export</span>
                </button>
                <button className="p-1.5 border border-[#2A2B30] rounded-lg hover:bg-[#1C1D20] transition-colors">
                  <Share className="w-3 h-3 text-[#9CA3AF]" />
                </button>
                <button className="p-1.5 border border-[#2A2B30] rounded-lg hover:bg-[#1C1D20] transition-colors">
                  <Edit className="w-3 h-3 text-[#9CA3AF]" />
                </button>
                <button className="p-1.5 border border-[#2A2B30] rounded-lg hover:bg-[#1C1D20] transition-colors">
                  <MoreHorizontal className="w-3 h-3 text-[#9CA3AF]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-[28px] font-medium text-[#F5F6F7] mb-2">{techpack.name}</h1>
            <p className="text-[14px] text-[#9CA3AF] max-w-2xl">{techpack.description}</p>
          </div>
        </div>
      )}

      <div className="flex" style={{ height: availableHeight }}>
        <div className={`w-80 bg-[#161618] border-r border-[#1C1D20] flex flex-col ${isOverlay ? 'sticky top-0' : `sticky top-[${totalTopOffset}px]`}`} style={{ height: availableHeight }}>
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wide mb-6">
                Contents
              </h2>
              
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-[#1C1D20] text-[#F5F6F7] border-l-2 border-[#F5F6F7]'
                        : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1A1B1E]'
                    }`}
                  >
                    <div>
                      <div className="text-[14px] font-medium">{section.title}</div>
                      {section.subtitle && (
                        <div className="text-[12px] text-[#6B7280] mt-0.5">{section.subtitle}</div>
                      )}
                    </div>
                    {section.count && (
                      <span className="text-[11px] text-[#9CA3AF] bg-[#2A2B30] px-2 py-1 rounded-full">
                        {section.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
          style={{ height: availableHeight }}
        >
          <div className="max-w-4xl mx-auto pb-40 space-y-16">
            {/* Overview Section */}
            <section 
              ref={(el) => (sectionRefs.current['overview'] = el)}
              data-section="overview"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Product Overview</h2>
                  <div 
                    className={`bg-[#2A2B30] rounded-lg p-8 space-y-6 transition-all duration-200 ${
                      isPointEditMode && !selectedElement ? 'hover:bg-[#2F3035] cursor-pointer border-2 border-transparent hover:border-[#00C2FF]' : ''
                    } ${selectedSection === 'overview' && !selectedElement ? 'border-2 border-[#00C2FF] bg-[#2F3035]' : ''}`}
                    onClick={() => isPointEditMode && !selectedElement ? handleSectionSelect('overview') : handleSectionEdit('overview')}
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="text-[12px] text-[#9CA3AF] block mb-2">Product Name</label>
                        <p 
                          className="text-[16px] text-[#F5F6F7]"
                          {...createElementProps('overview', 'product-name', 'Product Name', techpack.name, 'text')}
                        >
                          {techpack.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-[12px] text-[#9CA3AF] block mb-2">Status</label>
                        <p 
                          className="text-[16px] text-green-400 capitalize"
                          {...createElementProps('overview', 'status', 'Status', techpack.status || 'Draft', 'status')}
                        >
                          {techpack.status || 'Draft'}
                        </p>
                      </div>
                      <div>
                        <label className="text-[12px] text-[#9CA3AF] block mb-2">Estimated Cost</label>
                        <p 
                          className="text-[16px] text-[#F5F6F7]"
                          {...createElementProps('overview', 'cost', 'Estimated Cost', techpack.estimatedCost || 'TBD', 'cost')}
                        >
                          {techpack.estimatedCost || 'TBD'}
                        </p>
                      </div>
                      <div>
                        <label className="text-[12px] text-[#9CA3AF] block mb-2">Build Time</label>
                        <p 
                          className="text-[16px] text-[#F5F6F7]"
                          {...createElementProps('overview', 'build-time', 'Build Time', techpack.buildTime || 'TBD', 'time')}
                        >
                          {techpack.buildTime || 'TBD'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] text-[#9CA3AF] block mb-2">Description</label>
                      {editingSection === 'overview' ? (
                        <div className="space-y-4">
                          <textarea
                            value={tempContent}
                            onChange={(e) => setTempContent(e.target.value)}
                            className="w-full h-32 bg-[#1C1D20] text-[#F5F6F7] border border-[#3A3B40] rounded-lg p-4 text-[14px] focus:outline-none focus:border-[#00C2FF] resize-none"
                            placeholder="Edit the overview content..."
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="flex items-center gap-2 px-3 py-1.5 bg-[#00C2FF] text-[#0E0E11] rounded-lg hover:bg-[#00A8D6] transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span className="text-[12px] font-medium">Save</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg hover:bg-[#3A3B40] transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span className="text-[12px] font-medium">Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p 
                          className="text-[16px] text-[#F5F6F7] leading-relaxed"
                          {...createElementProps('overview', 'description', 'Description', editableSections.find(s => s.id === 'overview')?.content || techpack.description, 'description')}
                        >
                          {editableSections.find(s => s.id === 'overview')?.content || techpack.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Line Sheets Section */}
            <section 
              ref={(el) => (sectionRefs.current['line-sheets'] = el)}
              data-section="line-sheets"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">2D Line Sheets</h2>
                  <div className="grid grid-cols-3 gap-6">
                    {/* Display line sheet images from data */}
                    {lineSheetImages.map((lineSheet, index) => (
                      <div key={index} className="bg-[#2A2B30] rounded-lg overflow-hidden">
                        <img
                          src={lineSheet.url}
                          alt={lineSheet.title}
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            // Fallback to a default image if the URL fails
                            target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center';
                          }}
                        />
                        <div className="p-4">
                          <h3 className="text-[14px] font-medium text-[#F5F6F7] mb-1">
                            {lineSheet.title}
                          </h3>
                          <p className="text-[12px] text-[#9CA3AF]">{lineSheet.description}</p>
                          {lineSheet.annotations && lineSheet.annotations.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {lineSheet.annotations.slice(0, 2).map((annotation, i) => (
                                <span key={i} className="text-[10px] bg-[#1C1D20] text-[#9CA3AF] px-2 py-1 rounded">
                                  {annotation}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Add more placeholder slots for manual image addition (limited to 3 total slots) */}
                    {Array.from({ length: Math.max(0, 3 - lineSheetImages.length) }).map((_, index) => (
                      <div key={`placeholder-${index}`} className="bg-[#1C1D20] border-2 border-dashed border-[#3A3B40] rounded-lg overflow-hidden hover:border-[#00C2FF]/50 transition-colors cursor-pointer">
                        <div className="w-full h-64 flex flex-col items-center justify-center text-[#6B7280] hover:text-[#9CA3AF] transition-colors">
                          <div className="w-8 h-8 mb-3 rounded-lg bg-[#2A2B30] flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                          <p className="text-[12px] font-medium">Add Image</p>
                          <p className="text-[10px] mt-1 text-center px-2">Click to upload line sheet</p>
                        </div>
                        <div className="p-4 border-t border-[#3A3B40]">
                          <h3 className="text-[14px] font-medium text-[#6B7280] mb-1">
                            {lineSheetImages.length + index === 3 ? 'Detail View' : 
                             lineSheetImages.length + index === 4 ? 'Pattern View' : 
                             lineSheetImages.length + index === 5 ? 'Construction' :
                             lineSheetImages.length + index === 6 ? 'Measurements' :
                             lineSheetImages.length + index === 7 ? 'Seam Details' :
                             lineSheetImages.length + index === 8 ? 'Finishing' :
                             `View ${lineSheetImages.length + index + 1}`}
                          </h3>
                          <p className="text-[12px] text-[#6B7280]">Technical drawing</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Colorways Section */}
            <section 
              ref={(el) => (sectionRefs.current['colorways'] = el)}
              data-section="colorways"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Colorways</h2>
                  <div className="grid grid-cols-5 gap-4">
                    {colorways.map((color, index) => (
                      <div key={index} className="bg-[#2A2B30] rounded-lg p-4">
                        <div 
                          className="w-full h-24 rounded-lg mb-3"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <h3 className="text-[14px] font-medium text-[#F5F6F7] mb-1">{color.name}</h3>
                        <p className="text-[12px] text-[#9CA3AF]">{color.hex}</p>
                        <p className="text-[12px] text-[#9CA3AF]">{color.pantone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Materials Section */}
            <section 
              ref={(el) => (sectionRefs.current['materials'] = el)}
              data-section="materials"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Materials & Fabrics</h2>
                  <div className="bg-[#2A2B30] rounded-lg p-8">
                    <div className="space-y-6">
                      <p className="text-[16px] text-[#F5F6F7] leading-relaxed">
                        {editableSections.find(s => s.id === 'materials')?.content}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {materials.map((material, index) => (
                          <div key={index} className="bg-[#1C1D20] rounded-lg p-4">
                            <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-2">{material.name}</h4>
                            <div className="space-y-1 text-[12px] text-[#9CA3AF]">
                              <p>{material.type}</p>
                              <p>{material.weight}</p>
                              <p>{material.composition}</p>
                              <p className="text-green-400">{material.cost}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bill of Materials Section */}
            <section 
              ref={(el) => (sectionRefs.current['bom'] = el)}
              data-section="bom"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Bill of Materials</h2>
                  <div className="bg-[#2A2B30] rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#1C1D20]">
                        <tr>
                          <th className="text-left text-[12px] font-medium text-[#9CA3AF] p-4">Item</th>
                          <th className="text-left text-[12px] font-medium text-[#9CA3AF] p-4">Quantity</th>
                          <th className="text-left text-[12px] font-medium text-[#9CA3AF] p-4">Material</th>
                          <th className="text-left text-[12px] font-medium text-[#9CA3AF] p-4">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bomItems.map((item, index) => (
                          <tr key={index} className="border-t border-[#3A3B40]">
                            <td className="text-[14px] text-[#F5F6F7] p-4">{item.item}</td>
                            <td className="text-[14px] text-[#F5F6F7] p-4">{item.quantity}</td>
                            <td className="text-[14px] text-[#9CA3AF] p-4">{item.material}</td>
                            <td className="text-[14px] text-[#9CA3AF] p-4">{item.size}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Measurements Section */}
            <section 
              ref={(el) => (sectionRefs.current['measurements'] = el)}
              data-section="measurements"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Size & Fit</h2>
                  {editingSection === 'measurements' ? (
                    <div className="space-y-4">
                      <textarea
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        className="w-full h-32 bg-[#1C1D20] text-[#F5F6F7] border border-[#3A3B40] rounded-lg p-4 text-[14px] focus:outline-none focus:border-[#00C2FF] resize-none"
                        placeholder="Edit size and fit specifications..."
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#00C2FF] text-[#0E0E11] rounded-lg hover:bg-[#00A8D6] transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span className="text-[12px] font-medium">Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg hover:bg-[#3A3B40] transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span className="text-[12px] font-medium">Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`bg-[#2A2B30] rounded-lg p-8 transition-all duration-200 cursor-pointer ${
                        isPointEditMode ? 'hover:bg-[#2F3035] hover:border-2 hover:border-[#00C2FF]' : ''
                      } ${selectedSection === 'measurements' ? 'border-2 border-[#00C2FF] bg-[#2F3035]' : ''}`}
                      onClick={() => isPointEditMode ? handleSectionSelect('measurements') : handleSectionEdit('measurements')}
                    >
                      <p className="text-[16px] text-[#F5F6F7] leading-relaxed">
                        {editableSections.find(s => s.id === 'measurements')?.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Construction Details Section */}
            <section 
              ref={(el) => (sectionRefs.current['construction'] = el)}
              data-section="construction"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Construction Details</h2>
                  <div className="bg-[#2A2B30] rounded-lg p-8">
                    <p className="text-[16px] text-[#F5F6F7] leading-relaxed mb-6">
                      Detailed construction methods and assembly instructions for manufacturing.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-3">Seam Types</h4>
                        <ul className="space-y-1 text-[12px] text-[#9CA3AF]">
                          <li>• French seam for main body</li>
                          <li>• Flat fell seam for side panels</li>
                          <li>• Overlock finish for raw edges</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-3">Stitch Details</h4>
                        <ul className="space-y-1 text-[12px] text-[#9CA3AF]">
                          <li>• 12 SPI for main construction</li>
                          <li>• 14 SPI for topstitching</li>
                          <li>• Bartack reinforcement at stress points</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Packaging Section */}
            <section 
              ref={(el) => (sectionRefs.current['packaging'] = el)}
              data-section="packaging"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Packaging & Labels</h2>
                  <div className="bg-[#2A2B30] rounded-lg p-8">
                    <p className="text-[16px] text-[#F5F6F7] leading-relaxed mb-6">
                      Packaging specifications and labeling requirements for retail presentation.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-3">Primary Packaging</h4>
                        <ul className="space-y-1 text-[12px] text-[#9CA3AF]">
                          <li>• Tissue paper wrap</li>
                          <li>• Brand hang tag</li>
                          <li>• Care label attachment</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-3">Secondary Packaging</h4>
                        <ul className="space-y-1 text-[12px] text-[#9CA3AF]">
                          <li>• Poly mailer bag</li>
                          <li>• Shipping label</li>
                          <li>• Brand sticker seal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cost Analysis Section */}
            <section 
              ref={(el) => (sectionRefs.current['costing'] = el)}
              data-section="costing"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Cost Analysis</h2>
                  <div className="bg-[#2A2B30] rounded-lg p-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-4">Material Costs</h4>
                        <div className="space-y-2 text-[12px]">
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Main Fabric</span>
                            <span className="text-[#F5F6F7]">$25.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Lining</span>
                            <span className="text-[#F5F6F7]">$12.60</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Trims</span>
                            <span className="text-[#F5F6F7]">$8.30</span>
                          </div>
                          <div className="border-t border-[#3A3B40] pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span className="text-[#F5F6F7]">Subtotal</span>
                              <span className="text-[#F5F6F7]">$46.40</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-[#F5F6F7] mb-4">Labor & Overhead</h4>
                        <div className="space-y-2 text-[12px]">
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Cutting</span>
                            <span className="text-[#F5F6F7]">$15.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Sewing</span>
                            <span className="text-[#F5F6F7]">$35.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#9CA3AF]">Finishing</span>
                            <span className="text-[#F5F6F7]">$12.00</span>
                          </div>
                          <div className="border-t border-[#3A3B40] pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span className="text-[#F5F6F7]">Subtotal</span>
                              <span className="text-[#F5F6F7]">$62.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-[#3A3B40] pt-6 mt-8">
                      <div className="flex justify-between text-[16px] font-medium">
                        <span className="text-[#F5F6F7]">Total Production Cost</span>
                        <span className="text-green-400">{techpack.estimatedCost || 'TBD'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Production Timeline Section */}
            <section 
              ref={(el) => (sectionRefs.current['timeline'] = el)}
              data-section="timeline"
              className="px-8 pt-12 pb-24"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] font-medium text-[#F5F6F7] mb-6">Production Timeline</h2>
                  {editingSection === 'production' ? (
                    <div className="space-y-4">
                      <textarea
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        className="w-full h-32 bg-[#1C1D20] text-[#F5F6F7] border border-[#3A3B40] rounded-lg p-4 text-[14px] focus:outline-none focus:border-[#00C2FF] resize-none"
                        placeholder="Edit production timeline and notes..."
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#00C2FF] text-[#0E0E11] rounded-lg hover:bg-[#00A8D6] transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          <span className="text-[12px] font-medium">Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2B30] text-[#F5F6F7] rounded-lg hover:bg-[#3A3B40] transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span className="text-[12px] font-medium">Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`bg-[#2A2B30] rounded-lg p-8 transition-all duration-200 cursor-pointer ${
                        isPointEditMode ? 'hover:bg-[#2F3035] hover:border-2 hover:border-[#00C2FF]' : ''
                      } ${selectedSection === 'production' ? 'border-2 border-[#00C2FF] bg-[#2F3035]' : ''}`}
                      onClick={() => isPointEditMode ? handleSectionSelect('production') : handleSectionEdit('production')}
                    >
                      <div className="space-y-6">
                        <p className="text-[16px] text-[#F5F6F7] leading-relaxed">
                          {editableSections.find(s => s.id === 'production')?.content}
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div>
                              <h4 className="text-[14px] font-medium text-[#F5F6F7]">Week 1-2: Material Sourcing</h4>
                              <p className="text-[12px] text-[#9CA3AF]">Fabric procurement and quality checks</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div>
                              <h4 className="text-[14px] font-medium text-[#F5F6F7]">Week 3-4: Pattern Making</h4>
                              <p className="text-[12px] text-[#9CA3AF]">Pattern development and grading</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div>
                              <h4 className="text-[14px] font-medium text-[#F5F6F7]">Week 5-6: Production</h4>
                              <p className="text-[12px] text-[#9CA3AF]">Cutting, sewing, and finishing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>



      {/* Right-side Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`bg-[#3A3B3F] backdrop-blur-md border border-[#4A4B50] rounded-xl transition-all duration-300 shadow-2xl ${
          isPromptBarMinimized 
            ? 'w-12 h-12 rounded-full flex items-center justify-center cursor-pointer' 
            : 'w-[420px] p-6'
        }`}>
          {isPromptBarMinimized ? (
            <button
              onClick={() => setIsPromptBarMinimized(false)}
              className="flex items-center justify-center w-full h-full text-[#C1C4C8] hover:text-[#E5E6E7] transition-colors"
            >
              <img src={aiIcon} alt="AI" className="w-6 h-6" />
            </button>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={aiIcon} alt="AI" className="w-6 h-6" />
                  <div>
                    <h3 className="text-[16px] font-medium text-[#E5E6E7]">AI Assistant</h3>
                    <p className="text-[12px] text-[#9CA3AF]">
                      {isPointEditMode ? "Point & Edit mode active - Click elements to modify" : "Edit specific sections"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPromptBarMinimized(true)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#4A4B50] transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-[#9CA3AF]" />
                </button>
              </div>

              {/* Selected Filters Display */}
              {(!selectedSectionFilters.includes('all') && selectedSectionFilters.length > 0) && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-[#9CA3AF]">Active:</span>
                  {selectedSectionFilters.slice(0, 3).map((filterId) => {
                    const filter = sectionFilters.find(f => f.id === filterId);
                    return filter ? (
                      <span
                        key={filterId}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#00C2FF]/20 text-[#00C2FF] rounded-full text-[10px]"
                      >
                        {filter.label}
                        <button
                          onClick={() => handleRemoveFilter(filterId)}
                          className="hover:text-[#F5F6F7] transition-colors"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </span>
                    ) : null;
                  })}
                  {selectedSectionFilters.length > 3 && (
                    <span className="text-[10px] text-[#9CA3AF]">+{selectedSectionFilters.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Prompt Input */}
              <div className="relative">
                <input
                  type="text"
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isGenerating && currentPrompt.trim()) {
                      handleGenerate();
                    }
                  }}
                  placeholder={
                    isPointEditMode 
                      ? "Click on elements in the techpack to edit them..." 
                      : "Describe the changes you want to make..."
                  }
                  className="w-full bg-[#2A2B2E] text-[#E5E6E7] border border-[#4A4B50] rounded-lg px-4 py-3 text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C2FF] pr-20 transition-colors"
                  disabled={isGenerating}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={() => setIsPointEditMode(!isPointEditMode)}
                    className={`p-1.5 rounded transition-colors ${
                      isPointEditMode 
                        ? 'text-[#00C2FF] bg-[#00C2FF]/20' 
                        : 'text-[#9CA3AF] hover:text-[#C1C4C8]'
                    }`}
                    title={isPointEditMode ? "Exit Point & Edit Mode" : "Point & Edit Mode"}
                  >
                    <MousePointer className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`p-1.5 rounded transition-colors ${
                        selectedSectionFilters.length > 1 || !selectedSectionFilters.includes('all')
                          ? 'text-[#00C2FF] bg-[#00C2FF]/20'
                          : 'text-[#9CA3AF] hover:text-[#C1C4C8]'
                      }`}
                    >
                      <Filter className="w-4 h-4" />
                    </button>

                    {isFilterOpen && (
                      <div className="absolute bottom-full right-0 mb-2 w-80 bg-[#2A2B2E] border border-[#4A4B50] rounded-lg shadow-xl z-40 max-h-96 overflow-y-auto">
                        <div className="p-4">
                          <h4 className="text-[12px] font-medium text-[#E5E6E7] mb-3 uppercase tracking-wide">
                            Section Filters
                          </h4>
                          <div className="space-y-2 max-h-72 overflow-y-auto">
                            {sectionFilters.map((filter) => (
                              <label
                                key={filter.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3A3B3F] cursor-pointer transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSectionFilters.includes(filter.id)}
                                  onChange={() => handleFilterToggle(filter.id)}
                                  className="w-4 h-4 text-[#00C2FF] bg-transparent border-2 border-[#4A4B50] rounded focus:ring-[#00C2FF] focus:ring-2"
                                />
                                <span className="text-[12px] text-[#E5E6E7] flex-1">
                                  {filter.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="p-1.5 rounded text-[#9CA3AF] hover:text-[#C1C4C8] transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>
                {isGenerating && (
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-[#6B7280] border-t-[#00C2FF] rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!currentPrompt.trim() || isGenerating}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 text-[14px] font-medium ${
                  currentPrompt.trim() && !isGenerating
                    ? 'bg-[#4A4B50] text-[#E5E6E7] hover:bg-[#5A5B60] shadow-lg'
                    : 'bg-[#2A2B2E] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#6B7280] border-t-[#E5E6E7] rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <img src={aiIcon} alt="AI" className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}