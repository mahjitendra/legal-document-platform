from marshmallow import Schema, fields, validate


class SignatureSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    document_id = fields.Int(required=True)
    signature_data = fields.Str()
    signature_type = fields.Str()
    verified = fields.Bool(dump_only=True)
    created_at = fields.DateTime(dump_only=True)


class SignatureCreateSchema(Schema):
    document_id = fields.Int(required=True)
    signature_data = fields.Str(required=True)
    signature_type = fields.Str(missing='digital')
