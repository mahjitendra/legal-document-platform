from app.extensions import db
from datetime import datetime
import enum

class ConsultationStatus(enum.Enum):
    SCHEDULED = 'scheduled'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'

class Consultation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Assuming lawyers are also users
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum(ConsultationStatus), default=ConsultationStatus.SCHEDULED, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', foreign_keys=[user_id], backref='consultations_as_user')
    lawyer = db.relationship('User', foreign_keys=[lawyer_id], backref='consultations_as_lawyer')

    def __repr__(self):
        return f'<Consultation {self.id}>'