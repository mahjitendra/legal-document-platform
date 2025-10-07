from datetime import datetime, timedelta
import random
import string

def generate_random_string(length=32):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def format_datetime(dt, format='%Y-%m-%d %H:%M:%S'):
    if not dt:
        return None
    return dt.strftime(format)

def parse_datetime(date_string, format='%Y-%m-%d %H:%M:%S'):
    try:
        return datetime.strptime(date_string, format)
    except (ValueError, TypeError):
        return None

def get_current_timestamp():
    return datetime.utcnow()

def add_days(date, days):
    return date + timedelta(days=days)

def format_currency(amount, currency='INR'):
    if currency == 'INR':
        return f"₹{amount:,.2f}"
    return f"{currency} {amount:,.2f}"

def truncate_string(text, max_length=100, suffix='...'):
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text

def get_file_extension(filename):
    return filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

def is_valid_file_type(filename, allowed_extensions):
    return get_file_extension(filename) in allowed_extensions

def paginate_results(query, page=1, per_page=20):
    total = query.count()
    items = query.limit(per_page).offset((page - 1) * per_page).all()

    return {
        'items': items,
        'total': total,
        'page': page,
        'per_page': per_page,
        'pages': (total + per_page - 1) // per_page
    }
