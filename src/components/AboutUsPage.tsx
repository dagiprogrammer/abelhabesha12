import React from 'react';
import { Sparkles, MapPin, Phone, Award, Heart, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';
import { imgWedding, imgCouple, imgGondar } from '../data/products';

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

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src={imgWedding}
              alt="Abel Habesha Wedding Kemis"
              referrerPolicy="no-referrer"
              className="rounded-3xl h-64 sm:h-72 w-full object-cover shadow-lg border border-[#EAD8C0]"
            />
            <img
              src={imgCouple}
              alt="Abel Habesha Couple Set"
              referrerPolicy="no-referrer"
              className="rounded-3xl h-64 sm:h-72 w-full object-cover shadow-lg border border-[#EAD8C0] mt-6"
            />
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
            <Heart className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {language === 'am' ? 'የሺሮሜዳ የእጅ ጥበብ' : 'Master Loom Craft'}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'በሺሮሜዳ ዋና አውደ ጥበብ በእንጨት መወዘሪያ የተሸመኑ እውነተኛ ባህላዊ አልባሳት።' : 'Preserving centuries-old wooden pit-loom weaving techniques in the heart of Addis Ababa.'}
            </p>
          </div>

          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <ShieldCheck className="w-8 h-8 text-[#2E4739] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {t.fastTurnaround}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {language === 'am' ? 'በመረጡት ቀን በልክዎ ተሰፍቶ በጥንቃቄ ይደርሳል።' : 'Quick bespoke tailoring to your exact body measurements and requested date.'}
            </p>
          </div>

          <div className="p-6 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0]">
            <Users className="w-8 h-8 text-[#25D366] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#2D241E] mb-1">
              {t.bulkDiscountTitle}
            </h3>
            <p className="text-xs text-[#2D241E]/75 leading-relaxed">
              {t.bulkDiscountDesc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
