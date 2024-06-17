import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div   className={`faceauth-js-modal ${isOpen ? "faceauth-js-show" : ""}`} onClick={onClose}>
      <div className="faceauth-js-modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
