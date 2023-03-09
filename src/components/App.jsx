import { Component } from 'react';
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

class App extends Component {
  state = {
    gallery: [],
    error: '',
    status: 'stoped',
    page: 1,
    searchParameter: '',
    showBtn: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchParameter, page } = this.state;

    if (
      prevState.searchParameter !== searchParameter ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      getPhoto(searchParameter, page)
        .then(response => response.json())
        .then(photo => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...photo.hits],
            status: 'resolved',
            isLoading: true,
            showBtn: page < Math.ceil(photo.totalHits / 12),
          }));
          if (page === 1) {
            Notiflix.Notify.success(
              `We found ${photo.totalHits} photos for you...`
            );
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  handleLoad = () => {
    scroll.scrollMore(window.innerHeight - 125);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSearch = searchParameter => {
    this.setState({
      searchParameter,
      gallery: [],
      page: 1,
      status: 'stoped',
      showBtn: false,
    });
  };

  render() {
    const { searchParameter, gallery, status, error, showBtn } = this.state;
    return (
      <Layout>
        <GlobalStyle />

        <Searchbar onSearch={this.onSearch} />
        {searchParameter ? (
          <ImageGallery gallery={gallery} status={status} error={error} />
        ) : (
          <TitelWithoutImg>
            Start searching for the best images...
          </TitelWithoutImg>
        )}

        {showBtn && <ButtonLoad handleLoad={this.handleLoad} />}
      </Layout>
    );
  }
}

export default App;
