from flask import request, jsonify, g
from app.models.consultation import Consultation
from app.schemas.consultation_schema import consultation_schema, consultations_schema
from app.extensions import db
from datetime import datetime
from app.utils.decorators import token_required

@token_required
def book_consultation():
    data = request.get_json()
    lawyer_id = data.get('lawyer_id')
    start_time_str = data.get('start_time')
    end_time_str = data.get('end_time')
    user_id = g.current_user.id

    if not all([lawyer_id, start_time_str, end_time_str]):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        start_time = datetime.fromisoformat(start_time_str)
        end_time = datetime.fromisoformat(end_time_str)
    except ValueError:
        return jsonify({'message': 'Invalid datetime format'}), 400

    # In a real app, you would check for lawyer availability, etc.
    new_consultation = Consultation(
        user_id=user_id,
        lawyer_id=lawyer_id,
        start_time=start_time,
        end_time=end_time
    )
    db.session.add(new_consultation)
    db.session.commit()

    return jsonify(consultation_schema.dump(new_consultation)), 201

@token_required
def get_consultations():
    user_id = g.current_user.id
    # Return consultations where the user is either the client or the lawyer
    consultations = Consultation.query.filter(
        (Consultation.user_id == user_id) | (Consultation.lawyer_id == user_id)
    ).all()
    return jsonify(consultations_schema.dump(consultations)), 200