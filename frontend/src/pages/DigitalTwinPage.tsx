import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { DigitalTwinViewer } from '../components/DigitalTwinViewer';
import { AppRoute, AnalysisResultContract } from '../types';

export interface DigitalTwinPageProps {
  result: AnalysisResultContract | null;
  onRouteChange: (route: AppRoute) => void;
}

export const DigitalTwinPage: React.FC<DigitalTwinPageProps> = ({
  result,
  onRouteChange,
}) => {
  return (
    <PageContainer
      title="3D Digital Twin & Before/After Conservation Simulation"
      subtitle={`Interactive spatial twin of ${result?.structure.name || 'Historic Stepwell Structure'} with defect hotspot projection and real-time intervention simulation.`}
      badge={
        <StatusBadge
          label="Three.js Digital Twin Active"
          variant="jal"
          size="md"
        />
      }
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRouteChange('/analysis')}
          >
            ← 2D Diagnostics
          </Button>
          <Button
            variant="sandstone"
            size="sm"
            onClick={() => onRouteChange('/report')}
          >
            Conservation Dossier →
          </Button>
        </div>
      }
    >
      {/* 3D Digital Twin Viewport & Controls */}
      <DigitalTwinViewer
        className="mb-8"
        onNavigateReport={() => onRouteChange('/report')}
      />

      {/* Feature & Demonstration Explanations */}
      <Section
        title="Digital Twin Spatial Intelligence"
        tag="3D Conservation Features"
        subtitle="Interactive spatial twin uniting computer vision defect anchors with hydrodynamic restoration simulation."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            borderAccent="sandstone"
            title="3D Spatial Hotspot Anchoring"
            subtitle="Precision coordinate projection on stepwell geometry"
          >
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              Surface defects detected via 2D computer vision (SEE) are spatially anchored onto 3D stepwell coordinates. Each hotspot encodes pixel extent, confidence, and degradation status.
            </p>
            <div className="text-[11px] font-mono text-sandstone-300 bg-slate-900/80 p-2 rounded border border-slate-800">
              Model: GLTF 2.0 / PBR Materials
            </div>
          </Card>

          <Card
            borderAccent="jal"
            title="Dynamic Before vs. After Simulation"
            subtitle="Real-time visualization of conservation outcomes"
          >
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              Toggle between the baseline survey condition and the post-intervention consolidated state. Observe vegetation extraction, inlet clearing, and subterranean aquifer recharge.
            </p>
            <div className="text-[11px] font-mono text-jal-300 bg-slate-900/80 p-2 rounded border border-slate-800">
              Backend Orchestrated Simulation
            </div>
          </Card>

          <Card
            borderAccent="surkhi"
            title="Interactive Restoration Controls"
            subtitle="Evidence-based scenario evaluation"
          >
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              Execute targeted interventions (Clear Vegetation, Restore Inlet, Desilt Basin, Restore Catchment) and receive live updated engineering scores without manual calculation.
            </p>
            <div className="text-[11px] font-mono text-surkhi-300 bg-slate-900/80 p-2 rounded border border-slate-800">
              Zero Frontend Score Duplication
            </div>
          </Card>
        </div>
      </Section>
    </PageContainer>
  );
};
