import React from 'react';
import { RootCauseItem } from '../types';
import { Card } from './Card';

export interface RootCauseAnalysisCardProps {
  rootCauseItems: RootCauseItem[];
  className?: string;
}

export const RootCauseAnalysisCard: React.FC<RootCauseAnalysisCardProps> = ({
  rootCauseItems,
  className = '',
}) => {
  return (
    <Card
      title="Root-Cause Degradation Mechanisms"
      subtitle="Deterministic engineering rule deductions connecting visual symptoms to hydrological failure"
      borderAccent="sandstone"
      className={className}
    >
      <div className="space-y-4">
        {rootCauseItems.map((item, idx) => {
          const isCritical = item.urgency === 'critical';
          const isHigh = item.urgency === 'high';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-800/80'
                  : isHigh
                  ? 'bg-amber-950/20 border-amber-800/80'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-base">{isCritical ? '🚨' : isHigh ? '⚠️' : '🔍'}</span>
                  <span className="text-xs font-bold text-white font-mono">
                    {item.finding}
                  </span>
                </div>

                <span
                  className={`text-[9.5px] font-mono px-2 py-0.5 rounded uppercase font-bold self-start sm:self-auto ${
                    isCritical
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : isHigh
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item.urgency || 'routine'}
                </span>
              </div>

              <div className="text-xs text-slate-300 mb-2 leading-relaxed">
                <strong className="text-sandstone-300">Probable Mechanism: </strong>
                {item.probable_cause}
              </div>

              {item.evidence_rules && item.evidence_rules.length > 0 && (
                <div className="pt-2 border-t border-slate-800/40">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    DETERMINISTIC RULE EVIDENCE
                  </span>
                  <ul className="space-y-1 text-[11px] font-mono text-slate-400">
                    {item.evidence_rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-sandstone-400">↳</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
