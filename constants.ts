import { Listing } from './types';

// NYC Coordinates
export const INITIAL_VIEW_STATE = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 13,
  bearing: 0,
  pitch: 0
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Loft in SoHo',
    price: 450,
    currency: 'USD',
    description: 'A spacious, industrial-chic loft with high ceilings and huge windows in the heart of SoHo.',
    address: '123 Mercer St, New York, NY',
    image: 'https://picsum.photos/400/300?random=1',
    bed: 2,
    bath: 2,
    sqft: 1200,
    lat: 40.7233,
    lng: -74.0030,
    type: 'Apartment'
  },
  {
    id: '2',
    title: 'Luxury Penthouse with View',
    price: 1200,
    currency: 'USD',
    description: 'Stunning penthouse with panoramic views of the skyline. Private terrace and concierge.',
    address: '56 Leonard St, New York, NY',
    image: 'https://picsum.photos/400/300?random=2',
    bed: 3,
    bath: 3.5,
    sqft: 2500,
    lat: 40.7175,
    lng: -74.0055,
    type: 'Penthouse'
  },
  {
    id: '3',
    title: 'Cozy West Village Studio',
    price: 250,
    currency: 'USD',
    description: 'Charming studio on a quiet tree-lined street. Perfect for solo travelers.',
    address: '88 Perry St, New York, NY',
    image: 'https://picsum.photos/400/300?random=3',
    bed: 1,
    bath: 1,
    sqft: 450,
    lat: 40.7359,
    lng: -74.0048,
    type: 'Studio'
  },
  {
    id: '4',
    title: 'Tribeca Family Home',
    price: 850,
    currency: 'USD',
    description: 'Spacious family apartment near parks and top restaurants. Recently renovated.',
    address: '100 Hudson St, New York, NY',
    image: 'https://picsum.photos/400/300?random=4',
    bed: 3,
    bath: 2,
    sqft: 1800,
    lat: 40.7195,
    lng: -74.0090,
    type: 'Apartment'
  },
  {
    id: '5',
    title: 'East Village Art Space',
    price: 300,
    currency: 'USD',
    description: 'Eclectic apartment filled with art. Steps from the best nightlife in the city.',
    address: '45 E 7th St, New York, NY',
    image: 'https://picsum.photos/400/300?random=5',
    bed: 1,
    bath: 1,
    sqft: 700,
    lat: 40.7280,
    lng: -73.9880,
    type: 'Apartment'
  },
  {
    id: '6',
    title: 'Financial District High-Rise',
    price: 400,
    currency: 'USD',
    description: 'Modern amenities, gym, and rooftop access. Close to Wall Street.',
    address: '15 Broad St, New York, NY',
    image: 'https://picsum.photos/400/300?random=6',
    bed: 1,
    bath: 1,
    sqft: 800,
    lat: 40.7065,
    lng: -74.0110,
    type: 'Apartment'
  },
  {
    id: '7',
    title: 'Chelsea Brownstone',
    price: 600,
    currency: 'USD',
    description: 'Classic brownstone floor-through with garden access.',
    address: '300 W 20th St, New York, NY',
    image: 'https://picsum.photos/400/300?random=7',
    bed: 2,
    bath: 1.5,
    sqft: 1100,
    lat: 40.7445,
    lng: -74.0010,
    type: 'House'
  },
  {
    id: '8',
    title: 'DUMBO Waterfront Loft',
    price: 550,
    currency: 'USD',
    description: 'Brooklyn loft with views of the Manhattan Bridge.',
    address: '50 Water St, Brooklyn, NY',
    image: 'https://picsum.photos/400/300?random=8',
    bed: 2,
    bath: 2,
    sqft: 1400,
    lat: 40.7035,
    lng: -73.9900,
    type: 'Apartment'
  }
];

export const MAP_STYLES = {
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  DARK: 'mapbox://styles/mapbox/dark-v11',
  SATELLITE: 'mapbox://styles/mapbox/satellite-streets-v12',
  LIGHT: 'mapbox://styles/mapbox/light-v11'
};