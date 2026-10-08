import React from 'react';
import { AppRoute } from '../types';
import { WaterDivider } from './WaterDivider';

export interface HeroSceneProps {
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onRouteChange,
  onLoadDemoFixture,
}) => {
  return (
    <section className="relative w-full bg-[#062B49] overflow-hidden pt-24 sm:pt-32 pb-0 font-sans">
      {/* Background aquatic ambient layers & gentle water motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft water caustic glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-[#28A9E0]/15 via-[#087CC1]/08 to-transparent rounded-full blur-3xl animate-water-current" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[500px] bg-gradient-to-l from-[#087CC1]/12 via-[#8CD8F5]/05 to-transparent rounded-full blur-3xl animate-water-drift" />

        {/* Organic flowing water lines */}
        <svg
          viewBox="0 0 1440 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-20"
        >
          <path
            d="M-80 180C240 120 480 260 800 210C1120 160 1280 90 1520 150"
            stroke="#28A9E0"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M-80 280C220 220 520 360 840 310C1160 260 1340 190 1520 240"
            stroke="#8CD8F5"
            strokeWidth="1.2"
          />
          <path
            d="M-80 390C280 320 580 470 900 420C1220 370 1380 320 1520 350"
            stroke="#087CC1"
            strokeWidth="1"
          />
          {/* Subterranean stepwell geometry */}
          <g stroke="#8CD8F5" strokeWidth="0.8" opacity="0.35">
            <path d="M1020 460H1120V420H1200V380H1280V340H1360V300H1440" />
            <path d="M1060 500H1140V460H1220V420H1300V380H1380V340H1440" />
            <path d="M1100 540H1160V500H1240V460H1320V420H1400V380H1440" />
          </g>
        </svg>
      </div>

      {/* Main Editorial Hero Composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline & Mission */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 py-1 px-3 bg-[#083358] border border-[#28A9E0]/30 text-xs text-[#8CD8F5] rounded-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28A9E0] animate-pulse" />
              <span>JalDrishti • Digital Water Heritage Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.12]">
              India’s water wisdom,{' '}
              <span className="text-[#8CD8F5] block font-light">
                seen differently.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#DDF6FC]/85 max-w-2xl leading-relaxed font-normal">
              A digital engineering and AI-assisted system for documenting, understanding, assessing, and reviving India's subterranean hydraulic architecture through non-invasive computer vision and traditional Indian Knowledge Systems (IKS).
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onRouteChange('/upload')}
                className="h-10 px-6 bg-[#087CC1] hover:bg-[#28A9E0] text-white text-xs sm:text-sm font-semibold rounded-sm border border-[#28A9E0]/40 transition-all duration-150 shadow-water active:scale-95"
              >
                SCAN A DHAROHAR
              </button>
              <button
                onClick={onLoadDemoFixture}
                className="h-10 px-5 bg-[#083358] hover:bg-[#0C3D66] text-[#DDF6FC] text-xs sm:text-sm font-medium rounded-sm border border-[#28A9E0]/30 transition-all duration-150 active:scale-95"
              >
                Load Reference (Agrasen Ki Baoli)
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry & Water Knowledge */}
          <div className="lg:col-span-4 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-6 space-y-4 shadow-panel backdrop-blur-sm">
            <div className="pb-3 border-b border-[#28A9E0]/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8CD8F5] uppercase tracking-wide">
                System Telemetry
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Operational
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase font-medium mb-0.5">
                  Target Typologies
                </div>
                <div className="text-white font-medium">
                  Baoli • Kund • Vav • Bawari • Jhalra • Tank
                </div>
              </div>

              <div className="pt-2 border-t border-[#28A9E0]/15">
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase font-medium mb-0.5">
                  Perception Method
                </div>
                <div className="text-white">
                  Orthogonal photogrammetry &amp; non-invasive defect segmentation
                </div>
              </div>

              <div className="pt-2 border-t border-[#28A9E0]/15">
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase font-medium mb-0.5">
                  Engineering Basis
                </div>
                <div className="text-white">
                  Deterministic rules • Zero-hallucination metric calculations
                </div>
              </div>

              <div className="pt-2 border-t border-[#28A9E0]/15">
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase font-medium mb-0.5">
                  Material Doctrine
                </div>
                <div className="text-[#E08A1E] font-medium">
                  Breathable lime-surkhi pozzolanic mortars (OPC strictly prohibited)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organic White Curved Lower Transition */}
      <WaterDivider variant="curve-white" height={52} />
    </section>
  );
};
