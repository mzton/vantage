/**
 * Header Component
 * App header with branding
 */
'use client';

import React from 'react';
import { Map } from 'lucide-react';

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = true }: HeaderProps) {
  return (
    <header
      className={`
        absolute top-0 left-0 right-0 z-20
        ${transparent ? 'bg-gradient-to-b from-white/80 to-transparent' : 'bg-white shadow-sm'}
      `}
    >
      <div className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Map className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-primary-900 tracking-tight">
              Vantage
            </h1>
            <p className="text-slate-600 text-xs font-medium -mt-0.5">
              Search by location, stay for the view.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
