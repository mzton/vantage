/**
 * Home Page
 * Main application entry point
 */
'use client';

import React, { useEffect } from 'react';
import { useListingsStore } from '@/stores';
import { useMapbox } from '@/hooks';
import { MapView, MapControls } from '@/features/map';
import { ChatWindow } from '@/features/ai-assistant';
import { Header } from '@/components/layout';
import { TokenEntry } from './components/TokenEntry';
import { Spinner } from '@/components/ui';

export default function HomePage() {
  const { token, isLoading: isTokenLoading } = useMapbox();
  const { fetchListings, isLoading: isListingsLoading } = useListingsStore();

  // Fetch listings on mount
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Loading state
  if (isTokenLoading) {
    return (
      <div className="w-full h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Token entry if not configured
  if (!token) {
    return <TokenEntry />;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Header Overlay */}
      <Header transparent />

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapView />

        {/* Map Controls */}
        <MapControls />

        {/* Floating AI Assistant */}
        <ChatWindow />
      </div>
    </div>
  );
}
