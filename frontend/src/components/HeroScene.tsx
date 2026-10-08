import React from 'react';
import { AppRoute } from '../types';

export interface HeroSceneProps {
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onRouteChange,
  onLoadDemoFixture,
}) => {
  return (
    <section className="relative w-full bg-[#04121E] border-b border-white/10 overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28">
      {/* Background Architectural & Hydrodynamic Contour Linework */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* Topographic water flow contours */}
          <path
            d="M-100 240C200 180 400 320 720 280C1040 240 1200 160 1540 220"
            stroke="#2498D5"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M-100 320C180 260 440 400 760 360C1080 320 1260 260 1540 300"
            stroke="#2498D5"
            strokeWidth="0.8"
          />
          <path
            d="M-100 400C220 340 480 480 800 440C1120 400 1300 360 1540 380"
            stroke="#0A6FB7"
            strokeWidth="0.6"
          />

          {/* Subterranean Stepwell Masonry Linework */}
          <g opacity="0.4" stroke="#8FD5F2" strokeWidth="0.8">
            <path d="M960 480H1080V440H1160V400H1240V360H1320V320H1440" />
            <path d="M1000 520H1100V480H1180V440H1260V400H1340V360H1440" />
            <path d="M1040 560H1120V520H1200V480H1280V440H1360V400H1440" />
          </g>
        </svg>
      </div>

      {/* Main Editorial Hero Composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left 65%: Editorial Title & Technical Mission */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 py-1 px-2.5 bg-[#081E31] border border-white/10 text-[11px] font-mono text-[#7E98A8] uppercase tracking-widest rounded-xs">
              <span className="w-1.5 h-1.5 bg-[#2498D5]" />
              <span>JalDrishti • Sovereign Water Heritage System</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F7F9] font-sans leading-[1.12]">
              India’s traditional water systems,{' '}
              <span className="font-editorial italic font-normal text-[#8FD5F2] block sm:inline">
                understood through digital engineering.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#94A7B5] max-w-2xl font-sans leading-relaxed font-normal">
              JalDrishti is a sovereign decision-support platform uniting non-invasive computer vision, Indian Knowledge Systems (IKS), and deterministic conservation physics to document, assess, and revive historic subterranean water architecture.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onRouteChange('/upload')}
                className="h-10 px-6 bg-[#2498D5] hover:bg-[#0A6FB7] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-[#2498D5] transition-colors"
              >
                BEGIN A SURVEY
              </button>
              <button
                onClick={onLoadDemoFixture}
                className="h-10 px-6 bg-[#081E31] hover:bg-[#0C2B45] text-[#F4F7F9] text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-white/15 transition-colors"
              >
                LOAD REFERENCE (AGRASEN KI BAOLI)
              </button>
            </div>
          </div>

          {/* Right 35%: Architectural Telemetry & Principles Card */}
          <div className="lg:col-span-4 bg-[#081E31] border border-white/10 rounded-xs p-6 space-y-5 font-mono text-xs">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between text-[#7E98A8]">
              <span className="uppercase tracking-wider font-semibold text-[10px]">SYSTEM TELEMETRY</span>
              <span className="text-[#3E8F6B]">OPERATIONAL</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-[#7E98A8] uppercase mb-0.5">TARGET TYPOLOGIES</div>
                <div className="text-white font-sans text-xs">Baoli • Kund • Vav • Bawari • Traditional Tank</div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-[#7E98A8] uppercase mb-0.5">PERCEPTION METHOD</div>
                <div className="text-white font-sans text-xs">Orthogonal photogrammetry • Non-invasive image-space defect segmentation</div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-[#7E98A8] uppercase mb-0.5">ENGINEERING BASIS</div>
                <div className="text-white font-sans text-xs">Deterministic rules • Zero-hallucination metric calculations</div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-[#7E98A8] uppercase mb-0.5">MATERIAL DOCTRINE</div>
                <div className="text-[#C9902E] font-sans text-xs">Breathable lime-surkhi pozzolanic mortars • Strict prohibition of OPC cement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
