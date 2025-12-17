/**
 * Chat Store
 * Zustand store for AI assistant chat state
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatMessage, ChatContext } from '@/domain';
import { aiService } from '@/services';
import { generateId } from '@/lib';

interface ChatState {
  // UI State
  isOpen: boolean;
  isTyping: boolean;

  // Messages
  messages: ChatMessage[];

  // Context
  context: ChatContext;

  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  analyzeProperty: (listingId: string) => Promise<void>;
  setContext: (context: Partial<ChatContext>) => void;
  clearMessages: () => void;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Vantage AI. Select a property to get a detailed analysis, or ask me anything about the NYC market.",
  timestamp: new Date(),
};

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      // Initial State
      isOpen: false,
      isTyping: false,
      messages: [WELCOME_MESSAGE],
      context: {},

      // Actions
      openChat: () => {
        set({ isOpen: true }, false, 'openChat');
      },

      closeChat: () => {
        set({ isOpen: false }, false, 'closeChat');
      },

      toggleChat: () => {
        const { isOpen } = get();
        set({ isOpen: !isOpen }, false, 'toggleChat');
      },

      sendMessage: async (content) => {
        const { messages, context } = get();

        // Add user message
        const userMessage: ChatMessage = {
          id: generateId(),
          role: 'user',
          content,
          timestamp: new Date(),
        };

        set(
          {
            messages: [...messages, userMessage],
            isTyping: true,
          },
          false,
          'sendMessage/user'
        );

        try {
          // Get AI response
          const response = await aiService.chat(content, context);

          const assistantMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
          };

          set(
            (state) => ({
              messages: [...state.messages, assistantMessage],
              isTyping: false,
            }),
            false,
            'sendMessage/response'
          );
        } catch (error) {
          console.error('Chat error:', error);
          const errorMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: "I'm having trouble connecting right now. Please try again.",
            timestamp: new Date(),
          };

          set(
            (state) => ({
              messages: [...state.messages, errorMessage],
              isTyping: false,
            }),
            false,
            'sendMessage/error'
          );
        }
      },

      analyzeProperty: async (listingId) => {
        const { messages, context } = get();

        set(
          {
            isOpen: true,
            isTyping: true,
            context: { ...context, selectedListingId: listingId },
          },
          false,
          'analyzeProperty/start'
        );

        try {
          // Fetch the listing and analyze
          const { listingsRepository } = await import('@/services');
          const listing = await listingsRepository.findById(listingId);

          if (!listing) {
            throw new Error('Listing not found');
          }

          const analysis = await aiService.analyzeProperty(listing);

          const analysisMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: `Here is my analysis for **${listing.title}**:\n\n${analysis}`,
            timestamp: new Date(),
            metadata: {
              listingId,
              analysisType: 'property',
            },
          };

          set(
            (state) => ({
              messages: [...state.messages, analysisMessage],
              isTyping: false,
            }),
            false,
            'analyzeProperty/complete'
          );
        } catch (error) {
          console.error('Analysis error:', error);
          const errorMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: 'Unable to analyze this property right now. Please try again.',
            timestamp: new Date(),
          };

          set(
            (state) => ({
              messages: [...state.messages, errorMessage],
              isTyping: false,
            }),
            false,
            'analyzeProperty/error'
          );
        }
      },

      setContext: (contextUpdates) => {
        const { context } = get();
        set(
          { context: { ...context, ...contextUpdates } },
          false,
          'setContext'
        );
      },

      clearMessages: () => {
        set({ messages: [WELCOME_MESSAGE] }, false, 'clearMessages');
      },
    }),
    { name: 'ChatStore' }
  )
);
