"""Unit tests for dataset discovery and audit functionality.

BaoliGuard Computer Vision Subsystem - Phase 1 Audit Tests
Owner: Krish (Computer Vision / AI)
"""

import sys
from pathlib import Path
import pytest
from PIL import Image

# Ensure project root is on sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from scripts.vision.audit_dataset import audit_dataset, find_dataset_dir, calculate_file_hash


def test_find_dataset_dir() -> None:
    """Verify that dataset locator correctly discovers local dataset directory."""
    data_dir = find_dataset_dir()
    assert data_dir is not None, "Dataset directory must be discoverable"
    assert data_dir.exists(), f"Discovered path {data_dir} must exist"


def test_audit_discovers_images() -> None:
    """Verify that audit identifies images and counts correctly."""
    data_dir = find_dataset_dir()
    assert data_dir is not None
    results = audit_dataset(data_dir)

    assert results["total_images"] > 0, "Audit must discover image files"
    assert "damaged_images_count" in results
    assert "background_images_count" in results
    assert results["corrupted_images_count"] == 0, "No corrupted images expected in raw dataset"


def test_audit_identifies_corrupted_file(tmp_path: Path) -> None:
    """Verify that audit correctly catches unreadable/corrupted files."""
    # Create valid dummy image
    valid_img = tmp_path / "valid.jpg"
    img = Image.new("RGB", (64, 64), color=(255, 0, 0))
    img.save(valid_img)

    # Create corrupted dummy image
    corrupted_img = tmp_path / "corrupted.jpg"
    corrupted_img.write_bytes(b"NOT_A_VALID_JPEG_HEADER_CONTENT")

    results = audit_dataset(tmp_path)
    assert results["total_images"] == 2
    assert results["corrupted_images_count"] == 1
    assert any("corrupted.jpg" in s for s in results["corrupted_images"])


def test_audit_annotation_status() -> None:
    """Verify that audit correctly reports absent annotations for raw Darbhanga set."""
    data_dir = find_dataset_dir()
    assert data_dir is not None
    results = audit_dataset(data_dir)

    annotation_audit = results["annotation_audit"]
    assert "status" in annotation_audit
    assert annotation_audit["status"] == "ANNOTATIONS NOT PRESENT / NOT LOCATED"
    assert annotation_audit["total_annotation_files"] == 0


def test_calculate_file_hash(tmp_path: Path) -> None:
    """Verify MD5 file hash calculation produces valid 32-character hex."""
    sample_file = tmp_path / "sample.txt"
    sample_file.write_text("BaoliGuard Vision Audit")
    fhash = calculate_file_hash(sample_file)

    assert len(fhash) == 32
    assert isinstance(fhash, str)
