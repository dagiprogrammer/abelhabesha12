import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Clock, 
  HeartHandshake, 
  ShoppingBag,
  Scissors
} from 'lucide-react';
import { Product, Language } from '../types';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { HowToOrderSection } from './HowToOrderSection';
import { getTranslation } from '../data/translations';
import { CATEGORIES } from '../data/categories';
import { imgWedding, imgCouple, imgMeles, imgChiffon } from '../data/products';

interface HomePageProps {
  products: Product[];
  currency: 'ETB' | 'USD';
  language: Language;
  onExploreCatalog: () => void;
  onOpenCustomOrder: () => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onSelectCategoryTag: (tag: string) => void;
  onNavigateAbout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  currency,
  language,
  onExploreCatalog,
  onOpenCustomOrder,
  onSelectProduct,
  onAddToCart,
  onSelectCategoryTag,
  onNavigateAbout,
}) => {
  const t = getTranslation(language);

  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const featuredProducts = products.filter((p) => p.featured || !p.bestSeller).slice(0, 4);

  // Curated highlight collections
  const highlightCategories = [
    { tag: '#የሰርግ_ልብስ', nameAm: 'የሰርግ ልብስ', nameEn: 'Wedding Dresses', image: imgWedding },
    { tag: '#የመልስ_ልብስ', nameAm: 'የመልስ ልብስ', nameEn: 'Meles Gowns', image: imgMeles },
    { tag: '#የጥንድ_ልብስ', nameAm: 'የጥንድ ልብስ', nameEn: 'Couple Sets', image: imgCouple },
    { tag: '#ሺፎን_እና_ቻይና', nameAm: 'ዘመናዊ ሺፎን', nameEn: 'Modern Chiffon', image: imgChiffon },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      
      {/* Editorial Hero */}
      <Hero
        language={language}
        onExploreCatalog={onExploreCatalog}
        onOpenCustomOrder={onOpenCustomOrder}
      />

      {/* Occasion / Heritage Collections Rail */}
      <section className="py-10 bg-white border-b border-[#EAD8C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E]">
                {t.shopByOccasionTitle}
              </h2>
              <p className="text-xs text-[#2D241E]/70 mt-0.5">
                {language === 'am' ? 'ለሰርግ፣ ለመልስ እና ለክብረ በዓላት የተዘጋጁ ስብስቦች' : 'Curated styles for weddings, celebrations & heritage galas'}
              </p>
            </div>
            <button
              onClick={onExploreCatalog}
              className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewAllProductsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlightCategories.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategoryTag(item.tag)}
                className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-xs border border-[#EAD8C0] hover:border-[#8B0000] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[10px] text-[#C5A059] font-bold">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-sm sm:text-base leading-snug group-hover:text-[#C5A059] transition-colors">
                    {language === 'am' ? item.nameAm : item.nameEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.bestSellerBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E]">
                {t.bestSellersTitle}
              </h2>
            </div>

            <button
              onClick={onExploreCatalog}
              className="px-4 py-2 rounded-xl border border-[#EAD8C0] hover:border-[#8B0000] bg-white text-xs font-bold text-[#2D241E] hover:text-[#8B0000] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t.viewAllProductsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                currency={currency}
                language={language}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onTagClick={onSelectCategoryTag}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bridal & Group Special Banner */}
      <section className="py-12 bg-linear-to-r from-[#2D241E] to-[#1c1612] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-[#8B0000] text-[#F9F4EC] rounded-full text-xs font-bold uppercase tracking-wider">
                {t.bridalSpecialTitle}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-snug">
                {language === 'am' 
                  ? 'ለሰርግ ሙሽራ፣ ለሚዜዎች እና ለቡድን ልዩ የጅምላ ስፌት' 
                  : 'Complete Bridal Parties & Express Bespoke Group Tailoring'}
              </h2>
              <p className="text-sm text-[#F9F4EC]/80 max-w-2xl leading-relaxed">
                {t.bridalSpecialSubtitle}. {language === 'am' ? 'ከአክሱም ንጹህ ፈተል ጥጥ እና ወርቅ ጥልፍ ጋር የተጣጣመ የጥንድ እና የሚዜዎች ስብስብ እንሰራለን።' : 'Coordinated gold tilet patterns across groom tunic, bridal gown, and bridesmaids kemis.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenCustomOrder}
                  className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08c45] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>{t.customOrderBtn}</span>
                </button>
                <button
                  onClick={onNavigateAbout}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center space-y-3 max-w-xs w-full">
                <HeartHandshake className="w-10 h-10 mx-auto text-[#C5A059]" />
                <h4 className="font-serif font-bold text-base text-white">
                  {language === 'am' ? 'የሰርግ ፓኬጅ ቅናሽ' : 'Bridal Group Discount'}
                </h4>
                <p className="text-xs text-white/70">
                  {language === 'am' ? 'ከ 4 ልብስ በላይ ለሚያዝዙ የሰርግ ዝግጅቶች ልዩ ቅናሽ ይደረጋል።' : 'Special volume savings for orders of 4+ wedding party ensembles.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8B0000] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.newCollectionTag}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E]">
                {t.newArrivalsTitle}
              </h2>
            </div>

            <button
              onClick={onExploreCatalog}
              className="px-4 py-2 rounded-xl border border-[#EAD8C0] hover:border-[#8B0000] bg-white text-xs font-bold text-[#2D241E] hover:text-[#8B0000] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t.viewAllProductsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                currency={currency}
                language={language}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onTagClick={onSelectCategoryTag}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How To Order in 4 Easy Steps */}
      <HowToOrderSection language={language} />

    </div>
  );
};
