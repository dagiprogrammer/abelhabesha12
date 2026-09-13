import { Product } from '../types';

// Authentic Handcrafted Ethiopian Traditional Attire Images
export const imgWedding = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop';
export const imgCouple = 'https://images.unsplash.com/photo-1546804784-896d0dca3805?q=80&w=800&auto=format&fit=crop';
export const imgMeles = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop';
export const imgAshenda = 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop';
export const imgMens = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop';
export const imgGondar = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop';
export const imgChiffon = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop';
export const imgRaya = 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop';
export const imgCoffee = 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop';
export const imgAxum = 'https://images.unsplash.com/photo-1583391733975-01e4ecdb422d?q=80&w=800&auto=format&fit=crop';
export const imgSaba = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop';

export interface ImagePreset {
  id: string;
  nameAm: string;
  nameEn: string;
  image: string;
}

export const IMAGE_PRESETS: ImagePreset[] = [
  { id: 'wedding', nameAm: 'የሰርግ ሀበሻ ቀሚስ', nameEn: 'Wedding Habesha Kemis', image: imgWedding },
  { id: 'meles', nameAm: 'የመልስ ንጉሳዊ ልብስ', nameEn: 'Royal Meles Traditional Dress', image: imgMeles },
  { id: 'couple', nameAm: 'የጥንድ ባህላዊ ልብስ', nameEn: 'Matching Couple Set', image: imgCouple },
  { id: 'mens', nameAm: 'የወንዶች ባህላዊ ልብስ', nameEn: "Men's Cultural Attire", image: imgMens },
  { id: 'chiffon', nameAm: 'ዘመናዊ የሺፎን ቀሚስ', nameEn: 'Modern Chiffon Kemis', image: imgChiffon },
  { id: 'raya', nameAm: 'የራያ ቆቦ ባህል ልብስ', nameEn: 'Raya Kobo Cultural Kemis', image: imgRaya },
  { id: 'gondar', nameAm: 'የጎንደር ንጉሳዊ ጥበብ', nameEn: 'Gondar Heritage Royal Kemis', image: imgGondar },
  { id: 'coffee', nameAm: 'የቡና ስነ-ስርዓት ቀሚስ', nameEn: 'Coffee Ceremony Kemis', image: imgCoffee },
  { id: 'axum', nameAm: 'የአክሱም ንጹህ ፈተል', nameEn: 'Axum Pure Handspun Fetel', image: imgAxum },
  { id: 'saba', nameAm: 'የንግስት ሳባ ጥበብ', nameEn: 'Saba Heritage Kemis', image: imgSaba },
  { id: 'ashenda', nameAm: 'የአሸንዳ ባህል ልብስ', nameEn: 'Ashenda Cultural Kemis', image: imgAshenda },
];

/**
 * Seed catalog with authentic Shiromeda Habesha creations.
 * Any real products added or edited via Admin will be stored permanently in Firebase Firestore.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'prod-seed-1',
    code: 'AH-1141',
    nameAm: 'የወርቅ ጥልፍ የሰርግ ሀበሻ ቀሚስ',
    nameEn: 'Gold Filigree Bridal Habesha Kemis',
    nameTi: 'ናይ ወርቂ ጥልፊ መርዓ ሓበሻ ቀሚሽ',
    categoryGroup: 'events',
    hashtags: ['#የሰርግ_ልብስ', '#የንግስት_ሳባ_ጥበብ'],
    fabricAm: '100% ንጹህ የአክሱም ፈተል ከወርቅ ጥልፍ ጋር',
    fabricEn: '100% Pure Handspun Axum Cotton with Gold Tibeb',
    fabricTi: '100% ጽሩይ ናይ ኣኽሱም ፈተል ምስ ወርቂ ጥልፊ',
    priceETB: 24500,
    originalPriceETB: 28000,
    image: imgWedding,
    descriptionAm: 'በሺሮሜዳ የሽመና ጠበብቶች የተፈተለና የተሸመነ፣ በወርቅ ጥልፍ ያሸበረቀ የሰርግ እና የመልስ ልዩ የክብር ቀሚስ።',
    descriptionEn: 'Masterfully woven on traditional wooden looms in Shiromeda with exquisite gold filigree needlework and matching double-fringe Netela.',
    descriptionTi: 'ኣብ ሽሮሜዳ ብክኢላታት ዝተፈተለን ዝተሸለመን፣ ብወርቂ ጥልፊ ዝተሰለመ ናይ መርዓ ኽዳውንቲ።',
    inStock: true,
    tailoringDays: 3,
    featured: true,
    bestSeller: true,
    badge: 'አዲስ'
  },
  {
    id: 'prod-seed-2',
    code: 'AH-1089',
    nameAm: 'ሮያል የወርቅ እና ኤመራልድ መልስ ዙሪያ',
    nameEn: 'Royal Emerald & Gold Meles Zuria Gown',
    nameTi: 'ሮያል ናይ ወርቅን ኤመራልድን መልሲ ዙርያ',
    categoryGroup: 'events',
    hashtags: ['#የመልስ_ልብስ', '#የጎንደር_ጥበብ'],
    fabricAm: 'ንጹህ የጎንደር ጥበብ ፈተል ከሐር ጥልፍ ጋር',
    fabricEn: 'Pure Gondar Royal Tibeb with Silk & Gold Thread',
    fabricTi: 'ጽሩይ ናይ ጎንደር ጥበብ ፈተል ምስ ሐር ጥልፊ',
    priceETB: 29000,
    originalPriceETB: 33000,
    image: imgMeles,
    descriptionAm: 'ለክብረ በዓል እና ለመልስ ስነ-ስርዓት የተዘጋጀ ንጉሳዊ የኤመራልድ አረንጓዴ እና ወርቅ ጥልፍ ያረፈበት ዙሪያ ቀሚስ።',
    descriptionEn: 'Regal emerald green velvet accent with heavy gold tilet embroidery, tailored for royal Meles celebrations.',
    descriptionTi: 'ንመልሲ ዝተዳለወ ንጉሳዊ ናይ ኤመራልድን ወርቅን ዙርያ ቀሚሽ።',
    inStock: true,
    tailoringDays: 4,
    featured: true,
    bestSeller: true,
    badge: 'ተወዳጅ'
  },
  {
    id: 'prod-seed-3',
    code: 'AH-2045',
    nameAm: 'የጥንድ የሰርግ እና የመልስ ባህላዊ ልብስ',
    nameEn: 'Matching Couple Wedding Attire Set',
    nameTi: 'ናይ መጻምድቲ መርዓን መልስን ክዳውንቲ',
    categoryGroup: 'men_couples',
    hashtags: ['#የጥንድ_ልብስ', '#የወንድ_ባህላዊ_ልብስ'],
    fabricAm: 'የተጣመረ ንጹህ ጥጥ ከወርቅ ጥልፍ ጋር',
    fabricEn: 'Coordinated Pure Cotton with Matching Gold Tilet',
    fabricTi: 'ጽሩይ ጥጥ ምስ ዝሰማማዕ ወርቂ ጥልፊ',
    priceETB: 38000,
    originalPriceETB: 44000,
    image: imgCouple,
    descriptionAm: 'ለሙሽራው እና ለሙሽሪት ተመጣጣኝ የወርቅ ጥልፍ ያረፈበት የወንድ ጃኬት እና የሴት ዙሪያ ቀሚስ ጥንድ ስብስብ።',
    descriptionEn: 'Harmonious wedding couple ensemble featuring matching gold tilet patterns on groom tunic and bride gown.',
    descriptionTi: 'ንመርዓውን መርዓትን ዘማዕበለ ናይ መጻምድቲ ጽሩይ ባህላዊ ክዳን።',
    inStock: true,
    tailoringDays: 5,
    featured: true,
    bestSeller: false,
    badge: 'ጥንድ'
  },
  {
    id: 'prod-seed-4',
    code: 'AH-3012',
    nameAm: 'ቀላል ዘመናዊ የሺፎን ሀበሻ ቀሚስ',
    nameEn: 'Lightweight Flowing Chiffon Kemis',
    nameTi: 'ቀሊል ዘመናዊ ሺፎን ሓበሻ ቀሚሽ',
    categoryGroup: 'heritage_fabrics',
    hashtags: ['#ሺፎን_እና_ቻይና', '#የልዩ_ዝግጅት'],
    fabricAm: 'ቀላል ጥራት ያለው ሺፎን ጨርቅ ከባህላዊ ጥልፍ ጋር',
    fabricEn: 'Premium Breathable Chiffon with Cultural Embroidery',
    fabricTi: 'ቀሊል ጽሩይ ሺፎን ምስ ባህላዊ ጥልፊ',
    priceETB: 16500,
    originalPriceETB: 19000,
    image: imgChiffon,
    descriptionAm: 'ቀላል እና ምቹ የሆነ ለቡና ቁርስ፣ ለልደት እና ለተለያዩ ክብረ በዓላት የሚለበስ ማራኪ የሺፎን ቀሚስ።',
    descriptionEn: 'Breezy and modern silhouette crafted from high-grade silk chiffon, adorned with classic Ethiopian borders.',
    descriptionTi: 'ቀሊልን ምቹእን ዝኾነ ናይ ሺፎን ቀሚሽ ንዝኾነ በዓላት።',
    inStock: true,
    tailoringDays: 2,
    featured: false,
    bestSeller: true,
  },
  {
    id: 'prod-seed-5',
    code: 'AH-1127',
    nameAm: 'ደማቅ ቢጫ እና ወርቅ ጥልፍ ሀበሻ ቀሚስ',
    nameEn: 'Sunburst Yellow & Gold Tilf Habesha Kemis',
    nameTi: 'ብሩህ ብጫን ወርቅን ጥልፊ ሓበሻ ቀሚሽ',
    categoryGroup: 'events',
    hashtags: ['#የእንቁጣጣሽ_ልብስ', '#የአክሱም_ፈተል'],
    fabricAm: '100% ንጹህ ፈተል ጥጥ ከቢጫ ጥልፍ ጋር',
    fabricEn: '100% Pure Handspun Cotton with Sunburst Yellow Silk',
    fabricTi: '100% ጽሩይ ፈተል ምስ ብጫ ጥልፊ',
    priceETB: 19500,
    originalPriceETB: 23000,
    image: imgAshenda,
    descriptionAm: 'ለአሸንዳ፣ ለእሸት እና ለእንቁጣጣሽ በዓላት ተመራጭ የሆነ ደማቅ ቢጫ እና የወርቅ ፈተል ጥልፍ ያረፈበት ባህላዊ ቀሚስ።',
    descriptionEn: 'Radiant yellow holiday kemis with intricate chest and hem embroidery, celebrated during Enkutatash & Ashenda.',
    descriptionTi: 'ንእንቁጣጣሽን ኣሸንዳን ዝኸውን ብሩህ ብጫ ባህላዊ ቀሚሽ።',
    inStock: true,
    tailoringDays: 3,
    featured: true,
    bestSeller: false,
    badge: 'አዲስ'
  },
  {
    id: 'prod-seed-6',
    code: 'AH-4001',
    nameAm: 'የወንዶች ባህላዊ ልብስ (ጃኬት እና ሱሪ)',
    nameEn: "Men's Regal Habesha Tunic & Pant Set",
    nameTi: 'ናይ ወዲ ተባዕታይ ባህላዊ ክዳን',
    categoryGroup: 'men_couples',
    hashtags: ['#የወንድ_ባህላዊ_ልብስ'],
    fabricAm: 'ንጹህ ፈተል ጥጥ ከወርቅ አንገትጌ ጥበብ ጋር',
    fabricEn: 'Pure Handspun Cotton with Royal Embroidered Collar',
    fabricTi: 'ጽሩይ ፈተል ጥጥ ምስ ስሉጥ አንገት ጥበብ',
    priceETB: 17000,
    originalPriceETB: 20000,
    image: imgMens,
    descriptionAm: 'በጥንቃቄ የተሰፋ የወንድ ባህላዊ ጃኬት እና ሱሪ ከነጠላ ጋር፣ ለሰርግ እና ለበዓላት ሙሉ ግርማ የሚያላብስ።',
    descriptionEn: 'Distinguished cultural menswear complete with high mandarin collar, chest tilf needlework and coordinating gabi.',
    descriptionTi: 'ጽሩይ ዝተሰፈየ ናይ ወዲ ተባዕታይ ባህላዊ ክዳን።',
    inStock: true,
    tailoringDays: 3,
    featured: false,
    bestSeller: true,
  }
];
