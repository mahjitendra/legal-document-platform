from flask import request, jsonify
from app.services.auth_service import AuthService
from app.schemas.user_schema import user_schema

def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Username, email, and password are required'}), 400

    try:
        user = AuthService.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        return jsonify({'message': 'User registered successfully', 'user': user_schema.dump(user)}), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        # Log the exception e
        return jsonify({'message': 'Could not create user'}), 500

def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Username and password are required'}), 400

    user = AuthService.authenticate_user(data['username'], data['password'])

    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    try:
        token = AuthService.generate_token(user.id)
        return jsonify({'token': token, 'user': user_schema.dump(user)}), 200
    except Exception as e:
        # Log the exception e
        return jsonify({'message': 'Could not generate token'}), 500