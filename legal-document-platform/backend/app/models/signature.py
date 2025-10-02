from app.extensions import db
from datetime import datetime

class Signature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    signature_data = db.Column(db.Text, nullable=False)  # Stores the signature image data (e.g., base64)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey('document.id'), nullable=False)

    def __repr__(self):
        return f'<Signature {self.id}>'