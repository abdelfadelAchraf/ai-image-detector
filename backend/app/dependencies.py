from fastapi import Request

from app.services.predictor import Predictor


def get_predictor(request: Request) -> Predictor:
    return request.app.state.predictor