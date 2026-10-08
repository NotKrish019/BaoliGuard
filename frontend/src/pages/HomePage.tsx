import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { AppRoute } from '../types';

export interface HomePageProps {
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onRouteChange, onLoadDemoFixture }) => {
  return (
    <PageContainer
      title="Jal-Dharohar Digital Intelligence & Conservation"
      subtitle="A software-first AI-assisted engineering and conservation decision-support system for India's historic subterranean water structures."
      badge={
        <StatusBadge
          label="Phase 1 Foundation Active"
          variant="sandstone"
          size="md"
        />
      }
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onLoadDemoFixture}
          >
            Load Sample Dossier
          </Button>
          <Button
            variant="sandstone"
            size="md"
            onClick={() => onRouteChange('/upload')}
          >
            Start New Survey →
          </Button>
        </div>
      }
    >
      {/* Hero Narrative Cards: SEE → UNDERSTAND → ASSESS → REVIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card
          borderAccent="jal"
          title={
            <div className="flex items-center gap-2">
              <span className="text-jal-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-jal-950/80 border border-jal-800">
                01
              </span>
              <span>SEE</span>
            </div>
          }
          subtitle="Non-invasive defect segmentation"
        >
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Computer vision detects surface cracks, vegetation root intrusion, stone spalling, and moisture efflorescence in uncalibrated image-space.
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
            Lead: Krish • YOLOv8 + OpenCV
          </div>
        </Card>

        <Card
          borderAccent="sandstone"
          title={
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800">
                02
              </span>
              <span>UNDERSTAND</span>
            </div>
          }
          subtitle="Indian Knowledge Systems (IKS)"
        >
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Connects observed symptoms to indigenous hydrological wisdom, regional geological substrates, and traditional lime/surkhi material DNA.
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
            Lead: Kirti Antil • IKS Corpus
          </div>
        </Card>

        <Card
          borderAccent="sandstone"
          title={
            <div className="flex items-center gap-2">
              <span className="text-sandstone-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-sandstone-950/80 border border-sandstone-800">
                03
              </span>
              <span>ASSESS</span>
            </div>
          }
          subtitle="Deterministic engineering rules"
        >
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Calculates visual condition indices, siltation obstructions, and root-cause failure mechanisms with explicit engineering assumptions.
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
            Lead: Kirti Antil • Rules Engine
          </div>
        </Card>

        <Card
          borderAccent="surkhi"
          title={
            <div className="flex items-center gap-2">
              <span className="text-surkhi-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-surkhi-950/80 border border-surkhi-800">
                04
              </span>
              <span>REVIVE</span>
            </div>
          }
          subtitle="Minimum-intervention roadmap"
        >
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Proposes material-compatible conservation interventions while explicitly prohibiting destructive modern materials like OPC Portland cement.
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
            Restoration &amp; Conservation Roadmap
          </div>
        </Card>
      </div>

      {/* Target Structures & Typologies */}
      <Section
        tag="Indigenous Typologies"
        title="Protected Subterranean Water Typologies"
        subtitle="Engineered for India's diverse hydro-climatic zones, from the arid desert plains of Thar to the Deccan traps."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Baoli / Stepwell', desc: 'Tiered subterranean stairs reaching fluctuating aquifers', icon: '🏛️' },
            { name: 'Bawari', desc: 'Stepped reservoir integrated into fortified desert settlements', icon: '🏰' },
            { name: 'Kund', desc: 'Inverted stepped pyramid engineered for rainwater condensation', icon: '📐' },
            { name: 'Vav', desc: 'Linear multi-storeyed corridor stepwell with pavilions', icon: '🗿' },
            { name: 'Jhalra', desc: 'Community tank receiving seepage from upstream baolis', icon: '💧' },
            { name: 'Johad & Tanks', desc: 'Earthen micro-dams recharging groundwater aquifers', icon: '🌿' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-sandstone-500/40 transition-all text-center flex flex-col items-center"
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <h4 className="text-xs font-bold text-white mb-1">{item.name}</h4>
              <p className="text-[10.5px] text-slate-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sovereign AI & Hackathon Engineering Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-7">
          <Card
            title="Sovereign AI & Conservation Principles"
            subtitle="Local-first inference architecture aligned with India-first computing"
          >
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-base text-amber-400 shrink-0">🛡️</span>
                <div>
                  <strong className="text-white block mb-0.5">Non-Invasive Visual Perception</strong>
                  <p className="text-slate-400">
                    Defects are quantified purely in image-space pixels. BaoliGuard never invents uncalibrated real-world millimeter depth without optical ground truth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-amber-400 shrink-0">📜</span>
                <div>
                  <strong className="text-white block mb-0.5">IKS Evidence Traceability</strong>
                  <p className="text-slate-400">
                    Traditional formulas cite classical treatises (Aparajitaprccha, Mayamatam) and documented regional conservation practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base text-rose-400 shrink-0">🚫</span>
                <div>
                  <strong className="text-white block mb-0.5">Prohibition of Incompatible Modern Binders</strong>
                  <p className="text-slate-400">
                    BaoliGuard actively flags OPC Portland cement renders, silicone sealers, and abrasive blasting as high-risk failure vectors.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card
            title="System Pipeline & Team Allocation"
            subtitle="Strict single-branch modular ownership"
          >
            <div className="space-y-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Krish</div>
                  <div className="text-[10px] text-slate-400">Computer Vision Lead</div>
                </div>
                <span className="text-[10px] text-jal-400 bg-jal-950 px-2 py-0.5 rounded border border-jal-800">
                  /vision
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Kirti Antil</div>
                  <div className="text-[10px] text-slate-400">IKS &amp; Materials Lead</div>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  /knowledge /engineering
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Swastik Parmar</div>
                  <div className="text-[10px] text-slate-400">Backend &amp; Orchestration Lead</div>
                </div>
                <span className="text-[10px] text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                  /backend /integration
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-sandstone-600/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sandstone-300">Anika Jain (You)</div>
                  <div className="text-[10px] text-slate-400">Frontend, PWA &amp; Digital Twin</div>
                </div>
                <span className="text-[10px] text-sandstone-400 bg-sandstone-950 px-2 py-0.5 rounded border border-sandstone-700">
                  /frontend /digital_twin
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
