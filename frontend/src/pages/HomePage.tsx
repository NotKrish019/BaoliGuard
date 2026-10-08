import React from 'react';
import { HeroScene } from '../components/HeroScene';
import { AppRoute } from '../types';

export interface HomePageProps {
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onRouteChange,
  onLoadDemoFixture,
}) => {
  return (
    <div className="w-full bg-[#04121E] text-[#F4F7F9] selection:bg-[#2498D5] selection:text-white">
      {/* 1. EDITORIAL HERO SCENE */}
      <HeroScene
        onRouteChange={onRouteChange}
        onLoadDemoFixture={onLoadDemoFixture}
      />

      {/* 2. SECTION A — THE PROBLEM: WHAT WE INHERITED IS MORE THAN STONE */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#2498D5] block">
                THE LIVING WATER DHAROHAR
              </span>

              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#F4F7F9] font-sans leading-tight">
                What we inherited is{' '}
                <span className="font-editorial italic font-normal text-[#8FD5F2]">
                  more than stone.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#94A7B5] leading-relaxed font-sans">
                India’s stepwells, kunds, bawaris, and jhalras are not merely ornamental monuments. They are sophisticated, zero-energy hydrological machines engineered over millennia to capture monsoon downpours, naturally purify sediment through ashlar masonry, and recharge deep subterranean aquifers.
              </p>

              <p className="text-xs sm:text-sm text-[#7E98A8] leading-relaxed font-sans">
                When neglected, blocked silt mounds, intrusive peepal roots, and incompatible modern cement plasters break this ancient equilibrium. Restoring them requires reading both the masonry and the hydraulic intelligence locked within the stone.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-6 border-t border-white/10 text-xs font-mono">
                <div>
                  <div className="text-2xl font-semibold text-white font-sans">3,000+</div>
                  <div className="text-[#7E98A8] uppercase tracking-wider text-[10px] mt-0.5">TRADITIONAL STEPWELLS</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#2498D5] font-sans">0 kWh</div>
                  <div className="text-[#7E98A8] uppercase tracking-wider text-[10px] mt-0.5">AQUIFER RECHARGE ENERGY</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#3E8F6B] font-sans">100%</div>
                  <div className="text-[#7E98A8] uppercase tracking-wider text-[10px] mt-0.5">BREATHABLE LIME FABRIC</div>
                </div>
              </div>
            </div>

            {/* Right Architectural Diagram Panel */}
            <div className="lg:col-span-5 bg-[#081E31] border border-white/10 rounded-xs p-6 font-mono text-xs space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between text-[#7E98A8]">
                <span className="uppercase tracking-wider font-semibold text-[10px]">
                  HYDROLOGICAL ARCHITECTURE
                </span>
                <span className="text-[#2498D5] text-[10px]">PASSIVE DESIGN</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#04121E] border border-white/10">
                  <div className="font-semibold text-white mb-0.5 font-sans">
                    Catchment &amp; Silt Baffles
                  </div>
                  <p className="text-[11px] text-[#7E98A8] font-sans leading-relaxed">
                    Surface runoff enters stepped settling channels, dropping suspended silt before clean water fills the primary basin.
                  </p>
                </div>

                <div className="p-3 bg-[#04121E] border border-white/10">
                  <div className="font-semibold text-white mb-0.5 font-sans">
                    Subterranean Aquifer Breathing
                  </div>
                  <p className="text-[11px] text-[#7E98A8] font-sans leading-relaxed">
                    Unmortared dry-stone joints at lower tiers allow bilateral groundwater exchange during monsoon inundation and dry drawdowns.
                  </p>
                </div>

                <div className="p-3 bg-[#04121E] border border-white/10">
                  <div className="font-semibold text-white mb-0.5 font-sans">
                    Lime-Surkhi Pozzolanic Matrix
                  </div>
                  <p className="text-[11px] text-[#7E98A8] font-sans leading-relaxed">
                    Flexible, self-healing hydraulic lime binder that dissolves and recrystallizes under recurrent water submersion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION B — THE 4-STAGE CONTINUUM: SEE → UNDERSTAND → ASSESS → REVIVE */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10 bg-[#061828]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#2498D5] block mb-1">
              CONTINUOUS INTELLIGENCE PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-sans">
              From visible defect to sustainable water revival
            </h2>
          </div>

          {/* Unified Process Continuum: Clean Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: SEE */}
            <div className="bg-[#081E31] border border-white/10 rounded-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#2498D5] font-semibold">01 / SEE</span>
                <span className="text-[10px] text-[#7E98A8]">VISION</span>
              </div>
              <h3 className="text-sm font-semibold text-white font-sans">
                Non-Invasive Vision
              </h3>
              <p className="text-xs text-[#7E98A8] font-sans leading-relaxed">
                Computer vision detects surface cracks, invasive vegetation roots, stone spalling, and moisture efflorescence directly from photographs.
              </p>
            </div>

            {/* Step 2: UNDERSTAND */}
            <div className="bg-[#081E31] border border-white/10 rounded-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#2498D5] font-semibold">02 / UNDERSTAND</span>
                <span className="text-[10px] text-[#7E98A8]">IKS CORPUS</span>
              </div>
              <h3 className="text-sm font-semibold text-white font-sans">
                IKS Knowledge Corpus
              </h3>
              <p className="text-xs text-[#7E98A8] font-sans leading-relaxed">
                Interprets symptoms through classical treatises and vernacular engineering: regional stone geology, aquifer dynamics, and traditional lime formulations.
              </p>
            </div>

            {/* Step 3: ASSESS */}
            <div className="bg-[#081E31] border border-white/10 rounded-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#2498D5] font-semibold">03 / ASSESS</span>
                <span className="text-[10px] text-[#7E98A8]">ENGINEERING</span>
              </div>
              <h3 className="text-sm font-semibold text-white font-sans">
                Engineering Assessment
              </h3>
              <p className="text-xs text-[#7E98A8] font-sans leading-relaxed">
                Calculates transparent condition scores, crack burden indexes, and siltation obstruction ratios through explicit deterministic logic.
              </p>
            </div>

            {/* Step 4: REVIVE */}
            <div className="bg-[#081E31] border border-white/10 rounded-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#3E8F6B] font-semibold">04 / REVIVE</span>
                <span className="text-[10px] text-[#7E98A8]">ROADMAP</span>
              </div>
              <h3 className="text-sm font-semibold text-white font-sans">
                Conservation Roadmap
              </h3>
              <p className="text-xs text-[#7E98A8] font-sans leading-relaxed">
                Prescribes breathable lime-surkhi pointing, mechanical desilting, and root extraction while strictly barring harmful OPC cement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION C — SCAN A DHAROHAR CTA SECTION */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto bg-[#081E31] border border-white/10 rounded-xs p-8 sm:p-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#2498D5] uppercase font-semibold block">
              INGESTION PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-sans">
              Bring the Dharohar into view.
            </h2>
            <p className="text-xs sm:text-sm text-[#94A7B5] leading-relaxed font-sans">
              Upload field photographs of stone masonry, stepped corridors, or silted basins. Our pipeline performs non-invasive optical diagnostics and returns a comprehensive heritage dossier in seconds.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onRouteChange('/upload')}
                className="h-10 px-6 bg-[#2498D5] hover:bg-[#0A6FB7] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-[#2498D5] transition-colors"
              >
                START A NEW SCAN
              </button>
              <button
                onClick={onLoadDemoFixture}
                className="h-10 px-6 bg-[#04121E] hover:bg-[#061828] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-white/15 transition-colors"
              >
                LOAD REFERENCE DOSSIER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-12 px-4 sm:px-8 bg-[#04121E] text-xs font-mono text-[#516A7A]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div>
            <span className="text-white font-sans font-semibold">JalDrishti</span>
            <span className="mx-2">•</span>
            <span>Digital Intelligence for India's Traditional Water Heritage</span>
          </div>
          <div>
            SEE → UNDERSTAND → ASSESS → REVIVE
          </div>
        </div>
      </footer>
    </div>
  );
};
