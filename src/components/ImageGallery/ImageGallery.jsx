import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageFalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';
import GalleryApiServise from '../../services/api-servise';
import css from './ImageGallery.module.css';
const apiService = new GalleryApiServise();
export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    showButton: false,
    loading: false,
    showModal: false,
  };
  toggleModal = (largeImageURL, tags) => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
    this.selectedImageURL = largeImageURL;
    this.selectedImageTags = tags;
  };
  componentDidUpdate(prevProps) {
    const prevWord = prevProps.searchWord;
    const newWord = this.props.searchWord;

    if (prevWord !== newWord) {
      this.setState({
        images: null,
        showButton: false,
        error: null,
        loading: true,
      });
      apiService.resetPage();
      this.setState({ loading: true });

      apiService
        .fetchPhotos(newWord)
        .then(images => {
          const showButton = images.total > apiService.options.get('per_page');

          this.setState({ images: images.hits, showButton });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleLoadMore = () => {
    const { searchWord } = this.props;

    apiService.newPage(); // Оновлення значення сторінки

    this.setState({ loading: true, showButton: false });

    apiService
      .fetchPhotos(searchWord)
      .then(images => {
        const showButton =
          images.total > apiService.options.get('per_page') * apiService.page;
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          showButton,
        }));
      })
      .finally(() => this.setState({ loading: false, showButton: true }));
  };

  render() {
    const { images, showButton, loading, showModal, error } = this.state;

    return (
      <div className={css.Container}>
        {error ? (
          <Error> {error.message}</Error>
        ) : (
          <ul className={css.ImageGallery}>
            {images &&
              images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onClick={this.toggleModal}
                />
              ))}
          </ul>
        )}

        {loading && <Loader />}
        {showButton && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            imageURL={this.selectedImageURL}
            tags={this.selectedImageTags}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
  static propTypes = {
    searchWord: PropTypes.string.isRequired,
  };
}
