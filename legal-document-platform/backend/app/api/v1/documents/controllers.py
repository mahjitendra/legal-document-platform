from flask import request, jsonify
from app.models.document import Document
from app.schemas.document_schema import document_schema, documents_schema
from app.extensions import db

# A placeholder for user authentication
def get_current_user_id():
    # In a real application, you would get the user ID from the session or token
    return 1

def create_document():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    user_id = get_current_user_id()

    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    new_document = Document(title=title, content=content, user_id=user_id)
    db.session.add(new_document)
    db.session.commit()

    return jsonify(document_schema.dump(new_document)), 201

def get_documents():
    user_id = get_current_user_id()
    documents = Document.query.filter_by(user_id=user_id).all()
    return jsonify(documents_schema.dump(documents)), 200

def get_document(document_id):
    user_id = get_current_user_id()
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if document:
        return jsonify(document_schema.dump(document)), 200
    return jsonify({'message': 'Document not found'}), 404

def update_document(document_id):
    user_id = get_current_user_id()
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if not document:
        return jsonify({'message': 'Document not found'}), 404

    data = request.get_json()
    document.title = data.get('title', document.title)
    document.content = data.get('content', document.content)
    db.session.commit()

    return jsonify(document_schema.dump(document)), 200

def delete_document(document_id):
    user_id = get_current_user_id()
    document = Document.query.filter_by(id=document_id, user_id=user_id).first()
    if not document:
        return jsonify({'message': 'Document not found'}), 404

    db.session.delete(document)
    db.session.commit()

    return jsonify({'message': 'Document deleted successfully'}), 200