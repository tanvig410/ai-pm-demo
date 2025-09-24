import { useState, useRef, useCallback, useEffect } from 'react';
import {
  MousePointer,
  Square,
  Circle,
  Type,
  PenTool,
  Move,
  RotateCw,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Grid,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
  Save,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Palette,
  Search,
  Filter,
  Settings,
  ArrowLeft,
  Minus,
  MoreHorizontal,
  FolderPlus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BlankCanvasProps {
  onBack?: () => void;
}

interface CanvasElement {
  id: string;
  type: 'rectangle' | 'circle' | 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  imageUrl?: string;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
}

interface Page {
  id: string;
  name: string;
  thumbnail?: string;
  elements: CanvasElement[];
}

export function BlankCanvas({ onBack }: BlankCanvasProps) {
  // Canvas state
  const [selectedTool, setSelectedTool] = useState<'select' | 'rectangle' | 'circle' | 'text' | 'pen' | 'image'>('select');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Canvas elements and pages
  const [pages, setPages] = useState<Page[]>([
    {
      id: 'page-1',
      name: 'Page 1',
      elements: []
    }
  ]);
  const [activePage, setActivePage] = useState('page-1');
  
  // Panel states
  const [leftPanelTab, setLeftPanelTab] = useState<'layers' | 'assets' | 'tokens'>('layers');
  const [rightPanelTab, setRightPanelTab] = useState<'design' | 'prototype' | 'inspect'>('design');
  
  // Element properties
  const [elementProps, setElementProps] = useState({
    fill: '#F5F6F7',
    stroke: '#2A2B30',
    strokeWidth: 2,
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Cosmos.so',
    textAlign: 'left' as 'left' | 'center' | 'right',
    opacity: 100
  });

  // Canvas refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current page
  const currentPage = pages.find(p => p.id === activePage) || pages[0];
  const currentElements = currentPage.elements;

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (selectedTool === 'select') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: selectedTool as any,
      x: x - 50,
      y: y - 25,
      width: selectedTool === 'text' ? 200 : 100,
      height: selectedTool === 'text' ? 40 : 100,
      fill: elementProps.fill,
      stroke: elementProps.stroke,
      strokeWidth: elementProps.strokeWidth,
      text: selectedTool === 'text' ? 'Sample Text' : undefined,
      fontSize: elementProps.fontSize,
      fontWeight: elementProps.fontWeight,
      fontFamily: elementProps.fontFamily,
      textAlign: elementProps.textAlign,
      visible: true,
      locked: false,
      opacity: elementProps.opacity
    };

    setPages(prev => prev.map(page =>
      page.id === activePage
        ? { ...page, elements: [...page.elements, newElement] }
        : page
    ));

    setSelectedElement(newElement.id);
    setSelectedTool('select');
  }, [selectedTool, activePage, elementProps]);

  // Handle element selection
  const handleElementClick = useCallback((elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setSelectedTool('select');
  }, []);

  // Delete selected element
  const deleteSelectedElement = useCallback(() => {
    if (!selectedElement) return;
    
    setPages(prev => prev.map(page =>
      page.id === activePage
        ? { ...page, elements: page.elements.filter(el => el.id !== selectedElement) }
        : page
    ));
    
    setSelectedElement(null);
  }, [selectedElement, activePage]);

  // Toggle element visibility
  const toggleElementVisibility = useCallback((elementId: string) => {
    setPages(prev => prev.map(page =>
      page.id === activePage
        ? {
            ...page,
            elements: page.elements.map(el =>
              el.id === elementId ? { ...el, visible: !el.visible } : el
            )
          }
        : page
    ));
  }, [activePage]);

  // Toggle element lock
  const toggleElementLock = useCallback((elementId: string) => {
    setPages(prev => prev.map(page =>
      page.id === activePage
        ? {
            ...page,
            elements: page.elements.map(el =>
              el.id === elementId ? { ...el, locked: !el.locked } : el
            )
          }
        : page
    ));
  }, [activePage]);

  // Duplicate element
  const duplicateElement = useCallback((elementId: string) => {
    const element = currentElements.find(el => el.id === elementId);
    if (!element) return;

    const newElement = {
      ...element,
      id: `element-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20
    };

    setPages(prev => prev.map(page =>
      page.id === activePage
        ? { ...page, elements: [...page.elements, newElement] }
        : page
    ));

    setSelectedElement(newElement.id);
  }, [currentElements, activePage]);

  // Add new page
  const addNewPage = useCallback(() => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: `Page ${pages.length + 1}`,
      elements: []
    };

    setPages(prev => [...prev, newPage]);
    setActivePage(newPage.id);
  }, [pages.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedElement();
      }
      if (e.key === 'Escape') {
        setSelectedElement(null);
        setSelectedTool('select');
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'd') {
          e.preventDefault();
          if (selectedElement) duplicateElement(selectedElement);
        }
        if (e.key === 'a') {
          e.preventDefault();
          // Select all elements logic could go here
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelectedElement, selectedElement, duplicateElement]);

  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const newElement: CanvasElement = {
        id: `image-${Date.now()}`,
        type: 'image',
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        imageUrl,
        visible: true,
        locked: false,
        opacity: 100
      };

      setPages(prev => prev.map(page =>
        page.id === activePage
          ? { ...page, elements: [...page.elements, newElement] }
          : page
      ));

      setSelectedElement(newElement.id);
    };
    reader.readAsDataURL(file);
  }, [activePage]);

  // Update element property
  const updateElementProperty = useCallback((elementId: string, property: string, value: any) => {
    setPages(prev => prev.map(page =>
      page.id === activePage
        ? {
            ...page,
            elements: page.elements.map(el =>
              el.id === elementId ? { ...el, [property]: value } : el
            )
          }
        : page
    ));
  }, [activePage]);

  const selectedElementData = currentElements.find(el => el.id === selectedElement);

  return (
    <div className="h-screen bg-[#0E0E11] text-[#F5F6F7] flex flex-col overflow-hidden">
      {/* Header with Back Button */}
      <div className="h-12 bg-[#1A1B20] border-b border-[#2A2B30] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] h-8 px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Canvas
          </Button>
          <Separator orientation="vertical" className="h-6 bg-[#2A2B30]" />
          <span className="text-sm font-medium text-[#F5F6F7]">Design Editor</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F5F6F7] h-8 w-8 p-0">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F5F6F7] h-8 w-8 p-0">
            <Redo className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6 bg-[#2A2B30]" />
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F5F6F7] h-8 w-8 p-0">
            <Save className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F5F6F7] h-8 w-8 p-0">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Top Toolbar */}
      <div className="h-12 bg-[#1A1B20] border-b border-[#2A2B30] flex items-center justify-between px-4">
        {/* Tool Selection */}
        <div className="flex items-center gap-1">
          <Button
            variant={selectedTool === 'select' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTool('select')}
            className="w-9 h-8 p-0"
          >
            <MousePointer className="w-4 h-4" />
          </Button>
          <Button
            variant={selectedTool === 'rectangle' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTool('rectangle')}
            className="w-9 h-8 p-0"
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            variant={selectedTool === 'circle' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTool('circle')}
            className="w-9 h-8 p-0"
          >
            <Circle className="w-4 h-4" />
          </Button>
          <Button
            variant={selectedTool === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTool('text')}
            className="w-9 h-8 p-0"
          >
            <Type className="w-4 h-4" />
          </Button>
          <Button
            variant={selectedTool === 'pen' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTool('pen')}
            className="w-9 h-8 p-0"
          >
            <PenTool className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-9 h-8 p-0"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6 bg-[#2A2B30] mx-2" />
          
          {selectedElement && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => duplicateElement(selectedElement)}
                className="w-9 h-8 p-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={deleteSelectedElement}
                className="w-9 h-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 bg-[#2A2B30] mx-2" />
            </>
          )}
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className={`w-9 h-8 p-0 ${showGrid ? 'bg-[#2A2B30]' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <span className="text-xs text-[#9CA3AF]">Grid</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setZoom(Math.max(10, zoom - 10))}
              className="w-9 h-8 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-[#9CA3AF] w-12 text-center">{zoom}%</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="w-9 h-8 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F5F6F7] h-8 px-3">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#171822] border-r border-[#2A2B30] flex flex-col">
          {/* Left Panel Tabs */}
          <Tabs value={leftPanelTab} onValueChange={(v) => setLeftPanelTab(v as any)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-[#1A1B20] rounded-none border-b border-[#2A2B30] h-10">
              <TabsTrigger value="layers" className="text-xs h-8">LAYERS</TabsTrigger>
              <TabsTrigger value="assets" className="text-xs h-8">ASSETS</TabsTrigger>
              <TabsTrigger value="tokens" className="text-xs h-8">TOKENS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="layers" className="flex-1 m-0 p-0">
              <div className="p-3 border-b border-[#2A2B30]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#C1C4C8]">PAGES</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={addNewPage}
                    className="w-6 h-6 p-0 hover:bg-[#2A2B30]"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <ScrollArea className="max-h-32">
                  {pages.map((page) => (
                    <div
                      key={page.id}
                      onClick={() => setActivePage(page.id)}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs transition-colors ${
                        activePage === page.id
                          ? 'bg-[#2A2B30] text-[#F5F6F7]'
                          : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1E1F23]'
                      }`}
                    >
                      <div className="w-4 h-3 bg-[#2A2B30] rounded border border-[#3A3B40] flex-shrink-0"></div>
                      <span className="truncate">{page.name}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              
              <div className="flex-1 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#C1C4C8]">LAYERS</span>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-[#2A2B30]">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  {currentElements.map((element) => (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs group ${
                        selectedElement === element.id
                          ? 'bg-[#2A2B30] text-[#F5F6F7]'
                          : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#1E1F23]'
                      }`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementVisibility(element.id);
                        }}
                        className="w-4 h-4 p-0 opacity-60 hover:opacity-100"
                      >
                        {element.visible ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                      </Button>
                      <div className="w-4 h-4 bg-[#3A3B40] rounded flex-shrink-0 flex items-center justify-center">
                        {element.type === 'rectangle' && <Square className="w-2 h-2" />}
                        {element.type === 'circle' && <Circle className="w-2 h-2" />}
                        {element.type === 'text' && <Type className="w-2 h-2" />}
                        {element.type === 'image' && <ImageIcon className="w-2 h-2" />}
                      </div>
                      <span className="truncate flex-1">
                        {element.type === 'text' ? element.text : element.type}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementLock(element.id);
                        }}
                        className="w-4 h-4 p-0 opacity-0 group-hover:opacity-60 hover:opacity-100"
                      >
                        {element.locked ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <Unlock className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                  {currentElements.length === 0 && (
                    <div className="text-xs text-[#6B7280] text-center py-8">
                      No layers yet
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="flex-1 m-0 p-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search assets..."
                    className="flex-1 h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                  />
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-[#C1C4C8]">RECENT</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-[#2A2B30] rounded border border-[#3A3B40] cursor-pointer hover:border-[#4A4B50] transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tokens" className="flex-1 m-0 p-3">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-[#C1C4C8]">COLORS</div>
                  <div className="grid grid-cols-6 gap-1">
                    {['#F5F6F7', '#9CA3AF', '#6B7280', '#374151', '#1F2937', '#111827'].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded border border-[#3A3B40] cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => setElementProps(prev => ({ ...prev, fill: color }))}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-[#C1C4C8]">TYPOGRAPHY</div>
                  <div className="space-y-1">
                    {[
                      { size: 14, weight: 'normal', label: '14px Regular' },
                      { size: 16, weight: 'normal', label: '16px Regular' },
                      { size: 18, weight: 'medium', label: '18px Medium' },
                      { size: 20, weight: 'bold', label: '20px Bold' }
                    ].map((font) => (
                      <div
                        key={font.label}
                        className="px-2 py-1 text-xs bg-[#1A1B20] rounded border border-[#2A2B30] cursor-pointer hover:bg-[#1E1F23] transition-colors"
                        onClick={() => setElementProps(prev => ({ 
                          ...prev, 
                          fontSize: font.size, 
                          fontWeight: font.weight 
                        }))}
                      >
                        {font.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-[#1A1B20] relative overflow-hidden">
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full relative cursor-crosshair"
            style={{
              backgroundImage: showGrid
                ? `radial-gradient(circle, #2A2B30 1px, transparent 1px)`
                : undefined,
              backgroundSize: showGrid ? '20px 20px' : undefined,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left'
            }}
          >
            {/* Canvas Elements */}
            {currentElements.map((element) => (
              <div
                key={element.id}
                onClick={(e) => handleElementClick(element.id, e)}
                className={`absolute cursor-pointer border-2 transition-all ${
                  selectedElement === element.id ? 'border-cyan-400' : 'border-transparent hover:border-cyan-400/50'
                } ${!element.visible ? 'opacity-50' : ''}`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
                  opacity: element.opacity ? element.opacity / 100 : 1,
                  pointerEvents: element.locked ? 'none' : 'auto'
                }}
              >
                {element.type === 'rectangle' && (
                  <div
                    className="w-full h-full rounded-lg"
                    style={{
                      backgroundColor: element.fill,
                      border: element.stroke ? `${element.strokeWidth}px solid ${element.stroke}` : undefined,
                    }}
                  />
                )}
                {element.type === 'circle' && (
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: element.fill,
                      border: element.stroke ? `${element.strokeWidth}px solid ${element.stroke}` : undefined,
                    }}
                  />
                )}
                {element.type === 'text' && (
                  <div
                    className="w-full h-full flex items-center p-2"
                    style={{
                      color: element.fill,
                      fontSize: element.fontSize,
                      fontWeight: element.fontWeight,
                      fontFamily: element.fontFamily,
                      textAlign: element.textAlign,
                      justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {element.text}
                  </div>
                )}
                {element.type === 'image' && element.imageUrl && (
                  <img
                    src={element.imageUrl}
                    alt="Canvas element"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Properties Panel */}
        <div className="w-72 bg-[#171822] border-l border-[#2A2B30] flex flex-col">
          <Tabs value={rightPanelTab} onValueChange={(v) => setRightPanelTab(v as any)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-[#1A1B20] rounded-none border-b border-[#2A2B30] h-10">
              <TabsTrigger value="design" className="text-xs h-8">DESIGN</TabsTrigger>
              <TabsTrigger value="prototype" className="text-xs h-8">PROTOTYPE</TabsTrigger>
              <TabsTrigger value="inspect" className="text-xs h-8">INSPECT</TabsTrigger>
            </TabsList>
            
            <TabsContent value="design" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                  {selectedElementData ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-[#F5F6F7] mb-3">Element</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#9CA3AF]">Type</span>
                            <span className="text-xs text-[#F5F6F7] capitalize">{selectedElementData.type}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-[#9CA3AF] block mb-1">W</label>
                              <Input
                                type="number"
                                value={selectedElementData.width}
                                onChange={(e) => updateElementProperty(selectedElement!, 'width', parseInt(e.target.value))}
                                className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-[#9CA3AF] block mb-1">H</label>
                              <Input
                                type="number"
                                value={selectedElementData.height}
                                onChange={(e) => updateElementProperty(selectedElement!, 'height', parseInt(e.target.value))}
                                className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-[#9CA3AF] block mb-1">X</label>
                              <Input
                                type="number"
                                value={selectedElementData.x}
                                onChange={(e) => updateElementProperty(selectedElement!, 'x', parseInt(e.target.value))}
                                className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-[#9CA3AF] block mb-1">Y</label>
                              <Input
                                type="number"
                                value={selectedElementData.y}
                                onChange={(e) => updateElementProperty(selectedElement!, 'y', parseInt(e.target.value))}
                                className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#2A2B30]" />

                      <div>
                        <h3 className="text-sm font-medium text-[#F5F6F7] mb-3">Fill</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded border border-[#3A3B40] cursor-pointer"
                              style={{ backgroundColor: selectedElementData.fill }}
                              onClick={() => {
                                // Color picker could be implemented here
                              }}
                            />
                            <Input
                              type="text"
                              value={selectedElementData.fill}
                              onChange={(e) => updateElementProperty(selectedElement!, 'fill', e.target.value)}
                              className="flex-1 h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-[#9CA3AF] block mb-1">Opacity</label>
                            <Slider
                              value={[selectedElementData.opacity || 100]}
                              onValueChange={(value) => updateElementProperty(selectedElement!, 'opacity', value[0])}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {selectedElementData.type !== 'text' && (
                        <>
                          <Separator className="bg-[#2A2B30]" />
                          <div>
                            <h3 className="text-sm font-medium text-[#F5F6F7] mb-3">Stroke</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 rounded border border-[#3A3B40] cursor-pointer"
                                  style={{ backgroundColor: selectedElementData.stroke }}
                                />
                                <Input
                                  type="text"
                                  value={selectedElementData.stroke}
                                  onChange={(e) => updateElementProperty(selectedElement!, 'stroke', e.target.value)}
                                  className="flex-1 h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-[#9CA3AF] block mb-1">Width</label>
                                <Input
                                  type="number"
                                  value={selectedElementData.strokeWidth}
                                  onChange={(e) => updateElementProperty(selectedElement!, 'strokeWidth', parseInt(e.target.value))}
                                  className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedElementData.type === 'text' && (
                        <>
                          <Separator className="bg-[#2A2B30]" />
                          <div>
                            <h3 className="text-sm font-medium text-[#F5F6F7] mb-3">Typography</h3>
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs text-[#9CA3AF] block mb-1">Text</label>
                                <Input
                                  type="text"
                                  value={selectedElementData.text}
                                  onChange={(e) => updateElementProperty(selectedElement!, 'text', e.target.value)}
                                  className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-[#9CA3AF] block mb-1">Font Size</label>
                                <Input
                                  type="number"
                                  value={selectedElementData.fontSize}
                                  onChange={(e) => updateElementProperty(selectedElement!, 'fontSize', parseInt(e.target.value))}
                                  className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-[#9CA3AF] block mb-1">Font Weight</label>
                                <Select 
                                  value={selectedElementData.fontWeight} 
                                  onValueChange={(value) => updateElementProperty(selectedElement!, 'fontWeight', value)}
                                >
                                  <SelectTrigger className="h-8 text-xs bg-[#1A1B20] border-[#2A2B30]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="bold">Bold</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-1">
                                <Button 
                                  variant={selectedElementData.textAlign === 'left' ? 'default' : 'ghost'} 
                                  size="sm" 
                                  onClick={() => updateElementProperty(selectedElement!, 'textAlign', 'left')}
                                  className="flex-1 h-8"
                                >
                                  <AlignLeft className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant={selectedElementData.textAlign === 'center' ? 'default' : 'ghost'} 
                                  size="sm" 
                                  onClick={() => updateElementProperty(selectedElement!, 'textAlign', 'center')}
                                  className="flex-1 h-8"
                                >
                                  <AlignCenter className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant={selectedElementData.textAlign === 'right' ? 'default' : 'ghost'} 
                                  size="sm" 
                                  onClick={() => updateElementProperty(selectedElement!, 'textAlign', 'right')}
                                  className="flex-1 h-8"
                                >
                                  <AlignRight className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-sm text-[#6B7280] mb-2">No element selected</div>
                      <div className="text-xs text-[#6B7280]">Select an element to edit properties</div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="prototype" className="flex-1 m-0 p-4">
              <div className="text-center py-8">
                <div className="text-sm text-[#6B7280] mb-2">Prototype Mode</div>
                <div className="text-xs text-[#6B7280]">Add interactions between elements</div>
              </div>
            </TabsContent>
            
            <TabsContent value="inspect" className="flex-1 m-0 p-4">
              <div className="text-center py-8">
                <div className="text-sm text-[#6B7280] mb-2">Inspect Mode</div>
                <div className="text-xs text-[#6B7280]">View element specifications</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}