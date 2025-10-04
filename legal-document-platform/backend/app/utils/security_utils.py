import secrets
import hashlib
import hmac
from flask import current_app


class SecurityUtils:
    @staticmethod
    def generate_random_token(length=32):
        return secrets.token_urlsafe(length)

    @staticmethod
    def generate_otp(length=6):
        return ''.join([str(secrets.randbelow(10)) for _ in range(length)])

    @staticmethod
    def hash_password(password):
        from werkzeug.security import generate_password_hash
        return generate_password_hash(password)

    @staticmethod
    def verify_password(password_hash, password):
        from werkzeug.security import check_password_hash
        return check_password_hash(password_hash, password)

    @staticmethod
    def generate_signature(data, secret_key=None):
        if secret_key is None:
            secret_key = current_app.config.get('SECRET_KEY', '')

        message = str(data).encode()
        secret = secret_key.encode()

        signature = hmac.new(secret, message, hashlib.sha256).hexdigest()
        return signature

    @staticmethod
    def verify_signature(data, signature, secret_key=None):
        expected_signature = SecurityUtils.generate_signature(data, secret_key)
        return hmac.compare_digest(signature, expected_signature)

    @staticmethod
    def sanitize_input(text):
        import html
        return html.escape(text)

    @staticmethod
    def generate_csrf_token():
        return secrets.token_hex(16)
