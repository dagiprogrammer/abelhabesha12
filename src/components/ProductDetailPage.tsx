import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Sparkles,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  ShieldCheck,
  Scissors
} from 'lucide-react';
import { Product, Language } from '../types';
import { STORE_INFO, getCategoryDisplay } from '../data/categories';
import { DEFAULT_PRODUCT_IMAGE } from '../data/products';
import { 
  getTranslation, 
  getProductName, 
  getProductFabric, 
  getProductDescription 
} from '../data/translations';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  currency: 'ETB' | 'USD';
  language: Language;
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  onTagClick?: (tag: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  currency,
  language,
  onBack,
  onSelectProduct,
  onTagClick,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Custom Tailored');
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const [length, setLength] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  // Collect all available images (primary + secondary images)
  const allImages = [product.image, ...(product.secondaryImages || [])]
    .filter((img): img is string => Boolean(img && img.trim().length > 0));
  
  const displayImages = allImages.length > 0 ? allImages : [DEFAULT_PRODUCT_IMAGE];
  const currentImage = displayImages[activeImageIndex] || displayImages[0];

  const displayPrice = currency === 'USD' 
    ? `$${(product.priceETB / 130).toFixed(0)}` 
    : `${product.priceETB.toLocaleString()} ETB`;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryGroup === product.categoryGroup)
    .slice(0, 4);

  // Structured order inquiry message
  const orderSummaryText = `Abel Habesha (አቤል ሀበሻ) Traditional Attire Order:
• Code: ${product.code}
• Name: ${getProductName(product, language)}
• Fabric: ${getProductFabric(product, language)}
• Price: ${displayPrice}
• Size / Fit: ${isCustom ? 'Custom Fit Measurements' : selectedSize}
${isCustom ? `• Length: ${length || 'Standard'}\n• Chest: ${chest || 'Standard'}\n• Waist: ${waist || 'Standard'}\n• Hips: ${hips || 'Standard'}` : ''}
${notes ? `• Special Notes: ${notes}` : ''}
• Link: ${window.location.origin}/#product-${product.code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(orderSummaryText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(STORE_INFO.telegramUrl)}&text=${encodeURIComponent(orderSummaryText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAD8C0]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#5a0000] transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#8B0000]/10 group-hover:bg-[#8B0000] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>{t.backToCollection}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              Item Code:
            </span>
            <span className="text-xs font-mono font-bold bg-[#2D241E] text-white px-2.5 py-1 rounded-lg">
              {product.code}
            </span>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#EAD8C0] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Photo Gallery Stage (4-5 Images) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Primary Image Viewer */}
              <div className="relative rounded-3xl overflow-hidden aspect-4/5 bg-[#F9F4EC] border border-[#EAD8C0] shadow-md group">
                <img
                  src={currentImage}
                  alt={`${getProductName(product, language)} - View ${activeImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-all duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                  }}
                />

                {/* Best Seller / Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.bestSeller && (
                    <span className="bg-[#8B0000] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {t.bestSeller}
                    </span>
                  )}
                  {product.badge && !product.bestSeller && (
                    <span className="bg-[#C5A059] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Photo Counter Badge */}
                {displayImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    {activeImageIndex + 1} / {displayImages.length}
                  </div>
                )}

                {/* Gallery Navigation Arrows */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#2D241E] shadow-lg flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#2D241E] shadow-lg flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Click to Expand / Lightbox Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-[#8B0000] text-white backdrop-blur-xs transition-colors cursor-pointer shadow-md"
                  title="Enlarge Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Tailoring days banner on bottom */}
                <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-[#2D241E]/85 backdrop-blur-md text-white flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{product.tailoringDays} {t.withinDays}</span>
                </div>
              </div>

              {/* Thumbnails Strip (Up to 5 Photos) */}
              {displayImages.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
                    <span>Photo Gallery ({displayImages.length} angles)</span>
                    <span className="text-[11px] text-[#8B0000]">Click thumbnail to view</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2.5">
                    {displayImages.map((imgUrl, idx) => {
                      const isActive = idx === activeImageIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-4/5 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F9F4EC] ${
                            isActive 
                              ? 'border-[#8B0000] ring-2 ring-[#8B0000]/30 scale-102 shadow-sm' 
                              : 'border-[#EAD8C0] hover:border-[#8B0000]/60 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                            }}
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#8B0000]/10 pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Copy & Share Action Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2.5 px-4 bg-[#F9F4EC] hover:bg-[#EAD8C0]/50 border border-[#EAD8C0] rounded-xl text-xs font-bold text-[#2D241E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                  <span>{copied ? t.copiedNotice : t.copyDressInfo}</span>
                </button>
              </div>
            </div>

            {/* Right: Product Information & Direct Ordering */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                
                {/* Category Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.hashtags.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onTagClick && onTagClick(tag)}
                      className="text-xs font-bold px-3 py-1 bg-[#F9F4EC] text-[#8B0000] rounded-full border border-[#EAD8C0] hover:bg-[#8B0000] hover:text-white transition-colors cursor-pointer"
                    >
                      {getCategoryDisplay(tag, language)}
                    </button>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2D241E] leading-tight mb-3">
                  {getProductName(product, language)}
                </h1>

                {/* Price Display */}
                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#8B0000]">
                    {displayPrice}
                  </span>
                  {product.originalPriceETB && (
                    <span className="text-sm text-[#2D241E]/50 line-through">
                      {currency === 'USD' 
                        ? `$${(product.originalPriceETB / 130).toFixed(0)}` 
                        : `${product.originalPriceETB.toLocaleString()} ETB`}
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#2E4739]/10 text-[#2E4739] border border-[#2E4739]/20">
                    {t.bulkDiscountAvailable}
                  </span>
                </div>

                {/* Description */}
                <div className="py-4 border-y border-[#EAD8C0]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D241E]/60 mb-2">
                    {t.productDescHeader}
                  </h3>
                  <p className="text-sm text-[#2D241E]/80 leading-relaxed">
                    {getProductDescription(product, language)}
                  </p>
                </div>

                {/* Fabric Type */}
                <div className="my-4 p-3.5 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#8B0000] block">
                      {t.fabricTypeLabel}:
                    </span>
                    <span className="text-sm font-semibold text-[#2D241E]">
                      {getProductFabric(product, language)}
                    </span>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                </div>

                {/* Custom Fit or Standard Size Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E]">
                      {t.selectSizeLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCustom(!isCustom)}
                      className="text-xs text-[#8B0000] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{isCustom ? t.switchToStandardSize : t.customFitPrompt}</span>
                    </button>
                  </div>

                  {isCustom ? (
                    <div className="p-4 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-[#8B0000] font-bold">
                        <Scissors className="w-3.5 h-3.5" />
                        <span>{language === 'am' ? 'ልክዎን ያስገቡ (በቀጥታ ለዋትስአፕ ይላካል)' : 'Custom Tailoring Measurements'}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ቁመት (ሳ.ሜ)' : 'Length (cm)'}
                          </label>
                          <input
                            type="text"
                            placeholder="140 cm"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ደረት (ሳ.ሜ)' : 'Chest (cm)'}
                          </label>
                          <input
                            type="text"
                            placeholder="92 cm"
                            value={chest}
                            onChange={(e) => setChest(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ወገብ (ሳ.ሜ)' : 'Waist (cm)'}
                          </label>
                          <input
                            type="text"
                            placeholder="74 cm"
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ዳሌ (ሳ.ሜ)' : 'Hips (cm)'}
                          </label>
                          <input
                            type="text"
                            placeholder="100 cm"
                            value={hips}
                            onChange={(e) => setHips(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder={t.notesPlaceholder}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-6 gap-2">
                      {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#8B0000] text-white border-[#8B0000]'
                              : 'bg-white text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* DIRECT ORDERING ACTIONS (Replaces Cart) */}
              <div className="pt-6 border-t border-[#EAD8C0] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  {language === 'am' ? 'በቀጥታ ለማዘዝ ከታች ይምረጡ' : 'Order Directly Via:'}
                </div>

                {/* Primary Action: Order by WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  <span>{t.orderWhatsAppDirect}</span>
                </button>

                {/* Secondary Actions: Telegram & Call Now */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleTelegram}
                    className="py-3.5 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.orderTelegramInbox}</span>
                  </button>

                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="py-3.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6e0000] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.callShopDirect}</span>
                  </a>
                </div>

                {/* Trust & Showroom info */}
                <div className="pt-2 flex flex-col items-center gap-1 text-[11px] text-[#2D241E]/70 text-center">
                  <p className="flex items-center justify-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#2E4739]" />
                    <span>100% Authentic Handspun Cotton • Direct Shiromeda Tailor Pricing</span>
                  </p>
                  <p className="flex items-center justify-center gap-1 text-stone-500">
                    <MapPin className="w-3 h-3 text-[#8B0000]" />
                    <span>{currentAddress}</span>
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Attire Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E]">
                  {t.relatedAttireHeader}
                </h3>
                <p className="text-xs text-[#2D241E]/70 mt-1">
                  {t.relatedAttireSub}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  currency={currency}
                  language={language}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onSelectProduct}
                  onTagClick={onTagClick}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Zoom Modal for Inspecting Embroidery Detail */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="relative rounded-2xl overflow-hidden bg-black max-h-[80vh] flex items-center justify-center">
              <img
                src={currentImage}
                alt={getProductName(product, language)}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain"
              />

              {displayImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 text-center text-white text-xs font-semibold">
              {getProductName(product, language)} ({activeImageIndex + 1} of {displayImages.length})
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
