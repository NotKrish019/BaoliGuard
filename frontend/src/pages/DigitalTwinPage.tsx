import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { AppRoute } from '../types';

export interface DigitalTwinPageProps {
  onRouteChange: (route: AppRoute) => void;
}

type SpatialTool = 'SELECT' | 'INSPECT' | 'DEFECTS' | 'BEFORE' | 'AFTER';

interface DefectHotspot {
  id: string;
  x: number; // percentage
  y: number;
  type: 'informational' | 'warning' | 'critical';
  label: string;
  defectClass: string;
  depth: string;
  description: string;
}

export const DigitalTwinPage: React.FC<DigitalTwinPageProps> = ({ onRouteChange }) => {
  const [activeTool, setActiveTool] = useState<SpatialTool>('INSPECT');
  const [activeHotspot, setActiveHotspot] = useState<DefectHotspot | null>(null);
  const [waterLevelTier, setWaterLevelTier] = useState<number>(3); // 1 to 5
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  const hotspots: DefectHotspot[] = [
    {
      id: 'hs-1',
      x: 38,
      y: 54,
      type: 'critical',
      label: 'Radial Joint Fracture',
      defectClass: 'Structural Crack (Shear)',
      depth: '-14.2m Subterranean',
      description: 'Active 4.2mm fracture along lower retaining terrace. High moisture ingress during monsoon surge.',
    },
    {
      id: 'hs-2',
      x: 64,
      y: 38,
      type: 'warning',
      label: 'Ficus Root Penetration',
      defectClass: 'Vegetation Intrusion',
      depth: '-8.5m Intermediate Arcade',
      description: 'Ficus religiosa root network displacing unmortared ashlar stone blocks in east wall gallery.',
    },
    {
      id: 'hs-3',
      x: 52,
      y: 72,
      type: 'informational',
      label: 'Aquifer Ingress Silt Bed',
      defectClass: 'Silt Accumulation',
      depth: '-21.0m Deep Basin',
      description: '1.4m settled fine clay layer preventing direct bilateral groundwater percolation.',
    },
  ];

  return (
    <PageContainer
      title="Spatial Digital Twin & Hydrological Geometry"
      subtitle="Georeferenced 3D subterranean structural model with interactive damage telemetry."
      badge={
        <StatusBadge
          label="Spatial Model Active"
          variant="jal"
          size="md"
        />
      }
      actions={
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRouteChange('/analysis')}
            className="h-8 px-4 text-xs font-semibold text-[#8CD8F5] bg-[#083358] hover:bg-[#0C3D66] rounded-sm border border-[#28A9E0]/30 transition-colors"
          >
            ← Photographic Diagnostics
          </button>
          <button
            onClick={() => onRouteChange('/report')}
            className="h-8 px-4 text-xs font-semibold text-white bg-[#087CC1] hover:bg-[#28A9E0] rounded-sm border border-[#28A9E0]/40 transition-colors shadow-sm"
          >
            Conservation Dossier →
          </button>
        </div>
      }
    >
      <div className="space-y-6 font-sans">
        {/* Workspace Toolbar: SELECT, INSPECT, DEFECTS, BEFORE, AFTER */}
        <div className="bg-[#083358]/90 border border-[#28A9E0]/25 rounded-sm p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8CD8F5] uppercase tracking-wide mr-1">
              Spatial Tools:
            </span>
            {(['SELECT', 'INSPECT', 'DEFECTS', 'BEFORE', 'AFTER'] as SpatialTool[]).map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveTool(tool)}
                className={`h-7 px-3 text-xs font-semibold rounded-sm transition-all border ${
                  activeTool === tool
                    ? 'bg-[#087CC1] text-white border-[#28A9E0] shadow-sm'
                    : 'bg-[#062B49] text-[#8CD8F5]/80 border-[#28A9E0]/20 hover:text-white'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#8CD8F5]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wireframeMode}
                onChange={(e) => setWireframeMode(e.target.checked)}
                className="rounded-xs text-[#087CC1] focus:ring-0 bg-[#062B49] border-[#28A9E0]/30"
              />
              <span>Structural Wireframe</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[#8CD8F5]/70">Simulated Aquifer Level:</span>
              <input
                type="range"
                min="1"
                max="5"
                value={waterLevelTier}
                onChange={(e) => setWaterLevelTier(Number(e.target.value))}
                className="w-24 accent-[#28A9E0] cursor-pointer"
              />
              <span className="font-semibold text-white">Tier -{waterLevelTier * 4}m</span>
            </div>
          </div>
        </div>

        {/* 3D Spatial Canvas Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main 3D Viewport (Left 70%) */}
          <div className="lg:col-span-8 bg-[#041B2E] border border-[#28A9E0]/25 rounded-sm overflow-hidden relative aspect-[16/10] sm:aspect-[16/9] shadow-panel">
            {/* Topographic water grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="twin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#28A9E0" strokeWidth="0.7" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#twin-grid)" />
              </svg>
            </div>

            {/* Simulated 3D Architectural Isometric Stepwell Model */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ground level reference */}
              <line x1="60" y1="120" x2="740" y2="120" stroke="#8CD8F5" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <text x="70" y="112" fill="#8CD8F5" fontSize="10" opacity="0.7">Ground Surface (+0.0m datum)</text>

              {/* Stepwell Stepped Basin Geometry (Cross Sectional Perspective) */}
              <g fill={wireframeMode ? 'none' : 'rgba(8, 51, 88, 0.7)'} stroke="#28A9E0" strokeWidth={wireframeMode ? '1' : '1.5'}>
                {/* Upper Tier 1 */}
                <polygon points="120,120 680,120 640,180 160,180" />
                {/* Tier 2 */}
                <polygon points="160,180 640,180 600,240 200,240" fill={wireframeMode ? 'none' : 'rgba(8, 51, 88, 0.8)'} />
                {/* Tier 3 Arcade */}
                <polygon points="200,240 600,240 560,300 240,300" fill={wireframeMode ? 'none' : 'rgba(8, 51, 88, 0.85)'} />
                {/* Tier 4 */}
                <polygon points="240,300 560,300 520,360 280,360" fill={wireframeMode ? 'none' : 'rgba(8, 51, 88, 0.9)'} />
                {/* Lower Basin Tier 5 */}
                <polygon points="280,360 520,360 480,430 320,430" fill={wireframeMode ? 'none' : 'rgba(6, 43, 73, 0.95)'} />
              </g>

              {/* Central Steps Linework */}
              <g stroke="#8CD8F5" strokeWidth="0.8" opacity="0.6">
                {[140, 160, 200, 220, 260, 280, 320, 340].map((y, i) => (
                  <line key={i} x1={200 + i * 15} y1={y} x2={600 - i * 15} y2={y} />
                ))}
              </g>

              {/* Dynamic Water Volume Level based on slider */}
              <polygon
                points={`
                  ${240 + (5 - waterLevelTier) * 15},${300 + (5 - waterLevelTier) * 26}
                  ${560 - (5 - waterLevelTier) * 15},${300 + (5 - waterLevelTier) * 26}
                  480,430
                  320,430
                `}
                fill="rgba(40, 169, 224, 0.28)"
                stroke="#28A9E0"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y={300 + (5 - waterLevelTier) * 26 - 8}
                textAnchor="middle"
                fill="#8CD8F5"
                fontSize="11"
                fontWeight="600"
              >
                Hydraulic Pool (-{waterLevelTier * 4}m)
              </text>

              {/* Defect Hotspots (Visible in INSPECT or DEFECTS mode) */}
              {(activeTool === 'INSPECT' || activeTool === 'DEFECTS') && (
                <g>
                  {hotspots.map((hs) => {
                    const isSelected = activeHotspot?.id === hs.id;
                    const fillColor =
                      hs.type === 'critical' ? '#D3455B' : hs.type === 'warning' ? '#E08A1E' : '#28A9E0';

                    return (
                      <g
                        key={hs.id}
                        className="cursor-pointer transition-transform hover:scale-110"
                        onClick={() => setActiveHotspot(hs)}
                      >
                        <circle
                          cx={(hs.x / 100) * 800}
                          cy={(hs.y / 100) * 500}
                          r={isSelected ? 10 : 7}
                          fill={fillColor}
                          opacity="0.9"
                        />
                        <circle
                          cx={(hs.x / 100) * 800}
                          cy={(hs.y / 100) * 500}
                          r={isSelected ? 16 : 12}
                          fill="none"
                          stroke={fillColor}
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                        <text
                          x={(hs.x / 100) * 800 + 12}
                          y={(hs.y / 100) * 500 + 4}
                          fill="white"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {hs.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Compass & Scale Indicator HUD */}
            <div className="absolute bottom-4 left-4 p-2 bg-[#062B49]/90 border border-[#28A9E0]/20 rounded-sm text-[11px] text-[#8CD8F5] space-y-1">
              <div>Scale: 1:200 Isometric</div>
              <div>Datum: 234.8m MSL</div>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#083358] border border-[#28A9E0]/30 text-[#8CD8F5]">
                Mode: {activeTool}
              </span>
            </div>
          </div>

          {/* Spatial Inspection Rail (Right 30%) */}
          <div className="lg:col-span-4 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-5 text-xs space-y-5 shadow-panel">
            <div className="pb-3 border-b border-[#28A9E0]/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8CD8F5] uppercase tracking-wide">
                Spatial Telemetry
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">3D Aligned</span>
            </div>

            {activeHotspot ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeHotspot.type === 'critical'
                        ? 'bg-[#D3455B]'
                        : activeHotspot.type === 'warning'
                        ? 'bg-[#E08A1E]'
                        : 'bg-[#28A9E0]'
                    }`}
                  />
                  <h4 className="text-sm font-bold text-white">{activeHotspot.label}</h4>
                </div>

                <div className="p-3 bg-[#062B49] border border-[#28A9E0]/20 rounded-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#8CD8F5]/70">Defect Class:</span>
                    <strong className="text-white">{activeHotspot.defectClass}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8CD8F5]/70">Subterranean Depth:</span>
                    <strong className="text-[#8CD8F5]">{activeHotspot.depth}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8CD8F5]/70">Severity Rating:</span>
                    <span
                      className={`font-semibold uppercase text-[10px] px-1.5 py-0.2 rounded-xs ${
                        activeHotspot.type === 'critical'
                          ? 'bg-[#D3455B]/20 text-[#D3455B]'
                          : activeHotspot.type === 'warning'
                          ? 'bg-[#E08A1E]/20 text-[#E08A1E]'
                          : 'bg-[#28A9E0]/20 text-[#28A9E0]'
                      }`}
                    >
                      {activeHotspot.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#8CD8F5]/85 leading-relaxed">
                  {activeHotspot.description}
                </p>

                <button
                  onClick={() => onRouteChange('/report')}
                  className="w-full h-8 text-xs font-semibold text-white bg-[#087CC1] hover:bg-[#28A9E0] rounded-sm border border-[#28A9E0]/30 transition-colors shadow-xs"
                >
                  View Conservation Action →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-white">
                  Stepwell Volumetric Envelope
                </div>
                <div className="space-y-2 text-xs text-[#8CD8F5]/80">
                  <div className="flex justify-between py-1 border-b border-[#28A9E0]/10">
                    <span>Total Subterranean Depth:</span>
                    <strong className="text-white">28.4 meters</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#28A9E0]/10">
                    <span>Number of Stepped Tiers:</span>
                    <strong className="text-white">5 Levels</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#28A9E0]/10">
                    <span>Est. Water Holding Capacity:</span>
                    <strong className="text-white">1,850,000 Liters</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#28A9E0]/10">
                    <span>Primary Ashlar Fabric:</span>
                    <strong className="text-white">Dholpur Sandstone</strong>
                  </div>
                </div>

                <div className="p-3 bg-[#062B49] rounded-sm border border-[#28A9E0]/20 text-xs text-[#8CD8F5]/80 leading-relaxed">
                  Click on any defect marker on the model to view depth coordinate and structural displacement details.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
