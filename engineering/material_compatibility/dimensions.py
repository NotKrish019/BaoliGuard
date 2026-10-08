"""Multi-dimensional material compatibility evaluation rules and scoring logic.

Evaluates candidate intervention materials against historic substrates across
7 transparent, deterministic conservation engineering dimensions:
1. Mechanical Compatibility (Sacrificial stiffness & strength)
2. Moisture Compatibility (Breathability, vapor permeability & capillary behavior)
3. Thermal Compatibility (Thermal expansion coefficient matching)
4. Chemical Compatibility (Absence of soluble sulfates/alkalis, autogenous healing)
5. Reversibility (Retreatability without host substrate destruction)
6. Heritage Alignment (Conformity to IKS traditions, ASI & INTACH conservation ethics)
7. Visual Compatibility (Texture, patina, color, and aggregate harmony)
"""

from __future__ import annotations

from typing import Any, Dict, List, Tuple


# Deterministic dimension weighting summing to 1.00 (100%)
COMPATIBILITY_WEIGHTS: Dict[str, float] = {
    "moisture": 0.25,      # Critical: moisture entrapment is the primary cause of heritage decay
    "mechanical": 0.20,    # Sacrificial principle: mortar must be softer than historic stone
    "chemical": 0.15,      # Prevention of soluble salt / ettringite attack
    "reversibility": 0.15, # Core conservation charter mandate: non-destructive retreatability
    "heritage": 0.10,      # Preservation of authentic IKS formulations and craftsmanship
    "thermal": 0.10,       # Prevention of interfacial shearing under diurnal heat swings
    "visual": 0.05,        # Aesthetic patina, color, and aggregate texture harmony
}

RECOMMENDED_STANDARD_TESTS: List[str] = [
    "Thin-section petrographic microscopy for mineralogical aggregate classification",
    "X-ray powder diffraction (XRD) for binder crystalline phase characterization",
    "Acid digestion and gravimetric insoluble residue analysis for binder-to-aggregate ratio",
    "Standard RILEM tube water absorption test for capillary moisture uptake",
    "Soluble salt ion chromatography (sulfate, nitrate, chloride concentrations)",
]


def evaluate_mechanical(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate mechanical compatibility and sacrificial behavior.

    Conservation Rule: An intervention mortar must have lower stiffness (elastic modulus)
    and compressive strength than the host substrate, acting sacrificially to protect historic fabric.
    """
    warnings: List[str] = []
    sub_str = substrate.get("known_properties", {}).get("compressive_strength_mpa_range", [2.0, 5.0])
    int_str = intervention.get("known_properties", {}).get("compressive_strength_mpa_range", [2.0, 5.0])
    sub_mid = (sub_str[0] + sub_str[1]) / 2.0
    int_mid = (int_str[0] + int_str[1]) / 2.0

    ratio = int_mid / max(sub_mid, 0.5)

    if ratio > 2.0:
        score = max(1.0, 10.0 - (ratio * 2.2))
        warnings.append(
            f"MECHANICAL MISMATCH: Intervention compressive strength (~{int_mid:.1f} MPa) significantly exceeds "
            f"substrate capacity (~{sub_mid:.1f} MPa). The repair is anti-sacrificial; thermal and ground movements "
            f"will force fractures through the historic stone/brick edges rather than yielding in the joint."
        )
    elif ratio > 1.2:
        score = 4.5
        warnings.append(
            f"ELEVATED STIFFNESS: Intervention strength (~{int_mid:.1f} MPa) exceeds substrate strength (~{sub_mid:.1f} MPa). "
            f"High risk of localized stress concentration and accelerated arrises spalling."
        )
    elif 0.4 <= ratio <= 1.0:
        # Ideal sacrificial range
        score = 9.5
    elif 0.2 <= ratio < 0.4:
        # Soft repair, suitable for non-load-bearing or decorative features
        score = 7.5
    else:
        # Excessively soft
        score = 5.0
        warnings.append("VERY LOW STRENGTH: Suitable only for non-structural pointing and decorative renders.")

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_moisture(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate moisture compatibility and breathability.

    Conservation Rule: The intervention must remain more permeable or equally permeable
    to water vapor compared to the host masonry to prevent moisture entrapment.
    """
    warnings: List[str] = []
    sub_perm = substrate.get("known_properties", {}).get("vapor_permeability_perm_range", [10.0, 20.0])
    int_perm = intervention.get("known_properties", {}).get("vapor_permeability_perm_range", [10.0, 20.0])
    sub_mid = (sub_perm[0] + sub_perm[1]) / 2.0
    int_mid = (int_perm[0] + int_perm[1]) / 2.0

    if int_mid < 3.0:
        # Severe vapor barrier (OPC or synthetic resin)
        score = 1.0
        warnings.append(
            f"CRITICAL MOISTURE BARRIER: Intervention vapor permeability (~{int_mid:.1f} Perm) acts as an impermeable "
            f"seal on breathable historic masonry (~{sub_mid:.1f} Perm). Subsurface rising damp will be forced sideways, "
            f"triggering cryptoflorescence, frost wedging, and destructive stone face spalling."
        )
    elif int_mid < sub_mid * 0.7:
        score = 4.0
        warnings.append(
            f"RESTRICTED BREATHABILITY: Permeability (~{int_mid:.1f} Perm) is lower than substrate (~{sub_mid:.1f} Perm). "
            f"Drying rate will be impeded, increasing risk of damp retention in masonry core."
        )
    elif int_mid >= sub_mid * 0.9:
        score = 9.8
    else:
        score = 7.5

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_thermal(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate thermal dilation compatibility under diurnal temperature cycles."""
    warnings: List[str] = []
    sub_coeff = substrate.get("known_properties", {}).get("thermal_expansion_coeff_1e6_k", 8.0)
    int_coeff = intervention.get("known_properties", {}).get("thermal_expansion_coeff_1e6_k", 8.0)

    delta = abs(sub_coeff - int_coeff)

    if delta > 20.0:
        score = 1.5
        warnings.append(
            f"THERMAL EXPANSION MISMATCH: Intervention expansion ({int_coeff:.1f} x 10^-6/K) is drastically different "
            f"from host stone ({sub_coeff:.1f} x 10^-6/K). Rapid diurnal desert temperature swings will cause interfacial shear "
            f"delamination or tearing of the historic stone arrises."
        )
    elif delta > 8.0:
        score = 4.5
        warnings.append(
            f"ELEVATED THERMAL STRAIN: Significant expansion differential (delta: {delta:.1f} x 10^-6/K). "
            f"May cause micro-fissuring at the joint contact interface over multi-year cycles."
        )
    elif delta <= 3.0:
        score = 9.5
    else:
        score = 7.5

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_chemical(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate chemical inertness, autogenous healing, and absence of destructive salts."""
    warnings: List[str] = []
    int_fam = intervention.get("material_family", "")
    int_id = intervention.get("material_id", "")

    if "cement" in int_fam or "cement" in int_id:
        score = 2.0
        warnings.append(
            "CHEMICAL INCOMPATIBILITY: Cement hydration releases soluble sodium/potassium hydroxides and sulfates. "
            "These react with calcium carbonates in historic lime and sandstone to form expansive ettringite and "
            "thaumasite mineral phases, inducing destructive internal crystallization pressure."
        )
    elif "filler" in int_fam or "acrylic" in int_id or "epoxy" in int_id:
        score = 2.5
        warnings.append(
            "SYNTHETIC RESIN DEGRADATION: Organic polymers degrade under solar ultraviolet radiation and subterranean dampness, "
            "releasing organic degradation by-products and forming yellow, embrittled cross-linked crusts."
        )
    elif "lime" in int_fam:
        score = 9.5
    else:
        score = 7.0

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_reversibility(intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate retreatability and reversibility without loss of historic substrate."""
    warnings: List[str] = []
    rev_data = intervention.get("reversibility", {})
    score = float(rev_data.get("reversibility_score", 5.0))

    if score < 4.0:
        warnings.append(
            f"NON-REVERSIBLE INTERVENTION: Reversibility score ({score}/10) is critically low. Future removal requires "
            f"destructive mechanical cutting that inevitably damages original historic fabric, violating international conservation ethics."
        )

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_heritage(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate alignment with traditional IKS construction methods and ASI/INTACH ethics."""
    warnings: List[str] = []
    int_fam = intervention.get("material_family", "")

    if "surkhi" in intervention.get("material_id", ""):
        score = 9.8
    elif "lime" in int_fam:
        score = 9.0
    elif "cement" in int_fam:
        score = 1.0
        warnings.append(
            "ETHICAL & POLICY VIOLATION: Portland cement rendering on historic monuments is explicitly prohibited by the "
            "ASI Conservation Manual (2020) and INTACH Charter (2004)."
        )
    elif "filler" in int_fam:
        score = 1.5
        warnings.append("ALIEN MATERIAL: Synthetic fillers lack historical authenticity and indigenous craftsmanship alignment.")
    else:
        score = 6.0

    return round(min(10.0, max(0.0, score)), 1), warnings


def evaluate_visual(substrate: Dict[str, Any], intervention: Dict[str, Any]) -> Tuple[float, List[str]]:
    """Evaluate visual texture, color, and aging compatibility."""
    warnings: List[str] = []
    int_fam = intervention.get("material_family", "")

    if "surkhi" in intervention.get("material_id", ""):
        score = 9.2
    elif "lime" in int_fam:
        score = 8.5
    elif "cement" in int_fam:
        score = 2.0
        warnings.append("VISUAL DISHARMONY: Cold grey cement matrix contrasts harshly with warm, patinated historic stone.")
    elif "filler" in int_fam:
        score = 2.5
        warnings.append("ARTIFICIAL GLOSS: Synthetic polymer creates an unnatural plastic sheen incompatible with historic stone texture.")
    else:
        score = 7.0

    return round(min(10.0, max(0.0, score)), 1), warnings


def compute_composite_compatibility(
    dimensions: Dict[str, float]
) -> Tuple[float, str]:
    """Calculate weighted composite compatibility score and map to conservation recommendation."""
    score_out_of_100 = 0.0
    for dim_name, weight in COMPATIBILITY_WEIGHTS.items():
        dim_score = dimensions.get(dim_name, 5.0)
        # Each dimension is 0-10, so dim_score * 10 gives a 0-100 scale component
        score_out_of_100 += (dim_score * 10.0) * weight

    score_out_of_100 = round(min(100.0, max(0.0, score_out_of_100)), 1)

    if score_out_of_100 >= 80.0:
        recommendation = "strongly_recommended"
    elif score_out_of_100 >= 65.0:
        recommendation = "recommended"
    elif score_out_of_100 >= 45.0:
        recommendation = "acceptable_conditional"
    else:
        recommendation = "prohibited_incompatible"

    return score_out_of_100, recommendation
