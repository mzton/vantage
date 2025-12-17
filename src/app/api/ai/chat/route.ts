/**
 * AI Chat API Route
 * Server-side endpoint for chat responses
 */
import { NextRequest, NextResponse } from 'next/server';
import { ChatContext } from '@/domain';

export async function POST(request: NextRequest) {
  try {
    const { message, context }: { message: string; context?: ChatContext } =
      await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate response (fallback without Gemini API)
    const response = generateChatResponse(message, context);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function generateChatResponse(message: string, context?: ChatContext): string {
  const lowerMessage = message.toLowerCase();

  // Context-aware responses
  if (context?.selectedListingId) {
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Based on similar properties in this area, this listing is competitively priced. The NYC rental market varies by neighborhood, but this location offers good value for the amenities provided.";
    }

    if (lowerMessage.includes('neighborhood') || lowerMessage.includes('area')) {
      return "This neighborhood is known for its vibrant culture, excellent dining options, and convenient public transportation access. It's a popular choice for both short-term visitors and long-term residents.";
    }

    if (lowerMessage.includes('transport') || lowerMessage.includes('subway')) {
      return "The property is well-connected to public transportation. Most NYC apartments are within walking distance of subway stations, making it easy to explore the city.";
    }
  }

  // General responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm Vantage AI, your property assistant. How can I help you find the perfect place to stay in NYC?";
  }

  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    return "Based on NYC's current market, I'd recommend exploring properties in SoHo for a trendy urban experience, West Village for charm, or Tribeca for family-friendly spaces. Would you like me to help you explore any of these areas?";
  }

  if (lowerMessage.includes('budget') || lowerMessage.includes('cheap')) {
    return "For budget-friendly options, consider studios in the East Village or apartments in the Financial District. These areas offer great value while still providing easy access to NYC's attractions.";
  }

  if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive')) {
    return "For a luxury experience, I'd suggest looking at penthouses in Tribeca or high-floor apartments with skyline views. These properties often include premium amenities like concierge service and rooftop access.";
  }

  // Default response
  return "I can help you explore properties, understand neighborhoods, or answer questions about the NYC rental market. Feel free to select a property on the map for a detailed analysis, or ask me anything about finding your perfect stay!";
}
