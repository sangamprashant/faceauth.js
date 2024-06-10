from flask import Blueprint, request, jsonify
from app import users, project
from bson import ObjectId
import cv2
import numpy as np
import base64
import uuid
import bcrypt

# Load the pre-trained face detection model from OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

def encode_face(image):
    face_resized = cv2.resize(image, (100, 100))
    encoding = face_resized.flatten().tolist()  # convert numpy array to list
    return encoding

api_bp = Blueprint('api', __name__)

@api_bp.route("/authorization", methods=['POST'])
def get_user_by_api_key():
    try:
        # Extract the Authorization header
        authorization_header = request.headers.get('Authorization')
        project_id = request.headers.get('X-Project-Code')
        pin = request.form.get('pin', None)
        payload = request.form.get('payload', '{}')
        face_image = request.files.get('face_image')

        # Check if the Authorization header is provided
        if not authorization_header:
            return jsonify({"message": "Authorization header is required", "success": False}), 400
        if not project_id:
            return jsonify({"message": "Project code is required", "success": False}), 400

        # Extract the API key from the header
        _, api_key = authorization_header.split('Bearer ')
        
        # Find the user by API key
        user = users.find_one({'api_key': api_key})
        if not user:
            return jsonify({"message": "Incorrect API key, please try another", "success": False}), 404

        # Convert ObjectId to string
        user['_id'] = str(user['_id'])

        project_data = project.find_one({'project_id': project_id, 'user_id': user['_id']})

        if not project_data:
            return jsonify({"message": "Project not found or incorrect API key", "success": False}), 404
        
        # Convert ObjectId to string for project data
        project_data['_id'] = str(project_data['_id'])
        project_data['user_id'] = str(project_data['user_id'])

        # Remove sensitive information such as API key before returning the user
        user.pop('api_key', None)

        # Ensure a face image file is provided
        if face_image is None:
            return jsonify({"message": "Face image is required", "success": False}), 400

        # Read the uploaded image file as bytes
        image_data = face_image.read()
        
        # Decode the image from bytes
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({"message": "Invalid image file", "success": False}), 400
        
        # Detect face in the image
        faces = detect_face(image)
        if len(faces) == 0:
            return jsonify({"error": "No face detected"}), 400
        elif len(faces) > 1:
            return jsonify({"error": "Multiple faces detected. Please upload an image with a single face."}), 400

        # Extract face region and encode
        x, y, w, h = faces[0]
        face_image = image[y:y+h, x:x+w]
        face_encoding = encode_face(face_image)

        # Check if the new face is similar to any existing registered face
        for registered_user in project_data.get("users", []):
            registered_encoding = np.array(registered_user['face_encoding'])
            distance = np.linalg.norm(face_encoding - registered_encoding)
            if distance < 0.2:  # Tolerance for uniqueness
                return jsonify({"error": "Face already registered"}), 409

        # Check if the PIN is 6 digits
        if len(pin) != 6 or not pin.isdigit():
            return jsonify({"error": "PIN must be a 6-digit number"}), 400

        # Hash the PIN using bcrypt
        hashed_pin = bcrypt.hashpw(pin.encode('utf-8'), bcrypt.gensalt())

        # Add new user face encoding to the project
        new_user = {
            'pin': hashed_pin.decode('utf-8'),  # Convert bytes to string
            'payload': payload,
            'face_encoding': face_encoding
        }
        project_data.setdefault('users', []).append(new_user)
        project.update_one({'_id': ObjectId(project_data['_id'])}, {'$set': {'users': project_data['users']}})
        
        return jsonify({"user": user, "success": True, "project_id": project_id, "projectData": project_data}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500
