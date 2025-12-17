import React, { useRef, useState, useMemo, useCallback } from 'react';
import Map, { 
  Marker, 
  Popup, 
  NavigationControl, 
  Source, 
  Layer, 
  MapRef,
  ViewStateChangeEvent
} from 'react-map-gl';
import { Listing, MapViewState } from '../types';
import { INITIAL_VIEW_STATE, MAP_STYLES } from '../constants';
import HouseCard from './HouseCard';

interface MapComponentProps {
  listings: Listing[];
  onSelectListing: (listing: Listing | null) => void;
  selectedListing: Listing | null;
  mapboxToken: string;
}

// 3D Building Layer
const buildingLayer: any = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 14,
  paint: {
    'fill-extrusion-color': '#e2e8f0', // Slate-200
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'min_height'],
    'fill-extrusion-opacity': 0.8,
    'fill-extrusion-vertical-gradient': true
  }
};

// Cluster Layer Configurations
const clusterLayer: any = {
  id: 'clusters',
  type: 'circle',
  source: 'houses',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#6366f1', 5, '#4f46e5', 10, '#4338ca'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 5, 30, 10, 40],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff'
  }
};

const clusterCountLayer: any = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'houses',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 14,
    'text-allow-overlap': true
  },
  paint: {
    'text-color': '#ffffff'
  }
};

const unclusteredPointLayer: any = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'houses',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#6366f1',
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff'
  }
};

const MapComponent: React.FC<MapComponentProps> = ({ listings, onSelectListing, selectedListing, mapboxToken }) => {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [hasTokenError, setHasTokenError] = useState(false);

  // Convert listings to GeoJSON
  const points = useMemo(() => ({
    type: 'FeatureCollection',
    features: listings.map(house => ({
      type: 'Feature',
      properties: { ...house },
      geometry: { type: 'Point', coordinates: [house.lng, house.lat] }
    }))
  }), [listings]);

  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    const newZoom = evt.viewState.zoom;
    // Auto-tilt to 3D when zooming in close for that "Immersive" feel
    const newPitch = newZoom > 14.5 ? Math.min((newZoom - 14.5) * 20, 60) : 0; 
    
    setViewState({
      ...evt.viewState,
      pitch: newPitch
    });
  }, []);

  const handleMarkerClick = (e: React.MouseEvent, listing: Listing) => {
    e.stopPropagation();
    onSelectListing(listing);
    // Smooth fly to the location
    mapRef.current?.flyTo({
      center: [listing.lng, listing.lat],
      zoom: 16,
      pitch: 45,
      bearing: -20,
      duration: 1500
    });
  };

  const handleClusterClick = (e: any) => {
    const feature = e.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current?.getSource('houses') as any;

    mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
      if (err) return;

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500
      });
    });
  };

  return (
    <div className="h-full w-full relative bg-slate-100">
       {hasTokenError && (
         <div className="absolute top-0 left-0 right-0 z-50 bg-red-600 text-white text-xs p-2 text-center font-bold">
           Invalid Mapbox Token. Please reload and try again.
         </div>
       )}
      
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapStyle={MAP_STYLES.LIGHT}
        mapboxAccessToken={mapboxToken}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        style={{ width: '100%', height: '100%' }}
        onError={() => setHasTokenError(true)}
        interactiveLayerIds={['clusters', 'unclustered-point']}
        onMouseEnter={() => document.body.style.cursor = 'pointer'}
        onMouseLeave={() => document.body.style.cursor = 'default'}
        onClick={(e) => {
           // Handle interactive layers
           if (e.features && e.features.length > 0) {
               const feature = e.features[0];
               if (feature.properties?.cluster) {
                   handleClusterClick(e);
                   return;
               }
           }
           // Fallback: Click on map background or unhandled feature
           onSelectListing(null);
        }}
      >
        <Source
          id="houses"
          type="geojson"
          data={points as any}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          {/* Clustering Circles */}
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          
          {/* Unclustered Points - using a Circle Layer for cleaner distant view */}
          <Layer {...unclusteredPointLayer} />
        </Source>

        {/* 3D Buildings - The core "Vantage" feature */}
        <Layer {...buildingLayer} />

        {/* High Zoom Price Tags (React Markers for interactivity) */}
        {listings.map((listing) => (
           // Only render sophisticated DOM markers when zoomed in closer to save performance
           viewState.zoom > 13.5 && (
             <Marker 
               key={listing.id} 
               longitude={listing.lng} 
               latitude={listing.lat}
               anchor="bottom"
               onClick={(e) => handleMarkerClick(e, listing)}
             >
               <div className={`
                 group cursor-pointer transition-all duration-300 transform 
                 ${selectedListing?.id === listing.id ? 'scale-110 z-50' : 'hover:scale-105'}
               `}>
                 <div className={`
                   px-3 py-1 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 border
                   ${selectedListing?.id === listing.id 
                     ? 'bg-indigo-600 text-white border-indigo-700' 
                     : 'bg-white text-slate-800 border-slate-200'}
                 `}>
                   <span>${listing.price}</span>
                 </div>
                 {/* Little Triangle Pointer */}
                 <div className={`
                   w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto
                   ${selectedListing?.id === listing.id ? 'border-t-indigo-600' : 'border-t-white'}
                 `}></div>
               </div>
             </Marker>
           )
        ))}

        {/* Popup Logic */}
        {selectedListing && (
          <Popup
            anchor="top"
            longitude={selectedListing.lng}
            latitude={selectedListing.lat}
            onClose={() => onSelectListing(null)}
            maxWidth="340px"
            closeButton={false}
            offset={25}
            className="z-40"
          >
             <HouseCard 
                listing={selectedListing} 
                onClose={() => onSelectListing(null)}
                onAnalyze={() => { /* Handled by parent */ }} 
             />
          </Popup>
        )}

        <NavigationControl position="top-right" />
      </Map>

      {/* Gradient Overlay for style */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-10" />
      
      <div className="absolute top-6 left-6 z-20">
          <h1 className="text-3xl font-bold text-indigo-900 tracking-tight drop-shadow-sm">Vantage</h1>
          <p className="text-slate-600 text-sm font-medium">Search by location, stay for the view.</p>
      </div>
    </div>
  );
};

export default MapComponent;