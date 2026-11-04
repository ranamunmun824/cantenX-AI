import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Utensils, 
  ChevronRight,
  AlertCircle,
  HelpCircle,
  XCircle,
  FileQuestion,
  Smartphone,
  QrCode,
  Zap
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HERO_IMAGE, RICE_IMAGE, SANDWICH_IMAGE, DOSA_IMAGE } from '../data/seedData';
import { CrowdIndicator } from '../components/common/CrowdIndicator';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF0E8] border border-[#F46B35]/20 text-[#F46B35] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Smart Campus Dining Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.12]">
                Your Campus Canteen,{' '}
                <span className="text-[#F46B35]">Reimagined.</span>
              </h1>

              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl leading-relaxed">
                Skip the queues, discover your favourite meals, order ahead and enjoy a smarter campus dining experience with digital tokens and real-time live queue tracking.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="px-6 py-3.5 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Explore Canteen</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/assistant"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-50 text-[#202124] border border-[#EEEAE5] font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F46B35]" />
                  <span>Discover AI Features</span>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                  <span>Zero physical queueing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                  <span>Live token queue tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                  <span>AI budget meal assistant</span>
                </div>
              </div>
            </div>

            {/* Right Product Preview Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative image */}
                <div className="rounded-3xl overflow-hidden shadow-xl border border-[#EEEAE5] bg-white p-3">
                  <img
                    src={HERO_IMAGE}
                    alt="Campus Canteen"
                    className="w-full h-56 object-cover rounded-2xl"
                  />

                  {/* Floating Live Digital Token Card */}
                  <div className="mt-3 p-4 rounded-2xl bg-[#202124] text-white shadow-lg space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#FF8A50] tracking-wider">Active Token</div>
                        <div className="text-2xl font-black font-mono tracking-wider text-white">CX-1042</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#16A36A]/20 text-[#16A36A] border border-[#16A36A]/30">
                        PREPARING
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={RICE_IMAGE}
                          alt="Veg Fried Rice"
                          className="w-9 h-9 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-white">Veg Fried Rice</div>
                          <div className="text-neutral-400">Qty: 1 · ₹50</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-400">Wait Time</div>
                        <div className="text-sm font-bold text-[#FF8A50] font-mono">~8 mins</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/80">
                      <span>Queue Position: <strong className="text-white font-mono">#4</strong></span>
                      <span>Counter: <strong className="text-white">Station 02 (Hot Meals)</strong></span>
                    </div>
                  </div>
                </div>

                {/* Sub-badge: Live Crowd Indicator */}
                <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white p-3.5 rounded-2xl border border-[#EEEAE5] shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] flex items-center justify-center text-[#F46B35]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Main Food Court</div>
                    <div className="text-xs font-bold text-[#202124]">Crowd: <span className="text-[#F3A712]">MODERATE (12 orders)</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white border-y border-[#EEEAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F46B35]">The Daily Dilemma</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              Lunch Break Shouldn't Mean Queue Time.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Students waste an average of 25 minutes of their 45-minute lunch break standing in chaotic cafeteria lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Long Waiting Lines',
                description: 'Crowded counters lead to missed lunch breaks, cold food, and rushed eating before next lectures.',
                tag: 'Time Drain'
              },
              {
                icon: HelpCircle,
                title: 'Menu Uncertainty',
                description: 'No way to know what has been prepared today until you push through the crowd to read a blackboard.',
                tag: 'Zero Visibility'
              },
              {
                icon: XCircle,
                title: 'Food Availability Shock',
                description: 'Waiting 20 minutes in line only to discover your favorite roll or thali just ran out two people ahead of you.',
                tag: 'Wasted Effort'
              },
              {
                icon: FileQuestion,
                title: 'Inefficient Ordering',
                description: 'Lost paper tokens, chaotic counter shouting, cash change delays, and mistaken dish handoffs.',
                tag: 'Operational Chaos'
              },
            ].map((prob, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#EEEAE5] bg-[#FAF9F6] flex flex-col justify-between hover:border-[#E64B4B]/30 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E64B4B] flex items-center justify-center mb-4">
                    <prob.icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold text-[#E64B4B] uppercase tracking-wider mb-1">{prob.tag}</div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">{prob.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{prob.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F46B35]">The CanteenX AI OS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              Smarter Ordering for the Entire Campus.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              A synchronized platform connecting hungry students with busy kitchen staff through automated virtual queues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Digital Food Menu',
                desc: 'Browse live photos, pricing in INR, veg/non-veg tags, calorie counts, and exact prep times for all 30 canteen items.',
                icon: Utensils,
              },
              {
                title: 'Smart Advance Ordering',
                desc: 'Select preferred pickup time slots or immediate prep. Pay via demo UPI or counter cash without handling cards.',
                icon: Smartphone,
              },
              {
                title: 'Virtual Queue & Tokens',
                desc: 'Receive digital sequential tokens (like CX-1042) that track live position in line directly from your phone.',
                icon: QrCode,
              },
              {
                title: 'Real-Time Order Tracking',
                desc: 'Watch your order move across 5 distinct stages: Placed, Confirmed, Preparing, Ready, and Picked Up.',
                icon: Clock,
              },
              {
                title: 'AI Food Recommendations',
                desc: 'Ask our conversational meal assistant to suggest filling meals under ₹50, high-protein bites, or budget combos.',
                icon: Sparkles,
              },
              {
                title: 'Smart Canteen Analytics',
                desc: 'Canteen operators monitor hourly peak rush, forecast portion demand, and reduce kitchen ingredient wastage.',
                icon: TrendingUp,
              },
            ].map((sol, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#EEEAE5] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] text-[#F46B35] flex items-center justify-center mb-4">
                  <sol.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#202124] mb-2">{sol.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-y border-[#EEEAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F46B35]">5 Simple Steps</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              How CanteenX AI Works
            </h2>
            <p className="text-neutral-600 text-sm">
              From discovering food to picking up your hot tray in under 10 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Explore the Menu', desc: 'Browse available dishes, prices, and live inventory.' },
              { step: '02', title: 'Select Your Food', desc: 'Customize quantities and choose immediate or scheduled pickup.' },
              { step: '03', title: 'Get Digital Token', desc: 'Instant unique token generated with live queue position.' },
              { step: '04', title: 'Track Your Order', desc: 'Get notified when the kitchen starts preparing your tray.' },
              { step: '05', title: 'Pick Up Your Meal', desc: 'Flash your digital token at the pickup counter and enjoy!' },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl border border-[#EEEAE5] bg-[#FAF9F6] relative">
                <div className="text-2xl font-black font-mono text-[#F46B35]/30 mb-2">{st.step}</div>
                <h3 className="text-sm font-bold text-[#202124] mb-1.5">{st.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF0E8]/50 to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F46B35]/10 text-[#F46B35] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bedrock & PartyRock Ready</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
                Meet Your Campus Food Assistant.
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Stuck on what to eat within your lunch budget? Tell the assistant how much cash you have, whether you need quick protein or a vegetarian combo, and get instant recommendations you can add to cart in one tap.
              </p>

              <div className="pt-2">
                <Link
                  to="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-sm shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try AI Assistant</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Mock Conversational Bubble */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-[#EEEAE5] shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE5]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F46B35] text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#202124]">CanteenX AI Assistant</div>
                      <div className="text-[10px] text-neutral-400">Campus Food Companion</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Online</span>
                </div>

                {/* Chat dialogue example */}
                <div className="space-y-3 text-xs">
                  {/* Student query */}
                  <div className="flex justify-end">
                    <div className="bg-[#202124] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs font-medium">
                      "I have ₹50. Suggest something filling."
                    </div>
                  </div>

                  {/* Assistant response */}
                  <div className="flex justify-start">
                    <div className="bg-[#FAF9F6] border border-[#EEEAE5] text-[#202124] px-4 py-3 rounded-2xl rounded-tl-sm max-w-md space-y-2.5">
                      <p className="font-semibold text-neutral-800">
                        Here are top options available today in Main Canteen:
                      </p>
                      
                      {/* Mini recommendation items */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EEEAE5]">
                          <div className="flex items-center gap-2">
                            <img src={RICE_IMAGE} alt="Veg Fried Rice" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-[#202124]">Veg Fried Rice</div>
                              <div className="text-[10px] text-neutral-400">Fresh wok tossed · 380 cal</div>
                            </div>
                          </div>
                          <span className="font-bold text-[#F46B35] font-mono">₹50</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EEEAE5]">
                          <div className="flex items-center gap-2">
                            <img src={SANDWICH_IMAGE} alt="Paneer Sandwich" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-[#202124]">Paneer Sandwich</div>
                              <div className="text-[10px] text-neutral-400">Grilled tikka paneer · 320 cal</div>
                            </div>
                          </div>
                          <span className="font-bold text-[#F46B35] font-mono">₹40</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-500 italic">
                        Tip: Veg Fried Rice is our highest rated lunch bowl today!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-20 bg-[#202124] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A50]">For Canteen Operators</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Make Your Canteen Smarter.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Empower your kitchen staff with live order displays, demand forecasting, automated stock tracking, and food wastage analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {[
              { title: 'Manage Incoming Orders', desc: 'Accept, prepare, and notify students in 1-click.' },
              { title: 'Track Inventory Stock', desc: 'Live counters on portion balances and stockouts.' },
              { title: 'Monitor Real-Time Sales', desc: 'Track hourly cash vs UPI revenue totals.' },
              { title: 'Understand Rush Demand', desc: 'Predict 12:30 PM to 1:30 PM rush bottlenecks.' },
              { title: 'Reduce Food Wastage', desc: 'Align morning batches with AI demand forecasts.' },
            ].map((adm, i) => (
              <div key={i} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-[#FF8A50]/20 text-[#FF8A50] flex items-center justify-center font-bold text-sm mb-3">
                  0{i + 1}
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">{adm.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{adm.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-sm shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Launch Canteen Administration Portal</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
