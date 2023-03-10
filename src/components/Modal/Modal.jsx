import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay, ImageModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function ModalWindow({ close, alt, src }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      close();
    }
  }

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <ImageModal src={src} alt={alt} />
      </Modal>
    </Overlay>,
    modalRoot
  );
}

export default ModalWindow;
