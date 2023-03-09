import { useState, useEffect } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { Layout } from '../Layout';
import { getPhoto } from '../services/getPhoto';
import { TitelWithoutImg } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { animateScroll as scroll } from 'react-scroll';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoad from './Button/Button';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '420px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('stoped');
  const [page, setPage] = useState(1);
  const [searchParameter, setSearchParameter] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  function formSubmitSearch(value) {
    setSearchParameter(value);
    setGallery([]);
    setPage(1);
    setStatus('stoped');
    setShowBtn(false);
  }

  function getPhotos() {
    if (searchParameter || page !== 1) {
      getPhoto(searchParameter, page)
        .then(response => response.json())
        .then(photo => {
          setGallery([...gallery, ...photo.hits]);
          setStatus('resolved');
          setShowBtn(page < Math.ceil(photo.totalHits / 12));
          if (page === 1) {
            Notiflix.Notify.success(
              `We found ${photo.totalHits} photos for you...`
            );
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }

  function handleLoad() {
    scroll.scrollMore(window.innerHeight - 125);
    console.log(`123456`);
    setPage(page + 1);
  }

  useEffect(() => {
    setSearchParameter(searchParameter);
    setPage(page);
    getPhotos();
  }, [searchParameter, page]);

  return (
    <Layout>
      <GlobalStyle />

      <Searchbar onSearch={formSubmitSearch} />
      {searchParameter ? (
        <ImageGallery gallery={gallery} status={status} error={error} />
      ) : (
        <TitelWithoutImg>
          Start searching for the best images...
        </TitelWithoutImg>
      )}

      {showBtn && <ButtonLoad handleLoad={handleLoad} />}
    </Layout>
  );
};

export default App;
