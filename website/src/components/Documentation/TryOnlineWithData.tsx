import { useState } from "react";
import "./TryOnline.css";
import { SERVER } from "../../config";
import SampleCode from "./SampleCode";
import { Modal } from "antd";
import TryImage from "./Reuse/TryImage";
import { Link } from "react-router-dom";

// Image paths for the sample images
const onePic = "/assets/images/try-online/1.jpg";
const twoPic = "/assets/images/try-online/2.jpeg";
const threePic = "/assets/images/try-online/3.jpeg";
const fourPic = "/assets/images/try-online/4.jpeg";
const fivePic = "/assets/images/try-online/5.jpeg";
const sixPic = "/assets/images/try-online/6.webp";

const TryOnlineWithData = () => {
  const [selectedModel, setSelectedModel] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSet = [
    { key: "1", image: onePic },
    { key: "2", image: twoPic },
    { key: "3", image: threePic },
    { key: "4", image: fourPic },
    { key: "5", image: fivePic },
    { key: "6", image: sixPic },
  ];

  // Function to handle toggling the selection of model images
  const handleImageSelectToggle = (key: string) => {
    if (!selectedModel.includes(key)) {
      setSelectedModel([...selectedModel, key]);
    } else {
      setSelectedModel(selectedModel.filter((img) => img !== key));
    }
  };

  // Function to handle selecting the image to be matched
  const handleSelectedImage = (key: string) => {
    if (selectedImage !== key) {
      setSelectedImage(key);
    } else {
      setSelectedImage(null);
    }
  };

  // Function to handle the image matching process
  const handleMatchImages = async () => {
    setResponse(null);
    if (!selectedImage || selectedModel.length === 0) {
      setResponse("Please select an image to match");
      showModal();
      return;
    }
    try {
      const response = await fetch(`${SERVER}/try-online/match-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modals: selectedModel, image: selectedImage }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message);
      } else {
        throw new Error("Failed to match images");
      }
    } catch (error) {
      console.error("Error matching images:", error);
      setResponse("Error: Failed to match images");
    } finally {
      showModal();
    }
  };

  return (
    <section className="pt-5">
      <div className="container">
        <div className="d-flex justify-content-between gap-2">
          <h3 className="m-0 p-0">
            Select Image(s) to create a model data set
          </h3>
          <Link to="/try-online#own" className="btn btn-theme">Try with own images </Link>
        </div>
        <code>These images will be sent to the server as a model to match</code>
        <div className="image-try-select-grid">
          {dataSet.map((data) => (
            <TryImage
              key={data.key}
              handleClick={() => {
                handleImageSelectToggle(data.key);
              }}
              image={data.image}
              isActive={selectedModel.includes(data.key)}
            />
          ))}
        </div>
        <h3 className="m-0 p-0">Select a image to match</h3>
        <code>This image will be used to match against the model</code>
        <div className="image-try-select-grid">
          {dataSet.map((data) => (
            <TryImage
              key={data.key}
              handleClick={() => {
                handleSelectedImage(data.key);
              }}
              image={data.image}
              isActive={selectedImage === data.key}
            />
          ))}
        </div>
        <div className="match-button text-end mt-2">
          <button onClick={handleMatchImages} className="btn btn-theme">
            Check Images
          </button>
        </div>
        <hr />
        <h3>Code used in this page</h3>
        <SampleCode />
        <Modal
          title="Result"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{response}</p>
        </Modal>
      </div>
    </section>
  );
};

export default TryOnlineWithData;
