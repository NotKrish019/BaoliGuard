# BaoliGuard Computer Vision Subsystem

**Owner:** Krish (Computer Vision / AI)  
**Primary Ownership:**
- `/vision`
- `/scripts/vision`
- `/vision/tests`

---

## 1. Overview
The Computer Vision module is responsible for the **SEE** component of the Jal-Dharohar conservation pipeline:
- Extracting visual observations from heritage water structure imagery.
- Detecting defects: surface cracking, vegetation intrusion (root and micro-flora), stone spalling, efflorescence, and structural dislodgement.
- Performing YOLOv8 instance segmentation to generate pixel masks.
- Utilizing OpenCV and scikit-image for morphological post-processing and relative image-space metrics (coverage ratio, component counts, crack length).

---

## 2. Phase 0 Status
- **Current State:** Bootstrap only.
- **Rules Enforced:**
  - NO models trained.
  - NO weights committed (`*.pt`, `*.onnx` ignored via `.gitignore`).
  - NO datasets committed.
  - Output contract matches [`/contracts/vision_result.schema.json`](file:///contracts/vision_result.schema.json).

---

## 3. Directory Layout
```
vision/
├── README.md
├── configs/         # YOLO training and inference YAML configurations
├── datasets/        # Local dataset symlinks and splits (uncommitted)
├── inference/       # Pipeline entrypoints for inference execution
├── metrics/         # Morphological and defect measurement logic
├── model/           # Local model weights storage (uncommitted)
├── outputs/         # Visual inspection overlays & masks (uncommitted)
├── postprocessing/  # OpenCV skeletonization & component analysis
├── preprocessing/   # Image normalization, tile splitting, resizing
├── tests/           # Vision-specific unit and regression tests
└── training/        # YOLO fine-tuning scripts and augmentation rules
```

---

## 4. Phase 1 Roadmap for Krish
1. Create dataset layout in `data/raw/` locally (Darbhanga Fort imagery).
2. Configure YOLOv8 segmentation pipeline in `configs/`.
3. Implement `inference/` to output payloads strictly adhering to `vision_result.schema.json`.
