import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  Award, 
  ArrowUpRight, 
  Users, 
  PieChart as PieIcon,
  BarChart3
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
  Cell,
  AreaChart,
  Area
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days'>('today');

  const COLORS = ['#F46B35', '#FF8A50', '#F3A712', '#16A36A', '#3B82F6', '#8B5CF6'];

  const stats = {
    today: {
      revenue: '₹24,850',
      orders: 348,
      avgWait: '7.4 min',
      topItem: 'Veg Fried Rice (74 orders)',
      growth: '+12.4% vs yesterday',
    },
    '7days': {
      revenue: '₹1,72,400',
      orders: 2420,
      avgWait: '8.1 min',
      topItem: 'Veg Fried Rice (490 orders)',
      growth: '+8.6% vs last week',
    },
    '30days': {
      revenue: '₹7,48,000',
      orders: 10450,
      avgWait: '7.9 min',
      topItem: 'Veg Fried Rice (2,180 orders)',
      growth: '+15.2% vs last month',
    },
  }[dateRange];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header & Date Range Segmented Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Campus Dining Analytics
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Historical sales velocity, rush-hour volume, and best-seller performance metrics.
            </p>
          </div>

          {/* Date Range Tabs */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-[#EEEAE5] shadow-xs self-start sm:self-auto">
            <button
              onClick={() => setDateRange('today')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dateRange === 'today' ? 'bg-[#202124] text-white shadow-sm' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDateRange('7days')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dateRange === '7days' ? 'bg-[#202124] text-white shadow-sm' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange('30days')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dateRange === '30days' ? 'bg-[#202124] text-white shadow-sm' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* 4 HIGH-LEVEL KPI METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Gross Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-[#FFF0E8] text-[#F46B35] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-mono text-[#202124] tabular-nums">{stats.revenue}</div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{stats.growth}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF8A50] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-mono text-[#202124] tabular-nums">
              {stats.orders.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">98.2% fulfillment rate</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Average Wait Time</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-mono text-[#202124] tabular-nums">{stats.avgWait}</div>
            <div className="text-[11px] text-emerald-600 mt-1">3.2 mins faster than campus benchmark</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Best-Selling Dish</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-extrabold text-[#202124] truncate mt-1">Veg Fried Rice</div>
            <div className="text-[11px] text-neutral-500 font-mono mt-1">74 orders today · ₹3,700</div>
          </div>
        </div>

        {/* CHART 1: REVENUE & ORDER TRENDS */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#202124]">
                {dateRange === 'today' ? "Today's Hourly Revenue & Order Trajectory" : 'Daily Revenue & Volume Trend'}
              </h3>
              <p className="text-xs text-neutral-500">Visualizing rush hours and sales performance across time</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {dateRange === 'today' ? (
                <AreaChart data={ANALYTICS_DATA.today.hourlyOrders}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F46B35" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F46B35" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#202124', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    formatter={(val: any, name: any) => [name === 'revenue' ? `₹${val}` : val, name === 'revenue' ? 'Revenue' : 'Orders']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#F46B35" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              ) : (
                <BarChart data={ANALYTICS_DATA.last7Days.dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#202124', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    formatter={(val: any) => [`₹${val}`, 'Daily Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#F46B35" radius={[6, 6, 0, 0]} name="Daily Revenue" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2-COLUMN SPLIT: Top Items & Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Most Popular Food Items (Horizontal Bar) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#202124]">Most Popular Dishes (Top 5)</h3>
              <p className="text-xs text-neutral-500">Ranked by volume count and gross kitchen turnover</p>
            </div>

            <div className="space-y-4 pt-2">
              {ANALYTICS_DATA.today.topItems.map((item, idx) => {
                const maxOrders = 100;
                const pct = (item.count / maxOrders) * 100;
                return (
                  <div key={item.name} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#202124]">
                      <span className="flex items-center gap-2">
                        <span className="w-5 text-neutral-400 font-mono">0{idx + 1}</span>
                        <span>{item.name}</span>
                      </span>
                      <span className="font-mono tabular-nums text-neutral-600">
                        {item.count} orders · <strong className="text-[#F46B35]">₹{item.revenue}</strong>
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#F46B35] to-[#FF8A50]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Sales Distribution */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#202124]">Department Share</h3>
              <p className="text-xs text-neutral-500">Gross revenue split across canteen sections</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ANALYTICS_DATA.today.categoryShare}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ANALYTICS_DATA.today.categoryShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#202124', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                    formatter={(val: any) => [`₹${val}`, 'Gross Sales']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#EEEAE5]">
              {ANALYTICS_DATA.today.categoryShare.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-neutral-700 truncate font-medium">{cat.name}: ₹{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
