from app.models.user import User
from app.extensions import db

class UserService:
    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def create_user(data):
        user = User(
            email=data.get('email'),
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            password_hash=data.get('password_hash'),
            role=data.get('role', 'user')
        )
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def update_user(user_id, data):
        user = User.query.get(user_id)
        if not user:
            return None

        if 'full_name' in data:
            user.full_name = data['full_name']
        if 'phone' in data:
            user.phone = data['phone']
        if 'email' in data:
            user.email = data['email']

        db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if not user:
            return False

        db.session.delete(user)
        db.session.commit()
        return True

    @staticmethod
    def get_all_users(page=1, per_page=20):
        return User.query.paginate(page=page, per_page=per_page, error_out=False)
