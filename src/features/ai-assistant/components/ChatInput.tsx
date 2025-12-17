/**
 * ChatInput Component
 * Message input field with send button
 */
'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '@/stores';
import { Button } from '@/components/ui';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isTyping } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about properties..."
          className="w-full bg-slate-100 text-slate-800 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          disabled={isTyping}
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={!input.trim() || isTyping}
          className="absolute right-1 top-1 rounded-full"
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
}
