from app.extensions import db
from datetime import datetime


class AuditLog(db.Model):
    __tablename__ = 'audit_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    action = db.Column(db.String(100), nullable=False)
    resource_type = db.Column(db.String(50))
    resource_id = db.Column(db.Integer)
    ip_address = db.Column(db.String(50))
    user_agent = db.Column(db.String(500))
    changes = db.Column(db.JSON)
    metadata = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='audit_logs')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'action': self.action,
            'resource_type': self.resource_type,
            'resource_id': self.resource_id,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'changes': self.changes,
            'metadata': self.metadata,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @staticmethod
    def log_action(user_id, action, resource_type=None, resource_id=None,
                   ip_address=None, user_agent=None, changes=None, metadata=None):
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            ip_address=ip_address,
            user_agent=user_agent,
            changes=changes,
            metadata=metadata
        )
        db.session.add(log)
        db.session.commit()
        return log

    def __repr__(self):
        return f'<AuditLog {self.id} - {self.action}>'
