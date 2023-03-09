import React from 'react';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';

const ImageGallery = ({ status, error, gallery }) => {
  if (status === 'pending') return <Loader />;

  if (status === 'resolved')
    return (
      <>
        <ImageGalleryUl>
          {gallery.map(photo => {
            return <ImageGalleryItem key={photo.id} photo={photo} />;
          })}
        </ImageGalleryUl>
      </>
    );

  if (status === 'rejected') {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }
};

export default ImageGallery;
