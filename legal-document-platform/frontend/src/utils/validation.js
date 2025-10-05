export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  if (!phone) return 'Phone number is required';
  if (!re.test(phone)) return 'Invalid phone number format';
  return null;
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = values[field];

    fieldRules.forEach(rule => {
      if (errors[field]) return;

      const error = rule(value);
      if (error) {
        errors[field] = error;
      }
    });
  });

  return errors;
};
