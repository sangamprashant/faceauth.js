import Highlight from "react-highlight";
import "highlight.js/styles/sunburst.css"; // Import the desired highlight.js theme

const SampleCode = () => {
  return (
    <div className="code-examples">
      <details>
        <summary>React.js Code</summary>
        <Highlight className="javascript">
          {`
import { useState } from "react";
import "./TryOnline.css";
import { SERVER } from "../../config";

// Image paths for the sample images
const onePic = "/assets/images/try-online/1.jpg";
const twoPic = "/assets/images/try-online/2.jpeg";
const threePic = "/assets/images/try-online/3.jpeg";
const fourPic = "/assets/images/try-online/4.jpeg";
const fivePic = "/assets/images/try-online/5.jpeg";
const sixPic = "/assets/images/try-online/6.webp";

const TryOnline = () => {
  const [selectedModel, setSelectedModel] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    try {
      const response = await fetch(\`\${SERVER}/try-online/match-image\`, {
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
    }
  };

  return (
    <section className="pt-5">
      <div className="container">
        <h3 className="m-0 p-0">Select Image(s) to create a model data set</h3>
        <code>These images will be sent to the server as a model to match</code>
        <div className="image-try-select-grid">
          {dataSet.map((data) => (
            <div
              key={data.key}
              className="image"
              onClick={() => handleImageSelectToggle(data.key)}
            >
              <img
                src={data.image}
                alt={\`Image \${data.key}\`}
                className={selectedModel.includes(data.key) ? "active" : ""}
              />
            </div>
          ))}
        </div>

        <h3 className="m-0 p-0">Select one image to match</h3>
        <code>This image will be used to match against the model</code>
        <div className="image-try-select-grid">
          {dataSet.map((data) => (
            <div
              key={data.key}
              className="image"
              onClick={() => handleSelectedImage(data.key)}
            >
              <img
                src={data.image}
                alt={\`Image \${data.key}\`}
                className={selectedImage === data.key ? "active" : ""}
              />
            </div>
          ))}
        </div>

        <div className="match-button">
          <button onClick={handleMatchImages} className="btn btn-theme">
            Match Images
          </button>
        </div>

        {response && (
          <div className="response">
            <h3>Server Response:</h3>
            <p>{response}</p>
          </div>
        )}
        <hr />
        <h3>This code is used for this page</h3>
        <SampleCode />
      </div>
    </section>
  );
};

export default TryOnline;
          `}
        </Highlight>
      </details>
      <details className="mt-3">
        <summary>Python (Flask) Code</summary>
        <Highlight className="python">
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

`}
        </Highlight>
      </details>
    </div>
  );
};

export default SampleCode;
