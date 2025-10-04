from marshmallow import Schema, fields, validate


class TemplateSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    description = fields.Str()
    category = fields.Str(required=True)
    content = fields.Str(required=True)
    fields = fields.Dict()
    is_active = fields.Bool()
    is_premium = fields.Bool()
    price = fields.Decimal(places=2)
    created_by = fields.Int(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class TemplateCreateSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    description = fields.Str()
    category = fields.Str(required=True)
    content = fields.Str(required=True)
    fields = fields.Dict()
    is_premium = fields.Bool(missing=False)
    price = fields.Decimal(places=2, missing=0.00)


class TemplateUpdateSchema(Schema):
    title = fields.Str(validate=validate.Length(min=3, max=200))
    description = fields.Str()
    category = fields.Str()
    content = fields.Str()
    fields = fields.Dict()
    is_active = fields.Bool()
    is_premium = fields.Bool()
    price = fields.Decimal(places=2)


class TemplateListSchema(Schema):
    page = fields.Int(missing=1)
    limit = fields.Int(missing=10, validate=validate.Range(min=1, max=100))
    category = fields.Str()
    is_premium = fields.Bool()
