from marshmallow import Schema, fields, validate


class ConsultationSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    lawyer_id = fields.Int()
    title = fields.Str(required=True)
    description = fields.Str()
    consultation_type = fields.Str()
    scheduled_at = fields.DateTime(required=True)
    duration = fields.Int()
    status = fields.Str()
    created_at = fields.DateTime(dump_only=True)


class ConsultationCreateSchema(Schema):
    lawyer_id = fields.Int()
    title = fields.Str(required=True)
    description = fields.Str()
    consultation_type = fields.Str(required=True)
    scheduled_at = fields.DateTime(required=True)
    duration = fields.Int(missing=60)
