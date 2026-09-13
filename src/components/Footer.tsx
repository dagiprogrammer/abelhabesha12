import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Send, 
  Youtube, 
  Instagram, 
  Facebook,
  Sparkles,
  Lock
} from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectCategory?: (tag: string) => void;
  onNavigate?: (view: 'home' | 'products' | 'about' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onSelectCategory,
  onNavigate,
}) => {
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  return (
    <footer className="bg-[#2D241E] text-[#F9F4EC] border-t-4 border-[#8B0000] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#8B0000] text-[#C5A059] flex items-center justify-center font-serif font-bold text-lg border border-[#C5A059]">
                AH
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
                  ABEL HABESHA
                </h3>
                <p className="text-xs text-[#C5A059] font-bold font-ethiopic">
                  {language === 'ti' ? 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ' : 'አቤል ሀበሻ ባህላዊ አልባሳት'}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#F9F4EC]/75 leading-relaxed">
              {t.footerAboutDesc}
            </p>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-[#C5A059] font-bold">
                {t.bulkDiscountTitle}
              </p>
              <p className="text-[11px] text-[#F9F4EC]/70 mt-0.5">
                {t.bulkDiscountDesc}
              </p>
            </div>
          </div>

          {/* Popular Categories Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
              {t.popularCategoriesHeader}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F9F4EC]/80">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat.tag)}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <span className="text-[#8B0000]">✦</span>
                    <span>{language === 'ti' ? (cat.nameTi || cat.nameAm) : (language === 'en' ? cat.nameEn : cat.nameAm)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
              {t.visitOurBoutique}
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#F9F4EC]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <span>{currentAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-white font-bold">
                  {STORE_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#29b6f6] shrink-0" />
                <a href={STORE_INFO.emailUrl} className="hover:text-white truncate">
                  {STORE_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={STORE_INFO.website} target="_blank" rel="noreferrer" className="hover:text-white">
                  abelhabesha.com.et
                </a>
              </div>
            </div>
          </div>

          {/* Social Links & Channels */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
              {t.followSocialHeader}
            </h4>

            <div className="flex flex-col gap-2">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={STORE_INFO.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-[#29b6f6] transition-colors"
              >
                <Send className="w-4 h-4 text-[#29b6f6]" />
                <span>Telegram Chat</span>
              </a>

              <a
                href={STORE_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-[#e1306c] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#e1306c]" />
                <span>Instagram</span>
              </a>

              <a
                href={STORE_INFO.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-white transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">♪</span>
                <span>TikTok</span>
              </a>

              <a
                href={STORE_INFO.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-[#ff0000] transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#ff0000]" />
                <span>YouTube</span>
              </a>

              <a
                href={STORE_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#F9F4EC]/80 hover:text-[#1877f2] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#1877f2]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Admin Link & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9F4EC]/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Abel Habesha (አቤል ሀበሻ). {t.allRightsReserved}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{t.thankYouFooter}</span>
            <button
              onClick={() => onNavigate && onNavigate('admin')}
              className="flex items-center gap-1 text-[#F9F4EC]/40 hover:text-[#C5A059] transition-colors text-[11px] cursor-pointer"
              title="Catalog Admin"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
