from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import request

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

def setup_rate_limiter(app):
    limiter.init_app(app)

    @limiter.request_filter
    def ip_whitelist():
        whitelist = ['127.0.0.1', 'localhost']
        return request.remote_addr in whitelist

def rate_limit_exempt(f):
    return limiter.exempt(f)

auth_limiter = limiter.shared_limit("5 per minute", scope="auth")
api_limiter = limiter.shared_limit("60 per minute", scope="api")
