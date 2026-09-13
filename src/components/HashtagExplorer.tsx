import React from 'react';
import { Sparkles } from 'lucide-react';
import { CATEGORIES, getCategoryDisplay } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface HashtagExplorerProps {
  language: Language;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export const HashtagExplorer: React.FC<HashtagExplorerProps> = ({
  language,
  selectedTag,
  onSelectTag,
}) => {
  const t = getTranslation(language);

  return (
    <div className="bg-[#F9F4EC] rounded-2xl p-5 border border-[#EAD8C0] mb-8">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B0000]" />
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#2D241E]">
            {t.collectionsHeader}
          </h3>
        </div>
        {selectedTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-xs text-[#8B0000] font-bold hover:underline cursor-pointer"
          >
            {t.clearFilter}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedTag === cat.tag;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectTag(isSelected ? null : cat.tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#8B0000] text-white shadow-xs scale-105'
                  : 'bg-white text-[#2D241E] hover:border-[#8B0000] border border-[#EAD8C0]'
              }`}
            >
              <span>{cat.tag}</span>
              <span className="opacity-60 ml-1 text-[10px]">
                ({getCategoryDisplay(cat.tag, language)})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
