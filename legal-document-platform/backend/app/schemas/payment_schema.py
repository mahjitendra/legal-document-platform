from marshmallow import Schema, fields, validate


class PaymentSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    amount = fields.Decimal(required=True, places=2)
    currency = fields.Str(missing='INR')
    payment_method = fields.Str()
    status = fields.Str()
    transaction_id = fields.Str()
    created_at = fields.DateTime(dump_only=True)


class PaymentCreateSchema(Schema):
    amount = fields.Decimal(required=True, places=2)
    currency = fields.Str(missing='INR')
    payment_method = fields.Str()
    description = fields.Str()
