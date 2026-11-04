import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCanteen } from '../../context/CanteenContext';
import { 
  LayoutDashboard, 
  ChefHat, 
  Utensils, 
  Boxes, 
  BarChart3, 
  Sparkles, 
  RotateCcw, 
  LogOut, 
  Bell, 
  Menu as MenuIcon, 
  X,
  ExternalLink,
  ChevronRight,
  Flame
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, resetDemoData, orders, switchRole } = useCanteen();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => ['Placed', 'Confirmed', 'Preparing'].includes(o.status)).length;

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Live Orders', path: '/admin/orders', icon: ChefHat, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { label: 'Menu Management', path: '/admin/menu', icon: Utensils },
    { label: 'Inventory Stock', path: '/admin/inventory', icon: Boxes },
    { label: 'Business Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'AI Insights Center', path: '/admin/insights', icon: Sparkles, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col md:flex-row text-[#202124]">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#EEEAE5] sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#202124] text-[#F46B35] flex items-center justify-center font-black">
            CX
          </div>
          <span className="font-bold text-base">CanteenX <span className="text-[#F46B35]">Admin</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg border border-[#EEEAE5] text-neutral-600"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#EEEAE5] flex flex-col transition-transform duration-200
        md:static md:translate-x-0
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Lockup */}
        <div className="p-6 border-b border-[#EEEAE5] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#202124] flex items-center justify-center text-[#F46B35] shadow-sm font-black text-sm">
              <Flame className="w-5 h-5 text-[#F46B35]" />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-[#202124]">
                Canteen<span className="text-[#F46B35]">X</span>
              </div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Kitchen OS & Operations
              </div>
            </div>
          </Link>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canteen Status Banner */}
        <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-[#FFF0E8] border border-[#F46B35]/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#F46B35] uppercase tracking-wider">Live Queue</div>
            <div className="text-sm font-bold text-[#202124] tabular-nums font-mono">{pendingOrdersCount} orders active</div>
          </div>
          <Link 
            to="/admin/orders" 
            className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-0.5"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#202124] text-white shadow-sm'
                    : item.highlight
                    ? 'text-[#F46B35] hover:bg-[#FFF0E8]'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-[#202124]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF8A50]' : item.highlight ? 'text-[#F46B35]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-[#F46B35] text-white' : 'bg-[#FFF0E8] text-[#F46B35]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="p-4 border-t border-[#EEEAE5] space-y-2">
          {/* Quick jump to student portal */}
          <button
            onClick={() => {
              switchRole('student');
              navigate('/student');
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
              <span>Switch to Student App</span>
            </div>
            <span className="text-[10px] bg-neutral-200/80 px-1.5 py-0.5 rounded font-mono">Shift</span>
          </button>

          {/* Reset Demo Data button */}
          <button
            onClick={resetDemoData}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#E64B4B] hover:bg-rose-50 transition-colors"
            title="Reset simulated data to factory defaults"
          >
            <RotateCcw className="w-4 h-4 text-[#E64B4B]" />
            <span>RESET DEMO DATA</span>
          </button>

          {/* Admin Avatar Profile */}
          <div className="pt-2 border-t border-[#EEEAE5] flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-neutral-200"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#202124] truncate">{currentUser.name}</div>
              <div className="text-[10px] text-neutral-400 truncate">Canteen Superintendent</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header bar with Breadcrumbs & Actions */}
        <header className="bg-white border-b border-[#EEEAE5] px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Campus Canteen Operations · Terminal 01
            </div>
            <div className="text-base font-bold text-[#202124]">
              {location.pathname === '/admin' && 'Executive Overview'}
              {location.pathname === '/admin/orders' && 'Live Kitchen Orders Management'}
              {location.pathname === '/admin/menu' && 'Digital Menu & Pricing Catalog'}
              {location.pathname === '/admin/inventory' && 'Inventory Stock & Wastage Audit'}
              {location.pathname === '/admin/analytics' && 'Campus Sales & Rush-Hour Analytics'}
              {location.pathname === '/admin/insights' && 'AI Intelligence & Predictive Analytics'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student View</span>
            </Link>

            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#202124] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FF8A50]" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
