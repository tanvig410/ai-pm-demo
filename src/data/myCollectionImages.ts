// My Collection Images Data
// Replace the URLs below with your own custom images

export interface MyCollectionImage {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  addedAt: string;
}

export const myCollectionImagesData: MyCollectionImage[] = [
  {
    id: 'my-collection-1',
    title: 'Minimalist Blazer',
    subtitle: 'Saved from Brands',
    url: 'https://images.unsplash.com/photo-1684064866847-d1d757b58131?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D', // REPLACE THIS URL
    addedAt: '3 days ago'
  },
  {
    id: 'my-collection-2',
    title: 'Vintage Denim Jacket',
    subtitle: 'Saved from World Reports',
    url: 'https://wwd.com/wp-content/uploads/2025/07/iris-van-herpen-fall-25-couture-r-gg-0001.jpg?w=555&h=740&crop=1', // REPLACE THIS URL
    addedAt: '1 week ago'
  },
  {
    id: 'my-collection-3',
    title: 'Silk Evening Dress',
    subtitle: 'Saved from Internal Database',
    url: 'https://antithesis.in/cdn/shop/files/NotrainNoproblem.Backless.Sculpted.Unbothered.Proofyoudon_tneedexcesstomakeanentrance.Customcoloursavailableonrequest._AntithesisIndia_RedCarpetRewrite_ModernCouture_StatementSilhouet.jpg?v=1750585184', // REPLACE THIS URL
    addedAt: '2 weeks ago'
  },
  {
    id: 'my-collection-4',
    title: 'Casual Cotton Tee',
    subtitle: 'Saved from Brands',
    url: 'https://www.zodiaconline.com/media/catalog/product/cache/253fb0759a515d30bcbc159f082108b5/z/3/z3_t_shirts_polo_ss25_zrs_001_zrs_solid_100_cotton_hsnc_cac_white_00_ab_a_01_c_01_ai.jpg', // REPLACE THIS URL
    addedAt: '3 weeks ago'
  },
  {
    id: 'my-collection-5',
    title: 'Wool Sweater',
    subtitle: 'Saved from World Reports',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkXA3MTzC7xi-8GUvrkhtt86fd5HQK-1-hA&s', // REPLACE THIS URL
    addedAt: '1 month ago'
  },
  {
    id: 'my-collection-6',
    title: 'Designer Handbag',
    subtitle: 'Saved from Internal Database',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // REPLACE THIS URL
    addedAt: '1 month ago'
  },
  // ADD MORE IMAGES HERE
  // {
  //   id: 'my-collection-7',
  //   title: 'Your Custom Item',
  //   subtitle: 'Your Custom Source',
  //   url: 'YOUR_CUSTOM_IMAGE_URL_HERE',
  //   addedAt: 'Just now'
  // },
];

// Helper function to add new images programmatically
export const createMyCollectionImage = (
  title: string,
  subtitle: string,
  url: string,
  customId?: string
): MyCollectionImage => {
  return {
    id: customId || `my-collection-${Date.now()}`,
    title,
    subtitle,
    url,
    addedAt: new Date().toLocaleDateString()
  };
};

// Helper function to validate image URLs
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};