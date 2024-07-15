from flask import Blueprint, request, jsonify
import numpy as np
import cv2
import logging
from PIL import Image

image_paths = [
    "assets/try_once/1.jpg",
    "assets/try_once/2.jpeg",
    "assets/try_once/3.jpeg",
    "assets/try_once/4.jpeg",
    "assets/try_once/5.jpeg",
    "assets/try_once/6.webp"
]

match_image_bp = Blueprint('matchImage', __name__)

# Load pre-trained models
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
facenet_model = cv2.dnn.readNetFromTorch("models/openface.nn4.small2.v1.t7")

def detect_faces(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

def get_face_encodings(faces, image):
    face_encodings = []
    for (x, y, w, h) in faces:
        face = image[y:y+h, x:x+w]
        face_blob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
        facenet_model.setInput(face_blob)
        encoding = facenet_model.forward()
        face_encodings.append(encoding.flatten())
    return face_encodings

@match_image_bp.route("/match-image", methods=['POST'])
def match_images_endpoint():
    try:
        data = request.json
        model_keys = data.get('modals', [])
        selected_key = data.get('image', None)

        if not model_keys or selected_key is None:
            return jsonify({"message": "Model keys and selected image key are required", "success": False}), 400

        model_encodings = []
        for key in model_keys:
            image_path = image_paths[int(key) - 1]
            image = cv2.imread(image_path)
            faces = detect_faces(image)
            if faces is not None:
                model_encodings.extend(get_face_encodings(faces, image))

        selected_image_path = image_paths[int(selected_key) - 1]
        selected_image = cv2.imread(selected_image_path)
        selected_faces = detect_faces(selected_image)
        if selected_faces is None:
            return jsonify({"message": "No face detected in the selected image", "success": False}), 400
        selected_encodings = get_face_encodings(selected_faces, selected_image)

        match_found = False
        for selected_encoding in selected_encodings:
            for model_encoding in model_encodings:
                similarity = np.dot(selected_encoding, model_encoding.T)
                if similarity > 0.8:
                    match_found = True
                    break
            if match_found:
                break

        return jsonify({"message": "Images match" if match_found else "Images do not match", "success": match_found}), 200

    except Exception as e:
        logging.error(f"Error in match_images_endpoint: {str(e)}")
        return jsonify({"error": str(e), "message": "Failed to match images", "success": False}), 500

@match_image_bp.route('/match-image-user', methods=['POST'])
def handle_match_image():
    try:
        modal_images = request.files.getlist('modals')
        selected_image = request.files.get('image')

        modal_images_data = [Image.open(img) for img in modal_images]
        selected_image_data = Image.open(selected_image)

        result = match_images(modal_images_data, selected_image_data)

        return jsonify(result), 200
    except Exception as e:
        logging.error(f"Error in handle_match_image: {str(e)}")
        return jsonify({"message": str(e), "success": False}), 500

def match_images(modal_images, selected_image):
    try:
        if not modal_images or selected_image is None:
            return {"message": "Please select an image to match", "success": False}

        modal_images_np = [np.array(img) for img in modal_images]
        selected_image_np = np.array(selected_image)

        modal_encodings = []
        for image in modal_images_np:
            faces = detect_faces(image)
            if faces is not None:
                modal_encodings.extend(get_face_encodings(faces, image))

        selected_faces = detect_faces(selected_image_np)
        if selected_faces is None:
            return {"message": "No face detected in the selected image", "success": False}

        selected_encodings = get_face_encodings(selected_faces, selected_image_np)

        match_found = False
        for selected_encoding in selected_encodings:
            for modal_encoding in modal_encodings:
                similarity = np.dot(selected_encoding, modal_encoding.T)
                if similarity > 0.8:
                    match_found = True
                    break
            if match_found:
                break

        return {"message": "Images match" if match_found else "Images do not match", "success": match_found}

    except Exception as e:
        logging.error(f"Error in match_images: {str(e)}")
        return {"error": str(e), "message": "Failed to match images", "success": False}
