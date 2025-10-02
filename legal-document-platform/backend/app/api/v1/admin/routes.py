from flask import Blueprint
from .controllers import get_all_users

admin_bp = Blueprint("admin_bp", __name__)

admin_bp.route("/users", methods=["GET"])(get_all_users)