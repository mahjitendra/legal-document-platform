from flask import Blueprint
from .controllers import (
    get_notifications,
    mark_as_read,
    mark_all_as_read,
    get_unread_count
)
from app.middleware.auth_middleware import token_required

notifications_bp = Blueprint('notifications', __name__, url_prefix='/notifications')

notifications_bp.route('/', methods=['GET'])(token_required(get_notifications))
notifications_bp.route('/<int:notification_id>/read', methods=['PUT'])(token_required(mark_as_read))
notifications_bp.route('/read-all', methods=['PUT'])(token_required(mark_all_as_read))
notifications_bp.route('/unread-count', methods=['GET'])(token_required(get_unread_count))
