/**
 * GeoJSON Type Definitions
 * Types for map data structures
 */
import { Listing } from '../entities';

export interface ListingGeoJSON {
  type: 'FeatureCollection';
  features: ListingFeature[];
}

export interface ListingFeature {
  type: 'Feature';
  properties: ListingFeatureProperties;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface ListingFeatureProperties {
  id: string;
  title: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  cluster?: boolean;
  point_count?: number;
  point_count_abbreviated?: string;
}

/**
 * Convert listings to GeoJSON format
 */
export function listingsToGeoJSON(listings: Listing[]): ListingGeoJSON {
  return {
    type: 'FeatureCollection',
    features: listings.map((listing) => ({
      type: 'Feature',
      properties: {
        id: listing.id,
        title: listing.title,
        price: listing.price,
        propertyType: listing.propertyType,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
      },
      geometry: {
        type: 'Point',
        coordinates: [listing.longitude, listing.latitude],
      },
    })),
  };
}
