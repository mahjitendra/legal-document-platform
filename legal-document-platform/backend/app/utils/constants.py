DOCUMENT_STATUS = {
    'DRAFT': 'draft',
    'PENDING': 'pending',
    'COMPLETED': 'completed',
    'SIGNED': 'signed',
    'ARCHIVED': 'archived'
}

DOCUMENT_CATEGORIES = {
    'RENTAL': 'rental',
    'EMPLOYMENT': 'employment',
    'NDA': 'nda',
    'SALE': 'sale',
    'PARTNERSHIP': 'partnership',
    'WILL': 'will',
    'POWER_OF_ATTORNEY': 'power_of_attorney',
    'AFFIDAVIT': 'affidavit',
    'OTHER': 'other'
}

PAYMENT_STATUS = {
    'PENDING': 'pending',
    'COMPLETED': 'completed',
    'FAILED': 'failed',
    'REFUNDED': 'refunded'
}

USER_ROLES = {
    'USER': 'user',
    'ADMIN': 'admin',
    'LAWYER': 'lawyer'
}

CONSULTATION_TYPES = {
    'VIDEO': 'video',
    'PHONE': 'phone',
    'IN_PERSON': 'in_person',
    'CHAT': 'chat'
}

CONSULTATION_STATUS = {
    'SCHEDULED': 'scheduled',
    'ONGOING': 'ongoing',
    'COMPLETED': 'completed',
    'CANCELLED': 'cancelled'
}

NOTIFICATION_TYPES = {
    'INFO': 'info',
    'SUCCESS': 'success',
    'WARNING': 'warning',
    'ERROR': 'error',
    'DOCUMENT': 'document',
    'PAYMENT': 'payment',
    'CONSULTATION': 'consultation'
}

ALLOWED_FILE_EXTENSIONS = {
    'pdf', 'doc', 'docx', 'txt', 'png', 'jpg', 'jpeg'
}

MAX_FILE_SIZE = 10 * 1024 * 1024

PAGINATION_DEFAULT_PAGE = 1
PAGINATION_DEFAULT_PER_PAGE = 20
PAGINATION_MAX_PER_PAGE = 100

TOKEN_EXPIRATION_HOURS = 24
REFRESH_TOKEN_EXPIRATION_DAYS = 30
OTP_EXPIRATION_MINUTES = 10

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
PHONE_REGEX = r'^[6-9]\d{9}$'
