import React from "react";

interface PinInputProps {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  handlePinSubmit: () => void;
}

const PinInput: React.FC<PinInputProps> = ({
  pin,
  setPin,
  handlePinSubmit,
}) => {
  // Function to handle digit button clicks
  const handleDigitClick = (digit: number) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  // Function to clear the PIN
  const handleClear = () => {
    setPin("");
  };

  // Function to delete the last digit of the PIN
  const handleDeleteDigit = () => {
    setPin(pin.slice(0, -1));
  };
  return (
    <div className="faceauth-js-main-pin-container">
      <div className="faceauth-js-pin-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            className="faceauth-js-pin-box"
            value={pin[index] || ""}
            readOnly
            disabled
          />
        ))}
      </div>

      <div className="faceauth-js-main-numpad-container">
        {Array.from({ length: 9 }, (_, index) => (
          <button
            key={index + 1}
            className="faceauth-js-numpad-btn"
            onClick={() => handleDigitClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="faceauth-js-numpad-btn red" onClick={handleClear}>
          C
        </button>
        <button
          className="faceauth-js-numpad-btn"
          onClick={handleDigitClick.bind(null, 0)}
        >
          0
        </button>
        <button className="faceauth-js-numpad-btn" onClick={handleDeleteDigit}>
          D
        </button>
        <button className="faceauth-js-submit-btn" onClick={handlePinSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default PinInput;
