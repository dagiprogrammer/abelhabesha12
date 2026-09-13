import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Clock, 
  Globe, 
  Instagram, 
  Facebook, 
  Youtube,
  Sparkles
} from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface ContactUsPageProps {
  language: Language;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Abel Habesha (አቤል ሀበሻ) - Customer Inquiry*\n• *Name:* ${name}\n• *Phone:* ${phone}\n• *Message:* ${message}`;
    const url = `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F4EC] text-[#8B0000] text-xs font-bold mb-4 border border-[#EAD8C0]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{t.contactUsTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] leading-tight mb-4">
            {t.contactUsTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#2D241E]/80 leading-relaxed">
            {t.contactUsSubtitle}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F9F4EC] rounded-3xl p-6 sm:p-8 border border-[#EAD8C0] space-y-5">
              <h2 className="text-xl font-serif font-bold text-[#8B0000]">
                {t.showroomAddressHeader}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#2D241E]/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D241E]">{t.addressLabel}</span>
                    <p className="mt-0.5">{currentAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D241E]">{t.directLineLabel}</span>
                    <a href={`tel:${STORE_INFO.phone}`} className="hover:text-[#8B0000] font-bold text-base text-[#8B0000]">
                      {STORE_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2E4739] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D241E]">
                      {language === 'am' ? 'የስራ ሰዓት' : 'Opening Hours'}
                    </span>
                    <p className="mt-0.5">{t.openEveryDay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#29b6f6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D241E]">ኢሜይል (Email)</span>
                    <a href={STORE_INFO.emailUrl} className="text-[#8B0000] hover:underline">
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Social / Messaging Buttons */}
              <div className="pt-4 border-t border-[#EAD8C0] grid grid-cols-2 gap-3">
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-3 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={STORE_INFO.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-3 bg-[#29b6f6] hover:bg-[#0288d1] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAD8C0] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#2D241E] mb-2">
              {language === 'am' ? 'መልእክትዎን ይላኩልን' : 'Send us a Message'}
            </h2>
            <p className="text-xs text-[#2D241E]/70 mb-6">
              {language === 'am' 
                ? 'ስለ ሰርግ ልብሶች፣ የጅምላ ቅናሾች ወይም ስለ ስፌት አገልግሎት ጥያቄ ካለዎት ይጻፉልን፤ በቀጥታ በዋትስአፕ እናስተናግድዎታለን።'
                : 'Have questions about bespoke tailoring, wedding bridal packages or shipping? Message our team directly.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2D241E] block mb-1">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Almaz Tesfaye"
                  className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D241E] block mb-1">
                  {t.yourPhone}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 913 ... or international"
                  className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D241E] block mb-1">
                  {language === 'am' ? 'መልእክት' : 'Your Message'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'am' ? 'የሚፈልጉትን የልብስ አይነት፣ የሰርግ ቀን ወይም ጥያቄዎን ይጻፉ...' : 'Please specify dress type, required date, measurements or any questions...'}
                  className="w-full text-xs p-3 rounded-xl border border-[#EAD8C0] bg-[#F9F4EC] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'am' ? 'መልእክቱን በዋትስአፕ ላክ' : 'Send via WhatsApp'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
