import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { FeedToggle } from "./components/FeedToggle";
import { MasonryFeed } from "./components/MasonryFeed";
import { Canvas } from "./components/Canvas";
import { Projects } from "./components/Projects";
import { ProjectTechpacks } from "./components/ProjectTechpacks";
import { TechpackDetail } from "./components/TechpackDetail";
import { Discover } from "./components/Discover";
import { Recommendation } from "./components/Recommendation";
import { SimilarResults } from "./components/SimilarResults";
import { CreateModal } from "./components/CreateModal";
import { ImageSelectionModal } from "./components/ImageSelectionModal";
import { ImageDetailModal } from "./components/ImageDetailModal";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CustomRecommendationModal } from "./components/CustomRecommendationModal";
import { ProjectSelectionModal } from "./components/ProjectSelectionModal";
import { TechpackCreationModal } from "./components/TechpackCreationModal";
import { CommentSystem } from "./components/CommentSystem";
import {
  myCollectionImagesData,
  type MyCollectionImage,
} from "./data/myCollectionImages";
import {
  canvasWorkflowData,
  type CanvasGeneratedImage,
  type CanvasLineSheetImage,
  type CanvasTechpackImage,
  getCompleteWorkflow,
  getWorkflowProgress
} from "./data/canvasWorkflowImages";
import {
  getDiscoverTechpackByImageId,
  getDiscoverTechpackByImageTitle
} from "./data/techpacks/discover/discoverTechpacks";
import {
  getRecommendationTechpackByImage,
  getRecommendationTechpack
} from "./data/techpacks/recommendations/recommendationTechpacks";

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "home"
    | "discover"
    | "recommendation"
    | "projects"
    | "project-detail"
    | "techpack-detail"
    | "canvas"
    | "similar"
  >("home");
  const [previousView, setPreviousView] = useState<
    | "home"
    | "discover"
    | "recommendation"
    | "projects"
    | "project-detail"
    | "techpack-detail"
    | "canvas"
  >("home");
  const [selectedImageId, setSelectedImageId] =
    useState<string>("");

  // Image Detail Modal state
  const [isImageDetailOpen, setIsImageDetailOpen] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    url: string;
    alt: string;
  } | null>(null);

  // Product Detail Modal state for recommendations
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Custom Recommendation Modal state
  const [isCustomRecommendationModalOpen, setIsCustomRecommendationModalOpen] = useState(false);
  const [customFilters, setCustomFilters] = useState<any[]>([]);

  // Comment system state
  const [isCommentModeActive, setIsCommentModeActive] = useState(false);

  // Canvas Workflow Images State - now using the imported data
  const [canvasGeneratedImages, setCanvasGeneratedImages] = useState<CanvasGeneratedImage[]>(canvasWorkflowData.generateImages);
  const [canvasLineSheetImages, setCanvasLineSheetImages] = useState<CanvasLineSheetImage[]>(canvasWorkflowData.lineSheets);
  const [canvasTechpackImages, setCanvasTechpackImages] = useState<CanvasTechpackImage[]>(canvasWorkflowData.techpacks);

  // Enhanced recommendation images data with color options and materials
  const [recommendationImages, setRecommendationImages] =
    useState({
      pricing: {
        high: [
          {
            section: "high",
            src: "https://www.mytheresa.com/media/1094/1238/100/cb/P00927725_b1.jpg",
            alt: "Luxury silk blazer",
            details: [
              { label: "Material", value: "100% Mulberry Silk" },
              { label: "Estimated Cost", value: "$850" },
              { label: "Build Time", value: "12 weeks" },
              { label: "Estimated MRP", value: "$1280" },
              { label: "Sizes", value: "XS-XL" },
              { label: "Season", value: "All Season" },
            ],
            colors: ["#1a1a1a", "#8B4513", "#DAA520", "#2F4F4F", "#800080", "#FFFFFF"],
          },
          {
            section: "high",
            src: "https://cdn-images.farfetch-contents.com/19/04/05/24/19040524_43535332_2048.jpg",
            alt: "Designer leather handbag",
            details: [
              { label: "Material", value: "Italian Genuine Leather" },
              { label: "Estimated Cost", value: "$920" },
              { label: "Build Time", value: "14 weeks" },
              { label: "Estimated MRP", value: "$1380" },
              { label: "Hardware", value: "Gold-plated" },
              { label: "Dimensions", value: "30x20x12 cm" },
            ],
            colors: ["#000000", "#8B4513", "#A0522D", "#800000", "#2F4F4F"],
          },
          {
            section: "high",
            src: "https://www.mytheresa.com/media/1094/1238/100/4f/P01019839_d1.jpg",
            alt: "Cashmere wool coat",
            details: [
              { label: "Material", value: "Pure Cashmere Wool" },
              { label: "Estimated Cost", value: "$1200" },
              { label: "Build Time", value: "16 weeks" },
              { label: "Estimated MRP", value: "$1800" },
              { label: "Weight", value: "850g" },
              { label: "Origin", value: "Scotland" },
            ],
            colors: ["#8B4513", "#2F4F4F", "#800000", "#000000", "#708090", "#DCDCDC"],
          },
          {
            section: "high",
            src: "https://www.net-a-porter.com/variants/images/46376663162871643/ou/w2000_q60.jpg",
            alt: "Premium merino wool dress",
            details: [
              { label: "Material", value: "Merino Wool Blend" },
              { label: "Estimated Cost", value: "$680" },
              { label: "Build Time", value: "10 weeks" },
              { label: "Estimated MRP", value: "$1020" },
              { label: "Stretch", value: "4-way stretch" },
              { label: "Care", value: "Dry clean only" },
            ],
            colors: ["#000000", "#2F4F4F", "#800000", "#000080", "#8B4513", "#FFFFFF"],
          },
          {
            section: "high",
            src: "https://www.mytheresa.com/media/1094/1238/100/f6/P00990991_b1.jpg",
            alt: "Luxury evening gown",
            details: [
              { label: "Material", value: "Silk Chiffon & Satin" },
              { label: "Estimated Cost", value: "$1500" },
              { label: "Build Time", value: "20 weeks" },
              { label: "Estimated MRP", value: "$2250" },
              { label: "Embellishments", value: "Hand-beaded" },
              { label: "Lining", value: "Silk crepe" },
            ],
            colors: ["#000000", "#800080", "#8B0000", "#FFD700", "#2F4F4F", "#FFFFFF"],
          },
        ],
        moderate: [
          {
            section: "moderate",
            src: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1253257_alternate10?$rl_4x5_pdp$",
            alt: "Cotton button-up shirt",
            details: [
              { label: "Material", value: "Organic Cotton Poplin" },
              { label: "Estimated Cost", value: "$45" },
              { label: "Build Time", value: "4 weeks" },
              { label: "Estimated MRP", value: "$68" },
              { label: "Fit", value: "Relaxed fit" },
              { label: "GSM", value: "120 GSM" },
            ],
            colors: ["#FFFFFF", "#000000", "#87CEEB", "#FFB6C1", "#98FB98", "#F0E68C"],
          },
          {
            section: "moderate",
            src: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI200963856001_alternate10?$rl_4x5_pdp$",
            alt: "Stretch denim jacket",
            details: [
              { label: "Material", value: "98% Cotton, 2% Elastane" },
              { label: "Estimated Cost", value: "$65" },
              { label: "Build Time", value: "6 weeks" },
              { label: "Estimated MRP", value: "$98" },
              { label: "Wash", value: "Stone washed" },
              { label: "Weight", value: "12 oz" },
            ],
            colors: ["#1e3a8a", "#3730a3", "#1e40af", "#374151", "#6B7280"],
          },
          {
            section: "moderate",
            src: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211971870011_alternate10?$rl_4x5_pdp$",
            alt: "Knit sweater",
            details: [
              { label: "Material", value: "Wool Blend Knit" },
              { label: "Estimated Cost", value: "$55" },
              { label: "Build Time", value: "5 weeks" },
              { label: "Estimated MRP", value: "$83" },
              { label: "Knit Type", value: "Cable knit" },
              { label: "Gauge", value: "7 GG" },
            ],
            colors: ["#8B4513", "#2F4F4F", "#800000", "#000000", "#708090", "#DCDCDC"],
          },
          {
            section: "moderate",
            src: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1446287_alternate10?$rl_4x5_pdp$",
            alt: "Chino pants",
            details: [
              { label: "Material", value: "Cotton Twill" },
              { label: "Estimated Cost", value: "$40" },
              { label: "Build Time", value: "3 weeks" },
              { label: "Estimated MRP", value: "$60" },
              { label: "Fit", value: "Straight leg" },
              { label: "Rise", value: "Mid-rise" },
            ],
            colors: ["#8B4513", "#2F4F4F", "#000000", "#FFFFFF", "#708090", "#BDB76B"],
          },
          {
            section: "moderate",
            src: "https://www.mytheresa.com/media/1094/1238/100/b3/P00962328_b1.jpg",
            alt: "Midi skirt",
            details: [
              { label: "Material", value: "Poly-Cotton Blend" },
              { label: "Estimated Cost", value: "$38" },
              { label: "Build Time", value: "4 weeks" },
              { label: "Estimated MRP", value: "$57" },
              { label: "Length", value: "Midi" },
              { label: "Closure", value: "Side zip" },
            ],
            colors: ["#000000", "#800000", "#000080", "#8B4513", "#2F4F4F", "#FFFFFF"],
          },
        ],
        low: [
          {
            section: "low",
            src: "https://www.mytheresa.com/media/1094/1238/100/93/P00925941_d2.jpg",
            alt: "Basic cotton t-shirt",
            details: [
              { label: "Material", value: "100% Cotton Jersey" },
              { label: "Estimated Cost", value: "$12" },
              { label: "Build Time", value: "2 weeks" },
              { label: "Estimated MRP", value: "$18" },
              { label: "GSM", value: "160 GSM" },
              { label: "Fit", value: "Regular fit" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#FFB6C1"],
          },
          {
            section: "low",
            src: "https://www.creaturesofhabit.in/cdn/shop/files/Ginger_2XL_10241014_1_1800x1800.jpg?v=1703276645",
            alt: "Cotton shorts",
            details: [
              { label: "Material", value: "Cotton Twill" },
              { label: "Estimated Cost", value: "$15" },
              { label: "Build Time", value: "2 weeks" },
              { label: "Estimated MRP", value: "$23" },
              { label: "Inseam", value: "5 inches" },
              { label: "Pockets", value: "5 pockets" },
            ],
            colors: ["#000000", "#FFFFFF", "#8B4513", "#000080", "#2F4F4F", "#BDB76B"],
          },
          {
            section: "low",
            src: "https://www.creaturesofhabit.in/cdn/shop/files/CastleGrey_XS_10006534_1_e5652431-6aba-42e3-ab41-c02805d1d2c9_1800x1800.jpg?v=1704784933",
            alt: "Tank top",
            details: [
              { label: "Material", value: "Cotton Blend" },
              { label: "Estimated Cost", value: "$10" },
              { label: "Build Time", value: "1 week" },
              { label: "Estimated MRP", value: "$15" },
              { label: "Neckline", value: "Scoop neck" },
              { label: "Hem", value: "Curved hem" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"],
          },
          {
            section: "low",
            src: "https://www.victoriassecret.in/on/demandware.static/-/Sites-vs_master_catalog/default/dw3983e6b2/large/112293225O5G_OM_F.jpg",
            alt: "Basic hoodie",
            details: [
              { label: "Material", value: "Cotton Fleece" },
              { label: "Estimated Cost", value: "$25" },
              { label: "Build Time", value: "3 weeks" },
              { label: "Estimated MRP", value: "$38" },
              { label: "Weight", value: "280 GSM" },
              { label: "Hood", value: "Drawstring hood" },
            ],
            colors: ["#000000", "#FFFFFF", "#800000", "#000080", "#2F4F4F", "#708090"],
          },
        ],
      },
      trending: {
        celebrity: [
          {
            section: "celebrity",
            src: "https://i.insider.com/65c117ac43bb77284ba3958f?width=800&format=jpeg&auto=webp",
            alt: "Celebrity red carpet look",
            badge: "CELEB",
            badgeColor: "bg-purple-600",
            details: [
              { label: "Material", value: "Silk Georgette" },
              { label: "Source", value: "Celebrity Style" },
              { label: "Estimated Cost", value: "$450" },
              { label: "Build Time", value: "8 weeks" },
              { label: "Estimated MRP", value: "$675" },
              { label: "Designer", value: "Couture inspired" },
            ],
            colors: ["#000000", "#800080", "#8B0000", "#FFD700", "#2F4F4F"],
          },
          {
            section: "celebrity",
            src: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1908159795-659b348d9f09b.jpg?crop=1xw:1xh;center,top&resize=980:*",
            alt: "Award show ensemble",
            badge: "CELEB",
            badgeColor: "bg-purple-600",
            details: [
              { label: "Material", value: "Sequined Tulle" },
              { label: "Source", value: "Celebrity Style" },
              { label: "Estimated Cost", value: "$680" },
              { label: "Build Time", value: "10 weeks" },
              { label: "Estimated MRP", value: "$1020" },
              { label: "Embellishments", value: "Hand-sewn sequins" },
            ],
            colors: ["#FFD700", "#C0C0C0", "#1a1a1a", "#800080", "#8B0000"],
          },
        ],
        instagram: [
          {
            section: "instagram",
            src: "https://cdn-img.prettylittlething.com/a/4/6/d/a46d33ce1e5cbccdbf570b0d55e4aeeaaaba9193_cnh6056_1.jpg",
            alt: "Instagram streetwear",
            badge: "IG",
            badgeColor: "bg-pink-600",
            details: [
              { label: "Material", value: "Cotton Streetwear" },
              { label: "Source", value: "Instagram Trend" },
              { label: "Estimated Cost", value: "$200" },
              { label: "Build Time", value: "5 weeks" },
              { label: "Estimated MRP", value: "$300" },
              { label: "Style", value: "Oversized fit" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"],
          },
          {
            section: "instagram",
            src: "https://www.stylebysavina.com/wp-content/uploads/2022/03/top-minimalist-fashion-bloggers.png",
            alt: "Influencer casual look",
            badge: "IG",
            badgeColor: "bg-pink-600",
            details: [
              { label: "Material", value: "Sustainable Cotton" },
              { label: "Source", value: "Instagram Trend" },
              { label: "Estimated Cost", value: "$180" },
              { label: "Build Time", value: "4 weeks" },
              { label: "Estimated MRP", value: "$270" },
              { label: "Sustainability", value: "Organic certified" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"],
          },
        ],
        pinterest: [
          {
            section: "pinterest",
            src: "https://www.stylebysavina.com/wp-content/uploads/2022/03/minimalist-fashion-bloggers-instagram.jpg",
            alt: "Pinterest aesthetic",
            badge: "PIN",
            badgeColor: "bg-red-600",
            details: [
              { label: "Material", value: "Linen Blend" },
              { label: "Source", value: "Pinterest Board" },
              { label: "Estimated Cost", value: "$160" },
              { label: "Build Time", value: "4 weeks" },
              { label: "Estimated MRP", value: "$240" },
              { label: "Aesthetic", value: "Minimalist" },
            ],
            colors: ["#F5F5DC", "#DEB887", "#8B4513", "#2F4F4F", "#FFFFFF"],
          },
        ],
        seasonal: [
          {
            section: "seasonal",
            src: "https://callingjune.in/cdn/shop/files/20250225_CJ_1973_26e89ce5-e8f3-4c71-93ee-cccca62f3874.jpg?v=1753511799&width=5000",
            alt: "Summer collection piece",
            badge: "SEASON",
            badgeColor: "bg-orange-600",
            details: [
              { label: "Material", value: "Lightweight Cotton" },
              { label: "Source", value: "Seasonal Collection" },
              { label: "Estimated Cost", value: "$220" },
              { label: "Build Time", value: "6 weeks" },
              { label: "Estimated MRP", value: "$330" },
              { label: "Season", value: "Summer 2024" },
            ],
            colors: ["#FFB6C1", "#87CEEB", "#98FB98", "#F0E68C", "#FFFFFF"],
          },
        ],
        reports: [
          {
            section: "reports",
            src: "https://static.fibre2fashion.com/articleresources/images/91/9076/1_files/image004.jpg?v=20210616T144221",
            alt: "Industry trend report",
            badge: "REPORT",
            badgeColor: "bg-blue-600",
            details: [
              { label: "Material", value: "Tech Fabric" },
              { label: "Source", value: "Industry Report" },
              { label: "Estimated Cost", value: "$350" },
              { label: "Build Time", value: "7 weeks" },
              { label: "Estimated MRP", value: "$525" },
              { label: "Innovation", value: "Smart fabric" },
            ],
            colors: ["#000000", "#FFFFFF", "#808080", "#4169E1", "#2F4F4F"],
          },
        ],
      },
      materialStock: {
        inStock: [
          {
            section: "in-stock",
            src: "https://image.hm.com/assets/hm/82/e7/82e7a76a22ef1d86ac1b303e6d00fb93a8127f49.jpg?imwidth=1536",
            alt: "Cotton blend Dress",
            badge: "IN STOCK",
            badgeColor: "bg-green-600",
            details: [
              { label: "Material", value: "Organic Cotton Blend" },
              { label: "Estimated Cost", value: "$250" },
              { label: "Build Time", value: "5 weeks" },
              { label: "Estimated MRP", value: "$375" },
              { label: "Cost Reduction", value: "5%" },
              { label: "Stock Level", value: "High" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"],
          },
        ],
        lowStock: [
          {
            section: "low-stock",
            src: "https://www.mytheresa.com/media/1094/1238/100/14/P00965208_b1.jpg",
            alt: "Premium wool item",
            badge: "LOW STOCK",
            badgeColor: "bg-orange-600",
            details: [
              { label: "Material", value: "Premium Merino Wool" },
              { label: "Estimated Cost", value: "$400" },
              { label: "Build Time", value: "8 weeks" },
              { label: "Estimated MRP", value: "$600" },
              { label: "Cost Reduction", value: "2%" },
              { label: "Stock Level", value: "Low" },
            ],
            colors: ["#8B4513", "#2F4F4F", "#800000", "#000000", "#708090"],
          },
        ],
        cotton: [
          {
            section: "cotton",
            src: "https://www.cordstudio.in/cdn/shop/products/Cord-Dec6185_1400x.jpg?v=1753680942",
            alt: "Organic cotton piece",
            details: [
              { label: "Material", value: "100% Organic Cotton" },
              { label: "Estimated Cost", value: "$180" },
              { label: "Build Time", value: "4 weeks" },
              { label: "Estimated MRP", value: "$270" },
              { label: "Cost Reduction", value: "8%" },
              { label: "Certification", value: "GOTS certified" },
            ],
            colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"],
          },
        ],
        premium: [
          {
            section: "premium",
            src: "https://static.zara.net/assets/public/9e20/effa/42d34042b71b/2b70d87ebc0a/02320835712-p/02320835712-p.jpg?ts=1743689626843&w=1440",
            alt: "Silk and cashmere blend",
            badge: "PREMIUM",
            badgeColor: "bg-yellow-600",
            details: [
              { label: "Material", value: "Silk & Cashmere Blend" },
              { label: "Estimated Cost", value: "$600" },
              { label: "Build Time", value: "10 weeks" },
              { label: "Estimated MRP", value: "$900" },
              { label: "Cost Reduction", value: "3%" },
              { label: "Luxury Grade", value: "Ultra premium" },
            ],
            colors: ["#FFD700", "#C0C0C0", "#1a1a1a", "#800080", "#8B0000"],
          },
        ],
        denim: [
          {
            section: "denim",
            src: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211969408001_alternate10?$rl_4x5_pdp$",
            alt: "Stretch denim item",
            details: [
              { label: "Material", value: "Stretch Denim 12oz" },
              { label: "Estimated Cost", value: "$120" },
              { label: "Build Time", value: "3 weeks" },
              { label: "Estimated MRP", value: "$180" },
              { label: "Cost Reduction", value: "6%" },
              { label: "Stretch", value: "2% elastane" },
            ],
            colors: ["#1e3a8a", "#3730a3", "#1e40af", "#374151", "#111827"],
          },
        ],
      },
    });

  // Create flow state
  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);
  const [createType, setCreateType] = useState<
    "collection" | "folder" | "techpack"
  >("collection");
  const [isImageSelectionOpen, setIsImageSelectionOpen] =
    useState(false);
  const [createdElement, setCreatedElement] = useState<{
    type: "collection" | "folder" | "techpack";
    name: string;
    description?: string;
    visibility: "public" | "private";
  } | null>(null);

  // Recommendation page specific state
  const [isProjectSelectionOpen, setIsProjectSelectionOpen] =
    useState(false);
  const [isTechpackCreationOpen, setIsTechpackCreationOpen] =
    useState(false);
  const [
    selectedRecommendationImage,
    setSelectedRecommendationImage,
  ] = useState<any>(null);

  // Project detail view state
  const [selectedProject, setSelectedProject] =
    useState<any>(null);

  // Techpack detail view state
  const [selectedTechpack, setSelectedTechpack] =
    useState<any>(null);
  const [isTechpackLoading, setIsTechpackLoading] = useState(false);

  // My Collection state - now using the imported data
  const [myCollectionImages, setMyCollectionImages] = useState<
    MyCollectionImage[]
  >(myCollectionImagesData);
  const [
    preSelectedImageForCanvas,
    setPreSelectedImageForCanvas,
  ] = useState<any>(null);

  // Cleanup effect to reset loading state when view changes
  useEffect(() => {
    if (currentView !== "techpack-detail" && currentView !== "similar") {
      setIsTechpackLoading(false);
    }
  }, [currentView]);

  // Cleanup effect to reset Canvas state when leaving Canvas view
  useEffect(() => {
    if (currentView !== "canvas") {
      // Reset Canvas-specific states when navigating away from Canvas
      setPreSelectedImageForCanvas(null);
    }
  }, [currentView]);

  const handleDiscoverClick = () => {
    setCurrentView("discover");
  };

  const handleRecommendationClick = () => {
    setCurrentView("recommendation");
  };

  const handleProjectsClick = () => {
    setCurrentView("projects");
  };

  const handleCanvasClick = () => {
    console.log("Canvas button clicked!"); // Debug log
    setCurrentView("canvas");
  };

  const handleLogoClick = () => {
    setCurrentView("home");
  };

  const handleImageClick = (image: {
    id: string;
    url: string;
    alt: string;
  }) => {
    setSelectedImage(image);
    setIsImageDetailOpen(true);
  };

  const handleCloseImageDetail = () => {
    setIsImageDetailOpen(false);
    setSelectedImage(null);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleFindSimilar = (imageId: string) => {
    // Store the current view as the previous view before navigating to similar
    setPreviousView(currentView);
    setSelectedImageId(imageId);
    setCurrentView("similar");
  };

  const handleBackFromSimilar = () => {
    // Navigate back to the previous view instead of always going to home
    setCurrentView(previousView);
    setSelectedImageId("");
  };

  const handleCreateClick = (
    type: "collection" | "folder" | "techpack",
  ) => {
    setCreateType(type);
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = (data: {
    type: "collection" | "folder" | "techpack";
    name: string;
    description?: string;
    visibility: "public" | "private";
  }) => {
    setCreatedElement(data);
    setIsCreateModalOpen(false);
    setIsImageSelectionOpen(true);
  };

  const handleImageSelectionSave = (
    selectedImageIds: string[],
  ) => {
    console.log("Created element:", createdElement);
    console.log("Selected images:", selectedImageIds);

    // Here you would save to your backend/state management
    // For now, just close the modal and reset state
    setIsImageSelectionOpen(false);
    setCreatedElement(null);

    // Show success toast or notification
    // toast.success(`${createdElement?.type} "${createdElement?.name}" created with ${selectedImageIds.length} images`);
  };

  const handleImageSelectionClose = () => {
    setIsImageSelectionOpen(false);
    setCreatedElement(null);
  };

  // Recommendation page handlers
  const handleAddToProject = (imageData: any) => {
    setSelectedRecommendationImage(imageData);
    setIsProjectSelectionOpen(true);
  };

  // Updated handler for opening techpack directly from recommendation
  const handleOpenTechpack = (imageData: any) => {
    // Try to find existing techpack data by matching the image alt text
    const existingTechpack = getRecommendationTechpackByImage(imageData.alt);
    
    if (existingTechpack) {
      // Use the existing techpack data with proper source image reference
      const techpackData = {
        ...existingTechpack,
        sourceImage: {
          url: imageData.src,
          alt: imageData.alt,
          title: imageData.alt,
          id: `rec-${imageData.section}-${Date.now()}`
        },
        breadcrumbContext: "recommendation"
      };
      
      setSelectedTechpack(techpackData);
      setCurrentView("techpack-detail");
    } else {
      // Fallback: create a dynamic techpack if no existing data found
      const techpackData = {
        id: `techpack-${imageData.section}-${Date.now()}`,
        name: "Poplin Midi-Dress",
        description: `AI-generated technical specification for Poplin Midi-Dress`,
        image: imageData.src,
        status: "Draft",
        version: "1.0",
        lastModified: new Date().toLocaleDateString(),
        details: imageData.details || [],
        breadcrumbContext: "recommendation",
        sourceImage: {
          url: imageData.src,
          alt: imageData.alt,
          title: imageData.alt,
          id: `rec-${imageData.section}-${Date.now()}`
        },
        // Additional techpack-specific data
        sections: {
          overview: {
            title: "Product Overview",
            content: `AI-generated technical specifications for ${imageData.alt}`,
          },
          materials: {
            title: "Materials & Construction",
            content:
              "Detailed material specifications and construction methods",
          },
          measurements: {
            title: "Size & Fit",
            content:
              "Comprehensive size chart and fit specifications",
          },
          production: {
            title: "Production Notes",
            content:
              "Manufacturing guidelines and production requirements",
          },
        },
      };

      setSelectedTechpack(techpackData);
      setCurrentView("techpack-detail");
    }
  };

  // Updated handler for View Details button in recommendations - now opens ProductDetailModal
  const handleRecommendationViewDetails = (imageData: any) => {
    setSelectedProduct(imageData);
    setIsProductDetailOpen(true);
  };

  const handleCreateTechpack = (imageData: any) => {
    setSelectedRecommendationImage(imageData);
    setIsTechpackCreationOpen(true);
  };

  const handleProjectSelection = (
    projectId: string,
    projectName: string,
  ) => {
    console.log(
      `Adding image to project: ${projectName} (${projectId})`,
    );
    console.log("Image data:", selectedRecommendationImage);

    // Here you would add the image to the selected project
    // For now, just close the modal and reset state
    setIsProjectSelectionOpen(false);
    setSelectedRecommendationImage(null);

    // Show success notification
    // toast.success(`Image added to ${projectName}`);
  };

  const handleTechpackCreation = (data: {
    name: string;
    project: string;
    folder?: string;
    description: string;
  }) => {
    console.log("Creating techpack:", data);
    console.log("With image:", selectedRecommendationImage);

    // Here you would create the techpack with the image
    // For now, just close the modal and reset state
    setIsTechpackCreationOpen(false);
    setSelectedRecommendationImage(null);

    // Show success notification
    // toast.success(`Techpack "${data.name}" created in ${data.project}${data.folder ? ` > ${data.folder}` : ''}`);
  };

  const handleCloseProjectSelection = () => {
    setIsProjectSelectionOpen(false);
    setSelectedRecommendationImage(null);
  };

  const handleCloseTechpackCreation = () => {
    setIsTechpackCreationOpen(false);
    setSelectedRecommendationImage(null);
  };

  // Custom Recommendation Modal handlers
  const handleOpenCustomModal = () => {
    setIsCustomRecommendationModalOpen(true);
  };

  const handleCloseCustomModal = () => {
    setIsCustomRecommendationModalOpen(false);
  };

  const handleCreateCustomFilter = (filterData: any) => {
    console.log("Creating custom filter:", filterData);
    
    // Add the custom filter to the state
    setCustomFilters(prev => [...prev, { ...filterData, id: Date.now() }]);
    
    // Here you would typically:
    // 1. Save the filter to your backend
    // 2. Generate recommendations based on the filter
    // 3. Update the recommendation images state with custom results
    
    // Close the modal
    setIsCustomRecommendationModalOpen(false);
    
    // Show success notification
    console.log(`Custom filter "${filterData.name}" created successfully`);
  };

  // Comment system handlers
  const handleToggleCommentMode = () => {
    setIsCommentModeActive(prev => !prev);
  };

  // Project detail handlers
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setCurrentView("project-detail");
  };

  const handleBackToProjects = () => {
    setCurrentView("projects");
    setSelectedProject(null);
  };

  // Techpack detail handlers
  const handleTechpackClick = (techpack: any) => {
    setSelectedTechpack(techpack);
    setCurrentView("techpack-detail");
  };

  const handleBackToTechpacks = () => {
    // Always reset loading state first
    setIsTechpackLoading(false);
    setSelectedTechpack(null);
    
    // Check breadcrumb context to determine correct back navigation
    if (selectedTechpack?.breadcrumbContext === "canvas") {
      setCurrentView("canvas");
    } else if (
      selectedTechpack?.breadcrumbContext === "recommendation"
    ) {
      setCurrentView("recommendation");
    } else if (
      selectedTechpack?.breadcrumbContext === "discover"
    ) {
      // If we came from similar results, go back to similar
      if (previousView === "similar") {
        setCurrentView("similar");
      } else {
        setCurrentView("discover");
      }
    } else if (selectedProject) {
      setCurrentView("project-detail");
    } else {
      // Default fallback
      setCurrentView("recommendation");
    }
  };

  // My Collection handlers (within Discover context)
  const handleAddToMyCollection = (imageData: any) => {
    // Check if image is already in collection
    const existingImage = myCollectionImages.find(
      (img) => img.id === imageData.id,
    );
    if (existingImage) {
      // Show notification that image is already in collection
      console.log("Image already in My Collection");
      return;
    }

    // Add image to My Collection with proper data structure
    setMyCollectionImages((prev) => [
      ...prev,
      {
        id: imageData.id || `my-collection-${Date.now()}`,
        title: imageData.alt || imageData.title || "Untitled",
        subtitle: imageData.subtitle || "Saved from Discover",
        url: imageData.url || imageData.src,
        addedAt: new Date().toLocaleDateString(),
      },
    ]);

    console.log("Image added to My Collection:", imageData);
    // Show success notification
    // toast.success('Image added to My Collection');
  };

  // AI Techpack overlay handler (from Discover and SimilarResults)
  const handleDiscoverRecommend = (imageData: any) => {
    // Ensure completely clean state before starting
    setIsTechpackLoading(false);
    setSelectedTechpack(null);
    
    // Small delay to ensure state is clean, then start loading
    setTimeout(() => {
      setIsTechpackLoading(true);
      
      // Simulate processing time for smooth transition
      setTimeout(() => {
        try {
          // Try to get the existing discover techpack data
          let existingTechpack = null;
          
          // First try to match by image ID
          if (imageData.id) {
            existingTechpack = getDiscoverTechpackByImageId(imageData.id);
          }
          
          // If no match by ID, try matching by title
          if (!existingTechpack && imageData.title) {
            existingTechpack = getDiscoverTechpackByImageTitle(imageData.title);
          }
          
          // Create a techpack data structure, using existing data if found
          const techpackData = existingTechpack ? {
            ...existingTechpack,
            name: "Poplin Midi-Dress", // Override with correct product name
            isOverlay: true, // Flag to indicate this is an overlay
            sourceImage: imageData, // Store the original image data
          } : {
            id: `ai-techpack-${imageData.id}-${Date.now()}`,
            name: "Poplin Midi-Dress",
            description: `AI-generated technical specification for Poplin Midi-Dress`,
            image: imageData.url,
            images: [imageData.url], // 2D Line Sheets based on selected image
            status: "Draft",
            version: "1.0",
            lastModified: new Date().toLocaleDateString(),
            estimatedCost: "$280",
            buildTime: "6 weeks",
            materials: ["Cotton Canvas", "Cotton Twill", "Polyester Thread"],
            breadcrumbContext: currentView === "similar" ? "discover" : "discover",
            isOverlay: true, // Flag to indicate this is an overlay
            sourceImage: imageData, // Store the original image data
          };

          // Set the techpack and navigate to detail view
          setSelectedTechpack(techpackData);
          setCurrentView("techpack-detail");
        } catch (error) {
          console.error("Error generating techpack:", error);
        } finally {
          // Always ensure loading state is cleared
          setIsTechpackLoading(false);
        }
      }, 1200); // 1.2 second loading time for smooth UX
    }, 50); // Small delay to ensure clean state
  };

  const handleOpenInCanvas = (image: any) => {
    setPreSelectedImageForCanvas(image);
    setCurrentView("canvas");
  };

  // Canvas-specific handlers for the workflow
  const handleCanvasAddToMyCollection = (imageData: any) => {
    handleAddToMyCollection(imageData);
  };

  const handleCanvasAddToProject = (imageData: any) => {
    setSelectedRecommendationImage(imageData);
    setIsProjectSelectionOpen(true);
  };

  const handleCanvasCreateTechpack = (imageData: any) => {
    setSelectedRecommendationImage(imageData);
    setIsTechpackCreationOpen(true);
  };

  const handleCanvasNavigateToTechpack = (
    techpackData: any,
  ) => {
    // Set the techpack data and navigate directly to techpack detail view
    setSelectedTechpack({
      ...techpackData,
      breadcrumbContext: "canvas",
    });
    setCurrentView("techpack-detail");
  };

  // Canvas Workflow Management Functions
  const handleCanvasGenerateImages = (prompt: string) => {
    // Simulate AI image generation
    console.log("Generating images with prompt:", prompt);
    // In a real app, this would call your AI service and update canvasGeneratedImages
  };

  const handleCanvasGenerateLineSheet = (originalImageId: string) => {
    // Generate line sheet from original image
    const workflow = getCompleteWorkflow(originalImageId);
    console.log("Generating line sheet for:", workflow.originalImage?.title);
    // In a real app, this would generate line sheets and update canvasLineSheetImages
  };

  const handleCanvasGenerateTechpack = (lineSheetId: string) => {
    // Generate techpack from line sheet
    const lineSheet = canvasLineSheetImages.find(ls => ls.id === lineSheetId);
    console.log("Generating techpack for line sheet:", lineSheet?.title);
    // In a real app, this would generate techpack and update canvasTechpackImages
  };

  const handleCanvasGetWorkflowProgress = (originalImageId: string) => {
    return getWorkflowProgress(originalImageId);
  };

  // Function to add new images to recommendation collections
  const addImageToRecommendations = (
    category: "pricing" | "trending" | "materialStock",
    subcategory: string,
    imageData: {
      section: string;
      src: string;
      alt: string;
      badge?: string;
      badgeColor?: string;
      details: Array<{ label: string; value: string }>;
      colors?: string[];
    },
  ) => {
    setRecommendationImages((prev) => {
      const updated = { ...prev };

      if (category === "pricing") {
        if (subcategory in updated.pricing) {
          updated.pricing[
            subcategory as keyof typeof updated.pricing
          ] = [
            ...updated.pricing[
              subcategory as keyof typeof updated.pricing
            ],
            imageData,
          ];
        }
      } else if (category === "trending") {
        if (subcategory in updated.trending) {
          updated.trending[
            subcategory as keyof typeof updated.trending
          ] = [
            ...updated.trending[
              subcategory as keyof typeof updated.trending
            ],
            imageData,
          ];
        }
      } else if (category === "materialStock") {
        if (subcategory in updated.materialStock) {
          updated.materialStock[
            subcategory as keyof typeof updated.materialStock
          ] = [
            ...updated.materialStock[
              subcategory as keyof typeof updated.materialStock
            ],
            imageData,
          ];
        }
      }

      return updated;
    });
  };

  // Function to remove image from recommendations
  const removeImageFromRecommendations = (
    category: "pricing" | "trending" | "materialStock",
    subcategory: string,
    imageIndex: number,
  ) => {
    setRecommendationImages((prev) => {
      const updated = { ...prev };

      if (
        category === "pricing" &&
        subcategory in updated.pricing
      ) {
        updated.pricing[
          subcategory as keyof typeof updated.pricing
        ] = updated.pricing[
          subcategory as keyof typeof updated.pricing
        ].filter((_, index) => index !== imageIndex);
      } else if (
        category === "trending" &&
        subcategory in updated.trending
      ) {
        updated.trending[
          subcategory as keyof typeof updated.trending
        ] = updated.trending[
          subcategory as keyof typeof updated.trending
        ].filter((_, index) => index !== imageIndex);
      } else if (
        category === "materialStock" &&
        subcategory in updated.materialStock
      ) {
        updated.materialStock[
          subcategory as keyof typeof updated.materialStock
        ] = updated.materialStock[
          subcategory as keyof typeof updated.materialStock
        ].filter((_, index) => index !== imageIndex);
      }

      return updated;
    });
  };

  if (currentView === "canvas") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView="canvas"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
          isCommentModeActive={isCommentModeActive}
          onToggleCommentMode={handleToggleCommentMode}
        />

        {/* Canvas Content with workflow integration */}
        <Canvas
          preSelectedImage={preSelectedImageForCanvas}
          onAddToMyCollection={handleCanvasAddToMyCollection}
          onAddToProject={handleCanvasAddToProject}
          onCreateTechpack={handleCanvasCreateTechpack}
          onNavigateToTechpack={handleCanvasNavigateToTechpack}
          // Pass Canvas workflow data and handlers
          canvasGeneratedImages={canvasGeneratedImages}
          canvasLineSheetImages={canvasLineSheetImages}
          canvasTechpackImages={canvasTechpackImages}
          onGenerateImages={handleCanvasGenerateImages}
          onGenerateLineSheet={handleCanvasGenerateLineSheet}
          onGenerateTechpack={handleCanvasGenerateTechpack}
          onGetWorkflowProgress={handleCanvasGetWorkflowProgress}
        />

        {/* Comment System */}
        <CommentSystem
          isActive={isCommentModeActive}
          onToggle={handleToggleCommentMode}
        />
      </div>
    );
  }

  if (currentView === "discover") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView="discover"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
          isCommentModeActive={isCommentModeActive}
          onToggleCommentMode={handleToggleCommentMode}
        />

        {/* Discover Content */}
        <Discover
          onFindSimilar={handleFindSimilar}
          onImageClick={handleImageClick}
          onCreateClick={handleCreateClick}
          onAddToMyCollection={handleAddToMyCollection}
          onOpenInCanvas={handleOpenInCanvas}
          onRecommend={handleDiscoverRecommend}
          myCollectionImages={myCollectionImages}
        />

        {/* Image Detail Modal */}
        {selectedImage && (
          <ImageDetailModal
            isOpen={isImageDetailOpen}
            onClose={handleCloseImageDetail}
            image={selectedImage}
            onFindSimilar={handleFindSimilar}
          />
        )}

        {/* Create Flow Modals */}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          type={createType}
          onCreateSuccess={handleCreateSuccess}
        />

        <ImageSelectionModal
          isOpen={isImageSelectionOpen}
          onClose={handleImageSelectionClose}
          elementName={createdElement?.name || ""}
          elementType={createdElement?.type || "collection"}
          onSaveSelection={handleImageSelectionSave}
        />

        {/* Comment System */}
        <CommentSystem
          isActive={isCommentModeActive}
          onToggle={handleToggleCommentMode}
        />
      </div>
    );
  }

  if (currentView === "projects") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView="projects"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
          isCommentModeActive={isCommentModeActive}
          onToggleCommentMode={handleToggleCommentMode}
        />

        {/* Projects Content */}
        <Projects onProjectClick={handleProjectClick} />

        {/* Create Flow Modals */}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          type={createType}
          onCreateSuccess={handleCreateSuccess}
        />

        <ImageSelectionModal
          isOpen={isImageSelectionOpen}
          onClose={handleImageSelectionClose}
          elementName={createdElement?.name || ""}
          elementType={createdElement?.type || "collection"}
          onSaveSelection={handleImageSelectionSave}
        />

        {/* Comment System */}
        <CommentSystem
          isActive={isCommentModeActive}
          onToggle={handleToggleCommentMode}
        />
      </div>
    );
  }

  if (currentView === "project-detail") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView="projects"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
        />

        {/* Project Techpacks Content */}
        <ProjectTechpacks
          project={selectedProject}
          onBack={handleBackToProjects}
          onTechpackClick={handleTechpackClick}
          onAddToProject={handleAddToProject}
          onCreateTechpack={handleCreateTechpack}
        />

        {/* Create Flow Modals */}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          type={createType}
          onCreateSuccess={handleCreateSuccess}
        />

        <ImageSelectionModal
          isOpen={isImageSelectionOpen}
          onClose={handleImageSelectionClose}
          elementName={createdElement?.name || ""}
          elementType={createdElement?.type || "collection"}
          onSaveSelection={handleImageSelectionSave}
        />

        {/* Recommendation Specific Modals */}
        <ProjectSelectionModal
          isOpen={isProjectSelectionOpen}
          onClose={handleCloseProjectSelection}
          onSelectProject={handleProjectSelection}
          selectedImage={selectedRecommendationImage}
        />

        <TechpackCreationModal
          isOpen={isTechpackCreationOpen}
          onClose={handleCloseTechpackCreation}
          onCreateTechpack={handleTechpackCreation}
          selectedImage={selectedRecommendationImage}
        />
      </div>
    );
  }

  // Show loading overlay if techpack is loading
  if (isTechpackLoading) {
    return (
      <div className="fixed inset-0 bg-[#0E0E11] z-[9999] flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          {/* Loading Animation */}
          <div className="relative mx-auto w-20 h-20">
            <div className="w-20 h-20 border-4 border-[#2A2B30] border-t-[#F5F6F7] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#9CA3AF]/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-3">
            <h3 className="text-[18px] font-medium text-[#F5F6F7]">Generating AI Techpack</h3>
            <p className="text-[14px] text-[#9CA3AF]">Creating detailed specifications...</p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#F5F6F7] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#F5F6F7] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 bg-[#F5F6F7] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "techpack-detail") {
    // Check if this is a AI Techpack overlay from Discover
    const isOverlay = selectedTechpack?.isOverlay;
    
    if (isOverlay) {
      return (
        <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7] relative">
          {/* Overlay Background with smooth fade-in */}
          <div 
            className="fixed inset-0 bg-[#0E0E11] bg-opacity-95 z-50 animate-in fade-in duration-300"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            {/* Overlay Techpack Detail Content with slide-up animation */}
            <div 
              className="h-full animate-in slide-in-from-bottom-4 duration-500"
              style={{ animation: 'slideUpFade 0.5s ease-out' }}
            >
              <TechpackDetail
                techpack={selectedTechpack}
                projectName="Discover"
                onBack={handleBackToTechpacks}
                breadcrumbContext={selectedTechpack?.breadcrumbContext}
                hideHeader={false}
                isOverlay={true}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Determine the correct navigation view based on breadcrumb context
    const getNavigationView = () => {
      const context = selectedTechpack?.breadcrumbContext;
      if (context === "recommendation") return "recommendation";
      if (context === "discover") return "discover";
      if (context === "canvas") return "canvas";
      return "projects"; // Default fallback
    };

    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView={getNavigationView()}
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
        />

        {/* Techpack Detail Content */}
        <TechpackDetail
          techpack={selectedTechpack}
          projectName={selectedProject?.name || "Project"}
          onBack={handleBackToTechpacks}
          breadcrumbContext={
            selectedTechpack?.breadcrumbContext
          }
        />
      </div>
    );
  }

  if (currentView === "recommendation") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          currentView="recommendation"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
          isCommentModeActive={isCommentModeActive}
          onToggleCommentMode={handleToggleCommentMode}
        />

        {/* Recommendation Content with new layout */}
        <Recommendation
          onFilterChange={(category, filters) => {
            console.log("Filter changed:", category, filters);
          }}
          onAddToProject={handleAddToProject}
          onOpenTechpack={handleOpenTechpack}
          onViewDetails={handleRecommendationViewDetails}
          customImageData={recommendationImages}
          onAddImage={addImageToRecommendations}
          onRemoveImage={removeImageFromRecommendations}
          onOpenCustomModal={handleOpenCustomModal}
        />

        {/* Product Detail Modal for Recommendations */}
        <ProductDetailModal
          isOpen={isProductDetailOpen}
          onClose={handleCloseProductDetail}
          productData={selectedProduct}
          onFindSimilar={handleFindSimilar}
        />

        {/* Custom Recommendation Modal */}
        <CustomRecommendationModal
          isOpen={isCustomRecommendationModalOpen}
          onClose={handleCloseCustomModal}
          onCreateCustomFilter={handleCreateCustomFilter}
        />

        {/* Regular Image Detail Modal for other contexts */}
        {selectedImage && (
          <ImageDetailModal
            isOpen={isImageDetailOpen}
            onClose={handleCloseImageDetail}
            image={selectedImage}
            onFindSimilar={handleFindSimilar}
          />
        )}

        {/* Create Flow Modals */}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          type={createType}
          onCreateSuccess={handleCreateSuccess}
        />

        <ImageSelectionModal
          isOpen={isImageSelectionOpen}
          onClose={handleImageSelectionClose}
          elementName={createdElement?.name || ""}
          elementType={createdElement?.type || "collection"}
          onSaveSelection={handleImageSelectionSave}
        />

        {/* Recommendation Specific Modals */}
        <ProjectSelectionModal
          isOpen={isProjectSelectionOpen}
          onClose={handleCloseProjectSelection}
          onSelectProject={handleProjectSelection}
          selectedImage={selectedRecommendationImage}
        />

        <TechpackCreationModal
          isOpen={isTechpackCreationOpen}
          onClose={handleCloseTechpackCreation}
          onCreateTechpack={handleTechpackCreation}
          selectedImage={selectedRecommendationImage}
        />
      </div>
    );
  }

  if (currentView === "similar") {
    return (
      <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
        {/* Top Navigation */}
        <Navigation
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
        />

        {/* Similar Results */}
        <SimilarResults
          onBack={handleBackFromSimilar}
          originalImageId={selectedImageId}
          onRecommend={handleDiscoverRecommend}
          onAddToMyCollection={handleAddToMyCollection}
          onOpenInCanvas={handleOpenInCanvas}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#F5F6F7]">
      {/* Main Container */}
      <div className="w-full mx-auto min-h-screen relative">
        {/* Top Navigation */}
        <Navigation
          currentView="home"
          onDiscoverClick={handleDiscoverClick}
          onRecommendationClick={handleRecommendationClick}
          onProjectsClick={handleProjectsClick}
          onCanvasClick={handleCanvasClick}
          onCreateClick={handleCreateClick}
          onLogoClick={handleLogoClick}
        />

        {/* Feed Toggle - Main content navigation for homepage */}
        <FeedToggle />

        {/* Main Content */}
        <div className="relative">
          {/* Masonry Feed */}
          <MasonryFeed
            onFindSimilar={handleFindSimilar}
            onImageClick={handleImageClick}
          />
        </div>

        {/* Image Detail Modal */}
        {selectedImage && (
          <ImageDetailModal
            isOpen={isImageDetailOpen}
            onClose={handleCloseImageDetail}
            image={selectedImage}
            onFindSimilar={handleFindSimilar}
          />
        )}

        {/* Create Flow Modals */}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          type={createType}
          onCreateSuccess={handleCreateSuccess}
        />

        <ImageSelectionModal
          isOpen={isImageSelectionOpen}
          onClose={handleImageSelectionClose}
          elementName={createdElement?.name || ""}
          elementType={createdElement?.type || "collection"}
          onSaveSelection={handleImageSelectionSave}
        />

        {/* Comment System - Available across all views */}
        <CommentSystem
          isActive={isCommentModeActive}
          onToggle={handleToggleCommentMode}
        />
      </div>
    </div>
  );
}