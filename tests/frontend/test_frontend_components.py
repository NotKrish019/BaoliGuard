"""Frontend component and scaffold tests for Phase 1 (PWA Foundation + Design System).

Owner: Anika Jain (Frontend / PWA / Digital Twin)
"""

import json
from pathlib import Path


def test_reusable_components_exist() -> None:
    """Verify presence of all required Phase 1 reusable UI components."""
    frontend_src = Path(__file__).resolve().parent.parent.parent / "frontend" / "src"
    components_dir = frontend_src / "components"

    required_components = [
        "Header.tsx",
        "Navigation.tsx",
        "PageContainer.tsx",
        "Section.tsx",
        "Button.tsx",
        "Card.tsx",
        "StatusBadge.tsx",
        "ScoreCard.tsx",
        "EmptyState.tsx",
        "LoadingState.tsx",
        "UploadZone.tsx",
    ]

    for comp in required_components:
        target = components_dir / comp
        assert target.exists(), f"Missing required reusable component: {comp}"


def test_page_routes_exist() -> None:
    """Verify presence of all required Phase 1 page views."""
    frontend_src = Path(__file__).resolve().parent.parent.parent / "frontend" / "src"
    pages_dir = frontend_src / "pages"

    required_pages = [
        "HomePage.tsx",
        "UploadPage.tsx",
        "AnalysisPage.tsx",
        "ReportPage.tsx",
    ]

    for page in required_pages:
        target = pages_dir / page
        assert target.exists(), f"Missing required page view: {page}"


def test_pwa_manifest_validity() -> None:
    """Verify that frontend/public/manifest.json is well-formed PWA manifest."""
    manifest_path = Path(__file__).resolve().parent.parent.parent / "frontend" / "public" / "manifest.json"
    assert manifest_path.exists(), "PWA manifest.json must exist in public/"

    with open(manifest_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert data.get("short_name") == "BaoliGuard"
    assert "start_url" in data
    assert data.get("display") == "standalone"


def test_api_service_and_mock_fixtures_exist() -> None:
    """Verify presence of API service abstraction, types, and mock fixtures."""
    frontend_src = Path(__file__).resolve().parent.parent.parent / "frontend" / "src"

    assert (frontend_src / "services" / "api.ts").exists(), "services/api.ts must exist"
    assert (frontend_src / "types" / "index.ts").exists(), "types/index.ts must exist"
    assert (frontend_src / "mocks" / "fixtures.ts").exists(), "mocks/fixtures.ts must exist"


def test_phase2_inspection_components_exist() -> None:
    """Verify presence of Phase 2 inspection, ROI selection, and visualization components."""
    frontend_src = Path(__file__).resolve().parent.parent.parent / "frontend" / "src"
    components_dir = frontend_src / "components"

    phase2_components = [
        "InspectionCanvas.tsx",
        "ROISelector.tsx",
        "DefectLegend.tsx",
        "VisualMetricsPanel.tsx",
    ]

    for comp in phase2_components:
        target = components_dir / comp
        assert target.exists(), f"Missing required Phase 2 component: {comp}"

    sample_asset = Path(__file__).resolve().parent.parent.parent / "frontend" / "public" / "samples" / "stepwell_ashlar_wall.svg"
    assert sample_asset.exists(), "Sample stepwell SVG asset must exist in public/samples/"


def test_phase3_iks_material_restoration_components_exist() -> None:
    """Verify presence of Phase 3 IKS, Material DNA, and Restoration components."""
    frontend_src = Path(__file__).resolve().parent.parent.parent / "frontend" / "src"
    components_dir = frontend_src / "components"

    phase3_components = [
        "ConservationChain.tsx",
        "MaterialDnaCard.tsx",
        "WhyThisRecommendation.tsx",
        "RootCauseAnalysisCard.tsx",
        "RestorationRoadmap.tsx",
    ]

    for comp in phase3_components:
        target = components_dir / comp
        assert target.exists(), f"Missing required Phase 3 component: {comp}"


def test_phase4_digital_twin_assets_and_components() -> None:
    """Verify presence of Phase 4 Digital Twin, 3D simulation components, and assets."""
    repo_root = Path(__file__).resolve().parent.parent.parent
    frontend_src = repo_root / "frontend" / "src"

    assert (frontend_src / "components" / "DigitalTwinViewer.tsx").exists(), "DigitalTwinViewer.tsx must exist"
    assert (frontend_src / "pages" / "DigitalTwinPage.tsx").exists(), "DigitalTwinPage.tsx must exist"

    # Verify GLTF model exists in both digital_twin/models and frontend/public/models
    gltf_twin = repo_root / "digital_twin" / "models" / "baoli_stepwell.gltf"
    gltf_public = repo_root / "frontend" / "public" / "models" / "baoli_stepwell.gltf"
    assert gltf_twin.exists(), "baoli_stepwell.gltf must exist in digital_twin/models/"
    assert gltf_public.exists(), "baoli_stepwell.gltf must exist in frontend/public/models/"

    with open(gltf_public, "r", encoding="utf-8") as f:
        gltf_data = json.load(f)
    assert gltf_data.get("asset", {}).get("version") == "2.0", "GLTF asset version must be 2.0"
    assert "scenes" in gltf_data and "nodes" in gltf_data and "meshes" in gltf_data

    # Verify Hotspots & Simulation metadata exists
    metadata_twin = repo_root / "digital_twin" / "metadata" / "defect_hotspots.json"
    metadata_public = repo_root / "frontend" / "public" / "models" / "defect_hotspots.json"
    assert metadata_twin.exists(), "defect_hotspots.json must exist in digital_twin/metadata/"
    assert metadata_public.exists(), "defect_hotspots.json must exist in frontend/public/models/"

    with open(metadata_public, "r", encoding="utf-8") as f:
        meta_data = json.load(f)
    assert "hotspots" in meta_data, "Metadata must contain hotspots"
    assert "restoration_zones" in meta_data, "Metadata must contain restoration_zones"
    assert len(meta_data["hotspots"]) >= 5, "Metadata should contain at least 5 spatial defect hotspots"


