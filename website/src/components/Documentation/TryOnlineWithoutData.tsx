import { ChangeEvent, useRef, useState, useCallback } from "react";
import "./TryOnline.css";
import { SERVER } from "../../config";
import { Modal, Tooltip } from "antd";
import TryImage from "./Reuse/TryImage";
import { Link } from "react-router-dom";
import axios from "axios";
import SampleCodeWithoutData from "./SampleCodeWithoutData";

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

      const response = await axios.post(
        `${SERVER}/try-online/match-image-user`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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

  const handleSelectImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedImages = e.target.files[0];
        setSelectedImageSrc(URL.createObjectURL(selectedImages));
        setSelectedImage(selectedImages);
      }
    },
    []
  );

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
          <h3 className="m-0 p-0">
            Selected Image(s) will be used as model data set
          </h3>
          <Link to="/try-online" className="btn btn-theme">
            Try with predefined Model
          </Link>
        </div>
        <code>These images will be sent to the server as a model to match</code>
        <div className="image-try-select-grid">
          {modelImagesSrc.map((src, index) => (
            <Tooltip title="remove the image">
              <TryImage
                key={` data ${index}`}
                handleClick={() => {
                  handleRemoveModelImage(index);
                }}
                image={src}
                isActive={false}
              />
            </Tooltip>
          ))}

          <Tooltip title="Add image(s) for model">
            <TryImage
              key={` data select a image`}
              handleClick={() => {
                handleModelImages();
              }}
              image="/assets/images/try-online/add-multiple.png"
              isActive={false}
            />
          </Tooltip>
        </div>

        <h3 className="m-0 p-0">Select an image to match</h3>
        <code>This image will be used to match against the model</code>
        <div className="image-try-select-grid">
          {selectedImageSrc && (
            <TryImage
              key={`selecteed one image`}
              handleClick={() => {}}
              image={selectedImageSrc}
              isActive={false}
            />
          )}
          <TryImage
            key={` data select a image`}
            handleClick={() => {
              handleSelectOneImage();
            }}
            image={`/assets/images/try-online/${
              selectedImageSrc ? "replace" : "add"
            }-one.png`}
            isActive={false}
          />
        </div>

        <div className="match-button text-end mt-2">
          <button onClick={handleMatchImages} className="btn btn-theme">
            Check Images
          </button>
        </div>
        <SampleCodeWithoutData />
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
      <input
        type="file"
        ref={fileInputSelecteImage}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleSelectImageChange}
      />
      <input
        type="file"
        ref={fileInputModelImage}
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </section>
  );
};

export default TryOnlineWithoutData;
