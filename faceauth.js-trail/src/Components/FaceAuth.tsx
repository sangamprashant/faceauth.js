import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Modal from "./Modal";
import PinInput from "./PinInput";

const apiBaseUrl = "http://127.0.0.1:8000/api/face-auth";

interface FaceAuthProps {
  endPoint: "authenticate" | "authorization";
  projectId: string;
  apiKey: string;
  payload?: {}; // for register
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

const FaceAuth: React.FC<FaceAuthProps> = ({
  endPoint,
  projectId,
  apiKey,
  payload,
  onSuccess,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<Blob[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [pin, setPin] = useState<string>("");
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [showScanning, setShowScanning] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(0);

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
      stopCamera(); // Stop the camera
      if (time === 0) setShowPinModal(true); // Show the PIN input modal
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

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 6) {
      setShowPinModal(false);
      authenticate();
    } else {
      console.log("Please enter a valid 6-digit PIN.");
    }
  };

  const authenticate = async () => {
    try {
      setShowScanning(true);
      const formData = new FormData();
      images.forEach((image) => formData.append("face_images", image));
      formData.append("pin", pin);
      if (endPoint === "authorization" && payload) {
        formData.append("payload", JSON.stringify(payload));
      }
      const response = await axios.post(`${apiBaseUrl}/${endPoint}`, formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Project-Code": projectId,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        onSuccess && onSuccess(response.data.user);
        setSuccess(true);
      } else {
        onError && onError(response?.data || "something went wrong");
        setErrorMsg(response?.data?.message || "something went wrong");
        setError(true);
      }
    } catch (error: any) {
      onError && onError(error?.response?.data || "something went wrong");
      setErrorMsg(error?.response?.data?.message || "something went wrong");
      setError(true);
    } finally {
      setShowScanning(false);
      setTime(1);
    }
  };

  return (
    <>
      {showPinModal && (
        <Modal isOpen={true} onClose={() => setShowPinModal(false)}>
          <h5 className="faceauth-js-pin-message">
            Please enter your 6-digit PIN to proceed with face authentication
          </h5>
          <PinInput
            pin={pin}
            setPin={setPin}
            handlePinSubmit={handlePinSubmit}
          />
        </Modal>
      )}
      {showScanning ? (
        <div className="faceauth-js-message">
          <img src="scanning.gif" width="70%" alt="Scanning..." />
        </div>
      ) : (
        <>
          {error ? (
            <>
              <img src="error.gif" width="70%" alt="Error" />
              <p>{errorMsg}</p>
            </>
          ) : success ? (
            <>
              <img src="success.jpg" width="70%" alt="Success" />
              <p>
                {endPoint === "authorization"
                  ? "User account created"
                  : "User logged in successfully"}
              </p>
            </>
          ) : (
            <>
              <video className="faceauth-js-video" ref={videoRef} />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </>
          )}
        </>
      )}
    </>
  );
};

export const initFaceAuth = (props: FaceAuthProps) => {
  return new Promise((resolve, reject) => {
    let faceAuthDiv = document.getElementById("faceauth-js");

    if (!faceAuthDiv) {
      faceAuthDiv = document.createElement("div");
      faceAuthDiv.id = "faceauth-js";
      document.body.appendChild(faceAuthDiv);
    }

    let root = ReactDOM.createRoot(faceAuthDiv);

    const closeModal = () => {
      if (faceAuthDiv) {
        ReactDOM.createRoot(faceAuthDiv).unmount();
        document.body.removeChild(faceAuthDiv);
      }
    };

    const showMessage = () => {
      root.render(
        <Modal isOpen={true} onClose={closeModal}>
          <div className="faceauth-js-message">
            Preparing face authentication. Please wait...
            <img src="face.gif" width="70%" alt="Preparing..." />
          </div>
        </Modal>
      );

      setTimeout(() => {
        root.render(
          <Modal isOpen={true} onClose={closeModal}>
            <FaceAuth
              {...props}
              onSuccess={(user) => {
                // closeModal();
                resolve(user);
              }}
              onError={(error) => {
                // closeModal();
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

export const deleteUserFromProject = async (
  userId: string,
  projectId: string,
  apiKey: string
) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/project/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Project-Code": projectId,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export default FaceAuth;
