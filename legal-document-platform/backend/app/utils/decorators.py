from functools import wraps
from flask import jsonify

# A placeholder for user authentication and role checking
def get_current_user():
    # In a real app, you'd get the user from the request context (e.g., JWT token)
    # For now, we'll mock a user. Let's assume user with id 1 is an admin.
    class MockUser:
        def __init__(self, id, is_admin):
            self.id = id
            self.is_admin = is_admin

    # To test the decorator, you can change the user being returned.
    # Return a non-admin user by default. To test admin routes, return an admin user.
    # For example: return MockUser(id=1, is_admin=True)
    return MockUser(id=2, is_admin=False)


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_current_user()
        if not user or not user.is_admin:
            return jsonify({'message': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function