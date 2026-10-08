import React from 'react';

export interface ConservationChainProps {
  damageFinding?: string;
  probableCause?: string;
  traditionalPrinciple?: string;
  materialMatch?: string;
  actionTitle?: string;
  onSelectStep?: (stepIndex: number) => void;
  className?: string;
}

export const ConservationChain: React.FC<ConservationChainProps> = ({
  damageFinding = 'Vegetation root expansion along primary ashlar bed joints',
  probableCause = 'Mortar loss from unmaintained joints followed by seed germination in microclimatic dampness',
  traditionalPrinciple = 'Aparajitaprccha vapor-permeability & flexible hydraulic lime cohesion',
  materialMatch = 'Slaked fat lime putty + surkhi pozzolana (1:2 ratio, 92.5/100 compatible)',
  actionTitle = 'Non-destructive mechanical root extraction & hydraulic lime-surkhi repointing',
  className = '',
}) => {
  const sequence = [
    {
      code: '01',
      phase: 'OBSERVE',
      label: 'Visible Damage Finding',
      content: damageFinding,
      detail: 'Image-space non-invasive perception identifying physical masonry distress.',
    },
    {
      code: '02',
      phase: 'INTERPRET',
      label: 'Probable Degradation Mechanism',
      content: probableCause,
      detail: 'Deduction connecting surface symptom to moisture infiltration and joint failure.',
    },
    {
      code: '03',
      phase: 'PRESERVE',
      label: 'Indigenous Knowledge Principle',
      content: traditionalPrinciple,
      detail: 'Classical hydrological wisdom (Aparajitaprccha / Mayamatam) mandating breathable fabric.',
    },
    {
      code: '04',
      phase: 'REPAIR',
      label: 'Compatible Intervention Material',
      content: materialMatch,
      detail: 'Excludes destructive OPC Portland cement; prescribes reversible hydraulic lime binder.',
    },
    {
      code: '05',
      phase: 'VERIFY',
      label: 'Execution & Characterization Audit',
      content: actionTitle,
      detail: 'Minimum-intervention execution with mandatory petrographic pre-testing.',
    },
  ];

  return (
    <div className={`bg-[#081E31] border border-white/10 rounded-xs p-6 ${className}`}>
      <div className="pb-4 mb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#2498D5] block mb-1">
            CONSERVATION DOSSIER LINEAGE
          </span>
          <h3 className="text-base font-sans font-semibold text-white">
            Sequential Evidence-Based Action Sequence
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#7E98A8]">
          ASI / INTACH CHARTER METHODOLOGY
        </span>
      </div>

      {/* Vertical Editorial Sequence (Replaces 5 Generic Cards) */}
      <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
        {sequence.map((item) => (
          <div key={item.code} className="relative flex items-start space-x-6 pl-10 group">
            {/* Number Pin on Hairline Connector */}
            <div className="absolute left-0 top-0.5 w-8 h-8 bg-[#04121E] border border-white/20 text-[#2498D5] font-mono text-xs font-semibold flex items-center justify-center rounded-xs group-hover:border-[#2498D5] transition-colors">
              {item.code}
            </div>

            <div className="flex-1 pb-4 border-b border-white/5 last:border-b-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-[#2498D5] tracking-wider uppercase">
                  {item.phase}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-mono text-[#7E98A8] uppercase">
                  {item.label}
                </span>
              </div>
              <p className="text-sm font-sans font-medium text-[#F4F7F9] leading-snug">
                {item.content}
              </p>
              <p className="text-xs font-sans text-[#7E98A8] mt-1 leading-relaxed">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
