import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, BarChart3, PieChart, Target, Globe, Calendar, ArrowRight, X, Plus, Loader2, Filter, ChevronDown, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

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
      <div className="bg-[#1C1D20] rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2B30]">
          <div>
            <h2 className="text-[24px] font-medium text-[#F5F6F7]">{insight.title}</h2>
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
                  ? 'bg-[#00C2FF] text-[#0E0E11]'
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
              <h3 className="text-[20px] font-medium text-[#F5F6F7]">
                {detailedData.overview?.title || 'Overview Analysis'}
              </h3>
              
              {insight.type === 'pricing' && detailedData.overview?.data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedData.overview.data.map((item: any, index: number) => (
                    <div key={index} className="bg-[#2A2B30] rounded-lg p-6">
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
                  <div className="bg-[#2A2B30] rounded-lg p-6">
                    <h4 className="text-[16px] font-medium text-[#F5F6F7] mb-4">Market Segments</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <RechartsPieChart data={detailedData.overview.segments}>
                          {detailedData.overview.segments.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={['#00C2FF', '#10B981', '#F59E0B', '#EF4444'][index % 4]} />
                          ))}
                        </RechartsPieChart>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {detailedData.overview.segments.map((segment: any, index: number) => (
                      <div key={index} className="bg-[#2A2B30] rounded-lg p-4">
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
              <h3 className="text-[20px] font-medium text-[#F5F6F7]">{detailedData.trends.title}</h3>
              <div className="bg-[#2A2B30] rounded-lg p-6">
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
                    <Line type="monotone" dataKey="premium" stroke="#00C2FF" strokeWidth={2} />
                    <Line type="monotone" dataKey="midRange" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="budget" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeSubTab === 'competitors' && detailedData.competitors && (
            <div className="space-y-6">
              <h3 className="text-[20px] font-medium text-[#F5F6F7]">Competitor Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedData.competitors.map((competitor: any, index: number) => (
                  <div key={index} className="bg-[#2A2B30] rounded-lg p-6">
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

          {activeSubTab === 'geographic' && detailedData.geographic && (
            <div className="space-y-6">
              <h3 className="text-[20px] font-medium text-[#F5F6F7]">Geographic Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedData.geographic.map((region: any, index: number) => (
                  <div key={index} className="bg-[#2A2B30] rounded-lg p-6">
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

interface MarketStreamProps {
  productTypeFilter: string;
  onFilterChange: (filter: string) => void;
}

function MarketStream({ productTypeFilter, onFilterChange }: MarketStreamProps) {
  const [showMore, setShowMore] = useState(false);

  // Mock market stream data
  const marketProducts = [
    {
      id: 'product-1',
      name: 'Classic White Sneakers',
      brand: 'Nike',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      mrp: 129.99,
      discountedPrice: 99.99,
      stockoutPercentage: 15,
      productType: 'Footwear'
    },
    {
      id: 'product-2',
      name: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
      mrp: 89.99,
      discountedPrice: null,
      stockoutPercentage: 8,
      productType: 'Outerwear'
    },
    {
      id: 'product-3',
      name: 'Athletic Performance Tee',
      brand: 'Adidas',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
      mrp: 45.99,
      discountedPrice: 35.99,
      stockoutPercentage: 3,
      productType: 'Activewear'
    },
    {
      id: 'product-4',
      name: 'Casual Cotton Hoodie',
      brand: 'Champion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      mrp: 69.99,
      discountedPrice: 54.99,
      stockoutPercentage: 22,
      productType: 'Casual'
    },
    {
      id: 'product-5',
      name: 'Designer Handbag',
      brand: 'Michael Kors',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      mrp: 299.99,
      discountedPrice: 249.99,
      stockoutPercentage: 35,
      productType: 'Accessories'
    },
    {
      id: 'product-6',
      name: 'Formal Dress Shirt',
      brand: 'Hugo Boss',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
      mrp: 149.99,
      discountedPrice: null,
      stockoutPercentage: 12,
      productType: 'Formal'
    },
    {
      id: 'product-7',
      name: 'Wool Blend Coat',
      brand: 'Zara',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop',
      mrp: 199.99,
      discountedPrice: 159.99,
      stockoutPercentage: 28,
      productType: 'Outerwear'
    },
    {
      id: 'product-8',
      name: 'Running Shorts',
      brand: 'Under Armour',
      image: 'https://images.unsplash.com/photo-1506629905607-84d4cc8c7a20?q=80&w=1000&auto=format&fit=crop',
      mrp: 39.99,
      discountedPrice: 29.99,
      stockoutPercentage: 5,
      productType: 'Activewear'
    },
    // Additional products for "View More" functionality
    {
      id: 'product-9',
      name: 'Leather Boots',
      brand: 'Dr. Martens',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d57?q=80&w=1000&auto=format&fit=crop',
      mrp: 179.99,
      discountedPrice: null,
      stockoutPercentage: 18,
      productType: 'Footwear'
    },
    {
      id: 'product-10',
      name: 'Silk Blouse',
      brand: 'Ann Taylor',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
      mrp: 89.99,
      discountedPrice: 67.99,
      stockoutPercentage: 14,
      productType: 'Formal'
    }
  ];

  const productTypes = ['All Products', 'Footwear', 'Outerwear', 'Activewear', 'Casual', 'Accessories', 'Formal'];
  
  const filteredProducts = productTypeFilter === 'All Products' 
    ? marketProducts 
    : marketProducts.filter(product => product.productType === productTypeFilter);

  const visibleProducts = showMore ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-medium text-[#F5F6F7]">Market Stream</h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">Real-time product data from across the web</p>
        </div>
        
        {/* Product Type Filter */}
        <div className="relative">
          <select
            value={productTypeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-2 pr-10 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#00C2FF] appearance-none cursor-pointer"
          >
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        </div>
      </div>

      {/* Products Grid - 2 Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ gridTemplateRows: showMore ? 'auto' : 'repeat(2, 1fr)' }}>
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#1C1D20] overflow-hidden group cursor-pointer transition-all duration-200 hover:bg-[#2A2B30]"
          >
            {/* Image Container */}
            <div className="relative w-full bg-[#2A2B30] overflow-hidden" style={{ height: '320px' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop';
                }}
              />
              
              {/* Stockout Badge */}
              {product.stockoutPercentage > 20 && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-medium">
                    {product.stockoutPercentage}% Stock Out
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-[#F5F6F7] text-[#0E0E11] px-4 py-2 rounded-full text-[12px] font-medium hover:bg-[#E5E6E7] transition-colors flex items-center gap-2">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-[14px] font-medium text-[#F5F6F7] mb-1">{product.name}</h3>
                <p className="text-[12px] text-[#9CA3AF]">{product.brand}</p>
              </div>
              
              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {product.discountedPrice ? (
                    <>
                      <span className="text-[14px] font-medium text-[#F5F6F7]">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-[12px] text-[#9CA3AF] line-through">
                        ${product.mrp}
                      </span>
                    </>
                  ) : (
                    <span className="text-[14px] font-medium text-[#F5F6F7]">
                      ${product.mrp}
                    </span>
                  )}
                </div>
                
                {/* Stockout Percentage */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9CA3AF]">
                    Stockout: {product.stockoutPercentage}%
                  </span>
                  <span className="text-[10px] text-[#9CA3AF]">
                    {product.productType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {filteredProducts.length > 8 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-[#2A2B30] hover:bg-[#3A3B40] text-[#F5F6F7] px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {showMore ? 'Show Less' : `View More (${filteredProducts.length - 8} more products)`}
            <ArrowRight className={`w-4 h-4 transition-transform ${showMore ? 'rotate-90' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}

export function InsightsTab() {
  const [formData, setFormData] = useState({
    gender: '',
    category: '',
    subcategory: '',
    style: '',
    weblinks: ['']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [productTypeFilter, setProductTypeFilter] = useState('All Products');

  // Mock insights data
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
          { name: 'Mid-Range', value: 1247, fill: '#00C2FF' },
          { name: 'Premium', value: 342, fill: '#F59E0B' },
          { name: 'Luxury', value: 89, fill: '#EF4444' }
        ]
      },
      details: {
        segments: [
          { name: 'Budget (<$100)', products: 2891, avgPrice: '$67', growth: '+4.2%' },
          { name: 'Mid-Range ($100-199)', products: 1247, avgPrice: '$149', growth: '+8.7%' },
          { name: 'Premium ($200+)', products: 342, avgPrice: '$285', growth: '+12.3%' },
          { name: 'Luxury ($500+)', products: 89, avgPrice: '$750', growth: '+18.9%' }
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
          { name: 'Casual Wear', value: 35, fill: '#00C2FF' },
          { name: 'Activewear', value: 28, fill: '#10B981' },
          { name: 'Formal', value: 22, fill: '#F59E0B' },
          { name: 'Streetwear', value: 15, fill: '#EF4444' }
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
              <Bar dataKey="value" fill="#00C2FF" radius={[4, 4, 0, 0]} />
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
              <Tooltip />
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
              <Line type="monotone" dataKey="nike" stroke="#00C2FF" strokeWidth={2} />
              <Line type="monotone" dataKey="adidas" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="puma" stroke="#F59E0B" strokeWidth={2} />
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
              <Area type="monotone" dataKey="athleisure" stackId="1" stroke="#00C2FF" fill="#00C2FF" fillOpacity={0.6} />
              <Area type="monotone" dataKey="vintage" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-[28px] font-medium text-[#F5F6F7] mb-4">Market Insights</h1>
        <p className="text-[16px] text-[#9CA3AF] max-w-2xl mx-auto">
          Analyze market trends, pricing patterns, and competitor insights across different segments and categories
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-[#1C1D20] rounded-lg p-8 border border-[#2A2B30]">
        <h2 className="text-[20px] font-medium text-[#F5F6F7] mb-6">Analysis Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Gender/Department */}
          <div>
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Gender/Department</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-3 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#00C2FF]"
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-3 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#00C2FF]"
            >
              <option value="">Select Category</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Subcategory</label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-3 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#00C2FF]"
            >
              <option value="">Select Subcategory</option>
              {subcategoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Style</label>
            <select
              value={formData.style}
              onChange={(e) => handleInputChange('style', e.target.value)}
              className="w-full bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-3 text-[14px] text-[#F5F6F7] focus:outline-none focus:border-[#00C2FF]"
            >
              <option value="">Select Style</option>
              {styleOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Weblinks */}
        <div className="mb-8">
          <label className="text-[14px] font-medium text-[#F5F6F7] block mb-2">Reference Weblinks</label>
          <div className="space-y-3">
            {formData.weblinks.map((link, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleWeblinkChange(index, e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-[#2A2B30] border border-[#3A3B40] rounded-lg px-4 py-3 text-[14px] text-[#F5F6F7] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C2FF]"
                />
                {formData.weblinks.length > 1 && (
                  <button
                    onClick={() => removeWeblink(index)}
                    className="p-3 text-[#9CA3AF] hover:text-[#F5F6F7] hover:bg-[#2A2B30] rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addWeblink}
            className="mt-3 flex items-center gap-2 text-[#00C2FF] hover:text-[#00A8D6] transition-colors"
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
            className="bg-[#00C2FF] text-[#0E0E11] px-8 py-3 rounded-lg font-medium hover:bg-[#00A8D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

      {/* Market Stream Section */}
      {insights.length > 0 && (
        <>
          <MarketStream 
            productTypeFilter={productTypeFilter}
            onFilterChange={setProductTypeFilter}
          />
        </>
      )}

      {/* Results */}
      {insights.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-medium text-[#F5F6F7]">Market Insights</h2>
            <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
              <Calendar className="w-4 h-4" />
              <span>Updated 5 minutes ago</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => setSelectedInsight(insight)}
                className="bg-[#1C1D20] rounded-lg p-6 border border-[#2A2B30] hover:border-[#00C2FF] transition-all duration-200 cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {insight.type === 'pricing' && <Target className="w-5 h-5 text-[#00C2FF]" />}
                    {insight.type === 'market' && <PieChart className="w-5 h-5 text-[#10B981]" />}
                    {insight.type === 'brands' && <Globe className="w-5 h-5 text-[#F59E0B]" />}
                    {insight.type === 'trends' && <TrendingUp className="w-5 h-5 text-[#EF4444]" />}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#00C2FF] transition-colors" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-[16px] font-medium text-[#F5F6F7] mb-2">{insight.title}</h3>
                  <p className="text-[12px] text-[#9CA3AF] mb-4">{insight.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[20px] font-medium text-[#F5F6F7]">{insight.value}</span>
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