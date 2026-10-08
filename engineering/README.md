# BaoliGuard Conservation Engineering Subsystem

**Owner:** Kirti Antil (IKS / Material Compatibility / Conservation Engineering)  
**Primary Ownership:**
- `/knowledge`
- `/engineering`
- `/tests/engineering`

---

## 1. Overview
The Engineering subsystem drives the **ASSESS** and **REVIVE** stages of BaoliGuard through deterministic rules:
- **Condition Scoring:** Algorithmic calculation of visual degradation indices based on computer vision defect areas, crack lengths, and component counts.
- **Water Functionality:** Quantitative evaluation of aquifer recharge viability, desiltation priority, and catchment flow continuity.
- **Material Compatibility:** Multi-dimensional matrix analysis comparing proposed intervention materials with inferred historic stone and lime substrates.
- **Root-Cause Analysis:** Logic trees tracing visible symptoms (e.g., dampness + spalling) to underlying hydrological failures.
- **Restoration Prioritization:** Multi-criteria ranking generating phased conservation roadmaps.

---

## 2. Architectural Boundary: AI vs. Deterministic Engineering
- **Deterministic Rules Only:** All scores (`visual_condition_score`, `water_functionality_score`, `restoration_priority_score`) and material compatibility checks are calculated using deterministic, inspectable Python rules and formulas.
- **No LLM Hallucinations:** Large Language Models (LLMs) are **strictly forbidden** from generating numerical scores, inventing material strengths, or determining structural safety.
- **Explicit Limitations:** Every score output adheres to [`/contracts/engineering_result.schema.json`](file:///contracts/engineering_result.schema.json) and must provide explicit metadata on confidence, scale, and limitations to ensure it is never confused with a certified on-site structural audit.

---

## 3. Directory Layout
```
engineering/
├── README.md
├── material_compatibility/ # Multi-attribute compatibility matrix logic
├── restoration/            # Phased intervention planning rules
├── root_cause/             # Defect deduction logic trees
├── scoring/                # Deterministic condition scoring formulas
├── tests/                  # Engineering rule unit tests
└── water_functionality/    # Hydrological & catchment viability logic
```
