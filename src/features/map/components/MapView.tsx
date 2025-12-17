/**
 * MapView Component
 * Main 3D map visualization with Mapbox GL
 */
'use client';

import React, { useRef, useCallback, useMemo } from 'react';
import Map, {
  NavigationControl,
  Source,
  Layer,
  MapRef,
  ViewStateChangeEvent,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useMapStore, useListingsStore } from '@/stores';
import { useMapbox } from '@/hooks';
import { listingsToGeoJSON } from '@/domain';
import { MAP_STYLES, CLUSTER_CONFIG, PRICE_MARKER_MIN_ZOOM } from '@/config';
import {
  building3DLayer,
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from '@/services/map/layers.config';
import { PriceMarker } from './PriceMarker';
import { ListingPopup } from '../../listings/components/ListingPopup';

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const { token } = useMapbox();

  // Map Store
  const {
    viewState,
    currentStyle,
    show3DBuildings,
    showClusters,
    updateViewState,
    setError,
  } = useMapStore();

  // Listings Store
  const { listings, selectedListing, selectListing } = useListingsStore();

  // Convert listings to GeoJSON
  const geojsonData = useMemo(() => listingsToGeoJSON(listings), [listings]);

  // Get current style URL
  const mapStyle = useMemo(() => {
    const style = MAP_STYLES.find((s) => s.id === currentStyle);
    return style?.url || MAP_STYLES[0].url;
  }, [currentStyle]);

  // Handle map movement with auto-tilt
  const handleMove = useCallback(
    (evt: ViewStateChangeEvent) => {
      updateViewState(evt.viewState);
    },
    [updateViewState]
  );

  // Handle cluster click to zoom in
  const handleClusterClick = useCallback(
    (e: mapboxgl.MapLayerMouseEvent) => {
      const feature = e.features?.[0];
      if (!feature || !feature.properties?.cluster) return;

      const clusterId = feature.properties.cluster_id;
      const source = mapRef.current?.getSource('listings') as mapboxgl.GeoJSONSource;

      source?.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || !zoom) return;

        const geometry = feature.geometry as GeoJSON.Point;
        mapRef.current?.easeTo({
          center: geometry.coordinates as [number, number],
          zoom,
          duration: 500,
        });
      });
    },
    []
  );

  // Handle map click
  const handleMapClick = useCallback(
    (e: mapboxgl.MapLayerMouseEvent) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        if (feature.properties?.cluster) {
          handleClusterClick(e);
          return;
        }
      }
      // Click on empty space - deselect
      selectListing(null);
    },
    [handleClusterClick, selectListing]
  );

  // Handle marker click
  const handleMarkerClick = useCallback(
    (e: React.MouseEvent, listingId: string) => {
      e.stopPropagation();
      const listing = listings.find((l) => l.id === listingId);
      if (listing) {
        selectListing(listing);
        mapRef.current?.flyTo({
          center: [listing.longitude, listing.latitude],
          zoom: 16,
          pitch: 45,
          bearing: -20,
          duration: 1500,
        });
      }
    },
    [listings, selectListing]
  );

  if (!token) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Mapbox token required</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapStyle={mapStyle}
        mapboxAccessToken={token}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        style={{ width: '100%', height: '100%' }}
        onError={() => setError('Invalid Mapbox token')}
        interactiveLayerIds={showClusters ? ['clusters', 'unclustered-point'] : []}
        onClick={handleMapClick}
        cursor="default"
      >
        {/* Terrain Source */}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />

        {/* Listings GeoJSON Source */}
        <Source
          id="listings"
          type="geojson"
          data={geojsonData}
          cluster={showClusters}
          clusterMaxZoom={CLUSTER_CONFIG.maxZoom}
          clusterRadius={CLUSTER_CONFIG.radius}
        >
          {showClusters && (
            <>
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </>
          )}
        </Source>

        {/* 3D Buildings Layer */}
        {show3DBuildings && <Layer {...building3DLayer} />}

        {/* Price Tag Markers (shown at high zoom) */}
        {viewState.zoom > PRICE_MARKER_MIN_ZOOM &&
          listings.map((listing) => (
            <PriceMarker
              key={listing.id}
              listing={listing}
              isSelected={selectedListing?.id === listing.id}
              onClick={handleMarkerClick}
            />
          ))}

        {/* Selected Listing Popup */}
        {selectedListing && (
          <ListingPopup
            listing={selectedListing}
            onClose={() => selectListing(null)}
          />
        )}

        {/* Navigation Controls */}
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}
