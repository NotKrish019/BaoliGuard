import React from 'react';
import { DetectionItem } from '../types';

export interface DefectLegendProps {
  detections: DetectionItem[];
  visibleClasses: Set<string>;
  onToggleClass: (className: string) => void;
  className?: string;
}

export const DefectLegend: React.FC<DefectLegendProps> = ({
  detections,
  visibleClasses,
  onToggleClass,
  className = '',
}) => {
  const classStyles: Record<string, { label: string; color: string; badge: string; border: string }> = {
    crack: {
      label: 'Crack (Masonry Fracture)',
      color: 'bg-rose-500',
      badge: 'text-rose-400 bg-rose-950/80',
      border: 'border-rose-500',
    },
    vegetation_root_intrusion: {
      label: 'Vegetation Root Intrusion',
      color: 'bg-emerald-500',
      badge: 'text-emerald-400 bg-emerald-950/80',
      border: 'border-emerald-500',
    },
    spalling: {
      label: 'Stone Surface Spalling',
      color: 'bg-amber-500',
      badge: 'text-amber-400 bg-amber-950/80',
      border: 'border-amber-500',
    },
    efflorescence: {
      label: 'Salt Efflorescence',
      color: 'bg-cyan-400',
      badge: 'text-cyan-300 bg-cyan-950/80',
      border: 'border-cyan-400',
    },
    biological_growth: {
      label: 'Biological Biofilm / Lichen',
      color: 'bg-lime-500',
      badge: 'text-lime-300 bg-lime-950/80',
      border: 'border-lime-500',
    },
    stone_dislodgement: {
      label: 'Stone Block Dislodgement',
      color: 'bg-purple-500',
      badge: 'text-purple-300 bg-purple-950/80',
      border: 'border-purple-500',
    },
  };

  return (
    <div className={`glass-panel rounded-xl p-5 border border-slate-800 ${className}`}>
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Defect Segmentation Layers</h4>
          <p className="text-xs text-slate-400">Toggle individual defect overlays on the inspection canvas</p>
        </div>
        <span className="text-[11px] font-mono text-sandstone-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          {detections.length} Defect Groups
        </span>
      </div>

      <div className="space-y-2.5">
        {detections.map((det) => {
          const style = classStyles[det.class_name] || {
            label: det.class_name.replace(/_/g, ' '),
            color: 'bg-slate-400',
            badge: 'text-slate-300 bg-slate-900',
            border: 'border-slate-500',
          };
          const isVisible = visibleClasses.has(det.class_name);

          return (
            <div
              key={det.class_name}
              onClick={() => onToggleClass(det.class_name)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                isVisible
                  ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-50 hover:opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => {}} // handled by parent div onClick
                  className="rounded border-slate-700 bg-slate-900 text-sandstone-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />

                <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${style.color}`} />

                <div>
                  <div className="text-xs font-bold text-slate-200">
                    {style.label}
                  </div>
                  <div className="text-[10.5px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{det.component_count} components</span>
                    <span>•</span>
                    <span>{det.pixel_area.toLocaleString()} px²</span>
                    <span>•</span>
                    <span>{(det.coverage_ratio * 100).toFixed(2)}% coverage</span>
                  </div>
                </div>
              </div>

              {/* Confidence and Severity Badges */}
              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Conf: {(det.confidence * 100).toFixed(0)}%
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase border ${
                      det.relative_severity === 'severe'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : det.relative_severity === 'moderate'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {det.relative_severity || 'moderate'}
                  </span>
                </div>
                <div className="text-[9px] font-mono text-slate-500">
                  {det.total_length_pixels ? `Length: ${det.total_length_pixels} px` : 'Area Segment'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
