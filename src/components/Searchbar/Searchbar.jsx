import React, { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleWordChange = evt => {
    this.setState({ searchWord: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
            onChange={this.handleWordChange}
          />
        </form>
      </header>
    );
  }
}
