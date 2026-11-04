import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Flame, 
  Zap,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { getAdminAssistantReply } from '../data/mockAssistantResponses';

interface AdminChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AIInsightsPage: React.FC = () => {
  const [messages, setMessages] = useState<AdminChatMessage[]>([
    {
      id: 'adm_msg_init',
      sender: 'assistant',
      text: "Welcome to Canteen Intelligence Center, Superintendent Ramesh. I continuously analyze order velocity, queue bottlenecks, and portion wastage across all campus counters. Ask me anything or select a diagnostic question below.",
      time: '12:45 PM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "What should we prepare more of tomorrow?",
    "Which items sell the most?",
    "Why was waiting time high today?",
    "How can we reduce food wastage?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: AdminChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAdminAssistantReply(query);
      const botMsg: AdminChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] text-[#F46B35] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Predictive Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">
              Canteen Intelligence Center
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Turn canteen activity into smarter decisions. Automated forecasting powered by simulated sales algorithms.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-[#F46B35] text-xs font-bold flex items-center gap-2 shadow-xs">
            <Zap className="w-4 h-4 text-[#F46B35]" />
            <span>PARTYROCK AI WORKFLOW INTEGRATION PLANNED</span>
          </div>
        </div>

        {/* 4 AI FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Demand Prediction */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F46B35] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F46B35]">Demand Prediction</span>
              <h3 className="text-base font-bold text-[#202124] mt-0.5">Veg Fried Rice</h3>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Predicted Demand:</span>
                <strong className="text-[#202124] font-mono">80 servings</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Suggested Prep:</span>
                <strong className="text-emerald-700 font-mono">80 servings</strong>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Sold out early at 1:15 PM today. Increase tomorrow morning's prep batch by +33%.
            </p>
          </div>

          {/* Card 2: Food Wastage Insights */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#E64B4B] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E64B4B]">Food Wastage Insights</span>
              <h3 className="text-base font-bold text-[#202124] mt-0.5">Paneer Sandwich Surplus</h3>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs text-neutral-600">
              "Paneer Sandwich has shown excess remaining stock in recent simulated sales data."
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Recommendation: Reduce opening batch to 25 units and make on-demand after 2:00 PM.
            </p>
          </div>

          {/* Card 3: Peak Hour Prediction */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Peak Hour Prediction</span>
              <h3 className="text-base font-bold text-[#202124] mt-0.5">Rush Window 12:30–1:30</h3>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs text-neutral-600">
              "Expected peak demand: 12:30 PM – 1:30 PM (est. 110 concurrent student tokens)."
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Action: Pre-pack 40 samosas and 30 dosas by 12:15 PM to keep queue times under 6 minutes.
            </p>
          </div>

          {/* Card 4: Smart Inventory Recommendations */}
          <div className="bg-white rounded-2xl border border-[#EEEAE5] p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Smart Stock Replenish</span>
              <h3 className="text-base font-bold text-[#202124] mt-0.5">Scale Samosa Prep</h3>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs text-neutral-600">
              "Consider increasing Samosa preparation due to consistently high morning demand."
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Samosa + Chai combo sales velocity jumped 24% this week. Maintain 120-unit morning batch.
            </p>
          </div>

        </div>

        {/* AI ADMIN ASSISTANT CHAT PANEL */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EEEAE5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#202124] text-[#FF8A50] flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#202124]">Canteen Operations Copilot</h3>
                <p className="text-xs text-neutral-500">Ask strategic questions regarding kitchen capacity and menu margins</p>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
              Telemetry Grounded
            </span>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-[#202124] text-[#FF8A50] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-xl space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#202124] text-white rounded-tr-sm font-medium'
                          : 'bg-[#FAF9F6] border border-[#EEEAE5] text-[#202124] rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                    <div className={`text-[10px] text-neutral-400 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                      {m.time}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-lg bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-neutral-400">
                <Bot className="w-4 h-4 text-neutral-500" />
                <span>Running sales correlation model...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="pt-3 border-t border-[#EEEAE5]">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Diagnostic Queries
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFF0E8] border border-[#EEEAE5] text-xs font-semibold text-neutral-700 hover:text-[#F46B35] transition-colors whitespace-nowrap shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              placeholder="Ask about wastage reduction, batch sizes, peak rush timing..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-xs font-medium text-[#202124] focus:outline-none focus:border-[#F46B35]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#202124] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5"
            >
              <span>Ask Copilot</span>
              <Send className="w-3.5 h-3.5 text-[#FF8A50]" />
            </button>
          </form>

        </div>

      </div>
    </AdminLayout>
  );
};
