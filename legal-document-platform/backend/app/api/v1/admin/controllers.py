from flask import jsonify
from app.models.user import User
from app.schemas.user_schema import users_schema
from app.utils.decorators import admin_required

@admin_required
def get_all_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200