import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  handleClick = () => {
    const { largeImageURL, tags } = this.props.image;
    this.props.onClick(largeImageURL, tags);
  };

  render() {
    const { webformatURL, tags,  } = this.props.image;
    return (
      <li
        
        onClick={this.handleClick}
        className={css['ImageGalleryItem']}
      >
        <img
          className={css['ImageGalleryItem-image']}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
