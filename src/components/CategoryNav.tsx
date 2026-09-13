import React from 'react';
import { CATEGORY_GROUPS, CATEGORIES, getCategoryDisplay, getCategoryShortDisplay } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language, CategoryGroupId } from '../types';

interface CategoryNavProps {
  language: Language;
  selectedGroup: CategoryGroupId;
  onSelectGroup: (group: CategoryGroupId) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  language,
  selectedGroup,
  onSelectGroup,
  selectedTag,
  onSelectTag,
}) => {
  const t = getTranslation(language);

  const filteredCategories = selectedGroup === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.group === selectedGroup);

  return (
    <div className="bg-[#FDFCF8] border-b border-[#EAD8C0] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Category Group Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORY_GROUPS.map((grp) => {
            const isSelected = selectedGroup === grp.id;
            const label = language === 'ti' 
              ? (grp.nameTi || grp.nameAm) 
              : (language === 'en' ? grp.nameEn : grp.nameAm);

            return (
              <button
                key={grp.id}
                onClick={() => {
                  onSelectGroup(grp.id as CategoryGroupId);
                  onSelectTag(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B0000] text-white shadow-sm'
                    : 'bg-[#F9F4EC] text-[#2D241E] hover:bg-[#EAD8C0]/60 border border-[#EAD8C0]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Sub-category / Tag Pills Rail */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedTag === null
                ? 'bg-[#C5A059] text-white'
                : 'bg-white text-[#2D241E]/70 hover:text-[#8B0000] border border-[#EAD8C0]'
            }`}
          >
            {t.allPill}
          </button>

          {filteredCategories.map((cat) => {
            const isTagSelected = selectedTag === cat.tag;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectTag(isTagSelected ? null : cat.tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isTagSelected
                    ? 'bg-[#8B0000] text-white shadow-2xs'
                    : 'bg-white text-[#2D241E]/80 hover:border-[#8B0000] border border-[#EAD8C0]'
                }`}
              >
                {getCategoryShortDisplay(cat.tag, language)}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
