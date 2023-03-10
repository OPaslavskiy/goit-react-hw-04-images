import React, { useState } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

const ImageGalleryItem = photo => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { tags, largeImageURL, webformatURL } = photo.photo;

  return (
    <>
      <ImageItem onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} />
      </ImageItem>
      {showModal && (
        <ModalWindow close={toggleModal} src={largeImageURL} alt={tags} />
      )}
    </>
  );
};

export default ImageGalleryItem;
