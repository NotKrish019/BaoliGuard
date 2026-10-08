import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { AnalysisResultContract, AppRoute } from '../types';

export interface ReportPageProps {
  result: AnalysisResultContract | null;
  isMockFixture?: boolean;
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  result,
  isMockFixture = false,
  onRouteChange,
  onLoadDemoFixture,
}) => {
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

  const restoration = result.restoration;
  const material = result.material;

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
            🖨️ Export Dossier
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
      {/* Narrative Chain Banner */}
      <div className="glass-panel-elevated rounded-xl p-5 mb-8 border border-sandstone-500/30">
        <div className="text-[11px] font-mono text-sandstone-300 uppercase tracking-widest mb-1.5 font-bold">
          CONSERVATION NARRATIVE CHAIN
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-sandstone-400 font-bold mb-0.5">TRADITION</div>
            <div className="text-[10px] text-slate-400">Stepwell Aquifer Tap</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-rose-400 font-bold mb-0.5">DAMAGE</div>
            <div className="text-[10px] text-slate-400">Root Intrusion &amp; Silt</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-amber-400 font-bold mb-0.5">CAUSE</div>
            <div className="text-[10px] text-slate-400">Mortar Loss &amp; Dampness</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-lime-400 font-bold mb-0.5">MATERIAL</div>
            <div className="text-[10px] text-slate-400">Hydraulic Lime / Surkhi</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-emerald-400 font-bold mb-0.5">REVIVE</div>
            <div className="text-[10px] text-slate-400">Phased Desilt &amp; Repoint</div>
          </div>
        </div>
      </div>

      {/* Material Compatibility Section (UNDERSTAND) */}
      <Section
        tag="IKS Material DNA"
        title="Substrate & Material Compatibility Assessment"
        subtitle="Evaluates candidate intervention materials against the original historical fabric across 7 compatibility dimensions."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-4">
            <Card
              title="Inferred Historical Substrate"
              subtitle="Probabilistic photo-identification"
              borderAccent="sandstone"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">IDENTIFIED MATERIAL</span>
                  <div className="text-sm font-bold text-white mt-0.5 font-mono capitalize">
                    {material.original_material.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono py-2 border-y border-slate-800">
                  <span className="text-slate-400">Photo Confidence:</span>
                  <span className="text-sandstone-300 font-bold">
                    {(material.original_material_confidence * 100).toFixed(0)}%
                  </span>
                </div>

                {material.verification_required && (
                  <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200">
                    <strong className="block text-amber-300 mb-1">Laboratory Verification Required</strong>
                    Must conduct XRD &amp; petrographic analysis before physical binder application.
                  </div>
                )}

                {material.recommended_tests && (
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
                      RECOMMENDED LAB TESTS
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {material.recommended_tests.map((test, idx) => (
                        <li key={idx} className="text-[11px]">{test}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {material.candidate_interventions.map((cand, idx) => (
              <Card
                key={idx}
                title={
                  <div className="flex items-center gap-2">
                    <span className="capitalize">{cand.intervention_material.replace(/_/g, ' ')}</span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        cand.recommendation === 'strongly_recommended'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : cand.recommendation === 'prohibited_incompatible'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {cand.recommendation.replace(/_/g, ' ')}
                    </span>
                  </div>
                }
                action={
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-sandstone-300">
                      {cand.compatibility_score.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500 font-mono"> / 100</span>
                  </div>
                }
              >
                {/* 7 Dimensions Bar Chart */}
                <div className="grid grid-cols-7 gap-1.5 text-center mb-4">
                  {(Object.keys(cand.compatibility_dimensions) as (keyof typeof cand.compatibility_dimensions)[]).map((dim) => {
                    const scoreVal = cand.compatibility_dimensions[dim];
                    return (
                      <div key={dim} className="bg-slate-900/80 p-2 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-mono truncate">{dim}</div>
                        <div className={`text-xs font-bold font-mono mt-1 ${scoreVal >= 7 ? 'text-emerald-400' : scoreVal >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {scoreVal.toFixed(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {cand.warnings && cand.warnings.length > 0 && (
                  <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200">
                    <ul className="list-disc list-inside space-y-0.5">
                      {cand.warnings.map((w, wIdx) => (
                        <li key={wIdx} className="text-[11px]">{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Phased Restoration Roadmap (REVIVE) */}
      <Section
        tag="Conservation Roadmap"
        title="Prioritized Intervention Actions"
        subtitle={`Overarching Strategy: ${restoration.restoration_strategy?.replace(/_/g, ' ').toUpperCase()}`}
      >
        <div className="space-y-4 mb-8">
          {restoration.prioritized_actions.map((act) => (
            <div
              key={act.step}
              className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-heritage-900 border border-sandstone-600/60 flex items-center justify-center font-mono font-bold text-sandstone-300 shrink-0 text-sm">
                  {act.step}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{act.action_title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 capitalize">
                      {act.phase.replace(/_/g, ' ')}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        act.urgency === 'immediate'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {act.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                    {act.recommended_technique}
                  </p>

                  <div className="text-[11px] font-mono text-sandstone-300 bg-sandstone-950/40 p-2 rounded border border-sandstone-900/60">
                    <span className="text-slate-400">Material Spec: </span>
                    {act.material_specification}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Incompatible Practices & IKS Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Explicit Incompatible Practices Warning"
          subtitle="Modern intervention methods strictly prohibited under heritage conservation standards"
          borderAccent="surkhi"
        >
          <div className="space-y-3">
            {restoration.incompatible_practices.map((incomp, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs">
                <div className="flex items-center justify-between text-rose-300 font-bold mb-1">
                  <span>🚫 {incomp.prohibited_action}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800">
                    {incomp.severity}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  <strong>Failure Mechanism:</strong> {incomp.failure_mechanism}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Traditional IKS Craftsmanship Principles"
          subtitle="Classical treatise citations & authentic curing guidelines"
          borderAccent="sandstone"
        >
          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="text-[10px] font-mono uppercase text-sandstone-300 block mb-1">
                TRADITIONAL MORTAR RECIPE
              </span>
              <p className="text-[11px] leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800 text-slate-300">
                {restoration.iks_guidelines.traditional_mortar_recipe}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-sandstone-300 block mb-1">
                CLASSICAL SOURCES &amp; TREATISES
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                {restoration.iks_guidelines.craftsmanship_references.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Seasonal Curing:</strong> {restoration.iks_guidelines.seasonal_curing_rules}
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
