from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.config import ALLOWED_CONTENT_TYPES, MAX_FILE_SIZE
from app.dependencies import get_predictor
from app.schemas import PredictionResponse
from app.services.predictor import Predictor
from app.services.preprocessing import InvalidImageError, preprocess_image

router = APIRouter(tags=["prediction"])


@router.post("/predict", response_model=PredictionResponse)
def predict(
    file: UploadFile = File(...),
    explain: bool = False,                       # ?explain=true ajoute la carte Grad-CAM
    predictor: Predictor = Depends(get_predictor),
):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(400, "Unsupported format (use JPG, PNG or WebP)")

    data = file.file.read(MAX_FILE_SIZE + 1)     # ne jamais lire plus que la limite
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large (5 MB maximum)")

    try:
        x = preprocess_image(data)
    except InvalidImageError as exc:
        raise HTTPException(400, str(exc))

    return predictor.predict(x, explain=explain)