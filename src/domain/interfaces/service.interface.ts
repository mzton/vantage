/**
 * Service Interfaces
 * Abstract contracts for business logic services
 */
import { Listing, ChatMessage, ChatContext } from '../entities';

export interface IMapService {
  getAccessToken(): string;
  geocode(address: string): Promise<{ lat: number; lng: number } | null>;
  reverseGeocode(lat: number, lng: number): Promise<string | null>;
  getDirections(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<DirectionsResult | null>;
}

export interface DirectionsResult {
  distance: number; // in meters
  duration: number; // in seconds
  geometry: GeoJSON.LineString;
}

export interface IAIService {
  analyzeProperty(listing: Listing): Promise<string>;
  chat(message: string, context?: ChatContext): Promise<string>;
  streamChat(
    message: string,
    context?: ChatContext,
    onChunk: (chunk: string) => void
  ): Promise<void>;
}

export interface IAnalyticsService {
  trackEvent(eventName: string, properties?: Record<string, unknown>): void;
  trackPageView(pageName: string): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
}
