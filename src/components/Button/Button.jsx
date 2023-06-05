import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';
export class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className={css.Button} type="button" onClick={onClick}>
        Load More
      </button>
    );
  }
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };
}
