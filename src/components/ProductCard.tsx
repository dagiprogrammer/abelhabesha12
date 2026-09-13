import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  Copy, 
  Clock, 
  Sparkles,
  Eye
} from 'lucide-react';
import { Product, Language } from '../types';
import { STORE_INFO, getCategoryShortDisplay } from '../data/categories';
import { DEFAULT_PRODUCT_IMAGE } from '../data/products';
import { 
  getTranslation, 
  getProductName, 
  getProductFabric, 
  getProductDescription 
} from '../data/translations';

interface ProductCardProps {
  product: Product;
  currency: 'ETB' | 'USD';
  language: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onTagClick?: (tag: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  language,
  onSelectProduct,
  onAddToCart,
  onTagClick,
}) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslation(language);

  // Currency converter (approx 1 USD = 130 ETB)
  const displayPrice = currency === 'USD' 
    ? `$${(product.priceETB / 130).toFixed(0)}` 
    : `${product.priceETB.toLocaleString()} ETB`;

  const originalPrice = product.originalPriceETB
    ? currency === 'USD'
      ? `$${(product.originalPriceETB / 130).toFixed(0)}`
      : `${product.originalPriceETB.toLocaleString()} ETB`
    : null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const infoText = `Abel Habesha Dress Code: ${product.code}\nName: ${getProductName(product, language)}\nPrice: ${displayPrice}\nFabric: ${getProductFabric(product, language)}`;
    navigator.clipboard.writeText(infoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directWhatsAppUrl = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hello Abel Habesha, I am interested in this traditional attire:\n• Code: ${product.code}\n• Name: ${getProductName(product, language)}\n• Price: ${displayPrice}\n• Image: ${product.image}\nPlease advise on custom measurements and delivery.`
  )}`;

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group bg-[#FDFCF8] rounded-2xl overflow-hidden border border-[#EAD8C0] hover:border-[#8B0000]/60 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#F9F4EC]">
        <img
          src={product.image || DEFAULT_PRODUCT_IMAGE}
          alt={getProductName(product, language)}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
          }}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-1 pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.bestSeller && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8B0000] text-white shadow-xs pointer-events-auto">
                {t.bestSeller}
              </span>
            )}
            {product.badge && !product.bestSeller && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A059] text-white shadow-xs pointer-events-auto">
                {product.badge}
              </span>
            )}
          </div>

          {/* Item Code Badge with copy button */}
          <button
            onClick={handleCopyCode}
            title={copied ? t.copiedNotice : t.copyInfoBtn}
            className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#2D241E]/85 hover:bg-[#8B0000] text-[#F9F4EC] backdrop-blur-xs transition-colors flex items-center gap-1 pointer-events-auto shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#25D366]" />
                <span>{t.copiedNotice}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#C5A059]" />
                <span>{product.code}</span>
              </>
            )}
          </button>
        </div>

        {/* Floating Quick View Action on Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 bg-white/95 text-[#2D241E] rounded-full text-xs font-bold tracking-wide shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>{t.viewFullDetails}</span>
          </span>
        </div>

        {/* Bottom Banner inside photo */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#2D241E]/80 text-[#F9F4EC] backdrop-blur-xs flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-[#C5A059]" />
            <span>{product.tailoringDays} {t.withinDays}</span>
          </span>

          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C5A059]/90 text-white backdrop-blur-xs">
            {t.bulkDiscountAvailable}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Hashtag pills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.hashtags.slice(0, 2).map((tag, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onTagClick) onTagClick(tag);
                }}
                className="text-[10px] font-bold text-[#8B0000] bg-[#F9F4EC] hover:bg-[#8B0000] hover:text-white px-2 py-0.5 rounded-full border border-[#EAD8C0] transition-colors"
              >
                {getCategoryShortDisplay(tag, language)}
              </button>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#2D241E] line-clamp-1 group-hover:text-[#8B0000] transition-colors">
            {getProductName(product, language)}
          </h3>

          {/* Fabric Info */}
          <p className="text-xs text-[#2D241E]/75 line-clamp-1 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
            <span className="truncate">{getProductFabric(product, language)}</span>
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-[#EAD8C0] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-base sm:text-lg text-[#8B0000]">
                {displayPrice}
              </span>
              {originalPrice && (
                <span className="text-xs text-[#2D241E]/50 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#2E4739] font-semibold block leading-none mt-0.5">
              ✓ {t.tailoringBadge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Order Icon Button */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-[#25D366]/10 text-[#17853f] hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Add to Bag Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-2.5 sm:px-3 py-2 bg-[#2D241E] hover:bg-[#8B0000] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              title="Add to order bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden xs:inline">{t.addToBag}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
