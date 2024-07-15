import Highlight from "react-highlight";

const SampleCodeWithoutData = () => {
  return (
    <div className="code-examples">
      <details>
        <summary>React.js Code</summary>
        <Highlight className="javascript">
          {`
import { ChangeEvent, useRef, useState, useCallback } from "react";
import "./TryOnline.css";
import { SERVER } from "../../config";
import { Modal, Tooltip } from "antd";
import TryImage from "./Reuse/TryImage";
import { Link } from "react-router-dom";
import axios from "axios";

const TryOnlineWithoutData = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<File[]>([]);
  const [modelImagesSrc, setModelImagesSrc] = useState<string[]>([]);
  const fileInputModelImage = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const fileInputSelecteImage = useRef<HTMLInputElement>(null);

  const showModal = useCallback(() => setIsModalOpen(true), []);
  const handleOk = useCallback(() => setIsModalOpen(false), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  const handleMatchImages = useCallback(async () => {
    setResponse(null);
    if (!selectedImage || modalImages.length === 0) {
      setResponse("Please select an image to match");
      showModal();
      return;
    }
    try {
      const formData = new FormData();
      modalImages.forEach((image) => formData.append("modals", image));
      formData.append("image", selectedImage);

      const response = await axios.post(\`\${SERVER}/try-online/match-image-user\`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(response.data.message);
    } catch (error) {
      console.error("Error matching images:", error);
      setResponse("Error: Failed to match images");
    } finally {
      showModal();
    }
  }, [selectedImage, modalImages, showModal]);

  const handleSelectOneImage = useCallback(() => {
    if (fileInputSelecteImage.current) {
      fileInputSelecteImage.current.click();
    }
  }, []);

  const handleSelectImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = e.target.files[0];
      setSelectedImageSrc(URL.createObjectURL(selectedImages));
      setSelectedImage(selectedImages);
    }
  }, []);

  const handleModelImages = useCallback(() => {
    if (fileInputModelImage.current) {
      fileInputModelImage.current.click();
    }
  }, []);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      const newImagesSrc = newImages.map((file) => URL.createObjectURL(file));
      setModelImagesSrc((prevImages) => [...prevImages, ...newImagesSrc]);
      setModalImages((prevImages) => [...prevImages, ...newImages]);
    }
  }, []);

  const handleRemoveModelImage = useCallback((index: number) => {
    setModelImagesSrc((prev) => prev.filter((_, i) => i !== index));
    setModalImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <section className="pt-5">
      <div className="container">
        <div className="d-flex justify-content-between gap-2">
          <h3 className="m-0 p-0">Selected Image(s) will be used as model data set</h3>
          <Link to="/try-online" className="btn btn-theme">Try with predefined Model</Link>
        </div>
        <code>These images will be sent to the server as a model to match</code>
        <div className="image-try-select-grid">
          {modelImagesSrc.map((src, index) => (
            <Tooltip title="remove the image" key={index}>
              <TryImage handleClick={() => handleRemoveModelImage(index)} image={src} isActive={false} />
            </Tooltip>
          ))}
          <Tooltip title="Add image(s) for model">
            <TryImage handleClick={handleModelImages} image="/assets/images/try-online/add-multiple.png" isActive={false} />
          </Tooltip>
        </div>

        <h3 className="m-0 p-0">Select an image to match</h3>
        <code>This image will be used to match against the model</code>
        <div className="image-try-select-grid">
          {selectedImageSrc && (
            <TryImage key="selected-one-image" handleClick={() => {}} image={selectedImageSrc} isActive={false} />
          )}
          <TryImage handleClick={handleSelectOneImage} image={\`/assets/images/try-online/\${selectedImageSrc ? "replace" : "add"}-one.png\`} isActive={false} />
        </div>

        <div className="match-button text-end mt-2">
          <button onClick={handleMatchImages} className="btn btn-theme">Check Images</button>
        </div>
        <Modal title="Result" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>{response}</p>
        </Modal>
      </div>
      <input type="file" ref={fileInputSelecteImage} style={{ display: "none" }} accept="image/*" onChange={handleSelectImageChange} />
      <input type="file" ref={fileInputModelImage} style={{ display: "none" }} accept="image/*" multiple onChange={handleImageChange} />
    </section>
  );
};

export default TryOnlineWithoutData;

`}
        </Highlight>
      </details>

      <details className="mt-3">
        <summary>Python (Flask) Code</summary>
        <Highlight className="python">
          {`
from flask import Blueprint, request, jsonify
import numpy as np
import cv2
import logging
from PIL import Image

match_image_bp = Blueprint('matchImage', __name__)

# Load pre-trained models
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
facenet_model = cv2.dnn.readNetFromTorch("models/openface.nn4.small2.v1.t7")
`}
        </Highlight>
        <Highlight className="python mt-2">
          {`def detect_faces(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces
`}
        </Highlight>
        <Highlight className="python mt-2">
          {`
def get_face_encodings(faces, image):
    face_encodings = []
    for (x, y, w, h) in faces:
        face = image[y:y+h, x:x+w]
        face_blob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
        facenet_model.setInput(face_blob)
        encoding = facenet_model.forward()
        face_encodings.append(encoding.flatten())
    return face_encodings`}
        </Highlight>
        <Highlight className="python mt-2">
          {`
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
`}
        </Highlight>
        <Highlight className="python mt-2">
          {`
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
        return {"error": str(e), "message": "Failed to match images", "success": False}`}
        </Highlight>
      </details>
    </div>
  );
};

export default SampleCodeWithoutData;
