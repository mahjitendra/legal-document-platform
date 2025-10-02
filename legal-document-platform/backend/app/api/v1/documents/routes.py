from flask import Blueprint
from .controllers import (
    create_document,
    get_documents,
    get_document,
    update_document,
    delete_document,
)

documents_bp = Blueprint("documents_bp", __name__)

documents_bp.route("", methods=["POST"])(create_document)
documents_bp.route("", methods=["GET"])(get_documents)
documents_bp.route("/<int:document_id>", methods=["GET"])(get_document)
documents_bp.route("/<int:document_id>", methods=["PUT"])(update_document)
documents_bp.route("/<int:document_id>", methods=["DELETE"])(delete_document)