# BaoliGuard Vision — Phase 2 Sprint & Hackathon MVP

**Subsystem Owner:** Krish (Computer Vision / AI Lead)  
**Sprint:** Emergency Phase 2 Training Sprint (Hackathon MVP)  
**Status:** Operational MVP Pilot Trained & Verified  
**Date:** October 8, 2026

---

## 1. Executive Summary & Architecture
For the immediate hackathon prototype, BaoliGuard delivers a working two-fold visual assessment pipeline optimized for rapid edge inference on local hardware:

1. **Crack Detection:** Powered by a fine-tuned **YOLOv8n** (Nano) detection model producing localized bounding boxes and confidence scores.
2. **Vegetation Visual Indicator:** Powered by a deterministic **OpenCV HSV color-space & morphological filter** calculating biological/vegetation coverage ratio without AI black-box overhead.

> [!IMPORTANT]
> **DISCLAIMER:** This system is an engineering prototype and visual decision-support tool. It does **not** constitute a formal civil-structural safety certification or architectural stability guarantee.

---

## 2. Dataset Strategy & Phase 1 Reconciliation
- **Raw Darbhanga Fort Dataset:** The local 7,886-image dataset (`Darbhanga_Fort/Darbhanga_Fort/`) consists of 7,440 damaged images and 446 background images. **This raw dataset contains zero polygon segmentation labels.**
- **No Direct Segmentation Training:** Full YOLO segmentation training on the 7,886 unannotated images was strictly avoided to prevent invalid pseudo-mask hallucinations.
- **Pilot Dataset (`data/processed/crack_pilot/`):**
  - **Cracks:** 16 representative masonry crack images (12 train, 4 val) with normalized YOLO-format bounding boxes.
  - **Hard Negatives:** 16 background images (12 train, 4 val) displaying standard brick coursing and mortar joint lines without labels, training the model to suppress false positives on intact structural mortar.

---

## 3. Model Architecture & Training Configuration
- **Model:** `YOLOv8n` (3.0M parameters, 129 layers)
- **Pretrained Weights:** Transfer-initialized from pretrained Ultralytics weights
- **Hardware:** NVIDIA GeForce GTX 1650 (4.0 GB dedicated VRAM)
- **CUDA Environment:** PyTorch `2.5.1+cu121` on `cuda:0`
- **Resolution:** `imgsz = 512`
- **Batch Size:** `batch = 4`
- **Epochs:** 25 epochs completed in **34.4 seconds** (~1.38 s/epoch)
- **Peak GPU Memory:** 0.803 GB / 4.0 GB VRAM utilized

### Best Validation Metrics
- **Precision:** 0.642 (64.2%)
- **Recall:** 0.667 (66.7%)
- **mAP50:** 0.260 – 0.300
- **mAP50-95:** 0.259
- **Inference Latency:** **4.7 ms per image** on GPU (0.4 ms preprocess, 4.7 ms inference, 1.2 ms postprocess)
- **Local Checkpoint:** `vision/outputs/train/crack_pilot/weights/best.pt` (5.94 MB) *(Excluded from Git)*

---

## 4. Deterministic Vegetation Visual Indicator
Proper vegetation polygon annotations were absent in the raw dataset. To provide immediate visual insight without fabricating an AI model:
- **Approach:** Deterministic OpenCV pipeline (`scripts/vision/vegetation_indicator.py`).
- **Pipeline:** RGB $\rightarrow$ HSV color space $\rightarrow$ Foliage/moss hue thresholding ($H \in [28, 90]$, $S \ge 30$, $V \ge 30$) $\rightarrow$ Morphological open/close filtering $\rightarrow$ Connected component noise suppression ($Area \ge 50$ px) $\rightarrow$ Coverage ratio calculation.
- **Labeling Contract:** Strictly designated as **"visual vegetation indicator"**, NOT an AI classifier or certified detector.

---

## 5. Output Contract Specification
The vision subsystem delivers a unified JSON output contract for downstream modules (Backend / Frontend / Revive pipeline):

```json
{
  "crack": {
    "detected": true,
    "confidence": 0.84,
    "bbox": [3, 298, 646, 768]
  },
  "vegetation": {
    "visual_indicator": true,
    "coverage_ratio": 0.1518
  }
}
```

---

## 6. Demonstration Cases (`vision/outputs/demo/`)
Seven verifiable test cases are stored in `vision/outputs/demo/` for frontend and presentation validation:

| Case | Type | Key Indicator | Files |
| :--- | :--- | :--- | :--- |
| `crack_1` | Masonry Crack | Bounding box on lower-left diagonal crack (conf: 0.84) | `crack_1_orig.jpg`, `crack_1_pred.jpg` |
| `crack_2` | Masonry Crack | Bounding box on vertical fissure (conf: 0.80) | `crack_2_orig.jpg`, `crack_2_pred.jpg` |
| `crack_3` | Masonry Crack | Bounding box on surface fracture (conf: 0.76) | `crack_3_orig.jpg`, `crack_3_pred.jpg` |
| `bg_1` | Intact Masonry | **0 False Positives** on regular mortar joints | `bg_1_orig.jpg`, `bg_1_pred.jpg` |
| `bg_2` | Intact Masonry | **0 False Positives** on clean brick coursing | `bg_2_orig.jpg`, `bg_2_pred.jpg` |
| `veg_1` | Foliage Intrusion | Vegetation coverage **15.2%** detected and tinted | `veg_1_orig.jpg`, `veg_1_pred.jpg` |
| `veg_2` | Moss / Lichen | Vegetation coverage **6.6%** detected and tinted | `veg_2_orig.jpg`, `veg_2_pred.jpg` |

Summary metadata is saved in `vision/outputs/demo/evaluation_summary.json`.

---

## 7. Known Limitations & Next Steps
1. **Pilot Dataset Size:** The pilot model was trained on 24 images with 8 validation images. While achieving 64.2% precision and 66.7% recall, full coverage requires expanding the dataset to 300–400 annotated images.
2. **Detection vs. Segmentation:** Bounding box detection provides localization; polygon segmentation for millimeter-scale crack width estimation is reserved for Phase 3.
3. **Spalling:** Spalling classification was deferred in this emergency sprint and will be integrated using multi-class annotations.
4. **Visual Crack Burden Index:** Quantitative geometric burden calculation will be incorporated in the next iteration.
