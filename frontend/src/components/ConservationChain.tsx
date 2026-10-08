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
      label: 'Observed Damage Finding',
      content: damageFinding,
      detail: 'Image-space non-invasive perception identifying physical masonry distress.',
    },
    {
      code: '02',
      phase: 'INTERPRET',
      label: 'Possible Cause & Degradation Mechanism',
      content: probableCause,
      detail: 'Deduction connecting surface symptom to moisture infiltration and joint failure.',
    },
    {
      code: '03',
      phase: 'PRESERVE',
      label: 'Material Consideration & IKS Principle',
      content: traditionalPrinciple,
      detail: 'Classical hydrological wisdom (Aparajitaprccha / Mayamatam) mandating breathable fabric.',
    },
    {
      code: '04',
      phase: 'REPAIR',
      label: 'Compatible Intervention',
      content: materialMatch,
      detail: 'Excludes destructive OPC Portland cement; prescribes reversible hydraulic lime binder.',
    },
    {
      code: '05',
      phase: 'VERIFY',
      label: 'Verification & Execution Audit',
      content: actionTitle,
      detail: 'Minimum-intervention execution with mandatory petrographic pre-testing.',
    },
  ];

  return (
    <div className={`bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-6 sm:p-8 font-sans ${className}`}>
      <div className="pb-4 mb-6 border-b border-[#28A9E0]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#28A9E0] block mb-1">
            Conservation Dossier Lineage
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Sequential Evidence-Based Action Sequence
          </h3>
        </div>
        <span className="text-xs text-[#8CD8F5]/80 font-medium">
          ASI / INTACH Conservation Doctrine
        </span>
      </div>

      {/* Vertical Editorial Sequence with Subtle Water-Flow Connecting Line */}
      <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#087CC1] before:via-[#28A9E0]/60 before:to-[#8CD8F5]/40">
        {sequence.map((item) => (
          <div key={item.code} className="relative flex items-start space-x-6 pl-10 group">
            {/* Number Pin on Water-Flow Connector */}
            <div className="absolute left-0 top-0.5 w-8 h-8 bg-[#062B49] border border-[#28A9E0]/40 text-[#28A9E0] text-xs font-bold flex items-center justify-center rounded-sm group-hover:border-[#28A9E0] group-hover:text-white transition-all shadow-xs">
              {item.code}
            </div>

            <div className="flex-1 pb-4 border-b border-[#28A9E0]/15 last:border-b-0">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#28A9E0] tracking-wider uppercase">
                  {item.phase}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-semibold text-[#8CD8F5]">
                  {item.label}
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                {item.content}
              </p>
              <p className="text-xs text-[#8CD8F5]/80 mt-1 leading-relaxed">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
