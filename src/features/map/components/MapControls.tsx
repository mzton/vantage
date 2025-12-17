/**
 * MapControls Component
 * Style and feature toggle controls
 */
'use client';

import React from 'react';
import { Layers, Building2, Mountain, Grid3X3 } from 'lucide-react';
import { useMapStore } from '@/stores';
import { MAP_STYLES } from '@/config';
import { Button } from '@/components/ui';

export function MapControls() {
  const {
    currentStyle,
    show3DBuildings,
    showTerrain,
    showClusters,
    setStyle,
    toggle3DBuildings,
    toggleTerrain,
    toggleClusters,
  } = useMapStore();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="absolute bottom-6 left-6 z-30">
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-lg"
      >
        <Layers size={20} />
      </Button>

      {/* Controls Panel */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-xl p-4 min-w-[200px] animate-fade-in">
          {/* Map Styles */}
          <div className="mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">
              Map Style
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MAP_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setStyle(style.id)}
                  className={`
                    px-3 py-2 rounded-lg text-xs font-medium transition-colors
                    ${
                      currentStyle === style.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">
              Features
            </p>

            <ToggleButton
              icon={<Building2 size={16} />}
              label="3D Buildings"
              isActive={show3DBuildings}
              onClick={toggle3DBuildings}
            />

            <ToggleButton
              icon={<Mountain size={16} />}
              label="Terrain"
              isActive={showTerrain}
              onClick={toggleTerrain}
            />

            <ToggleButton
              icon={<Grid3X3 size={16} />}
              label="Clustering"
              isActive={showClusters}
              onClick={toggleClusters}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ToggleButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function ToggleButton({ icon, label, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
        }
      `}
    >
      {icon}
      <span>{label}</span>
      <span
        className={`
          ml-auto w-2 h-2 rounded-full
          ${isActive ? 'bg-primary-500' : 'bg-slate-300'}
        `}
      />
    </button>
  );
}
