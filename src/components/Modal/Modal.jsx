import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';

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
      console.log(`escape`);
      close();
    }
  }

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      console.log(`backdrop`);
      close();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={src} alt={alt} />
      </Modal>
    </Overlay>,
    modalRoot
  );
}

export default ModalWindow;
