/**
 * Listing Entity
 * Core domain entity representing a property listing
 */
export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  address: string;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  amenities?: string[];
  hostId?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropertyType = 'apartment' | 'house' | 'penthouse' | 'studio' | 'condo' | 'villa';

export interface ListingCluster {
  id: string;
  count: number;
  latitude: number;
  longitude: number;
  bounds: GeoBox;
}

export interface GeoBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}
