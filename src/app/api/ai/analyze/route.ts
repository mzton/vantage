/**
 * AI Property Analysis API Route
 * Server-side endpoint for property analysis
 */
import { NextRequest, NextResponse } from 'next/server';
import { Listing } from '@/domain';

export async function POST(request: NextRequest) {
  try {
    const { listing }: { listing: Listing } = await request.json();

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing is required' },
        { status: 400 }
      );
    }

    // Generate analysis (fallback without Gemini API)
    const analysis = generatePropertyAnalysis(listing);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze property' },
      { status: 500 }
    );
  }
}

function generatePropertyAnalysis(listing: Listing): string {
  const vibeMap: Record<string, string> = {
    apartment: 'urban living with modern conveniences',
    penthouse: 'luxury high-rise living with stunning views',
    studio: 'efficient city living for the modern professional',
    house: 'spacious residential comfort',
    condo: 'contemporary living with premium amenities',
    villa: 'luxurious retreat-style accommodation',
  };

  const vibe = vibeMap[listing.propertyType] || 'comfortable urban living';
  const neighborhood = listing.address.split(',')[1]?.trim() || 'a prime location';

  const priceCategory =
    listing.price < 400
      ? 'budget-friendly'
      : listing.price < 700
      ? 'mid-range'
      : 'premium';

  const targetAudience =
    listing.bedrooms >= 3
      ? 'Families or groups'
      : listing.bedrooms === 1
      ? 'Solo travelers or couples'
      : 'Small groups or couples';

  return `**${listing.title}** offers ${vibe} in ${neighborhood}.

**The Space**: ${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}, ${listing.bathrooms} bath${listing.bathrooms > 1 ? 's' : ''}, spanning ${listing.squareFeet.toLocaleString()} sq ft.

**Best For**: ${targetAudience} looking for a ${priceCategory} stay.

**Location Value**: ${listing.description}

At **$${listing.price}/night**, this ${listing.propertyType} offers excellent value for its location and amenities.`;
}
