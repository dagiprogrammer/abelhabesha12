import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Share2, 
  ShoppingBag,
  Sparkles,
  Ruler,
  AlertCircle
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

interface ProductDetailModalProps {
  product: Product;
  currency: 'ETB' | 'USD';
  language: Language;
  onClose: () => void;
  onAddToCartWithDetails: (
    product: Product, 
    size: string, 
    measurements?: { length?: string; bustChest?: string; waist?: string; hips?: string }, 
    notes?: string
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  language,
  onClose,
  onAddToCartWithDetails,
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

  const orderSummaryText = `Abel Habesha (አቤል ሀበሻ) Traditional Attire Order:
• Code: ${product.code}
• Name: ${getProductName(product, language)}
• Fabric: ${getProductFabric(product, language)}
• Price: ${displayPrice}
• Size / Fit: ${isCustom ? 'Custom Measurements' : selectedSize}
${isCustom ? `• Length: ${length || 'Standard'}\n• Chest: ${chest || 'Standard'}\n• Waist: ${waist || 'Standard'}\n• Hips: ${hips || 'Standard'}` : ''}
${notes ? `• Special Notes: ${notes}` : ''}
• Image URL: ${product.image}`;

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#FDFCF8] rounded-3xl overflow-hidden shadow-2xl border border-[#EAD8C0] my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#EAD8C0] bg-[#F9F4EC] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#2D241E] text-white">
              {product.code}
            </span>
            <span className="text-xs text-[#8B0000] font-bold">
              {t.bespokeReady}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#2D241E] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Column: Image and Fast Action Info */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#EAD8C0] bg-[#F9F4EC] aspect-4/5">
                <img
                  src={product.image || DEFAULT_PRODUCT_IMAGE}
                  alt={getProductName(product, language)}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                  }}
                  className="w-full h-full object-cover object-top"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.bestSeller && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#8B0000] text-white shadow-md">
                      {t.bestSeller}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-[#2D241E]/80 backdrop-blur-md text-[#F9F4EC] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{product.tailoringDays} {t.withinDays}</span>
                  </span>
                  <span className="text-[#C5A059] font-bold">
                    100% {t.pureCottonFetel}
                  </span>
                </div>
              </div>

              {/* Instructions on screenshot ordering */}
              <div className="p-3.5 bg-[#F9F4EC] rounded-xl border border-[#EAD8C0] flex items-start gap-3 text-xs text-[#2D241E]/85">
                <AlertCircle className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#8B0000]">
                    {t.step1ScreenshotTitle}
                  </p>
                  <p className="mt-0.5">
                    {t.step1ScreenshotDesc}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-3 bg-white border border-[#EAD8C0] hover:border-[#8B0000] rounded-xl text-xs font-bold text-[#2D241E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                <span>{copied ? t.copiedNotice : t.copyDressInfo}</span>
              </button>
            </div>

            {/* Right Column: Specifications & Measurement Box */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                
                {/* Category Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {product.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold px-2.5 py-0.5 bg-[#F9F4EC] text-[#8B0000] rounded-full border border-[#EAD8C0]"
                    >
                      {getCategoryDisplay(tag, language)}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E] leading-snug">
                  {getProductName(product, language)}
                </h2>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8B0000]">
                    {displayPrice}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#2E4739]/10 text-[#2E4739]">
                    {t.specialPriceTag}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-4 pt-4 border-t border-[#EAD8C0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D241E]/60 mb-1">
                    {t.productDescHeader}
                  </h4>
                  <p className="text-sm text-[#2D241E]/80 leading-relaxed font-normal">
                    {getProductDescription(product, language)}
                  </p>
                </div>

                {/* Fabric Detail */}
                <div className="mt-4 p-3 bg-[#F9F4EC] rounded-xl border border-[#EAD8C0]">
                  <span className="text-xs font-bold text-[#8B0000] block mb-0.5">
                    {t.fabricTypeLabel}:
                  </span>
                  <span className="text-sm font-medium text-[#2D241E]">
                    {getProductFabric(product, language)}
                  </span>
                </div>

                {/* Measurement Choice: Custom vs Standard */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2D241E]">
                      {t.selectSizeLabel}
                    </label>
                    <button
                      onClick={() => setIsCustom(!isCustom)}
                      className="text-xs text-[#8B0000] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{isCustom ? t.switchToStandardSize : t.customFitPrompt}</span>
                    </button>
                  </div>

                  {isCustom ? (
                    <div className="p-4 bg-[#F9F4EC] border border-[#EAD8C0] rounded-2xl space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#8B0000] font-bold">
                        <span>{t.needCustomFit}</span>
                        <span>{t.customFitHelp}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ቁመት' : 'Length'}
                          </label>
                          <input
                            type="text"
                            placeholder="140 cm"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ደረት' : 'Chest/Bust'}
                          </label>
                          <input
                            type="text"
                            placeholder="92 cm"
                            value={chest}
                            onChange={(e) => setChest(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ወገብ' : 'Waist'}
                          </label>
                          <input
                            type="text"
                            placeholder="74 cm"
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#2D241E]/70 block mb-1">
                            {language === 'am' ? 'ዳሌ' : 'Hips'}
                          </label>
                          <input
                            type="text"
                            placeholder="100 cm"
                            value={hips}
                            onChange={(e) => setHips(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder={t.notesPlaceholder}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-[#EAD8C0] bg-white focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                        />
                      </div>
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

              {/* Direct Order Actions */}
              <div className="mt-6 pt-5 border-t border-[#EAD8C0] space-y-2.5">
                
                {/* 1. Direct WhatsApp Order Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.orderWhatsAppDirect}</span>
                </button>

                {/* 2. Direct Telegram Order Button */}
                <button
                  onClick={handleTelegram}
                  className="w-full py-3 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#0288d1] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.orderTelegramInbox}</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Add to Cart Drawer */}
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-3 rounded-xl bg-[#2D241E] hover:bg-[#8B0000] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {added ? <Check className="w-4 h-4 text-[#C5A059]" /> : <ShoppingBag className="w-4 h-4 text-[#C5A059]" />}
                    <span>{added ? t.addedToBag : t.addToBag}</span>
                  </button>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="py-3 px-3 rounded-xl bg-[#2E4739] hover:bg-[#1e2f26] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.callShopDirect}</span>
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#2D241E]/70">
                    <MapPin className="w-3 h-3 inline text-[#8B0000] mr-1" />
                    {STORE_INFO.name} • {currentAddress}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
