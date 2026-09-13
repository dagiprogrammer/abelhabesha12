import React from 'react';
import { Sparkles, MapPin, Phone, Award, Heart, CheckCircle2, ShieldCheck, Users, Scissors, Flame } from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface AboutUsPageProps {
  language: Language;
  onExploreCatalog: () => void;
  onOpenCustomOrder: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  language,
  onExploreCatalog,
  onOpenCustomOrder,
}) => {
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F4EC] text-[#8B0000] text-xs font-bold mb-4 border border-[#EAD8C0]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{t.welcomeTag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] leading-tight mb-4">
            {t.aboutUsTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#2D241E]/80 leading-relaxed">
            {t.aboutUsSubtitle}
          </p>
        </div>

        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8B0000]">
              {language === 'am' ? 'የሺሮሜዳ የሽመና ቅርስ እና የአቤል ሀበሻ ታሪክ' : 'The Legacy of Shiromeda Handloom Weaving'}
            </h2>
            <p className="text-sm text-[#2D241E]/85 leading-relaxed">
              {language === 'am' 
                ? 'አቤል ሀበሻ በሺሮሜዳ እምብርት የሚገኝ የታወቀ የባህላዊ አልባሳት መደብር ነው። ለትውልድ ሲተላለፍ የመጣውን የእጅ ጥበብ እና የሽመና ውበት ዘመናዊ ከሆነ የስፌት ጥበብ ጋር በማዋሃድ የሰርግ፣ የመልስ፣ የጥንድ እና የሺፎን ቀሚሶችን እናቀርባለን።'
                : 'Abel Habesha is a premier Ethiopian traditional attire fashion house founded in the artisan district of Shiromeda, Addis Ababa. We preserve ancient weaving traditions using hand-operated wooden looms and 100% pure handspun cotton from Axum and Gojjam.'}
            </p>
            <p className="text-sm text-[#2D241E]/85 leading-relaxed">
              {language === 'am'
                ? 'እያንዳንዱ ቀሚስ በታዋቂ ሽማኔዎች በእጅ የተፈተለና የተሸመነ ሲሆን፣ ለክብር ዝግጅትዎ የሚሆን የተሟላ ነጠላ እና ሻሽ አብሮ ይዘጋጃል። ለሰርግ እና ለቡድኖች የሚሆን የጅምላ ቅናሽ እና ፈጣን በልክ የመስፋት አገልግሎት እንሰጣለን።'
                : 'Each gown is meticulously handcrafted with pure gold and silk thread filigree borders (Tilf and Tibeb), accompanied by a luxurious matching double-border Netela shawl. We specialize in custom bridal ensembles and worldwide shipping.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 bg-[#8B0000] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#A52A2A] transition-colors cursor-pointer"
              >
                {t.viewCatalog}
              </button>
              <button
                onClick={onOpenCustomOrder}
                className="px-6 py-3 bg-white border border-[#8B0000] text-[#8B0000] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#F9F4EC] transition-colors cursor-pointer"
              >
                {t.customOrderBtn}
              </button>
            </div>
          </div>

          {/* Cultural Atelier Craft Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-linear-to-br from-[#8B0000] to-[#5C0000] text-white shadow-xl border border-[#C5A059]/30 flex flex-col justify-between h-72">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl text-[#C5A059]">
                  ✞
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-[#C5A059] text-white rounded-full uppercase tracking-wider">
                  Shiromeda
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  {language === 'am' ? 'የእንጨት ሽመና ጥበብ' : 'Wooden Loom Heritage'}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {language === 'am' 
                    ? 'በእጅ የሚፈተል ጥጥ እና በእንጨት እቃዎች የሚሸመኑ ጥራት ያላቸው የሀበሻ ቀሚሶች።' 
                    : 'Artisanal handloom weaving using generational techniques passed down in Addis Ababa.'}
                </p>
              </div>
              <div className="text-[11px] font-mono text-[#C5A059] pt-2 border-t border-white/15">
                100% Handcrafted • Axum Fetel
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9F4EC] text-[#2D241E] shadow-lg border border-[#EAD8C0] flex flex-col justify-between h-72 sm:mt-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-[#8B0000]/10 text-[#8B0000] rounded-full uppercase tracking-wider">
                  Bespoke
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#2D241E]">
                  {language === 'am' ? 'በልክ የሚሰፉ አልባሳት' : 'Made to Measure'}
                </h3>
                <p className="text-xs text-[#2D241E]/75 leading-relaxed">
                  {language === 'am' 
                    ? 'የሰርግ፣ የመልስ እና የሚዜዎች ልብስ በልክዎ ተሰፍቶ በፈጣን ጊዜ ይደርስዎታል።' 
                    : 'Personalized custom measurements with quick turnaround times & worldwide delivery.'}
                </p>
              </div>
              <div className="text-[11px] font-mono text-[#8B0000] font-bold pt-2 border-t border-[#EAD8C0]">
                Addis Ababa • Shiromeda
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <Award className="w-8 h-8 text-[#8B0000] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              100% {t.pureCottonFetel}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'ከአክሱምና ከጎጃም ገበሬዎች የሚሰበሰብ ንጹህ ጥጥ በእጅ እየተፈተለ የተሰራ።' : 'Authentic unbleached organic cotton handspun into airy, resilient Ethiopian cloth.'}
            </p>
          </div>

          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <CheckCircle2 className="w-8 h-8 text-[#2E4739] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {t.fastTurnaround}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'በ 2 እስከ 5 ቀናት ውስጥ ትዕዛዝዎን አጠናቀን በታማኝነት እናስረክባለን።' : 'Expedited tailoring completing bespoke wedding orders in as fast as 2-5 days.'}
            </p>
          </div>

          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <Users className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {t.bulkDiscountTitle}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'ለሰርግ ሙሽሮች፣ ለሚዜዎች እና ለቤተሰብ የጅምላ ትዕዛዞች ከፍተኛ ቅናሽ።' : 'Attractive tiered discounts for bridal trains, church choirs, and festive family events.'}
            </p>
          </div>

          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <ShieldCheck className="w-8 h-8 text-[#8B0000] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {language === 'am' ? 'የአለም አቀፍ መላኪያ' : 'Worldwide Delivery'}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'በዲኤችኤል (DHL) እና በፖስታ በኩል ወደ አሜሪካ፣ አውሮፓ እና መካከለኛው ምስራቅ እንልካለን።' : 'Secure international shipping via DHL Express to USA, Europe, Canada & Middle East.'}
            </p>
          </div>
        </div>

        {/* Physical Store Location Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#2D241E] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[#C5A059] text-xs font-bold uppercase tracking-wider">
              {language === 'am' ? 'በአካል መጥተው ይጎብኙን' : 'Visit Our Physical Atelier'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              {STORE_INFO.name}
            </h3>
            <p className="text-sm text-white/80 max-w-xl">
              {currentAddress} • {language === 'am' ? 'ሰኞ - ቅዳሜ 2:30 - 12:30' : 'Mon - Sat 8:30 AM - 6:30 PM'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-6 py-3 bg-[#8B0000] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#A52A2A] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{language === 'am' ? 'አድራሻ / WhatsApp' : 'Atelier Contact'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
