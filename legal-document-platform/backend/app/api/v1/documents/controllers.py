from flask import request, jsonify, g
from app.models.document import Document
from app.schemas.document_schema import document_schema, documents_schema
from app.extensions import db
from app.utils.decorators import token_required

@token_required
def create_document():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    user_id = g.current_user.id

    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    new_document = Document(title=title, content=content, user_id=user_id)
    db.session.add(new_document)
    db.session.commit()

    return jsonify(document_schema.dump(new_document)), 201

@token_required
def get_documents():
    user_id = g.current_user.id
    documents = Document.query.filter_by(user_id=user_id).all()
    return jsonify(documents_schema.dump(documents)), 200

@token_required
def get_document(document_id):
    user_id = g.current_user.id
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if document:
        return jsonify(document_schema.dump(document)), 200
    return jsonify({'message': 'Document not found or access denied'}), 404

@token_required
def update_document(document_id):
    user_id = g.current_user.id
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if not document:
        return jsonify({'message': 'Document not found or access denied'}), 404

    data = request.get_json()
    document.title = data.get('title', document.title)
    document.content = data.get('content', document.content)
    db.session.commit()

    return jsonify(document_schema.dump(document)), 200

@token_required
def delete_document(document_id):
    user_id = g.current_user.id
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if not document:
        return jsonify({'message': 'Document not found or access denied'}), 404

    db.session.delete(document)
    db.session.commit()

    return jsonify({'message': 'Document deleted successfully'}), 200