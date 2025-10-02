from flask import Blueprint
from .controllers import (
    create_document,
    get_documents,
    get_document,
    update_document,
    delete_document,
)
from app.utils.security_utils import jwt_required

documents_bp = Blueprint("documents_bp", __name__)

documents_bp.route("", methods=["POST"])(jwt_required(create_document))
documents_bp.route("", methods=["GET"])(jwt_required(get_documents))
documents_bp.route("/<int:document_id>", methods=["GET"])(jwt_required(get_document))
documents_bp.route("/<int:document_id>", methods=["PUT"])(jwt_required(update_document))
documents_bp.route("/<int:document_id>", methods=["DELETE"])(jwt_required(delete_document))