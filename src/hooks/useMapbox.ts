/**
 * useMapbox Hook
 * Manages Mapbox token and initialization
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { env, isMapboxConfigured, DEMO_MAPBOX_TOKEN } from '@/config';

const STORAGE_KEY = 'vantage_mapbox_token';

interface UseMapboxReturn {
  token: string | null;
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export function useMapbox(): UseMapboxReturn {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Priority: env var > localStorage > demo token
    const envToken = env.mapbox.token;
    const storedToken = typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY)
      : null;

    const tokenToUse = envToken || storedToken || DEMO_MAPBOX_TOKEN;

    if (tokenToUse) {
      setTokenState(tokenToUse);
    }

    setIsLoading(false);
  }, []);

  const setToken = useCallback((newToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newToken);
    }
    setTokenState(newToken);
    setError(null);
  }, []);

  const clearToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setTokenState(null);
  }, []);

  return {
    token,
    isConfigured: Boolean(token),
    isLoading,
    error,
    setToken,
    clearToken,
  };
}
