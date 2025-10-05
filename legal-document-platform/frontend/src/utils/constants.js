export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

export const DOCUMENT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  COMPLETED: 'completed',
  SIGNED: 'signed',
  ARCHIVED: 'archived'
};

export const DOCUMENT_CATEGORIES = {
  RENTAL: 'rental',
  EMPLOYMENT: 'employment',
  NDA: 'nda',
  SALE: 'sale',
  PARTNERSHIP: 'partnership',
  WILL: 'will',
  POWER_OF_ATTORNEY: 'power_of_attorney',
  AFFIDAVIT: 'affidavit',
  OTHER: 'other'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  LAWYER: 'lawyer'
};

export const CONSULTATION_TYPES = {
  VIDEO: 'video',
  PHONE: 'phone',
  IN_PERSON: 'in_person',
  CHAT: 'chat'
};

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

export const ITEMS_PER_PAGE = 10;

export const FILE_MAX_SIZE = 10 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];
