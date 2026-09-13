import React, { useState } from 'react';
import { X, Sparkles, Send, MessageCircle, Ruler, Calendar, User, Phone, Layers } from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface CustomTailoringModalProps {
  language: Language;
  onClose: () => void;
}

export const CustomTailoringModal: React.FC<CustomTailoringModalProps> = ({
  language,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [attireType, setAttireType] = useState('የሰርግ ባህላዊ ልብስ (Wedding Dress)');
  const [fabricPreference, setFabricPreference] = useState('የአክሱም ንጹህ ፈተል (Axum Handspun)');
  const [eventDate, setEventDate] = useState('');
  const [measurements, setMeasurements] = useState('');
  const [notes, setNotes] = useState('');

  const t = getTranslation(language);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Abel Habesha - Bespoke Custom Tailoring Request*\n\n` +
      `• *Customer Name:* ${fullName || 'Not specified'}\n` +
      `• *Phone:* ${phoneNumber || 'Not specified'}\n` +
      `• *Attire Style:* ${attireType}\n` +
      `• *Preferred Fabric:* ${fabricPreference}\n` +
      `• *Event / Need By Date:* ${eventDate || 'Flexible'}\n` +
      `• *Measurements / Size:* ${measurements || 'Need guidance'}\n` +
      `• *Design Details / Notes:* ${notes || 'None'}\n\n` +
      `_Sent from Abel Habesha Catalog_`;

    const url = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleSubmitTelegram = () => {
    const message = `Abel Habesha - Bespoke Custom Tailoring Request:\n` +
      `Name: ${fullName || 'Not specified'}\n` +
      `Phone: ${phoneNumber || 'Not specified'}\n` +
      `Style: ${attireType}\n` +
      `Fabric: ${fabricPreference}\n` +
      `Date: ${eventDate || 'Flexible'}\n` +
      `Measurements: ${measurements || 'Need guidance'}\n` +
      `Notes: ${notes || 'None'}`;

    const url = `https://t.me/share/url?url=${encodeURIComponent(STORE_INFO.website)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-[#FDFCF8] rounded-3xl overflow-hidden shadow-2xl border border-[#EAD8C0] my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-[#F9F4EC] to-[#FDFCF8] border-b border-[#EAD8C0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8B0000] text-[#C5A059] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2D241E]">
                {t.customModalTitle}
              </h3>
              <p className="text-[11px] text-[#8B0000] font-semibold">
                {language === 'am' ? 'በሺሮሜዳ ባለሙያዎች በልክዎ የሚሰፋ' : 'Handcrafted in Shiromeda to your exact silhouette'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#2D241E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitWhatsApp} className="p-6 space-y-4">
          <p className="text-xs text-[#2D241E]/80 leading-relaxed">
            {t.customModalSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{t.yourName}</span>
              </label>
              <input
                type="text"
                required
                placeholder={language === 'am' ? 'ሙሉ ስምዎን ያስገቡ' : 'e.g., Selamawit Bekele'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
                <Phone className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{t.yourPhone}</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+251 9... or +1 ..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{t.attireType}</span>
              </label>
              <select
                value={attireType}
                onChange={(e) => setAttireType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              >
                <option value="የሰርግ ባህላዊ ልብስ (Wedding Dress)">የሰርግ ባህላዊ ልብስ (Wedding Dress)</option>
                <option value="የመልስ ልብስ (Meles Gown)">የመልስ ልብስ (Meles Gown)</option>
                <option value="የጥንድ ልብስ (Couple Set)">የጥንድ ልብስ (Couple Set)</option>
                <option value="የወንድ ባህላዊ ልብስ (Men's Attire)">የወንድ ባህላዊ ልብስ (Men's Attire)</option>
                <option value="ዘመናዊ ሺፎን (Modern Chiffon)">ዘመናዊ ሺፎን (Modern Chiffon)</option>
                <option value="የአሸንዳ ልብስ (Ashenda Dress)">የአሸንዳ ልብስ (Ashenda Dress)</option>
                <option value="የልዩ ዝግጅት ልብስ (Custom Gala)">የልዩ ዝግጅት ልብስ (Custom Gala)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{t.eventDate}</span>
              </label>
              <input
                type="text"
                placeholder={language === 'am' ? 'ምሳሌ፡ በሚቀጥለው ሳምንት ወይም ጥቅምት 12' : 'e.g. In 2 weeks or Dec 20'}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.preferredFabric}</span>
            </label>
            <select
              value={fabricPreference}
              onChange={(e) => setFabricPreference(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
            >
              <option value="የአክሱም ንጹህ ፈተል (Axum Handspun Cotton)">የአክሱም ንጹህ ፈተል (Axum Handspun Cotton)</option>
              <option value="የንግስት ሳባ ጥበብ (Queen Saba Fabric)">የንግስት ሳባ ጥበብ (Queen Saba Fabric)</option>
              <option value="የጎንደር ንጉሳዊ ጥልፍ (Gondar Royal Silk)">የጎንደር ንጉሳዊ ጥልፍ (Gondar Royal Silk)</option>
              <option value="ንክር ጥራት ያለው ጥጥ (Nkr Pure Cotton)">ንክር ጥራት ያለው ጥጥ (Nkr Pure Cotton)</option>
              <option value="ቀላል ሺፎን (Flowing Silk Chiffon)">ቀላል ሺፎን (Flowing Silk Chiffon)</option>
              <option value="የራያ ባህል ጨርቅ (Raya Heritage)">የራያ ባህል ጨርቅ (Raya Heritage)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1 mb-1">
              <Ruler className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>{language === 'am' ? 'መለኪያ ወይም ቁመት/ደረት/ወገብ' : 'Body Measurements (Height, Bust, Waist, Hips)'}</span>
            </label>
            <input
              type="text"
              placeholder={language === 'am' ? 'ምሳሌ፡ ቁመት 140cm, ደረት 90cm, ወገብ 72cm...' : 'e.g. Height 140cm, Bust 90cm, Waist 72cm'}
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#2D241E] mb-1 block">
              {t.additionalDetails}
            </label>
            <textarea
              rows={2}
              placeholder={language === 'am' ? 'የጥልፍ ቀለም፣ የነጠላ ዲዛይን፣ ወይም ሌሎች ፍላጎቶች...' : 'Special tilf embroidery colors, netela style, express timeline...'}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.submitCustomOrder}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitTelegram}
              className="py-3 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#0288d1] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-[#2D241E]/60 pt-1">
            {language === 'am' ? 'ሺሮሜዳ ብላቴና ሕንፃ 4ኛ ፎቅ ቢሮ 110 • ስልክ: +251 913 312 314' : 'Shiromeda Blatena Bldg, 4th Fl, Office 110 • Phone: +251 913 312 314'}
          </p>
        </form>

      </div>
    </div>
  );
};
