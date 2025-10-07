from flask_socketio import emit, join_room, leave_room
from datetime import datetime

class ChatHandler:
    def __init__(self, socketio):
        self.socketio = socketio
        self.active_rooms = {}

        @socketio.on('connect')
        def handle_connect():
            emit('connection_response', {'status': 'connected'})

        @socketio.on('disconnect')
        def handle_disconnect():
            emit('connection_response', {'status': 'disconnected'})

        @socketio.on('join_chat')
        def handle_join_chat(data):
            room = data.get('room_id')
            username = data.get('username')

            join_room(room)

            if room not in self.active_rooms:
                self.active_rooms[room] = []

            self.active_rooms[room].append(username)

            emit('user_joined', {
                'username': username,
                'timestamp': datetime.utcnow().isoformat()
            }, room=room)

        @socketio.on('leave_chat')
        def handle_leave_chat(data):
            room = data.get('room_id')
            username = data.get('username')

            leave_room(room)

            if room in self.active_rooms and username in self.active_rooms[room]:
                self.active_rooms[room].remove(username)

            emit('user_left', {
                'username': username,
                'timestamp': datetime.utcnow().isoformat()
            }, room=room)

        @socketio.on('send_message')
        def handle_send_message(data):
            room = data.get('room_id')
            message = data.get('message')
            username = data.get('username')

            message_data = {
                'username': username,
                'message': message,
                'timestamp': datetime.utcnow().isoformat()
            }

            emit('new_message', message_data, room=room)

        @socketio.on('typing')
        def handle_typing(data):
            room = data.get('room_id')
            username = data.get('username')
            is_typing = data.get('is_typing', False)

            emit('user_typing', {
                'username': username,
                'is_typing': is_typing
            }, room=room, include_self=False)
