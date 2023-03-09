import React, { Component } from 'react';
import { ImageItem, Image, ImageModal } from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { tags, largeImageURL, webformatURL } = this.props.photo;

    return (
      <>
        <ImageItem onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageItem>
        {this.state.showModal && (
          <ModalWindow close={this.toggleModal}>
            <ImageModal src={largeImageURL} alt={tags} />
          </ModalWindow>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
