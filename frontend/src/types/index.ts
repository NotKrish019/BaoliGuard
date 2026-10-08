/**
 * BaoliGuard Frontend Type Definitions.
 *
 * Phase 0:
 * Types align with JSON contracts in /contracts.
 * Concrete models will be populated by Anika Jain in Phase 1.
 */

export interface StructureContext {
  type: 'baoli' | 'bawari' | 'kund' | 'vav' | 'tank' | 'other';
  region?: string;
  source_images: string[];
}

export interface MetricScore {
  value: number;
  scale_min: number;
  scale_max: number;
  method: string;
  confidence: number;
  limitations: string[];
}

export interface DetectionItem {
  class_name: string;
  confidence: number;
  bounding_box: [number, number, number, number];
  segmentation_mask_reference?: string;
  pixel_area: number;
  coverage_ratio: number;
  component_count: number;
  total_length_pixels?: number;
  largest_component_length_pixels?: number;
}

/**
 * High-level Analysis Result Contract representation.
 */
export interface AnalysisResultContract {
  project_version: string;
  structure: StructureContext;
  vision: {
    structure_type: string;
    detections: DetectionItem[];
  };
  visual_condition: {
    score: MetricScore;
  };
  water_functionality: {
    score: MetricScore;
  };
  material: {
    original_material: string;
    original_material_confidence: number;
  };
  root_cause: Record<string, unknown>;
  restoration: {
    priority_score: MetricScore;
  };
  metadata: Record<string, unknown>;
}
