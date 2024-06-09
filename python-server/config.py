# config.py
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGODB_URI")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")
    MONGODB_USER = os.getenv("MONGODB_USER")
    EMAIL_SENDER = os.getenv("EMAIL_SENDER")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
    PUBLIC_LINK = os.getenv("PUBLIC_LINK")
    MONGODB_HISTORY = os.getenv("MONGODB_HISTORY")
    MONGODB_PROJECT = os.getenv("MONGODB_PROJECT")
    MONGODB_NOTIFICATIONS = os.getenv("MONGODB_NOTIFICATIONS")
