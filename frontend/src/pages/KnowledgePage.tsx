import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { AppRoute } from '../types';

export interface KnowledgePageProps {
  onRouteChange: (route: AppRoute) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({ onRouteChange }) => {
  const [selectedTypology, setSelectedTypology] = useState<string>('baoli');

  const typologies = [
    {
      id: 'baoli',
      name: 'Baoli / Stepwell',
      region: 'North & Western India (Delhi, Rajasthan, Haryana)',
      function: 'Deep subterranean aquifer tapping with monumental stepped arcades.',
      principle: 'Hydrostatic pressure counterbalanced by stepped retaining terraces; lower tiers remain submerged to prevent masonry drying contraction.',
      materials: 'Dholpur red sandstone, Delhi quartzite ashlar, slaked fat lime, crushed burnt brick (surkhi).',
    },
    {
      id: 'vav',
      name: 'Vav',
      region: 'Gujarat (Patan, Adalaj, Ahmedabad)',
      function: 'Linear subterranean stepped corridor combining water sanctuary and cooling respite for desert caravans.',
      principle: 'Multi-tiered pavilion structures act as internal structural cross-braces against lateral earth and soil moisture pressure.',
      materials: 'Fine-grained alluvial sandstone, lime-surkhi with curd/jaggery organic setting retarders.',
    },
    {
      id: 'kund',
      name: 'Kund / Stepped Tank',
      region: 'Rajasthan & Uttar Pradesh (Abhaneri, Varanasi)',
      function: 'Steep geometric pyramid basin designed for surface runoff percolation and communal ablution.',
      principle: 'Fractal interlocking stairs disperse dynamic water turbulence during torrential cloudbursts, preventing soil scouring.',
      materials: 'Hard basalt and metamorphic quartzite blocks laid with dry hydraulic interlocking keys.',
    },
    {
      id: 'jhalra',
      name: 'Jhalra',
      region: 'Jodhpur & Marwar',
      function: 'Seepage-fed stepwell engineered down-gradient from an upstream lake or reservoir.',
      principle: 'Passive underground filtration through natural sand strata before entering the drawing chamber.',
      materials: 'Local rhyolite and sandstone ashlar with lime mortar pointing.',
    },
  ];

  const current = typologies.find((t) => t.id === selectedTypology) || typologies[0];

  return (
    <PageContainer
      title="Indian Knowledge Systems (IKS) Archive"
      subtitle="Canonical architectural, hydrological, and materials repository for traditional Indian water systems."
      badge={
        <StatusBadge
          label="IKS Repository v1.4"
          variant="jal"
          size="md"
        />
      }
      actions={
        <button
          onClick={() => onRouteChange('/upload')}
          className="h-8 px-4 text-xs font-semibold text-white bg-[#087CC1] hover:bg-[#28A9E0] rounded-sm border border-[#28A9E0]/40 transition-colors shadow-sm"
        >
          Inspect a Dharohar →
        </button>
      }
    >
      {/* Light Content Region: White / Soft surface for editorial clarity and high readability */}
      <div className="bg-white text-[#09283C] rounded-sm border border-[#28A9E0]/30 shadow-sm overflow-hidden font-sans">
        {/* Typology Selector Bar */}
        <div className="bg-[#F3FAFD] border-b border-[#087CC1]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase text-[#087CC1] tracking-wider">
              Structure Typology:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {typologies.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTypology(t.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
                    selectedTypology === t.id
                      ? 'bg-[#087CC1] text-white shadow-xs'
                      : 'bg-white text-[#587286] border border-[#28A9E0]/20 hover:text-[#09283C]'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-[#587286]">
            Region: <strong className="text-[#09283C]">{current.region}</strong>
          </div>
        </div>

        {/* Editorial Body: Detailed Architectural Deep Dive */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Section 1: Overview & Traditional Function */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#087CC1]/15">
            <div className="md:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087CC1] block mb-1">
                Traditional Function
              </span>
              <h3 className="text-xl font-bold text-[#09283C]">
                {current.name}
              </h3>
              <p className="text-xs text-[#587286] mt-2 leading-relaxed">
                {current.region}
              </p>
            </div>
            <div className="md:col-span-8 space-y-3">
              <p className="text-sm text-[#09283C] leading-relaxed font-normal">
                {current.function}
              </p>
              <div className="p-4 bg-[#F3FAFD] rounded-sm border border-[#28A9E0]/20 text-xs text-[#587286] leading-relaxed">
                <strong className="text-[#09283C] block mb-1">Hydrological Context:</strong>
                Unlike modern deep borewells which exhaust subterranean reserves, traditional stepwells tap the shallow unconfined water table. They fluctuate naturally with seasonal monsoon surges, acting as visual barometers for local water wealth.
              </div>
            </div>
          </div>

          {/* Section 2: Canonical Engineering Principles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#087CC1]/15">
            <div className="md:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087CC1] block mb-1">
                Engineering Principle
              </span>
              <h3 className="text-xl font-bold text-[#09283C]">
                Canonical Mechanics &amp; Equilibrium
              </h3>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-sm text-[#09283C] leading-relaxed">
                {current.principle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#F3FAFD] border border-[#28A9E0]/20 rounded-sm">
                  <div className="text-xs font-semibold text-[#09283C] mb-1">
                    Aparajitaprccha Mandate (Sutra 74)
                  </div>
                  <p className="text-xs text-[#587286] leading-relaxed">
                    "Water structures must allow the earth to exhale. Tight impermeability invites cracking from trapped hydrostatic upheaval."
                  </p>
                </div>
                <div className="p-4 bg-[#F3FAFD] border border-[#28A9E0]/20 rounded-sm">
                  <div className="text-xs font-semibold text-[#09283C] mb-1">
                    Vastu Vidya Hydrology
                  </div>
                  <p className="text-xs text-[#587286] leading-relaxed">
                    "Inlets must turn thrice to drop coarse sand; only tranquil waters shall enter the deep well chamber."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Material Practice & Pozzolanic Mortars */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#087CC1]/15">
            <div className="md:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087CC1] block mb-1">
                Material Practice
              </span>
              <h3 className="text-xl font-bold text-[#09283C]">
                Lime Mortars vs. Portland Cement
              </h3>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-sm text-[#09283C] leading-relaxed">
                Historic water structures rely on flexible, breathable fat lime (calcium hydroxide) blended with reactive pozzolanic surkhi (calcined clay). When immersed in water, it forms insoluble calcium silicate hydrates that self-heal hairline thermal cracks.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 leading-relaxed">
                <strong className="block font-semibold mb-1 text-amber-950">
                  ⚠️ The Portland Cement Hazard (Why Cement Repairs Fail):
                </strong>
                Modern Ordinary Portland Cement (OPC) is rigid, impermeable, and rich in soluble alkalis. It traps subterranean moisture behind masonry faces, causing catastrophic stone spalling, salt efflorescence blisters, and structural joint detachment.
              </div>
            </div>
          </div>

          {/* Section 4: Archival Sources & Field Citations */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087CC1] block mb-1">
                Archival Sources
              </span>
              <h3 className="text-xl font-bold text-[#09283C]">
                Canonical References &amp; Codes
              </h3>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-3 text-xs text-[#587286]">
                <li className="p-3 bg-[#F3FAFD] border border-[#28A9E0]/20 rounded-sm">
                  <strong className="text-[#09283C] block font-semibold">
                    1. Archaeological Survey of India (ASI) Conservation Manual
                  </strong>
                  Section 4.2: Restoration of Historic Masonry in Aquatic Substrates. Mandatory use of slaked lime and surkhi.
                </li>
                <li className="p-3 bg-[#F3FAFD] border border-[#28A9E0]/20 rounded-sm">
                  <strong className="text-[#09283C] block font-semibold">
                    2. Aparajitaprccha of Bhuvanadeva (12th Century CE)
                  </strong>
                  Chapters on Stepwells (Vapividhana) and Hydraulic Tanks (Jaladhara).
                </li>
                <li className="p-3 bg-[#F3FAFD] border border-[#28A9E0]/20 rounded-sm">
                  <strong className="text-[#09283C] block font-semibold">
                    3. The Stepwells of Gujarat in Art-Historical Perspective (Jutta Jain-Neubauer)
                  </strong>
                  Structural typologies and water-harvesting engineering in Western India.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
