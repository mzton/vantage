/**
 * ChatMessage Component
 * Individual chat message bubble
 */
import React from 'react';
import { ChatMessage as ChatMessageType } from '@/domain';
import { cn } from '@/lib';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-primary-600 text-white rounded-tr-none'
            : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
        )}
      >
        {/* Simple markdown-like formatting */}
        <div className="whitespace-pre-wrap">
          {formatMessageContent(message.content)}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple markdown formatting for chat messages
 */
function formatMessageContent(content: string): React.ReactNode {
  // Split by double newlines for paragraphs
  const parts = content.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Bold text
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
