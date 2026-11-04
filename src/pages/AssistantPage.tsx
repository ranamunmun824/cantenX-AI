import React, { useState, useRef, useEffect } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  Plus, 
  Check, 
  RotateCcw,
  Zap,
  Info,
  Clock,
  Flame
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getStudentAssistantReply } from '../data/mockAssistantResponses';
import { MenuItem } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedItems?: MenuItem[];
}

export const AssistantPage: React.FC = () => {
  const { menuItems, addToCart } = useCanteen();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: "Hello Aarav! I'm your CanteenX campus food assistant. Whether you're on a tight ₹50 budget, need something fast between classes, or want a high-protein lunch, ask me anytime!",
      timestamp: '12:30 PM',
      recommendedItems: menuItems.filter(m => ['m1', 'm3', 'm4'].includes(m.id)),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedPrompts = [
    "What can I eat under ₹50?",
    "Suggest a vegetarian meal.",
    "What is available right now?",
    "Suggest something filling.",
    "What can two people eat under ₹100?",
    "Which snacks are cheapest?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const reply = getStudentAssistantReply(query, menuItems);
      const recommended = menuItems.filter(m => reply.recommendedItemIds.includes(m.id));

      const botMsg: Message = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItems: recommended,
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, 1);
    setAddedItemMap(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'assistant',
        text: "Chat cleared! How can I assist your campus meal choice right now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItems: menuItems.filter(m => ['m1', 'm2', 'm4'].includes(m.id)),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        
        {/* ASSISTANT BRAND HEADER */}
        <div className="bg-white rounded-2xl border border-[#EEEAE5] p-4 sm:p-5 shadow-sm mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF0E8] border border-[#F46B35]/20 flex items-center justify-center text-[#F46B35] shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#202124]">CanteenX AI Assistant</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A36A]/10 text-[#16A36A]">
                  Active
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Your intelligent campus food companion · Real-time inventory aware
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Planned PartyRock Integration Tag */}
            <div className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#F46B35] text-[10px] font-bold flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#F46B35]" />
              <span>AI WORKFLOW — PARTYROCK INTEGRATION PLANNED</span>
            </div>

            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl border border-[#EEEAE5] hover:bg-neutral-50 text-neutral-400 hover:text-neutral-700 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CHAT MESSAGES CONTAINER */}
        <div className="flex-1 bg-white rounded-2xl border border-[#EEEAE5] shadow-sm p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          
          {/* Scrollable messages */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 max-h-[520px]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#F46B35] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-xl space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#202124] text-white rounded-tr-sm font-medium'
                          : 'bg-[#FAF9F6] border border-[#EEEAE5] text-[#202124] rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {/* Interactive Recommendation Cards inside chat */}
                    {!isUser && msg.recommendedItems && msg.recommendedItems.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {msg.recommendedItems.map((item) => {
                          const isAdded = addedItemMap[item.id];
                          return (
                            <div
                              key={item.id}
                              className="p-3 rounded-xl bg-white border border-[#EEEAE5] hover:border-[#F46B35]/50 shadow-sm flex items-center justify-between gap-3 group transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-neutral-100"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-[#202124] truncate group-hover:text-[#F46B35]">
                                    {item.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                                    <span className="font-extrabold text-[#F46B35] font-mono tabular-nums">
                                      ₹{item.price}
                                    </span>
                                    <span>·</span>
                                    <span>~{item.prepTimeMinutes}m</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleAddToCart(item)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                                  isAdded
                                    ? 'bg-[#16A36A] text-white'
                                    : 'bg-[#F46B35] text-white hover:bg-[#FF8A50]'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className={`text-[10px] text-neutral-400 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#F46B35] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#FAF9F6] border border-[#EEEAE5] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F46B35] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F46B35] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F46B35] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-neutral-400">Analyzing canteen recipes...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTED PROMPTS BAR */}
          <div className="pt-3 border-t border-[#EEEAE5]">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Suggested Questions
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#FFF0E8] border border-[#EEEAE5] text-xs font-semibold text-neutral-700 hover:text-[#F46B35] transition-colors whitespace-nowrap shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mt-3 flex items-center gap-2 pt-2 border-t border-[#EEEAE5]"
          >
            <input
              type="text"
              placeholder="Ask about budget meals, specials, preparation speed..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EEEAE5] text-sm text-[#202124] focus:outline-none focus:border-[#F46B35]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-5 py-3 rounded-xl bg-[#F46B35] hover:bg-[#FF8A50] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </main>

      <Footer />
    </div>
  );
};
