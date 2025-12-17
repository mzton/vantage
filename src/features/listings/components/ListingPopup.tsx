/**
 * ListingPopup Component
 * Map popup for selected listing
 */
'use client';

import React from 'react';
import { Popup } from 'react-map-gl';
import { Listing } from '@/domain';
import { ListingCard } from './ListingCard';

interface ListingPopupProps {
  listing: Listing;
  onClose: () => void;
}

export function ListingPopup({ listing, onClose }: ListingPopupProps) {
  return (
    <Popup
      anchor="top"
      longitude={listing.longitude}
      latitude={listing.latitude}
      onClose={onClose}
      maxWidth="340px"
      closeButton={false}
      offset={25}
      className="z-40 listing-popup"
    >
      <ListingCard listing={listing} onClose={onClose} compact />
    </Popup>
  );
}
