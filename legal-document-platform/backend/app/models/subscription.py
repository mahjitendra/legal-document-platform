from app.extensions import db
from datetime import datetime
import enum

class SubscriptionPlan(enum.Enum):
    FREE = 'free'
    BASIC = 'basic'
    PREMIUM = 'premium'

class SubscriptionStatus(enum.Enum):
    ACTIVE = 'active'
    CANCELLED = 'cancelled'
    EXPIRED = 'expired'

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True) # A user can only have one subscription
    plan = db.Column(db.Enum(SubscriptionPlan), default=SubscriptionPlan.FREE, nullable=False)
    status = db.Column(db.Enum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE, nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='subscription', uselist=False)

    def __repr__(self):
        return f'<Subscription {self.id} for User {self.user_id}>'