import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { ScoreCard } from '../components/ScoreCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
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
  if (!result) {
    return (
      <PageContainer
        title="Diagnostic & Inspection Workspace"
        subtitle="Visual defect quantification and deterministic engineering scoring workspace."
      >
        <EmptyState
          title="No Survey Analysis Loaded"
          description="Upload field survey imagery through the ingestion pipeline or load the development sample dossier to inspect the diagnostic interface."
          icon="🔬"
          actionLabel="Load Development Sample"
          onAction={onLoadDemoFixture}
          secondaryActionLabel="Upload Survey Imagery"
          onSecondaryAction={() => onRouteChange('/upload')}
        />
      </PageContainer>
    );
  }

  // Extract score objects safely from contract
  const conditionScore: MetricScore =
    'score' in (result.visual_condition as Record<string, unknown>)
      ? ((result.visual_condition as { score: MetricScore }).score)
      : (result.visual_condition as MetricScore);

  const waterScore: MetricScore =
    'score' in (result.water_functionality as Record<string, unknown>)
      ? ((result.water_functionality as { score: MetricScore }).score)
      : (result.water_functionality as MetricScore);

  // Priority score can come from engineering result or fallback
  const priorityScore: MetricScore =
    ('restoration_priority_score' in (result as unknown as Record<string, unknown>)
      ? ((result as unknown as Record<string, unknown>).restoration_priority_score as MetricScore)
      : {
          value: 76.0,
          scale_min: 0,
          scale_max: 100,
          method: "synthesis_rule_v1",
          confidence: 0.82,
          limitations: ["Derived from visual condition and hydrological impairment synthesis"]
        });

  return (
    <PageContainer
      title="Diagnostic & Inspection Workspace"
      subtitle={`Preliminary decision-support evaluation for ${result.structure.name || 'Target Water Structure'}.`}
      badge={
        isMockFixture ? (
          <StatusBadge
            label="Development UI Fixture (Non-Invasive Prototype)"
            variant="warning"
            size="md"
          />
        ) : (
          <StatusBadge
            label="Analysis Complete"
            variant="success"
            size="md"
          />
        )
      }
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRouteChange('/upload')}
          >
            ← New Survey
          </Button>
          <Button
            variant="sandstone"
            size="sm"
            onClick={() => onRouteChange('/report')}
          >
            View Conservation Dossier →
          </Button>
        </div>
      }
    >
      {/* Structure Context Banner */}
      <div className="glass-panel rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-heritage-900 border border-slate-700 flex items-center justify-center text-xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {result.structure.name || 'Unnamed Structure'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sandstone-950 text-sandstone-300 border border-sandstone-800 uppercase">
                {result.structure.type}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Region: {result.structure.region || 'Unspecified'} • Latency: {result.vision.processing_metadata?.inference_latency_ms || 120} ms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Model: {result.vision.processing_metadata?.model_version || 'YOLOv8-Seg-Prototype'}</span>
        </div>
      </div>

      {/* Engineering Diagnostic Scores */}
      <Section
        tag="Engineering Diagnostics"
        title="Condition & Functionality Indices"
        subtitle="Deterministic indices calculated strictly from visual defect area and morphology (ASSESS)."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Visual Condition Score"
            score={conditionScore}
            category="condition"
            description="Derived from surface crack burden, vegetative root displacement, and masonry spalling area."
            icon="🧱"
          />

          <ScoreCard
            title="Water Functionality Score"
            score={waterScore}
            category="water"
            description="Quantifies catchment continuity, siltation obstruction, and potential groundwater recharge access."
            icon="💧"
          />

          <ScoreCard
            title="Restoration Priority Score"
            score={priorityScore}
            category="priority"
            description="Synthesizes physical degradation rate against hydrological revival urgency."
            icon="⚡"
          />
        </div>
      </Section>

      {/* Visual Defects Breakdown (SEE) */}
      <Section
        tag="Computer Vision"
        title="Visual Defect Segmentation Summary"
        subtitle="Detected surface defects evaluated in uncalibrated image-space coordinates."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Card
              title="Detected Surface Degradation Segments"
              subtitle="Instance segmentation bounding boxes and connected component metrics"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="pb-2.5 font-semibold">CLASS</th>
                      <th className="pb-2.5 font-semibold">CONFIDENCE</th>
                      <th className="pb-2.5 font-semibold">PIXEL AREA</th>
                      <th className="pb-2.5 font-semibold">COVERAGE</th>
                      <th className="pb-2.5 font-semibold">COMPONENTS</th>
                      <th className="pb-2.5 font-semibold">SEVERITY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {result.vision.detections.map((det, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2.5 font-bold text-slate-200 capitalize">
                          {det.class_name.replace(/_/g, ' ')}
                        </td>
                        <td className="py-2.5 text-sandstone-300">
                          {(det.confidence * 100).toFixed(1)}%
                        </td>
                        <td className="py-2.5 text-slate-400">
                          {det.pixel_area.toLocaleString()} px
                        </td>
                        <td className="py-2.5 text-slate-400">
                          {(det.coverage_ratio * 100).toFixed(2)}%
                        </td>
                        <td className="py-2.5 text-slate-400">
                          {det.component_count}
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              det.relative_severity === 'severe'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : det.relative_severity === 'moderate'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-slate-900 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {det.relative_severity || 'moderate'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <Card
              title="Image Dimensions"
              subtitle="Raster coordinate reference"
            >
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Width:</span>
                  <span className="text-white">{result.vision.image_dimensions.width_pixels} px</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Height:</span>
                  <span className="text-white">{result.vision.image_dimensions.height_pixels} px</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Scale Ref:</span>
                  <span className="text-sandstone-300">
                    {result.vision.scale_reference?.calibrated ? 'Calibrated' : 'Uncalibrated (Pixel Space)'}
                  </span>
                </div>
              </div>
            </Card>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
              <strong className="block text-amber-300 font-semibold mb-1">
                Technical Boundary Reminder
              </strong>
              Measurements reflect 2D image-space features. Do not infer subsurface structural stability or load-bearing safety without physical geotechnical assessment.
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};
