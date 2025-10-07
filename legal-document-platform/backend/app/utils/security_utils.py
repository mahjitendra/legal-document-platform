import secrets
import hashlib
import hmac
from datetime import datetime, timedelta
import jwt
from app.config import Config

class SecurityUtils:
    @staticmethod
    def generate_token(length=32):
        return secrets.token_urlsafe(length)

    @staticmethod
    def generate_otp(length=6):
        return ''.join([str(secrets.randbelow(10)) for _ in range(length)])

    @staticmethod
    def hash_string(data, algorithm='sha256'):
        if isinstance(data, str):
            data = data.encode()

        if algorithm == 'sha256':
            return hashlib.sha256(data).hexdigest()
        elif algorithm == 'sha512':
            return hashlib.sha512(data).hexdigest()
        elif algorithm == 'md5':
            return hashlib.md5(data).hexdigest()
        else:
            raise ValueError(f"Unsupported algorithm: {algorithm}")

    @staticmethod
    def verify_hmac(message, signature, secret_key):
        if isinstance(message, str):
            message = message.encode()
        if isinstance(secret_key, str):
            secret_key = secret_key.encode()

        expected_signature = hmac.new(
            secret_key,
            message,
            hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(signature, expected_signature)

    @staticmethod
    def create_jwt_token(user_id, expiration_hours=24):
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(hours=expiration_hours),
            'iat': datetime.utcnow()
        }

        token = jwt.encode(
            payload,
            Config.SECRET_KEY,
            algorithm='HS256'
        )

        return token

    @staticmethod
    def decode_jwt_token(token):
        try:
            payload = jwt.decode(
                token,
                Config.SECRET_KEY,
                algorithms=['HS256']
            )
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    @staticmethod
    def sanitize_filename(filename):
        import re
        filename = re.sub(r'[^\w\s.-]', '', filename)
        filename = re.sub(r'[-\s]+', '-', filename)
        return filename.strip()

    @staticmethod
    def mask_email(email):
        if '@' not in email:
            return email

        local, domain = email.split('@')

        if len(local) <= 2:
            masked_local = local[0] + '*'
        else:
            masked_local = local[0] + '*' * (len(local) - 2) + local[-1]

        return f"{masked_local}@{domain}"

    @staticmethod
    def mask_phone(phone):
        if len(phone) < 10:
            return phone

        return '*' * (len(phone) - 4) + phone[-4:]
