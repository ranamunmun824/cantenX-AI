import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { 
  UserCheck, 
  ShieldCheck, 
  UtensilsCrossed, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const LoginPage: React.FC = () => {
  const { switchRole } = useCanteen();
  const navigate = useNavigate();

  const handleSelectRole = (role: 'student' | 'admin') => {
    switchRole(role);
    if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-[#EEEAE5] shadow-xl p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F46B35] flex items-center justify-center text-white mx-auto shadow-md">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Welcome to Canteen<span className="text-[#F46B35]">X</span> AI
            </h1>
            <p className="text-sm text-neutral-500">
              Select your persona to explore the smart campus dining platform.
            </p>
          </div>

          {/* Demo Notice */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>DEMO ENVIRONMENT — SAMPLE DATA:</strong> Simulated hackathon login. Click any profile below to access the full interactive system.
            </span>
          </div>

          {/* Two Large Persona Cards */}
          <div className="space-y-4">
            {/* Student Login Card */}
            <button
              onClick={() => handleSelectRole('student')}
              className="w-full text-left p-5 rounded-2xl border-2 border-[#EEEAE5] hover:border-[#F46B35] bg-[#FAF9F6] hover:bg-[#FFF0E8]/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0E8] border border-[#F46B35]/20 flex items-center justify-center text-[#F46B35] group-hover:scale-105 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#202124] group-hover:text-[#F46B35] transition-colors">
                      Continue as Student
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A36A]/10 text-[#16A36A]">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Aarav Sharma · Roll: 21BCE1042 (CS Dept)
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Explore menu, place advance orders, get tokens & chat with AI
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#F46B35] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* Admin Login Card */}
            <button
              onClick={() => handleSelectRole('admin')}
              className="w-full text-left p-5 rounded-2xl border-2 border-[#EEEAE5] hover:border-[#202124] bg-[#FAF9F6] hover:bg-neutral-100/60 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-800 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#202124] group-hover:text-black transition-colors">
                    Continue as Canteen Admin
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Mr. Ramesh Gupta · Head Canteen Superintendent
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Live orders KDS, menu pricing, inventory stock & AI insights
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#202124] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>
          </div>

          <div className="text-center text-xs text-neutral-400 pt-2 border-t border-[#EEEAE5]">
            Need help? Contact the campus food services desk at room 102.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
