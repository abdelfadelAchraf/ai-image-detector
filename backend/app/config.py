from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]          # the backend/ folder
MODEL_PATH = BASE_DIR / "model" / "detector.keras"

MAX_FILE_SIZE = 5 * 1024 * 1024                         # 5 MB
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}

ORIGINAL_SIZE = 32       # CIFAKE images are 32x32
MODEL_INPUT_SIZE = 128   # input size of the model

ALLOWED_ORIGINS = ["http://localhost:5173"]