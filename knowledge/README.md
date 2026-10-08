# BaoliGuard Indian Knowledge Systems (IKS) & Conservation Knowledge Subsystem

**Owner:** Kirti Antil (IKS / Material Compatibility / Conservation Engineering Lead)  
**Status:** **PHASE 1 COMPLETE (IKS Knowledge Foundation)**  
**Version:** 1.0.0

---

## 1. Executive Summary & Vision
The Knowledge subsystem establishes the **UNDERSTAND** foundation of the BaoliGuard platform:
$$\text{SEE} \longrightarrow \mathbf{\text{UNDERSTAND}} \longrightarrow \text{ASSESS} \longrightarrow \text{REVIVE}$$

Traditional Indian water structures—**Baoli, Bawari, Kund, and Vav**—are not merely ornamental stepwells. They represent sophisticated, climate-adapted hydraulic engineering systems designed to withstand centuries of extreme monsoonal cycles, drought, and thermal stress without fossil fuel or mechanical pumping.

BaoliGuard curates this heritage wisdom into machine-readable, deterministic engineering knowledge models to guide non-invasive assessment and authentic, material-compatible conservation.

---

## 2. Directory Layout & Organization

```
knowledge/
├── README.md                          # Primary subsystem documentation & usage guide
├── iks/
│   ├── README.md                      # IKS hydrology tenets & architectural principles
│   └── hydrology_principles.json      # Structured catalog of indigenous hydrological rules
├── materials/
│   └── README.md                      # Traditional material families & historical DNA notes
├── restoration/
│   └── README.md                      # Conservation ethics & minimum intervention rules
├── sources/
│   ├── sources.schema.json            # JSON Schema enforcing research provenance
│   └── sources_index.json             # Authoritative academic, ASI, INTACH & UNESCO citations
└── structures/
    ├── structure.schema.json          # JSON Schema validating structure knowledge entries
    ├── index.json                     # Master registry and lookup index for typologies
    ├── baoli.json                     # Deep engineering knowledge entry for Baoli
    ├── bawari.json                    # Deep engineering knowledge entry for Bawari
    ├── kund.json                      # Deep engineering knowledge entry for Kund
    └── vav.json                       # Deep engineering knowledge entry for Vav
```

---

## 3. Supported Structure Typologies (Phase 1 Scope)

| Typology | Primary Regions | Hydrological Mechanism | Structural Innovation |
| :--- | :--- | :--- | :--- |
| **Baoli** | Indo-Gangetic Plains, Delhi NCR, UP, Haryana, MP, Northern Rajasthan | Deep unconfined aquifer abstraction with seasonal water table descent | Battered retaining walls with multi-tier vaulted struts and isolated potable well cylinder |
| **Bawari** | Arid Western India (Marwar, Mewar, Shekhawati, Malwa, Bundelkhand) | Dual-action micro-catchment runoff capture and fractured rock aquifer recharge | Steep-sided funnel revetment minimizing evaporative surface area; silt settling baffles |
| **Kund** | Gujarat, Rajasthan, Braj / UP, Bihar, Bundelkhand, Varanasi | Dedicated surface rainwater harvesting into a perched freshwater retention basin | Symmetrical inverted stepped pyramid geometry; paved catchment apron (*paytan*) with multi-stage silt traps |
| **Vav** | Gujarat (Patan, Ahmedabad, Adalaj, Modhera), SW Rajasthan | Monumental subterranean stepwell tapping deep alluvial sand aquifers | Colonnaded multi-storey pavilions (*kutas*) acting as horizontal struts against active lateral earth pressure; convective microclimatic cooling |

---

## 4. Engineering-Relevant Knowledge Architecture

Every structure knowledge entry rigorously answers:
- **WHAT?** Physical components and spatial layout (corridors, pavilions, cylinders, aprons, steps).
- **WHY?** The exact hydrological or structural problem the ancient builders solved (soil thrust, evaporation, salinity, seasonal fluctuation).
- **HOW?** Mechanical, hydrostatic, and material mechanisms employed (vaulted struts, inward batter, inverted pyramids, lime-surkhi bedding).
- **WHERE?** Geoclimatic and regional distribution across India.
- **ENGINEERING SIGNIFICANCE?** Relevance to modern digital twin modeling, structural condition indexing, and revival planning.

---

## 5. Traceability & Source Provenance

Every factual, material, and structural assertion is tied to recognized institutional and peer-reviewed literature in [`knowledge/sources/sources_index.json`](file:///knowledge/sources/sources_index.json):
- **ASI & INTACH:** Architectural Conservation Principles & Guidelines (2020, 2004)
- **UNESCO World Heritage Centre:** Rani-ki-Vav Inscription & Management Dossier (2014)
- **Central Public Works Department (CPWD):** Handbook of Conservation of Heritage Buildings (2013)
- **Central Ground Water Board (CGWB):** Traditional Water Harvesting Structures and Sustainable Groundwater Management (2021)
- **Academic Authorities:** Livingston (2002), Jain-Neubauer (1981), Mishra/CSE (1997)

Schema validation is enforced by [`knowledge/sources/sources.schema.json`](file:///knowledge/sources/sources.schema.json).

---

## 6. Technical Limitations & Scientific Boundary

> [!CAUTION]
> **PHOTOGRAPHIC IMAGERY CANNOT CERTIFY CHEMICAL COMPOSITION**
> - The knowledge entries provide **probabilistic baseline hypotheses** of historical construction materials based on documented regional traditions.
> - BaoliGuard **never** claims that visual photographs alone definitively verify chemical composition.
> - Actual physical intervention mandates non-destructive testing (ultrasonic velocity, moisture meters) and micro-sample laboratory characterization (petrography, XRD, binder-aggregate ratio).
> - Hydrological reactivation depends on broader regional water table status and catchment urbanization, which require specialized hydrogeological audits.

---

## 7. Downstream Integration (Backend & Frontend)

### Backend (FastAPI / Swastik)
- Load typologies via [`engineering/knowledge_lookup.py`](file:///engineering/knowledge_lookup.py) or direct JSON parsing.
- Query typologies by ID (`baoli`, `bawari`, `kund`, `vav`).
- Link detected typology from Krish's vision classifier to the relevant IKS principles.

### Frontend (React / Anika)
- Render interactive IKS educational drawers and architectural breakdowns.
- Display engineering principles alongside defect overlays in the 2D dashboard.
- Anchor pavilion and well cylinder features into the 3D Digital Twin viewer.
