import os
import datetime as dt
import jwt
from flask import current_app, request
from functools import wraps


def generate_jwt(payload: dict, expires_minutes: int = 60) -> str:
    secret = current_app.config.get('SECRET_KEY') or os.environ.get('SECRET_KEY', 'dev-secret')
    to_encode = payload.copy()
    to_encode['exp'] = dt.datetime.utcnow() + dt.timedelta(minutes=expires_minutes)
    return jwt.encode(to_encode, secret, algorithm='HS256')


def decode_jwt(token: str) -> dict | None:
    secret = current_app.config.get('SECRET_KEY') or os.environ.get('SECRET_KEY', 'dev-secret')
    try:
        return jwt.decode(token, secret, algorithms=['HS256'])
    except Exception:
        return None


def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            from flask import jsonify
            return jsonify({'message': 'Missing or invalid Authorization header'}), 401
        token = auth_header.split(' ', 1)[1]
        claims = decode_jwt(token)
        if not claims:
            from flask import jsonify
            return jsonify({'message': 'Invalid or expired token'}), 401
        request.user = claims
        return fn(*args, **kwargs)
    return wrapper

