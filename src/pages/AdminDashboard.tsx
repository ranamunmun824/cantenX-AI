import React from 'react';
import { Link } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  ChefHat, 
  Sparkles, 
  Boxes, 
  Utensils,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ANALYTICS_DATA } from '../data/seedData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useCanteen();

  // Metrics derived from actual order dataset
  const pendingOrders = orders.filter(o => ['Placed', 'Confirmed', 'Preparing'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'Completed');
  const activeQueueCount = pendingOrders.length;
  
  // Aggregate revenue from today's orders
  const todayRevenue = ANALYTICS_DATA.today.totalRevenue + orders.slice(0, 5).reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = ANALYTICS_DATA.today.totalOrders + orders.length;

  const statCards = [
    { label: 'Total Orders Today', value: totalOrdersCount, icon: ShoppingBag, color: 'text-[#F46B35] bg-[#FFF0E8]' },
    { label: 'Completed Orders', value: ANALYTICS_DATA.today.totalOrders - 12, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'In-Flight Orders', value: activeQueueCount, icon: Clock, color: 'text-amber-600 bg-amber-50', highlight: true },
    { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-[#F46B35] bg-[#FFF0E8]' },
    { label: 'Avg Waiting Time', value: '7.4 mins', icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Kitchen Queue', value: `${activeQueueCount} tokens`, icon: Users, color: 'text-purple-600 bg-purple-50' },
  ];

  const COLORS = ['#F46B35', '#FF8A50', '#F3A712', '#16A36A', '#3B82F6', '#8B5CF6'];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Good morning, Admin.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Here's what's happening across campus dining halls and kitchen stations today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/orders"
              className="px-4 py-2 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ChefHat className="w-4 h-4" />
              <span>Open Live KDS Screen</span>
            </Link>
          </div>
        </div>

        {/* OVERVIEW CARDS (6 CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between ${
                  card.highlight ? 'border-[#F46B35]/40 ring-2 ring-[#F46B35]/10' : 'border-[#EEEAE5]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-[#202124] tabular-nums">
                  {card.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Orders Over Time (Peak Rush Distribution) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#202124]">Orders & Revenue Velocity by Hour</h3>
                <p className="text-xs text-neutral-500">Hourly dining hall traffic and peak lunchtime rush distribution</p>
              </div>
              <span className="text-xs font-bold text-[#F46B35] bg-[#FFF0E8] px-2.5 py-1 rounded-md">
                Peak: 1:00 PM (86 orders)
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_DATA.today.hourlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#202124', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    labelStyle={{ color: '#FF8A50', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="orders" fill="#F46B35" radius={[6, 6, 0, 0]} name="Orders Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category (Donut Chart) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#202124]">Revenue by Category</h3>
              <p className="text-xs text-neutral-500">Sales volume share across departments</p>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ANALYTICS_DATA.today.categoryShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ANALYTICS_DATA.today.categoryShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#202124', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${val}`, 'Sales']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#EEEAE5]">
              {ANALYTICS_DATA.today.categoryShare.slice(0, 4).map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="truncate text-neutral-600">{c.name} (₹{c.value})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/orders"
            className="p-4 rounded-2xl bg-white border border-[#EEEAE5] hover:border-[#F46B35] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F46B35] flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#202124] group-hover:text-[#F46B35]">Manage Live Orders</h4>
                <p className="text-[11px] text-neutral-400">{activeQueueCount} in kitchen</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#F46B35] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/admin/menu"
            className="p-4 rounded-2xl bg-white border border-[#EEEAE5] hover:border-[#F46B35] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#202124] group-hover:text-[#F46B35]">Update Food Catalog</h4>
                <p className="text-[11px] text-neutral-400">30 items active</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#F46B35] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/admin/inventory"
            className="p-4 rounded-2xl bg-white border border-[#EEEAE5] hover:border-[#F46B35] transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#202124] group-hover:text-[#F46B35]">Inventory Audit</h4>
                <p className="text-[11px] text-neutral-400">Real-time balances</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#F46B35] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/admin/insights"
            className="p-4 rounded-2xl bg-[#202124] text-white hover:bg-neutral-800 transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FF8A50] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#FF8A50]">AI Intelligence Center</h4>
                <p className="text-[11px] text-neutral-400">PartyRock insights</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF8A50] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#EEEAE5] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#202124]">Live Kitchen Queue & Incoming Tokens</h3>
              <p className="text-xs text-neutral-500">Real-time status changes sync directly to student devices</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#EEEAE5] text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Token</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Food Items</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Kitchen Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEAE5]">
                {orders.slice(0, 7).map((ord) => {
                  let badge = 'bg-neutral-100 text-neutral-700';
                  if (ord.status === 'Ready') badge = 'bg-emerald-100 text-emerald-800';
                  if (ord.status === 'Preparing') badge = 'bg-amber-100 text-amber-800';
                  if (ord.status === 'Confirmed') badge = 'bg-blue-100 text-blue-800';
                  if (ord.status === 'Completed') badge = 'bg-neutral-100 text-neutral-500';

                  return (
                    <tr key={ord.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-black font-mono text-[#202124] text-sm">
                        {ord.token}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#202124]">{ord.studentName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{ord.studentRoll}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-neutral-700 font-medium">
                        {ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black font-mono text-[#202124] tabular-nums">
                        ₹{ord.totalAmount}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-500 font-mono">
                        {ord.createdAt}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${badge}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {ord.status === 'Placed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-[#202124] text-white font-bold hover:bg-neutral-800 transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                            className="px-2.5 py-1 rounded-lg bg-[#F46B35] text-white font-bold hover:bg-[#FF8A50] transition-colors"
                          >
                            Start Prep
                          </button>
                        )}
                        {ord.status === 'Preparing' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Ready')}
                            className="px-2.5 py-1 rounded-lg bg-[#16A36A] text-white font-bold hover:bg-emerald-700 transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}
                        {ord.status === 'Ready' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-neutral-200 text-neutral-700 font-bold hover:bg-neutral-300 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {ord.status === 'Completed' && (
                          <span className="text-[11px] text-neutral-400 font-semibold">Done</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
