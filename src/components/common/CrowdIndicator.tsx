import React from 'react';
import { Users, Clock, Flame } from 'lucide-react';
import { useCanteen } from '../../context/CanteenContext';

interface CrowdIndicatorProps {
  className?: string;
  compact?: boolean;
}

export const CrowdIndicator: React.FC<CrowdIndicatorProps> = ({ className = '', compact = false }) => {
  const { orders } = useCanteen();

  // Active in-flight orders
  const activeCount = orders.filter(o => ['Placed', 'Confirmed', 'Preparing'].includes(o.status)).length;

  let level: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
  let badgeBg = 'bg-[#16A36A]/10 text-[#16A36A] border-[#16A36A]/20';
  let waitMinutes = 4;

  if (activeCount >= 10) {
    level = 'HIGH';
    badgeBg = 'bg-[#E64B4B]/10 text-[#E64B4B] border-[#E64B4B]/20';
    waitMinutes = 15;
  } else if (activeCount >= 5) {
    level = 'MODERATE';
    badgeBg = 'bg-[#F3A712]/10 text-[#F3A712] border-[#F3A712]/20';
    waitMinutes = 8;
  }

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${badgeBg} ${className}`}>
        <span className="font-semibold">{level} CROWD</span>
        <span className="text-neutral-400">·</span>
        <span>~{waitMinutes} min wait</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-[#EEEAE5]">
        <div>
          <div className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Live Facility Status</div>
          <h3 className="text-lg font-bold text-[#202124]">Main Campus Canteen</h3>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${badgeBg}`}>
          {level} CROWD
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] flex items-center justify-center text-[#F46B35]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500">Estimated Wait</div>
            <div className="text-base font-bold text-[#202124] tabular-nums font-mono">
              ~{waitMinutes} minutes
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF8A50]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500">Active Orders</div>
            <div className="text-base font-bold text-[#202124] tabular-nums font-mono">
              {activeCount} in kitchen
            </div>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#16A36A]">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500">Kitchen Velocity</div>
            <div className="text-base font-bold text-[#202124]">
              {level === 'HIGH' ? 'High Volume' : 'Smooth Flow'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
