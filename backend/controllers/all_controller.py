from flask import request, jsonify
from models.item import Item
from models.user import User
from app import db
from utils.generateToken import generate_token, set_jwt_cookie
import bcrypt
from flask import make_response

# Get all items
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

# Get a specific item by ID
def get_item(id):
    item = Item.query.get(id)
    if item:
        return jsonify(item.to_dict())
    return jsonify({'error': 'Item not found'}), 404

# Create a new item with error handling
def create_item():
    try:
        data = request.json
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')

        if not name or not description or price is None:
            return jsonify({'error': 'Name, description, and price are required'}), 400
        if price <= 0:
            return jsonify({'error': 'Price must be a positive number'}), 400
    
        existing_item = Item.query.filter_by(name=name).first()
        if existing_item:
            return jsonify({'error': f'Item with name "{name}" already exists'}), 400

        new_item = Item(name=name, description=description, price=price)
        db.session.add(new_item)
        db.session.commit()

        item_response = {
            'id': new_item.id,
            'name': new_item.name,
            'description': new_item.description,
            'price': new_item.price
        }

        return jsonify({'message': 'Item created successfully', 'item': item_response}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update specific item
def update_items(id):
    try:
        item = Item.query.get(id)

        if not item: 
            return jsonify({'error': 'Item not found!'}), 404

        data = request.json

        name = data.get('name')
        description = data.get('description')
        price = data.get('price')

        if not name or not description or price is None:
            return jsonify({'error': 'Name, description, and price are required'}), 400
        if price <= 0:
            return jsonify({'error': 'Price must be a positive number'}), 400
        
        existing_item = Item.query.filter_by(name=name).first()
        if existing_item and existing_item.id != id:
            return jsonify({'error': f'Item with name "{name}" already exists'}), 400
        
        if item.name == name and item.description == description and item.price == price:
            return jsonify({'message': 'No changes made. Item is already up to date.'}), 200

        item.name = name
        item.description = description
        item.price = price

        db.session.commit()

        item_response = {
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'price': item.price
        }

        return jsonify({'message': 'Item updated successfully', 'item': item_response}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete specific item
def delete_item(id):
    try:
        item = Item.query.get(id)

        if not item:
            return jsonify({'error': 'Item not found!'}), 404

        db.session.delete(item)
        db.session.commit()

        return jsonify({'message': f'Item {item.name} deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


def register():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        gender = data.get('gender')\
        
        if gender == 'male':
            img_url = f'https://avatar.iran.liara.run/public/boy?username={username}'
        elif gender == 'female':
             img_url = f'https://avatar.iran.liara.run/public/girl?username={username}'
        else:
            img_url = None


        if not username or not password or not gender:
            return jsonify({'error': 'Username, password, and gender are required'}), 400

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists!'}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        new_user = User(username=username, gender=gender, img_url=img_url, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        token = generate_token(new_user.id)

        response = make_response(jsonify({
            'message': 'User registered successfully!',
            'username': username,
            'img_url': img_url

        }))

        response = set_jwt_cookie(response, token)

        return response

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({'error': 'Username not found'}), 401

        if not bcrypt.checkpw(password.encode('utf-8'), user.password):
            return jsonify({'error': 'Invalid password'}), 401

        token = generate_token(user.id)

        response = make_response(jsonify({
            'message': 'Login successful!',
            'username': user.username,
            'img_url': user.img_url,
            'gender': user.gender
        }))

        response = set_jwt_cookie(response, token)

        return response

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def logout():
    try:
        response = make_response(jsonify({'message': 'Logout successful!'}))
        response.set_cookie('jwt_token', '', expires=0, httponly=True, secure=True)
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def delete_all_users():
    try:
        users = User.query.all()

        if not users:
            return jsonify({'error': 'No users found'}), 404
        for user in users:
            db.session.delete(user)
        
        db.session.commit()

        return jsonify({'message': 'All users deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500