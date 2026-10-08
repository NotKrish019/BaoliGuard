/**
 * BaoliGuard API Service Layer.
 *
 * Phase 0 Placeholder:
 * Establishes communication interface with FastAPI backend.
 * Implementation will be completed by Anika Jain in Phase 1.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface HealthResponse {
  status: string;
  project: string;
  version: string;
}

/**
 * Checks backend health status.
 */
export async function checkBackendHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Backend health check failed: ${response.statusText}`);
  }
  return response.json();
}

/**
 * TODO: Phase 1 - Anika Jain & Swastik Parmar
 * Implement submitAnalysisRequest(formData: FormData) aligned with /contracts/analysis.schema.json
 */
