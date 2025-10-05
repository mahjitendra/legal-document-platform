from flask import current_app
from app.models.user import User
from app.extensions import db
import jwt
from datetime import datetime, timedelta, timezone

class AuthService:
    @staticmethod
    def create_user(username, email, password):
        """Creates a new user and adds them to the database."""
        if User.query.filter_by(username=username).first():
            raise ValueError('Username already exists')
        if User.query.filter_by(email=email).first():
            raise ValueError('Email address already registered')

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def authenticate_user(username, password):
        """Authenticates a user and returns the user object if successful."""
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            return user
        return None

    @staticmethod
    def generate_token(user_id):
        """Generates a JWT for a given user ID."""
        payload = {
            'user_id': user_id,
            'exp': datetime.now(timezone.utc) + timedelta(hours=current_app.config.get('TOKEN_EXPIRATION_HOURS', 24))
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")
        return token