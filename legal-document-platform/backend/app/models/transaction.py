from app.extensions import db
from datetime import datetime


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'))
    transaction_type = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='INR')
    status = db.Column(db.String(20), default='pending')
    reference_id = db.Column(db.String(100))
    description = db.Column(db.Text)
    metadata = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'payment_id': self.payment_id,
            'transaction_type': self.transaction_type,
            'amount': float(self.amount),
            'currency': self.currency,
            'status': self.status,
            'reference_id': self.reference_id,
            'description': self.description,
            'metadata': self.metadata,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Transaction {self.id} - {self.amount}>'
