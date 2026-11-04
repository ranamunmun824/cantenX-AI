import React from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCanteen();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-[#16A36A]/20 bg-white text-[#202124]';
        let iconColor = 'text-[#16A36A]';

        if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-[#F46B35]/20 bg-white text-[#202124]';
          iconColor = 'text-[#F46B35]';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-[#F3A712]/20 bg-white text-[#202124]';
          iconColor = 'text-[#F3A712]';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          borderClass = 'border-[#E64B4B]/20 bg-white text-[#202124]';
          iconColor = 'text-[#E64B4B]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
