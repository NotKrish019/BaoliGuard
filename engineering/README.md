# BaoliGuard Conservation Engineering Subsystem

**Owner:** Kirti Antil (IKS / Material Compatibility / Conservation Engineering Lead)  
**Status:** **PHASE 4 COMPLETE (Engineering Validation + Integration Readiness)**  
**Version:** 1.0.0

---

## 1. Subsystem Architecture & Purpose
The Engineering & IKS subsystem provides the deterministic, scientific backbone of BaoliGuard, translating visual defect detections into evidence-based conservation assessments, material compatibility evaluations, and authentic restoration roadmaps:

$$\mathbf{\text{SEE (Krish)}} \longrightarrow \mathbf{\text{UNDERSTAND (Kirti)}} \longrightarrow \mathbf{\text{ASSESS (Kirti)}} \longrightarrow \mathbf{\text{REVIVE (Kirti)}}$$

---

## 2. Public Integration API

All functions are exported directly from `engineering`:

```python
from engineering import (
    # 1. Master Facade (Recommended for Backend)
    analyze_heritage_structure,
    ConservationEngineeringService,

    # 2. Knowledge Retrieval (IKS Foundations)
    get_structure,
    list_structures,
    get_source,

    # 3. Material Compatibility (7-Dimension Matrix)
    evaluate_compatibility,
    COMPATIBILITY_WEIGHTS,

    # 4. Condition & Water Functionality Scoring
    calculate_visual_condition,
    calculate_water_functionality,

    # 5. Diagnostic Deduction & Restoration Planning
    deduce_root_causes,
    plan_restoration,
    run_engineering_assessment,
)
```

---

## 3. Integration with Swastik's FastAPI Backend

Swastik's backend can invoke `analyze_heritage_structure(...)` with Krish's vision output and survey parameters to generate contract-validated responses:

```python
from fastapi import APIRouter
from engineering import analyze_heritage_structure

router = APIRouter()

@router.post("/analyze/heritage")
def analyze_monument(vision_payload: dict, survey_data: dict):
    # Execute deterministic engineering analysis
    result = analyze_heritage_structure(
        structure_type=vision_payload.get("structure_type"),
        vision_data=vision_payload,
        inspection_data=survey_data,
        inferred_material=survey_data.get("observed_material"),
    )

    # Output directly conforms to contracts/engineering_result.schema.json,
    # contracts/material_compatibility.schema.json, and contracts/restoration_result.schema.json
    return {
        "status": "success",
        "engineering_result": result["engineering_result"],
        "material_compatibility": result["material"],
        "restoration_plan": result["restoration"],
        "warnings": result["warnings"],
        "limitations": result["limitations"],
    }
```

---

## 4. Integration with Anika's Frontend (React & Three.js)

The payload emitted by `analyze_heritage_structure(...)` maps directly to Anika's frontend dashboard components:
1. **2D Condition Gauge & Sub-Scores:**
   - `visual_condition.value` (0–100)
   - `sub_scores.vegetation_intrusion_index`
   - `sub_scores.masonry_integrity_index`
2. **Hydrological Viability Card:**
   - `water_functionality.value` (0–100)
   - `sub_scores.siltation_obstruction_index`
3. **Material Compatibility Radar / Matrix:**
   - `material.candidate_interventions` (7 dimensions: mechanical, moisture, thermal, chemical, reversibility, heritage, visual)
   - Highlight: `strongly_recommended` vs `prohibited_incompatible` with detailed warning text explaining *why* cement damages breathing stone.
4. **Phased Restoration Visualizer:**
   - `restoration.prioritized_actions` (ordered step 1 $\to$ N across Phase 1 immediate stabilization $\to$ Phase 2 hydrological remediation $\to$ Phase 3 masonry consolidation $\to$ Phase 4 monitoring).
5. **Authentic IKS Guidelines & Recipes:**
   - `restoration.iks_guidelines.traditional_mortar_recipe` (chuna-surkhi pozzolana with fermented herbal admixtures).

---

## 5. Input Resilience & Fallback Guarantees

| Edge Case | Engineering Engine Handling |
| :--- | :--- |
| **Missing Vision Data** (`vision_data=None`) | Generates baseline assessment with documented confidence penalty ($0.50$) and explicit limitation warning. |
| **Empty Detections** (`detections=[]`) | Evaluates condition score as $100.0$ (clean/intact) with high confidence. |
| **Unspecified Material** (`inferred_material=None`) | Auto-infers canonical regional material based on structure typology (e.g. Baoli $\to$ `hydraulic_lime_mortar`), flags `verification_required: true`. |
| **Unrecognized Typology** | Falls back safely to generalized traditional water engineering rules with a warning. |
| **Over-Confident Inputs** | Capped at maximum $\le 0.85$ to maintain scientific credibility (photographs cannot certify chemical composition). |

---

## 6. Contract Conformance Summary

| Contract | File Path | Validation Status |
| :--- | :--- | :---: |
| **Engineering Result** | [`contracts/engineering_result.schema.json`](file:///contracts/engineering_result.schema.json) | **100% Validated** |
| **Material Compatibility** | [`contracts/material_compatibility.schema.json`](file:///contracts/material_compatibility.schema.json) | **100% Validated** |
| **Restoration Result** | [`contracts/restoration_result.schema.json`](file:///contracts/restoration_result.schema.json) | **100% Validated** |
| **Unified Analysis** | [`contracts/analysis.schema.json`](file:///contracts/analysis.schema.json) | **100% Compatible** |
| **IKS Sources** | [`knowledge/sources/sources.schema.json`](file:///knowledge/sources/sources.schema.json) | **100% Validated** |
| **Structure Knowledge** | [`knowledge/structures/structure.schema.json`](file:///knowledge/structures/structure.schema.json) | **100% Validated** |
| **Material DNA Profile** | [`knowledge/materials/material.schema.json`](file:///knowledge/materials/material.schema.json) | **100% Validated** |
