from flask import request, jsonify, g
from app.models.signature import Signature
from app.schemas.signature_schema import signature_schema
from app.extensions import db
from app.utils.decorators import token_required

@token_required
def add_signature(document_id):
    data = request.get_json()
    signature_data = data.get('signature_data')
    user_id = g.current_user.id

    if not signature_data:
        return jsonify({'message': 'Signature data is required'}), 400

    # In a real application, you would perform more validation here,
    # such as verifying the user has permission to sign this specific document.
    new_signature = Signature(
        signature_data=signature_data,
        user_id=user_id,
        document_id=document_id
    )
    db.session.add(new_signature)
    db.session.commit()

    return jsonify(signature_schema.dump(new_signature)), 201