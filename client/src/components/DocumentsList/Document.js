import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Document = ({ id, title, onClick, selected }) => {
  return (
    <li className={'document-item'  + (selected ? ' document-selected' : '')}>
      <span onClick={() => onClick(id)}>{title}</span>
    </li>
  );
};

Document.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool.isRequired
};

export default Document;
