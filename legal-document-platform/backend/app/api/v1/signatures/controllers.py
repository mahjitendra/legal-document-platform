from flask import request, jsonify
from app.models.signature import Signature
from app.schemas.signature_schema import signature_schema
from app.extensions import db

# A placeholder for user authentication
def get_current_user_id():
    # In a real application, you would get the user ID from the session or token
    return 1

def add_signature(document_id):
    data = request.get_json()
    signature_data = data.get('signature_data')
    user_id = get_current_user_id()

    if not signature_data:
        return jsonify({'message': 'Signature data is required'}), 400

    # In a real application, you would perform more validation here
    new_signature = Signature(
        signature_data=signature_data,
        user_id=user_id,
        document_id=document_id
    )
    db.session.add(new_signature)
    db.session.commit()

    return jsonify(signature_schema.dump(new_signature)), 201