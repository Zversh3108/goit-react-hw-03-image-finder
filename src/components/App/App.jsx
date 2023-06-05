import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import css from './App.module.css';
export class App extends Component {
  state = {
    searchWord: '',
  };
  handleFormSubmit = word => {
    this.setState({ searchWord: word });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery searchWord={this.state.searchWord} />
      </div>
    );
  }
}
