import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  Check, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  Search,
  Tag,
  Eye,
  LogOut,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  Upload,
  RotateCcw
} from 'lucide-react';
import { Product, Language, CategoryGroupId } from '../types';
import { DEFAULT_PRODUCT_IMAGE } from '../data/products';
import { 
  saveProductToFirestore, 
  deleteProductFromFirestore,
  clearAllProductsFromFirestore 
} from '../lib/productsService';
import { getTranslation } from '../data/translations';

interface AdminPanelProps {
  products: Product[];
  language: Language;
  onClose: () => void;
  onLogout?: () => void;
}

const COMMON_HASHTAGS = [
  '#የሰርግ_ልብስ',
  '#የመልስ_ልብስ',
  '#የሺፎን_ቀሚስ',
  '#ጥልፍ',
  '#ጥንድ_ልብስ',
  '#የወንዶች_ልብስ',
  '#አክሱም_ፈተል',
  '#የጎንደር_ጥበብ',
  '#የራያ_ልብስ',
  '#የቡና_ቀሚስ',
  '#እጅ_ጥልፍ',
  '#አዲስ_ፋሽን'
];

interface AttireTemplate {
  labelAm: string;
  labelEn: string;
  data: Partial<Product>;
}

// Fast text metadata templates (no artificial test images)
const ATTIRE_TEMPLATES: AttireTemplate[] = [
  {
    labelAm: 'የሰርግ ሀበሻ ቀሚስ',
    labelEn: 'Bridal Kemis',
    data: {
      nameAm: 'ሮያል የወርቅ ጥልፍ የሰርግ ሀበሻ ቀሚስ',
      nameEn: 'Royal Gold Filigree Bridal Habesha Kemis',
      nameTi: 'ሮያል ናይ ወርቂ ጥልፊ መርዓ ሓበሻ ቀሚሽ',
      categoryGroup: 'events',
      hashtags: ['#የሰርግ_ልብስ', '#ጥልፍ', '#አክሱም_ፈተል'],
      fabricAm: '100% ንጹህ የአክሱም ፈተል ከወርቅ ጥልፍ ጋር',
      fabricEn: '100% Pure Handspun Axum Cotton with Gold Tibeb',
      fabricTi: '100% ጽሩይ ናይ ኣኽሱም ፈተል ምስ ወርቂ ጥልፊ',
      priceETB: 28000,
      originalPriceETB: 32000,
      descriptionAm: 'በሺሮሜዳ የሽመና ጠበብቶች የተፈተለና የተሸመነ፣ በወርቅ ጥልፍ ያሸበረቀ የሰርግ እና የመልስ ልዩ የክብር ቀሚስ ከመDouble-Netela ጋር።',
      descriptionEn: 'Masterfully woven on traditional wooden looms in Shiromeda with exquisite gold filigree needlework and matching double-fringe Netela.',
      descriptionTi: 'ኣብ ሽሮሜዳ ብክኢላታት ዝተፈተለን ዝተሸለመን፣ ብወርቂ ጥልፊ ዝተሰለመ ናይ መርዓ ኽዳውንቲ።',
      inStock: true,
      tailoringDays: 3,
      featured: true,
      bestSeller: true,
      badge: 'አዲስ'
    }
  },
  {
    labelAm: 'የመልስ ንጉሳዊ ዙሪያ',
    labelEn: 'Royal Meles Zuria',
    data: {
      nameAm: 'ሮያል የወርቅ እና ኤመራልድ መልስ ዙሪያ',
      nameEn: 'Royal Emerald & Gold Meles Zuria Gown',
      nameTi: 'ሮያል ናይ ወርቅን ኤመራልድን መልሲ ዙርያ',
      categoryGroup: 'events',
      hashtags: ['#የመልስ_ልብስ', '#የንግስት_ሳባ_ጥበብ'],
      fabricAm: 'ንጹህ የሸዋ ጥጥ ከኤመራልድ አረንጓዴ እና ወርቅ ጥልፍ',
      fabricEn: 'Pure Shewa Cotton with Emerald Green & Gold Trim',
      fabricTi: 'ጽሩይ ናይ ሸዋ ጡጥ ምስ ኤመራልድን ወርቅን ጥልፊ',
      priceETB: 23500,
      originalPriceETB: 26000,
      descriptionAm: 'ለመልስ እና ለልዩ ክብረ-በዓላት የሚሆን የንጉሳዊ ቤተሰብ አይነት የዙሪያ ቀሚስ ከባለ ሁለት ድርብ ነጠላ ጋር።',
      descriptionEn: 'Regal Meles gown tailored with vibrant emerald and golden threads, offering supreme drape and timeless poise.',
      descriptionTi: 'ንመልሲን ንክብረ-በዓላትን ዝኸውን ናይ ንጉሳዊ ስድራ ዝመስል ዙርያ ቀሚሽ።',
      inStock: true,
      tailoringDays: 4,
      featured: true,
      bestSeller: true,
      badge: 'ተወዳጅ'
    }
  },
  {
    labelAm: 'የጥንድ ባህላዊ ልብስ',
    labelEn: 'Matching Couple Set',
    data: {
      nameAm: 'የጥንድ ፍቅር ባህላዊ ልብስ (ሙሉ ስብስብ)',
      nameEn: 'Eternal Harmony Couple Matching Habesha Set',
      nameTi: 'ናይ ጽምዲ ባህላዊ ክዳውንቲ (ምሉእ ስብስብ)',
      categoryGroup: 'men_couples',
      hashtags: ['#ጥንድ_ልብስ', '#የሰርግ_ልብስ'],
      fabricAm: 'ተዛማጅ ንጹህ ጥጥ ከጥቁር እና ወርቅ ጥበብ',
      fabricEn: 'Harmonized Fine Woven Cotton with Black & Gold Tibeb',
      fabricTi: 'ተመሳሳሊ ጽሩይ ጡጥ ምስ ጸሊምን ወርቅን ጥበብ',
      priceETB: 36000,
      originalPriceETB: 42000,
      descriptionAm: 'ለሙሽሮች እና ለጥንዶች የተዘጋጀ ሙሉ ተዛማጅ የሀበሻ ልብስ ስብስብ። የሴት ቀሚስ ከነጠላ እና የወንድ ሸሚዝ ከኩታ ጋር።',
      descriptionEn: 'Complementary his-and-hers bridal set featuring harmonious geometric embroidery motifs on lightweight virgin cotton.',
      descriptionTi: 'ንመመረቕትን ንመርዓውያንን ዝተዳለወ ተመሳሳሊ ናይ ሓበሻ ክዳውንቲ።',
      inStock: true,
      tailoringDays: 5,
      featured: true,
      bestSeller: true,
      badge: 'ጥንድ ስብስብ'
    }
  },
  {
    labelAm: 'የወንዶች ባህላዊ ልብስ',
    labelEn: "Men's Cultural Suit",
    data: {
      nameAm: 'የወንዶች ንጹህ ጥጥ ሸሚዝ እና ኩታ',
      nameEn: "Men's Handwoven Shirt & Royal Kuta Set",
      nameTi: 'ናይ ሰብኡት ጽሩይ ጡጥ ሸሚዝን ኩታን',
      categoryGroup: 'men_couples',
      hashtags: ['#የወንዶች_ልብስ', '#አክሱም_ፈተል'],
      fabricAm: '100% ንጹህ የእጅ ፈተል ከወርቅ ጥበብ ኩታ ጋር',
      fabricEn: '100% Handspun Cotton with Gold Geometric Border Kuta',
      fabricTi: '100% ናይ ኢድ ፈተል ምስ ወርቂ ጥበብ ኩታ',
      priceETB: 14500,
      originalPriceETB: 16500,
      descriptionAm: 'ለሰርግ፣ ለመልስ እና ለበዓላት የሚሆን የወንዶች ዘመናዊ ቆራጭ ሸሚዝ ከባህላዊ የክብር ኩታ ጋር።',
      descriptionEn: 'Crisp contemporary Habesha cut men shirt accompanied by a substantial ceremonial woven Kuta with gold tibeb hem.',
      descriptionTi: 'ንመርዓን ንበዓላትን ዝኸውን ናይ ሰብኡት ዘመናዊ ሸሚዝ ምስ ባህላዊ ኩታ።',
      inStock: true,
      tailoringDays: 2,
      featured: false,
      bestSeller: false,
      badge: 'የወንዶች'
    }
  },
  {
    labelAm: 'ዘመናዊ የሺፎን ቀሚስ',
    labelEn: 'Chiffon Kemis',
    data: {
      nameAm: 'ቀለል ያለ ዘመናዊ የሺፎን ሀበሻ ቀሚስ',
      nameEn: 'Breezy Chiffon Festive Kemis with Netela',
      nameTi: 'ቀሊል ዘመናዊ ናይ ሺፎን ሓበሻ ቀሚሽ',
      categoryGroup: 'heritage_fabrics',
      hashtags: ['#የሺፎን_ቀሚስ', '#አዲስ_ፋሽን'],
      fabricAm: 'ፕሪሚየም የፈረንሳይ ሺፎን ከሀበሻ ጥልፍ ጋር',
      fabricEn: 'Premium Airy Chiffon with Hand-finished Ethiopian Borders',
      fabricTi: 'ፕሪሚየም ናይ ፈረንሳይ ሺፎን ምስ ናይ ሓበሻ ጥልፊ',
      priceETB: 18500,
      originalPriceETB: 21000,
      descriptionAm: 'በጣም ቀለል ያለ፣ ለመንቀሳቀስ ምቹ የሆነ ዘመናዊ የሺፎን ቀሚስ ለምርቃት፣ ለልደት እና ለደስታ ቀናት።',
      descriptionEn: 'Featherlight modern chiffon gown engineered for graceful movement, featuring woven neck accents and fine scarf.',
      descriptionTi: 'ቀሊልን ንምንቅስቓስ ምቹእን ዝኾነ ናይ ሺፎን ቀሚሽ ንምረቓን በዓላትን።',
      inStock: true,
      tailoringDays: 2,
      featured: false,
      bestSeller: true,
      badge: 'ሺፎን'
    }
  }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  language,
  onClose,
  onLogout,
}) => {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [customTagInput, setCustomTagInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Table search & filters
  const [searchFilter, setSearchFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState<CategoryGroupId>('all');

  // Confirmation modals
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const t = getTranslation(language);

  // Initialize a fresh new product form
  const handleStartNew = () => {
    setIsNew(true);
    const randomCode = `AH-${Math.floor(1000 + Math.random() * 9000)}`;
    setEditingProduct({
      id: `prod-${Date.now()}`,
      code: randomCode,
      nameAm: '',
      nameEn: '',
      nameTi: '',
      categoryGroup: 'events',
      hashtags: ['#የሰርግ_ልብስ', '#ጥልፍ'],
      fabricAm: '100% ንጹህ የአክሱም ፈተል',
      fabricEn: '100% Pure Handspun Axum Cotton',
      fabricTi: '100% ጽሩይ ናይ ኣኽሱም ፈተል',
      priceETB: 24000,
      originalPriceETB: 27500,
      image: '',
      secondaryImages: [],
      descriptionAm: 'በሺሮሜዳ በባለሙያዎች የተሸመነ እውነተኛ ባህላዊ አልባሳት።',
      descriptionEn: 'Handcrafted in Shiromeda with intricate embroidery and matching netela.',
      descriptionTi: 'ኣብ ሽሮሜዳ ብክኢላታት ዝተፈተለን ዝተሰፈየን ባህላዊ ክዳን።',
      inStock: true,
      tailoringDays: 3,
      featured: true,
      bestSeller: false,
      badge: 'አዲስ'
    });
  };

  const handleApplyTemplate = (tpl: AttireTemplate) => {
    if (!editingProduct) return;
    setEditingProduct((prev) => ({
      ...prev,
      ...tpl.data,
      id: prev?.id || `prod-${Date.now()}`,
      code: prev?.code || `AH-${Math.floor(1000 + Math.random() * 9000)}`,
      // Retain existing image if user already uploaded or provided one
      image: prev?.image || '',
      secondaryImages: prev?.secondaryImages || []
    }));
  };

  const handleStartEdit = (prod: Product) => {
    setIsNew(false);
    setEditingProduct({ ...prod });
  };

  const handleToggleTag = (tag: string) => {
    if (!editingProduct) return;
    const currentTags = editingProduct.hashtags || [];
    if (currentTags.includes(tag)) {
      setEditingProduct({
        ...editingProduct,
        hashtags: currentTags.filter((t) => t !== tag)
      });
    } else {
      setEditingProduct({
        ...editingProduct,
        hashtags: [...currentTags, tag]
      });
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!customTagInput.trim() || !editingProduct) return;
    
    let formattedTag = customTagInput.trim();
    if (!formattedTag.startsWith('#')) formattedTag = `#${formattedTag}`;
    
    const currentTags = editingProduct.hashtags || [];
    if (!currentTags.includes(formattedTag)) {
      setEditingProduct({
        ...editingProduct,
        hashtags: [...currentTags, formattedTag]
      });
    }
    setCustomTagInput('');
  };

  // Helper to resize and compress image to high-quality JPEG for Firestore storage
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
            resolve(dataUrl);
          } else {
            reject(new Error('Canvas context failed'));
          }
        };
        img.onerror = () => reject(new Error('Image failed to load'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsDataURL(file);
    });
  };

  // Upload multiple photos from device/camera with canvas optimization (up to 5 total)
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProduct) return;

    try {
      const currentImages = [editingProduct.image, ...(editingProduct.secondaryImages || [])].filter(Boolean);
      const remainingSlots = Math.max(0, 5 - currentImages.length);

      if (remainingSlots <= 0) {
        setStatusMessage({
          type: 'error',
          text: 'Maximum 5 photos allowed per attire. Please remove a photo before adding a new one.'
        });
        return;
      }

      const fileList = Array.from(files) as File[];
      const filesToProcess = fileList.slice(0, remainingSlots);
      const processedDataUrls: string[] = [];

      for (const file of filesToProcess) {
        if (file.size > 10 * 1024 * 1024) continue;
        const dataUrl = await processImageFile(file);
        processedDataUrls.push(dataUrl);
      }

      if (processedDataUrls.length > 0) {
        const allNewImages = [...currentImages, ...processedDataUrls];
        const [primary, ...secondary] = allNewImages;
        setEditingProduct({
          ...editingProduct,
          image: primary || '',
          secondaryImages: secondary.slice(0, 4)
        });
        setStatusMessage({
          type: 'success',
          text: `✓ Added ${processedDataUrls.length} photo(s). Total: ${allNewImages.length} of 5 photos loaded!`
        });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to process images. Please try again with valid image files.'
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim() || !editingProduct) return;
    const currentImages = [editingProduct.image, ...(editingProduct.secondaryImages || [])].filter(Boolean);
    if (currentImages.length >= 5) {
      setStatusMessage({
        type: 'error',
        text: 'Maximum 5 photos allowed. Remove a photo first.'
      });
      return;
    }
    const allImages = [...currentImages, imageUrlInput.trim()];
    const [primary, ...secondary] = allImages;
    setEditingProduct({
      ...editingProduct,
      image: primary || '',
      secondaryImages: secondary.slice(0, 4)
    });
    setImageUrlInput('');
    setStatusMessage({
      type: 'success',
      text: '✓ Photo URL added to gallery!'
    });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleRemovePhoto = (index: number) => {
    if (!editingProduct) return;
    const currentImages = [editingProduct.image, ...(editingProduct.secondaryImages || [])].filter(Boolean);
    const updated = currentImages.filter((_, i) => i !== index);
    const [primary, ...secondary] = updated;
    setEditingProduct({
      ...editingProduct,
      image: primary || '',
      secondaryImages: secondary || []
    });
  };

  const handleSetPrimaryPhoto = (index: number) => {
    if (!editingProduct || index === 0) return;
    const currentImages = [editingProduct.image, ...(editingProduct.secondaryImages || [])].filter(Boolean);
    const selected = currentImages[index];
    const rest = currentImages.filter((_, i) => i !== index);
    setEditingProduct({
      ...editingProduct,
      image: selected,
      secondaryImages: rest
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.nameAm?.trim() || !editingProduct.nameEn?.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide both Amharic and English names for the product.'
      });
      return;
    }

    if (!editingProduct.priceETB || editingProduct.priceETB <= 0) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid price in ETB.'
      });
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    try {
      const saved = await saveProductToFirestore(editingProduct as Product);
      setStatusMessage({
        type: 'success',
        text: `✓ Product "${saved.nameEn}" (${saved.code}) saved successfully to Firebase Firestore!`
      });
      setTimeout(() => setStatusMessage(null), 4500);
      setEditingProduct(null);
    } catch (err: any) {
      console.error('Save error:', err);
      setStatusMessage({
        type: 'error',
        text: `Error saving to database: ${err.message || String(err)}`
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setSaving(true);
    try {
      await deleteProductFromFirestore(productToDelete.id);
      setStatusMessage({
        type: 'success',
        text: `✓ Product ${productToDelete.code} removed from catalog.`
      });
      setTimeout(() => setStatusMessage(null), 3500);
      setProductToDelete(null);
      if (editingProduct?.id === productToDelete.id) {
        setEditingProduct(null);
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      setStatusMessage({
        type: 'error',
        text: `Error deleting: ${err.message || String(err)}`
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmClearAll = async () => {
    setShowClearConfirm(false);
    setSaving(true);
    setStatusMessage(null);
    try {
      await clearAllProductsFromFirestore();
      setStatusMessage({
        type: 'success',
        text: '✓ All test products removed from Firebase Firestore. Your store catalog is clean!'
      });
      setTimeout(() => setStatusMessage(null), 5000);
      setEditingProduct(null);
    } catch (err: any) {
      console.error('Clear products error:', err);
      setStatusMessage({
        type: 'error',
        text: `Error clearing products: ${err.message || String(err)}`
      });
    } finally {
      setSaving(false);
    }
  };

  // Filter products for the table
  const filteredProducts = products.filter((p) => {
    const matchesGroup = groupFilter === 'all' || p.categoryGroup === groupFilter;
    const query = searchFilter.toLowerCase().trim();
    if (!query) return matchesGroup;

    const matchesSearch = 
      p.code?.toLowerCase().includes(query) ||
      p.nameAm?.toLowerCase().includes(query) ||
      p.nameEn?.toLowerCase().includes(query) ||
      p.hashtags?.some((h) => h.toLowerCase().includes(query));

    return matchesGroup && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D241E] pb-24">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAD8C0] px-4 sm:px-8 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl text-stone-500 hover:text-[#8B0000] hover:bg-[#F9F4EC] transition-colors cursor-pointer"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-serif font-bold text-lg text-[#2D241E] tracking-tight">
                  Abel Habesha Admin
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-[#8B0000]/10 text-[#8B0000]">
                  Live Store Manager
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Firestore Realtime Database Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#EAD8C0] hover:border-[#8B0000] text-xs font-bold text-[#2D241E] hover:text-[#8B0000] transition-colors cursor-pointer"
            >
              View Storefront
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 text-stone-400 hover:text-[#8B0000] rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EAD8C0]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
              <span>{t.adminPanelTitle}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#8B0000] text-white font-mono font-normal">
                {products.length} Products
              </span>
            </h1>
            <p className="text-xs text-[#2D241E]/70 mt-0.5">
              Manage your real Habesha attires, upload authentic photographs, and set prices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {products.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                disabled={saving}
                className="px-3.5 py-2 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
                title="Wipe test products from database"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Wipe Test Products</span>
              </button>
            )}

            <button
              onClick={handleStartNew}
              disabled={saving}
              className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addProductBtn}</span>
            </button>
          </div>
        </div>

        {/* Global Status Message Toast */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold transition-all shadow-sm ${
            statusMessage.type === 'success'
              ? 'bg-[#2E4739]/10 border border-[#2E4739]/30 text-[#2E4739]'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-700" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            )}
            <div className="flex-1">{statusMessage.text}</div>
            <button 
              onClick={() => setStatusMessage(null)}
              className="text-stone-400 hover:text-stone-700 text-base leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Product Editor Form Modal/Drawer */}
        {editingProduct && (
          <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAD8C0] shadow-xl relative animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAD8C0]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#8B0000]/10 text-[#8B0000]">
                  {isNew ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D241E]">
                    {isNew ? 'Upload New Habesha Attire' : `Edit Attire: ${editingProduct.nameEn || editingProduct.code}`}
                  </h2>
                  <p className="text-[11px] text-stone-500">
                    {isNew ? 'Enter details and upload real photos from your phone or workshop.' : 'Updates will reflect live across the store immediately.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-stone-400 hover:text-black rounded-xl hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Template Presets for Fast Metadata Entry */}
            <div className="mb-6 p-4 bg-[#F9F4EC]/60 rounded-2xl border border-[#EAD8C0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Autofill Descriptions & Details (ፈጣን ሞዴል መሙያ):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ATTIRE_TEMPLATES.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    className="px-3 py-1.5 bg-white hover:bg-[#8B0000] hover:text-white text-[#2D241E] border border-[#EAD8C0] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>✦</span>
                    <span>{tpl.labelAm} ({tpl.labelEn})</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Product Code & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Product Code (የምርት ኮድ) <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.code || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
                    placeholder="AH-1045"
                    className="w-full text-xs font-mono font-bold p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Price in ETB (ዋጋ በብር) <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={editingProduct.priceETB || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceETB: Number(e.target.value) })}
                    placeholder="25000"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 text-[#8B0000]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Original Price (የቀድሞ ዋጋ - ለቅናሽ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={editingProduct.originalPriceETB || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPriceETB: Number(e.target.value) })}
                    placeholder="29000"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>
              </div>

              {/* Names in 3 Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Name (አማርኛ) <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameAm || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameAm: e.target.value })}
                    placeholder="የሰርግ ሀበሻ ቀሚስ"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 font-ethiopic"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Name (English) <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })}
                    placeholder="Bridal Habesha Kemis"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Name (ትግርኛ)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.nameTi || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameTi: e.target.value })}
                    placeholder="ናይ መርዓ ሓበሻ ቀሚሽ"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 font-ethiopic"
                  />
                </div>
              </div>

              {/* REAL PRODUCT IMAGE UPLOAD & GALLERY SECTION (4-5 Photos) */}
              {(() => {
                const currentImages = [editingProduct.image, ...(editingProduct.secondaryImages || [])].filter(Boolean);
                const hasMaxImages = currentImages.length >= 5;

                return (
                  <div className="p-5 bg-[#F9F4EC]/60 rounded-2xl border border-[#EAD8C0] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#8B0000]/10 text-[#8B0000]">
                          <ImageIcon className="w-4 h-4" />
                        </span>
                        <div>
                          <label className="text-xs font-bold text-[#2D241E] block">
                            Product Photo Gallery (የምርት ፎቶ ማሳያ - እስከ 5 ፎቶዎች)
                          </label>
                          <span className="text-[11px] text-stone-500">
                            Upload 4-5 real photos showing different angles (Front, Back, Embroidery, Netela)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          currentImages.length >= 4 
                            ? 'bg-[#2E4739]/10 text-[#2E4739]' 
                            : currentImages.length > 0 
                            ? 'bg-[#C5A059]/15 text-[#8c6c2e]' 
                            : 'bg-stone-200 text-stone-600'
                        }`}>
                          {currentImages.length} / 5 Photos
                        </span>
                      </div>
                    </div>

                    {/* Upload Controls Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      {/* File Upload Trigger */}
                      <div className="md:col-span-7">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          multiple
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />

                        <button
                          type="button"
                          disabled={hasMaxImages}
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full p-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-3 cursor-pointer ${
                            hasMaxImages 
                              ? 'bg-stone-100 border-stone-300 text-stone-400 cursor-not-allowed'
                              : 'bg-white border-[#EAD8C0] hover:border-[#8B0000] text-[#2D241E] hover:text-[#8B0000]'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-full bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center shrink-0">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold">
                              {hasMaxImages ? 'Maximum 5 photos reached' : 'Select photos from Phone / Computer'}
                            </p>
                            <p className="text-[10px] text-stone-500">
                              Select multiple files at once. Auto-optimized for instant fast loading.
                            </p>
                          </div>
                        </button>
                      </div>

                      {/* URL input */}
                      <div className="md:col-span-5 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={imageUrlInput}
                            disabled={hasMaxImages}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddImageUrl();
                              }
                            }}
                            placeholder="Or paste photo URL..."
                            className="flex-1 text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white font-mono text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                          />
                          <button
                            type="button"
                            disabled={hasMaxImages || !imageUrlInput.trim()}
                            onClick={handleAddImageUrl}
                            className="px-3 py-2.5 bg-[#2D241E] hover:bg-[#8B0000] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-40 shrink-0"
                          >
                            Add
                          </button>
                        </div>
                        <span className="text-[10px] text-stone-500 mt-1 pl-1">
                          You can paste direct image links or data URLs
                        </span>
                      </div>
                    </div>

                    {/* Interactive Photos Gallery Grid */}
                    <div className="pt-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {currentImages.map((imgUrl, index) => {
                          const isPrimary = index === 0;

                          return (
                            <div 
                              key={index} 
                              className={`group relative rounded-2xl overflow-hidden aspect-4/5 bg-white border-2 shadow-xs transition-all ${
                                isPrimary 
                                  ? 'border-[#8B0000] ring-2 ring-[#8B0000]/20' 
                                  : 'border-[#EAD8C0] hover:border-[#8B0000]'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Angle ${index + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                                }}
                              />

                              {/* Angle / Primary Badge */}
                              <div className="absolute top-2 left-2 pointer-events-none">
                                {isPrimary ? (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8B0000] text-white shadow-xs">
                                    ★ Cover Photo
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#2D241E]/80 text-white backdrop-blur-xs">
                                    Angle {index + 1}
                                  </span>
                                )}
                              </div>

                              {/* Hover / Actions Overlay */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                    className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
                                    title="Delete this photo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {!isPrimary && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetPrimaryPhoto(index)}
                                    className="w-full py-1.5 px-2 bg-white hover:bg-[#8B0000] text-[#2D241E] hover:text-white rounded-lg text-[10px] font-bold transition-colors shadow-xs"
                                  >
                                    Set as Cover
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Empty upload slot if less than 5 */}
                        {!hasMaxImages && (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-4/5 rounded-2xl border-2 border-dashed border-[#EAD8C0] hover:border-[#8B0000] bg-white/70 hover:bg-white flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                              <Plus className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold text-[#2D241E] group-hover:text-[#8B0000]">
                              + Add Photo
                            </span>
                            <span className="text-[9px] text-stone-400 mt-0.5">
                              Angle {currentImages.length + 1}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Category Group, Tailoring Days & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Category Group (የምድብ ቡድን) <span className="text-[#8B0000]">*</span>
                  </label>
                  <select
                    value={editingProduct.categoryGroup || 'events'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryGroup: e.target.value as any })}
                    className="w-full text-xs font-semibold p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  >
                    <option value="events">የሰርግ እና ዝግጅቶች (Weddings & Events)</option>
                    <option value="men_couples">የጥንድ እና የወንዶች (Couples & Men's Attire)</option>
                    <option value="heritage_fabrics">ባህላዊ ጨርቆች እና ሺፎን (Fabrics & Chiffon)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Tailoring Days (የስፌት ቀናት)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={editingProduct.tailoringDays || 3}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tailoringDays: Number(e.target.value) })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Badge Label (መለያ ፅሁፍ)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="አዲስ / ተወዳጅ / ሮያል"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>
              </div>

              {/* Fabric Details in 3 Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">Fabric (አማርኛ)</label>
                  <input
                    type="text"
                    value={editingProduct.fabricAm || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fabricAm: e.target.value })}
                    placeholder="100% ንጹህ የአክሱም ፈተል"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">Fabric (English)</label>
                  <input
                    type="text"
                    value={editingProduct.fabricEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fabricEn: e.target.value })}
                    placeholder="100% Pure Handspun Axum Cotton"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">Fabric (ትግርኛ)</label>
                  <input
                    type="text"
                    value={editingProduct.fabricTi || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fabricTi: e.target.value })}
                    placeholder="100% ጽሩይ ናይ ኣኽሱም ፈተል"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Hashtag Management */}
              <div>
                <label className="text-xs font-bold text-[#2D241E] block mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>Hashtags (ሃሽታጎች) - Click to toggle:</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {COMMON_HASHTAGS.map((tag) => {
                    const isSelected = editingProduct.hashtags?.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#8B0000] text-white shadow-2xs' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {tag} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hashtag input */}
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={handleAddCustomTag}
                    placeholder="Add custom hashtag (e.g. #የጎንደር_ጥበብ)"
                    className="flex-1 text-xs p-2 rounded-xl border border-[#EAD8C0] bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="px-3 py-2 bg-[#2D241E] text-white text-xs font-bold rounded-xl hover:bg-[#8B0000] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Description in Amharic and English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Description (አማርኛ መግለጫ)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.descriptionAm || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descriptionAm: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none font-ethiopic"
                    placeholder="የአልባሳቱ ዝርዝር መግለጫ..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.descriptionEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                    placeholder="Product details, cut, embroidery, and care instructions..."
                  />
                </div>
              </div>

              {/* Flags: Featured, Bestseller, In Stock */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2D241E]">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] accent-[#8B0000]"
                  />
                  <span>Featured Product (ተመራጭ)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2D241E]">
                  <input
                    type="checkbox"
                    checked={editingProduct.bestSeller ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, bestSeller: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] accent-[#8B0000]"
                  />
                  <span>Bestseller (ምርጥ ሽያጭ)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2D241E]">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] accent-[#8B0000]"
                  />
                  <span>In Stock (ለማስፋት ዝግጁ)</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAD8C0]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl border border-[#EAD8C0] hover:bg-stone-100 text-xs font-bold text-stone-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving to Database...' : 'Save Habesha Attire'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Existing Products List Table */}
        <div className="bg-white rounded-3xl border border-[#EAD8C0] overflow-hidden shadow-xs">
          
          {/* Table Controls / Filter Bar */}
          <div className="p-4 sm:p-5 border-b border-[#EAD8C0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#F9F4EC]/40">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search products by code, name, or hashtag..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#EAD8C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchFilter && (
                  <button 
                    onClick={() => setSearchFilter('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500">Group:</span>
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value as any)}
                className="text-xs font-semibold px-3 py-2 bg-white border border-[#EAD8C0] rounded-xl"
              >
                <option value="all">All Categories ({products.length})</option>
                <option value="events">የሰርግ እና ዝግጅቶች (Events)</option>
                <option value="men_couples">የጥንድ እና የወንዶች (Couples & Men)</option>
                <option value="heritage_fabrics">ባህላዊ ጨርቆች እና ሺፎን (Heritage)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2D241E]">
              <thead className="bg-[#F9F4EC] text-[#2D241E] uppercase text-[10px] font-bold border-b border-[#EAD8C0]">
                <tr>
                  <th className="py-3.5 px-4">Photo</th>
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Attire Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (ETB)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAD8C0]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-stone-500">
                      <div className="max-w-sm mx-auto space-y-2">
                        <ImageIcon className="w-8 h-8 mx-auto text-stone-300" />
                        <p className="font-serif font-bold text-sm text-[#2D241E]">
                          No products found
                        </p>
                        <p className="text-xs text-stone-500">
                          Your database is clean and ready. Click "+ Add Habesha Attire" above to upload your first real dress!
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F9F4EC]/60 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={p.image || DEFAULT_PRODUCT_IMAGE}
                          alt={p.nameEn}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                          }}
                          className="w-12 h-14 object-cover object-top rounded-lg border border-[#EAD8C0] bg-stone-100"
                        />
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#8B0000]">
                        {p.code}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-bold text-[#2D241E] truncate">{p.nameEn}</div>
                        <div className="text-[11px] text-stone-500 font-ethiopic truncate">{p.nameAm}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F9F4EC] border border-[#EAD8C0] text-stone-700">
                          {p.categoryGroup}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#8B0000]">
                        {p.priceETB?.toLocaleString()} ETB
                      </td>
                      <td className="py-3 px-4">
                        {p.inStock ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Active
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[11px]">Inactive</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-[#8B0000] hover:bg-white border border-transparent hover:border-[#EAD8C0] transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(p)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* Delete Single Product Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-[#EAD8C0] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-[#2D241E]">
                Delete Product?
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Are you sure you want to permanently delete <strong className="text-[#8B0000]">{productToDelete.code} - {productToDelete.nameEn}</strong> from the database?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#EAD8C0] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={saving}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Test Products Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-[#EAD8C0] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-[#2D241E]">
                Clear All Test Products?
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                This will delete all test products from your Firebase Firestore database so you can start completely fresh with your real product catalog.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#EAD8C0] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearAll}
                disabled={saving}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Clearing...' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
