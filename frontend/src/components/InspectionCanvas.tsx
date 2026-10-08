import React, { useState, useRef } from 'react';
import { DetectionItem, ImageDimensions } from '../types';

export type InspectionViewMode = 'overlay' | 'side_by_side' | 'split_slider' | 'mask_only';

export interface InspectionCanvasProps {
  imageSrc: string;
  imageDimensions: ImageDimensions;
  detections: DetectionItem[];
  visibleClasses: Set<string>;
  className?: string;
}

export const InspectionCanvas: React.FC<InspectionCanvasProps> = ({
  imageSrc,
  imageDimensions,
  detections,
  visibleClasses,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<InspectionViewMode>('overlay');
  const [maskOpacity, setMaskOpacity] = useState<number>(0.75);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [splitPos, setSplitPos] = useState<number>(50); // percentage for split slider
  const [hoveredDetection, setHoveredDetection] = useState<DetectionItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { width_pixels, height_pixels } = imageDimensions;

  // Filter detections by currently active visible classes
  const activeDetections = detections.filter((d) => visibleClasses.has(d.class_name));

  const getColor = (className: string) => {
    switch (className) {
      case 'crack':
        return { stroke: '#f43f5e', fill: 'rgba(244, 63, 94, 0.45)', text: '#fda4af' };
      case 'vegetation_root_intrusion':
        return { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.45)', text: '#6ee7b7' };
      case 'spalling':
        return { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.45)', text: '#fde68a' };
      case 'efflorescence':
        return { stroke: '#06b6d4', fill: 'rgba(6, 182, 212, 0.45)', text: '#67e8f9' };
      default:
        return { stroke: '#a855f7', fill: 'rgba(168, 85, 247, 0.45)', text: '#d8b4fe' };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode === 'split_slider' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setSplitPos((x / rect.width) * 100);
    }
  };

  return (
    <div className={`glass-panel rounded-2xl overflow-hidden border border-slate-800 ${className}`}>
      {/* Top Inspection Control Bar */}
      <div className="px-5 py-3.5 bg-heritage-950/90 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'overlay', label: 'Overlay View', icon: '🔲' },
            { id: 'side_by_side', label: 'Side-by-Side', icon: '🪟' },
            { id: 'split_slider', label: 'Comparison Wipe', icon: '↔️' },
            { id: 'mask_only', label: 'Masks Only', icon: '⬛' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as InspectionViewMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 select-none ${
                viewMode === mode.id
                  ? 'bg-sandstone-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Overlay Controls */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Opacity:</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={maskOpacity}
              onChange={(e) => setMaskOpacity(parseFloat(e.target.value))}
              className="w-20 accent-sandstone-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-slate-300 w-8 text-right font-bold">
              {(maskOpacity * 100).toFixed(0)}%
            </span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={(e) => setShowBoxes(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-sandstone-500"
            />
            <span className="text-[11px]">Boxes</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-sandstone-500"
            />
            <span className="text-[11px]">Tags</span>
          </label>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-slate-950 select-none overflow-hidden"
      >
        {/* Render Mode: SIDE BY SIDE */}
        {viewMode === 'side_by_side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-slate-950">
            {/* Left: Original Survey Image */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-slate-300">
                Original Photographic Survey
              </div>
              <img
                src={imageSrc}
                alt="Original Survey"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right: Computer Vision Overlay */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-sandstone-950/90 border border-sandstone-700 text-[10px] font-mono text-sandstone-300">
                Segmented Damage Mask ({activeDetections.length} features)
              </div>
              <div className="relative w-full aspect-[16/10]">
                <img
                  src={imageSrc}
                  alt="Survey Backdrop"
                  className="w-full h-full object-contain opacity-50"
                />
                <svg
                  viewBox={`0 0 ${width_pixels} ${height_pixels}`}
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                >
                  <SvgOverlayElements
                    detections={activeDetections}
                    maskOpacity={maskOpacity}
                    showBoxes={showBoxes}
                    showLabels={showLabels}
                    getColor={getColor}
                    onHoverDetection={(det, pos) => {
                      setHoveredDetection(det);
                      setTooltipPos(pos);
                    }}
                    onLeave={() => {
                      setHoveredDetection(null);
                      setTooltipPos(null);
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Render Mode: SPLIT SLIDER / WIPE */}
        {viewMode === 'split_slider' && (
          <div className="relative w-full aspect-[16/9] cursor-ew-resize">
            {/* Background Layer: Overlay */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={imageSrc}
                alt="Survey with Defects"
                className="w-full h-full object-contain opacity-60"
              />
              <svg
                viewBox={`0 0 ${width_pixels} ${height_pixels}`}
                className="absolute inset-0 w-full h-full"
              >
                <SvgOverlayElements
                  detections={activeDetections}
                  maskOpacity={maskOpacity}
                  showBoxes={showBoxes}
                  showLabels={showLabels}
                  getColor={getColor}
                  onHoverDetection={(det, pos) => {
                    setHoveredDetection(det);
                    setTooltipPos(pos);
                  }}
                  onLeave={() => {
                    setHoveredDetection(null);
                    setTooltipPos(null);
                  }}
                />
              </svg>
            </div>

            {/* Foreground Layer (Clipped to Split Slider Position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl transition-[width] duration-75"
              style={{ width: `${splitPos}%` }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
                <img
                  src={imageSrc}
                  alt="Original Surface"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-slate-300">
                  Original Photographic Base
                </div>
              </div>
            </div>

            {/* Split Handle Divider */}
            <div
              className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="w-7 h-7 -ml-3.5 rounded-full bg-sandstone-500 text-heritage-950 flex items-center justify-center font-bold text-xs shadow-lg shadow-black">
                ↔
              </div>
            </div>

            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-sandstone-950/80 border border-sandstone-700 text-[10px] font-mono text-sandstone-300 pointer-events-none">
              Defect Overlay: {100 - Math.round(splitPos)}% Revealed
            </div>
          </div>
        )}

        {/* Render Mode: OVERLAY or MASK ONLY */}
        {(viewMode === 'overlay' || viewMode === 'mask_only') && (
          <div className="relative w-full aspect-[16/9] flex items-center justify-center">
            {viewMode === 'overlay' ? (
              <img
                src={imageSrc}
                alt="Heritage Survey Inspection"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-slate-950" />
            )}

            {/* SVG Defect Segmentation Overlay */}
            <svg
              viewBox={`0 0 ${width_pixels} ${height_pixels}`}
              className="absolute inset-0 w-full h-full pointer-events-auto"
            >
              <SvgOverlayElements
                detections={activeDetections}
                maskOpacity={maskOpacity}
                showBoxes={showBoxes}
                showLabels={showLabels}
                getColor={getColor}
                onHoverDetection={(det, pos) => {
                  setHoveredDetection(det);
                  setTooltipPos(pos);
                }}
                onLeave={() => {
                  setHoveredDetection(null);
                  setTooltipPos(null);
                }}
              />
            </svg>
          </div>
        )}

        {/* Interactive Defect Tooltip */}
        {hoveredDetection && tooltipPos && (
          <div
            className="absolute z-30 pointer-events-none p-3 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl text-xs backdrop-blur-md max-w-xs transition-all duration-150 font-sans"
            style={{
              left: `${Math.min(tooltipPos.x + 15, (containerRef.current?.clientWidth || 300) - 250)}px`,
              top: `${Math.max(10, tooltipPos.y - 70)}px`,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-800">
              <span className="font-bold text-white uppercase font-mono tracking-wider">
                {hoveredDetection.class_name.replace(/_/g, ' ')}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase font-bold ${
                  hoveredDetection.relative_severity === 'severe'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {hoveredDetection.relative_severity || 'moderate'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[11px] text-slate-300 mb-2">
              <div>
                <span className="text-slate-500">Confidence: </span>
                <strong className="text-sandstone-300">
                  {(hoveredDetection.confidence * 100).toFixed(1)}%
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Components: </span>
                <strong className="text-white">{hoveredDetection.component_count}</strong>
              </div>
              <div>
                <span className="text-slate-500">Pixel Area: </span>
                <strong className="text-white">
                  {hoveredDetection.pixel_area.toLocaleString()} px²
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Coverage: </span>
                <strong className="text-white">
                  {(hoveredDetection.coverage_ratio * 100).toFixed(2)}%
                </strong>
              </div>
            </div>

            {hoveredDetection.total_length_pixels && (
              <div className="text-[10px] font-mono text-sandstone-400 bg-sandstone-950/60 p-1.5 rounded border border-sandstone-900 mb-1.5">
                Centerline Length: {hoveredDetection.total_length_pixels} px
              </div>
            )}

            <div className="text-[9.5px] font-sans text-amber-300/90 pt-1 border-t border-slate-800/80">
              ⚠️ <strong>Distinction:</strong> Confidence reflects statistical perception certainty; severity reflects physical degradation.
            </div>
          </div>
        )}
      </div>

      {/* Canvas Status Footer */}
      <div className="px-5 py-2.5 bg-heritage-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span>Raster: {width_pixels} × {height_pixels} px</span>
          <span>•</span>
          <span>Visible: {activeDetections.length} of {detections.length} detections</span>
        </div>
        <div className="text-sandstone-400">
          Non-Destructive Optical Inspection
        </div>
      </div>
    </div>
  );
};

interface SvgOverlayElementsProps {
  detections: DetectionItem[];
  maskOpacity: number;
  showBoxes: boolean;
  showLabels: boolean;
  getColor: (className: string) => { stroke: string; fill: string; text: string };
  onHoverDetection: (det: DetectionItem, pos: { x: number; y: number }) => void;
  onLeave: () => void;
}

const SvgOverlayElements: React.FC<SvgOverlayElementsProps> = ({
  detections,
  maskOpacity,
  showBoxes,
  showLabels,
  getColor,
  onHoverDetection,
  onLeave,
}) => {
  return (
    <g>
      {detections.map((det, idx) => {
        const [xMin, yMin, xMax, yMax] = det.bounding_box;
        const width = xMax - xMin;
        const height = yMax - yMin;
        const theme = getColor(det.class_name);

        return (
          <g
            key={idx}
            className="cursor-pointer transition-opacity"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onHoverDetection(det, { x: rect.left, y: rect.top });
            }}
            onMouseLeave={onLeave}
          >
            {/* Defect Contour Mask Simulation */}
            <rect
              x={xMin}
              y={yMin}
              width={width}
              height={height}
              fill={theme.fill}
              fillOpacity={maskOpacity}
              stroke={theme.stroke}
              strokeWidth={showBoxes ? 3 : 1}
              strokeDasharray={det.class_name === 'crack' ? '6,3' : undefined}
              rx={6}
            />

            {/* Skeletonized Line Indicator for Cracks */}
            {det.class_name === 'crack' && (
              <path
                d={`M ${xMin + 10} ${yMin + 20} Q ${xMin + width / 2} ${yMin + height / 2 + 15} ${xMax - 15} ${yMax - 25}`}
                stroke="#fff"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* Bounding Box Label Tag */}
            {showLabels && (
              <g transform={`translate(${xMin}, ${Math.max(25, yMin - 10)})`}>
                <rect
                  x={0}
                  y={-22}
                  width={Math.max(120, det.class_name.length * 9 + 40)}
                  height={22}
                  fill="#0c1527"
                  fillOpacity={0.95}
                  stroke={theme.stroke}
                  strokeWidth={1.5}
                  rx={4}
                />
                <text
                  x={6}
                  y={-7}
                  fill={theme.text}
                  fontSize={12}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {det.class_name.replace(/_/g, ' ').toUpperCase()} {(det.confidence * 100).toFixed(0)}%
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
