/**
 * Map Layer Configurations
 * Mapbox GL layer style definitions
 */
import type { LayerProps } from 'react-map-gl';
import { BUILDING_3D_CONFIG } from '@/config';

/**
 * 3D Building Extrusion Layer
 * Creates the immersive 3D city effect
 */
export const building3DLayer: LayerProps = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: BUILDING_3D_CONFIG.minZoom,
  paint: {
    'fill-extrusion-color': BUILDING_3D_CONFIG.color,
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'min_height'],
    'fill-extrusion-opacity': BUILDING_3D_CONFIG.opacity,
    'fill-extrusion-vertical-gradient': true,
  },
};

/**
 * Cluster Circle Layer
 * Shows clustered points with count-based sizing
 */
export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'listings',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#6366f1', // primary-500
      5,
      '#4f46e5', // primary-600
      10,
      '#4338ca', // primary-700
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      5,
      30,
      10,
      40,
    ],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
  },
};

/**
 * Cluster Count Label Layer
 */
export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'listings',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 14,
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#ffffff',
  },
};

/**
 * Unclustered Point Layer
 * Individual markers when zoomed in or not clustered
 */
export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'listings',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#6366f1',
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
  },
};

/**
 * Sky Layer for atmospheric effects
 */
export const skyLayer: LayerProps = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 90.0],
    'sky-atmosphere-sun-intensity': 15,
  },
};

/**
 * Route Line Layer (for commute visualization)
 */
export const routeLayer: LayerProps = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#4f46e5',
    'line-width': 4,
    'line-opacity': 0.8,
  },
};
