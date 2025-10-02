from flask import Blueprint
from .controllers import book_consultation, get_consultations

consultations_bp = Blueprint("consultations_bp", __name__)

consultations_bp.route("", methods=["POST"])(book_consultation)
consultations_bp.route("", methods=["GET"])(get_consultations)