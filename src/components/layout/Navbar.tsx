import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCanteen } from '../../context/CanteenContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  UtensilsCrossed,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartItemCount, currentUser, switchRole } = useCanteen();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicLanding = location.pathname === '/';
  const isAdminSection = location.pathname.startsWith('/admin');

  const navLinks = [
    { label: 'Explore Menu', path: '/menu' },
    { label: 'Student Hub', path: '/student' },
    { label: 'AI Assistant', path: '/assistant' },
    { label: 'My Orders', path: '/history' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EEEAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F46B35] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-[#202124]">
              Canteen<span className="text-[#F46B35]">X</span> <span className="text-xs px-1.5 py-0.5 rounded bg-[#FFF0E8] text-[#F46B35] font-bold">AI</span>
            </span>
          </div>
        </Link>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#202124]/80">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-[#F46B35] font-bold border-b-2 border-[#F46B35]'
                    : 'hover:text-[#F46B35]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions - Cart + Role Switcher / Portal Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Cart button */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#EEEAE5] hover:border-[#F46B35]/40 text-[#202124] transition-colors"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#F46B35] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Role quick toggler for hackathon evaluation */}
          <div className="hidden sm:flex items-center bg-[#EEEAE5]/60 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => switchRole('student')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                currentUser.role === 'student'
                  ? 'bg-white text-[#202124] shadow-sm'
                  : 'text-neutral-500 hover:text-[#202124]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#F46B35]" />
              <span>Student</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-white text-[#202124] shadow-sm'
                  : 'text-neutral-500 hover:text-[#202124]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F46B35]" />
              <span>Admin</span>
            </button>
          </div>

          {/* Portal Switch CTA */}
          {currentUser.role === 'admin' ? (
            <Link
              to="/admin"
              className="px-4 py-2 text-xs font-bold text-white bg-[#202124] rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF8A50]" />
              <span>Admin Panel</span>
            </Link>
          ) : (
            <Link
              to="/student"
              className="px-4 py-2 text-xs font-bold text-white bg-[#F46B35] rounded-xl hover:bg-[#FF8A50] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Student App</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#EEEAE5] bg-white text-neutral-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EEEAE5] bg-[#FAF9F6] px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#EEEAE5]">
            <button
              onClick={() => { switchRole('student'); setMobileMenuOpen(false); }}
              className={`py-2 rounded-xl text-xs font-bold ${
                currentUser.role === 'student' ? 'bg-[#F46B35] text-white' : 'bg-white border text-neutral-700'
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
              className={`py-2 rounded-xl text-xs font-bold ${
                currentUser.role === 'admin' ? 'bg-[#202124] text-white' : 'bg-white border text-neutral-700'
              }`}
            >
              Admin View
            </button>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-[#202124] rounded-lg hover:bg-[#FFF0E8]"
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-neutral-600 hover:text-black"
          >
            Switch Account / Login
          </Link>
        </div>
      )}
    </header>
  );
};
