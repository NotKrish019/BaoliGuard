"""Unified Engineering Assessment Engine.

Combines visual condition scoring, water functionality scoring, root-cause deductions,
and restoration priority into a unified payload conforming strictly to
/contracts/engineering_result.schema.json.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional
from jsonschema import Draft202012Validator

from engineering.scoring.visual_condition import calculate_visual_condition
from engineering.water_functionality.water_scorer import calculate_water_functionality
from engineering.root_cause.deduction_rules import deduce_root_causes
from engineering.restoration.restoration_planner import default_restoration_engine


DEFAULT_ENGINEERING_DISCLAIMER = (
    "This assessment represents a deterministic prototype decision-support calculation based strictly on "
    "non-invasive image-space defect metrics and surface inspection observations. It does NOT constitute a certified "
    "structural engineering audit, geotechnical stability certification, or archaeological conservation sign-off. "
    "All physical interventions mandate on-site multi-disciplinary investigation, laboratory material characterization, "
    "and authorized heritage clearances before execution."
)


class EngineeringAssessmentEngine:
    """Orchestrates deterministic scoring, root-cause deduction, and priority ranking."""

    def __init__(self, contract_path: Optional[Path] = None) -> None:
        if contract_path is None:
            contract_path = Path(__file__).resolve().parent.parent / "contracts" / "engineering_result.schema.json"
        self.contract_path = contract_path
        self._schema_cache: Optional[Dict[str, Any]] = None

    def get_contract_schema(self) -> Dict[str, Any]:
        """Load and cache the engineering result contract schema."""
        if self._schema_cache is None:
            with open(self.contract_path, "r", encoding="utf-8") as f:
                self._schema_cache = json.load(f)
        return self._schema_cache

    def assess(
        self,
        structure_type: str = "baoli",
        detections: Optional[List[Dict[str, Any]]] = None,
        crack_burden: float = 0.0,
        vegetation_burden: float = 0.0,
        spalling_burden: float = 0.0,
        dislodgement_burden: float = 0.0,
        inlet_condition: str = "unknown",
        outlet_condition: str = "unknown",
        siltation_level: str = "unknown",
        water_presence: str = "unknown",
        catchment_condition: str = "unknown",
        accessibility: str = "unknown",
        inferred_material: str = "hydraulic_lime_mortar",
        recent_repair_type: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Execute full engineering assessment conforming to engineering_result.schema.json."""
        # 1. Visual Condition Scoring
        vis_res = calculate_visual_condition(
            detections=detections,
            crack_burden=crack_burden,
            vegetation_burden=vegetation_burden,
            spalling_burden=spalling_burden,
            dislodgement_burden=dislodgement_burden,
        )
        visual_score = vis_res["visual_condition_score"]
        vis_sub = vis_res.get("sub_scores", {})

        # 2. Water Functionality Scoring
        water_res = calculate_water_functionality(
            inlet_condition=inlet_condition,
            outlet_condition=outlet_condition,
            siltation_level=siltation_level,
            water_presence=water_presence,
            catchment_condition=catchment_condition,
            accessibility=accessibility,
        )
        water_score = water_res["water_functionality_score"]
        water_sub = water_res.get("sub_scores", {})

        # 3. Root Cause Deductions
        root_causes = deduce_root_causes(
            crack_burden=crack_burden,
            vegetation_burden=vegetation_burden,
            spalling_burden=spalling_burden,
            dislodgement_burden=dislodgement_burden,
            inlet_condition=inlet_condition,
            outlet_condition=outlet_condition,
            siltation_level=siltation_level,
            water_presence=water_presence,
            catchment_condition=catchment_condition,
            inferred_material=inferred_material,
            recent_repair_type=recent_repair_type,
        )

        # 4. Restoration Priority Scoring
        priority_metric = default_restoration_engine.calculate_priority_score(
            visual_condition_score=visual_score["value"],
            water_functionality_score=water_score["value"],
            root_causes=root_causes,
        )

        # Combine sub-scores
        combined_sub_scores = {
            "vegetation_intrusion_index": vis_sub.get("vegetation_intrusion_index"),
            "masonry_integrity_index": vis_sub.get("masonry_integrity_index"),
            "siltation_obstruction_index": water_sub.get("siltation_obstruction_index"),
        }

        payload: Dict[str, Any] = {
            "visual_condition_score": visual_score,
            "water_functionality_score": water_score,
            "restoration_priority_score": priority_metric,
            "sub_scores": combined_sub_scores,
            "root_cause_analysis": root_causes,
            "engineering_disclaimer": DEFAULT_ENGINEERING_DISCLAIMER,
        }

        # Contract Schema Verification
        validator = Draft202012Validator(self.get_contract_schema())
        validator.validate(payload)

        return payload


default_assessment_engine = EngineeringAssessmentEngine()


def run_engineering_assessment(
    structure_type: str = "baoli",
    detections: Optional[List[Dict[str, Any]]] = None,
    crack_burden: float = 0.0,
    vegetation_burden: float = 0.0,
    spalling_burden: float = 0.0,
    dislodgement_burden: float = 0.0,
    inlet_condition: str = "unknown",
    outlet_condition: str = "unknown",
    siltation_level: str = "unknown",
    water_presence: str = "unknown",
    catchment_condition: str = "unknown",
    accessibility: str = "unknown",
    inferred_material: str = "hydraulic_lime_mortar",
    recent_repair_type: Optional[str] = None,
) -> Dict[str, Any]:
    """Convenience function for complete engineering assessment."""
    return default_assessment_engine.assess(
        structure_type=structure_type,
        detections=detections,
        crack_burden=crack_burden,
        vegetation_burden=vegetation_burden,
        spalling_burden=spalling_burden,
        dislodgement_burden=dislodgement_burden,
        inlet_condition=inlet_condition,
        outlet_condition=outlet_condition,
        siltation_level=siltation_level,
        water_presence=water_presence,
        catchment_condition=catchment_condition,
        accessibility=accessibility,
        inferred_material=inferred_material,
        recent_repair_type=recent_repair_type,
    )
