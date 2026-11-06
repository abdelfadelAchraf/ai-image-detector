from fastapi import APIRouter, Request

from app.schemas import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health(request: Request):
    loaded = getattr(request.app.state, "predictor", None) is not None
    return HealthResponse(status="ok", model_loaded=loaded)