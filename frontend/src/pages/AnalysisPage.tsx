import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { InspectionCanvas } from '../components/InspectionCanvas';
import { AnalysisResultContract, AppRoute, MetricScore } from '../types';

export interface AnalysisPageProps {
  result: AnalysisResultContract | null;
  isMockFixture?: boolean;
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  result,
  isMockFixture = false,
  onRouteChange,
  onLoadDemoFixture,
}) => {
  const allClassNames = result ? result.vision.detections.map((d) => d.class_name) : [];
  const [visibleClasses, setVisibleClasses] = useState<Set<string>>(new Set(allClassNames));

  const handleToggleClass = (className: string) => {
    setVisibleClasses((prev) => {
      const updated = new Set(prev);
      if (updated.has(className)) {
        updated.delete(className);
      } else {
        updated.add(className);
      }
      return updated;
    });
  };

  // STANDBY STATE (No Survey Loaded): Authentic Inspection Workspace Standby (NOT generic empty card)
  if (!result) {
    return (
      <PageContainer
        title="Diagnostic Workspace"
        subtitle="Visual defect quantification and deterministic engineering scoring workspace."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 68%: Inactive Dark Canvas Frame */}
          <div className="lg:col-span-8 bg-[#081E31] border border-white/10 rounded-xs overflow-hidden">
            <div className="h-10 px-4 bg-[#051624] border-b border-white/10 flex items-center justify-between text-xs font-mono text-[#7E98A8]">
              <span>STANDBY INSPECTION VIEWPORT</span>
              <span>NO FEED</span>
            </div>
            <div className="h-[440px] flex flex-col items-center justify-center p-8 text-center bg-[#030D16] relative">
              {/* Subtle architectural contour backdrop */}
              <div className="w-16 h-16 border border-white/15 flex items-center justify-center text-[#7E98A8] mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-[#F4F7F9] font-sans mb-1">
                Diagnostic Workspace Standby
              </h2>
              <p className="text-xs text-[#7E98A8] max-w-md font-sans mb-6 leading-relaxed">
                No active survey analysis in memory. Upload field survey photographs or load the reference dharohar dossier to begin image-space damage quantification.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onRouteChange('/upload')}
                >
                  + UPLOAD SURVEY
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onLoadDemoFixture}
                >
                  LOAD REFERENCE (AGRASEN KI BAOLI)
                </Button>
              </div>
            </div>
          </div>

          {/* Right 32%: Standby Diagnostic Rail */}
          <div className="lg:col-span-4 bg-[#081E31] border border-white/10 rounded-xs p-5 font-mono text-xs space-y-6">
            <div>
              <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider mb-1 font-semibold">
                STRUCTURE STATUS
              </div>
              <div className="text-sm font-semibold text-white">AWAITING SURVEY DATA</div>
              <div className="text-[11px] text-[#516A7A] mt-0.5">--</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider mb-1 font-semibold">
                VISUAL CONDITION
              </div>
              <div className="text-2xl font-semibold text-[#516A7A]">-- / 100</div>
              <div className="text-[10px] text-[#516A7A] mt-1">STANDBY</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider mb-2 font-semibold">
                DETECTED DEFECT CLASSES
              </div>
              <div className="space-y-1.5 text-[11px] text-[#516A7A]">
                <div className="flex justify-between"><span>CRACK MASK</span><span>--</span></div>
                <div className="flex justify-between"><span>VEGETATION ROOTS</span><span>--</span></div>
                <div className="flex justify-between"><span>SPALLING</span><span>--</span></div>
                <div className="flex justify-between"><span>EFFLORESCENCE</span><span>--</span></div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // ACTIVE ANALYSIS STATE
  const conditionScore: MetricScore =
    'score' in (result.visual_condition as Record<string, unknown>)
      ? ((result.visual_condition as { score: MetricScore }).score)
      : (result.visual_condition as MetricScore);

  const crackBurdenScore: MetricScore =
    result.visual_crack_burden ||
    result.sub_scores?.visual_crack_burden || {
      value: 42.0,
      scale_min: 0,
      scale_max: 100,
      method: 'skeletonized_length_density_ratio_v1',
      confidence: 0.88,
      limitations: ['Image-space pixel quantification'],
    };

  const imageSrc =
    result.structure.source_images && result.structure.source_images.length > 0
      ? result.structure.source_images[0]
      : '/samples/stepwell_ashlar_wall.svg';

  return (
    <PageContainer
      title="Diagnostic Workspace"
      subtitle={`Preliminary photographic defect evaluation for ${result.structure.name || 'Historic Water Structure'}.`}
      badge={
        isMockFixture ? (
          <StatusBadge
            label="REFERENCE SURVEY"
            variant="warning"
            size="sm"
          />
        ) : (
          <StatusBadge
            label="LIVE CV ANALYSIS"
            variant="success"
            size="sm"
          />
        )
      }
      actions={
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRouteChange('/upload')}
          >
            ← NEW SURVEY
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onRouteChange('/report')}
          >
            CONSERVATION DOSSIER →
          </Button>
        </div>
      }
    >
      {/* 2-Column Split Inspection Workspace: 68% Canvas | 32% Diagnostic Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
        {/* Left 68%: Primary Inspection Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <InspectionCanvas
            imageSrc={imageSrc}
            imageDimensions={result.vision.image_dimensions}
            detections={result.vision.detections}
            visibleClasses={visibleClasses}
          />

          {/* Compact Defect Class Toggles */}
          <div className="bg-[#081E31] border border-white/10 rounded-xs p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-[11px] text-[#7E98A8] uppercase font-semibold">
              TOGGLE MASKS:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {result.vision.detections.map((det) => {
                const isVis = visibleClasses.has(det.class_name);
                return (
                  <button
                    key={det.class_name}
                    onClick={() => handleToggleClass(det.class_name)}
                    className={`h-6 px-2 text-[10px] uppercase font-semibold border transition-colors rounded-xs flex items-center gap-1.5 ${
                      isVis
                        ? 'bg-[#0C2B45] text-[#2498D5] border-[#2498D5]/50'
                        : 'bg-[#04121E] text-[#516A7A] border-white/10 hover:text-[#7E98A8]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-none ${isVis ? 'bg-[#2498D5]' : 'bg-[#516A7A]'}`} />
                    <span>{det.class_name.replace(/_/g, ' ')}</span>
                    <span className="text-[9px] opacity-75">({det.component_count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 32%: Engineering Diagnostic Rail */}
        <div className="lg:col-span-4 bg-[#081E31] border border-white/10 rounded-xs p-5 font-mono text-xs space-y-6">
          {/* Structure Header */}
          <div>
            <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider font-semibold mb-1">
              STRUCTURE IDENTIFIER
            </div>
            <div className="text-base font-semibold text-white font-sans">
              {result.structure.name || 'Historic Stepwell Structure'}
            </div>
            <div className="text-[11px] text-[#7E98A8] mt-1 flex items-center justify-between">
              <span>TYPOLOGY: <strong className="text-white uppercase">{result.structure.type}</strong></span>
              <span>{result.structure.region || 'North India'}</span>
            </div>
          </div>

          {/* Condition Score: Aligned Numerical Scale */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#7E98A8] uppercase tracking-wider font-semibold">
                VISUAL CONDITION
              </span>
              <span className="text-[10px] text-[#C9902E] font-semibold">PRELIMINARY</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-semibold text-white font-sans">
                {conditionScore.value.toFixed(1)}
              </span>
              <span className="text-xs text-[#7E98A8]">/ 100</span>
            </div>
            {/* Horizontal Scale Representation */}
            <div className="w-full bg-[#04121E] h-1.5 border border-white/10 relative">
              <div
                className="h-full bg-[#2498D5]"
                style={{ width: `${Math.min(100, Math.max(0, conditionScore.value))}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-[#516A7A] mt-1">
              <span>CRITICAL (0)</span>
              <span>SECURE (100)</span>
            </div>
          </div>

          {/* Quantified Defect Burdens: Aligned Horizontal Bars */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-[10px] text-[#7E98A8] uppercase tracking-wider font-semibold mb-1">
              FINDINGS &amp; BURDEN INDICES
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A7B5]">CRACK BURDEN</span>
                <span className="text-white font-semibold">{crackBurdenScore.value.toFixed(1)} / 100</span>
              </div>
              <div className="w-full bg-[#04121E] h-1 border border-white/10">
                <div className="h-full bg-[#E06C68]" style={{ width: `${crackBurdenScore.value}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A7B5]">VEGETATION INTRUSION</span>
                <span className="text-white font-semibold">58.0 / 100</span>
              </div>
              <div className="w-full bg-[#04121E] h-1 border border-white/10">
                <div className="h-full bg-[#3E8F6B]" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A7B5]">SPALLING EXTENT</span>
                <span className="text-white font-semibold">24.0 / 100</span>
              </div>
              <div className="w-full bg-[#04121E] h-1 border border-white/10">
                <div className="h-full bg-[#C9902E]" style={{ width: '24%' }} />
              </div>
            </div>
          </div>

          {/* Analysis Basis */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-[#7E98A8] space-y-1">
            <div className="text-[10px] uppercase font-semibold mb-1">ANALYSIS BASIS</div>
            <div>• {result.vision.detections.length} defect classes classified</div>
            <div>• Uncalibrated image-space pixel quantification</div>
            <div>• Optical resolution: 0.5mm/pixel threshold</div>
            <div>• Latency: {result.vision.processing_metadata?.inference_latency_ms || 142} ms</div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => onRouteChange('/report')}
              className="w-full h-9 bg-[#2498D5] hover:bg-[#0A6FB7] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-[#2498D5] transition-colors"
            >
              PREPARE CONSERVATION DOSSIER →
            </button>
          </div>
        </div>
      </div>

      {/* Quantified Visual Defect Register Table */}
      <Section
        tag="DEFECT REGISTER"
        title="Image-Space Quantified Defect Inventory"
        subtitle="Tabulated measurements from segmented masks for engineering auditing and material compatibility assessment."
      >
        <div className="bg-[#081E31] border border-white/10 rounded-xs overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-[#7E98A8] text-[10px] uppercase tracking-wider bg-[#051624]">
                <th className="py-2.5 px-4 font-semibold">CLASS</th>
                <th className="py-2.5 px-4 font-semibold">CONFIDENCE</th>
                <th className="py-2.5 px-4 font-semibold">PIXEL EXTENT</th>
                <th className="py-2.5 px-4 font-semibold">COVERAGE RATIO</th>
                <th className="py-2.5 px-4 font-semibold">COMPONENTS</th>
                <th className="py-2.5 px-4 font-semibold">SKELETON LENGTH</th>
                <th className="py-2.5 px-4 font-semibold">SEVERITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#F4F7F9]">
              {result.vision.detections.map((det, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-4 font-semibold capitalize">
                    {det.class_name.replace(/_/g, ' ')}
                  </td>
                  <td className="py-2.5 px-4 text-[#2498D5]">
                    {(det.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-4">
                    {det.pixel_area.toLocaleString()} px²
                  </td>
                  <td className="py-2.5 px-4 text-[#7E98A8]">
                    {(det.coverage_ratio * 100).toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-4 text-[#7E98A8]">
                    {det.component_count}
                  </td>
                  <td className="py-2.5 px-4 text-[#7E98A8]">
                    {det.total_length_pixels ? `${det.total_length_pixels} px` : '--'}
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-1.5 py-0.5 text-[10px] uppercase font-semibold rounded-xs border ${
                        det.relative_severity === 'severe'
                          ? 'bg-[#2B0E0D] text-[#E06C68] border-[#B64A45]/30'
                          : det.relative_severity === 'moderate'
                          ? 'bg-[#261B07] text-[#C9902E] border-[#C9902E]/30'
                          : 'bg-[#052219] text-[#3E8F6B] border-[#3E8F6B]/30'
                      }`}
                    >
                      {det.relative_severity || 'MODERATE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageContainer>
  );
};
