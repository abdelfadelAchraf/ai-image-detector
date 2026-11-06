import threading
from pathlib import Path

import numpy as np
import tensorflow as tf

from app.schemas import Heatmap, PredictionResponse


class Predictor:
    def __init__(self, model_path: Path):
        self._model = tf.keras.models.load_model(model_path)

        # Pièces nécessaires à la carte : le backbone EfficientNetB0 et la couche Dense finale
        self._base = next(l for l in self._model.layers if isinstance(l, tf.keras.Model))
        dense = next(l for l in reversed(self._model.layers) if isinstance(l, tf.keras.layers.Dense))
        self._kernel = dense.get_weights()[0][:, 0]            # (1280,)

        self._lock = threading.Lock()                          # une prédiction à la fois

    def _heatmap(self, x: np.ndarray, label: str) -> Heatmap:
        """Grad-CAM. Pour une tête GlobalAveragePooling -> Dense, le gradient du logit
        par rapport à la carte de caractéristiques est proportionnel aux poids de la
        couche Dense : la carte est donc la somme pondérée des canaux."""
        fmap = np.asarray(self._base(x, training=False))[0]    # (h, w, 1280)
        cam = fmap @ self._kernel                              # (h, w)
        if label == "FAKE":
            cam = -cam              # le logit mesure "réelle" : on inverse pour "générée"
        cam = np.maximum(cam, 0)
        peak = cam.max()
        if peak > 0:
            cam = cam / peak
        return Heatmap(size=int(cam.shape[0]), values=np.round(cam, 3).tolist())

    def predict(self, x: np.ndarray, explain: bool = False) -> PredictionResponse:
        with self._lock:
            prob_real = float(self._model.predict(x, verbose=0)[0][0])

            # étiquettes d'entraînement : FAKE = 0, REAL = 1
            label = "REAL" if prob_real > 0.5 else "FAKE"
            heatmap = self._heatmap(x, label) if explain else None

        confidence = max(prob_real, 1 - prob_real) * 100
        return PredictionResponse(
            label=label,
            confidence=round(confidence, 2),
            prob_real=round(prob_real, 4),
            heatmap=heatmap,
        )