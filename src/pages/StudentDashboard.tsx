import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Coffee,
  Sandwich,
  Pizza,
  Cake,
  Utensils
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FoodCard } from '../components/common/FoodCard';
import { CrowdIndicator } from '../components/common/CrowdIndicator';
import { Category } from '../types';

export const StudentDashboard: React.FC = () => {
  const { currentUser, menuItems, activeStudentOrder } = useCanteen();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const todayDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  const categories: { label: Category; icon: any; color: string }[] = [
    { label: 'Breakfast', icon: Coffee, color: 'bg-amber-50 text-amber-600' },
    { label: 'Meals', icon: Utensils, color: 'bg-orange-50 text-[#F46B35]' },
    { label: 'Snacks', icon: Sandwich, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Beverages', icon: Coffee, color: 'bg-blue-50 text-blue-600' },
    { label: 'Fast Food', icon: Pizza, color: 'bg-rose-50 text-rose-600' },
    { label: 'Desserts', icon: Cake, color: 'bg-purple-50 text-purple-600' },
  ];

  const popularItems = menuItems.filter(item => item.popular).slice(0, 4);
  const recommendedItems = menuItems.filter(item => item.recommended).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#F46B35]" />
              <span>{todayDate}</span>
              <span>·</span>
              <span>Central Campus Dining</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202124]">
              Good morning, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              What would you like to eat today? Live kitchen is actively accepting tokens.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input in Header */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search dosas, rolls, rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EEEAE5] text-sm text-[#202124] focus:outline-none focus:border-[#F46B35] shadow-sm"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </form>

            {/* Notification Bell */}
            <button
              className="w-10 h-10 rounded-xl bg-white border border-[#EEEAE5] flex items-center justify-center text-neutral-600 hover:text-[#202124] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#F46B35] absolute top-2 right-2" />
            </button>

            {/* Student Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#EEEAE5]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
              />
            </div>
          </div>
        </div>

        {/* SECTION A: CANTEEN STATUS */}
        <section>
          <CrowdIndicator />
        </section>

        {/* SECTION D: ACTIVE ORDER (If student has active order) */}
        {activeStudentOrder && (
          <section className="bg-white rounded-2xl border-2 border-[#F46B35]/30 p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F46B35] to-[#FF8A50]" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#FFF0E8] text-[#F46B35]">
                    Active Live Order
                  </span>
                  <span className="text-xs text-neutral-400">Placed at {activeStudentOrder.createdAt}</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-black font-mono tracking-tight text-[#202124]">
                    TOKEN: {activeStudentOrder.token}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                    {activeStudentOrder.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
                  <div className="font-semibold text-[#202124]">
                    {activeStudentOrder.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                    <span>Queue Position:</span>
                    <strong className="text-[#202124] font-mono">#{activeStudentOrder.queuePosition}</strong>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F46B35]" />
                    <span>Est. Time:</span>
                    <strong className="text-[#F46B35] font-mono">~{activeStudentOrder.estimatedWaitMinutes} minutes</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/orders/${activeStudentOrder.id}`}
                  className="px-6 py-3 rounded-xl bg-[#202124] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Track Order</span>
                  <ArrowRight className="w-4 h-4 text-[#FF8A50]" />
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* SECTION B: QUICK CATEGORIES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#202124]">Quick Categories</h2>
            <Link to="/menu" className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-1">
              <span>View All Menu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => navigate(`/menu?category=${encodeURIComponent(cat.label)}`)}
                  className="p-4 rounded-2xl bg-white border border-[#EEEAE5] hover:border-[#F46B35]/50 transition-all text-center flex flex-col items-center gap-2.5 group hover:shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#202124] group-hover:text-[#F46B35] transition-colors">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION C: POPULAR TODAY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#202124]">Popular Today</h2>
              <p className="text-xs text-neutral-500">Student favorites with highest sales velocity right now</p>
            </div>
            <Link to="/menu?filter=popular" className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-1">
              <span>Explore Top Items</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* SECTION F: AI FOOD ASSISTANT (Hero Banner Card) */}
        <section className="bg-gradient-to-r from-[#202124] to-[#2c2d30] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="max-w-xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F46B35]/20 text-[#FF8A50] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Campus Companion</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Not sure what to eat? Let AI find your perfect meal.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Find filling lunch combos under ₹50, high-protein bites, or quick snack combos ready in 3 minutes.
            </p>
            <div className="pt-2">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask CanteenX AI</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION E: RECOMMENDATIONS ("Picked for You") */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#202124]">Picked for You</h2>
              <p className="text-xs text-neutral-500">Curated dishes based on prep speed and student reviews</p>
            </div>
            <Link to="/menu" className="text-xs font-bold text-[#F46B35] hover:underline flex items-center gap-1">
              <span>View Full Menu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
