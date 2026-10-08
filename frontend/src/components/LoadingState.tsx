import React from 'react';

export interface LoadingStateProps {
  title?: string;
  step?: 'see' | 'understand' | 'assess' | 'revive' | 'general';
  message?: string;
  progressPercent?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Processing Conservation Analysis',
  step = 'see',
  message = 'Executing non-invasive visual and engineering diagnostics...',
  progressPercent,
}) => {
  const stepDetails = {
    see: { label: 'SEE', desc: 'Segmenting visual defects (cracks, vegetation, spalling)', color: 'text-jal-400' },
    understand: { label: 'UNDERSTAND', desc: 'Querying IKS material DNA & hydraulic principles', color: 'text-amber-400' },
    assess: { label: 'ASSESS', desc: 'Executing deterministic condition & functionality scoring', color: 'text-sandstone-400' },
    revive: { label: 'REVIVE', desc: 'Assembling minimum-intervention restoration roadmap', color: 'text-emerald-400' },
    general: { label: 'PROCESSING', desc: 'Connecting to pipeline orchestrator', color: 'text-slate-300' },
  };

  const active = stepDetails[step];

  return (
    <div className="glass-panel-elevated rounded-2xl p-8 max-w-lg mx-auto text-center border border-slate-700/80 shadow-2xl">
      {/* Scanner Radar Graphic */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-jal-500/30 animate-ping opacity-30" />
        <div className="absolute inset-2 rounded-full border border-sandstone-500/40 animate-pulse" />
        <div className="w-12 h-12 rounded-full bg-heritage-900 border border-jal-400 flex items-center justify-center text-xl shadow-lg shadow-jal-950">
          🏛️
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono mb-3">
        <span className={`font-bold ${active.color}`}>[{active.label}]</span>
        <span className="text-slate-400 truncate max-w-[280px]">{active.desc}</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
        {message}
      </p>

      {/* Engineering pipeline stages */}
      <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono mb-4 text-center">
        {(['see', 'understand', 'assess', 'revive'] as const).map((stage) => {
          const isCurrent = step === stage;
          return (
            <div
              key={stage}
              className={`p-1.5 rounded border transition-colors ${
                isCurrent
                  ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}
            >
              {stage.toUpperCase()}
            </div>
          );
        })}
      </div>

      {progressPercent !== undefined ? (
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-jal-500 via-amber-500 to-emerald-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      ) : (
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800 relative">
          <div className="absolute inset-y-0 bg-gradient-to-r from-jal-500 to-sandstone-400 w-1/3 animate-[shimmer_1.5s_infinite] rounded-full" />
        </div>
      )}
    </div>
  );
};
