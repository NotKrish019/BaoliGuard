import React from 'react';
import { Card } from './Card';

export interface WhyThisRecommendationProps {
  className?: string;
}

export const WhyThisRecommendation: React.FC<WhyThisRecommendationProps> = ({
  className = '',
}) => {
  return (
    <div className={`glass-panel rounded-2xl p-6 sm:p-8 border border-sandstone-500/40 shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sandstone-400 font-mono text-xs font-bold px-2 py-0.5 rounded bg-sandstone-950 border border-sandstone-800">
              CONSERVATION RATIONALE
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight font-sans">
              Why This Recommendation?
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Architectural and scientific justification explaining why BaoliGuard recommends traditional lime-pozzolana consolidation over modern Portland cement.
          </p>
        </div>

        <div className="text-[11px] font-mono text-sandstone-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shrink-0">
          INTACH / ASI Compliant
        </div>
      </div>

      {/* 3 Scientific & Traditional Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Pillar 1 */}
        <Card
          borderAccent="sandstone"
          title="1. Moisture Breathability & Vapor Dynamics"
          subtitle="Vapor Permeability Matching"
        >
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
            <p>
              Traditional subterranean masonry relies on continuous moisture evaporation through porous mortar joints.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11.5px] text-amber-200">
              <strong>The Cement Trap:</strong> Ordinary Portland Cement forms a non-breathable barrier. Groundwater salts rising through capillary action become trapped beneath the stone face, creating intense crystallization pressure (cryptoflorescence) that shears the sandstone face.
            </div>
            <p className="text-[11px] text-slate-400">
              Lime-surkhi mortar remains vapor-permeable, allowing rising moisture to escape benignly into the subterranean atmosphere.
            </p>
          </div>
        </Card>

        {/* Pillar 2 */}
        <Card
          borderAccent="jal"
          title="2. Modulus of Elasticity & Sacrificial Joints"
          subtitle="Mechanical Stress Redistribution"
        >
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
            <p>
              In historic masonry, <strong>the mortar must always be weaker than the surrounding stone</strong>.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11.5px] text-sky-200">
              <strong>Elastic Mismatch:</strong> OPC cement has a high Young’s modulus of elasticity (~30 GPa vs ~2 GPa for lime). Under seasonal thermal expansion and seismic micro-movement, rigid cement refuses to yield, forcing cracking into the softer carved stone ashlar.
            </div>
            <p className="text-[11px] text-slate-400">
              Lime acts as a sacrificial shock absorber that can be renewed without losing original stone volume.
            </p>
          </div>
        </Card>

        {/* Pillar 3 */}
        <Card
          borderAccent="surkhi"
          title="3. IKS Herbal Additives & Hydrological Revival"
          subtitle="Aparajitaprccha Hydraulic Heritage"
        >
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
            <p>
              Classical Indian hydraulic treatises document organic admixtures engineered specifically for water immersion.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11.5px] text-amber-200">
              <strong>Traditional Fermentation:</strong> Methi (fenugreek) mucilage and jaggery extract act as natural water-reducers and plasticizers, while burnt clay brick dust (surkhi) provides reactive amorphous silica for underwater hydraulic set.
            </div>
            <p className="text-[11px] text-slate-400">
              Restoring hydrological inlet gradients and de-silting revives natural seasonal aquifer recharge without invasive pumps.
            </p>
          </div>
        </Card>
      </div>

      {/* Traceable Academic & Conservation Citations */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        <span className="text-[10px] font-mono uppercase tracking-wider text-sandstone-300 font-bold block mb-2">
          ACADEMIC &amp; ARCHAEOLOGICAL CITATION SOURCES
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400 font-mono">
          <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-white block font-semibold">SRC_ASI_CONSERVATION_MANUAL_2020</span>
            <span>Archaeological Survey of India &amp; INTACH Heritage Guidelines on Mortar Incompatibility</span>
          </div>
          <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-white block font-semibold">APARAJITAPRCCHA (12th Cent. CE)</span>
            <span>Bhuvanadeva — Vapi-Kupa-Tadaga-Vidhana (Subterranean Water Architecture &amp; Lime Slaking)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
