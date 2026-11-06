from typing import Literal

from pydantic import BaseModel


class Heatmap(BaseModel):
    size: int                       # la grille fait size x size
    values: list[list[float]]       # valeurs entre 0 et 1, lignes de haut en bas


class PredictionResponse(BaseModel):
    label: Literal["REAL", "FAKE"]
    confidence: float               # pourcentage, confiance dans le label prédit
    prob_real: float                # sortie brute du modèle : 0 = générée, 1 = réelle
    heatmap: Heatmap | None = None  # présent seulement si explain=true


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool