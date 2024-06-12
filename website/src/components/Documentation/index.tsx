import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const FaceAuthForm: React.FC = () => {
  const [pin, setPin] = useState<string>("123456");
  const [images, setImages] = useState<File[]>([]);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name: "Prashant",
      desc: "trail",
    };
    setResponse(null);
    setError(null);
    const formData = new FormData();
    formData.append("pin", pin);
    formData.append("payload", JSON.stringify(payload)); // Serialize payload to JSON string

    // Append the list of images to the formData
    images.forEach((image) => {
      formData.append(`face_images`, image);
    });

    try {
      const res = await axios.post(
        // "http://127.0.0.1:8000/api/face-auth/authorization",
        "http://127.0.0.1:8000/api/face-auth/login",
        formData,
        {
          headers: {
            Authorization: "Bearer 432339ed-4c3f-42d2-910e-404100e4fd51",
            "X-Project-Code": "61315f6f-d27f-44f3-9dc4-6ca2672bcd9c",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(res.data);
      setError(null);
    } catch (err: any) {
      setError(
        err.response ? err.response.data : "Error connecting to the server"
      );
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Face Authentication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pin:</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6} // Ensure the PIN is 6 digits
          />
        </div>
        <div>
          <label>Face Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FaceAuthForm;
