import React, { useState, useMemo } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  Search, 
  ChefHat, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Filter, 
  AlertCircle,
  BellRing,
  CheckCheck,
  UtensilsCrossed
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { OrderStatus } from '../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useCanteen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesToken = order.token.toLowerCase().includes(q);
        const matchesStudent = order.studentName.toLowerCase().includes(q);
        const matchesRoll = order.studentRoll.toLowerCase().includes(q);
        const matchesDish = order.items.some(i => i.name.toLowerCase().includes(q));
        if (!matchesToken && !matchesStudent && !matchesRoll && !matchesDish) return false;
      }

      // Status
      if (statusFilter !== 'All' && order.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchTerm, statusFilter]);

  const activeOrdersCount = orders.filter(o => ['Placed', 'Confirmed', 'Preparing', 'Ready'].includes(o.status)).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Kitchen Display System (KDS) & Orders
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Live orders management. Update tokens to broadcast live progress to student smartphones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#FFF0E8] border border-[#F46B35]/20 text-[#F46B35] text-xs font-bold font-mono">
              {activeOrdersCount} ACTIVE TOKENS IN KITCHEN
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by token (e.g. CX-1042), student, or dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-medium text-[#202124] focus:outline-none focus:border-[#F46B35]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          </div>

          {/* Status Buttons Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['All', 'Placed', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  statusFilter === st
                    ? 'bg-[#202124] text-white shadow-sm'
                    : 'bg-[#FAF9F6] text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Orders Grid / Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.map((ord) => {
            let statusColor = 'bg-neutral-100 text-neutral-700 border-neutral-200';
            let cardRing = 'border-[#EEEAE5]';

            if (ord.status === 'Placed') {
              statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
              cardRing = 'border-rose-200 bg-rose-50/20';
            } else if (ord.status === 'Confirmed') {
              statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
            } else if (ord.status === 'Preparing') {
              statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
              cardRing = 'border-[#F46B35]/40 ring-2 ring-[#F46B35]/10';
            } else if (ord.status === 'Ready') {
              statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-300';
              cardRing = 'border-emerald-300 ring-2 ring-emerald-500/10';
            } else if (ord.status === 'Completed') {
              statusColor = 'bg-neutral-100 text-neutral-500 border-neutral-200';
            }

            return (
              <div
                key={ord.id}
                className={`bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between transition-all ${cardRing}`}
              >
                <div className="space-y-4">
                  {/* Top line: Token & Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE5]">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Digital Token</div>
                      <div className="text-2xl font-black font-mono text-[#202124] tracking-tight">
                        {ord.token}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${statusColor}`}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Student details */}
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#202124]">{ord.studentName}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">Roll: {ord.studentRoll}</div>
                    </div>
                    <div className="text-right text-[11px] text-neutral-500">
                      <div>Slot: {ord.pickupSlot}</div>
                      <div className="font-mono text-neutral-400">{ord.createdAt}</div>
                    </div>
                  </div>

                  {/* Food items ordered */}
                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Kitchen Items ({ord.items.reduce((acc, i) => acc + i.quantity, 0)})
                    </div>
                    <div className="space-y-1.5 text-xs">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="font-bold text-[#202124]">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-mono text-neutral-500">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    {ord.notes && (
                      <div className="pt-2 border-t border-[#EEEAE5] text-[11px] text-[#F46B35] font-semibold italic">
                        Note: {ord.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-neutral-500">Paid via {ord.paymentMethod}</span>
                    <span className="text-base font-extrabold text-[#202124] font-mono tabular-nums">
                      ₹{ord.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="pt-4 mt-4 border-t border-[#EEEAE5] flex flex-wrap items-center gap-2">
                  {ord.status === 'Placed' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#202124] hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                    >
                      Confirm
                    </button>
                  )}

                  {ord.status === 'Confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Start Preparing</span>
                    </button>
                  )}

                  {ord.status === 'Preparing' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Ready')}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#16A36A] hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <BellRing className="w-3.5 h-3.5" />
                      <span>Mark Ready (Notify)</span>
                    </button>
                  )}

                  {ord.status === 'Ready' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Completed')}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#202124] hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>Complete Pickup</span>
                    </button>
                  )}

                  {ord.status !== 'Completed' && ord.status !== 'Cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Cancelled')}
                      className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#E64B4B] text-xs font-bold transition-colors"
                      title="Cancel order"
                    >
                      Cancel
                    </button>
                  )}

                  {ord.status === 'Completed' && (
                    <div className="w-full text-center py-1.5 text-xs font-bold text-neutral-400 bg-neutral-100 rounded-lg">
                      Collected at {ord.completedAt || 'Counter'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
};
