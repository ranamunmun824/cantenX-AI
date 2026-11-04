import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  Boxes, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Plus, 
  Minus, 
  RotateCcw,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { InventoryItem } from '../types';

export const InventoryPage: React.FC = () => {
  const { inventory, updateInventoryItem } = useCanteen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('All');

  // Edit stock modal
  const [selectedInv, setSelectedInv] = useState<InventoryItem | null>(null);
  const [editRemaining, setEditRemaining] = useState(0);
  const [editWastage, setEditWastage] = useState(0);

  const filtered = inventory.filter((inv) => {
    if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return inv.name.toLowerCase().includes(q) || inv.category.toLowerCase().includes(q);
    }
    return true;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter(i => i.status === 'Out of Stock').length;
  const inStockCount = inventory.filter(i => i.status === 'In Stock').length;
  const totalPortionsSold = inventory.reduce((acc, i) => acc + i.soldQuantity, 0);
  const totalWastage = inventory.reduce((acc, i) => acc + i.wastage, 0);

  const handleOpenEdit = (inv: InventoryItem) => {
    setSelectedInv(inv);
    setEditRemaining(inv.remainingStock);
    setEditWastage(inv.wastage);
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInv) return;
    updateInventoryItem(selectedInv.id, {
      remainingStock: Number(editRemaining),
      wastage: Number(editWastage),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setSelectedInv(null);
  };

  const handleQuickRestock = (inv: InventoryItem) => {
    updateInventoryItem(inv.id, {
      remainingStock: inv.remainingStock + 30,
      openingStock: inv.openingStock + 30,
      lastUpdated: 'Just now',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
            Kitchen Inventory & Stock Audit
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real-time tracking of portion counts, kitchen wastage, and automated low-stock warnings.
          </p>
        </div>

        {/* INVENTORY SUMMARY METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Items</span>
            <div className="text-2xl font-black font-mono text-[#202124] tabular-nums mt-1">{inventory.length}</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">30 active recipes</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">In Healthy Stock</span>
            <div className="text-2xl font-black font-mono text-emerald-600 tabular-nums mt-1">{inStockCount}</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Ready for rush</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Low Stock Warnings</span>
            <div className="text-2xl font-black font-mono text-amber-600 tabular-nums mt-1">{lowStockCount}</div>
            <div className="text-[11px] text-amber-700 mt-0.5">&lt; 20 units remaining</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Portions Sold Today</span>
            <div className="text-2xl font-black font-mono text-[#F46B35] tabular-nums mt-1">{totalPortionsSold}</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Orders fulfilled</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Recorded Wastage</span>
            <div className="text-2xl font-black font-mono text-rose-600 tabular-nums mt-1">{totalWastage}</div>
            <div className="text-[11px] text-rose-600 mt-0.5">Unsold portions</div>
          </div>
        </div>

        {/* LOW STOCK ALERT BANNER */}
        {lowStockCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  {lowStockCount} dishes running dangerously low before 1:00 PM peak rush!
                </h4>
                <p className="text-[11px] text-amber-700">
                  Items: {inventory.filter(i => i.status === 'Low Stock').slice(0, 3).map(i => i.name).join(', ')}...
                </p>
              </div>
            </div>
            <button
              onClick={() => setStatusFilter('Low Stock')}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 self-start sm:self-auto transition-colors"
            >
              Filter Low Stock
            </button>
          </div>
        )}

        {/* CONTROLS */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-medium text-[#202124] focus:outline-none focus:border-[#F46B35]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['All', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  statusFilter === st
                    ? 'bg-[#202124] text-white'
                    : 'bg-[#FAF9F6] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#EEEAE5] text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Food Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Opening Stock</th>
                  <th className="py-3.5 px-4 text-center">Sold Qty</th>
                  <th className="py-3.5 px-4 text-center">Remaining</th>
                  <th className="py-3.5 px-4 text-center">Wastage</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEAE5]">
                {filtered.map((inv) => {
                  let badge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  if (inv.status === 'Low Stock') badge = 'bg-amber-50 text-amber-700 border-amber-200';
                  if (inv.status === 'Out of Stock') badge = 'bg-rose-50 text-rose-700 border-rose-200';

                  return (
                    <tr key={inv.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#202124]">{inv.name}</div>
                        <div className="text-[10px] text-neutral-400">Updated: {inv.lastUpdated}</div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-neutral-600">
                        {inv.category}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-neutral-700">
                        {inv.openingStock} {inv.unit}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-[#F46B35]">
                        {inv.soldQuantity}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm">
                        <span className={inv.remainingStock < 20 ? 'text-[#F3A712]' : 'text-[#202124]'}>
                          {inv.remainingStock}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-rose-600 font-semibold">
                        {inv.wastage}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${badge}`}>
                          {inv.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleQuickRestock(inv)}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#EEEAE5] hover:border-[#F46B35] text-[#202124] text-[11px] font-bold transition-all"
                            title="Add +30 batch"
                          >
                            +30 Batch
                          </button>
                          <button
                            onClick={() => handleOpenEdit(inv)}
                            className="p-1 rounded-lg text-neutral-400 hover:text-[#202124] hover:bg-neutral-100 transition-colors"
                            title="Custom Stock Audit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: EDIT STOCK & WASTAGE */}
        {selectedInv && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#EEEAE5] shadow-2xl max-w-sm w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EEEAE5]">
                <h3 className="font-bold text-base text-[#202124]">
                  Stock Audit: {selectedInv.name}
                </h3>
                <button onClick={() => setSelectedInv(null)} className="text-neutral-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStock} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Remaining Portions Count
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editRemaining}
                    onChange={(e) => setEditRemaining(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] font-mono font-bold text-[#202124]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Kitchen Wastage / Spoilage
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editWastage}
                    onChange={(e) => setEditWastage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#EEEAE5] bg-[#FAF9F6] font-mono text-rose-600 font-bold"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EEEAE5]">
                  <button
                    type="button"
                    onClick={() => setSelectedInv(null)}
                    className="px-3.5 py-1.5 rounded-xl border text-neutral-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#F46B35] text-white font-bold"
                  >
                    Update Inventory
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
