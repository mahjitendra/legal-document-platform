class AppException(Exception):
    def __init__(self, message, status_code=500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class ValidationException(AppException):
    def __init__(self, message):
        super().__init__(message, status_code=400)

class AuthenticationException(AppException):
    def __init__(self, message="Authentication failed"):
        super().__init__(message, status_code=401)

class AuthorizationException(AppException):
    def __init__(self, message="Access denied"):
        super().__init__(message, status_code=403)

class NotFoundException(AppException):
    def __init__(self, message="Resource not found"):
        super().__init__(message, status_code=404)

class ConflictException(AppException):
    def __init__(self, message="Resource conflict"):
        super().__init__(message, status_code=409)

class ServerException(AppException):
    def __init__(self, message="Internal server error"):
        super().__init__(message, status_code=500)

class PaymentException(AppException):
    def __init__(self, message="Payment processing failed"):
        super().__init__(message, status_code=402)

class FileUploadException(AppException):
    def __init__(self, message="File upload failed"):
        super().__init__(message, status_code=400)
