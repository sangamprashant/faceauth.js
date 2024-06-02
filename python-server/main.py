from flask import Flask, request, jsonify
import requests
from deepface import DeepFace
import numpy as np
import base64
import cv2
from pymongo import MongoClient
from dotenv import load_dotenv
from secrets import token_urlsafe
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Connect to MongoDB using environment variable
mongodb_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongodb_uri)
db = client[os.getenv("MONGODB_DATABASE")]
users_collection = db['users']

def encode_face(image):
    try:
        encoding = DeepFace.represent(image, model_name="VGG-Face", enforce_detection=False)[0]["embedding"]
        return encoding
    except Exception as e:
        print("Error in encoding face:", str(e))
        return None
    
# Function to convert image to base64
def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        user_id = data['user_id']
        face_image_base64 = data['face_image']
        
        # Decode the base64 image
        face_image_data = base64.b64decode(face_image_base64)
        face_image_np = np.frombuffer(face_image_data, np.uint8)
        face_image = cv2.imdecode(face_image_np, cv2.IMREAD_COLOR)
        
        # Encode the face
        face_encoding = encode_face(face_image)
        
        if face_encoding is None:
            return jsonify({"messsage": "Could not encode face", "success":False}), 400

        # Check for uniqueness
        users = users_collection.find()
        for user in users:
            registered_encoding = np.array(user['face_encoding'])
            distance = np.linalg.norm(face_encoding - registered_encoding)
            if distance < 0.2:  # Tolerance for uniqueness
                return jsonify({"message": "Face already registered", "success":False}), 409
        
        # Save the encoding to MongoDB
        users_collection.insert_one({
            "user_id": user_id,
            "face_encoding": face_encoding  # Convert to list for MongoDB compatibility
        })
        
        return jsonify({"message": "User registered successfully","success":True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        face_image_base64 = data['face_image']
        
        # Decode the base64 image
        face_image_data = base64.b64decode(face_image_base64)
        face_image_np = np.frombuffer(face_image_data, np.uint8)
        face_image = cv2.imdecode(face_image_np, cv2.IMREAD_COLOR)
        
        # Encode the face
        input_encoding = encode_face(face_image)
        
        if input_encoding is None:
            return jsonify({"error": "Could not encode face", "success":False}), 400
        
        # Compare the input encoding with registered users' encodings
        users = users_collection.find()
        for user in users:
            registered_encoding = np.array(user['face_encoding'])
            distance = np.linalg.norm(input_encoding - registered_encoding)
            if distance < 0.2:  # Tolerance for uniqueness
                return jsonify({"message": "Login successful", "user_id": user['user_id']}), 200
        
        return jsonify({"message": "Face not recognized", "success":False}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
@app.route('/', methods=['GET'])
def RegisterDeployCheck():
    try:
        # Register a user
        register_url = "http://127.0.0.1:8000/register"
        register_payload = {
            "user_id": "user123",
            "face_image": image_to_base64("user.png")  
        }
        register_response = requests.post(register_url, json=register_payload)
        
        # Return response in JSON format
        return jsonify({"data": register_response.json()}), register_response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


if __name__ == '__main__':
    app.run(debug=True, port=8000)
