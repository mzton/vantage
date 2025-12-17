/**
 * Repository Interfaces
 * Abstract contracts for data access patterns
 */
import { Listing, MapBounds } from '../entities';

export interface IListingRepository {
  findAll(): Promise<Listing[]>;
  findById(id: string): Promise<Listing | null>;
  findByBounds(bounds: MapBounds): Promise<Listing[]>;
  findNearby(lat: number, lng: number, radiusKm: number): Promise<Listing[]>;
  search(query: ListingSearchQuery): Promise<ListingSearchResult>;
}

export interface ListingSearchQuery {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyTypes?: string[];
  minBedrooms?: number;
  maxBedrooms?: number;
  bounds?: MapBounds;
  limit?: number;
  offset?: number;
}

export interface ListingSearchResult {
  listings: Listing[];
  total: number;
  hasMore: boolean;
}
