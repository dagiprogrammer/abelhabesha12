import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle,
  Tag,
  Scissors
} from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language, Product } from '../types';

interface HeroProps {
  language: Language;
  onExploreCatalog: () => void;
  onOpenCustomOrder: () => void;
  featuredProduct?: Product;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreCatalog,
  onOpenCustomOrder,
  featuredProduct,
}) => {
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#F9F4EC] via-[#FDFCF8] to-[#F9F4EC] border-b border-[#EAD8C0] py-10 lg:py-16">
      {/* Decorative background vibrant motifs */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-[#8B0000]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tag badge with icon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F4EC] text-[#8B0000] text-xs font-bold mb-4 border border-[#EAD8C0] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.welcomeTag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#2D241E] leading-[1.12] mb-4">
              {t.heroTitle1} <span className="text-[#8B0000]">{t.brandName}</span> {t.heroTitle2}
            </h1>

            <p className="text-lg sm:text-xl font-serif text-[#8B0000] mb-3">
              {t.heroSubtitle}
            </p>

            {/* Description matching prompt */}
            <p className="text-sm sm:text-base text-[#2D241E]/80 leading-relaxed mb-6 max-w-2xl font-normal">
              {t.heroDesc}
            </p>

            {/* Prominent Bulk Discount Banner */}
            <div className="w-full sm:w-auto mb-6 p-4 bg-[#F9F4EC] border-2 border-[#EAD8C0] rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-[#8B0000] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#8B0000]">
                  {t.bulkDiscountTitle}
                </p>
                <p className="text-xs text-[#2D241E]/75">
                  {t.bulkDiscountDesc}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onExploreCatalog}
                className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#b08c45] text-white rounded-md sm:rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.viewCatalog}</span>
              </button>

              <button
                onClick={onOpenCustomOrder}
                className="px-7 py-3 bg-transparent hover:bg-[#8B0000] hover:text-white text-[#8B0000] border-2 border-[#8B0000] rounded-md sm:rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                <span>{t.customOrderBtn}</span>
              </button>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-5 py-3.5 bg-[#2E4739] text-white hover:bg-[#22352a] rounded-md sm:rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                title="Direct call"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="hidden sm:inline">{STORE_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#EAD8C0] w-full text-xs text-[#2D241E]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>{currentAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E4739] shrink-0" />
                <span>{t.fastTurnaround}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{t.pureCottonFetel}</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Feature Card - Vibrant Palette Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image or Authentic Craft Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FDFCF8]">
                {featuredProduct?.image ? (
                  <img
                    src={featuredProduct.image}
                    alt={language === 'am' ? featuredProduct.nameAm : featuredProduct.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-[420px] bg-linear-to-b from-[#F9F4EC] to-[#F2E8DC] p-8 flex flex-col justify-between relative overflow-hidden border border-[#EAD8C0]">
                    {/* Cultural background watermark */}
                    <div className="absolute inset-0 opacity-5 flex items-center justify-center text-9xl select-none pointer-events-none">
                      ❖
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#8B0000] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{language === 'am' ? 'የሺሮሜዳ እደ-ጥበብ' : 'Shiromeda Atelier'}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#C5A059] text-white text-[11px] font-bold shadow-xs">
                        100% {language === 'am' ? 'ንጹህ ጥጥ' : 'Pure Cotton'}
                      </span>
                    </div>

                    <div className="relative z-10 text-center my-auto py-6">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-[#8B0000] text-[#C5A059] flex items-center justify-center shadow-lg border-2 border-[#C5A059] mb-4">
                        <span className="text-3xl font-serif">✞</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] mb-2">
                        {language === 'am' ? 'አቤል ሀበሻ ባህላዊ ልብሶች' : 'Abel Habesha Attire'}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#2D241E]/80 max-w-xs mx-auto leading-relaxed">
                        {language === 'am' 
                          ? 'በሺሮሜዳ እምብርት በእጅ የሚሸመኑ ጥራት ያላቸው የሰርግ፣ የመልስ እና የክብረ-በዓላት አልባሳት።' 
                          : 'Masterfully handwoven bridal gowns, meles zuria, and cultural garments in the heart of Shiromeda.'}
                      </p>
                    </div>

                    <div className="relative z-10 p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#EAD8C0] flex items-center justify-between shadow-sm">
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-[#8B0000]">
                          {language === 'am' ? 'በልክ የሚሰፉ ትዕዛዞች' : 'Custom Tailoring Available'}
                        </p>
                        <p className="text-[11px] text-[#2D241E]/70">
                          {language === 'am' ? 'በዋትስአፕ ወይም በቴሌግራም ያነጋግሩን' : 'Order via WhatsApp or Telegram'}
                        </p>
                      </div>
                      <a
                        href={STORE_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-[#25D366] text-white rounded-xl hover:bg-[#1faa4f] transition-colors shadow-xs"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Overlay Badge if product is shown */}
                {featuredProduct?.image && (
                  <>
                    <div className="absolute top-4 left-4 bg-[#8B0000] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{t.newCollectionTag}</span>
                    </div>

                    <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#FDFCF8]/95 backdrop-blur-md border border-[#EAD8C0] shadow-lg flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B0000]">
                          <span>{featuredProduct.code}</span>
                          <span>•</span>
                          <span>{language === 'am' ? featuredProduct.nameAm : featuredProduct.nameEn}</span>
                        </div>
                        <p className="text-xs text-[#2D241E]/70 font-serif font-bold mt-0.5">
                          {featuredProduct.priceETB ? `${featuredProduct.priceETB.toLocaleString()} ETB` : ''}
                        </p>
                      </div>
                      <a
                        href={STORE_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-[#25D366] text-white rounded-xl hover:bg-[#1faa4f] transition-colors shadow-sm"
                        title="Order this via WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute -bottom-4 -left-3 bg-[#FDFCF8] border-2 border-[#EAD8C0] px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center text-lg shadow-xs">
                  ✞
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2D241E] font-serif">
                    {t.heroFabricBadge}
                  </p>
                  <p className="text-[11px] text-[#2D241E]/70">
                    {t.heroNetelaSub}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
