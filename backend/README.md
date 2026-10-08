# BaoliGuard Backend Service

**Owner:** Swastik Parmar (Backend / Integration / System Orchestration)  
**Primary Directory:** `/backend`

---

## 1. Overview
The backend service provides the central API gateway and integration orchestrator for BaoliGuard. Built with FastAPI and Pydantic, it coordinates:
1. Receiving inspection requests and imagery from the frontend.
2. Invoking the computer vision pipeline (`/vision`) to extract visual defects and measurements.
3. Invoking engineering assessment rules (`/engineering`) for condition scoring, water functionality, and material compatibility.
4. Consulting the Indian Knowledge Systems (IKS) repository (`/knowledge`).
5. Assembling the verified, contract-compliant `AnalysisResult` and returning it to the frontend.

---

## 2. Phase 0 Status
- **Current State:** Bootstrap only.
- **Implemented Endpoints:**
  - `GET /health`: Returns service health (`{"status": "ok", "project": "baoliguard", "version": "0.1.0"}`).
- **Intentionally Unimplemented:** Full analysis endpoints (`POST /analyze`), external LLM calls, and production services remain deferred until Phase 1.

---

## 3. Directory Layout
```
backend/
├── README.md
└── app/
    ├── __init__.py
    ├── main.py          # FastAPI application entrypoint
    ├── api/             # API routers and endpoints (Phase 1)
    ├── core/            # Config, settings, and security
    ├── schemas/         # Pydantic models aligning with /contracts
    ├── services/        # Service orchestrators (Vision, Eng, IKS)
    └── utils/           # Helper utilities
```

---

## 4. Local Development Setup
Run the FastAPI development server:
```bash
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```
Verify the health check endpoint:
```bash
curl http://127.0.0.1:8000/health
```
