from flask import Blueprint, request, jsonify
from app import users, project
from bson import ObjectId
import cv2
import numpy as np
import uuid
import bcrypt

# Load the pre-trained face detection model from OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

def encode_face(image, x, y, w, h):
    face = image[y:y+h, x:x+w]
    face_resized = cv2.resize(face, (100, 100))  # Resize to 100x100 for better accuracy
    gray_face = cv2.cvtColor(face_resized, cv2.COLOR_BGR2GRAY)
    return gray_face.flatten()

def normalize_encoding(encoding):
    # Normalize the encoding vector
    norm = np.linalg.norm(encoding)
    return encoding / norm if norm > 0 else encoding

def calculate_cosine_similarity(encoding1, encoding2):
    # Calculate cosine similarity
    dot_product = np.dot(encoding1, encoding2)
    norm1 = np.linalg.norm(encoding1)
    norm2 = np.linalg.norm(encoding2)
    return dot_product / (norm1 * norm2)

def process_face_image(face_image):
    # Read the uploaded image file as bytes
    image_data = face_image.read()
    
    # Decode the image from bytes
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        return None, "Invalid image file"
    
    # Detect face in the image
    faces = detect_face(image)
    if len(faces) == 0:
        return None, "No face detected"
    elif len(faces) > 1:
        return None, "Multiple faces detected. Please upload an image with a single face."
    
    # Extract face region and encode
    x, y, w, h = faces[0]
    face_encoding = encode_face(image, x, y, w, h)
    return normalize_encoding(face_encoding), None

def is_face_already_registered(face_encoding, existing_users):
    for registered_user in existing_users:
        registered_encoding = np.array(registered_user['face_encoding'])
        similarity = calculate_cosine_similarity(face_encoding, normalize_encoding(registered_encoding))
        print(f"Calculated similarity: {similarity}")  # Debugging: Print similarity
        if similarity > 0.8:  # Adjust the threshold as needed (0.8 is an example)
            return True
    return False

api_bp = Blueprint('api', __name__)

@api_bp.route("/authorization", methods=['POST'])
def get_user_by_api_key():
    try:
        # Extract and validate headers
        authorization_header = request.headers.get('Authorization')
        project_id = request.headers.get('X-Project-Code')
        pin = request.form.get('pin')
        payload = request.form.get('payload', "{}")
        face_image = request.files.get('face_image')

        if not authorization_header or not project_id:
            return jsonify({"message": "Authorization header and Project code are required", "success": False}), 400

        # Extract the API key from the header
        try:
            _, api_key = authorization_header.split('Bearer ')
        except ValueError:
            return jsonify({"message": "Invalid Authorization header format", "success": False}), 400

        # Find the user by API key
        user = users.find_one({'api_key': api_key})
        if not user:
            return jsonify({"message": "Incorrect API key, please try another", "success": False}), 404

        user['_id'] = str(user['_id'])

        # Find the project data
        project_data = project.find_one({'project_id': project_id, 'user_id': user['_id']})
        if not project_data:
            return jsonify({"message": "Project not found or incorrect API key", "success": False}), 404

        project_data['_id'] = str(project_data['_id'])
        project_data['user_id'] = str(project_data['user_id'])

        # Remove sensitive information
        user.pop('api_key', None)

        if face_image is None:
            return jsonify({"message": "Face image is required", "success": False}), 400

        face_encoding, error = process_face_image(face_image)
        if error:
            return jsonify({"error": error}), 400

        existing_users = project_data.get("users", [])
        if is_face_already_registered(face_encoding, existing_users):
            return jsonify({"error": "Face already registered"}), 409

        if len(pin) != 6 or not pin.isdigit():
            return jsonify({"error": "PIN must be a 6-digit number"}), 400

        hashed_pin = bcrypt.hashpw(pin.encode('utf-8'), bcrypt.gensalt())

        new_user = {
            'id': str(uuid.uuid4()),  # Generate unique ID
            'pin': hashed_pin.decode('utf-8'),  # Convert bytes to string
            'payload': payload,
            'face_encoding': face_encoding.tolist()
        }
        existing_users.append(new_user)
        project.update_one({'_id': ObjectId(project_data['_id'])}, {'$set': {'users': existing_users}})
        
        return jsonify({"user": user, "success": True, "project_id": project_id, "projectData": project_data}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500
