/**
 * Map Entity
 * Domain entities related to map visualization
 */
export interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  transitionDuration?: number;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapStyle {
  id: string;
  name: string;
  url: string;
}

export type MapLayerType = 'clusters' | 'buildings' | 'terrain' | 'markers';

export interface MapConfig {
  initialViewState: MapViewState;
  styles: MapStyle[];
  defaultStyle: string;
  enable3DBuildings: boolean;
  enableTerrain: boolean;
  enableClustering: boolean;
}
