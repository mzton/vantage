/**
 * PriceMarker Component
 * Floating price tag marker for listings
 */
'use client';

import React from 'react';
import { Marker } from 'react-map-gl';
import { Listing } from '@/domain';
import { cn } from '@/lib';

interface PriceMarkerProps {
  listing: Listing;
  isSelected: boolean;
  onClick: (e: React.MouseEvent, listingId: string) => void;
}

export function PriceMarker({ listing, isSelected, onClick }: PriceMarkerProps) {
  return (
    <Marker
      longitude={listing.longitude}
      latitude={listing.latitude}
      anchor="bottom"
      onClick={(e) => onClick(e.originalEvent, listing.id)}
    >
      <div
        className={cn(
          'group cursor-pointer transition-all duration-300 transform',
          isSelected ? 'scale-110 z-50' : 'hover:scale-105'
        )}
      >
        {/* Price Tag */}
        <div
          className={cn(
            'px-3 py-1 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 border',
            'transition-colors duration-200',
            isSelected
              ? 'bg-primary-600 text-white border-primary-700'
              : 'bg-white text-slate-800 border-slate-200 hover:border-primary-300'
          )}
        >
          <span>${listing.price}</span>
        </div>

        {/* Triangle Pointer */}
        <div
          className={cn(
            'w-0 h-0 mx-auto',
            'border-l-[6px] border-l-transparent',
            'border-r-[6px] border-r-transparent',
            'border-t-[8px]',
            isSelected ? 'border-t-primary-600' : 'border-t-white'
          )}
        />
      </div>
    </Marker>
  );
}
