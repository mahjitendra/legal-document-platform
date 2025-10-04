from app.extensions import db
from datetime import datetime


class Template(db.Model):
    __tablename__ = 'templates'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    fields = db.Column(db.JSON)
    is_active = db.Column(db.Boolean, default=True)
    is_premium = db.Column(db.Boolean, default=False)
    price = db.Column(db.Numeric(10, 2), default=0.00)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    documents = db.relationship('Document', backref='template', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'content': self.content,
            'fields': self.fields,
            'is_active': self.is_active,
            'is_premium': self.is_premium,
            'price': float(self.price) if self.price else 0.00,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Template {self.title}>'
