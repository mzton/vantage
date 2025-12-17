export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  address: string;
  image: string;
  bed: number;
  bath: number;
  sqft: number;
  lat: number;
  lng: number;
  type: 'Apartment' | 'House' | 'Penthouse' | 'Studio';
}

export interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}