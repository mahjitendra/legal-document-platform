from flask import Blueprint
from .controllers import (
    create_template,
    get_templates,
    get_template,
    update_template,
    delete_template,
)

templates_bp = Blueprint("templates_bp", __name__)

templates_bp.route("", methods=["POST"])(create_template)
templates_bp.route("", methods=["GET"])(get_templates)
templates_bp.route("/<int:template_id>", methods=["GET"])(get_template)
templates_bp.route("/<int:template_id>", methods=["PUT"])(update_template)
templates_bp.route("/<int:template_id>", methods=["DELETE"])(delete_template)