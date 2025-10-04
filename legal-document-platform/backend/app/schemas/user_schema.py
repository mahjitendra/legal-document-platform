from marshmallow import Schema, fields, validate, validates, ValidationError


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True)
    full_name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    phone = fields.Str(validate=validate.Length(min=10, max=15))
    role = fields.Str(validate=validate.OneOf(['user', 'admin', 'lawyer']))
    is_active = fields.Bool(dump_only=True)
    is_verified = fields.Bool(dump_only=True)
    profile_picture = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    last_login = fields.DateTime(dump_only=True)


class UserRegistrationSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
    full_name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    phone = fields.Str(validate=validate.Length(min=10, max=15))

    @validates('password')
    def validate_password(self, value):
        if not any(char.isdigit() for char in value):
            raise ValidationError('Password must contain at least one digit')
        if not any(char.isupper() for char in value):
            raise ValidationError('Password must contain at least one uppercase letter')


class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class UserUpdateSchema(Schema):
    full_name = fields.Str(validate=validate.Length(min=2, max=100))
    phone = fields.Str(validate=validate.Length(min=10, max=15))


class ChangePasswordSchema(Schema):
    old_password = fields.Str(required=True)
    new_password = fields.Str(required=True, validate=validate.Length(min=8))
