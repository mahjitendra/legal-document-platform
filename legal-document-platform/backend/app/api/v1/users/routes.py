from flask import Blueprint
from .controllers import (
    get_user_profile,
    update_user_profile,
    change_password,
    get_user_documents,
    get_user_stats
)
from app.middleware.auth_middleware import token_required, admin_required

users_bp = Blueprint('users', __name__, url_prefix='/users')

users_bp.route('/profile', methods=['GET'])(token_required(get_user_profile))
users_bp.route('/profile', methods=['PUT'])(token_required(update_user_profile))
users_bp.route('/change-password', methods=['POST'])(token_required(change_password))
users_bp.route('/documents', methods=['GET'])(token_required(get_user_documents))
users_bp.route('/stats', methods=['GET'])(token_required(get_user_stats))
