from app.extensions import db
from datetime import datetime


class Subscription(db.Model):
    __tablename__ = 'subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan_name = db.Column(db.String(50), nullable=False)
    plan_type = db.Column(db.String(20), default='monthly')
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='INR')
    status = db.Column(db.String(20), default='active')
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    auto_renew = db.Column(db.Boolean, default=True)
    payment_method = db.Column(db.String(50))
    features = db.Column(db.JSON)
    metadata = db.Column(db.JSON)
    cancelled_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='subscriptions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'plan_name': self.plan_name,
            'plan_type': self.plan_type,
            'amount': float(self.amount),
            'currency': self.currency,
            'status': self.status,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'auto_renew': self.auto_renew,
            'payment_method': self.payment_method,
            'features': self.features,
            'metadata': self.metadata,
            'cancelled_at': self.cancelled_at.isoformat() if self.cancelled_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def is_active(self):
        return self.status == 'active' and self.end_date > datetime.utcnow()

    def cancel(self):
        self.status = 'cancelled'
        self.auto_renew = False
        self.cancelled_at = datetime.utcnow()

    def __repr__(self):
        return f'<Subscription {self.id} - {self.plan_name}>'
