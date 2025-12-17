/**
 * useDirections Hook
 * Fetches and manages route directions
 */
'use client';

import { useState, useCallback } from 'react';
import { mapService } from '@/services';
import { DirectionsResult } from '@/domain';

interface UseDirectionsReturn {
  directions: DirectionsResult | null;
  isLoading: boolean;
  error: string | null;
  getDirections: (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ) => Promise<void>;
  clearDirections: () => void;
}

export function useDirections(): UseDirectionsReturn {
  const [directions, setDirections] = useState<DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDirections = useCallback(
    async (
      origin: { lat: number; lng: number },
      destination: { lat: number; lng: number }
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mapService.getDirections(origin, destination);

        if (result) {
          setDirections(result);
        } else {
          setError('No route found');
        }
      } catch (err) {
        console.error('Directions error:', err);
        setError('Failed to get directions');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearDirections = useCallback(() => {
    setDirections(null);
    setError(null);
  }, []);

  return {
    directions,
    isLoading,
    error,
    getDirections,
    clearDirections,
  };
}
