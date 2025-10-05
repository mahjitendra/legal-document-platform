from flask import request, jsonify, g
from app.services.consultation_service import ConsultationService
from app.schemas.consultation_schema import consultation_schema, consultations_schema
from app.utils.decorators import token_required

@token_required
def book_consultation():
    data = request.get_json()
    try:
        new_consultation = ConsultationService.book_consultation(
            user_id=g.current_user.id,
            lawyer_id=data.get('lawyer_id'),
            start_time=data.get('start_time'),
            end_time=data.get('end_time')
        )
        return jsonify(consultation_schema.dump(new_consultation)), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        # In a real app, you would log the exception e
        return jsonify({'message': 'Could not book consultation'}), 500

@token_required
def get_consultations():
    consultations = ConsultationService.get_user_consultations(g.current_user.id)
    return jsonify(consultations_schema.dump(consultations)), 200