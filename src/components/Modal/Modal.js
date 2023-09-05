import React, { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export const Modal = ({ showModal, imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    showModal && (
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer>
          <img src={imageUrl} alt="" />
        </ModalContainer>
      </Overlay>
    )
  );
};
