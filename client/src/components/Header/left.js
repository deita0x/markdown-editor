import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const HeaderLeft = ({ inputValue, onChangeTitle, disabled }) => {
  return (
    <div className="header-container-left">
      <h3 className="header-h3">document name</h3>
      <input
        className="header-input"
        disabled={disabled}
        value={inputValue}
        onChange={onChangeTitle}
      />
    </div>
  );
};

HeaderLeft.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChangeTitle: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

export default HeaderLeft;
