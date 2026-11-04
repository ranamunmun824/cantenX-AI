import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Utensils, 
  ToggleLeft, 
  ToggleRight,
  Flame,
  Star
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { MenuItem, Category, FoodType } from '../types';

export const AdminMenuPage: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useCanteen();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Meals' as Category,
    price: 50,
    type: 'veg' as FoodType,
    prepTimeMinutes: 7,
    remainingStock: 40,
    available: true,
    image: '',
    popular: false,
    recommended: false,
  });

  const categories: Category[] = ['Breakfast', 'Meals', 'Snacks', 'Beverages', 'Fast Food', 'Desserts'];

  const filteredItems = menuItems.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'Meals',
      price: 50,
      type: 'veg',
      prepTimeMinutes: 7,
      remainingStock: 40,
      available: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      popular: false,
      recommended: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      type: item.type,
      prepTimeMinutes: item.prepTimeMinutes,
      remainingStock: item.remainingStock,
      available: item.available,
      image: item.image,
      popular: !!item.popular,
      recommended: !!item.recommended,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(editingItem.id, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        type: formData.type,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        remainingStock: Number(formData.remainingStock),
        available: formData.available,
        popular: formData.popular,
        recommended: formData.recommended,
      });
    } else {
      addMenuItem({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        type: formData.type,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        remainingStock: Number(formData.remainingStock),
        available: formData.available,
        image: formData.image || '/src/assets/images/food_veg_fried_rice_1793757084074.jpg',
        rating: 4.8,
        reviewCount: 1,
        popular: formData.popular,
        recommended: formData.recommended,
      });
    }
    setModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Menu & Food Catalog
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Add new recipes, update dish prices, and toggle live availability across student apps.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Food Item</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search food catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-medium text-[#202124] focus:outline-none focus:border-[#F46B35]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#202124] text-white'
                    : 'bg-[#FAF9F6] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Food Items */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#EEEAE5] text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Item & Description</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                  <th className="py-3.5 px-4 text-center">Prep Time</th>
                  <th className="py-3.5 px-4 text-center">Remaining</th>
                  <th className="py-3.5 px-4 text-center">Availability</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEAE5]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Item */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#EEEAE5] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#202124] flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {item.popular && (
                              <span className="text-[10px] bg-orange-100 text-[#F46B35] px-1.5 py-0.2 rounded font-bold">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-neutral-700">
                      {item.category}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.type === 'veg' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Veg
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Non-Veg
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-black font-mono text-[#202124] text-sm tabular-nums">
                      ₹{item.price}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-neutral-600">
                      {item.prepTimeMinutes}m
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span className={item.remainingStock < 20 ? 'text-[#F3A712]' : 'text-neutral-700'}>
                        {item.remainingStock}
                      </span>
                    </td>

                    {/* Quick Toggle Availability */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => updateMenuItem(item.id, { available: !item.available })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          item.available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-neutral-100 text-neutral-400 border border-neutral-200 hover:bg-neutral-200'
                        }`}
                      >
                        {item.available ? 'Active' : 'Sold Out'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-[#202124] hover:bg-neutral-100 transition-colors"
                          title="Edit recipe & price"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#E64B4B] hover:bg-rose-50 transition-colors"
                          title="Delete from catalog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ADD / EDIT ITEM */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#EEEAE5] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE5]">
                <h3 className="text-lg font-bold text-[#202124]">
                  {editingItem ? 'Edit Food Recipe' : 'Add New Food Item'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none"
                    placeholder="e.g. Masala Dosa"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none"
                    placeholder="Describe seasonings, ingredients, packaging..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Diet Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as FoodType })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Price (₹ INR)</label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={500}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Prep Time (min)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={60}
                      value={formData.prepTimeMinutes}
                      onChange={(e) => setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.remainingStock}
                      onChange={(e) => setFormData({ ...formData, remainingStock: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] focus:border-[#F46B35] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="rounded text-[#F46B35]"
                    />
                    <span>Available Today</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="rounded text-[#F46B35]"
                    />
                    <span>Mark as Popular</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EEEAE5]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#EEEAE5] text-neutral-600 font-bold hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold transition-colors shadow-sm"
                  >
                    {editingItem ? 'Save Changes' : 'Create Food Item'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
