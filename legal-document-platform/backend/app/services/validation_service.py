from app.utils.validators import Validators
from app.utils.exceptions import ValidationException

class ValidationService:
    @staticmethod
    def validate_user_registration(data):
        errors = []

        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name')
        phone = data.get('phone')

        valid, error = Validators.validate_required(email, 'Email')
        if not valid:
            errors.append(error)
        else:
            valid, error = Validators.validate_email(email)
            if not valid:
                errors.append(error)

        valid, error = Validators.validate_required(password, 'Password')
        if not valid:
            errors.append(error)
        else:
            valid, error = Validators.validate_password(password)
            if not valid:
                errors.append(error)

        valid, error = Validators.validate_required(full_name, 'Full name')
        if not valid:
            errors.append(error)

        if phone:
            valid, error = Validators.validate_phone(phone)
            if not valid:
                errors.append(error)

        if errors:
            raise ValidationException(', '.join(errors))

        return True

    @staticmethod
    def validate_document_creation(data):
        errors = []

        title = data.get('title')
        content = data.get('content')

        valid, error = Validators.validate_required(title, 'Title')
        if not valid:
            errors.append(error)
        else:
            valid, error = Validators.validate_length(title, min_length=3, max_length=200, field_name='Title')
            if not valid:
                errors.append(error)

        if errors:
            raise ValidationException(', '.join(errors))

        return True

    @staticmethod
    def validate_payment(data):
        errors = []

        amount = data.get('amount')

        valid, error = Validators.validate_required(amount, 'Amount')
        if not valid:
            errors.append(error)
        else:
            valid, error = Validators.validate_amount(amount)
            if not valid:
                errors.append(error)

        if errors:
            raise ValidationException(', '.join(errors))

        return True
