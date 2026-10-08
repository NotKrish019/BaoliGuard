import React, { useState } from 'react';
import { InspectionROI } from '../types';
import { Button } from './Button';

export interface ROISelectorProps {
  imageSrc: string;
  roi?: InspectionROI;
  onChangeROI: (roi: InspectionROI) => void;
  className?: string;
}

export const ROISelector: React.FC<ROISelectorProps> = ({
  imageSrc,
  roi = { x: 0, y: 0, width: 100, height: 100, isNormalized: true },
  onChangeROI,
  className = '',
}) => {
  const [activePreset, setActivePreset] = useState<string>('full');

  const presets: { id: string; name: string; roi: InspectionROI; desc: string }[] = [
    {
      id: 'full',
      name: 'Full Survey Image',
      roi: { x: 0, y: 0, width: 100, height: 100, isNormalized: true },
      desc: 'Complete photographic frame (100% surface)',
    },
    {
      id: 'lower_basin',
      name: 'Lower Basin / Silt Tier',
      roi: { x: 10, y: 55, width: 80, height: 42, isNormalized: true },
      desc: 'Submerged bottom tier and aquifer intake area',
    },
    {
      id: 'central_arch',
      name: 'Central Arch & Jointing',
      roi: { x: 25, y: 20, width: 50, height: 55, isNormalized: true },
      desc: 'Structural archway and high-stress masonry bedding',
    },
    {
      id: 'upper_canopy',
      name: 'Upper Parapet / Vegetation Zone',
      roi: { x: 5, y: 5, width: 90, height: 40, isNormalized: true },
      desc: 'Crest masonry vulnerable to windborne seed intrusion',
    },
  ];

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setActivePreset(preset.id);
    onChangeROI(preset.roi);
  };

  return (
    <div className={`glass-panel rounded-xl p-5 border border-slate-800 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800">
              ROI
            </span>
            <h4 className="text-sm font-bold text-white">Inspection Region of Interest</h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Focus segmentation and crack measurements on specific architectural sub-regions.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono text-sandstone-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            X:{roi.x}% Y:{roi.y}% W:{roi.width}% H:{roi.height}%
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {presets.map((preset) => {
          const isSelected = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-lg text-left border transition-all text-xs ${
                isSelected
                  ? 'bg-sandstone-950/80 border-sandstone-500/80 text-sandstone-200 shadow-md shadow-sandstone-950/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-200 truncate">{preset.name}</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Visual ROI Preview Frame */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[16/9] select-none">
        <img
          src={imageSrc}
          alt="ROI Reference"
          className="w-full h-full object-cover opacity-75"
        />

        {/* Highlighted ROI Frame */}
        <div
          className="absolute border-2 border-sandstone-400 bg-sandstone-500/15 shadow-[0_0_15px_rgba(205,174,139,0.4)] pointer-events-none transition-all duration-300 flex items-start justify-between p-1.5"
          style={{
            left: `${roi.x}%`,
            top: `${roi.y}%`,
            width: `${roi.width}%`,
            height: `${roi.height}%`,
          }}
        >
          <span className="text-[10px] font-mono font-bold bg-sandstone-900/90 text-sandstone-200 px-1.5 py-0.5 rounded border border-sandstone-500/50 shadow">
            ROI: {roi.width}% × {roi.height}%
          </span>
          <span className="text-[9px] font-mono text-amber-300 bg-heritage-950/80 px-1 py-0.5 rounded">
            Target Focus Area
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mt-3 font-mono">
        <span>Coordinate System: Normalized Surface Area</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleSelectPreset(presets[0])}
        >
          Reset to 100% Full Area
        </Button>
      </div>
    </div>
  );
};
