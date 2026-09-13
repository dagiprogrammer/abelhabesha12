import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Clock, 
  ShoppingBag,
  Scissors,
  ShieldCheck,
  Truck,
  Phone,
  MessageCircle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Product, Language, CategoryGroupId } from '../types';
import { ProductCard } from './ProductCard';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';

interface HomePageProps {
  products: Product[];
  currency: 'ETB' | 'USD';
  language: Language;
  onExploreCatalog: () => void;
  onOpenCustomOrder: () => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
  onSelectCategoryTag: (tag: string) => void;
  onNavigateAbout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  currency,
  language,
  onExploreCatalog,
  onOpenCustomOrder,
  onSelectProduct,
  onSelectCategoryTag,
}) => {
  const t = getTranslation(language);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter categories
  const categories = [
    { id: 'all', labelAm: 'ሁሉም አልባሳት', labelEn: 'All Attires', tag: null },
    { id: 'wedding', labelAm: 'የሰርግ ልብስ', labelEn: 'Wedding Dresses', tag: '#የሰርግ_ልብስ' },
    { id: 'meles', labelAm: 'የመልስ ልብስ', labelEn: 'Meles Gowns', tag: '#የመልስ_ልብስ' },
    { id: 'couples', labelAm: 'የጥንድ ልብስ', labelEn: 'Couple Sets', tag: '#የጥንድ_ልብስ' },
    { id: 'chiffon', labelAm: 'ሺፎን እና ጥልፍ', labelEn: 'Chiffon & Embroidery', tag: '#ሺፎን_እና_ቻይና' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'all') return true;
    const cat = categories.find((c) => c.id === selectedFilter);
    if (!cat || !cat.tag) return true;
    return p.hashtags?.some((h) => h.toLowerCase().includes(cat.tag.toLowerCase().replace('#', '')));
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      
      {/* Top E-Commerce Service Perks Bar */}
      <div className="bg-[#2D241E] text-white py-3 border-b border-[#EAD8C0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="flex items-center justify-center gap-1.5 text-stone-200">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-semibold">{language === 'am' ? '100% ንጹህ የሺሮሜዳ ጥበብ' : '100% Handspun Cotton'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-stone-200">
              <Scissors className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-semibold">{language === 'am' ? 'በልክ የሚሰፋ (Custom Fit)' : 'Tailored to Measurement'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-stone-200">
              <Truck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-semibold">{language === 'am' ? 'በአዲስ አበባ እና በውጭ ሀገር' : 'Worldwide Express Delivery'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-stone-200">
              <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-semibold">{language === 'am' ? 'ቀጥታ ትዕዛዝ በዋትስአፕ' : 'Direct WhatsApp Orders'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Occasion / Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[#EAD8C0]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(cat.id);
                    if (cat.tag) onSelectCategoryTag(cat.tag);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'bg-white text-[#2D241E] border border-[#EAD8C0] hover:border-[#8B0000]'
                  }`}
                >
                  {language === 'am' ? cat.labelAm : cat.labelEn}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-stone-500 font-semibold">
            {filteredProducts.length} {language === 'am' ? 'ልብሶች ተገኝተዋል' : 'Items available'}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                currency={currency}
                language={language}
                onSelectProduct={onSelectProduct}
                onAddToCart={onSelectProduct}
                onTagClick={onSelectCategoryTag}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EAD8C0] p-10 sm:p-16 text-center max-w-xl mx-auto my-8 shadow-xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F9F4EC] text-[#8B0000] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2D241E]">
              {language === 'am' ? 'ምርቶች በቅርቡ ይጨመራሉ' : 'Ready for Products'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {language === 'am' 
                ? 'በአድሚን ገጽ በኩል እውነተኛ የልብስ ፎቶዎችን እና ዋጋዎችን ማከል ይችላሉ። በዋትስአፕ ማዘዝ ይችላሉ።' 
                : 'Upload real product photos with multiple angles and prices via the Admin page. Customers can also order bespoke dresses directly on WhatsApp.'}
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'am' ? 'በዋትስአፕ ያማክሩ' : 'Chat on WhatsApp'}</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6e0000] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'am' ? 'ይደውሉልን' : 'Call Atelier'}</span>
              </a>
            </div>
          </div>
        )}

        {/* Custom Tailoring Direct Ordering Bar */}
        <div className="mt-14 rounded-3xl bg-linear-to-r from-[#2D241E] to-[#1a1410] text-white p-6 sm:p-10 border border-[#EAD8C0]/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B0000] text-white text-[11px] font-bold uppercase tracking-wider">
                <Scissors className="w-3.5 h-3.5" />
                <span>{language === 'am' ? 'የግል ስፌት ትዕዛዝ' : 'Custom Tailoring Service'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {language === 'am' 
                  ? 'የሚፈልጉትን የልብስ ዲዛይን ፎቶ ልከው በልክዎ ያሰፉ' 
                  : 'Have a dream dress design? Tailor it to your exact measurements.'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                {language === 'am'
                  ? 'ለሰርግ፣ ለክርስትና ወይም ለየትኛውም ክብረ በዓል የሚፈልጉትን የጥልፍ ዲዛይን ፎቶ በዋትስአፕ ይላኩልን፤ በሺሮሜዳ ባለሙያዎች በጥራት ሰፍተን እናደርሳለን።'
                  : 'Send any photo or sketch via WhatsApp or Telegram. Our master weavers in Shiromeda will craft it with handspun cotton and custom embroidery.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Abel Habesha, I want to order a custom tailored traditional attire. Here is my design request:')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'am' ? 'ዲዛይን በዋትስአፕ ላክ' : 'Send Design on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="py-3.5 px-5 rounded-xl bg-white hover:bg-stone-100 text-[#2D241E] font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#8B0000]" />
                <span>{language === 'am' ? 'አሁን ይደውሉ (+251 913 312 314)' : 'Call Direct: +251 913 312 314'}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
