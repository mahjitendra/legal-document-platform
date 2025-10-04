from app.extensions import db
from datetime import datetime
import enum

class NotificationType(enum.Enum):
    DOCUMENT_SIGNED = 'document_signed'
    PAYMENT_SUCCESS = 'payment_success'
    CONSULTATION_REMINDER = 'consultation_reminder'
    GENERAL_ANNOUNCEMENT = 'general_announcement'

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    notification_type = db.Column(db.Enum(NotificationType), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='notifications')

    def __repr__(self):
        return f'<Notification {self.id}>'