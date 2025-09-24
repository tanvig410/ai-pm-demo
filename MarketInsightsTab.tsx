import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, Globe, Calendar, ArrowRight, X, Plus, Loader2, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

// Enhanced US Map Component with dark theme
function EnhancedUSMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const stateData: Record<string, { name: string; searchInterest: number }> = {
    'california': { name: 'California', searchInterest: 85 },
    'texas': { name: 'Texas', searchInterest: 72 },
    'florida': { name: 'Florida', searchInterest: 68 },
    'new-york': { name: 'New York', searchInterest: 91 },
    'illinois': { name: 'Illinois', searchInterest: 55 },
    'pennsylvania': { name: 'Pennsylvania', searchInterest: 64 },
    'ohio': { name: 'Ohio', searchInterest: 48 },
    'georgia': { name: 'Georgia', searchInterest: 59 },
    'north-carolina': { name: 'North Carolina', searchInterest: 52 },
    'michigan': { name: 'Michigan', searchInterest: 45 },
    'washington': { name: 'Washington', searchInterest: 78 },
    'arizona': { name: 'Arizona', searchInterest: 61 },
    'massachusetts': { name: 'Massachusetts', searchInterest: 88 },
    'colorado': { name: 'Colorado', searchInterest: 71 },
    'oregon': { name: 'Oregon', searchInterest: 69 },
    'virginia': { name: 'Virginia', searchInterest: 57 },
    'nevada': { name: 'Nevada', searchInterest: 74 },
    'tennessee': { name: 'Tennessee', searchInterest: 49 },
    'maryland': { name: 'Maryland', searchInterest: 82 },
    'minnesota': { name: 'Minnesota', searchInterest: 53 }
  };

  const getStateColor = (searchInterest: number) => {
    if (searchInterest >= 80) return '#10B981'; // High interest - Green
    if (searchInterest >= 60) return '#F59E0B'; // Medium-high interest - Orange  
    if (searchInterest >= 40) return '#EF4444'; // Medium interest - Red
    return '#6B7280'; // Low interest - Gray
  };

  const handleMouseMove = (e: React.MouseEvent, stateKey: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredState(stateKey);
  };

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
        <svg viewBox="0 0 800 500" className="w-full h-80">
          {/* California */}
          <path
            d="M 80 150 L 50 180 L 45 220 L 50 260 L 60 300 L 75 340 L 95 370 L 120 385 L 140 380 L 155 370 L 165 350 L 160 330 L 150 310 L 145 290 L 140 270 L 135 250 L 130 230 L 125 210 L 120 190 L 115 170 L 100 155 Z"
            fill={getStateColor(stateData.california.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'california')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Texas */}
          <path
            d="M 280 220 L 380 225 L 385 240 L 390 255 L 395 270 L 400 285 L 405 300 L 410 315 L 415 330 L 420 345 L 415 360 L 405 370 L 390 375 L 375 380 L 360 375 L 345 370 L 330 365 L 315 360 L 300 355 L 285 350 L 275 340 L 270 325 L 275 310 L 280 295 L 285 280 L 290 265 L 295 250 Z"
            fill={getStateColor(stateData.texas.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'texas')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Florida */}
          <path
            d="M 480 300 L 520 305 L 560 315 L 580 325 L 590 340 L 595 355 L 590 370 L 580 385 L 565 395 L 545 400 L 525 395 L 510 385 L 500 370 L 495 355 L 490 340 L 485 325 L 480 315 Z"
            fill={getStateColor(stateData.florida.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'florida')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* New York */}
          <path
            d="M 580 120 L 620 125 L 630 140 L 635 155 L 630 170 L 620 180 L 605 185 L 590 180 L 580 170 L 575 155 L 580 140 Z"
            fill={getStateColor(stateData['new-york'].searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'new-york')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Washington State */}
          <path
            d="M 80 80 L 130 85 L 135 100 L 140 115 L 135 130 L 125 140 L 110 145 L 95 140 L 85 125 L 80 110 L 75 95 Z"
            fill={getStateColor(stateData.washington.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'washington')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Oregon */}
          <path
            d="M 60 120 L 115 125 L 120 140 L 125 155 L 120 170 L 110 180 L 95 185 L 80 180 L 70 165 L 65 150 L 60 135 Z"
            fill={getStateColor(stateData.oregon.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'oregon')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Nevada */}
          <path
            d="M 120 180 L 155 185 L 160 200 L 165 215 L 160 230 L 150 240 L 135 245 L 120 240 L 115 225 L 115 210 L 115 195 Z"
            fill={getStateColor(stateData.nevada.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'nevada')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Arizona */}
          <path
            d="M 180 240 L 220 245 L 225 260 L 230 275 L 225 290 L 215 300 L 200 305 L 185 300 L 175 285 L 175 270 L 175 255 Z"
            fill={getStateColor(stateData.arizona.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'arizona')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Colorado */}
          <path
            d="M 260 180 L 300 185 L 305 200 L 310 215 L 305 230 L 295 240 L 280 245 L 265 240 L 260 225 L 260 210 L 260 195 Z"
            fill={getStateColor(stateData.colorado.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'colorado')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Illinois */}
          <path
            d="M 380 160 L 415 165 L 420 180 L 425 195 L 420 210 L 410 220 L 395 225 L 380 220 L 375 205 L 375 190 L 375 175 Z"
            fill={getStateColor(stateData.illinois.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'illinois')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Ohio */}
          <path
            d="M 460 160 L 495 165 L 500 180 L 505 195 L 500 210 L 490 220 L 475 225 L 460 220 L 455 205 L 455 190 L 455 175 Z"
            fill={getStateColor(stateData.ohio.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'ohio')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Pennsylvania */}
          <path
            d="M 500 140 L 535 145 L 540 160 L 545 175 L 540 190 L 530 200 L 515 205 L 500 200 L 495 185 L 495 170 L 495 155 Z"
            fill={getStateColor(stateData.pennsylvania.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'pennsylvania')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Georgia */}
          <path
            d="M 460 260 L 495 265 L 500 280 L 505 295 L 500 310 L 490 320 L 475 325 L 460 320 L 455 305 L 455 290 L 455 275 Z"
            fill={getStateColor(stateData.georgia.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'georgia')}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Massachusetts */}
          <path
            d="M 540 110 L 570 115 L 575 125 L 580 135 L 575 145 L 565 150 L 550 155 L 540 150 L 535 140 L 535 130 L 535 120 Z"
            fill={getStateColor(stateData.massachusetts.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'massachusetts')}
            onMouseLeave={() => setHoveredState(null)}
          />
        </svg>
      </div>
      
      {/* Tooltip */}
      {hoveredState && (
        <div 
          className="absolute bg-[#1C1D20] border border-[#2A2B30] rounded-lg p-3 shadow-lg z-20 pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-[14px] font-medium text-[#F5F6F7] mb-1">
            {stateData[hoveredState].name}
          </div>
          <div className="text-[12px] text-[#9CA3AF]">
            Search Interest: <span className="font-medium text-[#10B981]">{stateData[hoveredState].searchInterest}</span>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-[12px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10B981' }}></div>
          <span className="text-[#9CA3AF]">High Interest (80+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
          <span className="text-[#9CA3AF]">Medium-High (60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#EF4444' }}></div>
          <span className="text-[#9CA3AF]">Medium (40-59)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#6B7280' }}></div>
          <span className="text-[#9CA3AF]">Low (&lt;40)</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced EU Map Component with dark theme
function EnhancedEUMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const countryData: Record<string, { name: string; searchInterest: number }> = {
    'germany': { name: 'Germany', searchInterest: 76 },
    'france': { name: 'France', searchInterest: 68 },
    'italy': { name: 'Italy', searchInterest: 72 },
    'spain': { name: 'Spain', searchInterest: 65 },
    'netherlands': { name: 'Netherlands', searchInterest: 82 },
    'poland': { name: 'Poland', searchInterest: 58 },
    'sweden': { name: 'Sweden', searchInterest: 71 },
    'norway': { name: 'Norway', searchInterest: 74 },
    'finland': { name: 'Finland', searchInterest: 67 },
    'denmark': { name: 'Denmark', searchInterest: 79 }
  };

  const getCountryColor = (searchInterest: number) => {
    if (searchInterest >= 80) return '#10B981'; // High interest - Green
    if (searchInterest >= 60) return '#F59E0B'; // Medium-high interest - Orange
    if (searchInterest >= 40) return '#EF4444'; // Medium interest - Red
    return '#6B7280'; // Low interest - Gray
  };

  const handleMouseMove = (e: React.MouseEvent, countryKey: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredCountry(countryKey);
  };

  return (
    <div className="relative w-full">
      <div className="relative bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
        <svg viewBox="0 0 600 400" className="w-full h-80">
          {/* Germany */}
          <path
            d="M 250 150 L 320 160 L 330 180 L 335 200 L 330 220 L 320 235 L 300 240 L 280 235 L 260 230 L 245 220 L 240 200 L 240 180 L 245 165 Z"
            fill={getCountryColor(countryData.germany.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'germany')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* France */}
          <path
            d="M 150 180 L 240 190 L 250 210 L 255 230 L 250 250 L 240 270 L 220 280 L 200 275 L 180 270 L 160 265 L 145 250 L 140 230 L 140 210 L 145 195 Z"
            fill={getCountryColor(countryData.france.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'france')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Italy */}
          <path
            d="M 280 240 L 320 250 L 330 270 L 335 290 L 330 310 L 320 330 L 310 345 L 300 355 L 285 350 L 275 335 L 270 320 L 270 305 L 270 290 L 275 275 L 280 260 Z"
            fill={getCountryColor(countryData.italy.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'italy')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Spain */}
          <path
            d="M 80 250 L 150 260 L 160 280 L 165 300 L 160 320 L 150 335 L 130 340 L 110 335 L 95 320 L 85 300 L 80 280 L 75 265 Z"
            fill={getCountryColor(countryData.spain.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'spain')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Netherlands */}
          <path
            d="M 220 120 L 260 130 L 270 145 L 275 160 L 270 175 L 260 185 L 245 190 L 230 185 L 220 170 L 215 155 L 215 140 Z"
            fill={getCountryColor(countryData.netherlands.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'netherlands')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Poland */}
          <path
            d="M 350 140 L 420 150 L 430 170 L 435 190 L 430 210 L 420 225 L 400 230 L 380 225 L 360 220 L 345 210 L 340 190 L 340 170 L 345 155 Z"
            fill={getCountryColor(countryData.poland.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'poland')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Sweden */}
          <path
            d="M 280 60 L 320 70 L 330 90 L 335 110 L 330 130 L 320 145 L 305 150 L 290 145 L 280 130 L 275 110 L 275 90 L 275 75 Z"
            fill={getCountryColor(countryData.sweden.searchInterest)}
            stroke="#3A3B40"
            strokeWidth="1"
            className="cursor-pointer transition-all duration-200 hover:stroke-[#F5F6F7] hover:stroke-2"
            onMouseMove={(e) => handleMouseMove(e, 'sweden')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
        </svg>
      </div>
      
      {/* Tooltip */}
      {hoveredCountry && (
        <div 
          className="absolute bg-[#1C1D20] border border-[#2A2B30] rounded-lg p-3 shadow-lg z-20 pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-[14px] font-medium text-[#F5F6F7] mb-1">
            {countryData[hoveredCountry].name}
          </div>
          <div className="text-[12px] text-[#9CA3AF]">
            Search Interest: <span className="font-medium text-[#10B981]">{countryData[hoveredCountry].searchInterest}</span>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-[12px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10B981' }}></div>
          <span className="text-[#9CA3AF]">High Interest (80+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
          <span className="text-[#9CA3AF]">Medium-High (60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#EF4444' }}></div>
          <span className="text-[#9CA3AF]">Medium (40-59)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#6B7280' }}></div>
          <span className="text-[#9CA3AF]">Low (&lt;40)</span>
        </div>
      </div>
    </div>
  );
}

interface InsightPanelProps {
  insight: any;
  onClose: () => void;
}

function InsightPanel({ insight, onClose }: InsightPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  const generateDetailedData = () => {
    switch (insight.type) {
      case 'pricing':
        return {
          overview: {
            title: 'Pricing Analysis Deep Dive',
            data: [
              { segment: 'Premium ($200+)', products: 342, avgPrice: '$285', growth: '+12.3%' },
              { segment: 'Mid-Range ($100-199)', products: 1247, avgPrice: '$149', growth: '+8.7%' },
              { segment: 'Budget (<$100)', products: 2891, avgPrice: '$67', growth: '+4.2%' },
              { segment: 'Luxury ($500+)', products: 89, avgPrice: '$750', growth: '+18.9%' }
            ]
          },
          trends: {
            title: 'Price Trend Analysis',
            data: [
              { month: 'Jan', premium: 245, midRange: 135, budget: 55 },
              { month: 'Feb', premium: 267, midRange: 142, budget: 58 },
              { month: 'Mar', premium: 285, midRange: 149, budget: 62 },
              { month: 'Apr', premium: 298, midRange: 156, budget: 65 },
              { month: 'May', premium: 312, midRange: 163, budget: 67 },
              { month: 'Jun', premium: 285, midRange: 149, budget: 67 }
            ]
          },
          competitors: [
            { brand: 'Nike', avgPrice: '$125', marketShare: '23%', priceChange: '+5.2%' },
            { brand: 'Adidas', avgPrice: '$118', marketShare: '19%', priceChange: '+3.8%' },
            { brand: 'Puma', avgPrice: '$89', marketShare: '12%', priceChange: '+7.1%' },
            { brand: 'New Balance', avgPrice: '$156', marketShare: '8%', priceChange: '+12.4%' }
          ]
        };
      case 'market':
        return {
          overview: {
            title: 'Market Analysis Overview',
            segments: [
              { name: 'Women\'s Activewear', value: 35, growth: '+15.2%' },
              { name: 'Men\'s Streetwear', value: 28, growth: '+8.7%' },
              { name: 'Athleisure', value: 22, growth: '+22.1%' },
              { name: 'Sustainable Fashion', value: 15, growth: '+45.3%' }
            ]
          },
          geographic: [
            { region: 'North America', share: '42%', growth: '+8.5%' },
            { region: 'Europe', share: '28%', growth: '+12.3%' },
            { region: 'Asia Pacific', share: '25%', growth: '+18.7%' },
            { region: 'Others', share: '5%', growth: '+6.2%' }
          ]
        };
      default:
        return insight.details || {};
    }
  };

  const detailedData = generateDetailedData();

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
      <div className="bg-[#1C1D20] rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col border border-[#2A2B30]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B30]">
          <div>
            <h2 className="text-[20px] font-medium text-[#F5F6F7]">{insight.title}</h2>
            <p className="text-[14px] text-[#9CA3AF] mt-1">{insight.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2B30] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 p-6 border-b border-[#2A2B30]">
          {['overview', 'trends', 'competitors', 'geographic'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors capitalize ${
                activeSubTab === tab
                  ? 'bg-[#F5F6F7] text-[#0E0E11]'
                  : 'text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-[18px] font-medium text-[#F5F6F7]">
                {detailedData.overview?.title || 'Overview Analysis'}
              </h3>
              
              {insight.type === 'pricing' && detailedData.overview?.data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedData.overview.data.map((item: any, index: number) => (
                    <div key={index} className="bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
                      <h4 className="text-[16px] font-medium text-[#F5F6F7] mb-4">{item.segment}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[14px] text-[#9CA3AF]">Products</span>
                          <span className="text-[14px] text-[#F5F6F7]">{item.products}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[14px] text-[#9CA3AF]">Avg Price</span>
                          <span className="text-[14px] text-[#F5F6F7]">{item.avgPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[14px] text-[#9CA3AF]">Growth</span>
                          <span className="text-[14px] text-green-400">{item.growth}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {insight.type === 'market' && detailedData.overview?.segments && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
                    <h4 className="text-[16px] font-medium text-[#F5F6F7] mb-4">Market Segments</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <RechartsPieChart data={detailedData.overview.segments}>
                          {detailedData.overview.segments.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={['#10B981', '#F59E0B', '#EF4444', '#9333EA'][index % 4]} />
                          ))}
                        </RechartsPieChart>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1C1D20', 
                            border: '1px solid #2A2B30',
                            borderRadius: '8px',
                            color: '#F5F6F7'
                          }} 
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {detailedData.overview.segments.map((segment: any, index: number) => (
                      <div key={index} className="bg-[#2A2B30] rounded-lg p-4 border border-[#3A3B40]">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] font-medium text-[#F5F6F7]">{segment.name}</span>
                          <span className="text-[14px] text-green-400">{segment.growth}</span>
                        </div>
                        <div className="text-[12px] text-[#9CA3AF] mt-1">Market Share: {segment.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'trends' && detailedData.trends && (
            <div className="space-y-6">
              <h3 className="text-[18px] font-medium text-[#F5F6F7]">{detailedData.trends.title}</h3>
              <div className="bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={detailedData.trends.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3B40" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1C1D20', 
                        border: '1px solid #2A2B30',
                        borderRadius: '8px',
                        color: '#F5F6F7'
                      }} 
                    />
                    <Line type="monotone" dataKey="premium" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="midRange" stroke="#F59E0B" strokeWidth={2} />
                    <Line type="monotone" dataKey="budget" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeSubTab === 'competitors' && detailedData.competitors && (
            <div className="space-y-6">
              <h3 className="text-[18px] font-medium text-[#F5F6F7]">Competitor Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedData.competitors.map((competitor: any, index: number) => (
                  <div key={index} className="bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
                    <h4 className="text-[16px] font-medium text-[#F5F6F7] mb-4">{competitor.brand}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#9CA3AF]">Avg Price</span>
                        <span className="text-[14px] text-[#F5F6F7]">{competitor.avgPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#9CA3AF]">Market Share</span>
                        <span className="text-[14px] text-[#F5F6F7]">{competitor.marketShare}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#9CA3AF]">Price Change</span>
                        <span className="text-[14px] text-green-400">{competitor.priceChange}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'geographic' && (
            <div className="space-y-6">
              {/* Map View Header */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-[24px] font-medium text-[#F5F6F7] mb-2">Geographic Distribution</h3>
                  <p className="text-[14px] text-[#9CA3AF] mb-4">
                    Compare between different regions of the world where <span className="font-medium text-[#F5F6F7]">Barrel Jeans</span> got the most search interest.
                  </p>
                </div>
                
                {/* Region Selector */}
                <div className="w-48">
                  <RegionSelector />
                </div>
              </div>
              
              {/* Maps Container */}
              <div className="space-y-8">
                {/* US Map */}
                <div>
                  <h4 className="text-[18px] font-medium text-[#F5F6F7] mb-4">United States</h4>
                  <EnhancedUSMap />
                </div>
                
                {/* EU Map */}
                <div>
                  <h4 className="text-[18px] font-medium text-[#F5F6F7] mb-4">European Union</h4>
                  <EnhancedEUMap />
                </div>
              </div>

              {/* Regional Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {detailedData.geographic && detailedData.geographic.map((region: any, index: number) => (
                  <div key={index} className="bg-[#2A2B30] rounded-lg p-6 border border-[#3A3B40]">
                    <h4 className="text-[16px] font-medium text-[#F5F6F7] mb-4">{region.region}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#9CA3AF]">Market Share</span>
                        <span className="text-[14px] text-[#F5F6F7]">{region.share}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[14px] text-[#9CA3AF]">Growth Rate</span>
                        <span className="text-[14px] text-green-400">{region.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Region Selector Component with dark theme
function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState('United States');
  const [isOpen, setIsOpen] = useState(false);
  
  const regions = [
    'United States',
    'European Union',
    'Asia Pacific',
    'Latin America',
    'Middle East & Africa'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-2 text-left text-[14px] text-[#F5F6F7] hover:border-[#F5F6F7] transition-colors flex items-center justify-between"
      >
        <span>{selectedRegion}</span>
        <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1D20] border border-[#2A2B30] rounded-lg shadow-lg z-10">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => {
                setSelectedRegion(region);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-[14px] hover:bg-[#2A2B30] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                selectedRegion === region ? 'bg-[#2A2B30] text-[#F5F6F7]' : 'text-[#9CA3AF]'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface MarketInsightsTabProps {
  hideForm?: boolean;
  appliedFilters?: any;
}

export function MarketInsightsTab({ hideForm = false, appliedFilters }: MarketInsightsTabProps) {
  const [formData, setFormData] = useState({
    gender: '',
    category: '',
    subcategory: '',
    style: '',
    weblinks: ['']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<any[]>(hideForm ? mockInsights : []); // If hideForm is true, show results immediately
  const [selectedInsight, setSelectedInsight] = useState<any>(null);

  // Mock insights data - restored colorful chart data
  const mockInsights = [
    {
      id: '1',
      type: 'pricing',
      title: 'Pricing Analysis',
      description: 'Comprehensive price point analysis across market segments',
      value: '$125',
      trend: '+12.3%',
      trendUp: true,
      chart: {
        type: 'bar',
        data: [
          { name: 'Budget', value: 2891, fill: '#10B981' },
          { name: 'Mid-Range', value: 1247, fill: '#F59E0B' },
          { name: 'Premium', value: 342, fill: '#EF4444' },
          { name: 'Luxury', value: 89, fill: '#9333EA' }
        ]
      }
    },
    {
      id: '2',
      type: 'market',
      title: 'Market Segments',
      description: 'Product distribution across different market categories',
      value: '4,569',
      trend: '+8.7%',
      trendUp: true,
      chart: {
        type: 'pie',
        data: [
          { name: 'Casual Wear', value: 35, fill: '#10B981' },
          { name: 'Activewear', value: 28, fill: '#F59E0B' },
          { name: 'Formal', value: 22, fill: '#EF4444' },
          { name: 'Streetwear', value: 15, fill: '#9333EA' }
        ]
      }
    },
    {
      id: '3',
      type: 'brands',
      title: 'Top Brands',
      description: 'Leading brands by market presence and performance',
      value: '156',
      trend: '+15.4%',
      trendUp: true,
      chart: {
        type: 'line',
        data: [
          { month: 'Jan', nike: 245, adidas: 189, puma: 123 },
          { month: 'Feb', nike: 267, adidas: 198, puma: 134 },
          { month: 'Mar', nike: 285, adidas: 210, puma: 145 },
          { month: 'Apr', nike: 298, adidas: 223, puma: 156 },
          { month: 'May', nike: 312, adidas: 234, puma: 167 },
          { month: 'Jun', nike: 325, adidas: 245, puma: 178 }
        ]
      }
    },
    {
      id: '4',
      type: 'trends',
      title: 'Trend Analysis',
      description: 'Emerging patterns and seasonal variations',
      value: '23',
      trend: '+45.2%',
      trendUp: true,
      chart: {
        type: 'area',
        data: [
          { month: 'Jan', sustainable: 15, athleisure: 32, vintage: 8 },
          { month: 'Feb', sustainable: 18, athleisure: 35, vintage: 12 },
          { month: 'Mar', sustainable: 22, athleisure: 38, vintage: 15 },
          { month: 'Apr', sustainable: 28, athleisure: 42, vintage: 18 },
          { month: 'May', sustainable: 35, athleisure: 45, vintage: 22 },
          { month: 'Jun', sustainable: 42, athleisure: 48, vintage: 25 }
        ]
      }
    }
  ];

  const genderOptions = ['Ladies', 'Men\'s', 'Girls', 'Boys', 'Baby', 'Unisex'];
  const categoryOptions = ['Casual Wear', 'Outerwear', 'Formal Wear', 'Swimwear', 'Activewear', 'Loungewear'];
  const subcategoryOptions = ['T-Shirts', 'Jeans', 'Hoodies', 'Sneakers', 'Dresses', 'Jackets', 'Accessories'];
  const styleOptions = ['Strappy', 'Tank', 'Blouse', 'Fitted', 'Oversized', 'Cropped', 'High-waisted'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWeblinkChange = (index: number, value: string) => {
    const newWeblinks = [...formData.weblinks];
    newWeblinks[index] = value;
    setFormData(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const addWeblink = () => {
    setFormData(prev => ({ ...prev, weblinks: [...prev.weblinks, ''] }));
  };

  const removeWeblink = (index: number) => {
    const newWeblinks = formData.weblinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, weblinks: newWeblinks }));
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInsights(mockInsights);
      setIsLoading(false);
    }, 2000);
  };

  const renderChart = (insight: any) => {
    const { chart } = insight;
    
    if (!chart) return null;

    switch (chart.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3B40" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C1D20', 
                  border: '1px solid #2A2B30',
                  borderRadius: '8px',
                  color: '#F5F6F7'
                }} 
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chart.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <RechartsPieChart data={chart.data}>
                {chart.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RechartsPieChart>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C1D20', 
                  border: '1px solid #2A2B30',
                  borderRadius: '8px',
                  color: '#F5F6F7'
                }} 
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3B40" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C1D20', 
                  border: '1px solid #2A2B30',
                  borderRadius: '8px',
                  color: '#F5F6F7'
                }} 
              />
              <Line type="monotone" dataKey="nike" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="adidas" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="puma" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3B40" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C1D20', 
                  border: '1px solid #2A2B30',
                  borderRadius: '8px',
                  color: '#F5F6F7'
                }} 
              />
              <Area type="monotone" dataKey="sustainable" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="athleisure" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="vintage" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-20">
      {/* Input Form - Hidden when hideForm is true */}
      {!hideForm && (
        <div className="mb-16 px-6">
        <div className="bg-[#1C1D20] rounded-lg p-6 border border-[#2A2B30]">
          <h2 className="text-[18px] font-medium text-[#F5F6F7] mb-6">Analysis Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Gender/Department */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Gender/Department</label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Subcategory */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Subcategory</label>
              <div className="relative">
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Subcategory</option>
                  {subcategoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Style</label>
              <div className="relative">
                <select
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                  className="w-full bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 pr-8 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#F5F6F7] appearance-none cursor-pointer"
                >
                  <option value="">Select Style</option>
                  {styleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Weblinks */}
          <div className="mb-6">
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Reference Weblinks</label>
            <div className="space-y-3">
              {formData.weblinks.map((link, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleWeblinkChange(index, e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 bg-[#2A2B30] border border-[#2A2B30] rounded-lg px-3 py-2 text-[14px] text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#F5F6F7]"
                  />
                  {formData.weblinks.length > 1 && (
                    <button
                      onClick={() => removeWeblink(index)}
                      className="p-2 text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addWeblink}
              className="mt-3 flex items-center gap-2 text-[#F5F6F7] hover:text-[#9CA3AF] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[14px]">Add another weblink</span>
            </button>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-[#F5F6F7] text-[#0E0E11] px-6 py-3 rounded-lg font-medium hover:bg-[#E5E6E7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  Analyze Market
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Results - Always show when hideForm is true, or when insights are available */}
      {(hideForm || insights.length > 0) && (
        <div className="mb-16 px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[20px] font-medium text-[#F5F6F7]">Market Insights</h2>
            <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
              <Calendar className="w-4 h-4" />
              <span>Updated 5 minutes ago</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => setSelectedInsight(insight)}
                className="bg-[#1C1D20] rounded-lg p-6 border border-[#2A2B30] hover:border-[#F5F6F7] transition-all duration-200 cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {insight.type === 'pricing' && <Target className="w-5 h-5 text-[#10B981]" />}
                    {insight.type === 'market' && <PieChart className="w-5 h-5 text-[#F59E0B]" />}
                    {insight.type === 'brands' && <Globe className="w-5 h-5 text-[#EF4444]" />}
                    {insight.type === 'trends' && <TrendingUp className="w-5 h-5 text-[#9333EA]" />}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#F5F6F7] transition-colors" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">{insight.title}</h3>
                  <p className="text-[12px] text-[#9CA3AF] mb-4">{insight.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[18px] font-medium text-[#F5F6F7]">{insight.value}</span>
                    <div className={`flex items-center gap-1 ${
                      insight.trendUp ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {insight.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-[12px]">{insight.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-48">
                  {renderChart(insight)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deep Insight Panel */}
      {selectedInsight && (
        <InsightPanel
          insight={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}
    </div>
  );
}