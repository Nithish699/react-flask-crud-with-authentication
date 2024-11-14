from app import app
from controllers.all_controller import get_items, create_item, get_item, update_items, delete_item, register, login, logout, delete_all_users
from middleware.token_required import token_required

# Create a new item
@app.route('/api/items', methods=['POST'])
def create_new_item():
    return create_item()

# Update a specific item by ID
@app.route('/api/items/<int:id>', methods=['PUT'])
def update_single_item(id):
    return update_items(id)

# Get all items
@app.route('/api/items', methods=['GET'])
def get_all_items():
    return get_items()

# Get a specific item by ID
@app.route('/api/items/<int:id>', methods=['GET'])
def get_single_item(id):
    return get_item(id)

# Delete an item by ID
@app.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item_route(id):
    return delete_item(id)

# Register
@app.route('/api/register', methods=['POST'])
def register_account():
    return register()

# login
@app.route('/api/login', methods=['POST'])
def login_account():
    return login()

# logout
@app.route('/api/logout', methods=['POST'])
def logout_account():
    return logout()

@app.route('/api/users', methods=['DELETE'])
def delete_users():
    return delete_all_users()