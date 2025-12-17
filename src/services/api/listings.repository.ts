/**
 * Listings Repository
 * Data access layer for property listings
 */
import {
  IListingRepository,
  Listing,
  MapBounds,
  ListingSearchQuery,
  ListingSearchResult
} from '@/domain';
import { MOCK_LISTINGS } from '@/config';

class ListingsRepositoryImpl implements IListingRepository {
  /**
   * Get all listings
   * In production, this would query Supabase/PostGIS
   */
  async findAll(): Promise<Listing[]> {
    // Simulate network delay
    await this.simulateDelay();
    return MOCK_LISTINGS;
  }

  /**
   * Find listing by ID
   */
  async findById(id: string): Promise<Listing | null> {
    await this.simulateDelay();
    return MOCK_LISTINGS.find((l) => l.id === id) || null;
  }

  /**
   * Find listings within map bounds
   * Uses PostGIS ST_Within in production
   */
  async findByBounds(bounds: MapBounds): Promise<Listing[]> {
    await this.simulateDelay();
    return MOCK_LISTINGS.filter(
      (listing) =>
        listing.latitude >= bounds.south &&
        listing.latitude <= bounds.north &&
        listing.longitude >= bounds.west &&
        listing.longitude <= bounds.east
    );
  }

  /**
   * Find listings near a point
   * Uses PostGIS ST_DWithin in production
   */
  async findNearby(lat: number, lng: number, radiusKm: number): Promise<Listing[]> {
    await this.simulateDelay();
    return MOCK_LISTINGS.filter((listing) => {
      const distance = this.haversineDistance(
        lat,
        lng,
        listing.latitude,
        listing.longitude
      );
      return distance <= radiusKm;
    });
  }

  /**
   * Search listings with filters
   */
  async search(query: ListingSearchQuery): Promise<ListingSearchResult> {
    await this.simulateDelay();

    let results = [...MOCK_LISTINGS];

    // Apply filters
    if (query.keyword) {
      const keyword = query.keyword.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(keyword) ||
          l.description.toLowerCase().includes(keyword) ||
          l.address.toLowerCase().includes(keyword)
      );
    }

    if (query.minPrice !== undefined) {
      results = results.filter((l) => l.price >= query.minPrice!);
    }

    if (query.maxPrice !== undefined) {
      results = results.filter((l) => l.price <= query.maxPrice!);
    }

    if (query.propertyTypes && query.propertyTypes.length > 0) {
      results = results.filter((l) =>
        query.propertyTypes!.includes(l.propertyType)
      );
    }

    if (query.minBedrooms !== undefined) {
      results = results.filter((l) => l.bedrooms >= query.minBedrooms!);
    }

    if (query.maxBedrooms !== undefined) {
      results = results.filter((l) => l.bedrooms <= query.maxBedrooms!);
    }

    if (query.bounds) {
      results = results.filter(
        (l) =>
          l.latitude >= query.bounds!.south &&
          l.latitude <= query.bounds!.north &&
          l.longitude >= query.bounds!.west &&
          l.longitude <= query.bounds!.east
      );
    }

    const total = results.length;
    const offset = query.offset || 0;
    const limit = query.limit || 20;

    results = results.slice(offset, offset + limit);

    return {
      listings: results,
      total,
      hasMore: offset + results.length < total,
    };
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private haversineDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}

// Singleton instance
export const listingsRepository = new ListingsRepositoryImpl();
