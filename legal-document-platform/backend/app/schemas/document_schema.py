from marshmallow import Schema, fields, validate


class DocumentSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    category = fields.Str()
    content = fields.Str()
    template_id = fields.Int()
    status = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class DocumentCreateSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    category = fields.Str()
    content = fields.Str()
    template_id = fields.Int()


class DocumentUpdateSchema(Schema):
    title = fields.Str(validate=validate.Length(min=3, max=200))
    category = fields.Str()
    content = fields.Str()
    status = fields.Str()
