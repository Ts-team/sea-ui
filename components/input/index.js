import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';
import keys from 'lodash/keys';

import './index.scss';

const propTypes = {
  className: PropTypes.string,
  leftLabel: PropTypes.string,
  topLabel: PropTypes.string,
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  autoFocus: PropTypes.bool,
  onPressEnter: PropTypes.func,
};

const defaultProps = {
  className: '',
  leftLabel: '',
  topLabel: '',
  imgUrl: '',
  imgAlt: '',
  autoFocus: false,
  onPressEnter: () => {},
};

class Input extends Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.textInput.focus();
    }
  }

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.props.onPressEnter();
    }
  }

  renderLabel = () => {
    if (this.props.leftLabel) {
      return (
        <div className="leftLabel">{this.props.leftLabel}</div>
      );
    }
    if (this.props.topLabel) {
      return (
        <div className="topLabel">{this.props.topLabel}</div>
      );
    }
    return null;
  }

  renderImg = () => {
    const { imgUrl, imgAlt } = this.props;
    if (imgUrl === '') {
      return null;
    }
    return <img className="image" src={imgUrl} alt={imgAlt} />;
  }

  render() {
    const rest = omit(this.props, keys(defaultProps));
    const classes = classnames('seaui-input', this.props.className);
    const inputClasses = classnames({
      input: true,
      'input-withLabel': this.props.leftLabel !== '',
      'input-withImage': this.props.imgUrl !== '',
    });
    return (
      <div className={classes}>
        {this.renderLabel()}
        {this.renderImg()}
        <input
          {...rest}
          ref={(input) => { this.textInput = input; }}
          className={inputClasses}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
