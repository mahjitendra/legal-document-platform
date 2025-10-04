from app.extensions import ma
from app.models.signature import Signature

class SignatureSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Signature
        load_instance = True

signature_schema = SignatureSchema()
signatures_schema = SignatureSchema(many=True)