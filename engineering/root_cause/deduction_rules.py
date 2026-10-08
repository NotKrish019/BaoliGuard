"""Deterministic Root-Cause Deduction Logic for Heritage Water Structures.

Translates observable visual defects and hydrological indicators into traceable
failure mechanism hypotheses conforming to /contracts/engineering_result.schema.json.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional


class RootCauseDeductionEngine:
    """Evaluates multi-attribute symptoms to infer probable root causes of structural & hydrological failure."""

    def __init__(self) -> None:
        pass

    def deduce(
        self,
        crack_burden: float = 0.0,
        vegetation_burden: float = 0.0,
        spalling_burden: float = 0.0,
        dislodgement_burden: float = 0.0,
        inlet_condition: str = "unknown",
        outlet_condition: str = "unknown",
        siltation_level: str = "unknown",
        water_presence: str = "unknown",
        catchment_condition: str = "unknown",
        inferred_material: str = "hydraulic_lime_mortar",
        recent_repair_type: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """Deduce causal failure chains from defect burdens and inspection observations."""
        findings: List[Dict[str, Any]] = []

        # 1. Vegetation Root Intrusion & Joint Wedging
        if vegetation_burden > 0.05 or dislodgement_burden > 0.05:
            urgency = "critical" if vegetation_burden > 0.20 or dislodgement_burden > 0.15 else "high"
            findings.append({
                "finding": "Invasive woody vegetation root penetration into masonry bedding joints.",
                "probable_cause": (
                    "Likely contributing factor: Root expansion of woody species (e.g. Ficus religiosa, Prosopis juliflora) "
                    "exerts progressive radial wedging pressure (>1.5 MPa), displacing sacrificial lime mortar and forcing "
                    "retaining wall stone blocks out of alignment. Requires endoscopic root depth inspection."
                ),
                "evidence_rules": [
                    f"Vegetation surface burden: {vegetation_burden*100:.1f}%",
                    f"Masonry stone dislodgement burden: {dislodgement_burden*100:.1f}%",
                    "Rule: VEGETATION -> ROOT INTRUSION -> MORTAR DISPLACEMENT -> MASONRY DISLODGEMENT",
                ],
                "urgency": urgency,
            })

        # 2. Blocked Inflow & Catchment Starvation
        if inlet_condition in ["choked", "broken", "partially_blocked"] or catchment_condition in ["severely_encroached", "partially_encroached"]:
            urgency = "high" if inlet_condition in ["choked", "broken"] else "medium"
            findings.append({
                "finding": "Inflow starvation and severed feeder catchment continuity.",
                "probable_cause": (
                    "Possible cause: Physical blockage of historical stone inlet channels or peripheral urban encroachment "
                    "prevents localized sheet runoff from reaching storage cisterns, starving the structure of monsoon replenishment."
                ),
                "evidence_rules": [
                    f"Inlet condition: '{inlet_condition}'",
                    f"Catchment condition: '{catchment_condition}'",
                    "Rule: BLOCKED INLET / ENCHROACHED CATCHMENT -> REDUCED INFLOW -> CHRONIC HYDRAULIC DESICCATION",
                ],
                "urgency": urgency,
            })

        # 3. Bed Siltation & Aquifer Recharge Interface Choking
        if siltation_level in ["severe", "moderate"]:
            urgency = "high" if siltation_level == "severe" else "medium"
            findings.append({
                "finding": "Dense bed siltation sealing subterranean aquifer recharge strata.",
                "probable_cause": (
                    "Likely contributing factor: Long-term unmitigated stormwater sediment deposition forms a compacted, "
                    "impervious fine clay/silt blanket over the well cylinder bed, severing direct hydraulic connection "
                    "with the underlying unconfined sandy-gravel aquifer."
                ),
                "evidence_rules": [
                    f"Siltation level: '{siltation_level}'",
                    "Rule: UNFILTERED RUNOFF -> HEAVY SILTATION -> AQUIFER PERMEABILITY CHOKED -> STAGNATION / HYDRAULIC ISOLATION",
                ],
                "urgency": urgency,
            })

        # 4. Moisture Retention, Inadequate Drainage & Spalling
        if (spalling_burden > 0.05 or water_presence == "stagnant") and outlet_condition in ["choked", "broken", "partially_blocked", "unknown"]:
            urgency = "high" if spalling_burden > 0.15 else "medium"
            findings.append({
                "finding": "Excessive moisture entrapment and stone surface spalling.",
                "probable_cause": (
                    "Possible cause: Blocked drainage or high water table pooling induces continuous capillary rising damp. "
                    "Subsequent evaporation at the masonry face concentrates soluble salts in stone pore mouths, driving "
                    "crypto-efflorescence crystallization pressure that flakes the stone face. Requires salt profiling."
                ),
                "evidence_rules": [
                    f"Spalling burden: {spalling_burden*100:.1f}%",
                    f"Water status: '{water_presence}'",
                    f"Outlet status: '{outlet_condition}'",
                    "Rule: BLOCKED DRAINAGE -> RISING DAMP CONCENTRATION -> SALT CRYPTOFLORESCENCE -> SURFACE SPALLING",
                ],
                "urgency": urgency,
            })

        # 5. Incompatible Cement Repair Damage
        if recent_repair_type and ("cement" in recent_repair_type.lower() or "opc" in recent_repair_type.lower()):
            findings.append({
                "finding": "Incompatible modern Portland cement pointing / rendering crust.",
                "probable_cause": (
                    "Likely contributing factor: Rigid, non-breathable cement render traps subterranean water inside the "
                    "historic masonry wall. Inability to breathe through joints forces moisture into historic stone blocks, "
                    "inducing accelerated spalling directly adjacent to cement seams. Requires immediate poulticing and raking."
                ),
                "evidence_rules": [
                    f"Recent repair material: '{recent_repair_type}'",
                    f"Substrate material: '{inferred_material}'",
                    "Rule: CEMENT PLASTER -> VAPOR BARRIER -> SALT SUB-FLORESCENCE -> ACCELERATED STONE SPALLING",
                ],
                "urgency": "critical",
            })

        # 6. Deep Structural Shear / Settlement Cracking
        if crack_burden > 0.10:
            urgency = "critical" if crack_burden > 0.25 else "high"
            findings.append({
                "finding": "Extensive structural masonry cracking.",
                "probable_cause": (
                    "Possible cause: Continuous diagonal or horizontal crack patterns typically indicate differential "
                    "foundation settlement or excessive active lateral earth pressure against retaining revetments following "
                    "groundwater table depression. Mandatory geotechnical audit required before cosmetic repointing."
                ),
                "evidence_rules": [
                    f"Crack burden: {crack_burden*100:.1f}%",
                    "Rule: LATERAL SOIL THRUST / SUBSIDENCE -> TENSILE SHEAR STRAIN -> STEPPED STRUCTURAL CRACKING",
                ],
                "urgency": urgency,
            })

        # Default fallback if no significant defect was triggered
        if not findings:
            findings.append({
                "finding": "No critical failure mechanism detected from available visual inputs.",
                "probable_cause": "Structure exhibits baseline stability; routine preventative maintenance recommended.",
                "evidence_rules": [
                    "All observed defect burdens remain below active failure thresholds (<5% coverage).",
                    "Rule: ROUTINE PREVENTATIVE SURVEILLANCE",
                ],
                "urgency": "low",
            })

        return findings


default_root_cause_engine = RootCauseDeductionEngine()


def deduce_root_causes(
    crack_burden: float = 0.0,
    vegetation_burden: float = 0.0,
    spalling_burden: float = 0.0,
    dislodgement_burden: float = 0.0,
    inlet_condition: str = "unknown",
    outlet_condition: str = "unknown",
    siltation_level: str = "unknown",
    water_presence: str = "unknown",
    catchment_condition: str = "unknown",
    inferred_material: str = "hydraulic_lime_mortar",
    recent_repair_type: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """Convenience function for root cause analysis."""
    return default_root_cause_engine.deduce(
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
