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
    <div className="w-full bg-[#FFFFFF] text-[#102433] selection:bg-[#2498D5] selection:text-white">
      {/* 1. HERO SECTION WITH LAYERED WATER ARTWORK & ORGANIC WHITE TRANSITION */}
      <HeroScene
        onRouteChange={onRouteChange}
        onLoadDemoFixture={onLoadDemoFixture}
      />

      {/* 2. SECTION A — THE PROBLEM: WHAT WE INHERITED IS MORE THAN STONE */}
      <section className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 -mt-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7FB] text-[#0A6FB7] text-xs font-mono uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0A6FB7]" />
                <span>The Living Dharohar</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#102433] leading-tight">
                What we inherited is{' '}
                <span className="font-editorial italic font-normal text-[#0A6FB7]">
                  more than stone.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#5E7280] leading-relaxed font-sans font-light">
                India’s stepwells, kunds, bawaris, and jhalras are not merely ornamental monuments. They are sophisticated, zero-energy hydrological machines engineered over millennia to harness monsoon downpours, naturally purify sediment through ashlar masonry, and recharge deep subterranean aquifers.
              </p>

              <p className="text-sm sm:text-base text-[#5E7280] leading-relaxed">
                When neglected, blocked silt mounds, intrusive peepal roots, and incompatible modern cement plasters break this ancient equilibrium. Restoring them requires reading both the masonry and the hydraulic intelligence locked within the stone.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#063B63] font-sans">
                    3,000+
                  </div>
                  <div className="text-xs text-[#5E7280] font-mono uppercase tracking-wider mt-0.5">
                    Traditional Baolis
                  </div>
                </div>
                <div className="w-[1px] h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0A6FB7] font-sans">
                    Zero-Energy
                  </div>
                  <div className="text-xs text-[#5E7280] font-mono uppercase tracking-wider mt-0.5">
                    Aquifer Recharge
                  </div>
                </div>
                <div className="w-[1px] h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#3E8F6B] font-sans">
                    Lime-Surkhi
                  </div>
                  <div className="text-xs text-[#5E7280] font-mono uppercase tracking-wider mt-0.5">
                    Breathable Mortars
                  </div>
                </div>
              </div>
            </div>

            {/* Right Architectural Diagram Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#EAF7FB] border border-[#2498D5]/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2498D5]/20">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#063B63]">
                    Stepwell Hydrological Mechanics
                  </span>
                  <span className="text-[10px] font-mono text-[#0A6FB7] bg-white px-2 py-0.5 rounded-full border border-[#2498D5]/30">
                    Natural Infiltration
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs font-bold text-[#063B63] flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A6FB7]" />
                      Catchment &amp; Sediment Settling
                    </div>
                    <p className="text-xs text-[#5E7280] leading-snug">
                      Surface stormwater enters through stepped baffle channels, dropping silt before clean water enters the main chamber.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs font-bold text-[#063B63] flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2498D5]" />
                      Subterranean Aquifer Recharge
                    </div>
                    <p className="text-xs text-[#5E7280] leading-snug">
                      Unmortared dry-stone joints at lower tiers allow bilateral groundwater breathing during monsoon and summer drawdowns.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs font-bold text-[#063B63] flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9902E]" />
                      Traditional Lime-Surkhi Mortar DNA
                    </div>
                    <p className="text-xs text-[#5E7280] leading-snug">
                      Flexible, self-healing hydraulic lime binder that dissolves and recrystallizes under recurring water inundation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION B — THE 4-STAGE CONTINUUM: SEE → UNDERSTAND → ASSESS → REVIVE */}
      <section className="bg-[#EAF7FB]/50 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0A6FB7] text-xs font-mono uppercase tracking-wider font-semibold mb-3 shadow-xs">
              Continuous Intelligence Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102433]">
              From visible defect to sustainable water revival
            </h2>
            <p className="text-sm sm:text-base text-[#5E7280] mt-3">
              A connected methodology linking optical perception with indigenous architectural wisdom and deterministic structural physics.
            </p>
          </div>

          {/* Unified Process Flow Line */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1: SEE */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#063B63] text-white">
                  01
                </span>
                <span className="text-xs font-mono font-semibold text-[#0A6FB7]">
                  SEE
                </span>
              </div>
              <h3 className="text-base font-bold text-[#102433] mb-2">
                Non-Invasive Vision
              </h3>
              <p className="text-xs text-[#5E7280] leading-relaxed">
                Computer vision detects surface cracks, invasive vegetation roots, stone spalling, and moisture efflorescence directly from field photographs.
              </p>
            </div>

            {/* Step 2: UNDERSTAND */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#0A6FB7] text-white">
                  02
                </span>
                <span className="text-xs font-mono font-semibold text-[#0A6FB7]">
                  UNDERSTAND
                </span>
              </div>
              <h3 className="text-base font-bold text-[#102433] mb-2">
                IKS Knowledge Corpus
              </h3>
              <p className="text-xs text-[#5E7280] leading-relaxed">
                Interprets symptoms through classical treatises and vernacular engineering: regional stone geology, aquifer dynamics, and traditional lime formulations.
              </p>
            </div>

            {/* Step 3: ASSESS */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#2498D5] text-white">
                  03
                </span>
                <span className="text-xs font-mono font-semibold text-[#0A6FB7]">
                  ASSESS
                </span>
              </div>
              <h3 className="text-base font-bold text-[#102433] mb-2">
                Engineering Assessment
              </h3>
              <p className="text-xs text-[#5E7280] leading-relaxed">
                Calculates transparent condition scores, crack burden indexes, and siltation obstruction ratios through explicit deterministic logic.
              </p>
            </div>

            {/* Step 4: REVIVE */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#3E8F6B] text-white">
                  04
                </span>
                <span className="text-xs font-mono font-semibold text-[#3E8F6B]">
                  REVIVE
                </span>
              </div>
              <h3 className="text-base font-bold text-[#102433] mb-2">
                Conservation Roadmap
              </h3>
              <p className="text-xs text-[#5E7280] leading-relaxed">
                Prescribes breathable lime-surkhi pointing, mechanical desilting, and root extraction while strictly barring harmful OPC cement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION C — SCAN A DHAROHAR CTA SECTION */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#063B63] to-[#0A6FB7] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          {/* Subtle water ripples background graphic */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-white/15 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-[#8FD5F2] uppercase font-bold">
              Field Ingestion Experience
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Bring the Dharohar into view.
            </h2>
            <p className="text-sm sm:text-base text-[#EAF7FB]/90 leading-relaxed font-light mb-8">
              Upload field photographs of stone masonry, stepped corridors, or silted basins. Our pipeline performs non-invasive optical diagnostics and returns a comprehensive heritage dossier in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRouteChange('/upload')}
                className="px-7 py-3 rounded-full bg-white text-[#063B63] hover:bg-[#EAF7FB] font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-md"
              >
                START A NEW SCAN
              </button>
              <button
                onClick={onLoadDemoFixture}
                className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs tracking-wider uppercase backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                LOAD REFERENCE DOSSIER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION D — MATERIAL DNA: PRESERVING ORIGINAL WISDOM */}
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

      {/* 7. SECTION F — CLOSING EDITORIAL CTA & FOOTER */}
      <footer className="bg-[#052642] text-white py-16 px-4 sm:px-6 lg:px-8">
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
          </div>

          <div className="pt-12 border-t border-white/10 text-xs text-[#8FD5F2]/60 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© 2026 JalDrishti • Digital Intelligence for India's Traditional Water Heritage</span>
            <span>Lead Engineer: Anika Jain (Frontend / PWA / Digital Twin)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
