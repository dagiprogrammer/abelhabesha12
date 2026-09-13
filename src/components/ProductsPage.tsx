import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowUpDown,
  Tag,
  ShoppingBag
} from 'lucide-react';
import { Product, Language, CategoryGroupId } from '../types';
import { CategoryNav } from './CategoryNav';
import { HashtagExplorer } from './HashtagExplorer';
import { ProductCard } from './ProductCard';
import { getTranslation } from '../data/translations';
import { CATEGORIES } from '../data/categories';

interface ProductsPageProps {
  products: Product[];
  currency: 'ETB' | 'USD';
  language: Language;
  selectedGroup: CategoryGroupId;
  onSelectGroup: (g: CategoryGroupId) => void;
  selectedTag: string | null;
  onSelectTag: (t: string | null) => void;
  searchQuery: string;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  currency,
  language,
  selectedGroup,
  onSelectGroup,
  selectedTag,
  onSelectTag,
  searchQuery,
  onSelectProduct,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'bestsellers'>('featured');
  const [showHashtags, setShowHashtags] = useState(false);

  const t = getTranslation(language);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Group check
      if (selectedGroup !== 'all' && p.categoryGroup !== selectedGroup) {
        return false;
      }

      // 2. Tag check
      if (selectedTag) {
        const hasTag = p.hashtags.some(
          (t) => t === selectedTag || t.toLowerCase() === selectedTag.toLowerCase()
        );
        if (!hasTag) return false;
      }

      // 3. Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesNameAm = p.nameAm.toLowerCase().includes(query);
        const matchesNameEn = p.nameEn.toLowerCase().includes(query);
        const matchesFabric = p.fabricAm.toLowerCase().includes(query) || p.fabricEn.toLowerCase().includes(query);
        const matchesTags = p.hashtags.some((t) => t.toLowerCase().includes(query));
        if (!matchesCode && !matchesNameAm && !matchesNameEn && !matchesFabric && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceETB - b.priceETB;
      if (sortBy === 'price-desc') return b.priceETB - a.priceETB;
      if (sortBy === 'bestsellers') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedGroup, selectedTag, searchQuery, sortBy]);

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      
      {/* Category Navigation Bar */}
      <CategoryNav
        language={language}
        selectedGroup={selectedGroup}
        onSelectGroup={onSelectGroup}
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls Bar: Sort, Tag Explorer Toggle, Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#EAD8C0]">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E]">
              {selectedTag ? `${selectedTag}` : t.navProducts}
            </h1>
            <p className="text-xs text-[#2D241E]/70 mt-0.5">
              {filteredProducts.length} {t.showingItems}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setShowHashtags(!showHashtags)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showHashtags || selectedTag
                  ? 'bg-[#8B0000] text-white border-[#8B0000]'
                  : 'bg-white text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t.collectionsHeader}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-[#EAD8C0] rounded-xl px-2.5 py-1 text-xs font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8B0000]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#2D241E] focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">ተመራጭ (Featured)</option>
                <option value="bestsellers">ምርጥ ሽያጭ (Bestsellers)</option>
                <option value="price-asc">ዋጋ፡ ዝቅተኛ ወደ ከፍተኛ (Price: Low to High)</option>
                <option value="price-desc">ዋጋ፡ ከፍተኛ ወደ ዝቅተኛ (Price: High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Hashtag Explorer */}
        {showHashtags && (
          <HashtagExplorer
            language={language}
            selectedTag={selectedTag}
            onSelectTag={(tag) => {
              onSelectTag(tag);
              setShowHashtags(false);
            }}
          />
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F9F4EC] rounded-3xl border border-[#EAD8C0] p-8">
            <ShoppingBag className="w-12 h-12 mx-auto text-stone-400 mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#2D241E]">
              {language === 'am' ? 'ምንም ልብስ አልተገኘም' : 'No traditional attire found'}
            </h3>
            <p className="text-xs text-[#2D241E]/70 max-w-sm mx-auto mt-1 mb-4">
              {language === 'am' 
                ? 'እባክዎ የተመረጠውን ማጣሪያ ያጥፉ ወይም ሌላ ስም ይፈልጉ' 
                : 'Try adjusting your search terms or clearing your current filter.'}
            </p>
            <button
              onClick={() => {
                onSelectGroup('all');
                onSelectTag(null);
              }}
              className="px-5 py-2.5 bg-[#8B0000] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#A52A2A] transition-colors cursor-pointer"
            >
              {t.clearFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                currency={currency}
                language={language}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onTagClick={onSelectTag}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
