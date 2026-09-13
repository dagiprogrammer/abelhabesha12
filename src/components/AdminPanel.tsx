import React, { useState } from 'react';
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
  Database,
  ArrowLeft,
  Search,
  Tag,
  Eye,
  LogOut,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Product, Language, CategoryGroupId } from '../types';
import { IMAGE_PRESETS, PRODUCTS } from '../data/products';
import { 
  saveProductToFirestore, 
  deleteProductFromFirestore,
  seedProductsToFirestore 
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
      image: IMAGE_PRESETS[0].image,
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
      image: IMAGE_PRESETS[1].image,
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
      image: IMAGE_PRESETS[2].image,
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
      image: IMAGE_PRESETS[3].image,
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
      image: IMAGE_PRESETS[4].image,
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
  
  // Table search & filters
  const [searchFilter, setSearchFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState<CategoryGroupId>('all');

  // Confirmation modals (replaces raw window.confirm for iframe safety)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

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
      image: IMAGE_PRESETS[0].image,
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
      code: prev?.code || `AH-${Math.floor(1000 + Math.random() * 9000)}`
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

  const confirmSeedCatalog = async () => {
    setShowSeedConfirm(false);
    setSaving(true);
    setStatusMessage(null);
    try {
      const count = await seedProductsToFirestore(PRODUCTS);
      setStatusMessage({
        type: 'success',
        text: `✓ Successfully synced all ${count} authentic Shiromeda products to Firestore!`
      });
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err: any) {
      console.error('Seed catalog error:', err);
      setStatusMessage({
        type: 'error',
        text: `Error syncing catalog: ${err.message || String(err)}`
      });
    } finally {
      setSaving(false);
    }
  };

  // Filter products for the table
  const filteredProducts = products.filter((p) => {
    const matchesGroup = groupFilter === 'all' || p.categoryGroup === groupFilter;
    const query = searchFilter.toLowerCase().trim();
    const matchesSearch = !query || 
      p.code.toLowerCase().includes(query) ||
      p.nameAm.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      (p.nameTi && p.nameTi.toLowerCase().includes(query)) ||
      p.hashtags.some(tag => tag.toLowerCase().includes(query));
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#EAD8C0]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-[#8B0000] font-bold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront (መደብር)</span>
              </button>
              
              <span className="text-stone-300">|</span>
              
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2E4739] bg-[#2E4739]/10 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Firestore Live Sync Active</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
              <span>{t.adminPanelTitle}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#8B0000] text-white font-mono font-normal">
                {products.length} Products
              </span>
            </h1>
            <p className="text-xs text-[#2D241E]/70 mt-0.5">
              {t.adminPanelSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowSeedConfirm(true)}
              disabled={saving}
              className="px-3.5 py-2 bg-white hover:bg-[#F9F4EC] text-[#2D241E] border border-[#EAD8C0] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
              title="Populate or restore full Shiromeda catalog"
            >
              <Database className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Sync All Seed Products</span>
            </button>

            <button
              onClick={handleStartNew}
              disabled={saving}
              className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addProductBtn}</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 text-stone-500 hover:text-[#8B0000] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                title="Log Out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
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
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD / EDIT PRODUCT DRAWER / FORM */}
        {/* ============================================================ */}
        {editingProduct && (
          <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8B0000]/40 shadow-xl transition-all">
            
            {/* Form Top Title */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAD8C0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
                  {isNew ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2D241E]">
                    {isNew ? 'Add Real Habesha Attire to Catalog' : `Edit Attire: ${editingProduct.code}`}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Product is written directly into Firebase Firestore and updates the live store immediately.
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

            {/* Quick Template Presets for Fast Real Product Creation */}
            <div className="mb-6 p-4 bg-[#F9F4EC]/60 rounded-2xl border border-[#EAD8C0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Quick-Fill from Habesha Attire Templates (ፈጣን ሞዴል ይምረጡ):</span>
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

              {/* Attire Images: Preset Selector + Custom URL */}
              <div className="p-4 bg-[#F9F4EC]/40 rounded-2xl border border-[#EAD8C0]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#8B0000]" />
                    <span>Product Image: Select Preset or Paste High-Res Image URL</span>
                  </label>
                  <span className="text-[11px] text-stone-500">Shiromeda Catalog Presets</span>
                </div>

                {/* Visual Preset Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 mb-3">
                  {IMAGE_PRESETS.map((pst) => (
                    <button
                      key={pst.id}
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, image: pst.image })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        editingProduct.image === pst.image 
                          ? 'border-[#8B0000] ring-2 ring-[#8B0000]/40 scale-105 shadow-md z-10' 
                          : 'border-[#EAD8C0] opacity-75 hover:opacity-100 hover:border-stone-400'
                      }`}
                      title={pst.nameEn}
                    >
                      <img src={pst.image} alt={pst.nameEn} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[8px] truncate px-1 py-0.5 text-center">
                        {pst.nameAm}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom URL Input & Instant Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full flex-1">
                    <input
                      type="text"
                      required
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white font-mono text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                    />
                  </div>

                  {editingProduct.image && (
                    <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-xl border border-[#EAD8C0]">
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = IMAGE_PRESETS[0].image;
                        }}
                      />
                      <span className="text-[10px] text-stone-500 font-semibold pr-1">Image Preview</span>
                    </div>
                  )}
                </div>
              </div>

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
                    placeholder="አዲስ / ተወዳጅ / ልዩ"
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  />
                </div>
              </div>

              {/* Fabric Materials Details in 3 Languages */}
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
                    placeholder="በሺሮሜዳ በባለሙያዎች የተሸመነ እውነተኛ ባህላዊ አልባሳት..."
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D241E] block mb-1">
                    Description (English Details)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.descriptionEn || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })}
                    placeholder="Masterfully woven on traditional wooden looms in Shiromeda..."
                    className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Flags / Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 pb-2 border-t border-b border-[#EAD8C0]/60">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D241E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                  />
                  <span>In Stock (አሁን ዝግጁ ነው)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#2D241E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.bestSeller ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, bestSeller: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                  />
                  <span>Bestseller (በብዛት የተወደደ)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#2D241E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                  />
                  <span>Featured on Home Page (በመነሻ ገጽ ላይ አሳይ)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#EAD8C0] text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isNew ? 'Publish Real Product' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* CATALOG LIST & MANAGEMENT TABLE */}
        {/* ============================================================ */}
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
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      No products found matching your search. Click "+ Add Habesha Attire" above to create one.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F9F4EC]/60 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={p.image}
                          alt={p.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover object-top rounded-lg border border-[#EAD8C0] bg-stone-100"
                        />
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#8B0000]">
                        {p.code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#2D241E] font-ethiopic">{p.nameAm}</div>
                        <div className="text-[11px] text-stone-500">{p.nameEn}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.hashtags?.slice(0, 2).map((h) => (
                            <span key={h} className="text-[9px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                              {h}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">
                          {p.categoryGroup === 'events' ? 'Events' : p.categoryGroup === 'men_couples' ? 'Couples & Men' : 'Fabrics & Chiffon'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#8B0000]">
                        <div>{p.priceETB.toLocaleString()} ETB</div>
                        {p.originalPriceETB && (
                          <div className="text-[10px] text-stone-400 line-through">
                            {p.originalPriceETB.toLocaleString()} ETB
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col items-start gap-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.inStock ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.inStock ? 'In Stock' : 'Made to Order'}
                          </span>
                          {p.featured && (
                            <span className="text-[9px] text-[#C5A059] font-bold">★ Featured</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-1.5 rounded-lg text-stone-600 hover:bg-[#8B0000]/10 hover:text-[#8B0000] transition-colors cursor-pointer"
                            title="Edit product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(p)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
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

      </div>

      {/* ============================================================ */}
      {/* IN-APP CONFIRMATION MODALS (replaces window.confirm) */}
      {/* ============================================================ */}
      
      {/* Delete Confirmation Modal */}
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

      {/* Seed Catalog Confirmation Modal */}
      {showSeedConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-[#EAD8C0] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 text-[#8B0000] mx-auto flex items-center justify-center">
              <Database className="w-6 h-6 text-[#C5A059]" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-[#2D241E]">
                Sync Authentic Shiromeda Catalog
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                This will write all default handcrafted Habesha attires into your Firebase Firestore collection. Any products already there will be updated or preserved.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSeedConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#EAD8C0] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSeedCatalog}
                disabled={saving}
                className="flex-1 py-2.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Writing to Firestore...' : 'Sync Products'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
