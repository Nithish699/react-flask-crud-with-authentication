from flask import request, jsonify
import jwt
import os

def token_required(f):
    def decorator(*args, **kwargs):
        token = request.cookies.get('jwt_token') 
        if not token:
            return jsonify({'message': 'Unauthorized - No Token Provided'}), 403

        try:
            decoded_token = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
            current_user_id = decoded_token['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 403

        request.user_id = current_user_id
        return f(*args, **kwargs)

    return decorator
