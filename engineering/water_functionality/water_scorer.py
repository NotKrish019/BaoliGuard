"""Deterministic Water Functionality and Hydrological Viability Scoring.

Evaluates aquifer recharge viability, intake catchment flow continuity, siltation burden,
and drainage integrity conforming to /contracts/engineering_result.schema.json.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional


DEFAULT_WATER_LIMITATIONS = [
    "Functionality score is calculated from observable surface hydrological features (inlet, outlet, siltation, catchment).",
    "Subsurface aquifer recharge rates and water table fluctuations require localized piezometer and hydrogeological monitoring.",
    "Bacteriological and biochemical water potability must be verified through laboratory water testing.",
]


class WaterFunctionalityScorer:
    """Calculates deterministic water viability and functionality indices."""

    INLET_POINTS: Dict[str, float] = {
        "clear": 25.0,
        "partially_blocked": 14.0,
        "choked": 2.0,
        "broken": 1.0,
        "unknown": 12.0,
    }

    SILTATION_POINTS: Dict[str, float] = {
        "none": 25.0,
        "low": 20.0,
        "moderate": 11.0,
        "severe": 3.0,
        "unknown": 12.0,
    }

    CATCHMENT_POINTS: Dict[str, float] = {
        "intact": 20.0,
        "partially_encroached": 10.0,
        "severely_encroached": 2.0,
        "unknown": 10.0,
    }

    OUTLET_POINTS: Dict[str, float] = {
        "clear": 15.0,
        "partially_blocked": 8.0,
        "choked": 2.0,
        "broken": 1.0,
        "unknown": 8.0,
    }

    WATER_POINTS: Dict[str, float] = {
        "perennial_clean": 15.0,
        "turbid": 10.0,
        "stagnant": 5.0,
        "dry": 4.0,
        "unknown": 7.0,
    }

    def __init__(self) -> None:
        pass

    def calculate_score(
        self,
        inlet_condition: str = "unknown",
        outlet_condition: str = "unknown",
        siltation_level: str = "unknown",
        water_presence: str = "unknown",
        catchment_condition: str = "unknown",
        accessibility: str = "unknown",
        confidence_override: Optional[float] = None,
    ) -> Dict[str, Any]:
        """Compute deterministic water functionality score from observable factors.

        Returns:
            Dict conforming to score_metric definition in engineering_result.schema.json
        """
        norm_inlet = inlet_condition.strip().lower()
        norm_outlet = outlet_condition.strip().lower()
        norm_silt = siltation_level.strip().lower()
        norm_water = water_presence.strip().lower()
        norm_catch = catchment_condition.strip().lower()

        # Score calculation
        p_inlet = self.INLET_POINTS.get(norm_inlet, 12.0)
        p_silt = self.SILTATION_POINTS.get(norm_silt, 12.0)
        p_catch = self.CATCHMENT_POINTS.get(norm_catch, 10.0)
        p_outlet = self.OUTLET_POINTS.get(norm_outlet, 8.0)
        p_water = self.WATER_POINTS.get(norm_water, 7.0)

        total_value = round(p_inlet + p_silt + p_catch + p_outlet + p_water, 1)
        total_value = min(100.0, max(0.0, total_value))

        # Compute confidence based on number of unknown inputs
        unknown_count = sum(1 for val in [norm_inlet, norm_outlet, norm_silt, norm_water, norm_catch] if val == "unknown")
        derived_confidence = round(max(0.3, 0.90 - (unknown_count * 0.12)), 2)
        confidence = derived_confidence if confidence_override is None else min(0.95, max(0.1, float(confidence_override)))

        # Siltation obstruction sub-index (100 = completely clear, 0 = choked)
        silt_index_map = {"none": 100.0, "low": 80.0, "moderate": 45.0, "severe": 10.0, "unknown": 50.0}
        silt_sub_score = silt_index_map.get(norm_silt, 50.0)

        return {
            "water_functionality_score": {
                "value": total_value,
                "scale_min": 0.0,
                "scale_max": 100.0,
                "method": "hydrological_functionality_matrix_v1",
                "confidence": confidence,
                "limitations": list(DEFAULT_WATER_LIMITATIONS),
            },
            "sub_scores": {
                "siltation_obstruction_index": {
                    "value": silt_sub_score,
                    "scale_min": 0.0,
                    "scale_max": 100.0,
                    "method": "siltation_depth_permeability_penalty_v1",
                    "confidence": confidence,
                    "limitations": [
                        "Silt thickness is estimated from visible waterline steps; core sounding is required for volume calculation."
                    ],
                }
            },
            "factor_breakdown": {
                "inlet_points": p_inlet,
                "siltation_points": p_silt,
                "catchment_points": p_catch,
                "outlet_points": p_outlet,
                "water_status_points": p_water,
                "total": total_value,
            },
        }


default_water_scorer = WaterFunctionalityScorer()


def calculate_water_functionality(
    inlet_condition: str = "unknown",
    outlet_condition: str = "unknown",
    siltation_level: str = "unknown",
    water_presence: str = "unknown",
    catchment_condition: str = "unknown",
    accessibility: str = "unknown",
    confidence: Optional[float] = None,
) -> Dict[str, Any]:
    """Convenience function for water functionality scoring."""
    return default_water_scorer.calculate_score(
        inlet_condition=inlet_condition,
        outlet_condition=outlet_condition,
        siltation_level=siltation_level,
        water_presence=water_presence,
        catchment_condition=catchment_condition,
        accessibility=accessibility,
        confidence_override=confidence,
    )
