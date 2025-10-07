from app.models.consultation import Consultation
from app.extensions import db
from datetime import datetime

class ConsultationService:
    @staticmethod
    def create_consultation(data):
        consultation = Consultation(
            user_id=data.get('user_id'),
            lawyer_id=data.get('lawyer_id'),
            type=data.get('type', 'video'),
            scheduled_at=data.get('scheduled_at'),
            duration=data.get('duration', 30),
            notes=data.get('notes'),
            status='scheduled'
        )

        db.session.add(consultation)
        db.session.commit()

        return consultation

    @staticmethod
    def get_consultation(consultation_id):
        return Consultation.query.get(consultation_id)

    @staticmethod
    def get_user_consultations(user_id):
        return Consultation.query.filter_by(user_id=user_id)\
            .order_by(Consultation.scheduled_at.desc()).all()

    @staticmethod
    def update_consultation(consultation_id, data):
        consultation = Consultation.query.get(consultation_id)

        if not consultation:
            return None

        if 'scheduled_at' in data:
            consultation.scheduled_at = data['scheduled_at']
        if 'status' in data:
            consultation.status = data['status']
        if 'notes' in data:
            consultation.notes = data['notes']
        if 'meeting_link' in data:
            consultation.meeting_link = data['meeting_link']

        db.session.commit()

        return consultation

    @staticmethod
    def cancel_consultation(consultation_id):
        consultation = Consultation.query.get(consultation_id)

        if not consultation:
            return False

        consultation.status = 'cancelled'
        db.session.commit()

        return True

    @staticmethod
    def get_upcoming_consultations(user_id):
        return Consultation.query.filter(
            Consultation.user_id == user_id,
            Consultation.scheduled_at > datetime.utcnow(),
            Consultation.status == 'scheduled'
        ).order_by(Consultation.scheduled_at).all()
