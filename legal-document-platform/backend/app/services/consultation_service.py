from app.models.consultation import Consultation, ConsultationStatus
from app.models.user import User
from app.extensions import db
from datetime import datetime

class ConsultationService:
    @staticmethod
    def book_consultation(user_id, lawyer_id, start_time, end_time):
        """
        Books a new consultation for a user with a lawyer.
        """
        if not all([lawyer_id, start_time, end_time]):
            raise ValueError('Lawyer ID, start time, and end time are required')

        try:
            start_dt = datetime.fromisoformat(start_time)
            end_dt = datetime.fromisoformat(end_time)
        except (TypeError, ValueError):
            raise ValueError('Invalid datetime format. Use ISO 8601 format.')

        if start_dt >= end_dt:
            raise ValueError('Start time must be before end time')

        # Check if the lawyer exists and is actually a lawyer (admin for now)
        lawyer = User.query.filter_by(id=lawyer_id, is_admin=True).first()
        if not lawyer:
            raise ValueError('Lawyer not found or user is not a lawyer')

        # In a real app, you would check for lawyer availability conflicts.
        # This is a simplified implementation.

        new_consultation = Consultation(
            user_id=user_id,
            lawyer_id=lawyer_id,
            start_time=start_dt,
            end_time=end_dt,
            status=ConsultationStatus.SCHEDULED
        )
        db.session.add(new_consultation)
        db.session.commit()
        return new_consultation

    @staticmethod
    def get_user_consultations(user_id):
        """
        Retrieves all consultations where the user is either the client or the lawyer.
        """
        return Consultation.query.filter(
            (Consultation.user_id == user_id) | (Consultation.lawyer_id == user_id)
        ).order_by(Consultation.start_time.desc()).all()