"""Darbhanga Heritage Damage Dataset Audit Tool.

BaoliGuard Computer Vision Subsystem - Phase 1 Audit
Owner: Krish (Computer Vision / AI)

Recursively audits image counts, extensions, resolutions, corrupted files,
duplicates, and most importantly, presence/absence of segmentation annotations.
"""

import argparse
import hashlib
import json
import os
import sys
from collections import Counter
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

try:
    from PIL import Image
except ImportError:
    Image = None


def find_dataset_dir(provided_path: Optional[str] = None) -> Optional[Path]:
    """Locates the dataset directory using provided path or common fallback paths."""
    if provided_path:
        p = Path(provided_path)
        if p.exists():
            return p

    candidates = [
        Path("Darbhanga_Fort/Darbhanga_Fort"),
        Path("Darbhanga_Fort"),
        Path("data/raw/Darbhanga_Fort/Darbhanga_Fort"),
        Path("data/raw/Darbhanga_Fort"),
        Path("data/raw"),
    ]

    for candidate in candidates:
        if candidate.exists() and (
            (candidate / "Damaged_images").exists()
            or (candidate / "Background_images").exists()
        ):
            return candidate

    for candidate in candidates:
        if candidate.exists():
            return candidate

    return None


def calculate_file_hash(filepath: Path, chunk_size: int = 65536) -> str:
    """Calculates MD5 hash of a file for exact duplicate detection."""
    hasher = hashlib.md5()
    with open(filepath, "rb") as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()


def audit_dataset(root_dir: Path) -> Dict[str, Any]:
    """Runs comprehensive audit over the target dataset directory."""
    image_exts = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tiff", ".tif"}
    annotation_exts = {".txt", ".json", ".xml", ".yaml", ".yml", ".csv"}

    all_files: List[Path] = []
    for dirpath, _, filenames in os.walk(root_dir):
        for fname in filenames:
            all_files.append(Path(dirpath) / fname)

    total_files = len(all_files)
    image_files: List[Path] = []
    annotation_files: List[Path] = []
    other_files: List[Path] = []

    ext_counts: Counter[str] = Counter()

    for f in all_files:
        ext = f.suffix.lower()
        ext_counts[ext] += 1
        if ext in image_exts:
            image_files.append(f)
        elif ext in annotation_exts and f.name != ".gitkeep":
            annotation_files.append(f)
        elif f.name != ".gitkeep":
            other_files.append(f)

    # Subdirectory breakdown
    damaged_images: List[Path] = []
    background_images: List[Path] = []
    uncategorized_images: List[Path] = []

    for img in image_files:
        parts = [p.lower() for p in img.parts]
        if any("damaged" in p for p in parts):
            damaged_images.append(img)
        elif any("background" in p or "nd" in img.stem.lower() for p in parts):
            background_images.append(img)
        else:
            uncategorized_images.append(img)

    # Image metadata inspection
    corrupted_images: List[str] = []
    dimensions: Counter[Tuple[int, int]] = Counter()
    aspect_ratios: Counter[str] = Counter()
    file_hashes: Dict[str, List[str]] = {}
    duplicate_names: Counter[str] = Counter()

    for img in image_files:
        duplicate_names[img.name] += 1

        # Calculate hash for duplicate detection
        try:
            fhash = calculate_file_hash(img)
            file_hashes.setdefault(fhash, []).append(str(img))
        except Exception:
            pass

        # Check readability with PIL if available
        if Image is not None:
            try:
                with Image.open(img) as pil_img:
                    pil_img.verify()
                # Re-open for size / mode (verify() closes file pointer)
                with Image.open(img) as pil_img:
                    w, h = pil_img.size
                    dimensions[(w, h)] += 1
                    ratio = round(w / h, 2)
                    aspect_ratios[f"{ratio:.2f}"] += 1
            except Exception as e:
                corrupted_images.append(f"{img}: {str(e)}")

    exact_duplicates = {h: paths for h, paths in file_hashes.items() if len(paths) > 1}
    dup_filenames = {name: count for name, count in duplicate_names.items() if count > 1}

    # Inspect annotation files if any were found
    annotation_summary: Dict[str, Any] = {
        "total_annotation_files": len(annotation_files),
        "files": [str(p.relative_to(root_dir)) for p in annotation_files[:20]],
        "segmentation_labels_present": False,
        "classes_found": [],
        "notes": "",
    }

    if len(annotation_files) == 0:
        annotation_summary["status"] = "ANNOTATIONS NOT PRESENT / NOT LOCATED"
        annotation_summary["notes"] = (
            "No annotation files (*.txt, *.json, *.xml, *.yaml, *.csv) found in raw dataset. "
            "Raw dataset consists solely of classified image folders without polygon/mask boundaries."
        )
    else:
        annotation_summary["status"] = "ANNOTATIONS FOUND"
        # Check if they are YOLO or COCO or other
        # Will be inspected if files exist

    return {
        "dataset_root": str(root_dir),
        "total_files": total_files,
        "total_images": len(image_files),
        "damaged_images_count": len(damaged_images),
        "background_images_count": len(background_images),
        "uncategorized_images_count": len(uncategorized_images),
        "file_extensions": dict(ext_counts),
        "corrupted_images_count": len(corrupted_images),
        "corrupted_images": corrupted_images,
        "unique_resolutions": [
            {"width": w, "height": h, "count": c}
            for (w, h), c in dimensions.most_common(10)
        ],
        "aspect_ratios": dict(aspect_ratios.most_common(5)),
        "exact_duplicate_content_count": len(exact_duplicates),
        "duplicate_filenames_count": len(dup_filenames),
        "annotation_audit": annotation_summary,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit Darbhanga Heritage Dataset")
    parser.add_argument("--data-dir", type=str, default=None, help="Path to raw dataset root")
    parser.add_argument("--json", action="store_true", help="Output audit results as JSON")
    args = parser.parse_args()

    data_dir = find_dataset_dir(args.data_dir)
    if data_dir is None:
        print("ERROR: Could not locate dataset directory.", file=sys.stderr)
        print("Checked: Darbhanga_Fort, data/raw, data/raw/Darbhanga_Fort", file=sys.stderr)
        sys.exit(1)

    print(f"Auditing dataset at: {data_dir}...")
    results = audit_dataset(data_dir)

    if args.json:
        print(json.dumps(results, indent=2))
        return

    print("\n" + "=" * 60)
    print("BAOLIGUARD VISION — PHASE 1 DATASET AUDIT REPORT")
    print("=" * 60)
    print(f"Dataset Root: {results['dataset_root']}")
    print(f"Total Files Scanned: {results['total_files']}")
    print(f"Total Images: {results['total_images']}")
    print(f"  - Damaged Images: {results['damaged_images_count']}")
    print(f"  - Background Images: {results['background_images_count']}")
    print(f"  - Uncategorized: {results['uncategorized_images_count']}")
    print(f"File Extensions: {results['file_extensions']}")
    print(f"Corrupted Images: {results['corrupted_images_count']}")
    print("\nTop Image Resolutions (width x height):")
    for r in results["unique_resolutions"]:
        print(f"  - {r['width']}x{r['height']}: {r['count']} images")
    print(f"\nExact Duplicate Files (Content Hash): {results['exact_duplicate_content_count']}")
    print(f"Duplicate Filenames Across Folders: {results['duplicate_filenames_count']}")
    print("\n" + "-" * 60)
    print("ANNOTATION STATUS:")
    print(f"Status: {results['annotation_audit']['status']}")
    print(f"Annotation Files Count: {results['annotation_audit']['total_annotation_files']}")
    print(f"Notes: {results['annotation_audit']['notes']}")
    print("=" * 60)


if __name__ == "__main__":
    main()
