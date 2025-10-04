from app.extensions import ma
from app.models.payment import Payment

class PaymentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        load_instance = True

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)