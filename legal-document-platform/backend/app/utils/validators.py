import re
from datetime import datetime

class Validators:
    @staticmethod
    def validate_email(email):
        if not email:
            return False, "Email is required"

        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, email):
            return False, "Invalid email format"

        return True, None

    @staticmethod
    def validate_password(password):
        if not password:
            return False, "Password is required"

        if len(password) < 8:
            return False, "Password must be at least 8 characters long"

        if not re.search(r'[A-Z]', password):
            return False, "Password must contain at least one uppercase letter"

        if not re.search(r'[a-z]', password):
            return False, "Password must contain at least one lowercase letter"

        if not re.search(r'\d', password):
            return False, "Password must contain at least one digit"

        return True, None

    @staticmethod
    def validate_phone(phone):
        if not phone:
            return True, None

        pattern = r'^[6-9]\d{9}$'
        if not re.match(pattern, phone):
            return False, "Invalid phone number format. Must be 10 digits starting with 6-9"

        return True, None

    @staticmethod
    def validate_required(value, field_name):
        if not value or (isinstance(value, str) and not value.strip()):
            return False, f"{field_name} is required"
        return True, None

    @staticmethod
    def validate_length(value, min_length=None, max_length=None, field_name="Field"):
        if min_length and len(value) < min_length:
            return False, f"{field_name} must be at least {min_length} characters"

        if max_length and len(value) > max_length:
            return False, f"{field_name} must not exceed {max_length} characters"

        return True, None

    @staticmethod
    def validate_date(date_string, format='%Y-%m-%d'):
        try:
            datetime.strptime(date_string, format)
            return True, None
        except ValueError:
            return False, f"Invalid date format. Expected {format}"

    @staticmethod
    def validate_amount(amount):
        try:
            amount_float = float(amount)
            if amount_float <= 0:
                return False, "Amount must be greater than zero"
            return True, None
        except (ValueError, TypeError):
            return False, "Invalid amount format"
