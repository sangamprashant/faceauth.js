from flask import Blueprint, request, jsonify
from app import users, project
from bson import ObjectId
import numpy as np
import uuid
import bcrypt
import cv2
import logging
import json
from datetime import datetime

api_bp = Blueprint('api', __name__)

# Load pre-trained models
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
facenet_model = cv2.dnn.readNetFromTorch("models/openface.nn4.small2.v1.t7")

def get_user_and_project(authorization_header, project_id):
    try:
        _, api_key = authorization_header.split('Bearer ')
        user = users.find_one({'api_key': api_key})
        if not user:
            return None, None

        user['_id'] = str(user['_id'])
        project_data = project.find_one({'project_id': project_id, 'user_id': user['_id']})
        if not project_data:
            return None, None

        project_data['_id'] = str(project_data['_id'])
        project_data['user_id'] = str(project_data['user_id'])

        # Remove sensitive information
        user.pop('api_key', None)

        return user, project_data
    except Exception as e:
        logging.error(f"Error while getting user and project: {str(e)}")
        return None, None

def detect_faces(face_images):
    best_face_image = None
    max_faces = 0

    for face_image in face_images:
        image = cv2.imdecode(np.frombuffer(face_image.read(), np.uint8), cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) > max_faces:
            max_faces = len(faces)
            best_face_image = image

    return best_face_image, faces  # Returning faces as well

def get_face_encodings(faces, best_face_image):
    face_encodings = []
    for (x, y, w, h) in faces:
        face = best_face_image[y:y+h, x:x+w]
        face_blob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
        facenet_model.setInput(face_blob)
        encoding = facenet_model.forward()
        face_encodings.append(encoding.flatten())

    return face_encodings

@api_bp.route("/authorization", methods=['POST'])
def get_user_by_api_key():
    try:
        authorization_header = request.headers.get('Authorization')
        project_id = request.headers.get('X-Project-Code')
        pin = request.form.get('pin')
        payload = json.loads(request.form.get('payload', "{}"))
        face_images = request.files.getlist('face_images')

        if not authorization_header or not project_id:
            return jsonify({"message": "Authorization header and Project code are required", "success": False}), 400

        user, project_data = get_user_and_project(authorization_header, project_id)
        if not user or not project_data:
            return jsonify({"message": "Project not found or unauthorized", "success": False}), 404

        best_face_image, faces = detect_faces(face_images)
        if len(faces) == 0:
            return jsonify({"error": "No face detected in any image"}), 400

        face_encodings = get_face_encodings(faces, best_face_image)

        existing_users = project_data.get("users", [])
        for registered_user in existing_users:
            registered_encoding = np.array(registered_user['face_encoding'])
            if len(face_encodings) == 0:
                logging.warning("face_encodings is empty")
            similarities = np.dot(face_encodings, registered_encoding.T)
            print(similarities)
            if np.any(similarities > 0.7):  # Adjust the threshold as needed
                return jsonify({"error": "Face already registered"}), 409

        if len(pin) != 6 or not pin.isdigit():
            return jsonify({"error": "PIN must be a 6-digit number"}), 400

        hashed_pin = bcrypt.hashpw(pin.encode('utf-8'), bcrypt.gensalt())

        face_encodings_serializable = [encoding.tolist() for encoding in face_encodings]

        new_user = {
            'id': str(uuid.uuid4()),  
            'pin': hashed_pin.decode('utf-8'),  
            'payload': payload,
            'face_encoding': face_encodings_serializable,  
            'registration_timestamp': datetime.now().isoformat()  
        }
        existing_users.append(new_user)
        project.update_one({'_id': ObjectId(project_data['_id'])}, {'$set': {'users': existing_users}})

        return jsonify({ 
            "success": True,
            "message": "Login successful",
            "user": {
                "id": new_user['id'],
                "payload": new_user["payload"]
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500


@api_bp.route("/login", methods=['POST'])
def login():
    try:
        authorization_header = request.headers.get('Authorization')
        project_id = request.headers.get('X-Project-Code')
        pin = request.form.get('pin')
        face_images = request.files.getlist('face_images')

        if not authorization_header or not project_id:
            return jsonify({"message": "Authorization header and Project code are required", "success": False}), 400

        if not pin or len(pin) != 6 or not pin.isdigit():
            return jsonify({"error": "PIN must be a 6-digit number", "success": False}), 400

        user, project_data = get_user_and_project(authorization_header, project_id)
        if not user or not project_data:
            return jsonify({"message": "Project not found or unauthorized", "success": False}), 404

        best_face_image, faces = detect_faces(face_images)
        if len(faces) == 0:
            return jsonify({"error": "No face detected in any image"}), 400

        face_encodings = get_face_encodings(faces, best_face_image)

        existing_users = project_data.get("users", [])
        for registered_user in existing_users:
            registered_encoding = np.array(registered_user['face_encoding'])
            if len(face_encodings) == 0:
                logging.warning("face_encodings is empty")
            similarities = np.dot(face_encodings, registered_encoding.T)
            print(similarities)
            if np.any(similarities > 0.7):  # Adjust the threshold as needed
                if bcrypt.checkpw(pin.encode('utf-8'), registered_user['pin'].encode('utf-8')):
                    return jsonify({
                        "message": "Login successful",
                        "success": True,
                        "user": {
                            "id": registered_user['id'],
                            "payload": registered_user["payload"]
                        }
                    }), 200
                else:
                    return jsonify({"error": "Invalid PIN", "success": False}), 401

        return jsonify({"error": "Face not recognized. Login failed.", "success": False}), 401

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500