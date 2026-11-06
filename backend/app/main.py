from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ALLOWED_ORIGINS, MODEL_PATH
from app.routers import health, predict
from app.services.predictor import Predictor


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.predictor = Predictor(MODEL_PATH)         # loaded once at startup
    yield
    app.state.predictor = None


app = FastAPI(title="AI Image Detector", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(predict.router)