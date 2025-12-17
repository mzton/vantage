/**
 * TokenEntry Component
 * Mapbox token entry modal
 */
'use client';

import React, { useState } from 'react';
import { Key, ArrowRight, Map } from 'lucide-react';
import { useMapbox } from '@/hooks';
import { Button, Input, Card } from '@/components/ui';

export function TokenEntry() {
  const [tokenInput, setTokenInput] = useState('');
  const { setToken } = useMapbox();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setToken(tokenInput.trim());
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card shadow="2xl" padding="none" className="max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-6 text-white text-center">
          <div className="flex justify-center mb-3">
            <Map className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Vantage</h1>
          <p className="text-primary-100 text-sm">PropTech Visualization Demo</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-50 p-4 rounded-full">
              <Key className="text-primary-600" size={32} />
            </div>
          </div>

          <h2 className="text-center text-xl font-bold text-slate-800 mb-2">
            Mapbox API Key Required
          </h2>
          <p className="text-center text-slate-500 mb-6 text-sm">
            To render the 3D maps, this demo requires a public Mapbox Access Token.
          </p>

          <div className="space-y-4">
            <Input
              label="Your Public Token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="pk.eyJ1..."
            />

            <Button
              type="submit"
              variant="primary"
              disabled={!tokenInput.trim()}
              className="w-full"
            >
              <span>Launch App</span>
              <ArrowRight size={16} />
            </Button>

            <p className="text-xs text-center text-slate-400 mt-4">
              Don&apos;t have one?{' '}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 hover:underline"
              >
                Get a free token from Mapbox
              </a>
              .
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
