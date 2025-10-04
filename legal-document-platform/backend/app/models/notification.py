from app.extensions import db
from datetime import datetime


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    notification_type = db.Column(db.String(50), default='info')
    is_read = db.Column(db.Boolean, default=False)
    link = db.Column(db.String(500))
    metadata = db.Column(db.JSON)
    read_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='notifications')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'message': self.message,
            'notification_type': self.notification_type,
            'is_read': self.is_read,
            'link': self.link,
            'metadata': self.metadata,
            'read_at': self.read_at.isoformat() if self.read_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def mark_as_read(self):
        self.is_read = True
        self.read_at = datetime.utcnow()

    def __repr__(self):
        return f'<Notification {self.id} - {self.title}>'
