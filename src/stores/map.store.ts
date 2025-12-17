/**
 * Map Store
 * Zustand store for map state management
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MapViewState } from '@/domain';
import { INITIAL_VIEW_STATE, AUTO_TILT_CONFIG } from '@/config';

interface MapState {
  // View State
  viewState: MapViewState;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;

  // Map Style
  currentStyle: string;

  // Feature Toggles
  show3DBuildings: boolean;
  showTerrain: boolean;
  showClusters: boolean;

  // Actions
  setViewState: (viewState: MapViewState) => void;
  updateViewState: (updates: Partial<MapViewState>) => void;
  flyTo: (lat: number, lng: number, zoom?: number) => void;
  setStyle: (styleId: string) => void;
  toggle3DBuildings: () => void;
  toggleTerrain: () => void;
  toggleClusters: () => void;
  setError: (message: string | null) => void;
  resetView: () => void;
}

export const useMapStore = create<MapState>()(
  devtools(
    (set, get) => ({
      // Initial State
      viewState: INITIAL_VIEW_STATE,
      isLoading: false,
      hasError: false,
      errorMessage: null,
      currentStyle: 'light',
      show3DBuildings: true,
      showTerrain: true,
      showClusters: true,

      // Actions
      setViewState: (viewState) => {
        set({ viewState }, false, 'setViewState');
      },

      updateViewState: (updates) => {
        const { viewState } = get();

        // Auto-tilt calculation based on zoom
        let newPitch = updates.pitch ?? viewState.pitch;
        const newZoom = updates.zoom ?? viewState.zoom;

        if (updates.zoom !== undefined && updates.pitch === undefined) {
          // Auto-tilt for immersive 3D feel
          if (newZoom > AUTO_TILT_CONFIG.zoomThreshold) {
            newPitch = Math.min(
              (newZoom - AUTO_TILT_CONFIG.zoomThreshold) * AUTO_TILT_CONFIG.pitchMultiplier,
              AUTO_TILT_CONFIG.maxPitch
            );
          } else {
            newPitch = 0;
          }
        }

        set(
          {
            viewState: {
              ...viewState,
              ...updates,
              pitch: newPitch,
            },
          },
          false,
          'updateViewState'
        );
      },

      flyTo: (lat, lng, zoom = 16) => {
        const { viewState } = get();
        set(
          {
            viewState: {
              ...viewState,
              latitude: lat,
              longitude: lng,
              zoom,
              pitch: 45,
              bearing: -20,
              transitionDuration: 1500,
            },
          },
          false,
          'flyTo'
        );
      },

      setStyle: (styleId) => {
        set({ currentStyle: styleId }, false, 'setStyle');
      },

      toggle3DBuildings: () => {
        const { show3DBuildings } = get();
        set({ show3DBuildings: !show3DBuildings }, false, 'toggle3DBuildings');
      },

      toggleTerrain: () => {
        const { showTerrain } = get();
        set({ showTerrain: !showTerrain }, false, 'toggleTerrain');
      },

      toggleClusters: () => {
        const { showClusters } = get();
        set({ showClusters: !showClusters }, false, 'toggleClusters');
      },

      setError: (message) => {
        set(
          {
            hasError: message !== null,
            errorMessage: message,
          },
          false,
          'setError'
        );
      },

      resetView: () => {
        set(
          {
            viewState: INITIAL_VIEW_STATE,
            hasError: false,
            errorMessage: null,
          },
          false,
          'resetView'
        );
      },
    }),
    { name: 'MapStore' }
  )
);
