import React, { Component } from 'react';
import css from './Error.module.css';
import PropTypes from 'prop-types';
export class Error extends Component {
  render() {
    return (
      <div className={css.Error}>
        <p>{this.props.children}</p>
      </div>
    );
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
}
