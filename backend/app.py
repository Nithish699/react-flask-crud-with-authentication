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

# Set Database URI (SQLite in this case)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions with app
db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

#Server static files from the "dist" folder under the frontend directtory
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename: 
        filename = "index.html"
    # Serve the requested file from the dist folder
    return send_from_directory(dist_folder, filename)

# Api routes
import routes.all_routes

# Creating database tables if they don't exist
with app.app_context():
    db.create_all()

# Check if this script is being run directly
if __name__ == '__main__':
    app.run(debug=True)

