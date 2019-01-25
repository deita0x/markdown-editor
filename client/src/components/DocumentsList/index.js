import React from 'react';
import PropTypes from 'prop-types';
import Document from './Document';

const DocumentsList = ({ documents, onClick, selectedId }) => {
  return (
    <div>
      <ul className="document-container">
        {
          documents.map(document => {
            return <Document
              key={document.id}
              id={document.id}
              title={document.title}
              onClick={onClick}
              selected={document.id === selectedId ? true : false}
            />;
          })
        }
      </ul>
    </div>
  );
};

DocumentsList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentsList;
