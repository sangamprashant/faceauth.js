from flask import Flask, request, jsonify
import cv2
import numpy as np
from pymongo import MongoClient
import requests
from dotenv import load_dotenv
import base64
import os

load_dotenv()

app = Flask(__name__)

# Connect to MongoDB
mongo_uri= os.getenv("MONGODB_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)
db = client['face_recognition_db']
users_collection = db['users']

 
base_url = os.getenv("BASE_URL", "http://127.0.0.1:8000")

# Load the pre-trained face detection model from OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

def encode_face(image):
    # Encode the face using any suitable face recognition library
    # You can use deep learning-based libraries like dlib, OpenCV's face recognition module, or others
    # For simplicity, let's just resize the face region to a fixed size and flatten it
    face_resized = cv2.resize(image, (100, 100))
    encoding = face_resized.flatten()
    return encoding

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        user_id = data['user_id']
        face_image_base64 = data['face_image']

        # Decode the base64 image
        nparr = np.frombuffer(base64.b64decode(face_image_base64), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect face in the image
        faces = detect_face(image)
        if len(faces) == 0:
            return jsonify({"error": "No face detected"}), 400
        elif len(faces) > 1:
            return jsonify({"error": "Multiple faces detected. Please upload an image with a single face."}), 400

        # Extract face region and encode
        face_encoding = encode_face(image)

        # Check if face is already registered
        users = users_collection.find()
        for user in users:
            registered_encoding = np.array(user['face_encoding'])
            distance = np.linalg.norm(face_encoding - registered_encoding)
            if distance < 0.2:  # Tolerance for uniqueness
                return jsonify({"error": "Face already registered"}), 409

        # Save the face encoding to MongoDB
        users_collection.insert_one({
            "user_id": user_id,
            "face_encoding": face_encoding.tolist()  # Convert to list for MongoDB compatibility
        })

        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        face_image_base64 = data['face_image']

        # Decode the base64 image
        nparr = np.frombuffer(base64.b64decode(face_image_base64), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect face in the image
        faces = detect_face(image)
        if len(faces) == 0:
            return jsonify({"error": "No face detected"}), 400

        # Extract face region and encode
        input_encoding = encode_face(image)

        # Compare the input encoding with registered users' encodings
        users = users_collection.find()
        for user in users:
            registered_encoding = np.array(user['face_encoding'])
            distance = np.linalg.norm(input_encoding - registered_encoding)
            if distance < 0.2:  # Tolerance for uniqueness
                return jsonify({"message": "Login successful", "user_id": user['user_id']}), 200

        return jsonify({"message": "Face not recognized"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Function to convert image to base64
def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/', methods=['GET'])
def demo():
    try:
        # Sample data to send to the register endpoint
        data = {
            "user_id": "user123",
            "face_image": image_to_base64("user.png")
        }
        
        
        register_url = f"{base_url}/register"
        
        # Make a POST request to the register endpoint with sample data
        response = requests.post(register_url, json=data)
        
        # Return the response from the register endpoint
        return jsonify({"message": response.json()}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)
