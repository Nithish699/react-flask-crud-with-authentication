from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
frontend_url = os.getenv('FRONTEND_URL')
CORS(app, supports_credentials=True, origins=frontend_url)

# Set up secret key for security
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Set up database URI (SQLite in this case)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions with app
db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

# Serve static files from the "dist" folder
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

# Example database test route
@app.route('/test-db')
def test_db():
    try:
        db.session.execute('SELECT 1')
        return "Database connection successful!"
    except Exception as e:
        return f"Error: {e}"

# Import and initialize routes
import routes.all_routes

# Create database tables if they don't exist
with app.app_context():
    db.create_all()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
