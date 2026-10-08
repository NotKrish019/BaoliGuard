import React from 'react';
import { HeroScene } from '../components/HeroScene';
import { WaterDivider } from '../components/WaterDivider';
import { Footer } from '../components/Footer';
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
    <div className="w-full bg-[#062B49] text-white selection:bg-[#087CC1] selection:text-white font-sans">
      {/* 1. EDITORIAL HERO SCENE (Deep water blue with white curved transition) */}
      <HeroScene
        onRouteChange={onRouteChange}
        onLoadDemoFixture={onLoadDemoFixture}
      />

      {/* 2. SECTION A — THE LIVING WATER DHAROHAR (White / Light Content Section for high contrast & readability) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] text-[#09283C]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#087CC1] block">
                The Living Water Dharohar
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#09283C] leading-tight">
                What we inherited is{' '}
                <span className="text-[#087CC1]">
                  more than stone.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#587286] leading-relaxed font-normal">
                India’s stepwells, kunds, bawaris, and jhalras are not merely ornamental monuments. They are sophisticated, zero-energy hydrological machines engineered over millennia to capture monsoon downpours, naturally purify sediment through ashlar masonry, and recharge deep subterranean aquifers.
              </p>

              <p className="text-xs sm:text-sm text-[#587286] leading-relaxed">
                When neglected, blocked silt mounds, intrusive peepal roots, and incompatible modern cement plasters break this ancient equilibrium. Restoring them requires reading both the masonry and the hydraulic intelligence locked within the stone.
              </p>

              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#087CC1]/15 text-xs">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#09283C]">3,000+</div>
                  <div className="text-[#587286] font-medium text-[11px] uppercase tracking-wide mt-1">
                    Traditional Stepwells
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#087CC1]">0 kWh</div>
                  <div className="text-[#587286] font-medium text-[11px] uppercase tracking-wide mt-1">
                    Aquifer Recharge Energy
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#2E8B57]">100%</div>
                  <div className="text-[#587286] font-medium text-[11px] uppercase tracking-wide mt-1">
                    Breathable Lime Fabric
                  </div>
                </div>
              </div>
            </div>

            {/* Right Architectural Diagram Panel */}
            <div className="lg:col-span-5 bg-[#F3FAFD] border border-[#28A9E0]/30 rounded-sm p-6 space-y-4 shadow-sm">
              <div className="pb-3 border-b border-[#28A9E0]/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#09283C] uppercase tracking-wide">
                  Hydrological Architecture
                </span>
                <span className="text-[11px] font-semibold text-[#087CC1] px-2 py-0.5 rounded-sm bg-white border border-[#28A9E0]/20">
                  Passive Design
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-[#28A9E0]/15 rounded-sm">
                  <div className="text-xs font-semibold text-[#09283C] mb-1">
                    Catchment &amp; Silt Baffles
                  </div>
                  <p className="text-xs text-[#587286] leading-relaxed">
                    Surface runoff enters stepped settling channels, dropping suspended silt before clean water fills the primary basin.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#28A9E0]/15 rounded-sm">
                  <div className="text-xs font-semibold text-[#09283C] mb-1">
                    Subterranean Aquifer Breathing
                  </div>
                  <p className="text-xs text-[#587286] leading-relaxed">
                    Unmortared dry-stone joints at lower tiers allow bilateral groundwater exchange during monsoon inundation and dry drawdowns.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#28A9E0]/15 rounded-sm">
                  <div className="text-xs font-semibold text-[#09283C] mb-1">
                    Lime-Surkhi Pozzolanic Matrix
                  </div>
                  <p className="text-xs text-[#587286] leading-relaxed">
                    Flexible, self-healing hydraulic lime binder that dissolves and recrystallizes under recurrent water submersion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition to Deep Blue Section */}
      <WaterDivider variant="curve-dark" height={48} />

      {/* 3. SECTION B — THE 4-STAGE CONTINUUM: SEE → UNDERSTAND → ASSESS → REVIVE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#062B49] border-b border-[#28A9E0]/20">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#28A9E0] block mb-1">
              Continuous Intelligence Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              From visible defect to sustainable water revival
            </h2>
          </div>

          {/* Unified Process Continuum: Clean 4-Column Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: SEE */}
            <div className="bg-[#083358]/80 border border-[#28A9E0]/20 rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#28A9E0]">01 / PERCEPTION</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-sm bg-[#062B49] border border-[#28A9E0]/25">
                  SEE
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">
                Non-Invasive Vision Inspection
              </h3>
              <p className="text-xs text-[#8CD8F5]/80 leading-relaxed">
                Computer vision detects structural cracks, intrusive vegetation root networks, spalling masonry, and biological colonisation directly from photographic surveys.
              </p>
            </div>

            {/* Step 2: UNDERSTAND */}
            <div className="bg-[#083358]/80 border border-[#28A9E0]/20 rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#28A9E0]">02 / KNOWLEDGE</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-sm bg-[#062B49] border border-[#28A9E0]/25">
                  UNDERSTAND
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">
                Indian Knowledge Systems (IKS)
              </h3>
              <p className="text-xs text-[#8CD8F5]/80 leading-relaxed">
                Matches observed damage against historical hydrological canons (Vastu Vidya, Aparajitaprccha) and regional craft traditions across Rajasthan, Gujarat, and Delhi.
              </p>
            </div>

            {/* Step 3: ASSESS */}
            <div className="bg-[#083358]/80 border border-[#28A9E0]/20 rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#28A9E0]">03 / ENGINEERING</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-sm bg-[#062B49] border border-[#28A9E0]/25">
                  ASSESS
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">
                Deterministic Compatibility
              </h3>
              <p className="text-xs text-[#8CD8F5]/80 leading-relaxed">
                Calculates numerical compatibility scores for restoration mortars based on moisture permeability, thermal expansion, salt tolerance, and mechanical compliance.
              </p>
            </div>

            {/* Step 4: REVIVE */}
            <div className="bg-[#083358]/80 border border-[#28A9E0]/20 rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#28A9E0]">04 / RESTORATION</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-sm bg-[#062B49] border border-[#28A9E0]/25">
                  REVIVE
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">
                Conservation Roadmap
              </h3>
              <p className="text-xs text-[#8CD8F5]/80 leading-relaxed">
                Generates a prioritized conservation dossier adhering strictly to ASI preservation protocols and Venice Charter reversibility guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION C — CTA / SURVEY INVITATION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#041B2E]">
        <div className="w-full max-w-[1440px] mx-auto text-center space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Ready to inspect a historic water structure?
          </h2>
          <p className="text-xs sm:text-sm text-[#8CD8F5]/85 max-w-xl mx-auto leading-relaxed">
            Upload field survey photographs or load the benchmark Agrasen Ki Baoli reference dataset to view real-time defect segmentation and material compatibility analysis.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onRouteChange('/upload')}
              className="h-10 px-6 bg-[#087CC1] hover:bg-[#28A9E0] text-white text-xs sm:text-sm font-semibold rounded-sm border border-[#28A9E0]/40 transition-all duration-150 shadow-water active:scale-95"
            >
              START SURVEY
            </button>
            <button
              onClick={onLoadDemoFixture}
              className="h-10 px-5 bg-[#083358] hover:bg-[#0C3D66] text-[#DDF6FC] text-xs sm:text-sm font-medium rounded-sm border border-[#28A9E0]/30 transition-all duration-150 active:scale-95"
            >
              Load Demo Fixture
            </button>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer onRouteChange={onRouteChange} />
    </div>
  );
};
