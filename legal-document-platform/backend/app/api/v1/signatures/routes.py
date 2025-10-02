from flask import Blueprint
from .controllers import add_signature

signatures_bp = Blueprint("signatures_bp", __name__)

signatures_bp.route("/<int:document_id>/sign", methods=["POST"])(add_signature)