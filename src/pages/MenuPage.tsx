import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  X, 
  Utensils, 
  ArrowUpDown 
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FoodCard } from '../components/common/FoodCard';
import { Category, FoodType } from '../types';

export const MenuPage: React.FC = () => {
  const { menuItems } = useCanteen();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    (searchParams.get('category') as Category) || 'All'
  );
  const [dietFilter, setDietFilter] = useState<'All' | 'veg' | 'non-veg'>('All');
  const [priceRange, setPriceRange] = useState<'All' | 'under35' | 'under50' | 'above50'>('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'prep-time'>('popular');

  // Sync url param updates
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat as Category);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
    const filt = searchParams.get('filter');
    if (filt === 'popular') setSortBy('popular');
  }, [searchParams]);

  const categories: (Category | 'All')[] = [
    'All',
    'Breakfast',
    'Meals',
    'Snacks',
    'Beverages',
    'Fast Food',
    'Desserts',
  ];

  // Filtered & sorted items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Veg / Non-veg
      if (dietFilter !== 'All' && item.type !== dietFilter) {
        return false;
      }

      // Price
      if (priceRange === 'under35' && item.price > 35) return false;
      if (priceRange === 'under50' && item.price > 50) return false;
      if (priceRange === 'above50' && item.price <= 50) return false;

      // In Stock
      if (onlyAvailable && (!item.available || item.remainingStock <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'prep-time') return a.prepTimeMinutes - b.prepTimeMinutes;
      // default: popularity
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || (b.rating - a.rating);
    });
  }, [menuItems, searchQuery, selectedCategory, dietFilter, priceRange, onlyAvailable, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDietFilter('All');
    setPriceRange('All');
    setOnlyAvailable(false);
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || dietFilter !== 'All' || priceRange !== 'All' || onlyAvailable;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HEADER */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] text-[#F46B35] text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Campus Food Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
            Explore Today's Menu
          </h1>
          <p className="text-sm text-neutral-500 max-w-xl">
            Fresh choices. Smart ordering. Zero unnecessary waiting. Place advance orders and receive live kitchen updates.
          </p>
        </div>

        {/* SEARCH & PRIMARY FILTER CONTROLS */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search food items, rolls, sandwiches, beverages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-sm text-[#202124] focus:outline-none focus:border-[#F46B35]"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 whitespace-nowrap">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort food menu items"
                className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-bold text-[#202124] focus:outline-none focus:border-[#F46B35]"
              >
                <option value="popular">Most Popular & Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="prep-time">Prep Time: Fastest</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F46B35] text-white shadow-sm'
                    : 'bg-[#FAF9F6] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters Bar */}
          <div className="pt-3 border-t border-[#EEEAE5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Veg / Non-veg pill toggles */}
              <div className="flex items-center bg-[#FAF9F6] p-1 rounded-xl border border-[#EEEAE5]">
                <button
                  onClick={() => setDietFilter('All')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    dietFilter === 'All' ? 'bg-white text-[#202124] shadow-sm' : 'text-neutral-500'
                  }`}
                >
                  All Food
                </button>
                <button
                  onClick={() => setDietFilter('veg')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    dietFilter === 'veg' ? 'bg-white text-emerald-700 shadow-sm' : 'text-neutral-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Veg Only</span>
                </button>
                <button
                  onClick={() => setDietFilter('non-veg')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    dietFilter === 'non-veg' ? 'bg-white text-rose-700 shadow-sm' : 'text-neutral-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Non-Veg</span>
                </button>
              </div>

              {/* Price bracket */}
              <div className="flex items-center bg-[#FAF9F6] p-1 rounded-xl border border-[#EEEAE5]">
                <button
                  onClick={() => setPriceRange('All')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${priceRange === 'All' ? 'bg-white text-[#202124] shadow-sm' : 'text-neutral-500'}`}
                >
                  Any Price
                </button>
                <button
                  onClick={() => setPriceRange('under35')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${priceRange === 'under35' ? 'bg-white text-[#202124] shadow-sm' : 'text-neutral-500'}`}
                >
                  &le; ₹35
                </button>
                <button
                  onClick={() => setPriceRange('under50')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${priceRange === 'under50' ? 'bg-white text-[#202124] shadow-sm' : 'text-neutral-500'}`}
                >
                  &le; ₹50
                </button>
                <button
                  onClick={() => setPriceRange('above50')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${priceRange === 'above50' ? 'bg-white text-[#202124] shadow-sm' : 'text-neutral-500'}`}
                >
                  &gt; ₹50
                </button>
              </div>

              {/* In-stock checkbox */}
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-600 select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-[#F46B35] focus:ring-[#F46B35]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* RESULTS BAR */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div>
            Showing <strong className="text-[#202124] tabular-nums font-mono">{filteredItems.length}</strong> canteen items
            {selectedCategory !== 'All' && <span> in <strong className="text-[#202124]">{selectedCategory}</strong></span>}
          </div>
          <div className="text-[11px] text-neutral-400">
            Click any dish to add to order cart
          </div>
        </div>

        {/* FOOD GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EEEAE5] p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202124]">No dishes matched your filters</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your price range, clearing search terms, or exploring other categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-[#F46B35] text-white text-xs font-bold hover:bg-[#FF8A50] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
