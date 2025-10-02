from app.extensions import db
from datetime import datetime
import enum

class PaymentStatus(enum.Enum):
    PENDING = 'pending'
    SUCCESSFUL = 'successful'
    FAILED = 'failed'

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False, default='INR')
    status = db.Column(db.Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey('document.id'), nullable=True)

    def __repr__(self):
        return f'<Payment {self.id}>'