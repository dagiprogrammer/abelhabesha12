import React from 'react';
import { Camera, Send, Scissors, ShoppingBag, Tag, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface HowToOrderSectionProps {
  language: Language;
}

export const HowToOrderSection: React.FC<HowToOrderSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  const steps = [
    {
      icon: ShoppingBag,
      stepNum: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      accentColor: '#8B0000',
    },
    {
      icon: Camera,
      stepNum: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      accentColor: '#C5A059',
    },
    {
      icon: Send,
      stepNum: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      accentColor: '#25D366',
    },
    {
      icon: Scissors,
      stepNum: '04',
      title: t.step4Title,
      desc: t.step4Desc,
      accentColor: '#2E4739',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F9F4EC] border-y border-[#EAD8C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2D241E]">
            {t.howToOrderTitle}
          </h2>
          <p className="mt-2 text-sm text-[#2D241E]/75">
            {t.howToOrderSubtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#EAD8C0] shadow-xs hover:shadow-md transition-shadow relative flex flex-col items-start text-left"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-serif font-bold text-[#2D241E]/20">
                    {item.stepNum}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#2D241E] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2D241E]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Special Bulk Order Note */}
        <div className="mt-10 p-5 rounded-2xl bg-linear-to-r from-[#8B0000] to-[#5a0000] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-white flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.orderNoteTitle}
              </h4>
              <p className="text-xs text-white/85">
                {t.orderNoteDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-5 py-2.5 bg-white text-[#8B0000] hover:bg-[#F9F4EC] rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
