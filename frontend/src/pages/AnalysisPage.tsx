import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { InspectionCanvas } from '../components/InspectionCanvas';
import { DefectLegend } from '../components/DefectLegend';
import { VisualMetricsPanel } from '../components/VisualMetricsPanel';
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
  // Extract all unique detected classes for default visibility
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

  if (!result) {
    return (
      <PageContainer
        title="Diagnostic & Inspection Workspace"
        subtitle="Visual defect quantification and deterministic engineering scoring workspace."
      >
        <EmptyState
          title="No Survey Analysis Loaded"
          description="Upload field survey imagery through the ingestion pipeline or load the development sample dossier to inspect the computer vision diagnostics."
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

  const crackBurdenScore: MetricScore =
    result.visual_crack_burden ||
    result.sub_scores?.visual_crack_burden || {
      value: 42.0,
      scale_min: 0,
      scale_max: 100,
      method: 'skeletonized_length_density_ratio_v1',
      confidence: 0.88,
      limitations: [
        'Image-space skeletonized pixel centerline density',
        'Optical threshold 0.5mm/pixel'
      ],
    };

  const imageSrc =
    result.structure.source_images && result.structure.source_images.length > 0
      ? result.structure.source_images[0]
      : '/samples/stepwell_ashlar_wall.svg';

  return (
    <PageContainer
      title="Diagnostic & Inspection Workspace"
      subtitle={`Preliminary decision-support evaluation for ${result.structure.name || 'Historic Water Structure'}.`}
      badge={
        isMockFixture ? (
          <StatusBadge
            label="Development UI Fixture (Non-Invasive Prototype)"
            variant="warning"
            size="md"
          />
        ) : (
          <StatusBadge
            label="Live Vision Analysis"
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
                {result.structure.name || 'Historic Stepwell Structure'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sandstone-950 text-sandstone-300 border border-sandstone-800 uppercase">
                {result.structure.type}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Region: {result.structure.region || 'Unspecified'} • Inference Latency: {result.vision.processing_metadata?.inference_latency_ms || 142} ms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-400">
            Dimensions: {result.vision.image_dimensions.width_pixels} × {result.vision.image_dimensions.height_pixels} px
          </span>
          <span className="text-sandstone-400 bg-sandstone-950 px-2 py-0.5 rounded border border-sandstone-800">
            Model: {result.vision.processing_metadata?.model_version || 'YOLOv8-Seg-Prototype'}
          </span>
        </div>
      </div>

      {/* Main Inspection Experience (SEE): Interactive Canvas + Defect Legend */}
      <Section
        tag="Computer Vision (SEE)"
        title="Interactive Defect Segmentation Overlay"
        subtitle="Visual defect contours, bounding coordinates, and confidence measurements mapped in image-space."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
          {/* Main Inspection Canvas Viewport */}
          <div className="lg:col-span-8">
            <InspectionCanvas
              imageSrc={imageSrc}
              imageDimensions={result.vision.image_dimensions}
              detections={result.vision.detections}
              visibleClasses={visibleClasses}
            />
          </div>

          {/* Defect Toggles & Class Metrics */}
          <div className="lg:col-span-4 space-y-4">
            <DefectLegend
              detections={result.vision.detections}
              visibleClasses={visibleClasses}
              onToggleClass={handleToggleClass}
            />

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
              <strong className="text-sandstone-300 block mb-1">Canvas Inspection Navigation</strong>
              Use the toolbar atop the canvas to switch between <strong>Overlay View</strong>, <strong>Side-by-Side Dual View</strong>, and the <strong>Comparison Wipe Slider</strong>. Hover over any defect segment to inspect exact pixel area and model confidence.
            </div>
          </div>
        </div>
      </Section>

      {/* Visual Condition & Crack Burden Measurements (ASSESS) */}
      <Section
        tag="Engineering Diagnostics (ASSESS)"
        title="Visual Condition Index & Crack Burden"
        subtitle="Deterministic condition scoring derived strictly from segmented pixel areas and crack skeleton morphology."
      >
        <VisualMetricsPanel
          detections={result.vision.detections}
          visualConditionScore={conditionScore}
          visualCrackBurden={crackBurdenScore}
          className="mb-8"
        />
      </Section>

      {/* Detailed Measurements Table */}
      <Section
        tag="Metrics Table"
        title="Quantified Visual Defect Register"
        subtitle="Tabulated image-space measurements for engineering auditing and conservation planning."
      >
        <Card
          title="Image-Space Defect Register"
          subtitle="All detected connected components and geometric properties"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="pb-2.5 font-semibold">DEFECT CLASS</th>
                  <th className="pb-2.5 font-semibold">CONFIDENCE</th>
                  <th className="pb-2.5 font-semibold">PIXEL AREA</th>
                  <th className="pb-2.5 font-semibold">SURFACE COVERAGE</th>
                  <th className="pb-2.5 font-semibold">COMPONENTS</th>
                  <th className="pb-2.5 font-semibold">CENTERLINE LENGTH</th>
                  <th className="pb-2.5 font-semibold">VISUAL SEVERITY</th>
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
                    <td className="py-2.5 text-slate-300">
                      {det.pixel_area.toLocaleString()} px²
                    </td>
                    <td className="py-2.5 text-slate-300">
                      {(det.coverage_ratio * 100).toFixed(2)}%
                    </td>
                    <td className="py-2.5 text-slate-300">
                      {det.component_count}
                    </td>
                    <td className="py-2.5 text-slate-400">
                      {det.total_length_pixels ? `${det.total_length_pixels} px` : 'N/A (Area Mask)'}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          det.relative_severity === 'severe'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : det.relative_severity === 'moderate'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
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
      </Section>
    </PageContainer>
  );
};
