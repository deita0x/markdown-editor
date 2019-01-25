import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const HeaderRight = ({ updateDocument, deleteDocument, disabled }) => {
  return (
    <div className="header-container-right">
      <button className="btn btn-light" onClick={updateDocument} disabled={disabled}>
        Save
      </button>
      <button className="btn btn-danger" onClick={deleteDocument} disabled={disabled}>
        Delete
      </button>
    </div>
  );
};

HeaderRight.propTypes = {
  updateDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default HeaderRight;
