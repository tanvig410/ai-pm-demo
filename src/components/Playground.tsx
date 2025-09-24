import { useState } from 'react';
import { 
  Plus, 
  Image, 
  Layers, 
  Type, 
  Brush, 
  Move3D, 
  Zap,
  HelpCircle,
  Filter,
  Paperclip
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PromptSuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isSelected?: boolean;
}

type PlaygroundState = 'selection' | 'loading' | 'results';

export function Playground() {
  const [playgroundState, setPlaygroundState] = useState<PlaygroundState>('selection');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptSuggestion | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const [prompts] = useState<PromptSuggestion[]>([
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
      title: 'Generate Moodboard/Presentation',
      description: 'Create visual moodboards and presentation materials for design concepts',
      imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: '4',
      title: 'Generate techpack',
      description: 'Create comprehensive technical specifications and production documents',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop&crop=center'
    }
  ]);

  const handlePromptSelect = (prompt: PromptSuggestion) => {
    setSelectedPrompt(prompt);
  };

  const handleGenerate = () => {
    if (!currentPrompt.trim() && !selectedPrompt) return;
    
    setPlaygroundState('loading');
    // Simulate loading time
    setTimeout(() => {
      setGeneratedImages([
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center'
      ]);
      setPlaygroundState('results');
    }, 3000);
  };

  const handleBackToSelection = () => {
    setPlaygroundState('selection');
    setSelectedPrompt(null);
    setCurrentPrompt('');
    setGeneratedImages([]);
  };

  const sidebarTools = [
    { icon: Plus, label: 'Add', isActive: false },
    { icon: Image, label: 'Image', isActive: false },
    { icon: Layers, label: 'Layers', isActive: true },
    { icon: Type, label: 'Text', isActive: false },
    { icon: Brush, label: 'Brush', isActive: false },
    { icon: Move3D, label: 'Transform', isActive: false },
    { icon: Zap, label: 'Effects', isActive: false },
    { icon: HelpCircle, label: 'Help', isActive: false }
  ];

  // Selection State - Show initial prompt cards with floating prompt box
  if (playgroundState === 'selection') {
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
            {prompts.map((prompt) => (
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
              
              <div className="relative">
                <input
                  type="text"
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className="w-full bg-[#0E0E11] text-[#F5F6F7] placeholder-[#9CA3AF] border border-[#2A2B30] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C2FF] transition-colors pr-44"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="p-1.5 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Filter options">
                    <Filter className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Import/Attach">
                    <Paperclip className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={!currentPrompt.trim() && !selectedPrompt}
                    className="ml-2 px-5 py-2 bg-[#00C2FF] text-[#0E0E11] rounded-lg font-medium hover:bg-[#00A8D6] transition-colors text-sm disabled:bg-[#2A2B30] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    );
  }



  // Loading State
  if (playgroundState === 'loading') {
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

        {/* User Prompts Summary */}
        <div className="absolute top-24 left-6 z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3">
            <ImageWithFallback
              src={selectedPrompt?.imageUrl || ''}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white text-sm mb-2">
            Create a <span className="bg-[#2A2B30] px-2 py-1 rounded">{selectedPrompt?.title.toLowerCase() || 'design'}</span>
          </div>
          <div className="text-[#9CA3AF] text-sm max-w-xs">
            {currentPrompt || 'Generating based on your prompt...'}
          </div>
        </div>

        {/* Loading Grid */}
        <div className="flex items-center justify-center min-h-screen pt-32 pb-48">
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
                  src={selectedPrompt?.imageUrl || ''}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#9CA3AF] text-sm">What do you want to see...</div>
              <div className="flex items-center gap-2 ml-8">
                <button className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors" title="Filter options">
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
      </div>
    );
  }

  // Results State
  if (playgroundState === 'results') {
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

        {/* User Prompts Summary */}
        <div className="absolute top-24 left-6 z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3">
            <ImageWithFallback
              src={selectedPrompt?.imageUrl || ''}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white text-sm mb-2">
            Create a <span className="bg-[#2A2B30] px-2 py-1 rounded">{selectedPrompt?.title.toLowerCase() || 'design'}</span>
          </div>
          <div className="text-[#9CA3AF] text-sm max-w-xs mb-4">
            {currentPrompt || 'Generated based on your prompt'}
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-4">
            <button className="px-3 py-1 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] transition-colors flex items-center gap-2">
              <Plus className="w-3 h-3" />
              Show More
            </button>
            <button className="px-3 py-1 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] transition-colors flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Brainstorm
            </button>
            <button className="px-3 py-1 bg-[#1C1D20] text-[#9CA3AF] rounded-lg text-sm hover:bg-[#2A2B30] transition-colors">
              Reply
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex items-center justify-center min-h-screen pt-32 pb-48">
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            {generatedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative bg-[#1C1D20] overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
                style={{
                  width: '300px',
                  height: '300px'
                }}
              >
                <ImageWithFallback
                  src={imageUrl}
                  alt={`Generated ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
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
                  src={selectedPrompt?.imageUrl || ''}
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
                  className="px-6 py-2 bg-[#00C2FF] text-[#0E0E11] rounded-lg font-medium hover:bg-[#00A8D6] transition-colors text-sm disabled:bg-[#2A2B30] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0E0E11] pointer-events-none" />
      </div>
    );
  }

  return null;
}