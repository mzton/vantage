/**
 * ListingCard Component
 * Property card with details and actions
 */
'use client';

import React from 'react';
import Image from 'next/image';
import { Bed, Bath, Maximize2, Navigation } from 'lucide-react';
import { Listing } from '@/domain';
import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency, formatNumber } from '@/lib';
import { useChatStore } from '@/stores';
import { useGeolocation } from '@/hooks';

interface ListingCardProps {
  listing: Listing;
  onClose?: () => void;
  compact?: boolean;
}

export function ListingCard({ listing, onClose, compact = false }: ListingCardProps) {
  const { analyzeProperty, openChat } = useChatStore();
  const { latitude, longitude, requestLocation } = useGeolocation();

  const handleGetDirections = () => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${listing.latitude},${listing.longitude}&travelmode=driving`;
      window.open(url, '_blank');
    } else {
      requestLocation();
    }
  };

  const handleAnalyze = () => {
    analyzeProperty(listing.id);
    openChat();
  };

  return (
    <Card
      padding="none"
      shadow="2xl"
      className={`overflow-hidden ${compact ? 'w-72' : 'w-80'}`}
    >
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 320px) 100vw, 320px"
        />
        <Badge
          variant="default"
          className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-md"
        >
          {listing.propertyType}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight text-slate-800">
          {listing.title}
        </h3>
        <p className="text-slate-500 text-xs truncate">{listing.address}</p>

        {/* Stats */}
        <div className="flex gap-4 text-slate-600 text-sm my-2">
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{listing.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} />
            <span>{listing.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={14} />
            <span>{formatNumber(listing.squareFeet)} ft²</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100">
          <span className="font-bold text-lg text-primary-600">
            {formatCurrency(listing.price)}
            <span className="text-xs text-slate-400 font-normal">/night</span>
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAnalyze}
              title="Ask AI"
              className="text-primary-600 hover:bg-primary-50"
            >
              <span className="text-xs font-bold">AI</span>
            </Button>
            <Button
              variant="primary"
              size="icon"
              onClick={handleGetDirections}
              title="Get Directions"
            >
              <Navigation size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
