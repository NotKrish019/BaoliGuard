import React, { useState } from 'react';
import { MaterialCompatibilityContract, CandidateIntervention } from '../types';

export interface MaterialDnaCardProps {
  material: MaterialCompatibilityContract;
  className?: string;
}

export const MaterialDnaCard: React.FC<MaterialDnaCardProps> = ({
  material,
  className = '',
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateIntervention>(
    material.candidate_interventions[0] || null
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Institutional Laboratory Validation Notice */}
      {material.verification_required && (
        <div className="py-2.5 px-4 bg-[#081E31] border-l-2 border-[#C9902E] border-y border-r border-white/10 text-xs font-mono">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#C9902E] font-semibold uppercase tracking-wider text-[11px]">
                LABORATORY VERIFICATION REQUIRED
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[#94A7B5]">
                Inferred substrate: <strong className="text-white uppercase font-sans">{material.original_material.replace(/_/g, ' ')}</strong> (Confidence: {(material.original_material_confidence * 100).toFixed(0)}%). Petrographic thin-section and XRD confirmation required prior to intervention.
              </span>
            </div>
            <span className="text-[10px] text-[#7E98A8] shrink-0 uppercase">ASI / UNESCO CHARTER</span>
          </div>
        </div>
      )}

      {/* Split Comparison Workspace: 65% Comparison Table | 35% Material Detail Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 65%: Engineering Material Comparison Table */}
        <div className="lg:col-span-8 bg-[#081E31] border border-white/10 rounded-xs overflow-hidden">
          <div className="h-10 px-4 bg-[#051624] border-b border-white/10 flex items-center justify-between text-xs font-mono text-[#7E98A8]">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              MATERIAL COMPATIBILITY REGISTER
            </span>
            <span>CLICK ROW TO INSPECT 7D PROFILE</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-[#7E98A8] text-[10px] uppercase tracking-wider bg-[#04121E]">
                  <th className="py-2.5 px-4 font-semibold">CANDIDATE MATERIAL</th>
                  <th className="py-2.5 px-4 font-semibold">COMPATIBILITY</th>
                  <th className="py-2.5 px-4 font-semibold">MOISTURE</th>
                  <th className="py-2.5 px-4 font-semibold">HERITAGE</th>
                  <th className="py-2.5 px-4 font-semibold">REVERSIBLE</th>
                  <th className="py-2.5 px-4 font-semibold">RECOMMENDATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#F4F7F9]">
                {material.candidate_interventions.map((cand, idx) => {
                  const isSelected = selectedCandidate?.intervention_material === cand.intervention_material;
                  const isProhibited = cand.recommendation === 'prohibited_incompatible';
                  const moistureVal = cand.compatibility_dimensions?.moisture ?? 5;
                  const heritageVal = cand.compatibility_dimensions?.heritage ?? 5;
                  const reversibilityVal = cand.compatibility_dimensions?.reversibility ?? 5;

                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedCandidate(cand)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#0C2B45] text-white'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold capitalize font-sans">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 ${isSelected ? 'bg-[#2498D5]' : 'bg-transparent'}`} />
                          <span>{cand.intervention_material.replace(/_/g, ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-semibold ${isProhibited ? 'text-[#E06C68]' : 'text-[#3E8F6B]'}`}>
                            {cand.compatibility_score.toFixed(1)}
                          </span>
                          <span className="text-[10px] text-[#7E98A8]">/100</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#7E98A8]">
                        {moistureVal >= 7 ? 'High' : moistureVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4 text-[#7E98A8]">
                        {heritageVal >= 7 ? 'High' : heritageVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4 text-[#7E98A8]">
                        {reversibilityVal >= 7 ? 'High' : reversibilityVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-1.5 py-0.5 text-[10px] uppercase font-semibold rounded-xs border ${
                            isProhibited
                              ? 'bg-[#2B0E0D] text-[#E06C68] border-[#B64A45]/30'
                              : 'bg-[#052219] text-[#3E8F6B] border-[#3E8F6B]/30'
                          }`}
                        >
                          {cand.recommendation.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 35%: Selected Candidate 7D Profile Side Panel */}
        <div className="lg:col-span-4 bg-[#081E31] border border-white/10 rounded-xs p-5 font-mono text-xs space-y-5">
          {selectedCandidate ? (
            <>
              <div>
                <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider font-semibold mb-1">
                  INTERVENTION DETAIL
                </div>
                <h3 className="text-base font-semibold text-white font-sans capitalize">
                  {selectedCandidate.intervention_material.replace(/_/g, ' ')}
                </h3>
                <div className="text-[11px] text-[#7E98A8] mt-1">
                  Compatibility Rating: <strong className="text-white">{selectedCandidate.compatibility_score.toFixed(1)} / 100</strong>
                </div>
              </div>

              {/* 7-Dimensional Horizontal Bars */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider font-semibold mb-2">
                  7-AXIS SCIENTIFIC PROFILE
                </div>
                {(Object.keys(selectedCandidate.compatibility_dimensions) as (keyof typeof selectedCandidate.compatibility_dimensions)[]).map((dim) => {
                  const val = selectedCandidate.compatibility_dimensions[dim];
                  const isHigh = val >= 7.0;
                  const isMid = val >= 4.0;
                  const barColor = isHigh ? 'bg-[#3E8F6B]' : isMid ? 'bg-[#C9902E]' : 'bg-[#B64A45]';

                  return (
                    <div key={dim} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#94A7B5] uppercase">{dim}</span>
                        <span className="text-white font-semibold">{val.toFixed(1)} / 10</span>
                      </div>
                      <div className="w-full bg-[#04121E] h-1 border border-white/10">
                        <div className={`h-full ${barColor}`} style={{ width: `${val * 10}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Warnings and Cautions */}
              {selectedCandidate.warnings && selectedCandidate.warnings.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[10px] text-[#C9902E] uppercase tracking-wider font-semibold mb-1.5">
                    CONSERVATION REMARKS
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-[#94A7B5] font-sans leading-relaxed">
                    {selectedCandidate.warnings.map((w, wIdx) => (
                      <li key={wIdx}>• {w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-[#7E98A8]">
              Select a material row to inspect physical-chemical compatibility.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
