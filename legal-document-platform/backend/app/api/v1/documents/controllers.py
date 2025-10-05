from flask import request, jsonify, g
from app.services.document_service import DocumentService
from app.schemas.document_schema import document_schema, documents_schema
from app.utils.decorators import token_required

@token_required
def create_document():
    data = request.get_json()
    try:
        new_document = DocumentService.create_document(
            title=data.get('title'),
            content=data.get('content'),
            user_id=g.current_user.id
        )
        return jsonify(document_schema.dump(new_document)), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        return jsonify({'message': 'Could not create document'}), 500

@token_required
def get_documents():
    documents = DocumentService.get_user_documents(g.current_user.id)
    return jsonify(documents_schema.dump(documents)), 200

@token_required
def get_document(document_id):
    document = DocumentService.get_document_by_id(document_id, g.current_user.id)
    if document:
        return jsonify(document_schema.dump(document)), 200
    return jsonify({'message': 'Document not found or access denied'}), 404

@token_required
def update_document(document_id):
    document = DocumentService.get_document_by_id(document_id, g.current_user.id)
    if not document:
        return jsonify({'message': 'Document not found or access denied'}), 404

    data = request.get_json()
    updated_document = DocumentService.update_document(document, data)
    return jsonify(document_schema.dump(updated_document)), 200

@token_required
def delete_document(document_id):
    document = DocumentService.get_document_by_id(document_id, g.current_user.id)
    if not document:
        return jsonify({'message': 'Document not found or access denied'}), 404

    DocumentService.delete_document(document)
    return jsonify({'message': 'Document deleted successfully'}), 200