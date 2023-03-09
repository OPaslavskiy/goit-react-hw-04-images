import React from 'react';
import { ButtonLoadMore } from './Button.styled';

const ButtonLoad = ({ handleLoad }) => {
  return (
    <ButtonLoadMore type="button" onClick={handleLoad}>
      Load more
    </ButtonLoadMore>
  );
};

export default ButtonLoad;
