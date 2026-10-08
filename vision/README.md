# BaoliGuard Vision — Phase 1 Audit

**Subsystem Owner:** Krish (Computer Vision / AI Lead)  
**Audit Date:** Phase 1 Initialization  
**Status:** Audit Complete | Annotations Not Located Locally

---

## 1. Dataset Location
- **Local Directory:** `Darbhanga_Fort/Darbhanga_Fort/`
- **Subdirectories:**
  - `Damaged_images/` (Masonry damage, cracking, weathering)
  - `Background_images/` (Non-damaged heritage masonry)
- **Git Tracking Status:** Excluded via `.gitignore` (`Darbhanga_Fort/`, `data/raw/*`).

---

## 2. Image Counts
- **Total Files Scanned:** 7,886
- **Total Images:** 7,886
  - **Damaged Images:** 7,440 (`0 (1).jpg` ... `0 (7440).jpg`)
  - **Background Images:** 446 (`ND (1).jpg` ... `ND (446).jpg`)
  - **Uncategorized:** 0
- **Corrupted / Unreadable Images:** 0 (100% readable via PIL and OpenCV)
- **Exact Duplicate Files (MD5 Hash):** 157 duplicate instances detected
- **Duplicate Filenames Across Folders:** 0

---

## 3. Image Resolution
- **Dimensions:** 100% uniform **768 x 768 pixels** across all 7,886 images.
- **Aspect Ratio:** 1.00 (square tiles).
- **Channels:** 3-channel RGB / BGR.

---

## 4. Image Format
- **Extension:** 100% `.jpg` (JPEG format).
- **Color Space:** 8-bit per channel RGB.

---

## 5. Annotation Status
> [!WARNING]
> **ANNOTATIONS NOT PRESENT / NOT LOCATED**
> 
> Comprehensive recursive search across all subdirectories confirmed:
> - Zero annotation files found (`*.txt`, `*.json`, `*.xml`, `*.yaml`, `*.yml`, `*.csv`).
> - The local dataset consists solely of **folder-level binary classification** (`Damaged_images` vs. `Background_images`).
> - **No pixel- or polygon-level bounding boxes or segmentation masks exist in the raw dataset.**

---

## 6. Available Classes
- **Dataset-Level Categories:**
  - `Damaged`: 7,440 images
  - `Non-Damaged / Background`: 446 images
- **Target Segmentation Classes (`crack`, `spalling`, `vegetation`):**
  - **Visually present** in the photos upon manual and programmatic inspection.
  - **NOT individually labeled or segmented** in the raw local files.
  - Class recovery: Cannot be recovered directly from existing metadata without an annotation phase or assisted labeling pipeline.

---

## 7. Sample Inspection
A programmatic and visual sampling across damaged and background subsets reveals:
- **Damaged Images:**
  - Mean Intensity: 121.5 (std: 20.0), Mean Contrast: 35.6 (std: 11.2).
  - Sharpness (Laplacian Variance): 52.6 (range: 17.2 to 141.4).
  - Visual characteristics: Visible diagonal/horizontal cracks, mortar joint erosion, superficial and deep stone spalling, biological patina, invasive vegetation, and varied natural outdoor illumination (direct glare to shaded undercuts).
- **Background Images:**
  - Mean Intensity: 149.8 (std: 13.6), Mean Contrast: 33.2 (std: 10.4).
  - Sharpness (Laplacian Variance): 67.4 (range: 10.1 to 164.7).
  - Visual characteristics: Intact brick courses, flat plaster, consistent mortar lines, and stone surfaces without active fissures.

---

## 8. Background / Hard-Negative Observations
- The 446 background images display **repetitive mortar courses and brick edges** with high contrast and edge density (up to 11.25%).
- **Hard-Negative Risk:** Linear mortar joints and dark shadow lines closely mimic narrow masonry cracks.
- **Strategy for Training:** These 446 images are essential hard negatives. In YOLO segmentation training, feeding background images as zero-annotation tiles is vital to suppress false positive detections on regular structural joints.

---

## 9. Python Environment
- **Python Version:** `3.14.2`
- **PyTorch:** `2.14.0+cpu` (CPU build)
- **OpenCV:** `5.0.0.93` (Installed & verified)
- **NumPy:** `2.5.3` (Installed & verified)
- **scikit-image:** Not installed in active interpreter
- **Ultralytics:** Not installed in active interpreter (Installation deferred to avoid large bandwidth timeouts during Phase 1 audit)

---

## 10. GPU Environment
- **Hardware GPU:** NVIDIA GeForce GTX 1650
- **Dedicated Video Memory (VRAM):** 4,096 MiB (4.0 GB)
- **NVIDIA Driver Version:** 616.92 | **CUDA Driver Version:** 13.4
- **PyTorch CUDA Status:** `False` (Current PyTorch installation is CPU-only `2.14.0+cpu`).
- **Implication:** The hardware supports CUDA acceleration, but PyTorch must be reinstalled with CUDA support (`torch` with CUDA 12.x) in Phase 2 to utilize GPU acceleration.

---

## 11. Pretrained Inference Smoke Test
- **Status:** **Deferred to Phase 2.**
- **Reason:** The active Python environment lacks the `ultralytics` package, and attempting live package download encountered connection timeouts on PyPI dependencies. Software stack verification will be conducted once the Phase 2 training environment is configured.

---

## 12. Known Issues & Limitations
1. **No Segmentation Ground Truth:** The raw dataset contains zero polygon annotations. Model training cannot begin until segmentation masks are generated.
2. **Class Imbalance:** 7,440 damaged vs. 446 background images (16.7:1 ratio).
3. **Data Redundancy:** 157 sets of exact duplicate files identified via MD5 hash comparison.
4. **PyTorch CPU Build:** CUDA is not yet utilized by PyTorch despite the physical presence of a 4GB GTX 1650 GPU.

---

## 13. Phase 2 Recommendations (Action Plan for Krish)
1. **Environment Setup:** Create a dedicated Python environment with CUDA-enabled PyTorch (`torch>=2.0.0+cu121`) and `ultralytics`.
2. **Annotation Strategy:**
   - Select a balanced, deduplicated subset of ~300 to 500 representative damaged images.
   - Annotate polygons for target classes:
     - Class 0: `crack`
     - Class 1: `spalling`
     - Class 2: `vegetation`
   - Evaluate model-assisted labeling (e.g. SAM / MobileSAM / Grounding DINO) to accelerate polygon generation.
3. **Incorporate Hard Negatives:** Include the 446 `Background_images` as negative training tiles to teach the model to distinguish harmless mortar courses from structural cracks.
4. **Adherence to Contract:** Ensure final inference outputs conform strictly to [`/contracts/vision_result.schema.json`](file:///contracts/vision_result.schema.json).
