import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  ShoppingBag,
  Sparkles,
  Ruler,
  Share2,
  Tag
} from 'lucide-react';
import { Product, Language, CartItem } from '../types';
import { STORE_INFO, getCategoryDisplay } from '../data/categories';
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
  onAddToCartWithDetails: (
    product: Product, 
    size: string, 
    measurements?: { length?: string; bustChest?: string; waist?: string; hips?: string }, 
    notes?: string
  ) => void;
  onTagClick?: (tag: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  currency,
  language,
  onBack,
  onSelectProduct,
  onAddToCartWithDetails,
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
  const [added, setAdded] = useState(false);

  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  const displayPrice = currency === 'USD' 
    ? `$${(product.priceETB / 130).toFixed(0)}` 
    : `${product.priceETB.toLocaleString()} ETB`;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryGroup === product.categoryGroup)
    .slice(0, 4);

  const orderSummaryText = `Abel Habesha (አቤል ሀበሻ) Traditional Attire Order:
• Code: ${product.code}
• Name: ${getProductName(product, language)}
• Fabric: ${getProductFabric(product, language)}
• Price: ${displayPrice}
• Size / Fit: ${isCustom ? 'Custom Measurements' : selectedSize}
${isCustom ? `• Length: ${length || 'Standard'}\n• Chest: ${chest || 'Standard'}\n• Waist: ${waist || 'Standard'}\n• Hips: ${hips || 'Standard'}` : ''}
${notes ? `• Special Notes: ${notes}` : ''}
• Image: ${product.image}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(orderSummaryText)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(product.image)}&text=${encodeURIComponent(orderSummaryText)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    onAddToCartWithDetails(
      product,
      isCustom ? 'Custom' : selectedSize,
      isCustom ? { length, bustChest: chest, waist, hips } : undefined,
      notes
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B0000] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToCollection}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#2D241E] text-white px-2 py-0.5 rounded">
              {product.code}
            </span>
          </div>
        </div>

        {/* Main Product Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EAD8C0] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-4/5 bg-[#F9F4EC] border border-[#EAD8C0] shadow-md">
                <img
                  src={product.image}
                  alt={getProductName(product, language)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />

                {product.bestSeller && (
                  <div className="absolute top-4 left-4 bg-[#8B0000] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    {t.bestSeller}
                  </div>
                )}

                <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-[#2D241E]/85 backdrop-blur-md text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>{product.tailoringDays} {t.withinDays}</span>
                  </span>
                  <span className="text-[#C5A059] font-bold">
                    {t.pureCottonFetel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 px-4 bg-[#F9F4EC] hover:bg-[#EAD8C0]/50 border border-[#EAD8C0] rounded-xl text-xs font-bold text-[#2D241E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                  <span>{copied ? t.copiedNotice : t.copyDressInfo}</span>
                </button>
              </div>
            </div>

            {/* Right: Info & Measurements */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                
                {/* Category Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.hashtags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => onTagClick && onTagClick(tag)}
                      className="text-xs font-bold px-3 py-1 bg-[#F9F4EC] text-[#8B0000] rounded-full border border-[#EAD8C0] hover:bg-[#8B0000] hover:text-white transition-colors"
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
                <div className="flex items-baseline gap-4 mb-4">
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
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#2E4739]/10 text-[#2E4739]">
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

                {/* Measurement Box */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E]">
                      {t.selectSizeLabel}
                    </span>
                    <button
                      onClick={() => setIsCustom(!isCustom)}
                      className="text-xs text-[#8B0000] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{isCustom ? t.switchToStandardSize : t.customFitPrompt}</span>
                    </button>
                  </div>

                  {isCustom ? (
                    <div className="p-4 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] space-y-3">
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
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white"
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
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white"
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
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white"
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
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder={t.notesPlaceholder}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((sz) => (
                        <button
                          key={sz}
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

              {/* Order Buttons */}
              <div className="mt-8 pt-6 border-t border-[#EAD8C0] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t.orderWhatsAppDirect}</span>
                  </button>

                  <button
                    onClick={handleTelegram}
                    className="py-3.5 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#0288d1] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.orderTelegramInbox}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl bg-[#2D241E] hover:bg-[#8B0000] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {added ? <Check className="w-4 h-4 text-[#C5A059]" /> : <ShoppingBag className="w-4 h-4 text-[#C5A059]" />}
                    <span>{added ? t.addedToBag : t.addToBag}</span>
                  </button>

                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="py-3 px-4 rounded-xl bg-[#2E4739] hover:bg-[#1e2f26] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.callShopDirect}</span>
                  </a>
                </div>

                <p className="text-[11px] text-center text-[#2D241E]/60 pt-2">
                  <MapPin className="w-3 h-3 inline text-[#8B0000] mr-1" />
                  {currentAddress}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products Section */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  currency={currency}
                  language={language}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={(p) => onAddToCartWithDetails(p, 'Standard')}
                  onTagClick={onTagClick}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
