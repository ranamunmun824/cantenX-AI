import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Sparkles, MapPin, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#202124] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F46B35] flex items-center justify-center text-white shadow-sm">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Canteen<span className="text-[#F46B35]">X</span> AI
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Skip the Queue. Not Your Meal. The intelligent campus canteen operating system designed to eradicate lunch break bottlenecks with digital tokens, live queue telemetry, and AI meal recommendations.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-800/80 text-[#FF8A50] border border-neutral-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prepared for Amazon PartyRock & Bedrock Workflows</span>
            </div>
          </div>

          {/* Student Hub */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Student Hub</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/student" className="hover:text-white transition-colors">Daily Dashboard</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Today's Digital Menu</Link></li>
              <li><Link to="/assistant" className="hover:text-white transition-colors">AI Meal Companion</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Your Order Cart</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">Past Tokens & Invoices</Link></li>
            </ul>
          </div>

          {/* Admin Operations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Canteen Operations</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/admin" className="hover:text-white transition-colors">Operations Overview</Link></li>
              <li><Link to="/admin/orders" className="hover:text-white transition-colors">Live Kitchen Display</Link></li>
              <li><Link to="/admin/menu" className="hover:text-white transition-colors">Recipe & Price Editor</Link></li>
              <li><Link to="/admin/inventory" className="hover:text-white transition-colors">Real-Time Stock Audit</Link></li>
              <li><Link to="/admin/insights" className="hover:text-white transition-colors">Canteen Intelligence Center</Link></li>
              <li><Link to="/admin/analytics" className="hover:text-white transition-colors">Revenue & Rush Hours</Link></li>
            </ul>
          </div>

          {/* Campus Facility Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Campus Facility</h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F46B35] shrink-0 mt-0.5" />
                <span>Main Food Court, Central Academic Block, Campus West</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F46B35] shrink-0" />
                <span>canteen@campus.edu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F46B35] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} CanteenX AI. Smart Campus Dining Technologies.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Interactive Hackathon Prototype · Demo Data Seeded</span>
            <Link to="/login" className="hover:text-white transition-colors">Switch Profile</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
