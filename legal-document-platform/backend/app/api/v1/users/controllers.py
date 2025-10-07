from flask import request, jsonify
from app.services.auth_service import AuthService
from app.services.document_service import DocumentService

def get_user_profile(current_user):
    try:
        user_data = {
            'id': current_user.id,
            'email': current_user.email,
            'full_name': current_user.full_name,
            'phone': current_user.phone,
            'role': current_user.role,
            'created_at': current_user.created_at.isoformat() if current_user.created_at else None
        }
        return jsonify({'user': user_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def update_user_profile(current_user):
    try:
        data = request.get_json()

        if 'full_name' in data:
            current_user.full_name = data['full_name']
        if 'phone' in data:
            current_user.phone = data['phone']

        from app.extensions import db
        db.session.commit()

        return jsonify({
            'message': 'Profile updated successfully',
            'user': {
                'id': current_user.id,
                'email': current_user.email,
                'full_name': current_user.full_name,
                'phone': current_user.phone
            }
        }), 200
    except Exception as e:
        from app.extensions import db
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def change_password(current_user):
    try:
        data = request.get_json()
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not old_password or not new_password:
            return jsonify({'error': 'Old and new passwords are required'}), 400

        auth_service = AuthService()
        if not auth_service.verify_password(old_password, current_user.password_hash):
            return jsonify({'error': 'Incorrect old password'}), 401

        current_user.password_hash = auth_service.hash_password(new_password)

        from app.extensions import db
        db.session.commit()

        return jsonify({'message': 'Password changed successfully'}), 200
    except Exception as e:
        from app.extensions import db
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def get_user_documents(current_user):
    try:
        doc_service = DocumentService()
        documents = doc_service.get_user_documents(current_user.id)
        return jsonify({'documents': documents}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_user_stats(current_user):
    try:
        from app.models.document import Document
        total_docs = Document.query.filter_by(user_id=current_user.id).count()
        signed_docs = Document.query.filter_by(user_id=current_user.id, status='signed').count()

        stats = {
            'total_documents': total_docs,
            'signed_documents': signed_docs,
            'draft_documents': Document.query.filter_by(user_id=current_user.id, status='draft').count(),
        }

        return jsonify({'stats': stats}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
