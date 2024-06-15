// src/index.tsx
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Modal from './Modal';

const apiBaseUrl = "http://127.0.0.1:8000/api/face-auth";

interface FaceAuthProps {
  endPoint : "authenticate" | "authorization"
  projectId: string;
  apiKey: string;
  pin: string;
  payload?: {}; // for register
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

const FaceAuth: React.FC<FaceAuthProps> = ({
  endPoint,
  projectId,
  apiKey,
  pin,
  payload,
  onSuccess,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<Blob[]>([]);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => onError && onError(error));
    }
  }, [onError]);

  useEffect(() => {
    if (images.length === 0 && !capturing) {
      handleCapture();
    } else if (images.length === 3) {
      authenticate();
    }
  }, [images, capturing]);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setImages((prev) => [...prev, blob]);
          }
        }, "image/webp");
      }
    }
  };

  const handleCapture = () => {
    setCapturing(true);
    const interval = setInterval(() => {
      captureImage();
      if (images.length >= 2) {
        clearInterval(interval);
        setCapturing(false);
      }
    }, 1000);
  };

  const authenticate = async () => {
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("face_images", image));
      formData.append("pin", pin);
      if (endPoint === "authorization" && payload) {
        formData.append("payload", JSON.stringify(payload));
      }
      const response = await axios.post(
        `${apiBaseUrl}/${endPoint}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "X-Project-Code": projectId,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        onSuccess && onSuccess(response.data.user);
      } else {
        onError && onError(response.data);
      }
    } catch (error: any) {
      onError && onError(error.response.data);
    }
  };

  return (
    <div>
      <video ref={videoRef} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export const initFaceAuth = (props: FaceAuthProps) => {
  return new Promise((resolve, reject) => {
    const faceAuthDiv = document.createElement('div');
    document.body.appendChild(faceAuthDiv);

    const closeModal = () => {
      document.body.removeChild(faceAuthDiv);
    };

    const showMessage = () => {
      ReactDOM.createRoot(faceAuthDiv).render(
        <Modal isOpen={true} onClose={closeModal}>
          <div className="message">
            Preparing face authentication. Please wait...
            <img src="face.gif" width="100%" />
          </div>
        </Modal>
      );

      setTimeout(() => {
        ReactDOM.createRoot(faceAuthDiv).render(
          <Modal isOpen={true} onClose={closeModal}>
            <FaceAuth
              {...props}
              onSuccess={(user) => {
                closeModal();
                resolve(user);
              }}
              onError={(error) => {
                closeModal();
                reject(error);
              }}
            />
          </Modal>
        );
      }, 3000); // 3-second delay before starting face authentication
    };

    showMessage();
  });
};

export default FaceAuth;
