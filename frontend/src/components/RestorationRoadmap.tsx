import React, { useState } from 'react';
import { RestorationResultContract, PrioritizedAction } from '../types';
import { Card } from './Card';

export interface RestorationRoadmapProps {
  restoration: RestorationResultContract;
  className?: string;
}

export const RestorationRoadmap: React.FC<RestorationRoadmapProps> = ({
  restoration,
  className = '',
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');

  const phaseNames: Record<string, { label: string; badge: string }> = {
    phase_1_immediate_stabilization: { label: 'Phase 1: Immediate Stabilization', badge: 'border-rose-700 bg-rose-950/30 text-rose-300' },
    phase_2_hydrological_remediation: { label: 'Phase 2: Hydrological Remediation', badge: 'border-jal-700 bg-jal-950/30 text-jal-300' },
    phase_3_masonry_and_iks_consolidation: { label: 'Phase 3: Masonry & IKS Consolidation', badge: 'border-sandstone-700 bg-sandstone-950/30 text-sandstone-300' },
    phase_4_long_term_monitoring: { label: 'Phase 4: Long-Term Monitoring', badge: 'border-emerald-700 bg-emerald-950/30 text-emerald-300' },
  };

  const filteredActions = selectedPhaseFilter === 'all'
    ? restoration.prioritized_actions
    : restoration.prioritized_actions.filter((a) => a.phase === selectedPhaseFilter);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Strategy Banner & Phase Filter Tabs */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              STRATEGY
            </span>
            <h3 className="text-base font-bold text-white capitalize font-mono">
              {restoration.restoration_strategy.replace(/_/g, ' ')}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sequenced minimum-intervention conservation roadmap with explicit prerequisite dependencies.
          </p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setSelectedPhaseFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              selectedPhaseFilter === 'all' ? 'bg-sandstone-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Steps ({restoration.prioritized_actions.length})
          </button>
          {Object.keys(phaseNames).map((phaseKey) => (
            <button
              key={phaseKey}
              type="button"
              onClick={() => setSelectedPhaseFilter(phaseKey)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedPhaseFilter === phaseKey ? 'bg-sandstone-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {phaseKey.split('_')[1].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Prioritized Steps Timeline */}
      <div className="space-y-4">
        {filteredActions.map((action: PrioritizedAction) => {
          const phaseMeta = phaseNames[action.phase] || { label: action.phase, badge: 'border-slate-700 text-slate-300' };
          const isImmediate = action.urgency === 'immediate';

          return (
            <div
              key={action.step}
              className={`glass-panel rounded-xl p-5 border transition-all ${
                isImmediate ? 'border-rose-800/80 bg-rose-950/15' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-heritage-900 border border-sandstone-500/60 flex items-center justify-center font-mono font-bold text-sandstone-300 shrink-0 text-sm">
                    {action.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{action.action_title}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${phaseMeta.badge}`}>
                        {phaseMeta.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Target: {action.target_defect.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[9.5px] font-mono px-2 py-0.5 rounded uppercase font-bold self-start sm:self-auto border ${
                    isImmediate
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : action.urgency === 'high'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-slate-900 text-slate-400 border border-slate-700'
                  }`}
                >
                  Urgency: {action.urgency}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {action.recommended_technique}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono mb-2">
                <span className="text-sandstone-300 font-semibold">Material Specification: </span>
                <span className="text-slate-300">{action.material_specification}</span>
              </div>

              {action.preconditions && action.preconditions.length > 0 && (
                <div className="text-[11px] font-mono text-amber-300/90 flex items-start gap-1.5 pt-2 border-t border-slate-800/60">
                  <span className="font-bold">⚠️ Precondition:</span>
                  <span>{action.preconditions.join('; ')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prohibited Interventions & Traditional IKS Craftsmanship */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Prohibited Practices */}
        <div className="lg:col-span-6">
          <Card
            borderAccent="surkhi"
            title="Prohibited Destructive Interventions"
            subtitle="Actions explicitly prohibited to prevent irreversible damage to stone fabric"
          >
            <div className="space-y-3">
              {restoration.incompatible_practices.map((incomp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/50 text-xs">
                  <div className="flex items-center justify-between text-rose-300 font-bold mb-1">
                    <span>🚫 {incomp.prohibited_action}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800">
                      {incomp.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-rose-200">Failure Mechanism: </strong>
                    {incomp.failure_mechanism}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Traditional IKS Guidelines */}
        <div className="lg:col-span-6">
          <Card
            borderAccent="sandstone"
            title="Traditional IKS Craftsmanship Specification"
            subtitle="Authentic mortar preparation & seasonal curing protocols"
          >
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <div>
                <span className="text-[10px] font-mono uppercase text-sandstone-300 font-bold block mb-1">
                  HISTORICAL LIME-SURKHI BLEND
                </span>
                <p className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11.5px] text-amber-200/90 leading-relaxed">
                  {restoration.iks_guidelines.traditional_mortar_recipe}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-sandstone-300 font-bold block mb-1">
                  CLASSICAL TREATISE AUTHORITY
                </span>
                <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400 font-mono">
                  {restoration.iks_guidelines.craftsmanship_references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-sandstone-950/40 border border-sandstone-900/60 text-[11px] text-sandstone-200">
                <strong className="text-sandstone-300 font-mono uppercase block mb-0.5">Seasonal Curing Protocol:</strong>
                {restoration.iks_guidelines.seasonal_curing_rules}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
