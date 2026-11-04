import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  Clock, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  Receipt, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const OrderHistoryPage: React.FC = () => {
  const { orders, currentUser, menuItems, addToCart, showToast } = useCanteen();
  const navigate = useNavigate();

  // Filter orders associated with the student (or sample orders if logged in as student)
  const studentOrders = orders.filter(o => o.studentId === currentUser.id || o.studentRoll === currentUser.rollNumber);

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      if (menuItem) {
        addToCart(menuItem, item.quantity);
      }
    });
    showToast(`Items from ${order.token} added to cart!`, 'success');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F46B35] mb-1">
            Personal Dining Records
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
            My Orders & Tokens
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            View active queue tokens and historical canteen meal receipts.
          </p>
        </div>

        {/* Orders List */}
        {studentOrders.length > 0 ? (
          <div className="space-y-4">
            {studentOrders.map((ord) => {
              let badgeStyle = 'bg-neutral-100 text-neutral-700';
              if (ord.status === 'Ready') badgeStyle = 'bg-emerald-100 text-emerald-800';
              if (ord.status === 'Preparing') badgeStyle = 'bg-amber-100 text-amber-800';
              if (ord.status === 'Completed') badgeStyle = 'bg-blue-100 text-blue-800';
              if (ord.status === 'Cancelled') badgeStyle = 'bg-rose-100 text-rose-800';

              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl border border-[#EEEAE5] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEEAE5]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-black font-mono text-[#202124]">{ord.token}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Placed at {ord.createdAt}</span>
                        <span>·</span>
                        <span>Slot: {ord.pickupSlot}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/orders/${ord.id}`}
                        className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-[#202124] transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Live Tracking</span>
                      </Link>

                      <button
                        onClick={() => handleReorder(ord)}
                        className="px-3.5 py-2 rounded-xl bg-[#FFF0E8] hover:bg-[#F46B35] text-[#F46B35] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-order</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9F6]">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-10 h-10 rounded-lg object-cover border border-[#EEEAE5]"
                          />
                          <div>
                            <div className="font-bold text-[#202124]">{it.name}</div>
                            <div className="text-[11px] text-neutral-400">Qty: {it.quantity} × ₹{it.price}</div>
                          </div>
                        </div>
                        <span className="font-bold font-mono text-[#202124] tabular-nums">
                          ₹{it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                    <span>Payment: <strong className="text-[#202124]">{ord.paymentMethod}</strong></span>
                    <div>
                      Total Paid: <strong className="text-base font-extrabold text-[#F46B35] font-mono tabular-nums">₹{ord.totalAmount}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EEEAE5] p-12 text-center space-y-3">
            <Receipt className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-base font-bold text-[#202124]">No past orders yet</h3>
            <p className="text-xs text-neutral-500">
              Your confirmed digital orders and pickup tokens will appear here.
            </p>
            <Link
              to="/menu"
              className="inline-block px-5 py-2.5 rounded-xl bg-[#F46B35] text-white text-xs font-bold hover:bg-[#FF8A50] transition-colors"
            >
              Order Something Fresh
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
