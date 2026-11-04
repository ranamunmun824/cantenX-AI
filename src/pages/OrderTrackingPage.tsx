import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  BellRing, 
  CheckCheck, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  RefreshCw,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, updateOrderStatus } = useCanteen();
  const navigate = useNavigate();

  // Find target order or fallback to first active or CX-1042
  const order = orders.find(o => o.id === orderId) 
    || orders.find(o => o.token === 'CX-1042') 
    || orders[0];

  const [counterWait, setCounterWait] = useState(order?.estimatedWaitMinutes || 8);

  useEffect(() => {
    if (!order) return;
    setCounterWait(order.estimatedWaitMinutes);
  }, [order?.estimatedWaitMinutes]);

  // Simulated countdown interval
  useEffect(() => {
    if (counterWait <= 0 || order?.status === 'Ready' || order?.status === 'Completed') return;
    const timer = setInterval(() => {
      setCounterWait(prev => Math.max(0, prev - 1));
    }, 45000); // decrement realistically
    return () => clearInterval(timer);
  }, [counterWait, order?.status]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-[#E64B4B] mx-auto" />
          <h2 className="text-2xl font-bold text-[#202124]">Order Not Found</h2>
          <p className="text-sm text-neutral-500">The requested order token does not exist in local state.</p>
          <Link to="/student" className="inline-block px-6 py-2.5 rounded-xl bg-[#F46B35] text-white text-xs font-bold">
            Return to Dashboard
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stages: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'Placed', label: 'Order Placed', desc: 'Order received by canteen server', icon: CheckCircle2 },
    { key: 'Confirmed', label: 'Order Confirmed', desc: 'Kitchen supervisor accepted token', icon: ShieldCheck },
    { key: 'Preparing', label: 'Preparing Food', desc: 'Chefs cooking dishes at hot station', icon: ChefHat },
    { key: 'Ready', label: 'Ready for Pickup', desc: 'Dishes packed & ready at Counter 02', icon: BellRing },
    { key: 'Completed', label: 'Completed', desc: 'Meal collected by student', icon: CheckCheck },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === order.status);

  // Manual simulator advance for demo evaluation
  const handleSimulateNextStage = () => {
    const nextIdx = currentStageIndex < stages.length - 1 ? currentStageIndex + 1 : 0;
    const nextStatus = stages[nextIdx].key;
    updateOrderStatus(order.id, nextStatus);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top return bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/student"
            className="text-xs font-bold text-neutral-600 hover:text-[#F46B35] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Prototype Stage Simulator Button */}
          <button
            onClick={handleSimulateNextStage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202124] text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            title="Advance order stage to test timeline UI"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF8A50]" />
            <span>Simulate Kitchen Next Stage</span>
          </button>
        </div>

        {/* HERO TOKEN CARD */}
        <div className="bg-[#202124] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F46B35]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-neutral-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8A50] bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800">
                  CanteenX AI · Verified Token
                </span>
                <span className="text-xs text-neutral-400">Order ID: {order.id}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                {order.token}
              </div>
              <p className="text-sm text-neutral-300">
                {order.items.map(i => `${i.quantity}x ${i.name}`).join(' + ')}
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-4 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 self-start md:self-auto">
              <div className="text-center px-3 border-r border-neutral-800">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Queue Position</div>
                <div className="text-2xl font-black font-mono text-white tabular-nums">
                  {order.status === 'Ready' || order.status === 'Completed' ? '-' : `#${order.queuePosition}`}
                </div>
              </div>

              <div className="text-center px-3">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Estimated Wait</div>
                <div className="text-2xl font-black font-mono text-[#FF8A50] tabular-nums">
                  {order.status === 'Ready' ? 'NOW' : order.status === 'Completed' ? 'DONE' : `~${counterWait}m`}
                </div>
              </div>
            </div>
          </div>

          {/* Quick status message */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A] animate-ping" />
              <span className="font-semibold text-white">
                {order.status === 'Ready' 
                  ? 'Your meal is piping hot and ready for collection at Counter 02!' 
                  : order.status === 'Completed'
                  ? 'Order completed and picked up. Enjoy your meal!'
                  : 'Kitchen has queued your order. Live updates sync automatically.'}
              </span>
            </div>

            <div className="text-neutral-400">
              Total Amount: <strong className="text-white font-mono text-sm">₹{order.totalAmount}</strong> · {order.paymentMethod}
            </div>
          </div>
        </div>

        {/* 5-STAGE TIMELINE SECTION */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#202124]">Live Preparation Timeline</h3>
            <p className="text-xs text-neutral-500">Track each step from kitchen ticketing to pickup counter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isFuture = idx > currentStageIndex;
              const Icon = stage.icon;

              let iconBg = 'bg-neutral-100 text-neutral-400 border-neutral-200';
              if (isPast) {
                iconBg = 'bg-emerald-50 text-emerald-600 border-emerald-300';
              } else if (isCurrent) {
                iconBg = 'bg-[#FFF0E8] text-[#F46B35] border-[#F46B35] ring-4 ring-[#FFF0E8]';
              }

              return (
                <div key={stage.key} className="flex flex-col items-start md:items-center text-left md:text-center p-3 rounded-xl transition-all">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2.5 ${iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#202124]">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                    {stage.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAILS & PICKUP INSTRUCTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pickup Instructions */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#202124]">
              <MapPin className="w-4 h-4 text-[#F46B35]" />
              <span>Counter Pickup Instructions</span>
            </div>
            
            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] space-y-1">
                <div className="font-bold text-[#202124]">Counter Station: Station 02 (Hot Meals & Snacks)</div>
                <div className="text-neutral-500">Central Food Court, Main Academic Block</div>
              </div>
              <ul className="space-y-2 list-disc list-inside text-neutral-600">
                <li>Show your digital token <strong className="text-[#202124] font-mono">{order.token}</strong> to the counter operator.</li>
                <li>Pickup slot selected: <strong className="text-[#202124]">{order.pickupSlot}</strong>.</li>
                <li>Cutlery, paper napkins and sauces are available at the condiment stand.</li>
              </ul>
            </div>
          </div>

          {/* Detailed Bill Summary */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Token Bill Receipt
            </h4>

            <div className="divide-y divide-[#EEEAE5] text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-neutral-400">{item.quantity}x</span>
                    <span className="font-semibold text-[#202124]">{item.name}</span>
                  </div>
                  <span className="font-bold font-mono text-[#202124] tabular-nums">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EEEAE5] flex items-center justify-between text-xs">
              <span className="font-bold text-[#202124]">Paid via {order.paymentMethod}</span>
              <span className="font-black text-base font-mono text-[#F46B35] tabular-nums">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
