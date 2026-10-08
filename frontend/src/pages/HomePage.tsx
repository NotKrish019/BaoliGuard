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
    <div className="w-full bg-[#063B63] text-white selection:bg-[#2498D5] selection:text-white font-sans">
      {/* 1. EDITORIAL HERO SCENE (Deep ocean blue with signature white organic transition) */}
      <HeroScene
        onRouteChange={onRouteChange}
        onLoadDemoFixture={onLoadDemoFixture}
      />

      {/* 2. SECTION A — THE PROBLEM: WHAT WE INHERITED IS MORE THAN STONE (White / Light content section) */}
      <section className="bg-white text-[#102433] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#0A6FB7] uppercase font-semibold block">
                The Living Water Heritage
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#102433] leading-tight">
                What we inherited is{' '}
                <span className="font-editorial italic font-normal text-[#0A6FB7]">
                  more than stone.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#5E7280] leading-relaxed font-light">
                India’s stepwells, kunds, bawaris, and jhalras are not merely ornamental monuments. They are sophisticated, zero-energy hydrological machines engineered over millennia to capture monsoon downpours, naturally purify sediment through ashlar masonry, and recharge deep subterranean aquifers.
              </p>

              <p className="text-sm sm:text-base text-[#5E7280] leading-relaxed">
                When neglected, blocked silt mounds, intrusive peepal roots, and incompatible modern cement plasters break this ancient equilibrium. Restoring them requires reading both the masonry and the hydraulic intelligence locked within the stone.
              </p>

              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-[#063B63]">3,000+</div>
                  <div className="text-[#5E7280] font-mono text-xs uppercase tracking-wider mt-1">
                    Traditional Stepwells
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0A6FB7]">0 kWh</div>
                  <div className="text-[#5E7280] font-mono text-xs uppercase tracking-wider mt-1">
                    Aquifer Recharge Energy
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3E8F6B]">100%</div>
                  <div className="text-[#5E7280] font-mono text-xs uppercase tracking-wider mt-1">
                    Breathable Lime Fabric
                  </div>
                </div>
              </div>
            </div>

            {/* Right Architectural Diagram Panel */}
            <div className="lg:col-span-5 bg-[#EAF7FB]/60 border border-[#8FD5F2]/50 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="pb-3 border-b border-[#2498D5]/20 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#063B63] font-bold">
                  Hydrological Mechanics
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-[#0A6FB7] border border-[#2498D5]/20">
                  Passive Design
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-[#8FD5F2]/40 shadow-xs">
                  <div className="text-sm font-bold text-[#063B63] mb-1">
                    Catchment &amp; Silt Baffles
                  </div>
                  <p className="text-xs text-[#5E7280] leading-relaxed">
                    Surface runoff enters stepped settling channels, dropping suspended silt before clean water fills the primary drawing basin.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#8FD5F2]/40 shadow-xs">
                  <div className="text-sm font-bold text-[#063B63] mb-1">
                    Subterranean Aquifer Breathing
                  </div>
                  <p className="text-xs text-[#5E7280] leading-relaxed">
                    Unmortared dry-stone joints at lower tiers allow bilateral groundwater exchange during monsoon inundation and dry drawdowns.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#8FD5F2]/40 shadow-xs">
                  <div className="text-sm font-bold text-[#063B63] mb-1">
                    Lime-Surkhi Pozzolanic Matrix
                  </div>
                  <p className="text-xs text-[#5E7280] leading-relaxed">
                    Flexible, self-healing hydraulic lime binder that dissolves and recrystallizes under recurrent seasonal water submersion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION B — THE 4-STAGE CONTINUUM: SEE → UNDERSTAND → ASSESS → REVIVE */}
      <section className="bg-[#052642] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-b border-[#2498D5]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8FD5F2] font-semibold block mb-2">
              Continuous Intelligence Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              From visible defect to sustainable water revival
            </h2>
          </div>

          {/* Unified Process Continuum: Clean 4-Column Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: SEE */}
            <div className="bg-[#063B63]/90 border border-[#2498D5]/30 rounded-2xl p-6 space-y-4 hover:border-[#8FD5F2] transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8FD5F2] font-semibold">01 / PERCEPTION</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full bg-[#0A6FB7]">
                  SEE
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Non-Invasive Vision Inspection
              </h3>
              <p className="text-xs text-[#EAF7FB]/85 leading-relaxed">
                Computer vision detects structural cracks, intrusive vegetation root networks, spalling masonry, and biological colonisation directly from photographic surveys.
              </p>
            </div>

            {/* Step 2: UNDERSTAND */}
            <div className="bg-[#063B63]/90 border border-[#2498D5]/30 rounded-2xl p-6 space-y-4 hover:border-[#8FD5F2] transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8FD5F2] font-semibold">02 / KNOWLEDGE</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full bg-[#0A6FB7]">
                  UNDERSTAND
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Indian Knowledge Systems (IKS)
              </h3>
              <p className="text-xs text-[#EAF7FB]/85 leading-relaxed">
                Matches observed damage against historical hydrological canons (Vastu Vidya, Aparajitaprccha) and regional craft traditions across Rajasthan, Gujarat, and Delhi.
              </p>
            </div>

            {/* Step 3: ASSESS */}
            <div className="bg-[#063B63]/90 border border-[#2498D5]/30 rounded-2xl p-6 space-y-4 hover:border-[#8FD5F2] transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8FD5F2] font-semibold">03 / ENGINEERING</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full bg-[#0A6FB7]">
                  ASSESS
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Deterministic Compatibility
              </h3>
              <p className="text-xs text-[#EAF7FB]/85 leading-relaxed">
                Calculates numerical compatibility scores for restoration mortars based on moisture permeability, thermal expansion, salt tolerance, and mechanical compliance.
              </p>
            </div>

            {/* Step 4: REVIVE */}
            <div className="bg-[#063B63]/90 border border-[#2498D5]/30 rounded-2xl p-6 space-y-4 hover:border-[#8FD5F2] transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8FD5F2] font-semibold">04 / RESTORATION</span>
                <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full bg-[#0A6FB7]">
                  REVIVE
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Conservation Roadmap
              </h3>
              <p className="text-xs text-[#EAF7FB]/85 leading-relaxed">
                Generates a prioritized conservation dossier adhering strictly to ASI preservation protocols and Venice Charter reversibility guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION C — SCAN A DHAROHAR CTA */}
      <section className="bg-white text-[#102433] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#063B63] to-[#0A6FB7] p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8FD5F2] font-bold">
              Field Survey Ingestion
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Bring the Dharohar into view.
            </h2>
            <p className="text-sm sm:text-base text-[#EAF7FB]/90 leading-relaxed font-light">
              Upload clear photographs of the structure, masonry, and water-path areas for non-invasive visual analysis and deterministic compatibility assessment.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onRouteChange('/upload')}
                className="px-8 py-3.5 rounded-full bg-[#2498D5] hover:bg-[#8FD5F2] hover:text-[#063B63] text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all duration-200"
              >
                START A SCAN
              </button>
              <button
                onClick={onLoadDemoFixture}
                className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs tracking-wider uppercase border border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                LOAD REFERENCE (AGRASEN KI BAOLI)
              </button>
            </div>
          </div>

          {/* Background Decorative Ripples */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 hidden md:block">
            <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
              <circle cx="250" cy="200" r="80" stroke="#8FD5F2" strokeWidth="1.5" fill="none" />
              <circle cx="250" cy="200" r="140" stroke="#8FD5F2" strokeWidth="1" fill="none" strokeDasharray="6 6" />
              <circle cx="250" cy="200" r="200" stroke="#8FD5F2" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* 5. SECTION D — MATERIAL DNA */}
      <section className="bg-[#EAF7FB]/40 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono tracking-wider text-[#0A6FB7] uppercase font-semibold">
                7-Dimensional Material DNA
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102433]">
                Repair the damage without erasing the engineering wisdom.
              </h2>
              <p className="text-sm text-[#5E7280] leading-relaxed">
                Modern Portland cement traps moisture inside porous sandstone, triggering catastrophic stone spalling within decades. JalDrishti cross-verifies traditional lime binders across 7 compatibility dimensions:
              </p>

              <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="font-bold text-[#063B63]">Vapor Permeability</div>
                  <div className="text-[11px] text-[#5E7280]">Allows stone to breathe naturally</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="font-bold text-[#063B63]">Mechanical Modulus</div>
                  <div className="text-[11px] text-[#5E7280]">Yields gracefully without fracturing stone</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="font-bold text-[#063B63]">Thermal Expansion</div>
                  <div className="text-[11px] text-[#5E7280]">Matched coefficients preventing shear</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="font-bold text-[#063B63]">Reversibility</div>
                  <div className="text-[11px] text-[#5E7280]">Complies with UNESCO/ASI charters</div>
                </div>
              </div>
            </div>

            {/* Material DNA Comparison Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="font-bold text-[#102433]">Compatible Intervention Material</h3>
                    <p className="text-xs text-[#5E7280]">Class II Semi-Hydraulic Lime + Brick-Dust Surkhi (1:2)</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    94% High Compatibility
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Mechanical Modulus Compatibility', val: 96, status: 'Compliant' },
                    { label: 'Moisture Vapor Transmittance', val: 94, status: 'Breathable' },
                    { label: 'Thermal Expansion Co-efficient', val: 91, status: 'Matched' },
                    { label: 'Chemical Salt Inertness', val: 88, status: 'Zero Sulfates' },
                    { label: 'Reversibility & Retractability', val: 98, status: 'Fully Reversible' },
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-[#102433]">{row.label}</span>
                        <span className="font-mono text-[#0A6FB7] font-semibold">{row.val}% • {row.status}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#0A6FB7]"
                          style={{ width: `${row.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION F — CLOSING EDITORIAL CTA & FOOTER */}
      <footer className="bg-[#052642] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#2498D5]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            See the heritage. Understand the wisdom. Restore the water.
          </h2>
          <p className="text-sm text-[#8FD5F2] max-w-xl mx-auto leading-relaxed">
            JalDrishti is a sovereign, software-first conservation decision-support platform designed for India's historic subterranean water architectures.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => onRouteChange('/upload')}
              className="px-8 py-3.5 rounded-full bg-[#2498D5] hover:bg-[#8FD5F2] hover:text-[#063B63] text-white font-semibold text-xs tracking-wider uppercase shadow-lg transition-all duration-200"
            >
              START A SCAN
            </button>
            <button
              onClick={() => onRouteChange('/knowledge')}
              className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs tracking-wider uppercase border border-white/25 transition-all duration-200"
            >
              EXPLORE KNOWLEDGE ARCHIVE
            </button>
          </div>

          <div className="pt-12 border-t border-white/10 text-xs text-[#8FD5F2]/60 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© 2026 JalDrishti • Digital Intelligence for India's Traditional Water Heritage</span>
            <span>IKS Preservation • Non-Invasive Photogrammetry</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
