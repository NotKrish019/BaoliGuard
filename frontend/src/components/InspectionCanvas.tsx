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
  const [splitPos, setSplitPos] = useState<number>(50);
  const [hoveredDetection, setHoveredDetection] = useState<DetectionItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { width_pixels, height_pixels } = imageDimensions;
  const activeDetections = detections.filter((d) => visibleClasses.has(d.class_name));

  const getColor = (className: string) => {
    switch (className) {
      case 'crack':
        return { stroke: '#E06C68', fill: 'rgba(224, 108, 104, 0.4)', text: '#FAD2D0' };
      case 'vegetation_root_intrusion':
        return { stroke: '#3E8F6B', fill: 'rgba(62, 143, 107, 0.4)', text: '#A8E5C8' };
      case 'spalling':
        return { stroke: '#C9902E', fill: 'rgba(201, 144, 46, 0.4)', text: '#FDE4B0' };
      case 'efflorescence':
        return { stroke: '#2498D5', fill: 'rgba(36, 152, 213, 0.4)', text: '#8FD5F2' };
      default:
        return { stroke: '#8F72A8', fill: 'rgba(143, 114, 168, 0.4)', text: '#D8CEE3' };
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
    <div className={`bg-[#081E31] border border-white/10 rounded-xs overflow-hidden ${className}`}>
      {/* Top Inspection Control Bar: Restrained Instrument Bar */}
      <div className="h-10 px-3.5 bg-[#051624] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Mode Selector */}
        <div className="flex items-center space-x-1">
          {[
            { id: 'overlay', label: 'OVERLAY' },
            { id: 'side_by_side', label: 'SPLIT-VIEW' },
            { id: 'split_slider', label: 'WIPE-SLIDER' },
            { id: 'mask_only', label: 'MASKS-ONLY' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as InspectionViewMode)}
              className={`h-7 px-2.5 text-[11px] font-semibold tracking-wider uppercase transition-colors rounded-xs border ${
                viewMode === mode.id
                  ? 'bg-[#2498D5] text-white border-[#2498D5]'
                  : 'bg-[#081E31] text-[#7E98A8] border-white/10 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Technical Visibility Controls */}
        <div className="flex items-center space-x-4 text-[11px] text-[#7E98A8]">
          <div className="flex items-center space-x-2">
            <span>OPACITY</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={maskOpacity}
              onChange={(e) => setMaskOpacity(parseFloat(e.target.value))}
              className="w-16 accent-[#2498D5] cursor-pointer h-1 bg-[#04121E] rounded-none"
            />
            <span className="w-7 text-right text-white font-semibold">
              {(maskOpacity * 100).toFixed(0)}%
            </span>
          </div>

          <label className="flex items-center space-x-1.5 cursor-pointer text-[#7E98A8] hover:text-white select-none">
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={(e) => setShowBoxes(e.target.checked)}
              className="rounded-none border-white/20 bg-[#04121E] text-[#2498D5]"
            />
            <span>BOUNDS</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer text-[#7E98A8] hover:text-white select-none">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded-none border-white/20 bg-[#04121E] text-[#2498D5]"
            />
            <span>LABELS</span>
          </label>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-[#030D16] select-none overflow-hidden"
      >
        {/* Render Mode: SIDE BY SIDE */}
        {viewMode === 'side_by_side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 p-px">
            {/* Left: Original Survey Image */}
            <div className="relative bg-[#030D16] p-2">
              <div className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#04121E]/90 border border-white/15 text-[10px] font-mono text-[#7E98A8]">
                RAW PHOTOGRAMMETRY
              </div>
              <img
                src={imageSrc}
                alt="Raw Survey"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right: Computer Vision Overlay */}
            <div className="relative bg-[#030D16] p-2">
              <div className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#04121E]/90 border border-[#2498D5]/30 text-[10px] font-mono text-[#2498D5]">
                CV ANNOTATIONS ({activeDetections.length})
              </div>
              <div className="relative w-full aspect-[16/10]">
                <img
                  src={imageSrc}
                  alt="Backdrop"
                  className="w-full h-full object-contain opacity-40"
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
          <div className="relative w-full aspect-[16/10] cursor-ew-resize">
            {/* Background Layer: Overlay */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={imageSrc}
                alt="Survey with Defects"
                className="w-full h-full object-contain opacity-50"
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
              className="absolute inset-y-0 left-0 overflow-hidden border-r border-[#2498D5]"
              style={{ width: `${splitPos}%` }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
                <img
                  src={imageSrc}
                  alt="Original Surface"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#04121E]/90 border border-white/15 text-[10px] font-mono text-[#7E98A8]">
                  BASE BASELINE
                </div>
              </div>
            </div>

            {/* Split Handle Divider: Technical Thin Cursor */}
            <div
              className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="w-5 h-5 -ml-2.5 bg-[#2498D5] text-[#04121E] flex items-center justify-center font-mono font-bold text-[10px] shadow-sm">
                |
              </div>
            </div>
          </div>
        )}

        {/* Render Mode: OVERLAY or MASK ONLY */}
        {(viewMode === 'overlay' || viewMode === 'mask_only') && (
          <div className="relative w-full aspect-[16/10] flex items-center justify-center">
            {viewMode === 'overlay' ? (
              <img
                src={imageSrc}
                alt="Heritage Survey Inspection"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-[#030D16]" />
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
            className="absolute z-30 pointer-events-none p-3 bg-[#081E31] border border-white/20 text-xs shadow-panel max-w-xs font-mono"
            style={{
              left: `${Math.min(tooltipPos.x + 10, (containerRef.current?.clientWidth || 300) - 240)}px`,
              top: `${Math.max(10, tooltipPos.y - 65)}px`,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/10">
              <span className="font-semibold text-white uppercase">
                {hoveredDetection.class_name.replace(/_/g, ' ')}
              </span>
              <span className="text-[10px] text-[#2498D5] font-bold uppercase">
                {hoveredDetection.relative_severity || 'MODERATE'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#7E98A8]">
              <div>
                <span>CONFIDENCE: </span>
                <strong className="text-white">
                  {(hoveredDetection.confidence * 100).toFixed(1)}%
                </strong>
              </div>
              <div>
                <span>AREA: </span>
                <strong className="text-white">
                  {hoveredDetection.pixel_area.toLocaleString()} px²
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Status Footer: Technical Telemetry */}
      <div className="h-8 px-3.5 bg-[#051624] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#7E98A8]">
        <div className="flex items-center space-x-3">
          <span>FRAME: {width_pixels} × {height_pixels} PX</span>
          <span>•</span>
          <span>ACTIVE FEATURES: {activeDetections.length} OF {detections.length}</span>
        </div>
        <div className="text-[#2498D5]">
          OPTICAL PERCEPTION MODE
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
            className="cursor-pointer"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onHoverDetection(det, { x: rect.left, y: rect.top });
            }}
            onMouseLeave={onLeave}
          >
            {/* Defect Contour Mask */}
            <rect
              x={xMin}
              y={yMin}
              width={width}
              height={height}
              fill={theme.fill}
              fillOpacity={maskOpacity}
              stroke={theme.stroke}
              strokeWidth={showBoxes ? 2 : 1}
              strokeDasharray={det.class_name === 'crack' ? '4,2' : undefined}
            />

            {/* Skeletonized Line Indicator for Cracks */}
            {det.class_name === 'crack' && (
              <path
                d={`M ${xMin + 5} ${yMin + 15} Q ${xMin + width / 2} ${yMin + height / 2 + 10} ${xMax - 10} ${yMax - 20}`}
                stroke="#F4F7F9"
                strokeWidth={2}
                fill="none"
              />
            )}

            {/* Restrained On-Image Defect Label */}
            {showLabels && (
              <g transform={`translate(${xMin}, ${Math.max(18, yMin - 4)})`}>
                <rect
                  x={0}
                  y={-14}
                  width={Math.max(90, det.class_name.length * 7 + 36)}
                  height={15}
                  fill="#04121E"
                  stroke={theme.stroke}
                  strokeWidth={1}
                />
                <text
                  x={4}
                  y={-3}
                  fill={theme.text}
                  fontSize={9.5}
                  fontFamily="IBM Plex Mono, monospace"
                  fontWeight="600"
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
