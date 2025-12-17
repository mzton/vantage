/**
 * ChatWindow Component
 * AI Assistant chat interface
 */
'use client';

import React, { useRef, useEffect } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { useChatStore } from '@/stores';
import { Button } from '@/components/ui';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  const { isOpen, messages, isTyping, openChat, closeChat } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Floating button when closed
  if (!isOpen) {
    return (
      <Button
        variant="primary"
        size="icon"
        onClick={openChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl hover:scale-105 transition-transform"
      >
        <MessageSquare size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-100 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          <h2 className="font-bold text-sm tracking-wide">Vantage AI Assistant</h2>
        </div>
        <button
          onClick={closeChat}
          className="hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-2 items-center">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-slate-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
