from flask import request, jsonify, g
from app.services.signature_service import SignatureService
from app.schemas.signature_schema import signature_schema
from app.utils.decorators import token_required

@token_required
def add_signature(document_id):
    data = request.get_json()
    signature_data = data.get('signature_data')

    try:
        new_signature = SignatureService.add_signature(
            document_id=document_id,
            user_id=g.current_user.id,
            signature_data=signature_data
        )
        return jsonify(signature_schema.dump(new_signature)), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        # In a real app, you would log the exception e
        return jsonify({'message': 'Could not add signature'}), 500