/**
 * Chat Entity
 * Domain entities for AI assistant chat functionality
 */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  metadata?: ChatMessageMetadata;
}

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessageMetadata {
  listingId?: string;
  analysisType?: AnalysisType;
  confidence?: number;
}

export type AnalysisType = 'property' | 'neighborhood' | 'market' | 'commute';

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  context?: ChatContext;
}

export interface ChatContext {
  selectedListingId?: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  searchHistory?: string[];
}
