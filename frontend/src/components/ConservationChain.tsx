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
  probableCause = 'Mortar loss from unmaintained joints followed by seed germination',
  traditionalPrinciple = 'Aparajitaprccha breathability & flexible hydraulic lime cohesion',
  materialMatch = 'Slaked fat lime putty + surkhi pozzolana (92.5/100 compatible)',
  actionTitle = 'Non-destructive vegetation extraction & traditional lime repointing',
  onSelectStep,
  className = '',
}) => {
  const steps = [
    {
      index: 1,
      tag: '01. OBSERVED DAMAGE',
      shortName: 'DAMAGE',
      summary: damageFinding,
      color: 'border-rose-500/60 bg-rose-950/20 text-rose-300',
      badge: 'bg-rose-950 text-rose-300 border-rose-800',
      icon: '🔍',
    },
    {
      index: 2,
      tag: '02. POSSIBLE CAUSE',
      shortName: 'CAUSE',
      summary: probableCause,
      color: 'border-amber-500/60 bg-amber-950/20 text-amber-300',
      badge: 'bg-amber-950 text-amber-300 border-amber-800',
      icon: '⚠️',
    },
    {
      index: 3,
      tag: '03. TRADITIONAL PRINCIPLE',
      shortName: 'IKS TRADITION',
      summary: traditionalPrinciple,
      color: 'border-sandstone-500/60 bg-sandstone-950/20 text-sandstone-300',
      badge: 'bg-sandstone-950 text-sandstone-300 border-sandstone-800',
      icon: '📜',
    },
    {
      index: 4,
      tag: '04. MATERIAL COMPATIBILITY',
      shortName: 'MATERIAL DNA',
      summary: materialMatch,
      color: 'border-lime-500/60 bg-lime-950/20 text-lime-300',
      badge: 'bg-lime-950 text-lime-300 border-lime-800',
      icon: '🧪',
    },
    {
      index: 5,
      tag: '05. CONSERVATION ACTION',
      shortName: 'REVIVE',
      summary: actionTitle,
      color: 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300',
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      icon: '🛠️',
    },
  ];

  return (
    <div className={`glass-panel rounded-2xl p-6 border border-slate-800 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sandstone-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-sandstone-950 border border-sandstone-800">
              CAUSAL CHAIN
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Evidence-Based Conservation Narrative
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic diagnostic lineage connecting visible surface symptoms to material-compatible interventions.
          </p>
        </div>

        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          5-Stage Conservation Linkage
        </span>
      </div>

      {/* Responsive Horizontal / Vertical Chain Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((st, i) => (
          <div
            key={st.index}
            onClick={() => onSelectStep?.(st.index)}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              st.color
            } hover:scale-[1.02] hover:shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-lg">{st.icon}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${st.badge}`}>
                  {st.shortName}
                </span>
              </div>
              <div className="text-[10px] font-mono font-bold tracking-wider opacity-75 uppercase mb-1">
                {st.tag}
              </div>
              <p className="text-xs text-slate-200 leading-snug font-sans">
                {st.summary}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div className="hidden md:flex justify-end pt-3 text-slate-500 font-mono text-xs">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
