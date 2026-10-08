import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
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
        title="Conservation Dossier"
        subtitle="IKS material compatibility assessment and phased restoration roadmap."
      >
        <div className="bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-10 text-center max-w-xl mx-auto my-8 shadow-panel">
          <div className="w-12 h-12 rounded-sm border border-[#28A9E0]/30 flex items-center justify-center text-[#28A9E0] mx-auto mb-4 bg-[#062B49]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-white mb-1.5">
            No Survey Dossier Active
          </h2>
          <p className="text-xs text-[#8CD8F5]/80 mb-6 leading-relaxed">
            A photographic survey must be analyzed to synthesize the IKS material compatibility matrix and the phased conservation roadmap.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onLoadDemoFixture}
            >
              Load Reference Dossier
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onRouteChange('/upload')}
            >
              + New Survey
            </Button>
          </div>
        </div>
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
      title="Conservation Dossier"
      subtitle={`Evidence-based restoration roadmap & IKS material compatibility for ${result.structure.name || 'Historic Water Structure'}.`}
      badge={
        isMockFixture ? (
          <StatusBadge
            label="Reference Dossier"
            variant="sandstone"
            size="sm"
          />
        ) : (
          <StatusBadge
            label="Live Dossier"
            variant="success"
            size="sm"
          />
        )
      }
      actions={
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            Print Dossier
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRouteChange('/analysis')}
          >
            ← Diagnostics
          </Button>
        </div>
      }
    >
      {/* Dossier Section Filter Tabs: Poppins typography, subtle blue highlight rule */}
      <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar border-b border-[#28A9E0]/20 mb-8 text-xs font-sans">
        {[
          { id: 'all', label: 'All Sections' },
          { id: 'chain', label: '01. Causal Chain' },
          { id: 'material', label: '02. Material Compatibility' },
          { id: 'why', label: '03. Engineering Rationale' },
          { id: 'root_cause', label: '04. Root Cause' },
          { id: 'roadmap', label: '05. Phased Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as ReportTab)}
            className={`pb-2.5 whitespace-nowrap transition-all relative font-medium ${
              activeTab === tab.id
                ? 'text-white font-semibold'
                : 'text-[#8CD8F5]/75 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#28A9E0] rounded-t-xs" />
            )}
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

      {/* 3. Why This Recommendation? */}
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
