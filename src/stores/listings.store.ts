/**
 * Listings Store
 * Zustand store for property listings state
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Listing, ListingSearchQuery } from '@/domain';
import { listingsRepository } from '@/services';

interface ListingsState {
  // Data
  listings: Listing[];
  selectedListing: Listing | null;
  hoveredListingId: string | null;

  // Loading States
  isLoading: boolean;
  isSearching: boolean;

  // Search/Filter
  searchQuery: ListingSearchQuery;
  totalResults: number;
  hasMore: boolean;

  // Actions
  fetchListings: () => Promise<void>;
  selectListing: (listing: Listing | null) => void;
  setHoveredListing: (id: string | null) => void;
  search: (query: ListingSearchQuery) => Promise<void>;
  clearSearch: () => void;
  loadMore: () => Promise<void>;
}

export const useListingsStore = create<ListingsState>()(
  devtools(
    (set, get) => ({
      // Initial State
      listings: [],
      selectedListing: null,
      hoveredListingId: null,
      isLoading: false,
      isSearching: false,
      searchQuery: {},
      totalResults: 0,
      hasMore: false,

      // Actions
      fetchListings: async () => {
        set({ isLoading: true }, false, 'fetchListings/pending');
        try {
          const listings = await listingsRepository.findAll();
          set(
            {
              listings,
              isLoading: false,
              totalResults: listings.length,
            },
            false,
            'fetchListings/fulfilled'
          );
        } catch (error) {
          console.error('Failed to fetch listings:', error);
          set({ isLoading: false }, false, 'fetchListings/rejected');
        }
      },

      selectListing: (listing) => {
        set({ selectedListing: listing }, false, 'selectListing');
      },

      setHoveredListing: (id) => {
        set({ hoveredListingId: id }, false, 'setHoveredListing');
      },

      search: async (query) => {
        set({ isSearching: true, searchQuery: query }, false, 'search/pending');
        try {
          const result = await listingsRepository.search(query);
          set(
            {
              listings: result.listings,
              totalResults: result.total,
              hasMore: result.hasMore,
              isSearching: false,
            },
            false,
            'search/fulfilled'
          );
        } catch (error) {
          console.error('Search failed:', error);
          set({ isSearching: false }, false, 'search/rejected');
        }
      },

      clearSearch: () => {
        set({ searchQuery: {} }, false, 'clearSearch');
        get().fetchListings();
      },

      loadMore: async () => {
        const { searchQuery, listings, hasMore } = get();
        if (!hasMore) return;

        set({ isLoading: true }, false, 'loadMore/pending');
        try {
          const result = await listingsRepository.search({
            ...searchQuery,
            offset: listings.length,
          });
          set(
            {
              listings: [...listings, ...result.listings],
              hasMore: result.hasMore,
              isLoading: false,
            },
            false,
            'loadMore/fulfilled'
          );
        } catch (error) {
          console.error('Load more failed:', error);
          set({ isLoading: false }, false, 'loadMore/rejected');
        }
      },
    }),
    { name: 'ListingsStore' }
  )
);
