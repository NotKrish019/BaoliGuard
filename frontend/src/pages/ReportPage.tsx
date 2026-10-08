import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { ConservationChain } from '../components/ConservationChain';
import { MaterialDnaCard } from '../components/MaterialDnaCard';
import { WhyThisRecommendation } from '../components/WhyThisRecommendation';
import { RootCauseAnalysisCard } from '../components/RootCauseAnalysisCard';
import { RestorationRoadmap } from '../components/RestorationRoadmap';
import { AnalysisResultContract, AppRoute, RootCauseItem } from '../types';

export interface ReportPageProps {
  result: AnalysisResultContract | null;
  isMockFixture?: boolean;
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export type ReportTab = 'all' | 'chain' | 'material' | 'why' | 'root_cause' | 'roadmap';

export const ReportPage: React.FC<ReportPageProps> = ({
  result,
  isMockFixture = false,
  onRouteChange,
  onLoadDemoFixture,
}) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('all');

  if (!result) {
    return (
      <PageContainer
        title="Conservation Dossier & Action Plan"
        subtitle="Comprehensive IKS material compatibility and phased restoration roadmap."
      >
        <EmptyState
          title="No Survey Dossier Available"
          description="A survey must be inspected first to synthesize the IKS material compatibility assessment and phased restoration roadmap."
          icon="📜"
          actionLabel="Load Development Sample Dossier"
          onAction={onLoadDemoFixture}
          secondaryActionLabel="Upload New Survey"
          onSecondaryAction={() => onRouteChange('/upload')}
        />
      </PageContainer>
    );
  }

  // Safely extract root cause items from contract
  const rootCauses: RootCauseItem[] = Array.isArray(result.root_cause)
    ? (result.root_cause as RootCauseItem[])
    : [
        {
          finding: 'Vegetation root expansion along primary ashlar masonry bed joints',
          probable_cause: 'Mortar loss from historic unmaintained joints followed by seed germination in microclimatic dampness',
          evidence_rules: [
            'Root intrusion connected to visible bedding joint line',
            'Displaced sandstone facing stones localized to root clusters',
          ],
          urgency: 'critical',
        },
        {
          finding: 'Efflorescence and sub-surface salt spalling at lower basin tier',
          probable_cause: 'Intermittent ground moisture rising through capillary action without evaporation relief due to debris accumulation',
          evidence_rules: ['Defects concentrated within 1.5m above current sediment line'],
          urgency: 'high',
        },
      ];

  const primaryDamage = result.vision.detections[0]?.class_name?.replace(/_/g, ' ') || 'Ashlar Joint Loss';
  const primaryAction = result.restoration.prioritized_actions[0]?.action_title || 'Non-destructive vegetation extraction';

  return (
    <PageContainer
      title="Conservation Dossier & Action Plan"
      subtitle={`Evidence-based restoration roadmap & IKS material compatibility for ${result.structure.name || 'Historic Water Structure'}.`}
      badge={
        isMockFixture ? (
          <StatusBadge
            label="Development Sample Dossier"
            variant="sandstone"
            size="md"
          />
        ) : (
          <StatusBadge
            label="Conservation Dossier"
            variant="success"
            size="md"
          />
        )
      }
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            🖨️ Export Dossier (PDF)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRouteChange('/analysis')}
          >
            ← Diagnostic Workspace
          </Button>
        </div>
      }
    >
      {/* Dossier Section Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
        {[
          { id: 'all', label: 'Complete Dossier' },
          { id: 'chain', label: '1. Causal Chain' },
          { id: 'material', label: '2. IKS Material DNA' },
          { id: 'why', label: '3. Why This Recommendation?' },
          { id: 'root_cause', label: '4. Root Cause Analysis' },
          { id: 'roadmap', label: '5. Phased Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as ReportTab)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-sandstone-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Core Conservation Narrative Chain */}
      {(activeTab === 'all' || activeTab === 'chain') && (
        <Section
          tag="Causal Lineage"
          title="Diagnostic & Conservation Narrative Chain"
          subtitle="Showing the step-by-step lineage from visible observation to traditional knowledge and minimum-intervention action."
        >
          <ConservationChain
            damageFinding={`Observed ${primaryDamage} on historic masonry face`}
            probableCause={rootCauses[0]?.probable_cause}
            traditionalPrinciple="Aparajitaprccha vapor-permeability & flexible hydraulic lime cohesion"
            materialMatch={`Original: ${result.material.original_material.replace(/_/g, ' ')}`}
            actionTitle={primaryAction}
            className="mb-10"
          />
        </Section>
      )}

      {/* 2. IKS Material DNA & 7-Dimensional Compatibility */}
      {(activeTab === 'all' || activeTab === 'material') && (
        <Section
          tag="IKS Material DNA"
          title="Substrate Characterization & Multi-Dimensional Compatibility"
          subtitle="Evaluating candidate conservation materials against the authentic historical fabric across 7 distinct physical-chemical axes."
        >
          <MaterialDnaCard
            material={result.material}
            className="mb-10"
          />
        </Section>
      )}

      {/* 3. Why This Recommendation? (Prominent Section) */}
      {(activeTab === 'all' || activeTab === 'why') && (
        <Section
          tag="Engineering Rationale"
          title="Deep Dive: Scientific & Architectural Basis"
          subtitle="Clear justification of why traditional breathable binders prevent the catastrophic failure caused by Portland cement."
        >
          <WhyThisRecommendation
            className="mb-10"
          />
        </Section>
      )}

      {/* 4. Root Cause Analysis */}
      {(activeTab === 'all' || activeTab === 'root_cause') && (
        <Section
          tag="Failure Mechanisms"
          title="Deterministic Root-Cause Deductions"
          subtitle="Engineering rule evaluation identifying the environmental and maintenance roots of deterioration."
        >
          <RootCauseAnalysisCard
            rootCauseItems={rootCauses}
            className="mb-10"
          />
        </Section>
      )}

      {/* 5. Phased Restoration Roadmap */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <Section
          tag="Intervention Plan (REVIVE)"
          title="Prioritized Conservation Roadmap"
          subtitle="Phased action matrix respecting prerequisite dependencies, seasonal curing windows, and strict prohibition of incompatible modern binders."
        >
          <RestorationRoadmap
            restoration={result.restoration}
            className="mb-10"
          />
        </Section>
      )}
    </PageContainer>
  );
};
