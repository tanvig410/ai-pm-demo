import { TechpackSection } from './CanvasTypes';

export const getSectionContent = (sectionId: string): string => {
  switch (sectionId) {
    case 'overview':
      return 'Technical specifications for AI generated design. This comprehensive techpack outlines all essential details for production including materials, construction methods, quality standards, and manufacturing requirements. Product category: Contemporary casual wear with premium finish details.';
    case 'line-sheets':
      return 'Detailed 2D technical drawings and line sheets showing front, back, and side views with construction details, seam placements, topstitching specifications, and measurement points. Includes flat sketches with callouts for critical construction areas.';
    case 'bom':
      return 'BILL OF MATERIALS: Main Fabric - 2.8 yards Cotton Canvas 12oz ($24.50), Lining - 1.2 yards Cotton Twill ($8.40), Thread - Polyester Core Spun 40/2 ($2.10), Zipper - YKK #5 Metal 7" ($3.25), Buttons - Metal Shank 15mm x4 ($6.80), Labels - Main + Care + Size ($4.20), Hardware - D-rings 25mm x2 ($2.40). Total Material Cost: $51.65';
    case 'materials':
      return 'FABRIC SPECIFICATIONS: Main fabric: 100% Cotton Canvas, 12oz weight, brushed finish, pre-shrunk. Lining: 100% Cotton Twill, 4oz weight, natural color. Thread: Polyester core spun for durability. All materials meet OEKO-TEX Standard 100 certification for textile safety.';
    case 'measurements':
      return 'SIZE CHART & FIT SPECIFICATIONS: XS (32" chest, 26" waist), S (34" chest, 28" waist), M (36" chest, 30" waist), L (38" chest, 32" waist), XL (40" chest, 34" waist). Tolerances: ±0.5" for body measurements, ±0.25" for detail measurements. Fit: Regular fit with ease for movement.';
    case 'construction':
      return 'CONSTRUCTION DETAILS: French seams on main body for clean finish, flat-felled seams on high-stress areas, 1/4" topstitching throughout using contrast thread, reinforced stress points with bar tacks, bound edges on pockets, machine-sewn buttonholes with bartack reinforcement.';
    case 'hardware':
      return 'HARDWARE & TRIMS: YKK metal zippers #5 in antique brass finish, metal shank buttons 15mm diameter in matching antique brass, metal D-rings 25mm for adjustable straps, rivets at stress points, custom woven labels in main and care instructions.';
    case 'colors':
      return 'COLOR SPECIFICATIONS: Primary colorway - Navy Blue (Pantone 19-4052 TPX), secondary - Khaki Green (Pantone 18-0228 TPX), tertiary - Charcoal Grey (Pantone 18-1210 TPX). Hardware in antique brass finish. Thread colors matched to fabric using industry standard color matching protocols.';
    case 'quality':
      return 'QUALITY STANDARDS: All seams must achieve minimum 50lbs tensile strength, colorfastness rating Grade 4 minimum, dimensional stability within 3% after 5 washes, hardware tested for 10,000 cycle durability, final inspection includes 47-point quality checklist.';
    case 'care':
      return 'CARE INSTRUCTIONS: Machine wash cold water with like colors, gentle cycle recommended, do not bleach, tumble dry low heat or line dry, iron medium heat if needed, professional dry cleaning acceptable. Care label symbols per ASTM D5489 standard.';
    case 'packaging':
      return 'PACKAGING SPECIFICATIONS: Individual poly bags 12"x16" with hanging holes, biodegradable material preferred, shipping cartons 24"x18"x12" containing 24 units maximum, tissue paper wrap for premium presentation, hangtags attached with plastic fasteners.';
    case 'costing':
      return 'DETAILED COST ANALYSIS: Materials $51.65, Direct Labor $28.50, Factory Overhead $15.75, Packaging $3.85, Shipping $8.25. Total FOB Cost: $108.00. Landed Cost (duties/freight): $126.50. Wholesale Price: $189.75 (50% markup). MSRP: $379.50 (100% markup).';
    default:
      return 'Generated content will appear here.';
  }
};

export const createFinalTechpackData = (
  selectedImageForNextStep: string | null,
  canvasLineSheetImages: any[],
  sections: TechpackSection[]
) => {
  return {
    id: `techpack-canvas-${Date.now()}`,
    name: 'AI Generated Design Techpack',
    description: 'Technical specification created from AI generated design and line sheet',
    images: selectedImageForNextStep ? [selectedImageForNextStep].concat(canvasLineSheetImages.slice(0, 2).map(img => img.url)) : canvasLineSheetImages.slice(0, 3).map(img => img.url),
    status: 'in-progress',
    lastModified: new Date().toLocaleDateString(),
    folder: 'Canvas Generated',
    estimatedCost: '$425',
    buildTime: '8 weeks',
    materials: ['Cotton Canvas', 'Cotton Twill', 'Metal Hardware'],
    sections: sections,
    // Enhanced data structure for proper techpack functionality
    version: '1.0',
    colorways: [
      { name: 'Classic Navy', hex: '#1B2951', pantone: 'PMS 533 C' },
      { name: 'Cream White', hex: '#F8F6F0', pantone: 'PMS 663 C' },
      { name: 'Forest Green', hex: '#2D4A3A', pantone: 'PMS 5535 C' },
      { name: 'Rust Orange', hex: '#B85C2E', pantone: 'PMS 7526 C' },
      { name: 'Charcoal Grey', hex: '#3C3C3C', pantone: 'PMS 447 C' }
    ],
    bomItems: [
      { item: 'Main Body Front', quantity: 1, material: 'Cotton Canvas', size: '24" x 18"' },
      { item: 'Main Body Back', quantity: 1, material: 'Cotton Canvas', size: '24" x 18"' },
      { item: 'Side Panels', quantity: 2, material: 'Cotton Canvas', size: '18" x 12"' },
      { item: 'Front Pocket', quantity: 2, material: 'Cotton Canvas', size: '8" x 6"' },
      { item: 'Lining Front', quantity: 1, material: 'Cotton Twill', size: '24" x 18"' },
      { item: 'Lining Back', quantity: 1, material: 'Cotton Twill', size: '24" x 18"' },
      { item: 'Zipper', quantity: 1, material: 'Metal YKK', size: '22"' },
      { item: 'Buttons', quantity: 4, material: 'Metal', size: '20mm' }
    ],
    materialsData: [
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
    ]
  };
};