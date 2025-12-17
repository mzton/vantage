/**
 * Application Constants
 * Centralized configuration values
 */
import { MapViewState, MapStyle, Listing } from '@/domain';

// Map Configuration
export const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 40.7128,
  longitude: -74.006,
  zoom: 13,
  bearing: 0,
  pitch: 0,
};

export const MAP_STYLES: MapStyle[] = [
  { id: 'light', name: 'Light', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark', name: 'Dark', url: 'mapbox://styles/mapbox/dark-v11' },
  { id: 'streets', name: 'Streets', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'satellite', name: 'Satellite', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
];

export const DEFAULT_MAP_STYLE = 'light';

// Clustering Configuration
export const CLUSTER_CONFIG = {
  maxZoom: 14,
  radius: 50,
  minPoints: 2,
};

// 3D Building Configuration
export const BUILDING_3D_CONFIG = {
  minZoom: 14,
  color: '#e2e8f0',
  opacity: 0.8,
};

// Auto-tilt Configuration
export const AUTO_TILT_CONFIG = {
  zoomThreshold: 14.5,
  maxPitch: 60,
  pitchMultiplier: 20,
};

// Price Marker Visibility
export const PRICE_MARKER_MIN_ZOOM = 13.5;

// Demo Mapbox Token (provided by user for this session)
export const DEMO_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3N0dGVldnZlZW5ubm4iLCJhIjoiY21peWN2bjllMDY2ZzNkc2ViY2tscnpnayJ9.6eHgoIFkVVwVeYjlh-YxPA';

// Mock Listings Data
export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Loft in SoHo',
    price: 450,
    currency: 'USD',
    description: 'A spacious, industrial-chic loft with high ceilings and huge windows in the heart of SoHo.',
    address: '123 Mercer St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    latitude: 40.7233,
    longitude: -74.003,
    propertyType: 'apartment',
  },
  {
    id: '2',
    title: 'Luxury Penthouse with View',
    price: 1200,
    currency: 'USD',
    description: 'Stunning penthouse with panoramic views of the skyline. Private terrace and concierge.',
    address: '56 Leonard St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2500,
    latitude: 40.7175,
    longitude: -74.0055,
    propertyType: 'penthouse',
  },
  {
    id: '3',
    title: 'Cozy West Village Studio',
    price: 250,
    currency: 'USD',
    description: 'Charming studio on a quiet tree-lined street. Perfect for solo travelers.',
    address: '88 Perry St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 450,
    latitude: 40.7359,
    longitude: -74.0048,
    propertyType: 'studio',
  },
  {
    id: '4',
    title: 'Tribeca Family Home',
    price: 850,
    currency: 'USD',
    description: 'Spacious family apartment near parks and top restaurants. Recently renovated.',
    address: '100 Hudson St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    latitude: 40.7195,
    longitude: -74.009,
    propertyType: 'apartment',
  },
  {
    id: '5',
    title: 'East Village Art Space',
    price: 300,
    currency: 'USD',
    description: 'Eclectic apartment filled with art. Steps from the best nightlife in the city.',
    address: '45 E 7th St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 700,
    latitude: 40.728,
    longitude: -73.988,
    propertyType: 'apartment',
  },
  {
    id: '6',
    title: 'Financial District High-Rise',
    price: 400,
    currency: 'USD',
    description: 'Modern amenities, gym, and rooftop access. Close to Wall Street.',
    address: '15 Broad St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    latitude: 40.7065,
    longitude: -74.011,
    propertyType: 'apartment',
  },
  {
    id: '7',
    title: 'Chelsea Brownstone',
    price: 600,
    currency: 'USD',
    description: 'Classic brownstone floor-through with garden access.',
    address: '300 W 20th St, New York, NY',
    imageUrl: 'https://picsum.photos/400/300?random=7',
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 1100,
    latitude: 40.7445,
    longitude: -74.001,
    propertyType: 'house',
  },
  {
    id: '8',
    title: 'DUMBO Waterfront Loft',
    price: 550,
    currency: 'USD',
    description: 'Brooklyn loft with views of the Manhattan Bridge.',
    address: '50 Water St, Brooklyn, NY',
    imageUrl: 'https://picsum.photos/400/300?random=8',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1400,
    latitude: 40.7035,
    longitude: -73.99,
    propertyType: 'apartment',
  },
];
