import React from 'react';
import { MaterialCompatibilityContract, CandidateIntervention } from '../types';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';

export interface MaterialDnaCardProps {
  material: MaterialCompatibilityContract;
  className?: string;
}

export const MaterialDnaCard: React.FC<MaterialDnaCardProps> = ({
  material,
  className = '',
}) => {
  const dimensionLabels: Record<string, { label: string; desc: string }> = {
    mechanical: { label: 'Mechanical', desc: 'Elastic modulus & compressive compatibility (avoids stone shear)' },
    moisture: { label: 'Moisture / Breathability', desc: 'Vapor permeability & capillary matching (prevents damp trap)' },
    thermal: { label: 'Thermal', desc: 'Coefficient of thermal expansion compatibility under cyclic sunlight' },
    chemical: { label: 'Chemical Inertness', desc: 'Absence of soluble sulfates and alkali salts (prevents efflorescence)' },
    reversibility: { label: 'Reversibility', desc: 'Ability to remove intervention in future without substrate damage' },
    heritage: { label: 'Heritage Authenticity', desc: 'Alignment with indigenous IKS regional masonry tradition' },
    visual: { label: 'Visual Patina', desc: 'Aging, texture, color, and joint profile harmony' },
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Mandatory Laboratory Verification Warning */}
      {material.verification_required && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-900 border border-amber-600 flex items-center justify-center text-base text-amber-200 shrink-0">
              🔬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                  Mandatory Laboratory Verification Required
                </span>
                <StatusBadge label="Preliminary Hypothesis" variant="warning" size="sm" />
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                The original material classification (<strong className="text-white capitalize">{material.original_material.replace(/_/g, ' ')}</strong>) is inferred probabilistically from non-invasive photographic survey imagery (confidence: {(material.original_material_confidence * 100).toFixed(0)}%). 
                Under archaeological conservation protocols, <strong>destructive chemical interventions must not proceed</strong> until confirmed through standard petrographic microscopy and X-ray diffraction (XRD) testing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Primary Substrate Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card
            title="Inferred Historical Substrate DNA"
            subtitle="Photographic & regional contextual identification"
            borderAccent="sandstone"
          >
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  MATERIAL CLASSIFICATION FAMILY
                </span>
                <div className="text-base font-bold text-white mt-0.5 font-mono capitalize">
                  {material.original_material.replace(/_/g, ' ')}
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-y border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Photo-Identification Confidence:</span>
                <span className="text-sandstone-300 font-bold">
                  {(material.original_material_confidence * 100).toFixed(1)}%
                </span>
              </div>

              {material.recommended_tests && material.recommended_tests.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    RECOMMENDED VALIDATION AUDITS
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {material.recommended_tests.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sandstone-400 font-mono text-xs">✓</span>
                        <span className="text-[11px] leading-snug">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Candidate Interventions Evaluation */}
        <div className="lg:col-span-7 space-y-4">
          {material.candidate_interventions.map((cand: CandidateIntervention, idx: number) => {
            const isRecommended = cand.recommendation === 'strongly_recommended' || cand.recommendation === 'recommended';
            const isProhibited = cand.recommendation === 'prohibited_incompatible';

            return (
              <div
                key={idx}
                className={`glass-panel rounded-xl p-5 border transition-all ${
                  isProhibited
                    ? 'border-rose-800/80 bg-rose-950/20 shadow-lg shadow-rose-950/30'
                    : isRecommended
                    ? 'border-emerald-700/80 bg-emerald-950/15 shadow-lg shadow-emerald-950/30'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{isProhibited ? '🚫' : '🧪'}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white capitalize font-mono">
                        {cand.intervention_material.replace(/_/g, ' ')}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isProhibited
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {cand.recommendation.replace(/_/g, ' ')}
                        </span>
                        {isProhibited && (
                          <span className="text-[10px] text-rose-400 font-semibold font-mono">
                            HIGH RISK TO HISTORIC FABRIC
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className={`text-xl font-bold font-mono ${isProhibited ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {cand.compatibility_score.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">/ 100</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Compatibility Index</span>
                  </div>
                </div>

                {/* 7 Dimensions Multi-Metric Grid */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    7-DIMENSION COMPATIBILITY PROFILE (0-10)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                    {(Object.keys(cand.compatibility_dimensions) as (keyof typeof cand.compatibility_dimensions)[]).map((dim) => {
                      const val = cand.compatibility_dimensions[dim];
                      const info = dimensionLabels[dim];
                      const isHigh = val >= 7.0;
                      const isMid = val >= 4.0;

                      return (
                        <div
                          key={dim}
                          className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-center"
                          title={info ? `${info.label}: ${info.desc}` : dim}
                        >
                          <div className="text-[9px] font-mono text-slate-400 uppercase truncate">
                            {dim}
                          </div>
                          <div
                            className={`text-xs font-bold font-mono mt-1 ${
                              isHigh ? 'text-emerald-400' : isMid ? 'text-amber-400' : 'text-rose-400'
                            }`}
                          >
                            {val.toFixed(1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Warnings / Failure Vector Alerts */}
                {cand.warnings && cand.warnings.length > 0 && (
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed ${
                      isProhibited
                        ? 'bg-rose-950/40 border border-rose-800 text-rose-200'
                        : 'bg-amber-950/30 border border-amber-800/60 text-amber-200'
                    }`}
                  >
                    <strong className="block text-[10px] uppercase font-mono tracking-wider mb-1 font-bold">
                      {isProhibited ? 'CRITICAL FAILURE MECHANISMS TO AVOID' : 'APPLICATION PRECAUTIONS'}
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {cand.warnings.map((w, wIdx) => (
                        <li key={wIdx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
