from flask import Blueprint
from .controllers import create_payment_intent

payments_bp = Blueprint("payments_bp", __name__)

payments_bp.route("/create-payment-intent", methods=["POST"])(create_payment_intent)