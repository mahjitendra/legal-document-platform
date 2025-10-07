from flask_socketio import emit, join_room, leave_room
from datetime import datetime

class NotificationHandler:
    def __init__(self, socketio):
        self.socketio = socketio
        self.user_sessions = {}

        @socketio.on('connect_notifications')
        def handle_connect_notifications(data):
            user_id = data.get('user_id')

            if user_id:
                room = f'user_{user_id}'
                join_room(room)
                self.user_sessions[user_id] = room

                emit('notification_connected', {
                    'status': 'connected',
                    'user_id': user_id
                })

        @socketio.on('disconnect_notifications')
        def handle_disconnect_notifications(data):
            user_id = data.get('user_id')

            if user_id and user_id in self.user_sessions:
                room = self.user_sessions[user_id]
                leave_room(room)
                del self.user_sessions[user_id]

    def send_notification(self, user_id, notification_data):
        room = f'user_{user_id}'

        self.socketio.emit('new_notification', {
            'notification': notification_data,
            'timestamp': datetime.utcnow().isoformat()
        }, room=room)

    def send_bulk_notification(self, user_ids, notification_data):
        for user_id in user_ids:
            self.send_notification(user_id, notification_data)

    def broadcast_notification(self, notification_data):
        self.socketio.emit('broadcast_notification', {
            'notification': notification_data,
            'timestamp': datetime.utcnow().isoformat()
        }, broadcast=True)
