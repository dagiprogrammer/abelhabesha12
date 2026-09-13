import React from 'react';
import { 
  X, 
  Trash2, 
  MessageCircle, 
  Send, 
  Phone, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { CartItem, Language } from '../types';
import { STORE_INFO } from '../data/categories';
import { getTranslation, getProductName, getProductFabric } from '../data/translations';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'ETB' | 'USD';
  language: Language;
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);

  const totalETB = items.reduce((acc, item) => acc + (item.product.priceETB * item.quantity), 0);
  const totalDisplay = currency === 'USD'
    ? `$${(totalETB / 130).toFixed(0)}`
    : `${totalETB.toLocaleString()} ETB`;

  const generateOrderText = () => {
    let text = `*Abel Habesha (አቤል ሀበሻ) - Traditional Attire Order*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${getProductName(item.product, language)}* (${item.product.code})\n`;
      text += `   • Fabric: ${getProductFabric(item.product, language)}\n`;
      text += `   • Size/Fit: ${item.size}\n`;
      if (item.customMeasurements) {
        const m = item.customMeasurements;
        text += `   • Measurements: Length: ${m.length || '-'}, Bust/Chest: ${m.bustChest || '-'}, Waist: ${m.waist || '-'}, Hips: ${m.hips || '-'}\n`;
      }
      if (item.notes) {
        text += `   • Notes: ${item.notes}\n`;
      }
      const itemPrice = currency === 'USD' 
        ? `$${((item.product.priceETB * item.quantity) / 130).toFixed(0)}` 
        : `${(item.product.priceETB * item.quantity).toLocaleString()} ETB`;
      text += `   • Qty: ${item.quantity} × ${itemPrice}\n\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Estimated Total:* ${totalDisplay}\n\n`;
    text += `_Please confirm order timeline, fabric availability, and delivery options._`;
    return text;
  };

  const handleWhatsAppOrder = () => {
    const message = generateOrderText();
    const url = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleTelegramOrder = () => {
    const message = generateOrderText();
    const url = `https://t.me/share/url?url=${encodeURIComponent(STORE_INFO.website)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FDFCF8] rounded-3xl overflow-hidden shadow-2xl border border-[#EAD8C0] my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-[#F9F4EC] to-[#FDFCF8] border-b border-[#EAD8C0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2D241E] text-[#C5A059] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2D241E]">
                {t.orderBagTitle}
              </h3>
              <p className="text-[11px] text-[#8B0000] font-semibold">
                {items.length} {t.itemsCount}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-stone-500 hover:text-[#8B0000] flex items-center gap-1 px-2 py-1 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                title={t.clearCart}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.clearCart}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-[#2D241E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F9F4EC] border-2 border-[#EAD8C0] mx-auto flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#2D241E]">
                  {t.emptyCart}
                </h4>
                <p className="text-xs text-[#2D241E]/70 max-w-sm mx-auto mt-1">
                  {t.emptyBagPrompt}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.browseCatalogBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => {
                const itemPrice = currency === 'USD'
                  ? `$${(item.product.priceETB / 130).toFixed(0)}`
                  : `${item.product.priceETB.toLocaleString()} ETB`;

                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] flex items-center gap-3.5 transition-all"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={getProductName(item.product, language)}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-xl object-cover object-top border border-[#EAD8C0] bg-white shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-[#2D241E] text-white px-1.5 py-0.2 rounded">
                          {item.product.code}
                        </span>
                        <span className="text-xs font-bold text-[#8B0000] truncate">
                          {item.product.fabricAm}
                        </span>
                      </div>
                      
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2D241E] truncate mt-0.5">
                        {getProductName(item.product, language)}
                      </h4>

                      <p className="text-[11px] text-[#2D241E]/70 mt-0.5">
                        <span className="font-semibold">{t.sizeLabel}</span> {item.size}
                      </p>

                      {item.customMeasurements && (
                        <p className="text-[10px] text-[#8B0000] truncate">
                          📏 {item.customMeasurements.length ? `L:${item.customMeasurements.length} ` : ''}
                          {item.customMeasurements.bustChest ? `C:${item.customMeasurements.bustChest} ` : ''}
                          {item.customMeasurements.waist ? `W:${item.customMeasurements.waist}` : ''}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <span className="font-bold text-xs text-[#8B0000]">
                          {itemPrice}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-white border border-[#EAD8C0] rounded-lg px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="p-1 text-stone-600 hover:text-black cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-black cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-2 rounded-xl text-stone-400 hover:text-[#8B0000] hover:bg-stone-200 transition-colors shrink-0 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 bg-[#F9F4EC] border-t border-[#EAD8C0] shrink-0 space-y-3.5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#2D241E]/70 font-semibold block">
                  {t.totalEstimated}
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#8B0000]">
                  {totalDisplay}
                </span>
              </div>
              <p className="text-[11px] text-right text-[#2E4739] font-medium max-w-[200px]">
                ✓ {t.freeConsultationNote}
              </p>
            </div>

            {/* Direct Instant Order Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.sendOrderWhatsApp}</span>
              </button>

              <button
                onClick={handleTelegramOrder}
                className="py-3 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#0288d1] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.sendOrderTelegram}</span>
              </button>
            </div>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="w-full py-2.5 rounded-xl bg-white border border-[#EAD8C0] hover:border-[#8B0000] text-[#2D241E] font-bold text-xs flex items-center justify-center gap-2 transition-colors block text-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>{t.callToOrder} ({STORE_INFO.phoneDisplay})</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
