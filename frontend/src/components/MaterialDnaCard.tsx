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
    <div className={`space-y-6 font-sans ${className}`}>
      {/* Institutional Laboratory Validation Notice */}
      {material.verification_required && (
        <div className="py-2.5 px-4 bg-[#083358]/90 border-l-3 border-l-[#E08A1E] border-y border-r border-[#28A9E0]/20 rounded-sm text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#E08A1E] font-semibold uppercase tracking-wider text-[11px]">
                Laboratory Verification Required
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="text-[#DDF6FC]/85">
                Inferred substrate: <strong className="text-white uppercase">{material.original_material.replace(/_/g, ' ')}</strong> (Confidence: {(material.original_material_confidence * 100).toFixed(0)}%). Petrographic thin-section and XRD confirmation required prior to intervention.
              </span>
            </div>
            <span className="text-[11px] text-[#8CD8F5]/80 shrink-0 font-medium">ASI / Venice Charter</span>
          </div>
        </div>
      )}

      {/* Split Comparison Workspace: 65% Comparison Table | 35% Material Detail Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 65%: Engineering Material Comparison Table */}
        <div className="lg:col-span-8 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm overflow-hidden shadow-sm">
          <div className="h-10 px-4 bg-[#062B49] border-b border-[#28A9E0]/20 flex items-center justify-between text-xs text-[#8CD8F5]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Material Compatibility Register
            </span>
            <span className="text-[11px] text-[#8CD8F5]/70">Click row to inspect 7D profile</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#28A9E0]/20 text-[#8CD8F5] text-[11px] uppercase tracking-wider bg-[#062B49]/60 font-semibold">
                  <th className="py-3 px-4">Candidate Material</th>
                  <th className="py-3 px-4">Compatibility</th>
                  <th className="py-3 px-4">Moisture</th>
                  <th className="py-3 px-4">Heritage</th>
                  <th className="py-3 px-4">Reversible</th>
                  <th className="py-3 px-4">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#28A9E0]/15 text-white">
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
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#087CC1]/25 border-l-2 border-l-[#28A9E0]'
                          : 'hover:bg-[#062B49]/60'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold capitalize">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#28A9E0]' : 'bg-transparent'}`} />
                          <span>{cand.intervention_material.replace(/_/g, ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-semibold ${isProhibited ? 'text-[#D3455B]' : 'text-[#2E8B57]'}`}>
                            {cand.compatibility_score.toFixed(1)}
                          </span>
                          <span className="text-[11px] text-[#8CD8F5]/70">/100</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#8CD8F5]/80">
                        {moistureVal >= 7 ? 'High' : moistureVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4 text-[#8CD8F5]/80">
                        {heritageVal >= 7 ? 'High' : heritageVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4 text-[#8CD8F5]/80">
                        {reversibilityVal >= 7 ? 'High' : reversibilityVal >= 4 ? 'Moderate' : 'Low'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded-xs border ${
                            isProhibited
                              ? 'bg-[#D3455B]/15 text-[#D3455B] border-[#D3455B]/30'
                              : 'bg-[#2E8B57]/15 text-[#2E8B57] border-[#2E8B57]/30'
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
        <div className="lg:col-span-4 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-5 text-xs space-y-5 shadow-panel">
          {selectedCandidate ? (
            <>
              <div>
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wide font-semibold mb-1">
                  Intervention Detail
                </div>
                <h3 className="text-base font-bold text-white capitalize">
                  {selectedCandidate.intervention_material.replace(/_/g, ' ')}
                </h3>
                <div className="text-xs text-[#8CD8F5] mt-1">
                  Compatibility Rating: <strong className="text-white">{selectedCandidate.compatibility_score.toFixed(1)} / 100</strong>
                </div>
              </div>

              {/* 7-Dimensional Horizontal Bars */}
              <div className="pt-4 border-t border-[#28A9E0]/20 space-y-2.5">
                <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wide font-semibold mb-2">
                  7-Axis Scientific Profile
                </div>
                {(Object.keys(selectedCandidate.compatibility_dimensions) as (keyof typeof selectedCandidate.compatibility_dimensions)[]).map((dim) => {
                  const val = selectedCandidate.compatibility_dimensions[dim];
                  const isHigh = val >= 7.0;
                  const isMid = val >= 4.0;
                  const barColor = isHigh ? 'bg-[#2E8B57]' : isMid ? 'bg-[#E08A1E]' : 'bg-[#D3455B]';

                  return (
                    <div key={dim} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#8CD8F5] uppercase tracking-wide">{dim}</span>
                        <span className="text-white font-semibold">{val.toFixed(1)} / 10</span>
                      </div>
                      <div className="w-full bg-[#062B49] h-1.5 border border-[#28A9E0]/20 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor}`} style={{ width: `${val * 10}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Warnings and Cautions */}
              {selectedCandidate.warnings && selectedCandidate.warnings.length > 0 && (
                <div className="pt-4 border-t border-[#28A9E0]/20">
                  <div className="text-[11px] text-[#E08A1E] uppercase tracking-wide font-semibold mb-1.5">
                    Conservation Remarks
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#8CD8F5]/85 leading-relaxed">
                    {selectedCandidate.warnings.map((w, wIdx) => (
                      <li key={wIdx}>• {w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-[#8CD8F5]/70">
              Select a material row to inspect physical-chemical compatibility.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
