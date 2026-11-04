import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles,
  Info
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, cartItemCount } = useCanteen();
  const navigate = useNavigate();

  const [pickupSlot, setPickupSlot] = useState('Immediate (Next 10 mins)');

  const pickupSlots = [
    'Immediate (Next 10 mins)',
    'Lunch Slot 1: 1:00 PM – 1:15 PM',
    'Lunch Slot 2: 1:15 PM – 1:30 PM',
    'Lunch Slot 3: 1:30 PM – 1:45 PM',
    'Afternoon Tea: 3:30 PM – 3:45 PM',
  ];

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF0E8] text-[#F46B35] flex items-center justify-center shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">Your cart is hungry!</h1>
          <p className="text-sm text-neutral-500 max-w-sm">
            You haven't selected any dishes yet. Browse today's live canteen menu or ask the AI assistant for recommendations under ₹50.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="px-6 py-3 rounded-xl bg-[#F46B35] text-white text-xs font-bold hover:bg-[#FF8A50] transition-colors shadow-sm"
            >
              Explore Today's Menu
            </Link>
            <Link
              to="/assistant"
              className="px-6 py-3 rounded-xl bg-white border border-[#EEEAE5] text-[#202124] text-xs font-bold hover:bg-neutral-50 transition-colors"
            >
              Ask AI Assistant
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#F46B35] mb-1">
              Order Review
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Your Shopping Cart ({cartItemCount} items)
            </h1>
          </div>

          <Link
            to="/menu"
            className="text-xs font-bold text-neutral-600 hover:text-[#F46B35] flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Ordering</span>
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EEEAE5] divide-y divide-[#EEEAE5] overflow-hidden shadow-sm">
              {cart.map((ci) => {
                const itemTotal = ci.menuItem.price * ci.quantity;
                return (
                  <div key={ci.menuItem.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    
                    {/* Image & details */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={ci.menuItem.image}
                        alt={ci.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#EEEAE5] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-[#202124] truncate">
                            {ci.menuItem.name}
                          </h3>
                          {ci.menuItem.type === 'veg' ? (
                            <div className="w-3 h-3 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            </div>
                          ) : (
                            <div className="w-3 h-3 border border-rose-700 rounded-sm flex items-center justify-center p-0.5 shrink-0">
                              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-rose-700" />
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          ₹{ci.menuItem.price} each · {ci.menuItem.category}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Prep time: ~{ci.menuItem.prepTimeMinutes}m</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & Price */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center bg-[#FAF9F6] border border-[#EEEAE5] rounded-xl p-1">
                        <button
                          onClick={() => updateCartQuantity(ci.menuItem.id, ci.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-600 hover:text-black transition-colors"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-[#202124] tabular-nums">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(ci.menuItem.id, ci.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-600 hover:text-black transition-colors"
                          title="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right w-16">
                        <span className="font-extrabold text-sm text-[#202124] font-mono tabular-nums">
                          ₹{itemTotal}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(ci.menuItem.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-[#E64B4B] hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Quick helper note */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/60 text-xs text-neutral-700">
              <Sparkles className="w-4 h-4 text-[#F46B35] shrink-0" />
              <span>
                Your order is prepared fresh on-demand upon token confirmation to avoid food wastage.
              </span>
            </div>
          </div>

          {/* Checkout Summary Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-[#202124] pb-3 border-b border-[#EEEAE5]">
                Order Details & Pickup
              </h3>

              {/* Pickup slot selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Select Pickup Time Window
                </label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-bold text-[#202124] focus:outline-none focus:border-[#F46B35]"
                >
                  {pickupSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400">
                  Select a later slot if you are currently in class.
                </p>
              </div>

              {/* Price calculations */}
              <div className="space-y-2.5 text-xs text-neutral-600 pt-2 border-t border-[#EEEAE5]">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span className="font-bold font-mono text-[#202124] tabular-nums">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Campus Convenience Fee</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (Included)</span>
                  <span className="font-semibold text-neutral-500">₹0</span>
                </div>

                <div className="pt-3 border-t border-[#EEEAE5] flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#202124]">Total Payable</span>
                  <span className="text-2xl font-black text-[#F46B35] font-mono tabular-nums">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                onClick={() => navigate('/checkout', { state: { pickupSlot } })}
                className="w-full py-3.5 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                Next step: Select payment method & generate digital token.
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
