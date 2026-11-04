import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  CreditCard, 
  Wallet, 
  Banknote, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  QrCode
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, createOrder, currentUser } = useCanteen();
  const location = useLocation();
  const navigate = useNavigate();

  const initialSlot = (location.state as any)?.pickupSlot || 'Immediate (Next 10 mins)';
  const [pickupSlot, setPickupSlot] = useState(initialSlot);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Pay at Counter' | 'Cash'>('UPI');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#202124]">Cart is empty</h2>
          <p className="text-sm text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
          <Link
            to="/menu"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#F46B35] text-white text-xs font-bold"
          >
            Go to Menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      const created = createOrder(paymentMethod, pickupSlot, specialNotes);
      setIsPlacing(false);
      navigate(`/orders/${created.id}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            to="/cart"
            className="text-xs font-bold text-neutral-600 hover:text-[#F46B35] flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <div className="text-xs text-neutral-400">
            Step 2 of 2 · Final Token Confirmation
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Preferences */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Student Info Card */}
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ordering Student</span>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#202124]">{currentUser.name}</h3>
                  <p className="text-xs text-neutral-500">{currentUser.department} · Roll: {currentUser.rollNumber}</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700">
                  Verified Student ID
                </span>
              </div>
            </div>

            {/* Pickup Window */}
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#202124] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#F46B35]" />
                <span>Pickup Time Schedule</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Immediate (Next 10 mins)',
                  'Lunch Slot 1: 1:00 PM – 1:15 PM',
                  'Lunch Slot 2: 1:15 PM – 1:30 PM',
                  'Afternoon Tea: 3:30 PM – 3:45 PM'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPickupSlot(slot)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      pickupSlot === slot
                        ? 'border-[#F46B35] bg-[#FFF0E8] text-[#F46B35]'
                        : 'border-[#EEEAE5] bg-[#FAF9F6] text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider">
                  Payment Method
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Choose how you want to settle the order token.
                </p>
              </div>

              {/* Demo Notice Banner */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                <Info className="w-4 h-4 shrink-0 text-amber-600" />
                <span>DEMO PAYMENT — NO REAL MONEY WILL BE CHARGED.</span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'UPI',
                    name: 'Demo UPI (Instant Token Confirmation)',
                    desc: 'Simulated QR / GooglePay / PhonePe payment. Fastest pickup.',
                    icon: QrCode,
                  },
                  {
                    id: 'Pay at Counter',
                    name: 'Pay at Counter (Cash or Card)',
                    desc: 'Pay cash directly at counter station when collecting token.',
                    icon: Wallet,
                  },
                  {
                    id: 'Cash',
                    name: 'Demo Cash on Pickup',
                    desc: 'Exact change payment upon food handoff.',
                    icon: Banknote,
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#F46B35] bg-[#FFF0E8]/50 shadow-sm'
                          : 'border-[#EEEAE5] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="mt-1 text-[#F46B35] focus:ring-[#F46B35]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F46B35]' : 'text-neutral-500'}`} />
                          <span className="font-bold text-xs text-[#202124]">{method.name}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions (Optional) */}
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                Special Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra spicy, less oil, separate sauce pack..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs text-[#202124] focus:outline-none focus:border-[#F46B35]"
              />
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-base text-[#202124] pb-3 border-b border-[#EEEAE5]">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((ci) => (
                  <div key={ci.menuItem.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-400 font-mono">{ci.quantity}x</span>
                      <span className="font-semibold text-[#202124]">{ci.menuItem.name}</span>
                    </div>
                    <span className="font-bold text-[#202124] font-mono tabular-nums">
                      ₹{ci.menuItem.price * ci.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#EEEAE5] text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Selected Pickup Window:</span>
                  <span className="font-semibold text-[#202124] text-right truncate max-w-[180px]">{pickupSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Kitchen Wait:</span>
                  <span className="font-semibold text-[#F46B35]">~8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold font-mono text-[#202124]">₹{cartTotal}</span>
                </div>

                <div className="pt-3 border-t border-[#EEEAE5] flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#202124]">Total Amount</span>
                  <span className="text-2xl font-black text-[#F46B35] font-mono tabular-nums">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full py-4 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPlacing ? (
                  <span>Generating Digital Token...</span>
                ) : (
                  <>
                    <span>Confirm & Generate Token</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A36A]" />
                <span>Simulated instant kitchen queue injection</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
