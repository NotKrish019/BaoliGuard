import React from 'react';
import { Card } from './Card';

export interface WhyThisRecommendationProps {
  className?: string;
}

export const WhyThisRecommendation: React.FC<WhyThisRecommendationProps> = ({
  className = '',
}) => {
  return (
    <div className={`bg-[#081E31] border border-white/10 rounded-xs p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#2498D5] block mb-1">
            ENGINEERING JUSTIFICATION
          </span>
          <h3 className="text-base font-semibold text-white font-sans">
            Why Traditional Pozzolanic Mortar Outperforms Portland Cement
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#7E98A8]">
          ASI &amp; INTACH GUIDELINES COMPLIANT
        </span>
      </div>

      {/* 3 Scientific & Traditional Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Pillar 1 */}
        <Card
          borderAccent="sandstone"
          title="1. Vapor Permeability & Moisture Dynamics"
          subtitle="Capillary Evaporative Matching"
        >
          <div className="space-y-3 text-xs text-[#94A7B5] leading-relaxed font-sans">
            <p>
              Traditional subterranean masonry relies on continuous moisture evaporation through porous mortar joints.
            </p>
            <div className="p-2.5 bg-[#04121E] border border-white/10 text-[11px] text-[#C9902E] font-mono">
              <strong>THE CEMENT TRAP:</strong> Portland cement forms a rigid impermeable seal. Groundwater salts rising through capillary action become trapped beneath the stone face, creating cryptoflorescence crystallization pressure that shears the ashlar face.
            </div>
            <p className="text-[11px] text-[#7E98A8]">
              Lime-surkhi mortar remains vapor-permeable, allowing rising moisture to breathe benignly into the atmosphere.
            </p>
          </div>
        </Card>

        {/* Pillar 2 */}
        <Card
          borderAccent="jal"
          title="2. Elastic Modulus & Sacrificial Action"
          subtitle="Mechanical Stress Redistribution"
        >
          <div className="space-y-3 text-xs text-[#94A7B5] leading-relaxed font-sans">
            <p>
              In historic masonry, <strong className="text-white">the mortar must always be weaker than the surrounding stone</strong>.
            </p>
            <div className="p-2.5 bg-[#04121E] border border-white/10 text-[11px] text-[#8FD5F2] font-mono">
              <strong>ELASTIC MISMATCH:</strong> OPC cement has a high Young’s modulus (~30 GPa vs ~2 GPa for lime). Under cyclic thermal expansion, rigid cement refuses to yield, forcing shear fractures into the carved sandstone blocks.
            </div>
            <p className="text-[11px] text-[#7E98A8]">
              Lime acts as a sacrificial cushion that can be renewed without losing original stone volume.
            </p>
          </div>
        </Card>

        {/* Pillar 3 */}
        <Card
          borderAccent="surkhi"
          title="3. IKS Herbal Additives & Pozzolanic Set"
          subtitle="Classical Hydraulic Admixtures"
        >
          <div className="space-y-3 text-xs text-[#94A7B5] leading-relaxed font-sans">
            <p>
              Classical Indian treatises document organic admixtures engineered specifically for water immersion.
            </p>
            <div className="p-2.5 bg-[#04121E] border border-white/10 text-[11px] text-[#3E8F6B] font-mono">
              <strong>ORGANIC ADMIXTURES:</strong> Methi (fenugreek) mucilage and jaggery extract act as natural water-reducers and plasticizers, while burnt clay brick dust (surkhi) provides reactive amorphous silica for underwater hydraulic set.
            </div>
            <p className="text-[11px] text-[#7E98A8]">
              Restoring hydrological inlet gradients and desilting revives natural aquifer recharge without mechanical pumping.
            </p>
          </div>
        </Card>
      </div>

      {/* Traceable Academic & Conservation Citations */}
      <div className="p-4 bg-[#051624] border border-white/10 text-xs font-mono">
        <span className="text-[10px] uppercase tracking-wider text-[#7E98A8] font-semibold block mb-2">
          ACADEMIC &amp; ARCHIVAL CITATION SOURCES
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#7E98A8]">
          <div className="p-2 bg-[#081E31] border border-white/10">
            <span className="text-white block font-semibold">SRC_ASI_CONSERVATION_MANUAL_2020</span>
            <span>Archaeological Survey of India &amp; INTACH Heritage Guidelines on Mortar Incompatibility</span>
          </div>
          <div className="p-2 bg-[#081E31] border border-white/10">
            <span className="text-white block font-semibold">APARAJITAPRCCHA (12th Cent. CE)</span>
            <span>Bhuvanadeva — Vapi-Kupa-Tadaga-Vidhana (Subterranean Water Architecture &amp; Lime Slaking)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
