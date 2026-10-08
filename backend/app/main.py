"""BaoliGuard FastAPI Application Entrypoint.

Phase 0 bootstrap implementation providing base health endpoint.
No production endpoints or fabricated analysis results are active in Phase 0.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BaoliGuard API",
    description="Jal-Dharohar Digital Intelligence & Conservation Platform API",
    version="0.1.0",
)

# CORS setup for local development with frontend PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def get_health() -> dict[str, str]:
    """Health check endpoint to verify backend service readiness.

    Returns:
        dict: Standardized health status response.
    """
    return {
        "status": "ok",
        "project": "baoliguard",
        "version": "0.1.0",
    }


# Placeholder note:
# Additional endpoints such as POST /analyze will be orchestrated by Swastik Parmar
# during Phase 1 based on the shared contracts in /contracts.
