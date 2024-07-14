import { useState } from "react";


const TryOnline = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>(null);

  // Function to handle image selection
  const handleImageSelect = (imageName: string) => {
    if (!selectedImages.includes(imageName)) {
      setSelectedImages([...selectedImages, imageName]);
    }
  };

  // Function to handle image removal from selected list
  const handleImageRemove = (imageName: string) => {
    setSelectedImages(selectedImages.filter(img => img !== imageName));
  };

  // Function to handle matching process
  const handleMatchImages = async () => {
    try {
      // Simulating server request
      const response = await fetch('https://example.com/match-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: selectedImages }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message); // Assuming server returns a message
      } else {
        throw new Error('Failed to match images');
      }
    } catch (error) {
      console.error('Error matching images:', error);
      setResponse('Error: Failed to match images');
    }
  };

  return (
    <section className="pt-5">
      <div className="container">
        <h2 className="mb-4">Select Images</h2>
        <div className="image-grid">
          {/* Replace with your image selection components */}
          <div className="image" onClick={() => handleImageSelect('image1')}>
            <img src="/path/to/image1.jpg" alt="Image 1" />
          </div>
          <div className="image" onClick={() => handleImageSelect('image2')}>
            <img src="/path/to/image2.jpg" alt="Image 2" />
          </div>
          <div className="image" onClick={() => handleImageSelect('image3')}>
            <img src="/path/to/image3.jpg" alt="Image 3" />
          </div>
          <div className="image" onClick={() => handleImageSelect('image4')}>
            <img src="/path/to/image4.jpg" alt="Image 4" />
          </div>
          <div className="image" onClick={() => handleImageSelect('image5')}>
            <img src="/path/to/image5.jpg" alt="Image 5" />
          </div>
        </div>

        {/* Selected images display */}
        <div className="selected-images">
          <h3>Selected Images:</h3>
          {selectedImages.length === 0 && <p>No images selected.</p>}
          {selectedImages.map(image => (
            <div key={image} className="selected-image">
              <img src={`/path/to/${image}.jpg`} alt={image} />
              <button onClick={() => handleImageRemove(image)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Button to initiate matching process */}
        <div className="match-button">
          <button onClick={handleMatchImages}>Match Images</button>
        </div>

        {/* Display response from server */}
        {response && (
          <div className="response">
            <h3>Server Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TryOnline;
