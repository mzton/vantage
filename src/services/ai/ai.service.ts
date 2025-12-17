/**
 * AI Service
 * Handles AI-powered property analysis and chat
 */
import { IAIService, Listing, ChatContext } from '@/domain';

class AIServiceImpl implements IAIService {
  /**
   * Generate property analysis
   * Uses server-side API route to protect API key
   */
  async analyzeProperty(listing: Listing): Promise<string> {
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing }),
      });

      if (!response.ok) {
        throw new Error('Analysis request failed');
      }

      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('Property analysis error:', error);
      return this.getFallbackAnalysis(listing);
    }
  }

  /**
   * Chat with AI assistant
   */
  async chat(message: string, context?: ChatContext): Promise<string> {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chat error:', error);
      return "I'm having trouble connecting right now. Please try again.";
    }
  }

  /**
   * Stream chat responses (for real-time typing effect)
   */
  async streamChat(
    message: string,
    context: ChatContext | undefined,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const response = await fetch('/api/ai/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Stream request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        onChunk(chunk);
      }
    } catch (error) {
      console.error('Stream chat error:', error);
      onChunk("I'm having trouble connecting right now.");
    }
  }

  /**
   * Fallback analysis when API is unavailable
   */
  private getFallbackAnalysis(listing: Listing): string {
    const vibeMap: Record<string, string> = {
      apartment: 'urban living with modern conveniences',
      penthouse: 'luxury high-rise living with stunning views',
      studio: 'efficient city living for the modern professional',
      house: 'spacious residential comfort',
      condo: 'contemporary living with premium amenities',
      villa: 'luxurious retreat-style accommodation',
    };

    const vibe = vibeMap[listing.propertyType] || 'comfortable urban living';

    return `**${listing.title}** offers ${vibe} in ${listing.address.split(',')[1]?.trim() || 'a prime location'}.

**The Space**: ${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}, ${listing.bathrooms} bath${listing.bathrooms > 1 ? 's' : ''}, spanning ${listing.squareFeet.toLocaleString()} sq ft.

**Best For**: ${listing.bedrooms >= 3 ? 'Families or groups' : listing.bedrooms === 1 ? 'Solo travelers or couples' : 'Small groups or couples'} looking for a ${listing.price < 400 ? 'budget-friendly' : listing.price < 700 ? 'mid-range' : 'premium'} stay.

**Location Value**: ${listing.description}

At **$${listing.price}/night**, this ${listing.propertyType} offers excellent value for its location and amenities.`;
  }
}

// Singleton instance
export const aiService = new AIServiceImpl();
