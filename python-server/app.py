from flask import Flask
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
from flask_cors import CORS
from config import Config
from pymongo import MongoClient

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    jwt = JWTManager(app)
    mongo = PyMongo(app)

    # Connect to MongoDB using py-mongo
    client = MongoClient(app.config['MONGO_URI'], connect=True)
    db = client[app.config['MONGODB_DATABASE']]

    # Define the user table here
    users = db[app.config["MONGODB_USER"]]
    history = db[app.config["MONGODB_HISTORY"]]
    project = db[app.config["MONGODB_PROJECT"]]
    notifications = db[app.config["MONGODB_NOTIFICATIONS"]]

    # Show message on console when connected
    print("Connected to MongoDB")
    
    return app, jwt, mongo, db, users, history, project, notifications

app, jwt, mongo, db, users, history, project, notifications = create_app()
