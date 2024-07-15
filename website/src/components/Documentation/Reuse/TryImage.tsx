interface TryImageProps {
  key: string;
  handleClick: () => void;
  image: string;
  isActive: boolean;
}

const TryImage = ({ key, handleClick, image, isActive }: TryImageProps) => {
  return (
    <div key={key} className="image" onClick={() => handleClick()}>
      <img
        src={image}
        alt={`Image ${key}`}
        className={isActive ? "active" : ""}
      />
    </div>
  );
};

export default TryImage;
