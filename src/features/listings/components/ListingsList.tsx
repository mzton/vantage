/**
 * ListingsList Component
 * Scrollable list of property cards
 */
'use client';

import React from 'react';
import { useListingsStore } from '@/stores';
import { ListingCard } from './ListingCard';
import { Spinner } from '@/components/ui';

export function ListingsList() {
  const { listings, isLoading, selectedListing, selectListing } = useListingsStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <p>No listings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 overflow-y-auto h-full">
      {listings.map((listing) => (
        <div
          key={listing.id}
          onClick={() => selectListing(listing)}
          className={`cursor-pointer transition-transform hover:scale-[1.02] ${
            selectedListing?.id === listing.id ? 'ring-2 ring-primary-500 rounded-xl' : ''
          }`}
        >
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
}
