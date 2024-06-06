# config.py
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGODB_URI")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")
    BASE_URL = os.getenv("BASE_URL")
    MONGODB_USER = os.getenv("MONGODB_USER")
