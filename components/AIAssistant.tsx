import React, { useState, useEffect, useRef } from 'react';
import { Listing, ChatMessage } from '../types';
import { chatWithAI, analyzeProperty } from '../services/geminiService';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface AIAssistantProps {
  selectedListing: Listing | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ selectedListing, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hi! I\'m Vantage AI. Select a property to get a detailed analysis, or ask me anything about the NYC market.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-analyze when a listing is selected
  useEffect(() => {
    if (selectedListing) {
      setIsOpen(true);
      const analyze = async () => {
        setIsTyping(true);
        // Add a "Thinking" placeholder
        const analysis = await analyzeProperty(selectedListing);
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now().toString(), 
            role: 'model', 
            text: `Here is my analysis for **${selectedListing.title}**:\n\n${analysis}` 
          }
        ]);
        setIsTyping(false);
      };
      analyze();
    }
  }, [selectedListing, setIsOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await chatWithAI(input, selectedListing);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);
    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-105"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          <h2 className="font-bold text-sm tracking-wide">Vantage AI Assistant</h2>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-2 items-center">
                <Loader2 size={16} className="animate-spin text-indigo-500" />
                <span className="text-xs text-slate-400">Thinking...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about properties..."
            className="w-full bg-slate-100 text-slate-800 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-1 top-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;