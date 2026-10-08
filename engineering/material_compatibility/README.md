# Material Compatibility Engine

**Owner:** Kirti Antil (IKS / Material Compatibility / Conservation Engineering Lead)  
**Status:** **PHASE 2 COMPLETE**  
**Contract:** [`contracts/material_compatibility.schema.json`](file:///contracts/material_compatibility.schema.json)

---

## 1. Subsystem Purpose & Philosophical Framework
Traditional Indian water structures (Baolis, Kunds, Bawaris, Vavs) were assembled from porous, vapor-permeable, ductile material systems: quartzitic and calcareous sandstones, lakhori bricks, and hydraulic slaked lime mortars enriched with pozzolanic surkhi and fermented organic binders.

The Material Compatibility Engine solves the central conservation question:
$$\text{"What intervention material is physically and chemically compatible with the existing historic fabric without accelerating degradation?"}$$

### Core Conservation Rule: Explain WHY, Never Simply Say NO
The engine **never** applies dogmatic rules such as *"cement is always bad"*. Instead, it evaluates context:
- When applied to modern reinforced concrete structures, Portland cement performs reliably.
- When applied to historic lime-stone masonry, Ordinary Portland Cement (OPC) is evaluated as **prohibited_incompatible** because of documented physical and chemical mismatches:
  1. **Stiffness Mismatch:** OPC has high compressive strength (25-50 MPa) and high elastic modulus (20-35 GPa), violating the sacrificial principle (mortar must be softer than stone). Thermal and ground movement stresses are forced into historic stone arrises, causing edge spalling.
  2. **Vapor Barrier Risk:** OPC's dense pore network has low vapor permeability (<3 Perm) compared to breathing lime-sandstone (>12 Perm). Subsurface rising damp is trapped behind the repair crust, causing crypto-efflorescence (salt crystallization pressure up to 100 MPa) and stone face delamination.
  3. **Soluble Salt Attack:** Cement releases soluble alkalis and sulfates that react with limestone to form expansive ettringite and thaumasite minerals.

---

## 2. Seven Compatibility Dimensions & Weighting

Every candidate intervention is evaluated deterministically across 7 dimensions (each scored $0.0$ to $10.0$):

| Dimension | Weight | Conservation Engineering Rationale |
| :--- | :--- | :--- |
| **Moisture** | **0.25** | Breathability and vapor permeability matching; avoids moisture entrapment in heritage walls. |
| **Mechanical** | **0.20** | Sacrificial behavior; ensures intervention mortar yields before historic stone fractures. |
| **Chemical** | **0.15** | Absence of soluble sulfates/alkalis; promotes autogenous carbonation healing. |
| **Reversibility**| **0.15** | Non-destructive retreatability without sacrificing original historic stone fabric. |
| **Heritage** | **0.10** | Alignment with indigenous IKS traditions (pozzolanic surkhi, herbal binders) and ASI/INTACH ethics. |
| **Thermal** | **0.10** | Coefficient of thermal expansion matching under semi-arid diurnal temperature swings. |
| **Visual** | **0.05** | Aesthetic texture, grain size, aggregate distribution, and patina harmony. |

### Composite Scoring Formula:
$$\text{Compatibility Score} = \sum_{d \in \text{Dimensions}} \left( \text{Score}_d \times 10 \times \text{Weight}_d \right) \in [0.0, 100.0]$$

### Classification Thresholds:
- **$\ge 80.0$:** `strongly_recommended` (e.g. traditional lime-surkhi pozzolanic mortar)
- **$65.0 - 79.9$:** `recommended` (e.g. natural hydraulic lime NHL 2 / NHL 3.5)
- **$45.0 - 64.9$:** `acceptable_conditional` (e.g. fat lime putty in sheltered, non-submerged zones)
- **$< 45.0$:** `prohibited_incompatible` (e.g. Ordinary Portland Cement, synthetic epoxy/acrylic polymers)

---

## 3. Scientific Boundary & Probabilistic Identification

> [!CAUTION]
> **PHOTOGRAPHIC IMAGERY CANNOT CERTIFY CHEMICAL COMPOSITION**
> - Visual observations alone cannot establish binder-aggregate ratios, hydraulic indices, or petrographic classifications.
> - The engine enforces:
>   - `original_material_confidence`: capped at maximum $\le 0.85$ (probabilistic identification).
>   - `verification_required`: always set to `true`.
>   - `recommended_tests`: petrographic thin-section microscopy, X-ray diffraction (XRD), acid digestion for binder-to-aggregate ratio, and soluble salt ion chromatography.
