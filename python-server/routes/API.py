from flask import Blueprint, request, jsonify
from app import users, project
from bson import ObjectId
import numpy as np
import uuid
import bcrypt
import torch
from torchvision import transforms
from facenet_pytorch import InceptionResnetV1, MTCNN
import logging

api_bp = Blueprint('api', __name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load pre-trained models
mtcnn = MTCNN(keep_all=True, device=device)
facenet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

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

        # Read the image file and convert it to a PyTorch tensor
        image = Image.open(face_image).convert('RGB')
        image = transforms.ToTensor()(image).to(device)

        # Detect faces using MTCNN
        boxes, _ = mtcnn.detect(image)

        if boxes is None:
            return jsonify({"error": "No face detected"}), 400

        # Crop faces and get face embeddings
        face_encodings = []
        for box in boxes:
            box = box.astype(int)
            cropped_face = image[:, box[1]:box[3], box[0]:box[2]].unsqueeze(0)
            face_encoding = facenet(cropped_face).detach().cpu().numpy()[0]
            face_encodings.append(face_encoding)

        existing_users = project_data.get("users", [])
        for registered_user in existing_users:
            registered_encoding = np.array(registered_user['face_encoding'])
            similarities = np.dot(face_encodings, registered_encoding.T)
            if np.any(similarities > 0.4):  # Adjust the threshold as needed
                return jsonify({"error": "Face already registered"}), 409

        if len(pin) != 6 or not pin.isdigit():
            return jsonify({"error": "PIN must be a 6-digit number"}), 400

        hashed_pin = bcrypt.hashpw(pin.encode('utf-8'), bcrypt.gensalt())

        new_user = {
            'id': str(uuid.uuid4()),  # Generate unique ID
            'pin': hashed_pin.decode('utf-8'),  # Convert bytes to string
            'payload': payload,
            'face_encoding': face_encodings
        }
        existing_users.append(new_user)
        project.update_one({'_id': ObjectId(project_data['_id'])}, {'$set': {'users': existing_users}})

        return jsonify({"user": user, "success": True, "project_id": project_id, "projectData": project_data}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Internal server error", "success": False}), 500
