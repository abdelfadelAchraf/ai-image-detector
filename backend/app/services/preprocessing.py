import io

import numpy as np
from PIL import Image, UnidentifiedImageError

from app.config import MODEL_INPUT_SIZE, ORIGINAL_SIZE


class InvalidImageError(Exception):
    """Raised when the uploaded bytes are not a readable image."""


def preprocess_image(data: bytes) -> np.ndarray:
    """Same steps as training: image reduced to 32x32, enlarged to 128x128,
    pixels kept in 0-255 (the model rescales internally)."""
    try:
        img = Image.open(io.BytesIO(data))
        img.load()
    except (UnidentifiedImageError, OSError) as exc:
        raise InvalidImageError("Invalid or corrupted image") from exc

    img = img.convert("RGB")
    img = img.resize((ORIGINAL_SIZE, ORIGINAL_SIZE), Image.BILINEAR)
    img = img.resize((MODEL_INPUT_SIZE, MODEL_INPUT_SIZE), Image.BILINEAR)
    return np.expand_dims(np.array(img, dtype="float32"), axis=0)