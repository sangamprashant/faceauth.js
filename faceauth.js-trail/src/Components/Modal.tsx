// src/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`faceauth-js-modal ${isOpen ? "faceauth-js-show" : ""}`}
      onClick={onClose}
    >
      <div
        className="faceauth-js-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
