from app.extensions import ma
from app.models.consultation import Consultation
from .user_schema import UserSchema

class ConsultationSchema(ma.SQLAlchemyAutoSchema):
    user = ma.Nested(UserSchema, only=("id", "username"))
    lawyer = ma.Nested(UserSchema, only=("id", "username"))
    class Meta:
        model = Consultation
        load_instance = True
        include_fk = True

consultation_schema = ConsultationSchema()
consultations_schema = ConsultationSchema(many=True)