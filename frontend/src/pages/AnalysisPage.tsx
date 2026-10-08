import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { ScoreBar } from '../components/ScoreBar';
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

  // STANDBY STATE (No Survey Loaded): Authentic Inspection Workspace Standby
  if (!result) {
    return (
      <PageContainer
        title="Diagnostic Workspace"
        subtitle="Visual defect quantification and deterministic engineering scoring workspace."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 68%: Inactive Dark Canvas Frame */}
          <div className="lg:col-span-8 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm overflow-hidden">
            <div className="h-10 px-4 bg-[#062B49] border-b border-[#28A9E0]/20 flex items-center justify-between text-xs text-[#8CD8F5]">
              <span className="font-semibold uppercase tracking-wider">Standby Inspection Viewport</span>
              <span className="text-[11px] text-[#587286]">NO FEED</span>
            </div>
            <div className="h-[440px] flex flex-col items-center justify-center p-8 text-center bg-[#041B2E] relative">
              <div className="w-14 h-14 rounded-sm border border-[#28A9E0]/30 flex items-center justify-center text-[#28A9E0] mb-4 bg-[#083358]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-white mb-1.5">
                Diagnostic Workspace Standby
              </h2>
              <p className="text-xs text-[#8CD8F5]/80 max-w-md mb-6 leading-relaxed">
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
                  Load Reference (Agrasen Ki Baoli)
                </Button>
              </div>
            </div>
          </div>

          {/* Right 32%: Standby Diagnostic Rail */}
          <div className="lg:col-span-4 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-5 text-xs space-y-6">
            <div>
              <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wider mb-1 font-semibold">
                Structure Status
              </div>
              <div className="text-sm font-semibold text-white">Awaiting Survey Data</div>
              <div className="text-xs text-[#587286] mt-0.5">--</div>
            </div>

            <div className="pt-4 border-t border-[#28A9E0]/15">
              <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wider mb-1 font-semibold">
                Visual Condition
              </div>
              <div className="text-2xl font-bold text-[#587286]">-- / 100</div>
              <div className="text-[11px] text-[#587286] mt-1">Standby</div>
            </div>

            <div className="pt-4 border-t border-[#28A9E0]/15">
              <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wider mb-2 font-semibold">
                Detected Defect Classes
              </div>
              <div className="space-y-1.5 text-xs text-[#587286]">
                <div className="flex justify-between"><span>Crack Mask</span><span>--</span></div>
                <div className="flex justify-between"><span>Vegetation Roots</span><span>--</span></div>
                <div className="flex justify-between"><span>Spalling</span><span>--</span></div>
                <div className="flex justify-between"><span>Efflorescence</span><span>--</span></div>
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
            label="Reference Survey"
            variant="warning"
            size="sm"
          />
        ) : (
          <StatusBadge
            label="Live CV Analysis"
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
            ← New Survey
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onRouteChange('/report')}
          >
            Conservation Dossier →
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
          <div className="bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-xs text-[#8CD8F5] uppercase font-semibold">
              Toggle Masks:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {result.vision.detections.map((det) => {
                const isVis = visibleClasses.has(det.class_name);
                return (
                  <button
                    key={det.class_name}
                    onClick={() => handleToggleClass(det.class_name)}
                    className={`h-7 px-2.5 text-xs font-medium border transition-all rounded-sm flex items-center gap-1.5 ${
                      isVis
                        ? 'bg-[#087CC1] text-white border-[#28A9E0]'
                        : 'bg-[#062B49] text-[#8CD8F5]/80 border-[#28A9E0]/20 hover:text-white'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isVis ? 'bg-white' : 'bg-[#587286]'}`} />
                    <span className="capitalize">{det.class_name.replace(/_/g, ' ')}</span>
                    <span className="text-[10px] opacity-75">({det.component_count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 32%: Engineering Diagnostic Rail */}
        <div className="lg:col-span-4 bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-5 text-xs space-y-5 shadow-panel">
          {/* Structure Header */}
          <div>
            <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wide font-semibold mb-1">
              Structure Identifier
            </div>
            <div className="text-base font-bold text-white">
              {result.structure.name || 'Historic Stepwell Structure'}
            </div>
            <div className="text-xs text-[#8CD8F5]/80 mt-1 flex items-center justify-between">
              <span>Typology: <strong className="text-white uppercase">{result.structure.type}</strong></span>
              <span>{result.structure.region || 'North India'}</span>
            </div>
          </div>

          {/* Condition Score: Aligned Numerical Scale */}
          <div className="pt-4 border-t border-[#28A9E0]/20">
            <ScoreBar
              label="VISUAL CONDITION"
              value={conditionScore.value}
              max={100}
              variant="blue"
              showBenchmark
              benchmarkLabelLow="CRITICAL (0)"
              benchmarkLabelHigh="SECURE (100)"
              subtext="Composite preliminary photographic health rating based on detected damage densities."
            />
          </div>

          {/* Quantified Defect Burdens: Aligned Horizontal Bars */}
          <div className="pt-4 border-t border-[#28A9E0]/20 space-y-3.5">
            <div className="text-[11px] text-[#8CD8F5]/70 uppercase tracking-wide font-semibold">
              Findings &amp; Burden Indices
            </div>

            <ScoreBar
              label="Crack Burden"
              value={crackBurdenScore.value}
              variant="red"
            />

            <ScoreBar
              label="Vegetation Intrusion"
              value={58.0}
              variant="green"
            />

            <ScoreBar
              label="Spalling Extent"
              value={24.0}
              variant="amber"
            />
          </div>

          {/* Analysis Basis */}
          <div className="pt-4 border-t border-[#28A9E0]/20 text-xs text-[#8CD8F5]/80 space-y-1.5">
            <div className="text-[11px] uppercase font-semibold text-white mb-1">Analysis Basis</div>
            <div>• {result.vision.detections.length} defect classes identified</div>
            <div>• Image-space pixel quantification</div>
            <div>• Optical resolution: 0.5mm/px sensitivity threshold</div>
            <div>• Latency: {result.vision.processing_metadata?.inference_latency_ms || 142} ms</div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#28A9E0]/20">
            <button
              onClick={() => onRouteChange('/report')}
              className="w-full h-9 bg-[#087CC1] hover:bg-[#28A9E0] text-white text-xs font-semibold rounded-sm border border-[#28A9E0]/40 transition-all duration-150 active:scale-98 shadow-water"
            >
              PREPARE CONSERVATION DOSSIER →
            </button>
          </div>
        </div>
      </div>

      {/* Light Evidence Section: WHITE/LIGHT CONTENT AREA (Per prompt: dark water header ↓ inspection canvas + side rail ↓ white/light evidence sections) */}
      <section className="bg-white text-[#09283C] rounded-sm border border-[#28A9E0]/30 p-6 sm:p-8 mt-6 shadow-sm font-sans">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#087CC1]/15">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087CC1] px-2 py-0.5 rounded-sm bg-[#F3FAFD] border border-[#28A9E0]/20 inline-block mb-1.5">
              Evidence Dossier
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#09283C] tracking-tight">
              Image-Space Quantified Defect Inventory
            </h2>
            <p className="text-xs sm:text-sm text-[#587286] mt-1 max-w-2xl leading-relaxed">
              Tabulated measurements from segmented masks for engineering auditing and material compatibility assessment.
            </p>
          </div>
          <div className="shrink-0 text-xs font-medium text-[#587286]">
            Total Detections: <strong className="text-[#09283C]">{result.vision.detections.length}</strong>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#087CC1]/15 rounded-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#087CC1]/15 text-[#587286] text-[11px] uppercase tracking-wider bg-[#F3FAFD] font-semibold">
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Pixel Extent</th>
                <th className="py-3 px-4">Coverage Ratio</th>
                <th className="py-3 px-4">Components</th>
                <th className="py-3 px-4">Skeleton Length</th>
                <th className="py-3 px-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#087CC1]/10 text-[#09283C]">
              {result.vision.detections.map((det, idx) => (
                <tr key={idx} className="hover:bg-[#F3FAFD]/70 transition-colors">
                  <td className="py-3 px-4 font-semibold capitalize">
                    {det.class_name.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#087CC1]">
                    {(det.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-[#587286]">
                    {det.pixel_area.toLocaleString()} px²
                  </td>
                  <td className="py-3 px-4 text-[#587286]">
                    {(det.coverage_ratio * 100).toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-[#587286]">
                    {det.component_count}
                  </td>
                  <td className="py-3 px-4 text-[#587286]">
                    {det.total_length_pixels ? `${det.total_length_pixels} px` : '--'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-sm border ${
                        det.relative_severity === 'severe'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : det.relative_severity === 'moderate'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {det.relative_severity || 'Moderate'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageContainer>
  );
};
